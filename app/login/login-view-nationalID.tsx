"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ChevronLeft } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nationalIdSchema, NationalIdFormValues } from "./utils/schemas";
import { toEnglishDigits } from "@/lib/number";

interface LoginViewProps {
  onNext?: (user: any) => void;
  onBack?: () => void;
}

export function LoginViewNationalID({ onNext, onBack }: LoginViewProps) {
  const router = useRouter();
  const { verifyNationalId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<NationalIdFormValues>({
    resolver: zodResolver(nationalIdSchema),
    defaultValues: {
      nationalId: "",
    },
  });

  const onSubmit: SubmitHandler<NationalIdFormValues> = async (data) => {
    setIsLoading(true);
    setServerError("");

    try {
      const result = await verifyNationalId(toEnglishDigits(data.nationalId));
      
      setIsLoading(false);

      if (result.success) {
        if (onNext) {
          // @ts-ignore - passing data to next step
          onNext(result.user);
        }
      } else {
        setServerError(result.message || "خطا در تایید شماره ملی");
      }

    } catch (err) {
      setIsLoading(false);
      setServerError("خطای شبکه");
      console.error("National ID submit error:", err);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white items-center relative overflow-hidden" dir="rtl">
      
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />

      {/* Content Wrapper */}
      <div className="w-full h-full flex flex-col items-center p-6 z-10">
          
          {/* Top Header */}
          <div className="w-full max-w-md flex justify-between items-center py-6">
             <div className="flex items-center gap-2">
                 <span className="text-[#393E46] text-xl font-black">دیجی کارا</span>
             </div>

             {/* Back Button (Top Left) */}
             <button 
                type="button"
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100/50 transition-all text-[#393E46]"
             >
                <ChevronLeft className="w-6 h-6" />
             </button>
          </div>

          <div className="flex flex-col flex-1 w-full max-w-md mt-10">
            
            {/* Title Section */}
            <div className="mb-10 text-right space-y-4">
                <h1 className="text-[#393E46] text-4xl font-black leading-tight">
                    تایید شماره ملی
                </h1>
                <p className="text-[#393E46] text-sm font-semibold opacity-80">
                    برای تکمیل ثبت نام، لطفا کدملی خود را وارد کنید
                </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                
                <div className="space-y-2">
                    <Label htmlFor="national-id" className="text-[#ACB5BB] text-xs font-bold block px-2">شماره ملی</Label>
                    
                    {/* Input Container - Pill Shape */}
                    <div className="relative flex items-center bg-white rounded-full border border-[#DCE4E8] p-2 hover:border-[#FDD00A] transition-colors shadow-sm h-14">
                        <Input
                          {...form.register("nationalId")}
                          id="national-id"
                          type="tel"
                          inputMode="numeric"
                          placeholder="1234567890"
                          maxLength={10}
                          className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent text-center text-lg font-bold placeholder:text-gray-300 h-full"
                          autoFocus
                          onChange={(e) => {
                              // Custom onChange to handle English digit conversion immediately if desired or rely on submit
                              // Let's use standard register + manual digit cleaning on change to be nice
                              const val = toEnglishDigits(e.target.value.replace(/\D/g, '')); 
                              form.setValue("nationalId", val);
                          }}
                        />
                    </div>
                     {form.formState.errors.nationalId && (
                        <p className="text-red-500 text-xs font-medium px-2 text-center mt-2">{form.formState.errors.nationalId.message}</p>
                    )}
                </div>

                {serverError && (
                   <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl text-center border border-red-100">
                      {serverError}
                   </div>
                )}

                 <Button 
                    type="submit" 
                    className="w-full bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold py-7 text-lg rounded-xl mt-4 shadow-[#FDD00A]/20 transition-all"
                    disabled={isLoading}
                >
                   {isLoading ? <Loader2 className="animate-spin w-5 h-5 text-[#1A1C1E]" /> : "تایید و ادامه"}
                </Button>

            </form>
          </div>
      </div>
    </div>
  );
}

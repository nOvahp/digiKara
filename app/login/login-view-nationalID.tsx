"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ChevronLeft } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";

interface LoginViewProps {
  onNext?: (user: any) => void;
  onBack?: () => void;
}

export function LoginViewNationalID({ onNext, onBack }: LoginViewProps) {
  const router = useRouter();
  const { verifyNationalId } = useAuth();
  const [nationalId, setNationalId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!nationalId.trim()) {
      setError("لطفا شماره ملی خود را وارد کنید");
      return;
    }

    if (nationalId.length < 10 || nationalId.length > 10) {
      setError("شماره ملی باید 10 رقم باشد");
      return;
    }

    if (!/^\d+$/.test(nationalId)) {
      setError("شماره ملی تنها باید شامل اعداد باشد");
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyNationalId(nationalId);
      
      setIsLoading(false);

      if (result.success) {
        if (onNext) {
          // @ts-ignore - passing data to next step
          onNext(result.user);
        }
      } else {
        setError(result.message || "خطا در تایید شماره ملی");
      }

    } catch (err) {
      setIsLoading(false);
      setError("خطای شبکه");
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

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="space-y-2">
                    <Label htmlFor="national-id" className="text-[#ACB5BB] text-xs font-bold block px-2">شماره ملی</Label>
                    
                    {/* Input Container - Pill Shape */}
                    <div className="relative flex items-center bg-white rounded-full border border-[#DCE4E8] p-2 hover:border-[#FDD00A] transition-colors shadow-sm h-14">
                        <Input
                          id="national-id"
                          type="tel"
                          inputMode="numeric"
                          placeholder="1234567890"
                          value={nationalId}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setNationalId(value);
                          }}
                          maxLength={10}
                          className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent text-center text-lg font-bold placeholder:text-gray-300 h-full"
                          disabled={isLoading}
                          autoFocus
                        />
                    </div>
                </div>

                {error && (
                   <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl text-center border border-red-100">
                      {error}
                   </div>
                )}

                 <Button 
                    type="submit" 
                    className="w-full bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold py-7 text-lg rounded-xl mt-4 shadow-[#FDD00A]/20 transition-all"
                    disabled={isLoading || !nationalId}
                >
                   {isLoading ? <Loader2 className="animate-spin w-5 h-5 text-[#1A1C1E]" /> : "تایید و ادامه"}
                </Button>



            </form>
          </div>
      </div>
    </div>
  );
}

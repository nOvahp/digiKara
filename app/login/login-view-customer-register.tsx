"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerRegisterSchema, CustomerRegisterValues } from "./utils/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/app/providers/AuthProvider";
import { Loader2, Camera, User, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toEnglishDigits } from "@/lib/number";
// import DatePicker if available, or use simple input for now. 
// Assuming string input for birthday based on prompt "Type: string".

interface LoginViewCustomerRegisterProps {
  onNext: () => void;
  phone: string;
  onBack?: () => void;
}

export function LoginViewCustomerRegister({ onNext, phone, onBack }: LoginViewCustomerRegisterProps) {
  const { registerCustomer } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<CustomerRegisterValues>({
    resolver: zodResolver(customerRegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      gender: "1", // Default to Male (example)
      birthday: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CustomerRegisterValues) => {
    setIsLoading(true);
    setServerError("");

    const formData = new FormData();
    formData.append("firstname", toEnglishDigits(data.firstname));
    formData.append("lastname", toEnglishDigits(data.lastname));
    formData.append("gender", String(data.gender));
    formData.append("birthday", toEnglishDigits(data.birthday));
    formData.append("password", toEnglishDigits(data.password));
    formData.append("password_confirmation", toEnglishDigits(data.password_confirmation));
    formData.append("phone", phone);
    
    if (avatarFile) {
      formData.append("avatar_file", avatarFile);
    }

    const result = await registerCustomer(formData);
    
    setIsLoading(false);

    if (result.success) {
      onNext();
    } else {
      setServerError(result.message || "ثبت نام با خطا مواجه شد");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white items-center relative overflow-y-auto" dir="rtl">
        {/* Header Background */}
         <div className="absolute top-0 left-0 right-0 h-[300px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />

         <div className="w-full h-full flex flex-col items-center p-6 z-10 max-w-md">
            
            {/* Top Header / Logo Area */}
            <div className="w-full flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-[#393E46] text-xl font-black">دیجی کارا</span>
                </div>
                
                {/* Back Button (Top Left) */}
                <button 
                  onClick={() => onBack ? onBack() : router.push('/login')} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100/50 transition-all text-[#393E46]"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
            </div>

            <div className="w-full text-right mb-10 mt-4">
                <h1 className="text-[#393E46] text-3xl font-black mb-2">تکمیل ثبت نام</h1>
                <p className="text-[#6C7278] text-sm font-semibold">لطفا اطلاعات خود را وارد کنید</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 pb-10">
                
                {/* Avatar Upload */}
                <div className="flex justify-center mb-6">
                    <div className="relative group overflow-visible">
                        {/* Main Avatar Circle */}
                        <div className="w-24 h-24 rounded-full bg-gray-50 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                             {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-10 h-10 text-gray-300" />
                            )}
                        </div>

                         {/* Camera Icon Badge - Always Visible 111 */}
                         <div className="absolute -bottom-1 -right-1 bg-[#FDD00A] text-[#393E46] p-2 rounded-full border-4 border-white shadow-md z-10">
                            <Camera className="w-4 h-4" />
                        </div>

                         {/* Invisible Input Layer */}
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 rounded-full"
                            onChange={handleAvatarChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="firstname" className="text-xs font-bold mr-1">نام</Label>
                        <Input {...form.register("firstname")} placeholder="" className="rounded-xl border-[#DCE4E8] bg-[#F3F6FC]" />
                        {form.formState.errors.firstname && <p className="text-red-500 text-xs">{form.formState.errors.firstname.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="lastname" className="text-xs font-bold mr-1">نام خانوادگی</Label>
                        <Input {...form.register("lastname")} className="rounded-xl border-[#DCE4E8] bg-[#F3F6FC]" />
                         {form.formState.errors.lastname && <p className="text-red-500 text-xs">{form.formState.errors.lastname.message}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="birthday" className="text-xs font-bold mr-1">تاریخ تولد</Label>
                    <Input 
                        {...form.register("birthday")} 
                        type="date" 
                        className="rounded-xl border-[#DCE4E8] bg-[#F3F6FC] text-right" 
                        style={{ direction: "ltr" }}
                        onChange={(e) => {
                            const val = toEnglishDigits(e.target.value);
                            form.setValue("birthday", val, { shouldValidate: true });
                        }}
                     />
                     {form.formState.errors.birthday && <p className="text-red-500 text-xs">{form.formState.errors.birthday.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                     <Label className="text-xs font-bold mr-1">جنسیت</Label>
                     <div className="flex gap-4">
                         <label className="flex items-center gap-2 cursor-pointer bg-[#F3F6FC] px-4 py-3 rounded-xl flex-1 border border-transparent has-[:checked]:border-[#FDD00A] transition-all">
                             <input type="radio" value="1" {...form.register("gender")} className="w-4 h-4 accent-[#FDD00A]" />
                             <span className="text-sm">مرد</span>
                         </label>
                         <label className="flex items-center gap-2 cursor-pointer bg-[#F3F6FC] px-4 py-3 rounded-xl flex-1 border border-transparent has-[:checked]:border-[#FDD00A] transition-all">
                             <input type="radio" value="0" {...form.register("gender")} className="w-4 h-4 accent-[#FDD00A]" />
                             <span className="text-sm">زن</span>
                         </label>
                     </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="password" className="text-xs font-bold mr-1">رمز عبور</Label>
                    <Input 
                        {...form.register("password")} 
                        type="password" 
                        placeholder="******" 
                        className="rounded-xl border-[#DCE4E8] bg-[#F3F6FC] text-left" 
                        dir="ltr" 
                        onChange={(e) => {
                            const val = toEnglishDigits(e.target.value);
                            form.setValue("password", val, { shouldValidate: true });
                        }}
                    />
                     {form.formState.errors.password && <p className="text-red-500 text-xs">{form.formState.errors.password.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="password_confirmation" className="text-xs font-bold mr-1">تکرار رمز عبور</Label>
                    <Input 
                        {...form.register("password_confirmation")} 
                        type="password" 
                        placeholder="******" 
                        className="rounded-xl border-[#DCE4E8] bg-[#F3F6FC] text-left" 
                        dir="ltr"
                        onChange={(e) => {
                            const val = toEnglishDigits(e.target.value);
                            form.setValue("password_confirmation", val, { shouldValidate: true });
                        }}
                    />
                     {form.formState.errors.password_confirmation && <p className="text-red-500 text-xs">{form.formState.errors.password_confirmation.message}</p>}
                </div>

                <div className="flex flex-col gap-2 opacity-60">
                     <Label className="text-xs font-bold mr-1">شماره موبایل</Label>
                     <Input value={phone} readOnly disabled className="rounded-xl border-dashed border-gray-300 bg-gray-50 text-center font-mono" dir="ltr" />
                </div>

                {serverError && (
                    <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl text-center border border-red-100">
                    {serverError}
                    </div>
                )}

                <Button 
                    type="submit" 
                    className="w-full bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold py-6 text-lg rounded-xl shadow-[#FDD00A]/20 mt-4"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : "ثبت اطلاعات و ادامه"}
                </Button>

            </form>
         </div>
    </div>
  );
}

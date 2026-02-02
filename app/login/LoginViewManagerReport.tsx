"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import headerImg from "../../public/OtpHeader.png";
import { LoginHeader } from "./login-header";
import { useAuth } from "@/app/providers/AuthProvider";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface LoginViewProps {
  onNext?: () => void;
  onLoginAgain?: () => void;
}

export function LoginViewManagerReport({ onNext, onLoginAgain }: LoginViewProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleGoHome = () => {
    router.push("/");
  };

  const handleLoginAgain = () => {
     if (onLoginAgain) {
        onLoginAgain();
     } else {
        router.push("/login");
     }
  };

  // Form State
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    school: "",
    province: "",
    city: "",
    district: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        school: user.school || "",
        province: user.province || "",
        city: user.city || "",
        district: user.district || ""
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { managerService } = await import("@/app/services/managerService");
      
      const result = await managerService.changeManagerInfo(formData);

      if (result.success) {
         setSuccessMessage(result.message || "تغییرات با موفقیت ثبت شد");
         setShowSuccess(true);
      } else {
         setError(result.message || "خطا در ویرایش اطلاعات");
      }
    } catch (err) {
      console.error(err);
      setError("خطای غیرمنتظره رخ داد");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
      if (onLoginAgain) onLoginAgain(); 
      else window.history.back();
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#F8FAFC]">
      <LoginHeader imageSrc={headerImg} />

      <div className="absolute top-[80px] left-0 right-0 px-8 z-10 text-right">
        <h1 className="text-3xl font-black text-[#393E46] mb-2">
            {showSuccess ? "تغییرات ثبت شد" : "ویرایش اطلاعات"}
        </h1>
        <p className="text-[#393E46] text-sm font-bold opacity-80 leading-relaxed">
             {showSuccess 
                ? "اطلاعات شما با موفقیت بروزرسانی شد"
                : "لطفا اطلاعات صحیح را وارد کنید"
             }
        </p>
      </div>

      <div className="flex flex-col flex-1 px-6 w-full max-w-[440px] mx-auto -mt-16 z-20 pb-40"> 
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 p-6 sm:p-8 animate-in slide-in-from-bottom-5 fade-in duration-500 relative pt-8">
            
            {showSuccess ? (
                <div className="flex flex-col items-center gap-6 py-10">
                     <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                     </div>
                      <div className="text-center space-y-3">
                        <p className="text-[#393E46] text-sm font-medium leading-loose">
                            {successMessage || "گزارش شما با موفقیت در سیستم ثبت شد."}
                        </p>
                        <div className="bg-[#F3F6FC] rounded-xl px-4 py-2 inline-block dir-ltr text-[#393E46] font-bold">
                            {user?.phone}
                        </div>
                    </div>
                     <div className="w-full flex flex-col gap-3">
                        <button
                         onClick={handleGoHome}
                         className="w-full h-[50px] bg-[#FDD00A] rounded-xl font-bold text-[#1A1C1E]"
                        >
                           بازگشت به صفحه اصلی
                        </button>

                         <button
                         onClick={handleLoginAgain}
                         className="w-full h-[50px] bg-white border border-gray-200 rounded-xl font-bold text-[#6C7278]"
                        >
                           صفحه ورود
                        </button>
                     </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* First Name & Last Name */}
                    <div className="flex gap-4">
                      
                        <div className="flex-1 space-y-2">
                            <Label className="text-right block text-xs font-bold text-[#6C7278]">نام خانوادگی</Label>
                            <Input name="lastname" value={formData.lastname} onChange={handleChange} className="bg-[#F3F6FC] border-0 rounded-xl h-12 text-right" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <Label className="text-right block text-xs font-bold text-[#6C7278]">نام</Label>
                            <Input name="firstname" value={formData.firstname} onChange={handleChange} className="bg-[#F3F6FC] border-0 rounded-xl h-12 text-right" />
                        </div>
                    </div>

                     {/* School */}
                    <div className="space-y-2">
                        <Label className="text-right block text-xs font-bold text-[#6C7278]">مدرسه</Label>
                        <Input name="school" value={formData.school} onChange={handleChange} className="bg-[#F3F6FC] border-0 rounded-xl h-12 text-right" />
                    </div>

                    {/* Geography */}
                    <div className="grid grid-cols-3 gap-2">
                         <div className="space-y-2">
                            <Label className="text-right block text-xs font-bold text-[#6C7278]">استان</Label>
                            <Input name="province" value={formData.province} onChange={handleChange} className="bg-[#F3F6FC] border-0 rounded-xl h-12 text-right text-xs px-2" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-right block text-xs font-bold text-[#6C7278]">شهر</Label>
                            <Input name="city" value={formData.city} onChange={handleChange} className="bg-[#F3F6FC] border-0 rounded-xl h-12 text-right text-xs px-2" />
                        </div>
                         <div className="space-y-2">
                            <Label className="text-right block text-xs font-bold text-[#6C7278]">منطقه</Label>
                            <Input name="district" value={formData.district} onChange={handleChange} className="bg-[#F3F6FC] border-0 rounded-xl h-12 text-right text-xs px-2" />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                    <div className="mt-4 flex flex-col gap-3">
                         <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-[54px] bg-[#FDD00A] rounded-2xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-all font-bold text-[#1A1C1E]"
                            >
                            {isLoading ? <Loader2 className="animate-spin" /> : "ثبت تغییرات"}
                        </button>
                        
                         <button
                            type="button"
                            onClick={handleBack}
                            className="w-full h-[54px] bg-white border border-gray-200 rounded-2xl flex items-center justify-center font-bold text-[#6C7278]"
                            >
                            انصراف
                        </button>
                    </div>

                </form>
            )}
        </div>
      </div>
    </div>
  );
}

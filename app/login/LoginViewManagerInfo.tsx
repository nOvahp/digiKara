"use client";

import React from "react";
import { useRouter } from "next/navigation";
import headerImg from "../../public/OtpHeader.png";
import { LoginHeader } from "./login-header";
import { useAuth } from "@/app/providers/AuthProvider";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface LoginViewProps {
  onNext?: () => void;
  onReport?: () => void;
}

export function LoginViewManagerInfo({ onNext, onReport }: LoginViewProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const handleContinue = async () => {
    try {
        const { managerService } = await import("@/app/services/managerService");
        await managerService.confirmInfo();
    } catch (e) {
        console.warn("Silent confirmation failed", e);
    }

    if (onNext) {
      onNext();
    }
  };

  const handleReport = () => {
    if (onReport) {
      onReport();
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-[#393E46] text-lg font-semibold">
            لطفا ابتدا وارد شوید
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-[#F8FAFC]">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Text */}
      <div className="absolute top-[100px] left-0 right-0 px-8 z-10 text-right">
        <h1 className="text-3xl font-black text-[#393E46] mb-2">!خوش آمدید</h1>
        <p className="text-[#393E46] text-sm font-bold opacity-80 leading-relaxed">
           اطلاعات حساب مدیریتی شما شناسایی شد
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-6 w-full max-w-[440px] mx-auto -mt-20 z-20 pb-56">
        
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 p-6 sm:p-8 animate-in slide-in-from-bottom-5 fade-in duration-500 relative pt-8">
          
          <div className="flex flex-col gap-0 border rounded-3xl border-[#F3F4F6] overflow-hidden mb-4">
            {/* Name */}
            <div className="flex items-center justify-between p-5 bg-[#F9FAFB]">
              <div className="text-right">
                <p className="text-[#393E46] text-lg font-black">
                  {user.firstname} {user.lastname}
                </p>
              </div>
              <p className="text-[#9CA3AF] text-xs font-bold">نام و نام خانوادگی</p>
            </div>

            <div className="border-t border-[#F3F4F6]"></div>

            {/* Phone */}
            <div className="flex items-center justify-between p-5 bg-white">
              <p className="text-[#393E46] text-base font-bold dir-ltr">
                  {user.phone}
              </p>
              <p className="text-[#9CA3AF] text-xs font-bold">شماره موبایل</p>
            </div>

            <div className="border-t border-[#F3F4F6]"></div>

            {/* National Code */}
            <div className="flex items-center justify-between p-5 bg-[#F9FAFB]">
              <p className="text-[#393E46] text-base font-bold dir-ltr">
                  {user.national_code}
              </p>
              <p className="text-[#9CA3AF] text-xs font-bold">کد ملی</p>
            </div>
          </div>
          
           {/* Details Grid */}
           <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F3F6FC] p-4 rounded-3xl text-right col-span-2">
                  <p className="text-[#9CA3AF] text-xs font-bold mb-1">مدرسه</p>
                  <p className="text-[#393E46] text-sm font-black truncate">{user.school}</p>
              </div>
              <div className="bg-[#F3F6FC] p-4 rounded-3xl text-right">
                  <p className="text-[#9CA3AF] text-xs font-bold mb-1">شهر</p>
                  <p className="text-[#393E46] text-sm font-black truncate">{user.city}</p>
              </div>
              <div className="bg-[#F3F6FC] p-4 rounded-3xl text-right">
                  <p className="text-[#9CA3AF] text-xs font-bold mb-1">استان</p>
                  <p className="text-[#393E46] text-sm font-black truncate">{user.province}</p>
              </div>
              <div className="bg-[#F3F6FC] p-4 rounded-3xl text-right">
                  <p className="text-[#9CA3AF] text-xs font-bold mb-1">منطقه</p>
                  <p className="text-[#393E46] text-sm font-black truncate">{user.district}</p>
              </div>
           </div>


          {/* Status Badge */}
          <div className="mt-6 bg-green-50 rounded-3xl border border-green-100 p-5 flex items-center gap-4">
             <div className="bg-green-100 p-2.5 rounded-full shrink-0">
               <CheckCircle2 className="w-6 h-6 text-green-600" />
             </div>
             <div className="text-right flex-1">
              <p className="text-green-800 text-base font-black">
                اطلاعات تایید شد
              </p>
              <p className="text-green-700 text-xs font-bold mt-1">
                اکنون می‌توانید وارد پنل مدیریت شوید
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[440px] mx-auto p-6 bg-transparent z-50 flex flex-col gap-3">
        <button
          onClick={handleContinue}
          className="w-full h-[57px] bg-[#FDD00A] rounded-2xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-all hover:scale-[1.02] active:scale-[0.98] text-[#1A1C1E] text-lg font-bold shadow-lg shadow-[#FDD00A]/20"
        >
          ادامه  
        </button>
        
        <button
          onClick={handleReport}
          className="w-full h-[57px] bg-white border-2 border-[#E5E7EB] rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors text-[#6C7278] text-base font-bold"
        >
          <AlertCircle className="w-5 h-5" />
          مغایرت اطلاعات
        </button>
      </div>
    </div>
  );
}

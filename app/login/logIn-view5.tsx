"use client";

import React from "react";
import { useRouter } from "next/navigation";
import headerImg from "../../public/OtpHeader.png";
// import Image from "next/image";
import { LoginHeader } from "./login-header";
import { useAuth } from "@/app/providers/AuthProvider";
import { CheckCircle2, AlertCircle } from "lucide-react";
// import {Copy } from "lucide-react";

interface LoginViewProps {
  onNext?: () => void;
  onReport?: () => void;
}

export function LoginView5({ onNext, onReport }: LoginViewProps) {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuth();
  // const [copied, setCopied] = React.useState<string | null>(null);

  // const copyToClipboard = (text: string, label: string) => {
  //   navigator.clipboard.writeText(text);
  //   setCopied(label);
  //   setTimeout(() => setCopied(null), 2000);
  // };

  const handleContinue = () => {
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
    <div className="flex h-full w-full flex-col">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Content */}
      <div className="absolute top-0 left-0 right-0 mx-auto w-full max-w-[440px] px-10 pt-15 z-10 flex flex-col gap-8">
        <div className="w-full flex justify-end items-center">
          <span className="text-[#393E46] text-lg font-black">دیجی کارا</span>
        </div>

        {/* Title Section */}
        <div className="flex flex-col gap-4 text-right">
          <div className="flex items-center justify-end gap-2">
            
            <h1 className="text-[#393E46] text-4xl font-black leading-tight">
              !خوش آمدید
            </h1>
            
          </div>
          <p className="text-[#393E46] text-sm font-semibold">
            احراز هویت شما با موفقیت انجام شد
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[440px] mx-auto px-6 mt-12 z-10 flex flex-col gap-6 flex-1 overflow-y-auto pb-56">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl border border-[#DCE4E8] p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex items-center justify-between">
              <div className="text-right">
                
                <p className="text-[#393E46] text-base font-semibold">
                  {user.name}
                </p>
              </div>
              <p className="text-[#6C7278] text-sm font-medium">نام</p>
              {/* <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                {user.name.charAt(0)}
              </div> */}
            </div>

            <div className="border-t border-[#DCE4E8]"></div>

            {/* Phone */}
            <div className="flex items-center justify-between">
              <p className="text-[#393E46] text-base font-semibold">
                  {user.phone}
                </p>
              <div className="flex items-center gap-2">
                <p className="text-[#6C7278] text-sm font-medium">شماره تماس</p>
                
              </div>
            </div>
            <div className="border-t border-[#DCE4E8]"></div>

            {/* national_code */}
            <div className="flex items-center justify-between">
              <p className="text-[#393E46] text-base font-semibold">
                  {user.national_code}
                </p>
              <div className="flex items-center gap-2">
                <p className="text-[#6C7278] text-sm font-medium">شماره ملی</p>
                
              </div>
            </div>

            <div className="border-t border-[#DCE4E8]"></div>

            {/* School */}
            <div className="flex items-center justify-between">
              
              <p className="text-[#393E46] text-base font-semibold">
                {user.school}
              </p>
              <p className="text-[#6C7278] text-sm font-medium">مدرسه</p>
            </div>

            <div className="border-t border-[#DCE4E8]"></div>

            {/* City */}
            <div className="flex items-center justify-between">
              
              <p className="text-[#393E46] text-base font-semibold">
                {user.city}
              </p>
              <p className="text-[#6C7278] text-sm font-medium">شهر</p>
            </div>

            <div className="border-t border-[#DCE4E8]"></div>

            {/* Field */}
            <div className="flex items-center justify-between">
              
              <p className="text-[#393E46] text-base font-semibold">
                {user.field}
              </p>
              <p className="text-[#6C7278] text-sm font-medium">رشته</p>
            </div>

            <div className="border-t border-[#DCE4E8]"></div>

            {/* Grade */}
            <div className="flex items-center justify-between">
              
              <p className="text-[#393E46] text-base font-semibold">
                {user.grade}
              </p>
              <p className="text-[#6C7278] text-sm font-medium">پایه</p>
            </div>
            <div className="border-t border-[#DCE4E8]"></div>

            {/* province */}
            <div className="flex items-center justify-between">
              
              <p className="text-[#393E46] text-base font-semibold">
                {user.province}
              </p>
              <p className="text-[#6C7278] text-sm font-medium">استان</p>
            </div>
            <div className="border-t border-[#DCE4E8]"></div>

            {/* district */}
            <div className="flex items-center justify-between">
              
              <p className="text-[#393E46] text-base font-semibold">
                {user.district}
              </p>
              <p className="text-[#6C7278] text-sm font-medium">منطقه</p>
            </div>
          </div>
        </div>

        {/* Token Card
        <div className="bg-[#F3F6FC] rounded-2xl border border-[#DCE4E8] p-6">
          <div className="flex flex-col gap-3">
            <p className="text-[#6C7278] text-sm font-medium">
              توکن احراز هویت
            </p>
            <div className="bg-white rounded-lg p-3 flex items-center justify-between border border-[#DCE4E8]">
              <button
                onClick={() => copyToClipboard(token || "", "token")}
                className="p-1 hover:bg-[#F3F6FC] rounded transition-colors"
                title="کپی کنید"
              >
                <Copy className="w-4 h-4 text-[#6C7278]" />
              </button>
              <p className="text-[#393E46] text-xs font-mono font-semibold truncate ml-2">
                {token?.substring(0, 20)}...
              </p>
            </div>
            {copied === "token" && (
              <p className="text-green-600 text-xs font-medium">✓ کپی شد</p>
            )}
          </div>
        </div> */}

        {/* Status Badge */}
        <div className="bg-green-50 rounded-2xl border border-green-200 p-4 flex items-center justify-center gap-3">
         
          <div className="text-right">
            <p className="text-green-700 text-sm font-semibold">
              احراز هویت موفق
            </p>
            <p className="text-green-600 text-xs font-medium">
              .شما اکنون می‌توانید وارد سیستم شوید
            </p>
          </div>
           <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[440px] mx-auto p-6 bg-transparent   z-50 flex flex-col gap-3">
        <button
          onClick={handleContinue}
          className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-colors text-[#1A1C1E] text-lg font-semibold shadow-sm"
        >
          ادامه
        </button>
        
        <button
          onClick={handleReport}
          className="w-full h-[57px] bg-white border-2 border-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-[#FDD00A] text-lg font-semibold shadow-sm"
        >
          <AlertCircle className="w-5 h-5" />
          گزارش مشکل
        </button>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import headerImg from "../../public/OtpHeader.png";
import Image from "next/image";
import { LoginHeader } from "./login-header";
import { CheckCircle2, PartyPopper, Sparkles } from "lucide-react";

interface LoginViewProps {
  onNext?: () => void;
}

export function LoginView8({ onNext }: LoginViewProps) {
  const handleContinue = () => {
    if (onNext) {
      onNext();
    }
  };

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
          <h1 className="text-[#393E46] text-4xl font-black leading-tight">
            عالی!
          </h1>
          <p className="text-[#393E46] text-sm font-semibold">
            اطلاعات تجربیات شما ثبت شد
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[440px] mx-auto px-6 mt-12 z-10 flex flex-col gap-6 items-center justify-center flex-1 pb-24">
        {/* Success Icon/Image */}
        <div className="flex flex-col items-center gap-6">
          {/* Large Success Checkmark */}
          <div className="relative w-32 h-32 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg animate-bounce">
            <svg
              className="w-20 h-20 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message Card */}
          <div className="bg-green-50 rounded-2xl border-2 border-green-200 p-6 text-center w-full">
            <p className="text-green-700 text-lg font-bold mb-2">
              ✓ ثبت اطلاعات موفق
            </p>
            <p className="text-green-600 text-sm font-medium">
              تجربیات و مهارت های شما با موفقیت ثبت شد. اکنون می توانید ادامه
              دهید.
            </p>
          </div>

          {/* Stats Box */}
          <div className="bg-[#F3F6FC] rounded-2xl border border-[#DCE4E8] p-6 w-full">
            <p className="text-[#6C7278] text-xs font-medium mb-4 text-center">
              خلاصه اطلاعات ثبت شده
            </p>
            <div className="flex flex-col gap-0">
              <div className="flex items-center justify-between py-3 border-b border-[#DCE4E8]">
                <span className="text-[#393E46] font-bold text-sm">
                  شامل است
                </span>
                <span className="text-[#6C7278] text-xs font-medium">
                  تجربه تولید
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[#DCE4E8]">
                <span className="text-[#393E46] font-bold text-sm">
                  شامل است
                </span>
                <span className="text-[#6C7278] text-xs font-medium">
                  تجربه فروش
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[#393E46] font-bold text-sm">
                  تکمیل شده
                </span>
                <span className="text-[#6C7278] text-xs font-medium">
                  دوره آموزشی
                </span>
              </div>
            </div>
          </div>

          {/* Celebration Icons */}
          <div className="flex items-center justify-center gap-6">
            <PartyPopper
              className="w-8 h-8 text-orange-500 animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <Sparkles
              className="w-8 h-8 text-yellow-500 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <PartyPopper
              className="w-8 h-8 text-orange-500 animate-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[440px] mx-auto p-6 bg-transparent z-50">
        <button
          onClick={handleContinue}
          className="w-full h-[57px] bg-[#FDD00A] hover:bg-[#e5bc09] rounded-xl flex items-center justify-center gap-2 transition-colors text-lg font-semibold shadow-sm text-[#1A1C1E] cursor-pointer"
        >
          ادامه
        </button>
      </div>
    </div>
  );
}

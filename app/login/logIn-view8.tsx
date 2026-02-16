'use client';

import React from 'react';
import headerImg from '../../public/OtpHeader.png';
import Image from 'next/image';
import { LoginHeader } from './login-header';
import { CheckCircle2, PartyPopper, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="flex h-full w-full flex-col bg-[#F8FAFC]">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Text */}
      <div className="absolute top-[100px] left-0 right-0 px-8 z-10 text-right">
        <h1 className="text-3xl font-black text-[#393E46] mb-2">عالی!</h1>
        <p className="text-[#393E46] text-sm font-bold opacity-80 leading-relaxed">
          اطلاعات و تجربیات شما با موفقیت ثبت شد
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-6 w-full max-w-[440px] mx-auto -mt-20 z-20 pb-28">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 p-6 sm:p-8 animate-in slide-in-from-bottom-5 fade-in duration-500 text-center relative pt-8">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-green-600"
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

          <p className="text-[#393E46] text-base font-bold leading-relaxed mb-8">
            از همکاری شما سپاسگزاریم
          </p>

          <div className="bg-[#F9FAFB] rounded-2xl p-4 text-right">
            <p className="text-[#393E46] font-bold text-sm mb-3">خلاصه وضعیت</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md">
                  ثبت شده
                </span>
                <span className="text-[#6C7278]">اطلاعات هویتی</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md">
                  ثبت شده
                </span>
                <span className="text-[#6C7278]">علاقه مندی ها</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md">
                  ثبت شده
                </span>
                <span className="text-[#6C7278]">سوابق تجربی</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[440px] mx-auto p-6 bg-transparent z-50">
        <Button
          onClick={handleContinue}
          className="w-full h-[57px] bg-[#FDD00A] rounded-2xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-all text-[#1A1C1E] text-lg font-bold shadow-lg shadow-[#FDD00A]/20"
        >
          ادامه
        </Button>
      </div>
    </div>
  );
}

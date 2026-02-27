'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ExperienceGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExperienceGuideModal({ isOpen, onClose }: ExperienceGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md h-full bg-white flex flex-col overflow-hidden" dir="rtl">
        {/* Header */}
        <div className="w-full px-5 py-3 border-b border-gray-200 flex justify-between items-center">
          <div className="w-10" />
          <div className="text-[#0C1415] text-base font-semibold ">
            تجربه زیاد ندارم، چی بنویسم؟ 
          </div>
          <div
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-[#0C1415]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-col gap-6 pt-6">
            <p className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[28px] tracking-wide text-right">
              اصلاً نگران نباش! حتی اگه چند ماهه که این مهارت رو شروع کردی، با افتخار همون رو
              بنویس. تو این پلتفرم، همه می‌دونن که شما کارآفرین‌های آینده‌اید و قراره همین‌جا کلی
              تجربه جدید کسب کنید.{' '}
              <span className="text-[#0C1415] font-semibold">
                صداقت بهترین ویترین برای حجره‌ته!
              </span>
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="px-6 py-3 bg-white border-t border-gray-200 shadow-lg">
          <button
            onClick={onClose}
            className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center"
          >
            <span className="text-[#1A1C1E] text-[18px] font-semibold font-['PeydaWeb']">
              متوجه شدم
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

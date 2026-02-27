'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ImageGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImageGuideModal({ isOpen, onClose }: ImageGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md h-full bg-white flex flex-col overflow-hidden" dir="rtl">
        {/* Header */}
        <div className="w-full px-5 py-3 border-b border-gray-200 flex justify-between items-center">
          <div className="w-10" />
          <div className="text-[#0C1415] text-base font-semibold font-['PeydaWeb']">
            چه عکسی برای حجره‌م مناسبه؟
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
          <div className="flex flex-col gap-8 pt-6">
            <div className="flex flex-col gap-4 items-start">
              <p className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[28px] tracking-wide text-right">
                اگه برای کسب‌وکارت لوگو طراحی کردی که عالیه، همون رو آپلود کن! اما اگه هنوز لوگو
                نداری اصلاً جای نگرانی نیست؛ یه عکس باکیفیت و جذاب از{' '}
                <span className="text-[#0C1415]">«بهترین نمونه‌کارت»</span> یا حتی عکسی از{' '}
                <span className="text-[#0C1415]">«خودت در حال کار»</span> می‌تونه یه ویترین عالی
                برای حجره‌ت بسازه و حسابی به مشتری اعتماد بده.
              </p>
            </div>

            <div className="w-full h-[1px] bg-gray-200" />

            {/* Disabled Button */}
            <button
              disabled
              className="w-full h-12 rounded-xl border border-[#DFE1E7] bg-[#F8F9FA] flex items-center justify-center cursor-not-allowed opacity-50"
            >
              <span className="text-[#1A1C1E] text-sm font-semibold font-['PeydaWeb']">
                چطوری لوگوی خودمو طراحی کنم؟
              </span>
            </button>
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

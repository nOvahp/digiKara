'use client';

import React from 'react';
import { X } from 'lucide-react';

interface NameGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NameGuideModal({ isOpen, onClose }: NameGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md h-full bg-white flex flex-col overflow-hidden" dir="rtl">
        {/* Header */}
        <div className="w-full px-5 py-3 border-b border-gray-200 flex justify-between items-center">
          <div className="w-10" />
          <div className="text-[#0C1415] text-base font-semibold font-['PeydaWeb']">
            چه اسمی انتخاب کنم بهتره؟
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
              یه اسم کوتاه، خاص و تو دل‌برو انتخاب کن که راحت تو ذهن مشتری بمونه. سعی کن اسمت
              جوری باشه که با خوندنش، همه بفهمن دقیقاً مهارتت چیه و چه شاهکاری تو حجره‌ت داری.
            </p>

            <div className="w-full h-[1px] bg-gray-200" />

            {/* Example */}
            <div className="flex flex-col gap-3">
              <div className="text-[#0C1415] text-sm font-semibold font-['PeydaWeb']">مثلاً:</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#DFE1E7] shrink-0" />
                  <span className="text-[#666D80] text-sm font-medium leading-[24px]">
                    به جای{' '}
                    <span className="text-[#B0001E] line-through">«فروشگاه علی»</span>
                    {' '}بذار{' '}
                    <span className="text-[#0C1415] font-semibold">«دنیای چوبی علی»</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#DFE1E7] shrink-0" />
                  <span className="text-[#666D80] text-sm font-medium leading-[24px]">
                    یا{' '}
                    <span className="text-[#0C1415] font-semibold">«پیکسل‌های رنگیِ سارا»</span>
                  </span>
                </div>
              </div>
            </div>
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

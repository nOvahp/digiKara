'use client';

import React from 'react';
import Image from 'next/image';

interface PopUpStudentProps {
  onClose: () => void;
}

export function PopUpStudent({ onClose }: PopUpStudentProps) {
  // Prevent click propagation to parent (which might close the modal)
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] bg-white rounded-xl outline outline-1 outline-[#DFE1E7] overflow-y-auto flex flex-col justify-start items-start gap-5 p-5 relative shadow-lg"
        onClick={handleContentClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1 rounded-full hover:bg-gray-100 z-10"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-gray-500"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Title Section */}
        <div className="w-full relative flex justify-end items-center mt-2 px-1">
          <div className="text-right text-[#0D0D12] text-base font-semibold leading-relaxed tracking-wide">
            استعداد حمایت شده
          </div>
          {/* Badge Icon */}
          <div className="w-[13px] h-[13px] ml-2 bg-[#FCFCFC] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] outline outline-2 outline-[#2369D2] rounded-full" />
        </div>

        {/* Profile Image */}
        <div className="w-full flex flex-col items-center justify-center gap-4 mt-2">
          <div className="w-[128px] h-[128px] relative rounded-full overflow-hidden border-[6px] border-[#1AAE3A]">
            <Image src="/Avatar.png" alt="Student Profile" fill className="object-cover" />
          </div>
        </div>

        {/* Info List */}
        <div className="w-full flex flex-col justify-start items-start gap-2">
          {/* Support Type */}
          <div className="w-full h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
            <div className="flex-1 text-[#818898] text-base font-num-medium leading-relaxed tracking-wide text-left">
              سرمایه اولیه نقدی/ تسهیلات بانکی
            </div>
            <div className="flex justify-end items-center gap-2 w-[80px]">
              <div className="flex-1 text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                نوع حمایت
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="w-full h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
            <div
              className="flex-1 text-[#818898] text-base font-num-medium leading-relaxed tracking-wide text-left"
              dir="rtl"
            >
              ۲۰.۰۰۰.۰۰۰.۰۰۰ ریال
            </div>
            <div className="flex justify-end items-center gap-2 w-[80px]">
              <div className="flex-1 text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                تامین شده
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="w-full h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
            <div className="flex-1 text-[#818898] text-base font-num-medium leading-relaxed tracking-wide text-left">
              جهاد کشاورزی
            </div>
            <div className="flex justify-end items-center gap-2 w-[115px]">
              <div className="w-full text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                دستگاه
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="w-full h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
            <div className="flex-1 text-[#818898] text-base font-num-medium leading-relaxed tracking-wide text-left">
              سیستان و بلوچستان_ ایرانشهر
            </div>
            <div className="flex justify-end items-center gap-2 w-[115px]">
              <div className="w-full text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                استان /منطقه
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUpStudent;

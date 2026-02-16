'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

const NewTimche2 = () => {
  const router = useRouter();

  // Hardcoded step 2 for this "page"
  const step = 2;

  const steps = [
    { id: 1, title: 'اطلاعات پایه' },
    { id: 2, title: 'پروژه‌ها' },
    { id: 3, title: 'اعضا' },
    { id: 4, title: 'معیارها' },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center pb-10" dir="rtl">
      {/* Header */}
      <div className="w-full max-w-[440px] pt-4 flex flex-col gap-5">
        <div className="w-full px-4 flex justify-between items-center">
          <h1 className="text-center text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
            افزودن تیمچه
          </h1>
          <div
            onClick={() => router.back()}
            className="w-10 h-10 bg-white rounded-full border border-[rgba(8,11,17,0.10)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Stepper */}
        <div className="w-full px-0 py-5 border-b border-[#DFE1E7] flex justify-between items-center overflow-x-auto no-scrollbar gap-4">
          {steps.map((s) => (
            <div
              key={s.id}
              className={cn('flex items-center gap-2.5', step !== s.id && 'opacity-50')}
            >
              <span
                className={cn(
                  "text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide whitespace-nowrap",
                  step === s.id ? 'text-[#0D0D12]' : 'text-[#818898]',
                )}
              >
                {s.title}
              </span>
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center shadow-sm',
                  step === s.id ? 'bg-[#FDD00A]' : 'bg-[#DFE1E7]',
                )}
              >
                <span className="text-white text-sm font-num-bold font-bold leading-[21px]">
                  {s.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 2 Content: Projects */}
      <div className="w-full max-w-[440px] px-0 py-6 flex flex-col gap-6">
        {/* Project Card */}
        <div className="w-full p-4 rounded-xl border border-[#DCE4E8] flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-right text-[#0F172A] text-base font-['PeydaWeb'] font-semibold leading-[26.4px] tracking-wide">
              پروژه طراحی پوستر یلدا
            </h3>
            <p className="text-right text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px]">
              این پروژه شامل طراحی یک پوستر جذاب و خلاقانه برای جشن یلدا است. هدف اصلی، ایجاد یک اثر
              هنری است که با استفاده از نمادها و رنگ‌های مرتبط با این جشن، حس گرما و شادی را به
              مخاطب منتقل کند.
            </p>
          </div>

          <div className="flex justify-between items-center mt-2">
            {/* Manager */}
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#0F172A]" />
              <span className="text-[#0F172A] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px]">
                علی رضایی
              </span>
            </div>

            {/* Timche */}
            <div className="flex items-center gap-1.5">
              <Box className="w-4 h-4 text-[#0F172A]" />
              <span className="text-[#0F172A] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px]">
                تیمچه گرافیک
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#0F172A] text-xs font-['PeydaWeb'] font-semibold leading-[20.4px]">
                ۵۰,۰۰۰,۰۰۰ ریال
              </span>
            </div>
          </div>
        </div>

        {/* Add Project Button */}
        <div className="w-full h-[57px] rounded-xl border border-dashed border-[#DFE1E7] flex items-center justify-center gap-2.5 cursor-pointer hover:bg-gray-50">
          <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold">
            افزودن پروژه
          </span>
          <div className="w-6 h-6 border-2 border-[#1A1C1E] rounded-full flex items-center justify-center">
            <span className="text-lg leading-none mb-0.5">+</span>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="fixed bottom-0 w-full max-w-[440px] p-4 bg-white/80 backdrop-blur-sm border-t border-[#F0F0F0] mb-25 z-10">
        <div className="w-full flex gap-3.5">
          <div
            onClick={() => {
              router.push('/SchoolPanel/Timche/New/Step3');
            }}
            className="w-[279px] h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#e5c109] transition-colors shadow-sm"
          >
            <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold">ادامه</span>
          </div>
          <div
            onClick={() => router.back()} // Or specific route
            className="flex-1 h-[57px] rounded-xl border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold">قبلی</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTimche2;

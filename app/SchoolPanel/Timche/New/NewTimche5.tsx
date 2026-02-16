'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check } from 'lucide-react';


const NewTimche5 = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col items-center pb-10" dir="rtl">
      {/* Header */}
      <div className="w-full max-w-[440px] pt-0 flex flex-col gap-5">
        <div className="w-full px-4 flex justify-between items-center">
          <h1 className="text-center text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
            افزودن پروژه
          </h1>
          <div
            onClick={() => router.back()}
            className="w-10 h-10 bg-white rounded-full border border-[rgba(8,11,17,0.10)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Success Content */}
      <div className="w-full max-w-[440px] px-0 flex-1 flex flex-col justify-center items-center gap-6 mt-0">
        {/* Icon Circles */}
        <div className="relative w-[120px] h-[120px] bg-[#FFF5C7] rounded-full flex items-center justify-center">
          <div className="w-[75px] h-[75px] bg-[#FDD00A] rounded-full flex items-center justify-center">
            <div className="w-8 h-8 flex items-center justify-center border-2 border-[#0D0D12] rounded-full">
              <Check className="w-4 h-4 text-[#0D0D12]" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-center text-[#0D0D12] text-3xl font-['PeydaWeb'] font-semibold leading-9">
            با موفقیت افزوده شد
          </h2>
          <p className="w-[293px] text-center text-[#0D0D12] text-xs font-['PeydaWeb'] font-light leading-[18px]">
            محصول پس از تائید مدرسه به انتشار عمومی درخواهد آمد.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewTimche5;

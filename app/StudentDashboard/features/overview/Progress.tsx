'use client';

import * as React from 'react';
import { Medal, ShoppingBag, Star, DollarSign } from 'lucide-react';

export function Progress() {
  return (
    <div className="w-full inline-flex flex-col justify-start items-start gap-2" dir="rtl">
      {/* Header */}
      <div className="self-stretch inline-flex justify-start items-center gap-20">
        <div className="text-[#222831] text-[18px] font-num-medium leading-[25.20px] break-words">
          مسیر پیشرفت شما
        </div>
      </div>

      {/* Content Card */}
      <div className="self-stretch bg-white shadow-[0px_0px_4px_rgba(0,0,0,0.25)] rounded-lg flex justify-start items-center gap-2 p-3">
        <div className="flex-1 flex flex-col justify-start items-start gap-1.5">
          {/* Level Title */}
          <div className="self-stretch inline-flex justify-start items-center gap-1.5">
            <div className="text-right">
              <span className="text-[#0F172A] text-sm font-['Meem'] font-medium leading-[21.70px]">
                سطح{' '}
              </span>
              <span className="text-[#0F172A] text-sm font-num-medium leading-[21.70px]">5</span>
              <span className="text-[#0F172A] text-sm font-['Meem'] font-medium leading-[21.70px]">
                {' '}
                : فروشنده ماهر
              </span>
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="self-stretch flex justify-center items-center gap-1.5">
            <div className="flex justify-start items-center gap-1.5">
              <div className="text-right text-[#888B90] text-[10px] font-num-medium leading-[15.50px]">
                500/750 امتیاز
              </div>
            </div>
            {/* Bar Track */}
            <div
              className="flex-1 h-2 bg-[#E0E0E0] rounded-[64px] overflow-hidden flex justify-start items-center relative"
              dir="ltr"
            >
              {/* Bar Fill (Calculated width approx 66%) */}
              <div className="h-full bg-[#F1C21B] rounded-[64px]" style={{ width: '66%' }} />
            </div>
          </div>

          {/* Badges Row */}
          <div className="self-stretch pt-4 flex justify-between items-start gap-1.5">
            {/* Top Seller (Yellow) */}
            <div className="w-[50px] flex flex-col justify-start items-center gap-1.5">
              <div className="w-[38px] h-[38px] relative bg-[#FDF9C3] rounded-full flex justify-center items-center">
                <Medal className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
              </div>
              <div className="w-[49px] text-center text-[#888B90] text-[10px] font-num-medium leading-[15.50px] break-words">
                فروشنده برتر
              </div>
            </div>

            {/* 100 Orders (Red) */}
            <div className="w-[50px] flex flex-col justify-start items-center gap-1.5">
              <div className="w-[38px] h-[38px] relative bg-[#FDC3C3] rounded-full flex justify-center items-center">
                <ShoppingBag className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
              </div>
              <div className="text-center text-[#888B90] text-[10px] font-num-medium leading-[15.50px] break-words">
                ۱0۰ سفارش
              </div>
            </div>

            {/* High Score (Green) */}
            <div className="w-[50px] flex flex-col justify-start items-center gap-1.5">
              <div className="w-[38px] h-[38px] relative bg-[#C3FDD8] rounded-full flex justify-center items-center">
                <Star className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
              </div>
              <div className="text-center text-[#888B90] text-[10px] font-num-medium leading-[15.50px] break-words">
                امتیاز بالا
              </div>
            </div>

            {/* First Sale (Blue) */}
            <div className="w-[50px] flex flex-col justify-start items-center gap-1.5">
              <div className="w-[38px] h-[38px] relative bg-[#C3E4FD] rounded-full flex justify-center items-center">
                <DollarSign className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
              </div>
              <div className="text-center text-[#888B90] text-[10px] font-num-medium leading-[15.50px] break-words">
                اولین فروش
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

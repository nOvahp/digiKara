'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  PERSIAN_MONTHS,
  gregorianToJalali,
  jalaliToGregorian,
  getDaysInJalaliMonth,
} from '@/lib/persian-date';

interface PersianDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  className?: string;
}

function getTodayJalali(): [number, number, number] {
  const today = new Date();
  return gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
}

function parseValueToJalali(value: string): [number, number, number] | null {
  if (value && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const parts = value.split('-');
    return gregorianToJalali(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]));
  }
  return null;
}

export function PersianDatePicker({ value, onChange, className = '' }: PersianDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const initialDate = (): [number, number, number] => {
    const parsed = parseValueToJalali(value);
    return parsed ?? getTodayJalali();
  };

  const [selYear, setSelYear] = useState<number>(() => initialDate()[0]);
  const [selMonth, setSelMonth] = useState<number>(() => initialDate()[1]);
  const [selDay, setSelDay] = useState<number>(() => initialDate()[2]);

  // Keep day within valid range when month/year changes
  const clampDay = (day: number, month: number, year: number) =>
    Math.min(day, getDaysInJalaliMonth(month, year));

  const handlePrevYear = () => {
    const newYear = selYear - 1;
    setSelYear(newYear);
    setSelDay((d) => clampDay(d, selMonth, newYear));
  };
  const handleNextYear = () => {
    const newYear = selYear + 1;
    setSelYear(newYear);
    setSelDay((d) => clampDay(d, selMonth, newYear));
  };

  const handlePrevMonth = () => {
    const newMonth = selMonth === 1 ? 12 : selMonth - 1;
    const newYear = selMonth === 1 ? selYear - 1 : selYear;
    setSelMonth(newMonth);
    setSelYear(newYear);
    setSelDay((d) => clampDay(d, newMonth, newYear));
  };
  const handleNextMonth = () => {
    const newMonth = selMonth === 12 ? 1 : selMonth + 1;
    const newYear = selMonth === 12 ? selYear + 1 : selYear;
    setSelMonth(newMonth);
    setSelYear(newYear);
    setSelDay((d) => clampDay(d, newMonth, newYear));
  };

  const handlePrevDay = () => {
    const maxDay = getDaysInJalaliMonth(selMonth, selYear);
    setSelDay((d) => (d === 1 ? maxDay : d - 1));
  };
  const handleNextDay = () => {
    const maxDay = getDaysInJalaliMonth(selMonth, selYear);
    setSelDay((d) => (d === maxDay ? 1 : d + 1));
  };

  const handleConfirm = () => {
    const [gy, gm, gd] = jalaliToGregorian(selYear, selMonth, selDay);
    const dateStr = `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleOpen = () => {
    // Reset picker to current value or today when opening
    const d = parseValueToJalali(value) ?? getTodayJalali();
    setSelYear(d[0]);
    setSelMonth(d[1]);
    setSelDay(d[2]);
    setIsOpen(true);
  };

  const displayValue = (() => {
    const parsed = parseValueToJalali(value);
    if (!parsed) return 'انتخاب تاریخ تولد';
    const [pjy, pjm, pjd] = parsed;
    return `${pjy} / ${PERSIAN_MONTHS[pjm - 1]} / ${pjd}`;
  })();

  return (
    <div className="relative w-full" dir="rtl">
      <button
        type="button"
        onClick={handleOpen}
        className={`w-full h-[52px] bg-white rounded-xl border border-[#DCE4E8] px-4 text-right font-num-medium text-[#0D0D12] text-sm hover:border-[#FDD00A] focus:outline-none focus:border-[#FDD00A] transition-colors ${className}`}
      >
        {displayValue}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-[#DFE1E7] rounded-xl shadow-lg p-5 select-none">

          {/* ── Year Row ── */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={handlePrevYear}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={20} className="text-[#666D80]" />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A0A9B4] mb-0.5">سال</span>
              <span className="text-lg font-bold text-[#0D0D12] font-num-medium tracking-wider">
                {selYear}
              </span>
            </div>
            <button
              type="button"
              onClick={handleNextYear}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} className="text-[#666D80]" />
            </button>
          </div>

          <div className="border-t border-[#F0F2F5] my-2" />

          {/* ── Month Row ── */}
          <div className="flex items-center justify-between mb-3 mt-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={20} className="text-[#666D80]" />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A0A9B4] mb-0.5">ماه</span>
              <span className="text-base font-semibold text-[#0D0D12]">
                {PERSIAN_MONTHS[selMonth - 1]}
              </span>
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} className="text-[#666D80]" />
            </button>
          </div>

          <div className="border-t border-[#F0F2F5] my-2" />

          {/* ── Day Row ── */}
          <div className="flex items-center justify-between mb-4 mt-3">
            <button
              type="button"
              onClick={handlePrevDay}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={20} className="text-[#666D80]" />
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#A0A9B4] mb-0.5">روز</span>
              <span className="text-base font-semibold text-[#0D0D12] font-num-medium">
                {selDay}
              </span>
            </div>
            <button
              type="button"
              onClick={handleNextDay}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} className="text-[#666D80]" />
            </button>
          </div>

          {/* ── Confirm Button ── */}
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-2.5 rounded-xl bg-[#FDD00A] text-[#0D0D12] text-sm font-bold transition-colors hover:bg-[#f5c800]"
          >
            تایید
          </button>
        </div>
      )}
    </div>
  );
}

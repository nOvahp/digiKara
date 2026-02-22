'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  PERSIAN_MONTHS,
  PERSIAN_DAYS,
  gregorianToJalali,
  jalaliToGregorian,
  getDaysInJalaliMonth,
  formatPersianDate,
} from '@/lib/persian-date';

interface PersianDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  className?: string;
}

export function PersianDatePicker({ value, onChange, className = '' }: PersianDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState<[number, number]>(() => {
    if (value) {
      const parts = value.split(/\/|-/);
      if (parts.length === 3) {
        return [parseInt(parts[0]), parseInt(parts[1])];
      }
    }
    const today = new Date();
    const [jy, jm] = gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
    return [jy, jm];
  });

  const [jy, jm] = viewDate;
  const daysInMonth = getDaysInJalaliMonth(jm, jy);

  const handleDateClick = (day: number) => {
    const [gy, gm, gd] = jalaliToGregorian(jy, jm, day);
    const dateStr = `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    if (jm === 1) {
      setViewDate([jy - 1, 12]);
    } else {
      setViewDate([jy, jm - 1]);
    }
  };

  const handleNextMonth = () => {
    if (jm === 12) {
      setViewDate([jy + 1, 1]);
    } else {
      setViewDate([jy, jm + 1]);
    }
  };

  const displayValue =
    value && value.match(/^\d{4}-\d{2}-\d{2}$/)
      ? (() => {
          const parts = value.split('-');
          const [pjy, pjm, pjd] = gregorianToJalali(
            parseInt(parts[0]),
            parseInt(parts[1]),
            parseInt(parts[2])
          );
          return `${pjy}/${String(pjm).padStart(2, '0')}/${String(pjd).padStart(2, '0')}`;
        })()
      : 'انتخاب تاریخ';

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[52px] bg-white rounded-xl border border-[#DCE4E8] px-3 text-right font-num-medium text-[#0D0D12] text-sm hover:border-[#FDD00A] focus:outline-none focus:border-[#FDD00A] transition-colors ${className}`}
      >
        {displayValue}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-[#DFE1E7] rounded-xl shadow-lg p-4">
          {/* Header with month/year and navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight size={20} className="text-[#666D80]" />
            </button>
            <div className="text-center font-num-medium font-semibold text-[#0D0D12]">
              <span>{PERSIAN_MONTHS[jm - 1]}</span>
              <span className="mx-2">{jy}</span>
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft size={20} className="text-[#666D80]" />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {PERSIAN_DAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-num-medium text-[#666D80] py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isSelected = (() => {
                if (!value || !value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
                const parts = value.split('-');
                const [sjy, sjm, sjd] = gregorianToJalali(
                  parseInt(parts[0]),
                  parseInt(parts[1]),
                  parseInt(parts[2])
                );
                return sjy === jy && sjm === jm && sjd === day;
              })();

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateClick(day)}
                  className={`h-8 rounded-lg text-sm font-num-medium transition-colors ${
                    isSelected
                      ? 'bg-[#FDD00A] text-[#0D0D12] font-semibold'
                      : 'text-[#0D0D12] hover:bg-gray-100'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 py-2 text-sm font-semibold text-[#666D80] hover:bg-gray-50 rounded-lg transition-colors"
          >
            بستن
          </button>
        </div>
      )}
    </div>
  );
}

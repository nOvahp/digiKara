'use client';

import * as React from 'react';
import { ChevronLeft } from 'lucide-react';

interface LoginTopNavProps {
  onBackClick?: () => void;
}

export function LoginTopNav({ onBackClick }: LoginTopNavProps) {
  return (
    <div
      className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-0 px-0 mt-0"
      dir="ltr"
    >
      {/* Back Button / Icon */}
      <div
        className="p-2 overflow-hidden rounded-full backdrop-blur-[2px] flex justify-start items-start gap-2.5 cursor-pointer"
        onClick={onBackClick}
        role="button"
      >
        <ChevronLeft className="w-6 h-6 text-[#393E46]" strokeWidth={2.5} />
      </div>

      {/* Title */}
      <div className="flex justify-end items-center gap-[7.56px]">
        <div className="text-center text-[#393E46] text-[18.14px]  font-extrabold leading-[27.21px] wrap-break-word">
          دیجی کارا
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface PartnersCardProps {
  category?: string;
  title?: string;
  color?: string;
  bgColor?: string;
}

const PartnersCard = ({
  category = 'حامیان دولتی',
  title = 'سازمان ها و نهادهای آموزش مهارتی',
  color = '#007AFF',
  bgColor = 'rgba(203.51, 228.14, 255, 0.20)',
}: PartnersCardProps) => {
  return (
    <Card className="w-full bg-white border border-[#CACACA] rounded-[24px] shadow-sm">
      <CardContent className="px-8 flex flex-col items-end gap-4" dir="rtl">
        <div
          className="px-0 py-0 rounded-[119px] inline-flex justify-start items-start gap-2.5"
          style={{ backgroundColor: bgColor }}
        >
          <div className="text-[10px] p-2 font-extrabold" style={{ color: color }}>
            {category}
          </div>
        </div>
        <div className="text-[#222325] text-[24px] font-bold leading-[28.80px] text-right">
          {title}
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnersCard;

'use client';

import React from 'react';

interface ValuesCardProps {
  title?: string;
  description?: string;
  number?: string;
}

const ValuesCard = ({
  title = 'ثبت‌نام مدارس',
  description = 'مدیر مدرسه اطلاعات پایه را وارد و پروفایل مدرسه را ایجاد می‌کند',
  number = '01',
}: ValuesCardProps) => {
  return (
    <div className="w-full h-full py-6 xl:py-8 justify-between items-end xl:items-center flex flex-col-reverse xl:flex-row border-b border-[#D3D3D3] gap-4 xl:gap-0">
      <div className="w-full xl:w-[577px] text-[#808080] text-[16px] xl:text-[20px] font-medium leading-[28px] xl:leading-[36px] text-right">
        {description}
      </div>
      <div className="flex items-center gap-4 xl:gap-6">
        <div className="text-[#222325] text-[20px] xl:text-[24px] font-black leading-[30px] xl:leading-[38.4px] text-right">
          {title}
        </div>
        <div className="text-[#222325] text-[24px] font-num-black leading-none">{number}</div>
      </div>
    </div>
  );
};

export default ValuesCard;

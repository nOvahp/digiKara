'use client';

import React from 'react';

const PartnersTitle = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center lg:items-start lg:sticky">
      <div className="self-stretch text-center lg:text-right text-[#585858] text-[20px] lg:text-[24px] 2xl:text-[32px] font-black">
        سازمان‌ها و شرکت‌ها
      </div>
      <div className="self-stretch text-center lg:text-right text-[#222325] text-[30px] lg:text-[45px] 2xl:text-[60px] font-black leading-[50px] lg:leading-[72px] 2xl:leading-[90px] mb-[3%]">
        شرکا و حامیان دیجی‌کارا
      </div>
      <div className="self-stretch text-center lg:text-right text-[#808080] text-[16px] lg:text-[20px] 2xl:text-[24px] font-black">
        سازمان‌ها و شرکت‌هایی که در توسعه اکوسیستم مدارس‌ها نقش دارند
      </div>
    </div>
  );
};

export default PartnersTitle;

'use client';

import React from 'react';
import Image from 'next/image';
import MetricItem from './MetricItem';
import { metricsData } from './metricsData';

const Metrics = () => {
  return (
    <div
      className="w-full flex justify-center items-center py-[30px] px-[20px] lg:px-[10px] mb-[5%]"
      dir="rtl"
    >
      <div className="relative w-full max-w-[1440px] 2xl:max-w-none">
        <div className="w-full bg-white rounded-[24px] border border-[#CACACA] flex flex-col lg:flex-row justify-between items-center lg:pr-[280px] xl:pr-[400px] 2xl:pr-[500px] mt-[100px] lg:mt-0 relative z-10 py-[25px] lg:pl-[55px]">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row justify-between items-center gap-[12px] lg:gap-[20px]">
            {metricsData.map((item) => (
              <MetricItem key={item.id} value={item.value} label={item.label} />
            ))}
          </div>
        </div>

        <div className="absolute right-0 top-[-113px] hidden lg:block lg:w-[250px] lg:h-[250px] xl:w-[333px] xl:h-[333px] 2xl:w-[450px] 2xl:h-[450px] overflow-visible z-20 pointer-events-none">
          <Image
            src="/man rates his purchases.png"
            alt="Metrics Data Illustration"
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 -top-[60px] sm:-top-[70px] md:-top-[75px] lg:hidden w-[150px] h-[150px] md:w-[200px] md:h-[200px] z-20">
          <Image
            src="/man rates his purchases.png"
            alt="Metrics Data Illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Metrics;

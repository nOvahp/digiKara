"use client";

import React from "react";
import Image from "next/image";
import MetricItem from "./MetricItem";
import { metricsData } from "./metricsData";

const Metrics = () => {
  return (
    <div
      className="w-full flex justify-center items-center py-[30px] px-[20px] lg:px-[10px]"
      dir="rtl"
    >
      <div className="relative w-full max-w-[1440px]">
        {/* Card Container */}
        <div className="w-full bg-white rounded-[24px] border border-[#CACACA] flex flex-col lg:flex-row justify-between items-center lg:pr-[280px] xl:pr-[400px] mt-[100px] lg:mt-0 relative z-10 py-[25px] lg:pl-[55px]">
          {/* Metric Items */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row justify-between items-center gap-[12px] lg:gap-[20px]">
            {metricsData.map((item) => (
              <MetricItem key={item.id} value={item.value} label={item.label} />
            ))}
          </div>
        </div>

        {/* Floating Image */}
        {/* Desktop: Absolute Positioned on the Right (Start in RTL) */}
        <div className="absolute right-0 top-[-113px] hidden lg:block lg:w-[250px] lg:h-[250px] xl:w-[333px] xl:h-[333px] overflow-visible z-20 pointer-events-none">
          <Image
            src="/data.png"
            alt="Metrics Data Illustration"
            fill
            className="object-contain"
          />
        </div>

        {/* Mobile: Centered Image on top */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-[60px] sm:-top-[70px] md:-top-[75px] lg:hidden w-[150px] h-[150px] md:w-[200px] md:h-[200px] z-20">
          <Image
            src="/data.png"
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

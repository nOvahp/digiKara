"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ChamferedButton from "@/app/components/ChamferedButton";

const Hero = () => {
  return (
    <section className="relative min-h-[850px] lg:min-h-[700px] xl:min-h-0 xl:h-[600px] overflow-hidden bg-white flex flex-col lg:flex-row items-center justify-between px-6 lg:pl-10 xl:pl-20 lg:pr-0 py-10 lg:py-0">
      {/* Background Graphic 1 (Left Top) - Adapted from absolute 275x275 div */}
      {/* Decorative Image 1 (Excited Man) */}
      <div className="absolute left-[-20px] top-[-20px] lg:left-[2%] xl:left-[0%] lg:top-[5%] xl:top-[-3%] z-0 opacity-80 ">
        <Image
          src="/man running with bags and purchases 1.png"
          alt="Excited Man"
          width={300}
          height={300}
          className="object-contain w-[150px] lg:w-[150px] xl:w-[230px]"
        />
      </div>

      {/* Main Image (Left) */}
      {/* Main Image (Left) - Now Absolute Background-like */}
      <div className="absolute inset-x-0 top-[260px] lg:top-10  left-[-20%] lg:left-0 xl:left-[-20] xl:top-[10] lg:right-auto w-[120%] lg:w-1/2 xl:w-6/9 z-10 flex justify-center lg:justify-start pointer-events-none">
        <Image
          src="/iPhone Double Stylized Mockup 1.png"
          alt="iPhone Mockup"
          width={1040}
          height={720}
          className="object-contain w-full lg:max-w-none "
        />
      </div>

      {/* Content Section (Right) */}
      <div className="relative w-[500px] ml-auto flex  flex-col items-center lg:items-end text-center lg:text-right gap-2 lg:gap-4 xl:gap-6 z-20 mt-10 lg:mt-0 px-4 lg:px-0">
        <h1 className="text-[#222325] text-[32px] lg:text-[36px] xl:text-[45px] font-[900] leading-[38.4px] lg:leading-normal font-extrablack whitespace-nowrap mb-4 lg:mb-6 xl:mb-8">
          پلتفرم نوجوان کارآفرین
        </h1>
        <h2 className="text-[#5E6B7E] text-[16px] lg:text-[20px] xl:text-[24px]  font-bold whitespace-nowrap">
          پل ارتباطی میان آموزش فنی‌حرفه‌ای و بازار واقعی کار
        </h2>
        <p
          className="text-[#222325] text-[16px] lg:text-[16px] xl:text-[18px] font-normal leading-[36px] lg:leading-normal font-num-regular max-w-[650px] mt-4 text-justify"
          dir="rtl"
        >
          دیجی‌کارا سامانه‌ای است که به هنرستان‌های فنی‌حرفه‌ای و کاردانش کمک
          می‌کند تا محصولات و خدمات تولیدی خود را به‌صورت آنلاین عرضه کنند،
          درآمدزایی کنند و هنرجویان را با مهارت‌های واقعی به دنیای کار وصل
          نمایند.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          {/* Demo Button */}
          <ChamferedButton
            className="w-[110px] h-[43px] lg:w-[130px] xl:w-[148px]"
            backgroundColor="#FFE9B9"
            borderColor="#E9B443"
            hoverColor="#ffe09e"
            cutSide="left"
          >
            <span className="text-[#222325] text-[12px] lg:text-[13px] xl:text-sm font-extrabold uppercase">
              مشاهده دمـــــــو
            </span>
          </ChamferedButton>

          {/* Register Button */}
          <ChamferedButton
            className="w-[148px] h-[43px] lg:w-[130px] xl:w-[148px]"
            backgroundColor="white"
            borderColor="#E5E7EB"
            hoverColor="#f9fafb"
            cutSide="left"
          >
            <span className="text-[#222325] text-[12px] lg:text-[13px] xl:text-sm font-extrabold uppercase">
              ثبت‌نام رایگان هنرستان
            </span>
          </ChamferedButton>
        </div>
      </div>

      {/* Decorative Image 2 (Running Man) */}
      <div className="absolute left-[50%] top-[20%] lg:left-[30%] xl:left-[36%] lg:top-[50%] xl:top-[60%] z-20 opacity-100 pointer-events-none">
        <Image
          src="/man is excited about the launch of the project 1.png"
          alt="Runner"
          width={300}
          height={300}
          className="object-contain w-[150px] lg:w-[150px] xl:w-[250px]"
        />
      </div>
    </section>
  );
};

export default Hero;

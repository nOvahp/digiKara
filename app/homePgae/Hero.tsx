"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ChamferedButton from "@/app/components/ChamferedButton";

const Hero = () => {
  return (
    <section className="border relative h-[550px]  md:h-[850px] lg:h-[450px] xl:h-[600px] overflow-hidden bg-white flex flex-col lg:flex-row items-center justify-between lg:pl-10 xl:pl-20 lg:pr-0 lg:py-0 ">
      {/* Background Graphic 1 (Left Top) */}
      <div className="absolute left-[0px] top-[320px] lg:left-[0%] xl:left-[0%] lg:top-[-5%] xl:top-[-3%] z-0 opacity-80 ">
        <Image
          src="/man running with bags and purchases 1.png"
          alt="Excited Man"
          width={300}
          height={300}
          className="object-contain w-[120px] lg:w-[180px] xl:w-[230px]"
        />
      </div>

      {/* Main Image (Left) */}
      <div className="relative order-2 w-[120%] top-[-60px] left-[5%] sm:w-full sm:left-0 lg:absolute lg:inset-x-0 lg:top-5 lg:left-[-10] xl:left-[-20] xl:top-[10] lg:right-auto lg:w-6/9 xl:w-6/9 z-10 flex justify-center lg:justify-start pointer-events-none mt-[-50px] lg:mt-0">
        <Image
          src="/iPhone Double Stylized Mockup 1.png"
          alt="iPhone Mockup"
          width={1040}
          height={720}
          className="object-contain w-full lg:max-w-none xl:max-w-none"
        />
      </div>

      {/* Content Wrapper - 'contents' on mobile to allow reordering, 'flex' on desktop to group */}
      <div className="contents lg:flex lg:flex-col lg:items-end lg:text-right lg:gap-4 xl:gap-6 lg:z-20 lg:mt-0 xl:w-[500px] lg:w-[400px] lg:ml-auto lg:px-0">
        {/* Text Group */}
        <div className="order-1 flex flex-col items-center lg:items-end text-center lg:text-right gap-2 z-20 mt-10 lg:mt-0 px-4 lg:px-0">
          <h1 className="text-[#222325] text-[22px] lg:text-[36px] xl:text-[45px] font-[900] leading-[38.4px] lg:leading-normal font-extrablack whitespace-normal lg:whitespace-nowrap mb-4 lg:mb-6 xl:mb-8">
            پلتفرم نوجوان کارآفرین
          </h1>
          <h2 className="text-[#5E6B7E] text-[13px] lg:text-[20px] xl:text-[24px] font-bold whitespace-normal lg:whitespace-nowrap">
            پل ارتباطی میان آموزش فنی‌حرفه‌ای و بازار واقعی کار
          </h2>
          <p
            className="text-[#222325] text-[12px] lg:text-[16px] xl:text-[18px] font-normal leading-[36px] lg:leading-normal font-num-regular max-w-[650px] mt-4 text-justify"
            dir="rtl"
          >
            دیجی‌کارا سامانه‌ای است که به هنرستان‌های فنی‌حرفه‌ای و کاردانش کمک
            می‌کند تا محصولات و خدمات تولیدی خود را به‌صورت آنلاین عرضه کنند،
            درآمدزایی کنند و هنرجویان را با مهارت‌های واقعی به دنیای کار وصل
            نمایند.
          </p>
        </div>

        {/* Buttons Group */}
        <div className="order-3 flex flex-row gap-4 relative top-[-170px] md:top-[-170px] lg:top-0 lg:mt-10 z-20">
          {/* Demo Button */}
          <ChamferedButton
            className="w-[90px] h-[43px] lg:w-[130px] xl:w-[148px]"
            backgroundColor="#FFE9B9"
            borderColor="#E9B443"
            hoverColor="#ffe09e"
            cutSide="left"
          >
            <span className="text-[#222325] text-[10px] lg:text-[13px] xl:text-sm font-extrabold uppercase">
              مشاهده دمـــــــو
            </span>
          </ChamferedButton>

          {/* Register Button */}
          <ChamferedButton
            className="w-[120px] h-[43px] lg:w-[130px] xl:w-[148px]"
            backgroundColor="white"
            borderColor="#E5E7EB"
            hoverColor="#f9fafb"
            cutSide="right"
          >
            <span className="text-[#222325] text-[10px] lg:text-[13px] xl:text-sm font-extrabold uppercase">
              ثبت‌نام رایگان هنرستان
            </span>
          </ChamferedButton>
        </div>
      </div>

      {/* Decorative Image 2 (Running Man) */}
      <div className="absolute left-[60%] top-[61%] lg:left-[35%] xl:left-[36%] lg:top-[56%] xl:top-[60%] z-20 opacity-100 pointer-events-none">
        <Image
          src="/man is excited about the launch of the project 1.png"
          alt="Runner"
          width={300}
          height={300}
          className="object-contain w-[180px] lg:w-[180px] xl:w-[250px]"
        />
      </div>
    </section>
  );
};

export default Hero;

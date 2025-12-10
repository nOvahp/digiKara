"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ChamferedButton from "@/app/components/ChamferedButton";

const Hero = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between h-[650px] sm:h-[700px] md:h-[750px] lg:h-[450px] xl:h-[600px] overflow-hidden bg-white lg:pl-10 xl:pl-20 lg:pr-0 lg:py-0 mb-[10%]">
      <div className="absolute z-0 left-0 top-[290px] min-[375px]:top-[250px] sm:top-[300px] sm:left-[20px] md:top-[25%] md:left-[40] lg:left-0 lg:top-[-5%] xl:left-0 xl:top-[-3%] opacity-80">
        <Image
          src="/man running with bags and purchases 1.png"
          alt="Excited Man"
          width={300}
          height={300}
          className="object-contain w-[120px] sm:w-[150px] md:w-[180px] lg:w-[180px] xl:w-[230px]"
        />
      </div>

      <div className="relative z-10 order-2 flex justify-center lg:justify-start lg:absolute lg:inset-x-0 w-[120%] sm:w-full lg:w-6/9 xl:w-6/9 mt-0 lg:mt-0 top-[-20px] sm:top-[-20px] md:top-0 lg:top-5 xl:top-[10px] left-[5%] sm:left-0 md:left-[10] lg:left-[-10] xl:left-[-20] lg:right-auto pointer-events-none">
        <Image
          src="/iPhone Double Stylized Mockup 1.png"
          alt="iPhone Mockup"
          width={1040}
          height={720}
          className="object-contain w-full lg:max-w-none xl:max-w-none"
        />
      </div>

      <div className="contents lg:flex lg:flex-col lg:items-end lg:text-right lg:z-20 lg:w-[400px] xl:w-[500px] lg:mt-0 lg:ml-auto lg:px-0 lg:gap-4 xl:gap-6">
        <div className="order-1 flex flex-col items-center lg:items-end z-20 mt-10 lg:mt-0 px-4 lg:px-0 gap-2 text-center lg:text-right">
          <h1 className="text-[#222325] text-[22px] sm:text-[24px] md:text-[25px] lg:text-[36px] xl:text-[45px] font-[900] font-extrablack leading-[38.4px] lg:leading-normal whitespace-normal lg:whitespace-nowrap mb-4 lg:mb-6 xl:mb-8">
            پلتفرم نوجوان کارآفرین
          </h1>
          <h2 className="text-[#5E6B7E] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[20px] xl:text-[24px] font-bold whitespace-normal lg:whitespace-nowrap">
            پل ارتباطی میان آموزش فنی‌حرفه‌ای و بازار واقعی کار
          </h2>
          <p
            className="text-[#222325] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-normal font-num-regular leading-[36px] lg:leading-normal max-w-[650px] mt-4 text-justify"
            dir="rtl"
          >
            دیجی‌کارا سامانه‌ای است که به هنرستان‌های فنی‌حرفه‌ای و کاردانش کمک
            می‌کند تا محصولات و خدمات تولیدی خود را به‌صورت آنلاین عرضه کنند،
            درآمدزایی کنند و هنرجویان را با مهارت‌های واقعی به دنیای کار وصل
            نمایند.
          </p>
        </div>

        <div className="relative z-20 order-3 flex flex-row gap-4 top-[-10px] sm:top-[-90px] md:top-[-30px] lg:top-0 lg:mt-10">
          <ChamferedButton
            className="w-[90px] h-[43px] sm:w-[110px] lg:w-[130px] xl:w-[148px]"
            backgroundColor="#FFE9B9"
            borderColor="#E9B443"
            hoverColor="#ffe09e"
            cutSide="left"
          >
            <span className="text-[#222325] text-[10px] sm:text-[11px] lg:text-[13px] xl:text-sm font-extrabold uppercase">
              مشاهده دمـــــــو
            </span>
          </ChamferedButton>

          <ChamferedButton
            className="w-[120px] h-[43px] sm:w-[135px] lg:w-[130px] xl:w-[148px]"
            backgroundColor="white"
            borderColor="#E5E7EB"
            hoverColor="#f9fafb"
            cutSide="right"
          >
            <span className="text-[#222325] text-[10px] sm:text-[11px] lg:text-[13px] xl:text-sm font-extrabold uppercase">
              ثبت‌نام رایگان هنرستان
            </span>
          </ChamferedButton>
        </div>
      </div>

      <div className="absolute z-20 left-[60%] md:left-[60%] lg:left-[35%] xl:left-[36%] top-[71%] min-[375px]:top-[67%] sm:top-[73%] md:top-[65%] lg:top-[56%] xl:top-[60%] opacity-100 pointer-events-none">
        <Image
          src="/man is excited about the launch of the project 1.png"
          alt="Runner"
          width={300}
          height={300}
          className="object-contain w-[150px] sm:w-[165px] md:w-[180px] lg:w-[180px] xl:w-[250px]"
        />
      </div>
    </section>
  );
};

export default Hero;

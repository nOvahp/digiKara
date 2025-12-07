"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-[600px] overflow-hidden bg-white flex flex-col lg:flex-row items-center justify-between  ">
      {/* Background Graphic 1 (Left Top) - Adapted from absolute 275x275 div */}
      {/* Decorative Image 1 (Excited Man) */}
      <div className="absolute left-[-20px] top-[-20px] lg:left-[5%] lg:top-[-5%] z-0 opacity-80 pointer-events-none">
        <Image
          src="/man running with bags and purchases 1.png"
          alt="Excited Man"
          width={300}
          height={300}
          className="object-contain w-[150px] lg:w-[250px]"
        />
      </div>

      {/* Main Image (Left) */}
      {/* Main Image (Left) - Now Absolute Background-like */}
      <div className="absolute  inset-x-0 top-0 lg:top-5 lg:left-10 lg:right-auto lg:w-5/8 z-10 flex justify-center lg:justify-start pointer-events-none">
        <Image
          src="/iPhone Double Stylized Mockup 1.png"
          alt="iPhone Mockup"
          width={1040}
          height={720}
          className="object-contain w-full lg:max-w-none "
        />
      </div>

      {/* Content Section (Right) */}
      <div className="relative w-full  ml-auto flex flex-col items-center lg:items-end text-center lg:text-right gap-6 z-20">
        <h1 className="text-[#222325] text-4xl lg:text-[55px] font-extrablack whitespace-nowrap mb-8">
          پلتفرم نوجوان کارآفرین
        </h1>
        <h2 className="text-[#5E6B7E] text-xl lg:text-[32px] font-bold  whitespace-nowrap">
          پل ارتباطی میان آموزش فنی‌حرفه‌ای و بازار واقعی کار
        </h2>
        <p className=" text-[#222325] text-base lg:text-[22px] font-num-regular max-w-[610px]">
          دیجی‌کارا سامانه‌ای است که به هنرستان‌های فنی‌حرفه‌ای و کاردانش کمک
          می‌کند تا محصولات و خدمات تولیدی خود را به‌صورت آنلاین عرضه کنند،
          درآمدزایی کنند و هنرجویان را با مهارت‌های واقعی به دنیای کار وصل
          نمایند.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-20">
          {/* Demo Button */}
          <Button className="w-[148px] h-[43px] bg-[#FFE9B9] hover:bg-[#ffe09e] text-[#222325] text-sm font-extrabold uppercase rounded-sm cursor-pointer">
            مشاهده دمـــــــو
          </Button>

          {/* Register Button */}
          <Button
            variant="outline"
            className="w-[148px] h-[43px] bg-white border-gray-200 text-[#222325] text-sm font-extrabold uppercase rounded-sm hover:bg-gray-50 cursor-pointer"
          >
            ثبت‌نام رایگان هنرستان
          </Button>
        </div>
      </div>

      {/* Decorative Image 2 (Running Man) */}
      <div className="absolute left-[50%] top-[20%] lg:left-[33%] lg:top-[62%] z-20 opacity-100 pointer-events-none">
        <Image
          src="/man is excited about the launch of the project 1.png"
          alt="Runner"
          width={300}
          height={300}
          className="object-contain w-[150px] lg:w-[250px]"
        />
      </div>
    </section>
  );
};

export default Hero;

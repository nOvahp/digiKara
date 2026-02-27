'use client';

import React from 'react';
import Image from 'next/image';

// ─── Wire up these handlers / routes as needed ───────────────────────────────
const handleDemo = () => {};
const handleRegister = () => {};

const Hero = () => {
  return (
    <section
      dir="rtl"
      className="relative z-10 bg-white overflow-x-hidden py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          RTL flex-row: first DOM child → right side (content)
                        second DOM child → left side  (image)
        */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-0">

          {/* ── Right column: Persian content ──────────────────────────────── */}
          <div className="flex flex-col items-start text-right gap-5 lg:gap-6 lg:w-[50%] xl:w-[48%] shrink-0 lg:pr-6 xl:pr-10">

            <h1 className="text-[#222325] text-[30px] sm:text-[38px] lg:text-[42px] xl:text-[56px] 2xl:text-[60px] leading-tight font-extrablack whitespace-nowrap">
              پلتفرم نوجوان کارآفرین
            </h1>

            <p className="text-[#5E6B7E] text-[17px] sm:text-[20px] lg:text-[22px] xl:text-[28px] 2xl:text-[32px] leading-relaxed font-semibold whitespace-nowrap">
              پلی میان آموزش مهارت و بکارگیری در بازار واقعی کار
            </p>

            <p className="text-[#222325] text-[13px] sm:text-[15px] lg:text-[18px] xl:text-[24px] leading-relaxed font-regular max-w-[610px]">
              دیجی‌کارا سامانه‌ای است که به هنرستان‌های فنی‌حرفه‌ای و کاردانش
              کمک می‌کند تا محصولات و خدمات تولیدی خود را به‌صورت آنلاین عرضه
              کنند، درآمدزایی کنند و هنرجویان را با مهارت‌های واقعی به دنیای
              کار وصل نمایند.
            </p>

            {/*
              .Button row (RTL flex-row on sm+):
                first DOM  → right = Blue  (Primary)
                second DOM → left  = Yellow (Secondary)
              Mobile (flex-col): Blue on top as primary CTA
            */}
            <div className="hidden lg:flex flex-row gap-3 w-full mt-1">
              {/* Primary — Blue (right on desktop) */}
              <button
                type="button"
                onClick={handleRegister}
                className="bg-[#0A33FF] text-white h-11 w-full sm:w-auto px-6 rounded-xl shadow-sm ring-1 ring-[#E5E5E5] font-num-black text-sm cursor-pointer hover:opacity-90 transition-opacity"
              >
                ثبت‌نام رایگان هنرستان
              </button>

              {/* Secondary — Yellow (left on desktop) */}
              <button
                type="button"
                onClick={handleDemo}
                className="bg-[#FBCE09] text-[#4A4A4A] h-11 w-full sm:w-auto px-6 rounded-xl shadow-sm ring-1 ring-[#E5E5E5] font-num-black text-sm cursor-pointer hover:opacity-90 transition-opacity"
              >
                مشاهده دمـــــــو
              </button>
            </div>
          </div>

          {/* ── Left column: hero visual ────────────────────────────────────── */}
          <div className="relative w-full lg:w-[50%] xl:w-[52%] h-[320px] sm:h-[420px] md:h-[520px] lg:h-[540px] xl:h-[620px] 2xl:h-[700px] min-h-0 overflow-hidden">

            {/* Main phone / UI mockup */}
            <Image
              src="/hero.png"
              alt="تصویر پلتفرم دیجی‌کارا"
              fill
              className="object-contain scale-125 lg:scale-[1.35]"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />

            {/* Decorative character — top-left (man with VR) */}
            <div className="absolute top-0 left-0 z-10 pointer-events-none w-[90px] sm:w-[120px] md:w-[150px] lg:w-[170px] xl:w-[210px]">
              <Image
                src="/man spins an object in virtual reality.png"
                alt=""
                width={210}
                height={210}
                className="object-contain w-full h-auto"
              />
            </div>

            {/* Decorative character — bottom-right (teacher) */}
            <div className="absolute bottom-0 right-[4%] z-10 pointer-events-none w-[100px] sm:w-[130px] md:w-[160px] lg:w-[185px] xl:w-[230px]">
              <Image
                src="/teacher working on her laptop.png"
                alt=""
                width={210}
                height={210}
                className="object-contain w-full h-auto"
              />
            </div>
          </div>

        </div>

        {/* Buttons — mobile only, shown below the image */}
        <div className="flex lg:hidden flex-row gap-3 w-full mt-4 px-1">
          <button
            type="button"
            onClick={handleRegister}
            className="bg-[#0A33FF] text-white h-11 flex-1 rounded-xl shadow-sm ring-1 ring-[#E5E5E5] font-num-black text-sm cursor-pointer hover:opacity-90 transition-opacity"
          >
            ثبت‌نام رایگان هنرستان
          </button>
          <button
            type="button"
            onClick={handleDemo}
            className="bg-[#FBCE09] text-[#4A4A4A] h-11 flex-1 rounded-xl shadow-sm ring-1 ring-[#E5E5E5] font-num-black text-sm cursor-pointer hover:opacity-90 transition-opacity"
          >
            مشاهده دمـــــــو
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;

'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import ChamferedButton from '@/app/components/ChamferedButton';

const Hero = () => {
  const router = useRouter();

  // Navigate to dedicated search page
  const handleInputClick = () => {
    router.push('/Bazzar/Search');
  };

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between h-[750px] sm:h-[800px] md:h-[950px] lg:h-[550px] xl:h-[650px] 2xl:h-[850px] overflow-hidden bg-white lg:pl-10 xl:pl-20 2xl:pl-32 lg:pr-0 lg:py-0 mb-[5%] ">
      <div className="absolute z-0 left-0 top-[370px] min-[375px]:top-[330px] sm:top-[300px] sm:left-[20px] md:top-[37%] md:left-[40] lg:left-0 lg:top-[-5%] xl:left-0 xl:top-[-3%] opacity-80">
        <Image
          src="/man spins an object in virtual reality.png"
          alt="Excited Man"
          width={300}
          height={300}
          className="object-contain w-[120px] sm:w-[150px] md:w-[180px] lg:w-[180px] xl:w-[230px] 2xl:w-[300px]"
        />
      </div>

      <div className="relative z-10 order-2 flex justify-center lg:justify-start lg:absolute lg:inset-x-0 w-[120%] sm:w-full lg:w-6/9 xl:w-6/9 mt-0 lg:mt-0 top-[-20px] sm:top-[-20px] md:top-0 lg:top-5 xl:top-[10px] left-[5%] sm:left-0 md:left-[10] lg:left-[-10] xl:left-[-20] lg:right-auto pointer-events-none">
        <Image
          src="/hero.png"
          alt="iPhone Mockup"
          width={1040}
          height={720}
          className="object-contain w-full lg:max-w-none xl:max-w-none"
        />
      </div>

      <div className="contents lg:flex lg:flex-col lg:items-end lg:text-right lg:z-20 lg:w-[400px] xl:w-[500px] 2xl:w-[650px] lg:mt-[10%] lg:ml-auto lg:px-0 lg:gap-4 xl:gap-6 2xl:gap-8 mt-10">
        <div className="order-1 flex flex-col items-center lg:items-end z-20 mt-10 lg:mt-0 px-4 lg:px-0 gap-2 text-center lg:text-right">
          <h1 className="text-[#222325] text-[22px] sm:text-[24px] md:text-[25px] lg:text-[30px] xl:text-[45px] 2xl:text-[60px] font-[900] font-extrablack leading-[38.4px] lg:leading-normal whitespace-normal lg:whitespace-nowrap mb-4 lg:mb-6 xl:mb-8 2xl:mb-10">
            پلتفرم نوجوان کارآفرین
          </h1>
          <h2 className="text-[#5E6B7E] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[20px] xl:text-[24px] 2xl:text-[32px] font-bold whitespace-normal lg:whitespace-nowrap">
            پلی میان آموزش مهارت و بکارگیری در بازر واقعی کار
          </h2>
          <p
            className="text-[#222325] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] font-normal leading-5 lg:leading-normal max-w-[650px] 2xl:max-w-[800px] mt-4 text-justify"
            dir="rtl"
          >
            دیجی‌کارا سامانه‌ای است که به مدارس‌های فنی‌حرفه‌ای و کاردانش کمک می‌کند تا محصولات و
            خدمات تولیدی خود را به‌صورت آنلاین عرضه کنند، درآمدزایی کنند و دانش آموزان را با
            مهارت‌های واقعی به دنیای کار وصل نمایند.
          </p>
          <div className="w-full max-w-[450px] 2xl:max-w-[600px] mt-4 mb-0 z-30 flex flex-col gap-2">
            <span className="text-[#222325] text-sm sm:text-base 2xl:text-xl font-bold text-right w-full px-1">
              محصول مورد نظرت رو پیدا کن
            </span>
            <div
              className="w-full relative h-12 sm:h-14 bg-gray-50 rounded-xl flex items-center px-2 border border-[#E9B443] transition-all"
              onClick={handleInputClick}
            >
              <div className="absolute -inset-1  rounded-2xl blur opacity-30 animate-pulse -z-10"></div>

              {/* Location (Visual only) */}
              <div className="flex items-center gap-1.5 px-3 text-gray-600 transition-colors shrink-0">
                <span className="text-xs sm:text-sm font-bold">تهران</span>
                <MapPin size={16} className="text-gray-500" />
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-200 mx-1"></div>

              {/* ReadOnly Input */}
              <div className="flex-1 h-full flex items-center justify-end px-2">
                <span className="text-gray-400 text-[12px] sm:text-sm">جستجو در محصولات...</span>
              </div>

              {/* Search Button (Icon) */}
              <button className="p-2 text-gray-400 hover:text-[#E9B443] transition-colors">
                <Search size={20} className="stroke-[2.5px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-20 order-3 flex flex-row gap-4 top-[-30px] sm:top-[-90px] md:top-[-30px] lg:top-0 lg:mt-10 lg:mb-1">
          <ChamferedButton
            className="w-[90px] h-[43px] sm:w-[110px] lg:w-[130px] xl:w-[148px] 2xl:w-[180px] 2xl:h-[55px]"
            backgroundColor="#FFE9B9"
            borderColor="#E9B443"
            hoverColor="#ffe09e"
            cutSide="left"
          >
            <span className="text-[#222325] text-[10px] sm:text-[11px] lg:text-[13px] xl:text-sm 2xl:text-lg font-extrabold uppercase">
              مشاهده دمـــــــو
            </span>
          </ChamferedButton>

          <ChamferedButton
            className="w-[120px] h-[43px] sm:w-[135px] lg:w-[130px] xl:w-[148px] 2xl:w-[180px] 2xl:h-[55px]"
            backgroundColor="white"
            borderColor="#E5E7EB"
            hoverColor="#f9fafb"
            cutSide="right"
          >
            <span className="text-[#222325] text-[10px] sm:text-[11px] lg:text-[13px] xl:text-sm 2xl:text-lg font-extrabold uppercase">
              ثبت‌نام رایگان مدارس
            </span>
          </ChamferedButton>
        </div>
      </div>

      <div className="absolute z-20 left-[60%] md:left-[60%] lg:left-[35%] xl:left-[36%] top-[71%] min-[375px]:top-[67%] sm:top-[73%] md:top-[70%] lg:top-[56%] xl:top-[60%] opacity-100 pointer-events-none">
        <Image
          src="/teacher working on her laptop.png"
          alt="Runner"
          width={300}
          height={300}
          className="object-contain w-[150px] sm:w-[165px] md:w-[180px] lg:w-[180px] xl:w-[250px] 2xl:w-[320px]"
        />
      </div>
    </section>
  );
};

export default Hero;

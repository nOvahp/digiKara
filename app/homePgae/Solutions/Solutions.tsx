"use client";

import React from "react";
import SolutionItem from "./SolutionItem";
import ChamferedButton from "@/app/components/ChamferedButton";
import SolutionsImage from "./SolutionsImage";
import { solutionsData } from "./solutionsData";

const Solutions = () => {
  return (
    <div className="w-full flex justify-between items-start mb-[10%]" dir="rtl">
      {/* Visual Right: Image (Placed First in RTL Flex container) */}
      <div className="relative flex justify-start items-center gap-[10px] hidden lg:flex mr-10 xl:mt-[-100px]">
        <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[550px] xl:h-[550px] overflow-visible">
          <SolutionsImage />
        </div>
      </div>

      {/* Visual Left: Content (Placed Second in RTL Flex container) */}
      <div className="w-full lg:w-[643px] flex flex-col justify-start items-start lg:gap-[56px]">
        {/* Header */}
        <div className="w-full flex flex-col justify-start items-start gap-[32px]">
          <div className="w-full text-center lg:text-right text-[#222325] text-[24px] lg:text-[48px] font-['num-black'] font-black leading-[36px] lg:leading-[60px] break-words">
            راه حل های دیجی کارا
          </div>
        </div>

        {/* Mobile Image (Visible only on mobile/tablet) */}
        <div className="relative w-full flex justify-center items-center lg:hidden ">
          {/* Scaled down version for mobile */}
          <div className="relative w-[250px] h-[250px] md:w-[450px] md:h-[450px]">
            <SolutionsImage />
          </div>
        </div>

        {/* List */}
        <div className="w-full flex flex-col justify-start items-start gap-[24px]">
          {solutionsData.map((item) => (
            <SolutionItem key={item.id} title={item.title} desc={item.desc} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-end items-center gap-[32px] mt-[40px] lg:mt-0">
          <div className="text-[#808080] text-[14px] lg:text-[18px] font-['num-regular'] font-normal leading-[27px] break-words cursor-pointer hover:text-black transition-colors">
            مطالعه بیشتر
          </div>
          <ChamferedButton cutSide="right" className="!p-[2px]">
            <div className="px-[16px] py-[8px] lg:px-[24px] lg:py-[10px] flex justify-center items-center gap-8">
              <span className="text-[#222325] text-[12px] lg:text-[14px] font-extrabold uppercase break-words z-10">
                ورود به پلتفــــــــــرم
              </span>
            </div>
          </ChamferedButton>
        </div>
      </div>
    </div>
  );
};

export default Solutions;

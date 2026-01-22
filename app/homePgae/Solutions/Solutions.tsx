"use client";

import React from "react";
import SolutionItem from "./SolutionItem";
import ChamferedButton from "@/app/components/ChamferedButton";
import SolutionsImage from "./SolutionsImage";
import { solutionsData } from "./solutionsData";

import Link from "next/link";

const Solutions = () => {
  return (
    <div className="w-full flex justify-between items-start mb-[10%]" dir="rtl">
      <div className="relative hidden lg:flex justify-start items-center gap-[10px] mr-10 xl:mt-[-100px]">
        <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[550px] xl:h-[550px] 2xl:w-[700px] 2xl:h-[700px] overflow-visible">
          <SolutionsImage />
        </div>
      </div>

      <div className="w-full lg:w-[643px] 2xl:w-[800px] flex flex-col justify-start items-start lg:gap-[56px] 2xl:gap-[70px]">
        <div className="w-full flex flex-col justify-start items-start gap-[32px]">
          <div className="w-full text-center lg:text-right text-[#222325] text-[24px] lg:text-[48px] 2xl:text-[64px] font-black leading-[36px] lg:leading-[60px] 2xl:leading-[80px]">
            راه حل های دیجی کارا
          </div>
        </div>

        <div className="relative w-full flex justify-center items-center lg:hidden ">
          <div className="relative w-[250px] h-[250px] md:w-[450px] md:h-[450px]">
            <SolutionsImage />
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-[24px]">
          {solutionsData.map((item) => (
            <SolutionItem key={item.id} title={item.title} desc={item.desc} />
          ))}
        </div>

        <div className="w-full flex justify-end items-center gap-[32px] mt-[40px] lg:mt-0">
          <div className="text-[#808080] text-[14px] lg:text-[18px] 2xl:text-[22px] font-['num-regular'] font-normal leading-[27px]  cursor-pointer hover:text-black transition-colors">
            مطالعه بیشتر
          </div>
          <ChamferedButton cutSide="right" className="p-[2px]!">
            <Link
              href="/login"
              className="px-[16px] py-[8px] lg:px-[24px] lg:py-[10px] flex justify-center items-center gap-8"
            >
              <span className="text-[#222325] text-[12px] lg:text-[14px] 2xl:text-[16px] font-extrabold uppercase  z-10">
                ورود به پلتفــــــــــرم
              </span>
            </Link>
          </ChamferedButton>
        </div>
      </div>
    </div>
  );
};

export default Solutions;

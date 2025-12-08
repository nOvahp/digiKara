"use client";

import React from "react";
import Image from "next/image";
import ChallengeItem from "./ChallengeItem";
import ChamferedButton from "@/app/components/ChamferedButton";

import { challengesData } from "./challengesData";

const Challenges = () => {
  return (
    <div className="w-full h-full flex justify-between items-start" dir="rtl">
      {/* Visual Right: Content (Placed first in RTL Flex container) */}
      <div className="w-full md:w-[643px] flex flex-col justify-start items-start gap-[56px]">
        {/* Header */}
        <div className="w-full flex flex-col justify-start items-start gap-[32px]">
          <div className="w-full text-right text-[#222325] text-[48px] font-['num-black'] font-black leading-[60px] break-words">
            چالش‌ها
          </div>
        </div>

        {/* List */}
        <div className="w-full flex flex-col justify-start items-start gap-[24px]">
          {challengesData.map((item) => (
            <ChallengeItem key={item.id} title={item.title} desc={item.desc} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-end items-center gap-[32px]">
          {/* Custom Button */}
          <div className="text-[#808080] text-[18px] font-['num-regular'] font-normal leading-[27px] break-words cursor-pointer hover:text-black transition-colors">
            مطالعه بیشتر
          </div>
          <ChamferedButton cutSide="right" className="!p-[2px]">
            <div className="px-[24px] py-[10px] flex justify-center items-center gap-8">
              <span className="text-[#222325] text-[14px] font-['num-extrabold'] font-extrabold uppercase break-words z-10">
                ورود به پلتفــــــــــرم
              </span>
            </div>
          </ChamferedButton>

          {/* Link */}
          
        </div>
      </div>

      {/* Visual Left: Image (Placed second in RTL Flex container) */}
      <div className="relative flex justify-start items-center gap-[10px] hidden md:flex">
        <div className="relative w-[599px] h-[599px] overflow-hidden  -top-[70px]">
          {/* Using the single image as requested */}
          <Image
            src="/challenges.png"
            alt="Challenges Illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Challenges;

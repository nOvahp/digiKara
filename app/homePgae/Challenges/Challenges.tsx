"use client";

import React from "react";
import Image from "next/image";
import ChallengeItem from "./ChallengeItem";
import ChamferedButton from "@/app/components/ChamferedButton";

import { challengesData } from "./challengesData";

const Challenges = () => {
  return (
    <div
      className="w-full flex justify-between items-start mb-[10%] "
      dir="rtl"
    >
      <div className="w-full lg:w-[643px] flex flex-col justify-start items-start  lg:gap-[56px]">
        <div className="w-full flex flex-col justify-start items-start gap-[32px]">
          <div className="w-full text-center lg:text-right text-[#222325] text-[24px] lg:text-[48px] font-black leading-[36px] lg:leading-[60px] ">
            چالش‌های آموزش فنی‌حرفه‌ای
          </div>
        </div>

        <div className="relative w-full flex justify-center items-center lg:hidden">
          <div className="relative w-[250px] h-[250px] md:w-[450px] md:h-[450px]">
            <Image
              src="/challenges.png"
              alt="Challenges Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-[24px]">
          {challengesData.map((item) => (
            <ChallengeItem key={item.id} title={item.title} desc={item.desc} />
          ))}
        </div>

        <div className="w-full flex justify-end items-center gap-[32px] mt-[40px] lg:mt-0">
          <div className="text-[#808080] text-[14px] lg:text-[18px] font-normal leading-[27px] cursor-pointer hover:text-black transition-colors">
            مطالعه بیشتر
          </div>
          <ChamferedButton cutSide="right" className="p-[2px]!">
            <div className="px-[16px] py-[8px] lg:px-[24px] lg:py-[10px] flex justify-center items-center gap-8">
              <span className="text-[#222325] text-[12px] lg:text-[14px] font-extrabold uppercase z-10">
                ورود به پلتفــــــــــرم
              </span>
            </div>
          </ChamferedButton>
        </div>
      </div>

      <div className="relative hidden lg:flex justify-start items-center gap-[10px]">
        <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[550px] xl:h-[550px] overflow-hidden mt-[-70px]">
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

"use client";

import React from "react";
import Image from "next/image";
import ChallengeItem from "./ChallengeItem";
import ChamferedButton from "@/app/components/ChamferedButton";

import { challengesData } from "./challengesData";

import Link from "next/link";

const Challenges = () => {
  return (
    <div
      className="w-full flex justify-between items-start mb-[10%] "
      dir="rtl"
    >
      <div className="w-full lg:w-[643px] 2xl:w-[800px] flex flex-col justify-start items-start  lg:gap-[56px] 2xl:gap-[70px]">
        <div className="w-full flex flex-col justify-start items-start gap-[32px]">
          <div className="w-full text-center lg:text-right text-[#222325] text-[24px] lg:text-[48px] 2xl:text-[64px] font-black leading-[36px] lg:leading-[60px] 2xl:leading-[80px] ">
            چالش‌ها
          </div>
        </div>

        <div className="relative w-full flex justify-center items-center lg:hidden">
          <div className="relative w-[250px] h-[250px] md:w-[450px] md:h-[450px]">
            <Image
              src="/Frame 2095585053.png"
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
          <div className="text-[#808080] text-[14px] lg:text-[18px] 2xl:text-[22px] font-normal leading-[27px] cursor-pointer hover:text-black transition-colors">
            مطالعه بیشتر
          </div>
          <ChamferedButton cutSide="right" className="p-[2px]!">
            <Link
              href="/login"
              className="px-[16px] py-[8px] lg:px-[24px] lg:py-[10px] flex justify-center items-center gap-8"
            >
              <span className="text-[#222325] text-[12px] lg:text-[14px] 2xl:text-[16px] font-extrabold uppercase z-10">
                ورود به پلتفــــــــــرم
              </span>
            </Link>
          </ChamferedButton>
        </div>
      </div>

      <div className="relative hidden lg:flex justify-start items-center gap-[10px]">
        <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[550px] xl:h-[550px] 2xl:w-[700px] 2xl:h-[700px] overflow-hidden mt-[-70px]">
          <Image
            src="/Frame 2095585053.png"
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

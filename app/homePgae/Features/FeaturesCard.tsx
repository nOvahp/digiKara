"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeaturesCardProps {
  title: string;
  description: string;
  image: any;
}

const FeaturesCard = ({ title, description, image }: FeaturesCardProps) => {
  return (
    <Card className="w-[260px] sm:w-[300px] h-auto min-h-[280px] md:w-[420px] md:h-[355px] rounded-[24px] border-[#CACACA] shadow-none hover:shadow-[0px_20px_32px_rgba(0,0,0,0.25)] transition-all duration-300 overflow-hidden relative bg-white border-none">
      <div className="relative w-full h-full md:absolute md:inset-0 bg-white rounded-[24px] border border-[#CACACA]">
        <div className="flex flex-col h-full relative">
          <CardHeader className="text-right pt-[34px] pr-[40px] pl-[40px] pb-0">
            <CardTitle className="text-[#222325] text-[24px] md:text-[32px] font-black leading-[30px] md:leading-[38.4px]">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-right pt-[16px] pr-[40px] pl-[40px] pb-0">
            <p className="text-[#222325] text-[14px] md:text-[18px] font-normal leading-[22px] md:leading-[27px]">
              {description}
            </p>
          </CardContent>

          <div className="mt-[20px] sm:mt-auto  flex flex-col items-end md:flex-row md:items-end md:justify-end w-full pl-[40px] pb-[40px] pr-[40px] ">
            <div className="relative flex items-center gap-2 cursor-pointer z-10 transition-transform hover:scale-105 mb-2 md:mb-2">
              <span className="text-[#222325] text-[14px] md:text-[18px] font-medium leading-[22px] md:leading-[27px]">
                بیشتر بدانید
              </span>
              <div className="bg-[#222325] rounded-full p-1">
                <ChevronLeft className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="relative right-auto bottom-auto md:absolute md:right-0 md:bottom-0 w-[170px] h-[170px] md:w-[230px] md:h-[230px] self-center">
              <Image
                src={image}
                alt="Feature Illustration"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturesCard;

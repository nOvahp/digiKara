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
    <Card className="w-[420px] h-[355px] rounded-[24px] border-[#CACACA] shadow-none hover:shadow-[0px_20px_32px_rgba(0,0,0,0.25)] transition-all duration-300 overflow-hidden relative bg-[#D9D9D9] border-none">
      <div className="absolute inset-0 bg-white rounded-[24px] border border-[#CACACA]">
        <div className="flex flex-col h-full relative">
          <CardHeader className="text-right pt-[34px] pr-[40px] pl-[40px] pb-0">
            <CardTitle className="text-[#222325] text-[32px] font-black leading-[38.4px]">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-right pt-[16px] pr-[40px] pl-[40px] pb-0">
            <p className="text-[#222325] text-[18px] font-normal leading-[27px]">
              {description}
            </p>
          </CardContent>

          {/* Footer Area with Link and Image */}
          <div className="mt-auto flex items-end justify-end w-full pl-[40px] pb-[40px] pr-[40px]">
            {/* 'Read More' Link */}
            <div className="relative flex items-center gap-2 cursor-pointer z-10 transition-transform hover:scale-105 mb-2">
              <span className="text-[#222325] text-[18px] font-medium leading-[27px]">
                بیشتر بدانید
              </span>
              <div className="bg-[#222325] rounded-full p-1">
                <ChevronLeft className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Image positioned absolutely in the corner to match design */}
            <div className="absolute right-0 bottom-0 w-[230px] h-[230px]">
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

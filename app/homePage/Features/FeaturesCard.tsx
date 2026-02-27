'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FeaturesCardProps {
  title: string;
  description: string;
  image: string | StaticImageData;
}

const FeaturesCard = ({ title, description, image }: FeaturesCardProps) => {
  return (
    <Card className="w-[260px] sm:w-[300px] h-[440px] sm:h-[460px] md:w-[420px] md:h-[460px] rounded-[24px] border-[#CACACA] shadow-none hover:shadow-[0px_20px_32px_rgba(0,0,0,0.25)] transition-all duration-300 overflow-hidden relative bg-white border-none">
      <div className="relative w-full h-full bg-white rounded-[24px] border border-[#CACACA]">
        <div className="flex flex-col h-full relative">
          <CardHeader className="text-right pt-[30px] pr-[10px] pl-[10px] pb-0">
            <CardTitle className="text-[#222325] text-[20px] md:text-[30px] 2xl:text-[40px] font-black leading-[28px] md:leading-[38.4px] 2xl:leading-[50px]">
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className="text-right pt-[16px] pr-[10px] pl-[10px] pb-0">
            <p className="text-[#222325] text-[14px] md:text-[18px] 2xl:text-[24px] font-normal leading-[22px] md:leading-[27px] 2xl:leading-[36px]">
              {description}
            </p>
          </CardContent>

          {/* بیشتر بدانید — in-flow on mobile, hidden on desktop (desktop uses absolute version below) */}
          <div className="mt-[20px] flex justify-end pl-[40px] pr-[40px] md:hidden">
            <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
              <span className="text-[#222325] text-[14px] font-medium leading-[22px]">
                بیشتر بدانید
              </span>
              <span className="text-[#222325] text-[18px] leading-none">←</span>
            </div>
          </div>

          {/* Desktop: بیشتر بدانید — absolute bottom-left */}
          <div className="hidden md:flex absolute bottom-[28px] left-[24px] items-center gap-2 cursor-pointer transition-transform hover:scale-105 z-10">
            <span className="text-[#222325] text-[18px] 2xl:text-[22px] font-medium leading-[27px]">
              بیشتر بدانید
            </span>
            <span className="text-[#222325] text-[22px] leading-none">←</span>
          </div>

          {/* Image — absolute bottom: centered on mobile, right-aligned on desktop */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 w-[220px] h-[220px] md:w-[200px] md:h-[200px]">
            <Image
              src={image}
              alt="Feature Illustration"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturesCard;

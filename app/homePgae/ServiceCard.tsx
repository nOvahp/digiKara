"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  title?: string;
  description?: string;
  image?: string;
}

const ServiceCard = ({
  title = "عکاسی",
  description = "عکاسی\nتصویربرداری حرفه‌ای مراسم، رویدادها و تبلیغات\nثبت لحظات ماندگار با تجهیزات پیشرفته",
  image = "/services1.png",
}: ServiceCardProps) => {
  return (
    // Removed max-w constraint to allow filling the grid cell
    <Card className="w-full min-h-[280px] md:h-[280px] rounded-[24px] border-[#CACACA] shadow-none hover:shadow-[0px_20px_32px_rgba(0,0,0,0.25)] transition-all duration-300 overflow-hidden relative bg-white border group cursor-pointer flex flex-col h-full">
      {/* Simplified structure: Card is the container */}

      {/* Image Layer - Behind Text */}
      <div className="absolute left-0 top-0 w-[180px] h-[180px] md:w-[200px] md:h-[200px] pointer-events-none opacity-90 z-0">
        <Image
          src={image}
          alt="Service Illustration"
          fill
          className="object-contain object-top"
        />
      </div>

      {/* Text Content - On Top of Image */}
      {/* Compact padding to fit in 280px height */}
      <CardHeader className="text-right pt-[24px] pr-[32px] pl-[32px] pb-0 relative z-10">
        <CardTitle className="text-[#222325] text-[24px] md:text-[32px] font-['num-black'] font-black leading-[30px] md:leading-[38.4px]">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-right pt-[8px] pr-[32px] pl-[32px] pb-0 relative z-10">
        <p className="text-[#222325] text-[14px] md:text-[18px] font-['num-regular'] font-normal leading-[22px] md:leading-[27px] whitespace-pre-line">
          {description}
        </p>
      </CardContent>

      {/* Footer Area - On Top of Image */}
      <div className="mt-auto flex flex-col md:flex-row items-start md:items-end justify-start w-full px-[32px] pb-[24px] pt-[10px] relative z-10">
        {/* "Buy Services" Link - Aligned Right */}
        <div className="flex items-center gap-2 cursor-pointer z-10 transition-transform hover:scale-105 mt-4 md:mt-0">
          <div className="text-[#5E6B7E] text-[14px] md:text-[18px] font-medium leading-[27px]">
            خرید خدمات
          </div>
          <div className="bg-[#222325] rounded-full p-1">
            <ChevronLeft className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;

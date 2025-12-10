"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  count: string;
}

const BlogCard = ({
  image = "/blog1.png",
  title = "صنایع دستی",
  description = "سفال، چوب، بافت و هنرهای سنتی",
  count = "5412",
}: Partial<BlogCardProps>) => {
  return (
    <Card className="w-full md:w-[90%] lg:w-[700px] mx-auto lg:mx-0 group relative overflow-hidden rounded-[16px] md:rounded-[24px] border border-[#CACACA] bg-white shadow-none transition-all duration-300 hover:shadow-lg h-[160px] md:h-[180px] lg:h-[200px]">
      {/* Background Image on Left */}
      <div className="absolute left-0 top-0 h-full w-[140px] md:w-[240px] lg:w-[330px] z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-white" />
      </div>

      {/* Content Section */}
      <div className="relative z-0 flex h-full flex-col justify-start p-4 md:p-5 lg:p-6 lg:py-[24px] lg:px-[62px] ml-[130px] md:ml-[230px] lg:ml-[160px]">
        <div className="flex flex-col gap-2 md:gap-3 lg:gap-4 w-fit ml-auto">
          <h3 className="text-right text-[16px] md:text-[20px] lg:text-[24px] font-black leading-[20px] md:leading-[26px] lg:leading-[28.8px] text-[#222325]">
            {title}
          </h3>
          <p className="text-right text-[12px] md:text-[14px] lg:text-[16px] font-medium leading-[18px] md:leading-[22px] lg:leading-[24px] text-[#5E6B7E]">
            {description}
          </p>
        </div>

        {/* Footer / Button Area */}
        <div className="mt-auto flex items-center justify-end gap-2 cursor-pointer z-0 transition-transform hover:scale-101 w-fit ml-auto">
          <div className="bg-transparent rounded-full p-1">
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#5E6B7E]" />
          </div>
          <div className="flex items-center gap-1 text-[#5E6B7E] text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-[20px] md:leading-[24px] lg:leading-[27px]">
            <span>محصول</span>
            <span>{count}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;

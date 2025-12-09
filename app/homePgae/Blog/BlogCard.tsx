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
    <Card className="w-[700px] group relative  overflow-hidden rounded-[24px] border border-[#CACACA] bg-white shadow-none transition-all duration-300 hover:shadow-lg h-[200px]">
      {/* Background Image on Left */}
      <div className="absolute left-0 top-0 h-full w-[330px] z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
        />
        {/* Gradient Overlay: Transparent (Left) to White (Right) to merge with card bg */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white" />
      </div>

      {/* Content Section - Relative on top */}
      <div className="relative z-00 flex h-full flex-col justify-start gap-3 md:py-[24px] md:px-[62px] ml-[160px] ">
        <div className="flex flex-col gap-4 w-fit ml-auto">
          <h3 className="text-right text-[24px] font-black leading-[28.8px] text-[#222325] ">
            {title}
          </h3>
          <p className="text-right text-[16px] font-medium leading-[24px] text-[#5E6B7E] ">
            {description}
          </p>
        </div>

        {/* Footer / Button Area */}
        <div className="mt-auto flex items-center justify-end gap-2 cursor-pointer z-0 transition-transform hover:scale-101 w-fit ml-auto">
          <div className="bg-transparent rounded-full p-1">
            <ChevronLeft className="w-4 h-4 text-[#5E6B7E]" />
          </div>
          <div className="flex items-center gap-1 text-[#5E6B7E] text-[18px] font-medium leading-[27px] ">
            <span>محصول</span>
            <span>{count}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;

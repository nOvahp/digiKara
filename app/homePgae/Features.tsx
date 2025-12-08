"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import FeaturesCard from "./FeaturesCard";
import { featuresData } from "./featuresData";

const Features = () => {
  return (
    <div className="w-full mb-[10%]  " dir="rtl">
      <div className="w-full text-center text-[#222325] text-[48px] font-extrablack  mb-[5%]">
        دیجی‌کارا چه کاری انجام می‌دهد؟
      </div>
      <Carousel
        opts={{
          align: "start",
          direction: "rtl",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {featuresData.map((feature) => (
            <CarouselItem key={feature.id} className="pl-4 basis-auto">
              <FeaturesCard
                title={feature.title}
                description={feature.description}
                image={feature.image}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Features;

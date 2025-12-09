"use client";

import React from "react";
import ServicesTitle from "./ServicesTitle";
import ServicesGrid from "./ServicesGrid";
import ServicesButton from "./ServicesButton";
import ServicesIllustration from "./ServicesIllustration";

const ServicesSection = () => {
  return (
    <section
      className="w-full relative flex justify-center items-center py-10 px-4 mb-[8%]"
      dir="rtl"
    >
      {/* Container for content */}
      <div className="flex flex-col lg:block w-full max-w-[1440px]">
        {/* Section Title */}
        <ServicesTitle />

        {/* Cards Grid - Right Side */}
        <ServicesGrid />

        {/* All Services Button */}
        <ServicesButton />

        {/* Illustration Image - Absolute Left of Screen on Desktop */}
        <ServicesIllustration />
      </div>
    </section>
  );
};

export default ServicesSection;

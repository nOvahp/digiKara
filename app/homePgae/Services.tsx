"use client";

import React from "react";
import Image from "next/image";
import ServiceCard from "./ServiceCard";
import { servicesData } from "./servicesData";

const Services = () => {
  return (
    <section
      className="w-full relative flex justify-center items-center py-10 px-4 overflow-hidden"
      dir="rtl"
    >
      {/* Container for content */}
      <div className="flex flex-col-reverse lg:block w-full max-w-[1440px] relative">
        {/* Cards Grid - Right Side */}
        {/* Changed from mr-auto to ml-auto to push grid to the Right (physically) away from Left image in RTL context if margin logical props confuse. 
                But margin-left: auto pushes to Right.
                Increased width to 70% to fill space better.
            */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-[100%] lg:mr-0 lg:ml-auto relative z-10">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
            />
          ))}
        </div>

        {/* Illustration Image - Absolute Left of Screen on Desktop */}
        <div className="w-full h-[400px] relative mt-8 lg:mt-0 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[35%] lg:h-[800px] z-10 pointer-events-none">
          <Image
            src="/services.png"
            alt="Services Illustration"
            fill
            className="object-contain object-center lg:object-left-center"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;

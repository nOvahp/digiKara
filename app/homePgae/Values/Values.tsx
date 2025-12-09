"use client";

import React from "react";
import Image from "next/image";
import ValuesCard from "./ValuesCard";
import { valuesData } from "./valuesData";
import ValuesTitle from "./ValuesTitle";

const Values = () => {
  return (
    <div className="w-full flex flex-col items-center relative">
      <ValuesTitle />

      {/* Mobile Image */}
      <div className="xl:hidden relative w-full flex justify-center mb-8">
        <Image
          src="/Values.png"
          alt="Values Overlay"
          width={300}
          height={300}
          className="object-contain opacity-100"
        />
      </div>

      {/* Desktop Image Overlay */}
      <div className="hidden xl:block absolute top-[60%] left-[65%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <Image
          src="/Values.png"
          alt="Values Overlay"
          width={400}
          height={400}
          className="object-contain opacity-100"
        />
      </div>

      <div className="w-full flex flex-col gap-0 z-10 relative">
        {valuesData.map((item, index) => (
          <ValuesCard
            key={index}
            title={item.title}
            description={item.description}
            number={item.number}
          />
        ))}
      </div>
    </div>
  );
};

export default Values;

"use client";

import React from "react";
import Image from "next/image";
import ValuesCard from "./ValuesCard";
import { valuesData } from "./valuesData";
import ValuesTitle from "./ValuesTitle";

const Values = () => {
  return (
    <div className="w-full flex flex-col items-center relative mb-[10%]">
      <ValuesTitle />

      

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

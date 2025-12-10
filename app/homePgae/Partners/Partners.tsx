"use client";

import React from "react";
import Image from "next/image";
import PartnersCard from "./PartnersCard";
import PartnersTitle from "./PartnersTitle";
import PartnerButton from "./PartnerButton";
import { partnersData } from "./partnersData";

const Partners = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row-reverse items-start justify-between gap-6 lg:gap-12 relative mb-[10%]">
      <div className="contents lg:flex lg:flex-col lg:w-[40%]">
        <div className="order-1 w-full ">
          <PartnersTitle />
        </div>

        <div className="order-3 w-full mt-8 lg:-mt-[8%] flex justify-center lg:justify-end z-20 pointer-events-none">
          <Image
            src="/Partners.png"
            alt="Partners Illustration"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>

        <div className="order-4 w-full -mt-25 lg:-mt-22 xl:ml-30 lg:ml-15 xl:-mt-34 flex justify-center lg:justify-start relative z-30">
          <PartnerButton />
        </div>
      </div>

      <div className="order-2 w-full lg:w-[55%] flex flex-col gap-6">
        {partnersData.map((item, index) => (
          <PartnersCard
            key={index}
            category={item.category}
            title={item.title}
            color={item.color}
            bgColor={item.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Partners;

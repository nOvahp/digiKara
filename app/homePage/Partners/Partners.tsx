'use client';

import React from 'react';
import Image from 'next/image';
import PartnersCard from './PartnersCard';
import PartnersTitle from './PartnersTitle';
import PartnerButton from './PartnerButton';
import { partnersData } from './partnersData';

const Partners = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row-reverse items-start justify-between gap-6 lg:gap-10 xl:gap-12 relative mb-[10%]">
      {/* Left column */}
      <div className="flex flex-col items-center lg:items-start w-full lg:w-[38%] xl:w-[40%] shrink-0">
        <PartnersTitle />

        <div className="w-full flex flex-col items-center mt-6 lg:mt-4 xl:-mt-[8%] 2xl:-mt-[5%]">
          <div className="pointer-events-none w-full flex justify-center lg:justify-end">
            <Image
              src="/man is thinking about launching a proje1ct.png"
              alt="Partners Illustration"
              width={500}
              height={500}
              className="object-contain w-[70%] lg:w-full 2xl:w-[650px] 2xl:h-[650px]"
            />
          </div>
          <div className="flex justify-center mt-4">
            <PartnerButton />
          </div>
        </div>
      </div>

      {/* Right column: cards */}
      <div className="w-full lg:flex-1 flex flex-col gap-4 lg:gap-6">
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

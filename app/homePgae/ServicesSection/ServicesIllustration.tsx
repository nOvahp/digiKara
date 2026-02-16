'use client';

import React from 'react';
import Image from 'next/image';

const ServicesIllustration = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] relative mt-4 lg:mt-0 lg:absolute lg:left-[-16%] lg:top-[68%] lg:-translate-y-1/2 lg:w-[35%] lg:h-[520px] z-10 pointer-events-none order-2 lg:order-0 mb-8 lg:mb-0">
      <Image
        src="/man and a woman discussing indicators.png"
        alt="Services Illustration"
        fill
        className="object-contain object-center lg:object-left-center"
      />
    </div>
  );
};

export default ServicesIllustration;

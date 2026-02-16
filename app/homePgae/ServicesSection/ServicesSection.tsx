'use client';

import React from 'react';
import ServicesTitle from './ServicesTitle';
import ServicesGrid from './ServicesGrid';
import ServicesButton from './ServicesButton';
import ServicesIllustration from './ServicesIllustration';

const ServicesSection = () => {
  return (
    <section
      className="w-full relative flex justify-center items-center py-10 px-4 mb-[8%]"
      dir="rtl"
    >
      <div className="flex flex-col lg:block w-full max-w-[1440px] 2xl:max-w-none">
        <ServicesTitle />

        <ServicesGrid />

        <ServicesButton />

        <ServicesIllustration />
      </div>
    </section>
  );
};

export default ServicesSection;

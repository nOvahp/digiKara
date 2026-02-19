import Image from 'next/image';
import React from 'react';

const GetInvolvedImage = () => {
  return (
    <div className="relative items-center justify-center mx-auto w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[300px] lg:h-[300px] lg:absolute md:right-[5%] lg:right-[0%] lg:top-0 right-[5%] md:top-0 xl:w-[400px] xl:h-[400px] xl:absolute pointer-events-none z-0 opacity-100">
      <Image
        src="/woman chooses a planet in virtual reality.png"
        alt="Get Involved"
        className="object-contain"
        fill
        sizes="(max-width: 768px) 200px, (max-width: 1280px) 300px, 400px"
      />
    </div>
  );
};

export default GetInvolvedImage;

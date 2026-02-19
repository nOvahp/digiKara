import Image from 'next/image';
import React from 'react';

const QuotesIllustration = () => (
  <div className="relative lg:absolute left-0 lg:top-[60px] w-[312px] h-[312px] mx-auto lg:mx-0 mt-8 lg:mt-0 overflow-hidden">
    <Image
      src="/woman received many notification letters.png"
      alt="Quotes Illustration"
      className="object-contain"
      fill
      sizes="312px"
    />
  </div>
);

export default QuotesIllustration;

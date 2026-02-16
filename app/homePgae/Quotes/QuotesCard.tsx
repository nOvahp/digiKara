import Image from 'next/image';
import React from 'react';

interface QuotesCardProps {
  quote: string;
  name: string;
  role: string;
  imageSrc?: string;
}

const QuotesCard: React.FC<QuotesCardProps> = ({
  quote,
  name,
  role,
  imageSrc = 'https://placehold.co/64x64',
}) => {
  return (
    <div className="flex-1 flex flex-col justify-start items-start gap-6 ">
      <div className="self-stretch text-right text-[#222325] text-lg lg:text-2xl font-medium leading-8 lg:leading-[41.60px] ">
        {quote}
      </div>
      <div className="self-stretch justify-start items-center gap-4 flex">
        <div className="flex-1 flex flex-col justify-start items-start gap-1 ">
          <div className="self-stretch text-right text-[#222325] text-sm lg:text-base font-extrabold ">
            {name}
          </div>
          <div className="self-stretch text-right text-[#5e6b7e] text-sm lg:text-base font-medium ">
            {role}
          </div>
        </div>
        <div className="w-16 h-16 relative">
          <Image
            className="rounded-full object-cover"
            src={imageSrc}
            alt={name}
            fill
            sizes="64px"
          />
        </div>
      </div>
    </div>
  );
};

export default QuotesCard;

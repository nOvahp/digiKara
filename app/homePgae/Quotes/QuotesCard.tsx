import React from "react";

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
  imageSrc = "https://placehold.co/64x64",
}) => {
  return (
    <div className="flex-1 flex flex-col justify-start items-start gap-6 ">
      <div className="self-stretch text-right text-[#222325] text-2xl  font-medium leading-[41.60px] ">
        {quote}
      </div>
      <div className="self-stretch justify-start items-center gap-4 flex">
        <div className="flex-1 flex flex-col justify-start items-start gap-1 ">
          <div className="self-stretch text-right text-[#222325] text-base  font-extrabold ">
            {name}
          </div>
          <div className="self-stretch text-right text-[#5e6b7e] text-base  font-medium ">
            {role}
          </div>
        </div>
        <div className="w-16 h-16 relative">
          <img
            className="w-16 h-16 left-0 top-0 absolute rounded-full object-cover"
            src={imageSrc}
            alt={name}
          />
        </div>
      </div>
    </div>
  );
};

export default QuotesCard;

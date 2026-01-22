import React from "react";

interface ChallengeItemProps {
  title: string;
  desc: string;
}

const ChallengeItem = ({ title, desc }: ChallengeItemProps) => {
  return (
    <div className="w-full flex justify-center items-start gap-4">
      <div className="relative w-[32px] h-[32px] shrink-0">
        <div className="absolute left-0 top-0 w-[32px] h-[32px] opacity-10 rounded-full border-[4] border-[#808080]" />
        <div className="absolute left-[13px] top-[13px] w-[6px] h-[6px] bg-[#808080] rounded-full" />
      </div>
      <div className="flex-1 text-right">
        <span className="text-black text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold leading-[24px] 2xl:leading-[32px] tracking-wide wrap-break-word">
          {title}{" "}
        </span>
        <span className="text-black text-[14px] lg:text-[16px] 2xl:text-[20px] font-['num-regular'] font-normal leading-[24px] 2xl:leading-[32px] tracking-wide wrap-break-word">
          {desc}
        </span>
      </div>
    </div>
  );
};

export default ChallengeItem;

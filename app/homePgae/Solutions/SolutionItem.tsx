import React from "react";

interface SolutionItemProps {
  title: string;
  desc: string;
}

const SolutionItem = ({ title, desc }: SolutionItemProps) => {
  return (
    <div className="w-full flex justify-start items-start gap-4">
      <div className="relative w-8 h-8 shrink-0">
        <div className="absolute left-0 top-0 w-8 h-8 opacity-10 rounded-full border-4 border-[#808080]" />
        <div className="absolute left-[13px] top-[13px] w-[6px] h-[6px] bg-[#808080] rounded-full" />
      </div>

      {/* Content */}
      <div className="flex-1 text-right">
        <span className="text-[#222325] text-[14px] lg:text-[16px]  font-semibold leading-[24px] tracking-wide wrap-break-word">
          {title}{" "}
        </span>
        <span className="text-[#222325] text-[14px] lg:text-[16px] font-['num-regular'] font-normal leading-[24px] tracking-wide wrap-break-word">
          {desc}
        </span>
      </div>
    </div>
  );
};

export default SolutionItem;

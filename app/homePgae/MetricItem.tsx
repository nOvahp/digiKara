import React from "react";

interface MetricItemProps {
  value: string;
  label: string;
}

const MetricItem = ({ value, label }: MetricItemProps) => {
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="text-[#222325] text-[20px] lg:text-[28px] xl:text-[40px] font-['num-black'] font-black leading-[50px] lg:leading-[72px] wrap-break-word">
        {value}
      </div>
      <div className="text-[#5E6B7E] text-[10px] lg:text-[10px] xl:text-[12px] font-['num-regular'] font-normal leading-[27px] wrap-break-word text-center">
        {label}
      </div>
    </div>
  );
};

export default MetricItem;

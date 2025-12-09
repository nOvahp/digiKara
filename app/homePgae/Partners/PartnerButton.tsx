"use client";

import React from "react";
import ChamferedButton from "@/app/components/ChamferedButton";

const PartnerButton = () => {
  return (
    <ChamferedButton cutSide="right" borderColor="#5E6B7E" className="p-[2px]!">
      <div className="flex w-[200px] h-[40px] items-center justify-center px-[14px] py-[9px] relative">
        <span className="text-[#222325] text-[14px] font-extrabold uppercase relative z-10">
          درخواست همکاری
        </span>
      </div>
    </ChamferedButton>
  );
};

export default PartnerButton;

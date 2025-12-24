import React from "react";
import ChamferedButton from "@/app/components/ChamferedButton";

const GetInvolvedActions = () => {
  return (
    <div className="flex flex-wrap justify-center w-full h-[50%] items-center gap-6">
      <ChamferedButton
        cutSide="right"
        borderColor="#5E6B7E"
        backgroundColor="#f0f0f0"
        hoverColor="transparent"
        className="w-auto"
      >
        <div className="flex items-center gap-2 px-6 py-2">
          <span className="text-[#222325] xl:text-lg lg:text-[14px] text-[12px] font-extrabold uppercase">
            مشاهده دمــــــــــو
          </span>
        </div>
      </ChamferedButton>

      <ChamferedButton
        cutSide="left"
        borderColor="#5E6B7E"
        backgroundColor="#f0f0f0"
        hoverColor="transparent"
        className="w-auto"
      >
        <div className="flex items-center gap-2 px-6 py-2">
          <span className="text-[#222325] xl:text-lg lg:text-[14px] text-[12px] font-extrabold uppercase">
            ثبت‌نام رایگان مدارس
          </span>
        </div>
      </ChamferedButton>
    </div>
  );
};

export default GetInvolvedActions;

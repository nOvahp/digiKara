import React from "react";
import ChamferedButton from "@/app/components/ChamferedButton";

const GetInvolved = () => {
  return (
    <div className="w-full h-[500px] relative flex flex-col md:flex-row md:justify-start items-center gap-10 py-20 px-5 overflow-hidden">
      {/* Content Container */}
      <div className="flex flex-col justify-center items-center gap-16 z-10 w-full max-w-4xl">
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <div className="max-w-[1160px] text-[#222325] text-3xl md:text-[35px] font-black leading-snug md:leading-[48px] wrap-break-word">
            هنرستان شما آماده تبدیل شدن به یک مدرسه مولد است؟
          </div>
          <div className="max-w-[716px] text-[#808080] text-lg md:text-[20px] font-medium leading-relaxed md:leading-9 wrap-break-word">
            با پیوستن به دیجی‌کارا، آموزش همراه با تولید را به یک تجربه واقعی,
            شفاف و پایدار برای هنرجویان و هنرآموزان تبدیل کنید.
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          <ChamferedButton
            cutSide="right"
            borderColor="#5E6B7E"
            backgroundColor="#f0f0f0"
            hoverColor="transparent"
            className="w-auto"
          >
            <div className="flex items-center gap-2 px-6 py-2">
              <span className="text-[#222325] text-lg font-extrabold uppercase">
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
              <span className="text-[#222325] text-lg font-extrabold uppercase">
                ثبت‌نام رایگان هنرستان
              </span>
            </div>
          </ChamferedButton>
        </div>
      </div>

      <div className="relative w-full max-w-[280px] md:max-w-[600px] md:absolute md:right-0 md:top-0 pointer-events-none z-0 opacity-20 md:opacity-100">
        <img
          src="/getInvolved.png"
          alt="Get Involved"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default GetInvolved;

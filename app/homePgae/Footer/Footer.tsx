import React from "react";
import { Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <div
      dir="rtl"
      className="w-[119.05%] ml-[-9.53%] bg-[#101010] flex flex-col pt-[60px] pb-[40px] px-5 lg:pt-[102px] lg:pb-[64px] lg:px-[80px] justify-between items-start gap-12"
    >
      <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-0">
        <div className="flex justify-end items-center gap-4">
          <div className="relative w-[50px] h-[50px] lg:w-[69px] lg:h-[69px]">
            <img
              src="/Logo11.svg"
              alt="DigiKara Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center text-white text-[30px] lg:text-[36.8px] font-medium leading-[55.2px] ">
            دیجی کارا
          </div>
          
        </div>

        <div className="flex flex-col lg:flex-row justify-start items-center lg:items-start gap-6 lg:gap-12 w-full lg:w-auto">
          {[
            "پرسش‌های متداول",
            "حریم خصوصی",
            "اسناد و قوانین",
            "ارتباط با ما",
            "درباره ما",
          ].map((text) => (
            <div
              key={text}
              className="text-center lg:text-right text-[#DDDDDD] text-base  font-extrabold cursor-pointer hover:text-white transition-colors"
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-center gap-8 lg:gap-0">
        <div className="lg:w-[468px] w-full text-center lg:text-right text-[#7B7B7B] text-base lg:text-lg  font-medium leading-[27.9px] ">
          ما در کنار شما هستیم تا با هم، آینده ای روشن تر و پربارتر برای مدارس
          ها و دانش آموزان این مرز و بوم رقم بزنیم.
        </div>

        <div className="flex flex-col justify-center items-center lg:items-start gap-4">
          <div className="flex justify-start items-start gap-4">
            <div className="w-[80px] h-[80px] relative overflow-hidden flex justify-center items-center">
              <img
                src="/Logo11.svg"
                alt="License 1"
                className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="w-[80px] h-[80px] relative overflow-hidden flex justify-center items-center">
              <img
                src="/Logo2.png"
                alt="License 2"
                className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="w-[80px] h-[80px] relative overflow-hidden flex justify-center items-center">
              <img
                src="/Logo3.png"
                alt="License 3"
                className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 lg:gap-0">
        <div className="flex justify-start items-center gap-4">
          <div className="text-[#DDDDDD] text-base  font-medium leading-6 ">
            ما را دنبال کنید
          </div>
          <div className="flex gap-2">
            {[Linkedin, Twitter, Facebook].map((Icon, i) => (
              <div
                key={i}
                className="p-2 rounded-lg border border-[#4A4A4A] cursor-pointer hover:bg-white/10 transition flex justify-center items-center gap-2.5 group"
              >
                <Icon className="w-5 h-5 text-white group-hover:text-[#E9B443] transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-[#808080] text-sm lg:text-base font-medium leading-6 text-center lg:text-right">
          © دیجی‌کارا – پلتفرم نوجوان کارآفرین
        </div>
      </div>
    </div>
  );
};

export default Footer;

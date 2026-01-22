import React from "react";
import Image from "next/image";
import { Linkedin, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <div
      dir="rtl"
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] bg-[#101010] flex justify-center py-[60px] px-5 lg:pt-[102px] lg:pb-[64px]"
    >
      <div className="w-full max-w-[1440px] 2xl:max-w-[1800px] px-[3%] flex flex-col gap-12 2xl:gap-20 box-border">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-0">
          <div className="flex justify-end items-center gap-4">
            <div className="relative w-[50px] h-[50px] lg:w-[69px] lg:h-[69px] 2xl:w-[90px] 2xl:h-[90px]">
              <Image
                src="/Logo11.svg"
                alt="DigiKara Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center text-white text-[30px] lg:text-[36.8px] 2xl:text-[48px] font-medium leading-[55.2px] 2xl:leading-[70px]">
              دیجی کارا
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-start items-center lg:items-start gap-6 lg:gap-12 2xl:gap-20 w-full lg:w-auto">
            {[
              "پرسش‌های متداول",
              "حریم خصوصی",
              "اسناد و قوانین",
              "ارتباط با ما",
              "درباره ما",
            ].map((text) => (
              <div
                key={text}
                className="text-center lg:text-right text-[#DDDDDD] text-base 2xl:text-xl font-extrabold cursor-pointer hover:text-white transition-colors"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-center gap-8 lg:gap-0">
          <div className="lg:w-[468px] 2xl:w-[600px] w-full text-center lg:text-right text-[#7B7B7B] text-base lg:text-lg 2xl:text-2xl font-medium leading-[27.9px] 2xl:leading-[40px]">
            ما در کنار شما هستیم تا با هم، آینده ای روشن تر و پربارتر برای مدارس
            ها و دانش آموزان این مرز و بوم رقم بزنیم.
          </div>

          <div className="flex flex-col justify-center items-center lg:items-start gap-4">
            <div className="flex justify-start items-start gap-4">
              <div className="w-[80px] h-[80px] 2xl:w-[100px] 2xl:h-[100px] relative overflow-hidden flex justify-center items-center">
                <Image
                  src="/Logo3.png"
                  alt="License 3"
                  fill
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="w-[80px] h-[80px] 2xl:w-[100px] 2xl:h-[100px] relative overflow-hidden flex justify-center items-center">
                <Image
                  src="/Logo2.png"
                  alt="License 2"
                  fill
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="w-[70px] h-[70px] 2xl:w-[90px] 2xl:h-[90px] relative overflow-hidden flex justify-center items-center">
                <Image
                  src="/Logo11.svg"
                  alt="License 1"
                  fill
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 lg:gap-0">
          <div className="flex justify-start items-center gap-4">
            <div className="text-[#DDDDDD] text-base 2xl:text-xl font-medium leading-6 ">
              ما را دنبال کنید
            </div>
            <div className="flex gap-2">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <div
                  key={i}
                  className="p-2 rounded-lg border border-[#4A4A4A] cursor-pointer hover:bg-white/10 transition flex justify-center items-center gap-2.5 group"
                >
                  <Icon className="w-5 h-5 2xl:w-7 2xl:h-7 text-white group-hover:text-[#E9B443] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-[#808080] text-sm lg:text-base 2xl:text-xl font-medium leading-6 text-center lg:text-right">
            © دیجی‌کارا – پلتفرم نوجوان کارآفرین
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

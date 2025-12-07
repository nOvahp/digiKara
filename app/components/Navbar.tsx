import React from "react";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <div className="w-full h-full pt-[72px] pl-[80px] pr-[80px] flex justify-between items-center bg-[#F5F5F5]">
      {/* Left Section (Login) */}
      <div className="flex items-center justify-start">
        <Button
          variant="ghost"
          className="p-0 h-auto min-h-0 hover:bg-transparent"
        >
          <div className="p-[3px] flex-col justify-start items-start gap-2 inline-flex">
            <div className="pl-[14px] pr-[14px] pt-[9px] pb-[9px] relative rounded-tl-[1px] rounded-tr-[2px] rounded-br-[1px] rounded-bl-[1px] justify-center items-center gap-2 inline-flex border border-transparent">
              <div className="text-[#222325] text-sm  font-extrablack  uppercase break-words">
                ورود به پلتفــــــــــرم
              </div>
            </div>
          </div>
        </Button>
      </div>

      {/* Right Section (Menu & Logo) */}
      <div className="flex items-center gap-[50px]">
        <div className="flex items-center gap-8">
          {["سوالات متداول", "تماس با ما", "دستاوردها", "درباره"].map(
            (text) => (
              <Button
                key={text}
                variant="ghost"
                className="h-[18px] px-2 rounded-3xl text-[#222325] text-sm font-medium capitalize leading-[14px] break-words hover:bg-transparent"
              >
                {text}
              </Button>
            )
          )}
          <Button
            variant="ghost"
            className="h-[18px] px-2 rounded-3xl text-[#222325] text-sm font-peyda font-medium capitalize leading-[14px] break-words hover:bg-transparent"
          >
            صفحه اصلی
          </Button>
        </div>

        {/* Logo Section */}
        <div className="flex items-center gap-10">
          <div className="text-center text-[#4A4A4A] text-2xl font-extrablack leading-9 break-words">
            دیجی کارا
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

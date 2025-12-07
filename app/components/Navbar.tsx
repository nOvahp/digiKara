import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full   flex justify-between items-center bg-transparent">
      {/* Left Section (Login) */}
      <div className="border-2 border-[#5E6B7E] p-[1%] rounded-md flex items-center">
        <Button
          variant="ghost"
          className="font-extrablack font-[950] text-[#222325] p-0 h-auto hover:bg-transparent hover:text-gray-600 transition-colors"
        >
          ورود به پلتفــــــــــرم
        </Button>
      </div>

      {/* Right Section (Menu & Logo) */}
      <div className="flex items-center gap-6 md:gap-22">
        <div className="hidden md:flex items-center gap-4 lg:gap-4">
          {["سوالات متداول", "تماس با ما", "دستاوردها", "درباره", " صفحه اصلی"].map(
            (text) => (
              <Button
                key={text}
                variant="ghost"
                className="h-auto px-2 rounded-full text-[#222325] text-sm font-medium font-[500] hover:bg-gray-100 transition-colors"
              >
                {text}
              </Button>
            )
          )}
        </div>

        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="text-center text-[#4A4A4A] text-2xl font-extrablack font-[950] leading-none">
            دیجی کارا
          </div>
          <Image
            src="/Logo.svg"
            alt="DigiKara Logo"
            width={45}
            height={45}
            className="w-10 h-10 md:w-[45px] md:h-[45px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

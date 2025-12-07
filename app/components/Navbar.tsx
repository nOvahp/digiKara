import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full hidden lg:flex justify-between items-center bg-white">
      {/* Left Section (Login) */}
      <div className="border-2 border-[#5E6B7E] p-[1%] rounded-md flex items-center">
        <Link href="/login">
          <Button
            variant="ghost"
            className="font-extrablack font-[950] text-[#222325] p-0 h-auto hover:bg-transparent hover:text-gray-600 transition-colors cursor-pointer"
          >
            ورود به پلتفــــــــــرم
          </Button>
        </Link>
      </div>

      {/* Right Section (Menu & Logo) */}
      <div className="flex items-center gap-6 md:gap-22">
        <div className="hidden md:flex items-center gap-4 lg:gap-4">
          <Link href="/faq">
            <Button
              variant="ghost"
              className="h-auto px-2 rounded-full text-[#222325] text-sm font-medium font-[500] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              سوالات متداول
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="ghost"
              className="h-auto px-2 rounded-full text-[#222325] text-sm font-medium font-[500] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              تماس با ما
            </Button>
          </Link>
          <Link href="/achievements">
            <Button
              variant="ghost"
              className="h-auto px-2 rounded-full text-[#222325] text-sm font-medium font-[500] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              دستاوردها
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="ghost"
              className="h-auto px-2 rounded-full text-[#222325] text-sm font-medium font-[500] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              درباره
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="ghost"
              className="h-auto px-2 rounded-full text-[#222325] text-sm font-medium font-[500] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              صفحه اصلی
            </Button>
          </Link>
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

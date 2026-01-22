"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ChamferedButton from "./ChamferedButton";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/StudentDashboard") || pathname?.startsWith("/Bazzar")) return null;

  return (
    <div className="w-full hidden lg:flex justify-between items-center bg-transparent">
      <ChamferedButton className="h-auto 2xl:h-[60px]">
        <Link
          href="/login"
          className="w-full h-full flex items-center px-4 py-2"
        >
          <span className="font-extrabold text-[#222325] text-sm md:text-base lg:text-sm xl:text-base 2xl:text-xl">
            ورود به پلتفــــــــــرم
          </span>
        </Link>
      </ChamferedButton>

      <div className="flex items-center gap-6 md:gap-22 2xl:gap-32">
        <div className="hidden md:flex items-center gap-4 lg:gap-4 2xl:gap-8">
          <Link href="/faq">
            <Button
              variant="ghost"
              className="h-auto px-2 rounded-full text-[#222325] text-sm lg:text-xs xl:text-sm 2xl:text-lg font-medium font-[500] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              سوالات متداول
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="ghost"
              className="h-auto px-2 rounded-full text-[#222325] text-sm lg:text-xs xl:text-sm 2xl:text-lg font-medium font-[500] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              تماس با ما
            </Button>
          </Link>
          <Link href="/achievements">
            <Button
              variant="ghost"
              className="h-auto px-2 rounded-full text-[#222325] text-sm lg:text-xs xl:text-sm 2xl:text-lg font-medium font-[500] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              دستاوردها
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="ghost"
              className="h-auto px-2 rounded-full text-[#222325] text-sm lg:text-xs xl:text-sm 2xl:text-lg font-medium font-[500] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              درباره
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="ghost"
              className="h-auto px-2 rounded-full text-[#222325] text-sm lg:text-xs xl:text-sm 2xl:text-lg font-medium font-[500] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              صفحه اصلی
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 2xl:gap-6">
          <div className="text-center text-[#4A4A4A] text-2xl lg:text-xl xl:text-2xl 2xl:text-4xl font-extrablack font-[950] leading-none">
            دیجی کارا
          </div>
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="DigiKara Logo"
              width={45}
              height={45}
              className="w-10 h-10 md:w-[45px] md:h-[45px] 2xl:w-[60px] 2xl:h-[60px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

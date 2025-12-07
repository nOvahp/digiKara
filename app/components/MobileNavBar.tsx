"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full flex lg:hidden justify-between items-center bg-white relative z-50">
      {/* Logo Section (Left) */}
      <div className="flex items-center gap-4">
        <Image
          src="/Logo.svg"
          alt="DigiKara Logo"
          width={40}
          height={40}
          className="w-10 h-10"
        />
      </div>

      {/* Hamburger Menu (Right) */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="text-[#222325] hover:bg-transparent"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-6 border-t border-gray-100">
          <Link href="/" onClick={toggleMenu} className="w-full text-center">
            <Button
              variant="ghost"
              className="w-full text-[#222325] font-medium text-base"
            >
              صفحه اصلی
            </Button>
          </Link>
          <Link
            href="/about"
            onClick={toggleMenu}
            className="w-full text-center"
          >
            <Button
              variant="ghost"
              className="w-full text-[#222325] font-medium text-base"
            >
              درباره
            </Button>
          </Link>
          <Link
            href="/achievements"
            onClick={toggleMenu}
            className="w-full text-center"
          >
            <Button
              variant="ghost"
              className="w-full text-[#222325] font-medium text-base"
            >
              دستاوردها
            </Button>
          </Link>
          <Link
            href="/contact"
            onClick={toggleMenu}
            className="w-full text-center"
          >
            <Button
              variant="ghost"
              className="w-full text-[#222325] font-medium text-base"
            >
              تماس با ما
            </Button>
          </Link>
          <Link href="/faq" onClick={toggleMenu} className="w-full text-center">
            <Button
              variant="ghost"
              className="w-full text-[#222325] font-medium text-base"
            >
              سوالات متداول
            </Button>
          </Link>
          <Link
            href="/login"
            onClick={toggleMenu}
            className="w-full text-center"
          >
            <Button
              variant="ghost"
              className="w-full text-[#222325] font-bold text-base"
            >
              ورود به پلتفــــــــــرم
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileNavBar;

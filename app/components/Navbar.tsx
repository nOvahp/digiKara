'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const navLinkClass =
  'text-[#222325] text-[14px] font-[MeemFaNum] font-medium leading-[14px] hover:opacity-70 transition-opacity cursor-pointer';

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === '/' || pathname?.startsWith('/StudentDashboard') || pathname?.startsWith('/Bazzar')) return null;

  return (
    <div
      id="desktop-navbar"
      className="w-full hidden lg:flex justify-between items-center bg-transparent"
    >
      {/* CTA Button */}
      <Link
        href="/login"
        className="flex items-center justify-center gap-1.5 w-[166px] h-[44px] px-2.5 bg-[#0A33FF] rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.10)] outline outline-1 outline-[#E5E5E5] -outline-offset-1 hover:bg-[#0828d4] transition-colors"
      >
        <span className="text-white text-[14px] font-[PeydaFaNum] font-black leading-5 whitespace-nowrap">
          ورود به پلتفــــــــــرم
        </span>
      </Link>

      <div className="flex items-center gap-[50px]">
        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/faq" className={navLinkClass}>سوالات متداول</Link>
          <Link href="/contact" className={navLinkClass}>تماس با ما</Link>
          <Link href="/achievements" className={navLinkClass}>دستاوردها</Link>
          <Link href="/about" className={navLinkClass}>درباره</Link>
          <Link href="/" className={navLinkClass}>صفحه اصلی</Link>
        </div>

        {/* Logo + Brand */}
        <Link href="/">
          <Image
            src="/LogoV.svg"
            alt="DigiKara Logo"
            width={141}
            height={45}
            className="h-[45px] w-auto"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

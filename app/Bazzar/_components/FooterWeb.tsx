import React from 'react';
import Image from 'next/image';
import { Twitter, Instagram, Facebook } from 'lucide-react';

export default function FooterWeb() {
  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col pt-10" dir="rtl">
      {/* Top Section - Logo & Social */}
      <div className="w-full bg-[#FAFAFA]">
        <div className="max-w-[1290px] mx-auto py-10 flex justify-between items-center px-4 xl:px-0">
          {/* Logo - Right Side (First in RTL) */}
          <div className="flex items-center gap-3">
            <div className="relative w-[150px] h-[40px]">
              <Image src="/navbar-brand.svg" alt="Digikara Logo" fill className="object-contain object-right" unoptimized />
            </div>
          </div>
          
          {/* Social Icons - Left Side (Last in RTL) */}
          <div className="flex items-center gap-5">
            <a href="#" className="w-6 h-6 flex items-center justify-center text-[#FFC938] hover:opacity-80 transition-opacity">
              <Facebook fill="currentColor" stroke="none" className="w-[23px] h-[23px]" />
            </a>
            <a href="#" className="w-6 h-6 flex items-center justify-center text-[#FFC938] hover:opacity-80 transition-opacity">
              <Instagram stroke="currentColor" strokeWidth={2} className="w-[22px] h-[22px]" />
            </a>
            <a href="#" className="w-6 h-6 flex items-center justify-center text-[#FFC938] hover:opacity-80 transition-opacity">
              <Twitter fill="currentColor" stroke="none" className="w-[22px] h-[18px]" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#E6E6E6]" />

      {/* Main Content - Links & Subscribe */}
      <div className="w-full bg-white">
        <div className="max-w-[1440px] mx-auto py-12 px-4 lg:px-20 xl:px-[90px] flex flex-col md:flex-row justify-between items-start gap-10">
          
          {/* Links Columns (Right Side in RTL -> First in DOM) */}
          <div className="flex-1 flex flex-wrap justify-start gap-10 lg:gap-20">
            {/* Column 1 */}
            <div className="flex flex-col items-start gap-5">
              <h3 className="text-[#252B42] text-base font-['PeydaWeb'] font-semibold tracking-wide">اطلاعات شرکت</h3>
              <div className="flex flex-col items-start gap-2.5">
                <a href="/landing" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">معرفی دیجی کارا</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">حامل</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">ما استخدام می کنیم</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">وبلاگ</a>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-start gap-5">
              <h3 className="text-[#252B42] text-base font-['PeydaWeb'] font-semibold tracking-wide">امکانات</h3>
              <div className="flex flex-col items-start gap-2.5">
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">بازاریابی کسب و کار</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">تحلیل کاربر</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">چت زنده</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">پشتیبانی نامحدود</a>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-start gap-5">
              <h3 className="text-[#252B42] text-base font-['PeydaWeb'] font-semibold tracking-wide">منابع</h3>
              <div className="flex flex-col items-start gap-2.5">
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">IOS و Android</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">دمو تماشا کنید</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">مشتریان</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">API</a>
              </div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col items-start gap-5">
              <h3 className="text-[#252B42] text-base font-['PeydaWeb'] font-semibold tracking-wide">قانونی</h3>
              <div className="flex flex-col items-start gap-2.5">
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">درباره ما</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">حامل</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">ما استخدام می کنیم</a>
                <a href="#" className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide hover:text-black">وبلاگ</a>
              </div>
            </div>
          </div>

          {/* Subscribe Box (Left Side in RTL -> Last in DOM) */}
          <div className="flex flex-col items-start gap-5 w-full md:w-[472px] shrink-0">
            <h3 className="text-[#252B42] text-base font-['PeydaWeb'] font-semibold tracking-wide">در تماس باشید</h3>
            <div className="w-full flex shadow-sm rounded-md overflow-hidden border border-[#E6E6E6]">
              <input 
                type="email" 
                placeholder="ایمیل شما" 
                className="flex-1 bg-[#F9F9F9] px-5 py-3.5 text-[#737373] text-sm font-['PeydaWeb'] font-light outline-none"
              />
              <button className="bg-[#FFC938] px-5 py-3.5 text-black text-sm font-['PeydaWeb'] font-black tracking-wide hover:opacity-90 transition-opacity shrink-0">
                مشترک شوید
              </button>
            </div>
            <p className="text-[#737373] text-xs font-['PeydaWeb'] font-light tracking-wide -mt-3">
              لورم ایپسوم متن ساختگی با تولید سادگی
            </p>
          </div>
          
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-[#FAFAFA] py-6 flex items-center justify-center">
        <p className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold tracking-wide text-center">
          ساخته شده با عشق توسط نوید و امیرحسین تمام حقوق محفوظ است
        </p>
      </div>

    </div>
  );
}

"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Search, MapPin, ChevronLeft } from 'lucide-react'
import Link from "next/link"
import NavBar from "./NavBar"

// Helper Components
const SectionHeader = ({ title, subtitle, moreText = "مشاهده همه" }: { title: string, subtitle?: string, moreText?: string }) => (
    <div className="w-full flex justify-between items-center mb-4">
         <div className="flex flex-col items-start gap-1">
            <h2 className="text-[#0C1415] text-lg font-['PeydaWeb'] font-semibold">{title}</h2>
            {subtitle && <p className="text-[#4E4E4E] text-xs font-['PeydaWeb'] font-light">{subtitle}</p>}
         </div>
         <span className="text-[#FDD00A] text-xs font-['PeydaWeb'] font-light cursor-pointer">{moreText}</span>
    </div>
);

const ProductCard = ({ title, price, rating, originalPrice, discount }: { title: string, price: string, rating: number, originalPrice?: string, discount?: string }) => (
    <div className="flex flex-col items-start gap-2 w-[170px] shrink-0">
        <div className="relative w-[170px] h-[150px] bg-[#F6F6F6] rounded-lg overflow-hidden">
             <Image 
                src="/ProductBazzar.png" 
                alt={title} 
                fill 
                className="object-cover"
            />
             {/* Shadow Effect from design */}
             <div className="absolute w-[64px] h-[5px] left-[53px] top-[121px] rotate-1 bg-black/80 blur-[11px]" />
        </div>
        <div className="w-full flex flex-col items-start gap-1">
            <div className="w-full flex justify-between items-center">
                 <div className="flex items-center gap-1 opacity-90">
                    <span className="text-[#797979] text-xs font-['PeydaWeb'] font-light">{rating}</span>
                 </div>
                 <h3 className="text-[#1F2029] text-sm font-['PeydaWeb'] font-light text-right">{title}</h3>
            </div>
            <div className="text-[#1F2029] text-sm font-['PeydaWeb'] font-semibold text-right w-full">{price}</div>
        </div>
    </div>
);

const CategoryItem = ({ title, color = "#FDD00A" }: { title: string, color?: string }) => (
     <div className="w-16 flex flex-col items-center gap-2 shrink-0">
        <div className={`w-16 h-16 rounded-xl border border-[#D7D8DA] flex items-center justify-center relative overflow-hidden`}>
             {/* Mock Shape */}
             <div className="w-[30px] h-[30px] bg-[#FDD00A]/20 rounded-full" />
             <div className={`absolute w-[24px] h-[24px] bg-[${color}] rounded-full`} />
        </div>
        <span className="text-[#1F2029] text-xs font-['PeydaWeb'] font-semibold text-center">{title}</span>
    </div>
);

export default function HomePage() {
    // Timer Mock
    const [timeLeft, setTimeLeft] = React.useState({ h: 12, m: 56, s: 2 });

    React.useEffect(() => {
        // Add full-width class to body to remove global padding
        document.body.classList.add('full-width');
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.s > 0) return { ...prev, s: prev.s - 1 };
                if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
                if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
                return prev;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
            document.body.classList.remove('full-width');
        };
    }, []);

    return (
        <div className="w-full min-h-screen bg-white relative flex flex-col items-center pb-[150px] mt-[5%] overflow-x-hidden" dir="rtl">
            
            

            <div className="w-full max-w-[440px] px-0 flex flex-col gap-10">
                
                {/* Top Navbar */}
                <div className="w-full flex justify-between items-center">
                    {/* Location */}
                    <div className="flex flex-col items-start gap-0.5">
                        <span className="text-[#707F81] text-xs font-['PeydaWeb'] font-light">موقعیت</span>
                        <div className="flex items-center gap-1">
                             <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">تهران، ایران</span>
                             <MapPin size={16} className="text-[#FDD00A] fill-[#FDD00A]" />
                        </div>
                    </div>
                    {/* Toggle */}
                    <div className="h-9 p-[3px] rounded-lg border border-[#D7D8DA] flex items-center">
                         <div className="h-[29px] px-3 bg-[#FDD00A] shadow-sm rounded-md flex items-center justify-center">
                             <span className="text-[#393E46] text-sm font-['PeydaWeb'] font-semibold">خرید کالا</span>
                         </div>
                         <div className="h-[29px] px-3 flex items-center justify-center cursor-pointer">
                             <span className="text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold">خرید خدمات</span>
                         </div>
                    </div>
                    
                </div>

                {/* Search Bar */}
                <div className="w-full flex gap-2.5">
                    <div className="flex-1 h-11 border border-[#D7D8DA] rounded-lg px-3 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <Search size={20} className="text-[#707F81]" />
                            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">جستجو</span>
                         </div>
                    </div>
                     <div className="w-[48px] h-11 bg-[#FDD00A] rounded-lg shadow-sm flex items-center justify-center cursor-pointer">
                         {/* Filter Icon Mock */}
                         <div className="w-5 h-5 flex flex-col justify-between items-center py-1">
                             <div className="w-full h-[2px] bg-[#393E46] rounded-full"/>
                             <div className="w-[80%] h-[2px] bg-[#393E46] rounded-full"/>
                             <div className="w-[60%] h-[2px] bg-[#393E46] rounded-full"/>
                         </div>
                     </div>
                </div>

                {/* Hero Banner (Image Background + Text Overlay) */}
                <div className="w-full relative rounded-lg overflow-hidden group cursor-pointer h-[300px]" dir="ltr">
                     {/* Background Image */}
                     <Image 
                        src="/BazzarHeader.png" 
                        alt="Hero Banner"
                        fill
                        className="object-cover"
                        priority
                     />
                     
                     {/* Content Overlay */}
                     <div className="w-[50%] absolute inset-0 p-2 flex flex-col items-start justify-start gap-3" dir="rtl">
                         <div className="flex flex-col items-end gap-1 z-10">
                              <h2 className="text-[#0C1415] text-lg font-['PeydaWeb'] font-bold">مجموعه جدید</h2>
                              <p className="text-[#4E4E4E] text-xs font-['PeydaWeb'] font-light">۵۰٪ تخفیف برای اولین معامله</p>
                         </div>
                         
                         <div className="z-10 mt-3">
                              <div className="bg-[#FDD00A] px-4 py-2 rounded-lg shadow-sm flex items-center justify-center cursor-pointer">
                                  <span className="text-[#393E46] text-xs font-['PeydaWeb'] font-bold">همین حالا خرید کنید</span>
                              </div>
                         </div>
                     </div>

                     {/* Extra Decoration Image */}
                     <div className="absolute right-0 bottom-0 w-[250px] h-[250px] pointer-events-none">
                          <Image src="/BazzarHeader1.png" alt="Decoration" fill className="object-contain object-bottom-right" />
                     </div>
                </div>

                {/* Categories */}
                <div className="w-full flex flex-col gap-3" dir="rtl">
                    <div className="w-full flex justify-between items-center">
                         <span className="text-[#0C1415] text-lg font-['PeydaWeb'] font-semibold">دسته بندی</span>
                         <Link href="/Bazzar/Categories">
                             <span className="text-[#FDD00A] text-xs font-['PeydaWeb'] font-light cursor-pointer">مشاهده همه</span>
                         </Link>
                    </div>
                    {/* Full bleed left */}
                    <div className="flex justify-between items-center overflow-x-auto gap-4 py-2 no-scrollbar pl-6 -ml-6 w-[calc(100%+24px)] pr-1">
                         {/* 5 Categories */}
                         <CategoryItem title="طلا و جواهر" />
                         <CategoryItem title="صنایع هنری" />
                         <CategoryItem title="خوراکی" />
                         <CategoryItem title="پوشاک" />
                         <CategoryItem title="صنایع چوبی" />
                    </div>
                </div>

                {/* Special Sale (Flash Sale) */}
                <div className="w-full flex flex-col gap-3">
                     <div className="w-full flex justify-between items-center">
                          <span className="text-[#0C1415] text-lg font-['PeydaWeb'] font-semibold">فروش ویژه</span>
                          <div className="flex items-center gap-1">
                               <span className="text-[#707F81] text-xs font-['PeydaWeb'] font-light">بسته شدن در:</span>
                               <div className="flex items-center gap-1" dir="ltr">
                                   <div className="w-6 h-6 border border-[#D7D8DA] rounded flex items-center justify-center text-[#21A2FF] text-xs font-bold">{timeLeft.h}</div>
                                   <span>:</span>
                                   <div className="w-6 h-6 border border-[#D7D8DA] rounded flex items-center justify-center text-[#21A2FF] text-xs font-bold">{timeLeft.m}</div>
                                   <span>:</span>
                                   <div className="w-6 h-6 border border-[#D7D8DA] rounded flex items-center justify-center text-[#21A2FF] text-xs font-bold">{timeLeft.s}</div>
                               </div>
                          </div>
                     </div>
                     
                     {/* Horizontal Scroll Products */}
                     <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-6 -ml-6 w-[calc(100%+24px)] scrollbar-hide pr-1">
                         <ProductCard title="میز غذاخوری" price="500,000 تومان" rating={5.0} />
                         <ProductCard title="صندلی ناهارخوری" price="180,000 تومان" rating={4.2} />
                         <ProductCard title="کمد لباس" price="700,000 تومان" rating={4.8} />
                     </div>
                </div>

                {/* New Collection */}
                 <div className="w-full flex flex-col gap-3">
                     <SectionHeader title="مجموعه جدید" subtitle="۵۰٪ تخفیف برای اولین معامله" />
                     <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-6 -ml-6 w-[calc(100%+24px)] scrollbar-hide pr-1">
                         <ProductCard title="صندلی دسته دار" price="180,000 تومان" rating={4.9} />
                         <ProductCard title="صندلی راحتی" price="250,000 تومان" rating={4.5} />
                         <ProductCard title="میز تحریر" price="300,000 تومان" rating={4.7} />
                     </div>
                </div>

                {/* Best Sellers */}
                 <div className="w-full flex flex-col gap-3">
                     <SectionHeader title="پرفروش" moreText="دیدن همه" />
                     <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-6 -ml-6 w-[calc(100%+24px)] scrollbar-hide pr-1">
                         <ProductCard title="صندلی دسته دار" price="180,000 تومان" rating={4.9} />
                         <ProductCard title="صندلی راحتی" price="250,000 تومان" rating={4.5} />
                     </div>
                </div>

                {/* Suggested for You */}
                <div className="w-full flex flex-col gap-3">
                     <SectionHeader title="پیشنهادی برای شما" moreText="مشاهده همه" />
                     <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-6 -ml-6 w-[calc(100%+24px)] scrollbar-hide pr-1">
                         <ProductCard title="تابلو نقاشی" price="1,200,000 تومان" rating={4.7} />
                         <ProductCard title="گلدان سفالی" price="150,000 تومان" rating={4.3} />
                         <ProductCard title="آینه دکوراتیو" price="450,000 تومان" rating={4.6} />
                     </div>
                </div>

                {/* Popular (Custom Grid) */}
                <div className="w-full flex flex-col gap-3">
                     <SectionHeader title="پرطرفدار" moreText="مشاهده همه" />
                     <div className="w-full flex flex-wrap justify-end items-center gap-6 content-center pb-0 pl-0 -ml-0 pr-0">
                         {/* Item 1 */}
                         <div className="w-[calc(50%-12px)] flex flex-col items-start gap-2 inline-flex" dir="rtl">
                             <div className="self-stretch aspect-[170/150] relative">
                                 <div className="w-full h-full left-0 top-0 absolute bg-[#F6F6F6] rounded-lg overflow-hidden">
                                     <Image src="/ProductBazzar.png" alt="صندلی دسته دار" fill className="object-cover" />
                                 </div>
                                 <div className="w-[37%] h-[3%] left-[31%] top-[80%] absolute origin-top-left rotate-1 bg-black/80 blur-[11px]" />
                             </div>
                             <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
                                 <div className="self-stretch flex-col justify-start items-start gap-[7px] flex">
                                     <div className="self-stretch justify-between items-center inline-flex">
                                         <div className="justify-start items-start gap-1 flex">
                                             <div className="opacity-90 text-[#797979] text-xs font-['PeydaWeb'] font-light">۴.۹</div>
                                         </div>
                                         <div className="text-[#1F2029] text-sm font-['PeydaWeb'] font-light text-right">صندلی دسته دار</div>
                                     </div>
                                     <div className="self-stretch text-right text-[#1F2029] text-sm font-['PeydaWeb'] font-semibold">۱۸۰،۰۰۰ تومان</div>
                                 </div>
                             </div>
                         </div>

                         {/* Item 2 */}
                         <div className="w-[calc(50%-12px)] flex flex-col items-start gap-2 inline-flex" dir="rtl">
                             <div className="self-stretch aspect-[170/150] relative">
                                 <div className="w-full h-full left-0 top-0 absolute bg-[#F6F6F6] rounded-lg overflow-hidden">
                                      <Image src="/ProductBazzar.png" alt="صندلی دسته دار" fill className="object-cover" />
                                 </div>
                                 <div className="w-[37%] h-[3%] left-[31%] top-[80%] absolute origin-top-left rotate-1 bg-black/80 blur-[11px]" />
                             </div>
                             <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
                                 <div className="self-stretch flex-col justify-start items-start gap-[7px] flex">
                                     <div className="self-stretch justify-between items-center inline-flex">
                                         <div className="justify-start items-start gap-1 flex">
                                             <div className="opacity-90 text-[#797979] text-xs font-['PeydaWeb'] font-light">۴.۹</div>
                                         </div>
                                         <div className="text-[#1F2029] text-sm font-['PeydaWeb'] font-light text-right">صندلی دسته دار</div>
                                     </div>
                                     <div className="self-stretch text-right text-[#1F2029] text-sm font-['PeydaWeb'] font-semibold">۱۸۰،۰۰۰ تومان</div>
                                 </div>
                             </div>
                         </div>

                         {/* Item 3 */}
                         <div className="w-[calc(50%-12px)] flex flex-col items-start gap-2 inline-flex" dir="rtl">
                             <div className="self-stretch aspect-[170/150] relative">
                                 <div className="w-full h-full left-0 top-0 absolute bg-[#F6F6F6] rounded-lg overflow-hidden">
                                      <Image src="/ProductBazzar.png" alt="صندلی راحتی" fill className="object-cover" />
                                 </div>
                                 <div className="w-[37%] h-[3%] left-[31%] top-[80%] absolute origin-top-left rotate-1 bg-black/80 blur-[11px]" />
                             </div>
                             <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
                                 <div className="self-stretch flex-col justify-start items-start gap-[7px] flex">
                                     <div className="self-stretch justify-between items-center inline-flex">
                                         <div className="justify-start items-start gap-1 flex">
                                             <div className="opacity-90 text-[#797979] text-xs font-['PeydaWeb'] font-light">۴.۵</div>
                                         </div>
                                         <div className="text-[#1F2029] text-sm font-['PeydaWeb'] font-light text-right">صندلی راحتی</div>
                                     </div>
                                     <div className="self-stretch text-right text-[#1F2029] text-sm font-['PeydaWeb'] font-semibold">۲۵۰،۰۰۰ تومان</div>
                                 </div>
                             </div>
                         </div>
                         
                         {/* Item 4 */}
                         <div className="w-[calc(50%-12px)] flex flex-col items-start gap-2 inline-flex" dir="rtl">
                             <div className="self-stretch aspect-[170/150] relative">
                                 <div className="w-full h-full left-0 top-0 absolute bg-[#F6F6F6] rounded-lg overflow-hidden">
                                      <Image src="/ProductBazzar.png" alt="میز تحریر" fill className="object-cover" />
                                 </div>
                                 <div className="w-[37%] h-[3%] left-[31%] top-[80%] absolute origin-top-left rotate-1 bg-black/80 blur-[11px]" />
                             </div>
                             <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
                                 <div className="self-stretch flex-col justify-start items-start gap-[7px] flex">
                                     <div className="self-stretch justify-between items-center inline-flex">
                                         <div className="justify-start items-start gap-1 flex">
                                             <div className="opacity-90 text-[#797979] text-xs font-['PeydaWeb'] font-light">۴.۷</div>
                                         </div>
                                         <div className="text-[#1F2029] text-sm font-['PeydaWeb'] font-light text-right">میز تحریر</div>
                                     </div>
                                     <div className="self-stretch text-right text-[#1F2029] text-sm font-['PeydaWeb'] font-semibold">۳۰۰،۰۰۰ تومان</div>
                                 </div>
                             </div>
                         </div>

                          {/* Item 5 */}
                         <div className="w-[calc(50%-12px)] flex flex-col items-start gap-2 inline-flex" dir="rtl">
                             <div className="self-stretch aspect-[170/150] relative">
                                 <div className="w-full h-full left-0 top-0 absolute bg-[#F6F6F6] rounded-lg overflow-hidden">
                                      <Image src="/ProductBazzar.png" alt="میز غذاخوری" fill className="object-cover" />
                                 </div>
                                 <div className="w-[37%] h-[3%] left-[31%] top-[80%] absolute origin-top-left rotate-1 bg-black/80 blur-[11px]" />
                             </div>
                             <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
                                 <div className="self-stretch flex-col justify-start items-start gap-[7px] flex">
                                     <div className="self-stretch justify-between items-center inline-flex">
                                         <div className="justify-start items-start gap-1 flex">
                                             <div className="opacity-90 text-[#797979] text-xs font-['PeydaWeb'] font-light">۵.۰</div>
                                         </div>
                                         <div className="text-[#1F2029] text-sm font-['PeydaWeb'] font-light text-right">میز غذاخوری</div>
                                     </div>
                                     <div className="self-stretch text-right text-[#1F2029] text-sm font-['PeydaWeb'] font-semibold">۵۰۰،۰۰۰ تومان</div>
                                 </div>
                             </div>
                         </div>

                          {/* Item 6 */}
                         <div className="w-[calc(50%-12px)] flex flex-col items-start gap-2 inline-flex" dir="rtl">
                             <div className="self-stretch aspect-[170/150] relative">
                                 <div className="w-full h-full left-0 top-0 absolute bg-[#F6F6F6] rounded-lg overflow-hidden">
                                      <Image src="/ProductBazzar.png" alt="صندلی ناهارخوری" fill className="object-cover" />
                                 </div>
                                 <div className="w-[37%] h-[3%] left-[31%] top-[80%] absolute origin-top-left rotate-1 bg-black/80 blur-[11px]" />
                             </div>
                             <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
                                 <div className="self-stretch flex-col justify-start items-start gap-[7px] flex">
                                     <div className="self-stretch justify-between items-center inline-flex">
                                         <div className="justify-start items-start gap-1 flex">
                                             <div className="opacity-90 text-[#797979] text-xs font-['PeydaWeb'] font-light">۴.۲</div>
                                         </div>
                                         <div className="text-[#1F2029] text-sm font-['PeydaWeb'] font-light text-right">صندلی ناهارخوری</div>
                                     </div>
                                     <div className="self-stretch text-right text-[#1F2029] text-sm font-['PeydaWeb'] font-semibold">۱۸۰،۰۰۰ تومان</div>
                                 </div>
                             </div>
                         </div>

                     </div>
                </div>

                 {/* Popular Schools (Mock) - Keeping Grid as is but checking bleed */}
                 <div className="w-full flex flex-col gap-3">
                     <SectionHeader title="مدارس محبوب" moreText="دیدن همه" />
                     {/* For Grid, we just extend the container if we want full bleed, but usually grid is contained. 
                         However, user asked for "Popular Schools" to not see left margin. 
                         If it's a grid, it might mean the grid background or items should extend? 
                         Or maybe it's meant to be scrollable too? The original code was a grid.
                         If it's a grid inside the padded container, extending it is tricky without lookin weird.
                         I'll assume they want the same 'flush left' effect. 
                         I will apply the negative margin to the grid container wrapper.
                     */}
                     <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-6 -ml-[8vw] w-[calc(100%+8vw)] scrollbar-hide pr-1">
                          {[1, 2, 3, 4, 5].map(i => (
                              <div key={i} className="flex flex-col gap-2 shrink-0 w-[100px]">
                                   <div className="w-[100px] h-[100px] bg-gray-100 rounded-lg relative overflow-hidden">
                                        <Image src="/ProductBazzar.png" alt="School" fill className="object-cover" />
                                   </div>
                                   <div className="flex flex-col items-center w-full">
                                        <span className="text-[#1F2029] text-xs font-['PeydaWeb'] font-semibold text-center">خلاقیت</span>
                                        <span className="text-[#1F2029] text-[10px] font-['PeydaWeb'] font-light opacity-60 text-center">هنرستان دخترانه</span>
                                   </div>
                              </div>
                          ))}
                     </div>
                </div>

            </div>

             {/* Bottom Navigation */}
             <NavBar />
        </div>
    );
}

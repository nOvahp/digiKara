"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Search, MapPin, ChevronLeft, Gem, Palette, Utensils, Shirt, Armchair } from 'lucide-react'
import Link from "next/link"

import NavBar from "./NavBar"
import SearchBar from "../components/SearchBar"
import { products } from "../data/product"

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

const ProductCard = ({ id, title, price, rating, originalPrice, discount, image }: { id: number, title: string, price: string, rating: number, originalPrice?: string, discount?: string, image?: string }) => (
    <Link href={`/Bazzar/ProductDetails?id=${id}`} className="flex flex-col items-start gap-2 w-[170px] shrink-0 cursor-pointer">
        <div className="relative w-[170px] h-[150px] bg-[#F6F6F6] rounded-lg overflow-hidden">
             <Image 
                src={image || "/ProductBazzar.png"} 
                alt={title} 
                fill 
                className="object-cover"
            />
             {/* Shadow Effect from design */}
             <div className="absolute w-[64px] h-[5px] left-[53px] top-[121px] rotate-1 bg-black/80 blur-[11px]" />
             {/* Random Tag */}
             {id % 3 === 0 && (
                <div style={{
                    background: 'linear-gradient(0deg, rgba(100, 179, 39, 0.20) 0%, rgba(100, 179, 39, 0.20) 100%), white'
                }} className="absolute left-[3.5px] bottom-[6px] h-5 px-2 py-0.5 rounded-2xl flex items-center justify-center z-10">
                    <span className="text-[#64B327] text-xs font-medium leading-[18px]">شغل بابام</span>
                </div>
             )}
        </div>
        <div className="w-full flex flex-col items-start gap-1">
            <div className="w-full flex justify-between items-center">
                 <h3 className="text-[#1F2029] text-sm font-['PeydaWeb'] font-light text-right overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px]">{title}</h3>
                 <div className="flex items-center gap-1 opacity-90">
                    <span className="text-[#797979] text-xs font-num-medium pt-0.5">{rating}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FDD00A" stroke="none" className="mb-0.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                 </div>
            </div>
            <div className="text-[#1F2029] text-sm font-num-medium text-left w-full">{price}</div>
        </div>
    </Link>
);

const CategoryItem = ({ title }: { title: string }) => {
    const icons: Record<string, React.ElementType> = {
        "طلا و جواهر": Gem,
        "صنایع هنری": Palette,
        "خوراکی": Utensils,
        "پوشاک": Shirt,
        "صنایع چوبی": Armchair,
    };
    const Icon = icons[title] || Palette; // Default icon if not found

    return (
        <div className="w-16 flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
            <div className={`w-16 h-16 rounded-2xl bg-[#FDD00A] flex items-center justify-center transition-colors group-hover:opacity-90`}>
                <Icon className="w-8 h-8 text-[#393E46]" strokeWidth={1.5} />
            </div>
            <span className="text-[#1F2029] text-xs font-['PeydaWeb'] font-semibold text-center">{title}</span>
        </div>
    );
};

export default function HomePage() {
    // Timer Mock
    const [timeLeft, setTimeLeft] = React.useState({ h: 12, m: 56, s: 2 });

    const specialSaleProducts = products.filter(p => p.isSpecialSale);
    const newCollectionProducts = products.filter(p => p.isNewCollection);
    const bestSellerProducts = products.filter(p => p.isBestSeller);
    const suggestedProducts = products.filter(p => p.isSuggested);
    const popularProducts = products.filter(p => p.isPopular);

    
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
                <SearchBar />

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
                               <Link href="/Bazzar/ProductDetails" className="bg-[#FDD00A] px-4 py-2 rounded-lg shadow-sm flex items-center justify-center cursor-pointer">
                                  <span className="text-[#393E46] text-xs font-['PeydaWeb'] font-bold">همین حالا خرید کنید</span>
                               </Link>
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
                                   <div className="w-6 h-6 border border-[#D7D8DA] rounded flex items-center justify-center text-[#21A2FF] text-xs font-num-medium">{timeLeft.h}</div>
                                   <span>:</span>
                                   <div className="w-6 h-6 border border-[#D7D8DA] rounded flex items-center justify-center text-[#21A2FF] text-xs font-num-medium">{timeLeft.m}</div>
                                   <span>:</span>
                                   <div className="w-6 h-6 border border-[#D7D8DA] rounded flex items-center justify-center text-[#21A2FF] text-xs font-num-medium">{timeLeft.s}</div>
                               </div>
                          </div>
                     </div>
                     
                     {/* Horizontal Scroll Products */}
                     <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-6 -ml-6 w-[calc(100%+24px)] scrollbar-hide pr-1">
                         {specialSaleProducts.map(product => (
                             <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} rating={product.rating} image={product.image} />
                         ))}
                     </div>
                </div>

                {/* New Collection */}
                 <div className="w-full flex flex-col gap-3">
                     <SectionHeader title="مجموعه جدید" subtitle="۵۰٪ تخفیف برای اولین معامله" />
                     <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-6 -ml-6 w-[calc(100%+24px)] scrollbar-hide pr-1">
                         {newCollectionProducts.map(product => (
                             <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} rating={product.rating} image={product.image} />
                         ))}
                     </div>
                </div>

                {/* Best Sellers */}
                 <div className="w-full flex flex-col gap-3">
                     <SectionHeader title="پرفروش" moreText="دیدن همه" />
                     <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-6 -ml-6 w-[calc(100%+24px)] scrollbar-hide pr-1">
                         {bestSellerProducts.map(product => (
                             <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} rating={product.rating} image={product.image} />
                         ))}
                     </div>
                </div>

                {/* Suggested for You */}
                <div className="w-full flex flex-col gap-3">
                     <SectionHeader title="پیشنهادی برای شما" moreText="مشاهده همه" />
                     <div className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-6 -ml-6 w-[calc(100%+24px)] scrollbar-hide pr-1">
                         {suggestedProducts.map(product => (
                             <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} rating={product.rating} image={product.image} />
                         ))}
                     </div>
                </div>

                {/* Popular (Custom Grid) */}
                <div className="w-full flex flex-col gap-3">
                     <SectionHeader title="پرطرفدار" moreText="مشاهده همه" />
                     <div className="w-full flex-wrap justify-end items-center gap-6 content-center pb-0 pl-0 -ml-0 pr-0 flex">
                         {popularProducts.map(product => (
                             <div key={product.id} className="w-[calc(50%-12px)] flex flex-col items-start gap-2 inline-flex" dir="rtl">
                                 <Link href={`/Bazzar/ProductDetails?id=${product.id}`} className="self-stretch aspect-[170/150] relative">
                                     <div className="w-full h-full left-0 top-0 absolute bg-[#F6F6F6] rounded-lg overflow-hidden">
                                         <Image src={product.image} alt={product.title} fill className="object-cover" />
                                     </div>
                                     <div className="w-[37%] h-[3%] left-[31%] top-[80%] absolute origin-top-left rotate-1 bg-black/80 blur-[11px]" />
                                     {product.id % 3 === 0 && (
                                        <div style={{
                                            background: 'linear-gradient(0deg, rgba(100, 179, 39, 0.20) 0%, rgba(100, 179, 39, 0.20) 100%), white'
                                        }} className="absolute left-[3.5px] bottom-[6px] h-5 px-2 py-0.5 rounded-2xl flex items-center justify-center z-10">
                                            <span className="text-[#64B327] text-xs font-['PeydaFaNum'] leading-[18px]">شغل بابام</span>
                                        </div>
                                     )}
                                 </Link>
                                 <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
                                     <div className="self-stretch flex-col justify-start items-start gap-[7px] flex">
                                         <div className="self-stretch justify-between items-center inline-flex">
                                             <div className="text-[#1F2029] text-sm font-['PeydaWeb'] font-light text-right overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px]">{product.title}</div>
                                             <div className="justify-start items-center gap-1 flex opacity-90">
                                                 <span className="text-[#797979] text-xs font-num-medium pt-0.5">{product.rating}</span>
                                                 <svg width="12" height="12" viewBox="0 0 24 24" fill="#FDD00A" stroke="none" className="mb-0.5">
                                                     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                 </svg>
                                             </div>
                                         </div>
                                         <div className="self-stretch text-left text-[#1F2029] text-sm font-num-medium">{product.price}</div>
                                     </div>
                                 </div>
                             </div>
                         ))}
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
                          {[
                              { id: 1, name: "مدرسه دخترانه", img: "/honarestan1.png", label: "خلاقیت" },
                              { id: 2, name: "مدرسه سوره", img: "/honarestan2.png", label: "نوآوری" },
                              { id: 3, name: "مدرسه هنرهای زیبا", img: "/honarestan3.png", label: "استعداد" },
                              { id: 4, name: "مدرسه کمال الملک", img: "/honarestan1.png", label: "مهارت" },
                              { id: 5, name: "مدرسه موسیقی", img: "/honarestan2.png", label: "هنر" },
                          ].map(school => (
                              <div key={school.id} className="flex flex-col gap-2 shrink-0 w-[100px]">
                                   <div className="w-[100px] h-[100px] bg-gray-100 rounded-lg relative overflow-hidden">
                                        <Image src={school.img} alt={school.name} fill className="object-cover" />
                                   </div>
                                   <div className="flex flex-col items-center w-full">
                                        <span className="text-[#1F2029] text-xs font-['PeydaWeb'] font-semibold text-center">{school.label}</span>
                                        <span className="text-[#1F2029] text-[10px] font-['PeydaWeb'] font-light opacity-60 text-center">{school.name}</span>
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

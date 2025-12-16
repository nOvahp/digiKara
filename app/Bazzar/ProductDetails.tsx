"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
    ArrowLeft, 
    Bookmark, 
    Star, 
    MoreHorizontal, 
    ChevronRight, 
    ShoppingBag,
    Share2,
    Heart
} from "lucide-react"

const PRODUCT_IMAGE = "/ProductDetails.png";

export default function ProductDetails() {
    const [selectedColor, setSelectedColor] = useState("Brown");
    const [selectedSize, setSelectedSize] = useState("Large");

    useEffect(() => {
        // Add full-width class to body to remove global padding
        document.body.classList.add('full-width');
        return () => {
            document.body.classList.remove('full-width');
        };
    }, []);

    return (
        <div className="w-full flex justify-center  min-h-screen">
            <div className="w-full max-w-[440px] relative flex flex-col  overflow-hidden pb-[100px]">
                
                {/* Header Image Area */}
                <div className="relative w-full h-[443px]">
                     <Image 
                        src={PRODUCT_IMAGE}
                        alt="Product" 
                        fill 
                        className="object-cover"
                        priority
                     />
                     
                     {/* Header Controls (Overlay) */}
                     <div className="absolute top-0 left-0 w-full p-0 flex justify-between items-center z-10 pt-4 px-6">
                          {/* Back Button */}
                          <Link href="/Bazzar">
                             <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-white transition-colors">
                                 <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={2} />
                             </div>
                          </Link>

                          <span className="text-white text-lg font-['PeydaWeb'] font-bold drop-shadow-md">جزئیات محصول</span>

                          {/* Action Button (Bookmark/Share) */}
                          <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-white transition-colors">
                               <Bookmark className="w-5 h-5 text-[#0C1415]" strokeWidth={2} />
                          </div>
                     </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-col px-[8%] pt-6 gap-6" dir="rtl">
                    
                    {/* Title & Rating */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">چرم آژاکس</span>
                            <div className="flex items-center gap-1">
                                <span className="text-[#707F81] text-sm font-['PeydaFaNum']">۴.۵</span>
                                <Star className="w-4 h-4 text-[#FDD00A] fill-[#FDD00A]" />
                            </div>
                        </div>
                        <h1 className="text-[#0C1415] text-lg font-['PeydaWeb'] font-bold leading-relaxed">
                            کیف دستی چرم مدرن
                        </h1>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold ">جزییات محصول</h3>
                        <p className="text-[#707F81] text-sm font-['PeydaWeb'] font-light leading-6 text-justify">
                            این کیف دستی شیک دارای چرم دباغی شده گیاهی، فضای داخلی جادار و لهجه های سخت افزاری نقره ای است. این کیف برای حمل وسایل ضروری روزمره شما عالی است. این کیف دارای یک بند شانه ای قابل تنظیم و بسته شدن مغناطیسی است.
                        </p>
                        <span className="text-[#2F51FF] text-sm font-['PeydaWeb'] font-semibold underline cursor-pointer self-end">
                            مشاهده جزئیات محصول
                        </span>
                    </div>

                    <div className="w-full h-px bg-gray-100" />

                    {/* Color Selection */}
                    <div className="flex flex-col gap-3">
                         <div className="flex items-center gap-1 text-base font-['PeydaWeb'] font-semibold">
                             <span className="text-[#0C1415]">انتخاب رنگ: </span>
                             <span className="text-[#2F51FF]">{selectedColor === "Brown" ? "قهوه ای" : selectedColor === "Green" ? "سبز" : selectedColor === "Red" ? "قرمز" : selectedColor === "Purple" ? "بنفش" : "زیتونی"}</span>
                         </div>
                         <div className="flex gap-4">
                             {/* Selected (Brown) */}
                             <div 
                                onClick={() => setSelectedColor("Brown")}
                                className={`relative w-8 h-8 rounded-full bg-[#A2845E] cursor-pointer flex items-center justify-center ${selectedColor === "Brown" ? "ring-2 ring-offset-2 ring-[#A2845E]" : ""}`}
                             >
                                 {selectedColor === "Brown" && <div className="w-3 h-3 bg-white rounded-full shadow-sm" />}
                             </div>

                             {/* Green */}
                             <div 
                                onClick={() => setSelectedColor("Green")}
                                className={`relative w-8 h-8 rounded-full bg-[#3C5A5D] cursor-pointer flex items-center justify-center ${selectedColor === "Green" ? "ring-2 ring-offset-2 ring-[#3C5A5D]" : ""}`}
                             >
                                 {selectedColor === "Green" && <div className="w-3 h-3 bg-white rounded-full shadow-sm" />}
                             </div>

                             {/* Red */}
                             <div 
                                onClick={() => setSelectedColor("Red")}
                                className={`relative w-8 h-8 rounded-full bg-[#5D3C3C] cursor-pointer flex items-center justify-center ${selectedColor === "Red" ? "ring-2 ring-offset-2 ring-[#5D3C3C]" : ""}`}
                             >
                                 {selectedColor === "Red" && <div className="w-3 h-3 bg-white rounded-full shadow-sm" />}
                             </div>

                             {/* Purple */}
                             <div 
                                onClick={() => setSelectedColor("Purple")}
                                className={`relative w-8 h-8 rounded-full bg-[#4B3C5D] cursor-pointer flex items-center justify-center ${selectedColor === "Purple" ? "ring-2 ring-offset-2 ring-[#4B3C5D]" : ""}`}
                             >
                                 {selectedColor === "Purple" && <div className="w-3 h-3 bg-white rounded-full shadow-sm" />}
                             </div>

                             {/* Olive */}
                             <div 
                                onClick={() => setSelectedColor("Olive")}
                                className={`relative w-8 h-8 rounded-full bg-[#5A5D3C] cursor-pointer flex items-center justify-center ${selectedColor === "Olive" ? "ring-2 ring-offset-2 ring-[#5A5D3C]" : ""}`}
                             >
                                 {selectedColor === "Olive" && <div className="w-3 h-3 bg-white rounded-full shadow-sm" />}
                             </div>
                         </div>
                    </div>

                    <div className="w-full h-px bg-gray-100" />

                    {/* Size Selection */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-1 text-base font-['PeydaWeb'] font-semibold">
                             <span className="text-[#0C1415]">انتخاب اندازه: </span>
                             <span className="text-[#2F51FF]">{selectedSize === "Large" ? "بزرگ" : selectedSize === "Medium" ? "متوسط" : "کوچک"}</span>
                        </div>
                        <div className="flex gap-4">
                            <div 
                                onClick={() => setSelectedSize("Large")}
                                className={`flex items-center gap-2 cursor-pointer ${selectedSize !== "Large" ? "opacity-50" : ""}`}
                            >
                                <span className="text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold">بزرگ</span>
                                <div className={`w-4 h-4 rounded-full border border-[#E5E5E5] flex items-center justify-center ${selectedSize === "Large" ? "border-black" : ""}`}>
                                    {selectedSize === "Large" && <div className="w-2 h-2 bg-[#171717] rounded-full" />}
                                </div>
                            </div>
                            <div 
                                onClick={() => setSelectedSize("Medium")}
                                className={`flex items-center gap-2 cursor-pointer ${selectedSize !== "Medium" ? "opacity-50" : ""}`}
                            >
                                <span className="text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold">متوسط</span>
                                <div className={`w-4 h-4 rounded-full border border-[#E5E5E5] flex items-center justify-center ${selectedSize === "Medium" ? "border-black" : ""}`}>
                                    {selectedSize === "Medium" && <div className="w-2 h-2 bg-[#171717] rounded-full" />}
                                </div>
                            </div>
                            <div 
                                onClick={() => setSelectedSize("Small")}
                                className={`flex items-center gap-2 cursor-pointer ${selectedSize !== "Small" ? "opacity-50" : ""}`}
                            >
                                <span className="text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold">کوچک</span>
                                <div className={`w-4 h-4 rounded-full border border-[#E5E5E5] flex items-center justify-center ${selectedSize === "Small" ? "border-black" : ""}`}>
                                    {selectedSize === "Small" && <div className="w-2 h-2 bg-[#171717] rounded-full" />}
                                </div>
                            </div>
                        </div>
                    </div>

                     <div className="w-full h-px bg-gray-100" />

                    {/* Reviews */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">نظرات خریداران</h3>
                        
                        {/* Rating Summary Block */}
                        <div className="flex items-center justify-between bg-white p-2">
                            
                             {/* Big Number */}
                             <div className="flex flex-col items-center gap-1">
                                  <span className="text-4xl font-['PeydaFaNum'] font-black text-[#0C1415]">۴.۵</span>
                                  <div className="flex gap-0.5">
                                      {[1,2,3,4,4.5].map((_,i) => (
                                          <Star key={i} className="w-4 h-4 text-[#FCAF23] fill-[#FCAF23]" />
                                      ))}
                                  </div>
                                  <span className="text-[#707F81] text-xs font-['PeydaFaNum']">(۱۰۷ نظر)</span>
                             </div>

                             {/* Bars */}
                             <div className="flex flex-col gap-1 w-1/2" dir="ltr">
                                  {[5,4,3,2,1].map((n, i) => (
                                      <div key={n} className="flex items-center gap-2">
                                          <span className="text-xs font-['PeydaFaNum'] w-3 text-center">{n}</span>
                                          <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                              <div 
                                                className="h-full bg-[#F7C309] rounded-full" 
                                                style={{ width: i===0?'80%': i===1?'60%': '10%'}} 
                                              />
                                          </div>
                                      </div>
                                  ))}
                             </div>

                        </div>

                         {/* Reviews List */}
                         <div className="flex flex-col gap-4 w-full">
                            
                            {/* Review 1: Nahid Kohestani */}
                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex flex-col gap-4 w-full">
                                    <div className="w-full h-0"></div>
                                    <div className="relative w-full flex justify-between items-center">
                                        
                                        {/* User Profile (Right Side in RTL) */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-[#D9D9D9] rounded-full overflow-hidden relative">
                                                {/* Placeholder for avatar */}
                                                <div className="w-full h-full bg-gray-300"></div> 
                                            </div>
                                            <div className="flex flex-col items-start gap-3">
                                                <div className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-medium break-words">ناهید کوهستانی</div>
                                            </div>
                                        </div>

                                        {/* Date (Left Side in RTL) */}
                                        <div className="flex flex-col items-start gap-3 w-[67px]">
                                            <div className="text-center text-[#707F81] text-xs font-['PeydaFaNum'] font-normal break-words">۲ هفته پیش</div>
                                        </div>

                                        {/* Yellow Square Indicator */}
                                        <div className="absolute w-[13px] h-[14px] left-[351px] top-[10px] bg-[#F7C309] outline outline-1 outline-white hidden md:block" />
                                    </div>

                                    {/* Review Text & Rating */}
                                    <div className="flex flex-col items-start gap-2 w-full">
                                        <div className="w-full text-right text-[#707F81] text-sm font-['PeydaFaNum'] font-normal break-words leading-6">
                                            من عاشق این کیف دستی هستم! چرم نرم و لطیف است و اندازه آن برای حمل تمام وسایل ضروری من عالی است.
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="text-[#707F81] text-sm font-['PeydaFaNum'] font-medium break-words">۵.۰</div>
                                            <Star className="w-3 h-3 text-gray-400 fill-[#FCAF23] stroke-none" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-start items-center gap-2">
                                    <div className="w-[100px] h-[100px] bg-[#D9D9D9] rounded-xl overflow-hidden relative">
                                         {/* Placeholder for review image */}
                                    </div>
                                    <div className="w-[100px] h-[100px] bg-[#D9D9D9] rounded-xl overflow-hidden relative">
                                         {/* Placeholder for review image */}
                                    </div>
                                </div>
                            </div>

                            {/* Review 2: Farhad Ghaemi */}
                            <div className="flex flex-col gap-3 w-full">
                                <div className="flex flex-col gap-4 w-full">
                                    <div className="w-full h-0"></div>
                                    <div className="relative w-full flex justify-between items-center">
                                       
                                        {/* User Profile (Right Side in RTL) */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-[#D9D9D9] rounded-full overflow-hidden relative">
                                                <div className="w-full h-full bg-gray-300"></div>
                                            </div>
                                            <div className="flex flex-col items-start gap-3">
                                                <div className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-medium break-words">فرهاد قائمی</div>
                                            </div>
                                        </div>

                                         {/* Date (Left Side in RTL) */}
                                        <div className="flex flex-col items-start gap-3 w-[67px]">
                                            <div className="text-center text-[#707F81] text-xs font-['PeydaFaNum'] font-normal break-words leading-5">۱ ماه پیش</div>
                                        </div>

                                         {/* Yellow Square Indicator */}
                                        <div className="absolute w-[13px] h-[12px] left-[351px] top-[10px] bg-[#F7C309] outline outline-1 outline-white hidden md:block" />
                                    </div>

                                     {/* Review Text & Rating */}
                                    <div className="flex flex-col items-start gap-2 w-full">
                                        <div className="w-full text-right text-[#707F81] text-sm font-['PeydaFaNum'] font-normal break-words">
                                            این کیف دستی بسیار زیبا و با کیفیت است. من از خرید خودم بسیار راضی هستم.
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="text-[#707F81] text-sm font-['PeydaFaNum'] font-medium break-words">۵.۰</div>
                                            <Star className="w-3 h-3 text-gray-400 fill-[#FCAF23] stroke-none" />
                                        </div>
                                    </div>

                                </div>
                            </div>

                         </div>

                    </div>

                    <div className="w-full h-px bg-gray-100 mt-2 mb-6" />

                    {/* Similar Products */}
                    <div className="flex flex-col gap-4 pb-6" dir="rtl">
                        <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">محصولات مشابه</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mr-[8%] pr-[8%]">
                            {[1,2,3].map((i) => (
                                <Link href="/Bazzar/ProductDetails" key={i} className="flex flex-col items-start gap-2 w-[140px] shrink-0 cursor-pointer">
                                    <div className="relative w-[140px] h-[120px] bg-[#F6F6F6] rounded-lg overflow-hidden">
                                        <Image 
                                            src="/ProductBazzar.png" 
                                            alt="Product" 
                                            fill 
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="w-full flex flex-col items-start gap-1">
                                        <h3 className="text-[#1F2029] text-xs font-['PeydaWeb'] font-light text-right">محصول مشابه {i}</h3>
                                        <span className="text-[#1F2029] text-xs font-['PeydaWeb'] font-semibold">۲۵۰،۰۰۰ تومان</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fixed Bottom Bar */}
                <div className="fixed bottom-0 w-full max-w-[440px] bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-2xl z-50">
                     <div className="flex items-center justify-between gap-4">
                         
                         {/* Price */}
                         <div className="flex flex-col items-end">
                             <span className="text-[#707F81] text-xs font-['PeydaFaNum']">هزینه نهایی</span>
                             <span className="text-[#0C1415] text-base font-['PeydaFaNum'] font-medium">۲۸۰،۰۰۰ تومان</span>
                         </div>

                         {/* Add to Cart Button */}
                         <button className="flex-1 bg-[#FDD00A] h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-[#EAC009] transition-colors">
                             <span className="text-[#1A1C1E] text-base font-['PeydaWeb'] font-semibold">افزودن به سبد خرید</span>
                             <ShoppingBag className="w-5 h-5 text-[#0A0A0A]" />
                         </button>
                     </div>
                     
                     {/* iOS Indicator */}
                     <div className="w-full flex justify-center mt-3">
                        <div className="w-[134px] h-[5px] bg-black rounded-full" />
                     </div>
                </div>

            </div>
        </div>
    )
}

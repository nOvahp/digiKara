"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Box, Check, ChevronLeft, MapPin, Truck, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FinalCheckPage() {
    const router = useRouter();

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center relative" dir="rtl">
            
            {/* Header */}
            <div className="w-full max-w-[440px] flex justify-between items-center px-6 py-4 shrink-0">
                 <div className="flex items-center justify-center w-full relative">
                     <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">بررسی نهایی</span>
                     <button 
                        onClick={() => router.back()}
                        className="absolute left-0 w-10 h-10 rounded-full border border-[rgba(0,0,0,0.10)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                     >
                         <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
                     </button>
                 </div>
            </div>

            <div className="w-full max-w-[440px] flex flex-col gap-0 px-6 pb-24 flex-1 overflow-y-auto no-scrollbar">
                
                {/* Address Section */}
                <div className="w-full flex flex-col gap-4 py-6">
                    <div className="flex justify-between items-center w-full">
                         <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">انتخاب آدرس</h3>
                    </div>
                    
                    <div className="w-full flex justify-between items-center bg-white">
                        <div className="flex gap-4 items-start">
                             <div className="mt-1">
                                 <MapPin className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                             </div>
                             <div className="flex flex-col gap-1 text-right">
                                 <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">خانه</span>
                                 <p className="text-[#707F81] text-xs font-['PeydaWeb'] font-light leading-5">
                                     تهران، خیابان ولیعصر، کوچه گلها، پلاک <span className="font-['PeydaFaNum']">12</span>، واحد <span className="font-['PeydaFaNum']">5</span>
                                 </p>
                             </div>
                        </div>
                        <button className="px-5 py-2 rounded border border-[rgba(0,0,0,0.10)] text-[#3C5A5D] text-xs font-['PeydaWeb'] font-semibold hover:bg-gray-50 transition-colors tracking-wide">
                            تغییر
                        </button>
                    </div>
                </div>

                <div className="w-full h-px bg-[rgba(0,0,0,0.10)]"></div>

                {/* Delivery Section */}
                <div className="w-full flex flex-col gap-4 py-6">
                    <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">انتخاب نوع ارسال</h3>
                    
                    <div className="w-full flex justify-between items-center">
                        <div className="flex gap-4 items-start">
                             <div className="mt-1 relative">
                                 <Truck className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                                 <div className="absolute -bottom-1 -right-1 bg-[#3C5A5D] w-3 h-3 rounded-full flex items-center justify-center border border-white">
                                     <Check className="w-2 h-2 text-white" strokeWidth={3} />
                                 </div>
                             </div>
                             <div className="flex flex-col gap-1 text-right">
                                 <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">اقتصادی</span>
                                 <span className="text-[#707F81] text-xs font-['PeydaWeb'] font-light">
                                     تاریخ تحویل تخمینی <span className="font-['PeydaFaNum']">3</span> مهر <span className="font-['PeydaFaNum']">1404</span>
                                 </span>
                             </div>
                        </div>
                        <button className="px-5 py-2 rounded border border-[rgba(0,0,0,0.10)] text-[#3C5A5D] text-xs font-['PeydaWeb'] font-semibold hover:bg-gray-50 transition-colors tracking-wide">
                            تغییر
                        </button>
                    </div>
                </div>

                <div className="w-full h-px bg-[rgba(0,0,0,0.10)]"></div>

                {/* Order List */}
                <div className="w-full flex flex-col gap-6 py-6">
                    <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">لیست سفارش</h3>
                    
                    {/* Item 1 */}
                    <div className="flex gap-4 items-center justify-end w-full">
                         <div className="flex-1 flex flex-col items-end gap-1">
                             <span className="text-[#0C1415] text-sm font-['PeydaFaNum']">صندلی راحتی</span>
                             <span className="text-[#707F81] text-xs font-['PeydaFaNum']">کارگاه نجاری هنرمندان</span>
                             <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-medium mt-1">30,000,000 تومان</span>
                         </div>
                         <div className="w-[84px] h-[84px] bg-[#F6F6F6] rounded-lg shrink-0 overflow-hidden relative">
                             <img src="https://placehold.co/84x84" alt="Product" className="w-full h-full object-cover" />
                             {/* Shadow effect from design */}
                             <div className="absolute -bottom-2 -left-2 w-full h-4 bg-black/80 blur-lg opacity-20 rotate-1"></div>
                         </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex gap-4 items-center justify-end w-full">
                         <div className="flex-1 flex flex-col items-end gap-1">
                             <span className="text-[#0C1415] text-sm font-['PeydaFaNum']">میز ناهارخوری</span>
                             <span className="text-[#707F81] text-xs font-['PeydaFaNum']">کارگاه نجاری هنرمندان</span>
                             <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-medium mt-1">45,000,000 تومان</span>
                         </div>
                         <div className="w-[84px] h-[84px] bg-[#F6F6F6] rounded-lg shrink-0 overflow-hidden relative">
                             <img src="https://placehold.co/84x84" alt="Product" className="w-full h-full object-cover" />
                         </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex gap-4 items-center justify-end w-full">
                         <div className="flex-1 flex flex-col items-end gap-1">
                             <span className="text-[#0C1415] text-sm font-['PeydaFaNum']">کیف دستی چرم مدرن 2x</span>
                             <span className="text-[#707F81] text-xs font-['PeydaFaNum']">فروشگاه چرم آرش</span>
                             <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-medium mt-1">9,000,000 تومان</span>
                         </div>
                         <div className="w-[84px] h-[84px] bg-[#F6F6F6] rounded-lg shrink-0 overflow-hidden relative">
                             <img src="https://placehold.co/84x84" alt="Product" className="w-full h-full object-cover" />
                         </div>
                    </div>

                    {/* Item 4 */}
                    <div className="flex gap-4 items-center justify-end w-full">
                         <div className="flex-1 flex flex-col items-end gap-1">
                             <span className="text-[#0C1415] text-sm font-['PeydaFaNum']">میز مطالعه مدرن</span>
                             <span className="text-[#707F81] text-xs font-['PeydaFaNum']">فروشگاه صنایع چوب دهقان</span>
                             <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-medium mt-1">90,000,000 تومان</span>
                         </div>
                         <div className="w-[84px] h-[84px] bg-[#F6F6F6] rounded-lg shrink-0 overflow-hidden relative">
                             <img src="https://placehold.co/84x84" alt="Product" className="w-full h-full object-cover" />
                         </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
             <div className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-[440px] mx-auto p-6 bg-transparent">
                 <div className="w-full bg-white rounded-2xl shadow-[0px_0px_30px_rgba(0,0,0,0.10)] border border-[rgba(0,0,0,0.10)] p-3">
                    <button className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#e5bc09] transition-colors shadow-sm">
                        <span className="text-[#1A1C1E] text-[17px] font-['PeydaWeb'] font-semibold">
                            ادامه به پرداخت
                        </span>
                        <ShoppingBag className="w-5 h-5 text-[#1A1C1E]" />
                    </button>
                 </div>
             </div>

        </div>
    );
}

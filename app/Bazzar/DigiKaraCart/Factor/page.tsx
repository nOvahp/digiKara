"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/app/Bazzar/CartContext";

export default function FactorPage() {
    const router = useRouter();
    const { items, finalPrice, totalPrice, shippingCost, discount } = useCart();

    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center relative print:block print:h-auto print:overflow-visible" dir="rtl">
            
            {/* Header */}
            <div className="w-full max-w-[440px] flex justify-between items-center px-0 py-4 shrink-0 print:w-full print:max-w-none">
                 <div className="flex items-center justify-between w-full relative">
                     <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">رسید خرید</span>
                     <button 
                        onClick={() => router.back()}
                        className="absolute left-0 w-10 h-10 rounded-full border border-[rgba(0,0,0,0.10)] flex items-center justify-center hover:bg-gray-50 transition-colors print:hidden"
                     >
                         <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
                     </button>
                 </div>
            </div>

            {/* Content List */}
            <div className="w-full max-w-[440px] flex flex-col gap-0 px-0 pb-28 flex-1 overflow-y-auto no-scrollbar bg-white print:w-full print:max-w-none print:pb-0 print:overflow-visible print:h-auto">
                
                {/* Order List Header */}
                 <div className="flex justify-between items-center w-full mt-4 mb-4">
                     <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">لیست سفارش</span>
                     <button className="text-[#707F81] text-xs font-['PeydaFaNum'] font-normal hover:text-[#0C1415] transition-colors print:hidden">
                         مشاهده همه
                     </button>
                 </div>

                {/* Items */}
                <div className="flex flex-col gap-4 w-full">
                    {items.map((item, index) => (
                         <React.Fragment key={item.id}>
                            <div className="flex gap-4 items-center justify-start w-full break-inside-avoid">
                                <div className="w-[84px] h-[84px] bg-[#F6F6F6] rounded-lg shrink-0 overflow-hidden relative print:border print:border-gray-200">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover" 
                                    />
                                    {/* Design effect for first item - Hide in print if complex */}
                                    {index === 0 && (
                                         <div className="absolute -bottom-2 -left-2 w-full h-4 bg-black/80 blur-lg opacity-20 rotate-1 print:hidden"></div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col items-start gap-1">
                                    <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] line-clamp-1 text-right">{item.name}</span>
                                    <span className="text-[#707F81] text-xs font-['PeydaFaNum'] text-right">{item.shopName || "فروشگاه"}</span>
                                    <span className="text-[#0C1415] text-sm font-num-medium mt-1 text-right">
                                        {(item.price * item.count).toLocaleString()} ریال
                                    </span>
                                </div>
                            </div>
                            
                            {/* Divider for all items for consistency in list view provided */}
                            {index < items.length - 1 && (
                                <div className="w-full h-px bg-[rgba(0,0,0,0.10)]"></div>
                            )}
                         </React.Fragment>
                    ))}
                    {items.length === 0 && (
                         <div className="w-full text-center text-[#707F81] py-4 text-sm font-['PeydaWeb']">
                             سبد خرید خالی است
                         </div>
                    )}
                </div>
                
                 <div className="w-full h-px bg-[rgba(0,0,0,0.10)] my-6"></div>

                {/* Order Details Grid */}
                <div className="flex flex-col gap-4 w-full break-inside-avoid">
                    
                    <div className="flex justify-between items-center w-full">
                         <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">تاریخ سفارش</span>
                         <span className="text-[#080B11] text-sm font-num-medium">۲۷ شهریور ۱۴۰۴ | ۱۰:۰۰</span>
                    </div>

                    <div className="flex justify-between items-center w-full">
                         <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">نوع تحویل</span>
                         <span className="text-[#080B11] text-sm font-['PeydaFaNum'] font-medium">اقتصادی</span>
                    </div>

                    <div className="w-full h-px bg-[rgba(0,0,0,0.10)] my-2"></div>
                    
                    {/* Cost Breakdown */}
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex justify-between items-center w-full">
                             <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">مبلغ</span>
                             <span className="text-[#080B11] text-sm font-num-medium">{totalPrice.toLocaleString()} ریال</span>
                        </div>
                        <div className="flex justify-between items-center w-full">
                             <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">هزینه ارسال</span>
                             <span className="text-[#080B11] text-sm font-num-medium">{shippingCost.toLocaleString()} ریال</span>
                        </div>
                        <div className="flex justify-between items-center w-full">
                             <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">مالیات</span>
                             <span className="text-[#080B11] text-sm font-num-medium">{(shippingCost * 0.05).toLocaleString()} ریال</span> {/* Mock Tax */}
                        </div>
                         <div className="flex justify-between items-center w-full">
                             <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">تخفیف</span>
                             <span className="text-[#080B11] text-sm font-num-medium">{discount.toLocaleString()} ریال</span>
                        </div>
                    </div>

                    <div className="w-full h-px bg-[rgba(0,0,0,0.10)] my-2"></div>

                    {/* Total */}
                    <div className="flex justify-between items-center w-full">
                         <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">جمع کل</span>
                         <span className="text-[#080B11] text-sm  font-num-medium">{finalPrice.toLocaleString()} ریال</span>
                    </div>

                     <div className="w-full h-px bg-[rgba(0,0,0,0.10)] my-2"></div>

                     {/* Payment Info */}
                     <div className="flex justify-between items-center w-full">
                         <div className="flex items-center gap-3">
                             <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">درگاه بانک سامان</span>
                             <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-[10px] text-blue-600 print:border print:border-blue-200">S</div>
                         </div>
                         <span className="text-[#3C5A5D] text-sm font-num-medium">12345678431  :شناسه پرداخت</span>
                     </div>

                </div>

            </div>

             {/* Bottom Bar - Download Button */}
             <div className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-[440px] mx-auto p-6 bg-transparent print:hidden">
                 <div className="w-full  rounded-2xl  p-3">
                    <button 
                        onClick={handleDownload}
                        className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#e5bc09] transition-colors shadow-sm"
                    >
                        <span className="text-[#1A1C1E] text-[17px] font-['PeydaWeb'] font-semibold">
                            دانلود فاکتور
                        </span>
                    </button>
                 </div>
             </div>

        </div>
    );
}

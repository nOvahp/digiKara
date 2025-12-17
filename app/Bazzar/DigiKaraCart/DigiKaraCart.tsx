"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Trash2, Plus, Minus, Tag, Check, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCart } from "../CartContext";

export default function DigiKaraCart() {
    const router = useRouter();
    const { 
        items, 
        removeItem, 
        incrementItem, 
        decrementItem, 
        totalPrice, 
        finalPrice, 
        shippingCost, 
        discount 
    } = useCart();
    
    const [couponCode, setCouponCode] = useState("");

    const formatPrice = (price: number) => {
        return price.toLocaleString('fa-IR') + " ریال";
    };

    return (
        <div className="w-full min-h-screen  flex flex-col items-center relative" dir="rtl">
            
            {/* Header */}
            <div className="w-full flex justify-between items-center px-0 py-4">
                
                 <div className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">
                     سبد خرید
                 </div>
                 <button 
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full border border-[rgba(0,0,0,0.10)] flex items-center justify-center hover:bg-gray-50"
                 >
                     <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
                 </button>
            </div>

            {/* Cart Items List */}
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center pt-20 gap-4 opacity-50">
                    <ShoppingBag className="w-16 h-16 text-gray-400" />
                    <span className="text-gray-500 font-['PeydaWeb']">سبد خرید خالی است</span>
                </div>
            ) : (
                <div className="w-full flex flex-col items-center gap-0 px-0 pb-[600px] relative z-0">
                    {items.map((item, index) => (
                        <div key={item.id} className="w-full flex flex-col">
                            <div className="w-full max-w-[364px] h-auto flex flex-row justify-between items-center relative py-4">
                                {/* Image - Right side (in this flex-row-reverse context actually Left in UI but user used flex-end) */}
                                {/* Wait, the design shows Image on Right side? No. User code: justifyContent: 'flex-end', flex: '1 1 0' has text content. img is separate. */}
                                {/* In Flex row (default LTR): [Text Content] [Image] if justify-end? No. */}
                                {/* User Design: 
                                    Container: width 364, inline-flex, justify-end, items-center, gap 16.
                                    Children:
                                    1. Div (flex 1 col end): Text content.
                                    2. Img (w 84).
                                    So in LTR: [Text] <gap> [Time] -> Justify End means they stick to right?
                                    Wait, app is `dir="rtl"`.
                                    If RTL:
                                    [Image] [Text] ? 
                                    Let's stick to the visual provided in image.
                                    Image is on Right. Text is on Left (Price), Title aligned Right.
                                    So: [Price/Title] .... [Image]
                                    So essentially: Flex Row.
                                */}
                                
                                {/* Image Container */}
                                <div className="w-[80px] h-[80px] relative bg-[#F6F6F6] rounded-lg shrink-0 overflow-hidden">
                                    {/* Using standard img tag to ensure visibility if Next Image fails */}
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                {/* Content Container */}
                                <div className="flex-1 flex flex-col items-end gap-[5px] pr-4">
                                    <h3 className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-normal text-right w-full truncate">
                                        {item.name}
                                    </h3>
                                    <span className="text-[#707F81] text-xs font-['PeydaFaNum'] font-normal text-right w-full truncate">
                                        {item.shopName}
                                    </span>
                                    
                                    <div className="w-full flex justify-between items-center mt-1">
                                        {/* Counter */}
                                        <div className="w-[70px] h-[27.10px] rounded-lg flex items-center justify-between">
                                            {item.count === 1 ? (
                                                <button 
                                                    onClick={() => removeItem(item.id)}
                                                    className="w-6 h-6 bg-[#F6F6F6] rounded-[6px] flex items-center justify-center text-[#0C1415] hover:bg-gray-200"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => decrementItem(item.id)}
                                                    className="w-6 h-6 bg-[#F6F6F6] rounded-[6px] flex items-center justify-center text-[#0C1415] hover:bg-gray-200"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                            
                                            <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-normal leading-5 tracking-wide">
                                                {item.count}
                                            </span>
                                            
                                            <button 
                                                onClick={() => incrementItem(item.id)}
                                                className="w-6 h-6 bg-[#FDD00A] rounded-[6px] flex items-center justify-center text-[#0C1415] hover:bg-[#e5bc09]"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        
                                        <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-medium">
                                            {formatPrice(item.price)}
                                        </span>
                                    </div>
                                </div>

                                {/* Shadow Element from design */}
                                <div className="absolute w-[35.11px] h-[2.51px] left-[304px] top-[66px] rotate-1 bg-[rgba(14,14,14,0.80)] blur-[11px] opacity-0" />
                            </div>
                            {/* Divider */}
                            {index < items.length - 1 && (
                                <div className="w-full h-px bg-[rgba(0,0,0,0.10)]"></div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Bottom Sheet / Summary */}
             <div className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-[440px] mx-auto">
                 {/* Shadow/Handle Container */}
                <div className="w-full bg-white rounded-t-2xl shadow-[0px_-4px_20px_rgba(0,0,0,0.05)] border-t border-[rgba(0,0,0,0.10)] p-6 pb-4 flex flex-col gap-6">
                    
                    {/* Coupon Input */}
                    <div className="w-full bg-[#F6F6F6] rounded-lg p-0 flex items-center justify-between px-1.5">
                        <button className="bg-[#FDD00A] text-[#1A1C1E] text-base font-['PeydaWeb'] font-semibold py-2 px-4 rounded-lg hover:bg-[#e5bc09] transition-colors">
                            اعمال
                        </button>
                        <input 
                            type="text" 
                            placeholder="کد تخفیف" 
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="bg-transparent text-right text-[#707F81] text-sm font-['PeydaWeb'] font-light outline-none placeholder:text-[#707F81]"
                        />
                    </div>

                    {/* Price Breakdown */}
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex justify-between items-center w-full">
                            <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-semibold">{formatPrice(totalPrice)}</span>
                            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">جمع کل</span>
                        </div>
                        <div className="flex justify-between items-center w-full">
                             <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-semibold">{formatPrice(shippingCost)}</span>
                             <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">هزینه ارسال</span>
                        </div>
                        <div className="flex justify-between items-center w-full">
                             <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-semibold">{formatPrice(discount)}</span>
                             <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">تخفیف</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-[rgba(0,0,0,0.10)]"></div>

                    {/* Final Price */}
                     <div className="flex justify-between items-center w-full">
                        <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-semibold">{formatPrice(finalPrice)}</span>
                        <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">هزینه نهایی</span>
                    </div>

                    {/* Submit Button */}
                    <button className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-colors">
                        <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold">
                            تکمیل فرایند خرید
                        </span>
                        <ShoppingBag className="w-5 h-5 text-[#1A1C1E]" />
                    </button>
                </div>
             </div>

        </div>
    );
}

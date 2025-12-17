"use client";

import React, { useRef, useEffect } from "react";
import { X, ChevronLeft } from "lucide-react";
import { Product } from "./product";

interface ProductPopUpProps {
    onClose: () => void;
    product: Product;
}

const ProductPopUp = ({ onClose, product }: ProductPopUpProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
             document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" dir="rtl">
            <div 
                ref={modalRef}
                className="w-full max-w-[440px] h-auto max-h-[90vh] bg-white rounded-xl outline outline-1 outline-[#DFE1E7] overflow-y-auto flex flex-col justify-start items-start gap-5 p-5 relative shadow-lg animate-in fade-in zoom-in duration-200"
            >
                {/* Close Button */}
                 <button 
                    onClick={onClose}
                    className="absolute top-4 left-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Title */}
                <div className="self-stretch text-right mt-2">
                    <span className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
                        {product.productName} | 
                    </span>
                    <span className="text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] leading-relaxed tracking-wide mx-1">
                        {parseInt(product.weight.replace(/\D/g,'')) || 500}
                    </span>
                    <span className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
                         گرم
                    </span>
                </div>

                <div className="self-stretch flex-col justify-start items-end gap-4 flex w-full">
                    
                    {/* Image Section */}
                    <div className="self-stretch flex-col justify-start items-start gap-3 flex w-full">
                        <img 
                            className="self-stretch h-[118px] w-full object-cover rounded-xl border border-[#DFE1E7] p-2.5" 
                            src={product.image} 
                            alt={product.productName}
                        />
                    </div>

                    {/* Details List */}
                    <div className="self-stretch flex-col justify-start items-start gap-2 flex w-full">
                        
                        {/* Count */}
                        <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
<div className="flex justify-end items-center gap-2 w-[70px]">
                                <div className="flex-1 text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight tracking-wide">
                                    تعداد
                                </div>
                            </div>
                            <div className="flex-1 text-[#818898] text-base font-medium leading-relaxed tracking-wide text-left">
                                {product.count} عدد
                            </div>
                            
                        </div>

                        {/* Delivery Time */}
                        <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
                            <div className="flex justify-end items-center gap-2 w-[79px]">
                                <div className="flex-1 text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight tracking-wide">
                                    موعد تحویل
                                </div>
                            </div>
                            <div className="flex-1 text-[#818898] text-base  font-medium leading-relaxed tracking-wide text-left">
                                {product.deliveryTime}
                            </div>
                            
                        </div>

                        {/* Income */}
                        <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
                            <div className="flex justify-end items-center gap-2 w-[120px]">
                                <div className="w-full text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight tracking-wide">
                                    درآمد شما از فروش
                                </div>
                            </div>
                            <div className="flex-1 text-[#818898] text-base font-num-medium  leading-relaxed tracking-wide text-left">
                                {product.price}
                            </div>
                            
                        </div>

                        {/* Status */}
                        <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center">
                            <div className="flex justify-end items-center gap-2 w-[79px]">
                                <div className="w-full text-right text-[#666D80] text-sm font-bold  leading-tight tracking-wide">
                                    وضعیت
                                </div>
                            </div>
                            <div className={`h-5 px-2 py-0.5 rounded-2xl flex justify-start items-center ${
                                 product.statusLabel.includes("ارسال شده") || product.statusLabel.includes("تحویل") 
                                 ? "bg-[#ECF9F7]" 
                                 : "bg-[#FCE8EC]"
                            }`}>
                                <div className={`text-center text-xs font-normal font-['PeydaFaNum'] leading-[18px] tracking-wide ${
                                    product.statusLabel.includes("ارسال شده") || product.statusLabel.includes("تحویل") 
                                    ? "text-[#267666]" 
                                    : "text-[#B21634]"
                                }`}>
                                    {product.statusLabel}
                                </div>
                            </div>
                            
                        </div>

                         {/* Team */}
                         <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center">
                            <div className="flex justify-end items-center gap-2 w-[79px]">
                                <div className="w-full text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight tracking-wide">
                                    تیم تولید
                                </div>
                            </div>
                             <div className="flex-1 text-[#818898] text-base font-medium  leading-relaxed tracking-wide text-left truncate">
                                {product.team}
                             </div>
                             
                        </div>

                    </div>

                    {/* Description */}
                    <div className="self-stretch flex-col justify-start items-start gap-2 flex w-full h-[100px]">
                        <div className="self-stretch flex justify-start items-center">
                            <div className="flex-1 text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight tracking-wide">
                                توضیحات
                            </div>
                        </div>
                        <div className="self-stretch flex-1 px-3 py-2.5 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] overflow-hidden flex flex-col justify-start items-start">
                            <div className="self-stretch flex-1 text-right text-[#0D0D12] text-base font-light font-['PeydaWeb'] leading-relaxed tracking-wide">
                                {product.description}
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="self-stretch flex justify-center items-center gap-4 w-full mt-2">
                        <div className="flex-1 h-12 px-6 py-3 bg-[#0A33FF] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer hover:bg-blue-700 transition-colors">
                            <div className="text-center text-[#D7D8DA] text-base font-extrabold font-['PeydaFaNum'] leading-snug">
                                تغییر وضعیت سفارش
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductPopUp;

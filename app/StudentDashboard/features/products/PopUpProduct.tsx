"use client"

import React from "react"
import { Order } from "@/app/services/studentService"
import { cn } from "@/lib/utils"

interface PopUpProductProps {
  order: Order
  onClose: () => void
}

export function PopUpProduct({ order, onClose }: PopUpProductProps) {
  // Prevent click propagation to parent (which might close the modal)
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div 
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
    >
        <div 
            className="w-full max-w-[440px] h-auto max-h-[90vh] bg-white rounded-xl outline outline-1 outline-[#DFE1E7] overflow-y-auto flex flex-col justify-start items-start gap-5 p-5 relative shadow-lg"
            onClick={handleContentClick}
        >
            {/* Close Button (Optional but UX friendly) */}
             <button 
                onClick={onClose}
                className="absolute top-4 left-4 p-1 rounded-full hover:bg-gray-100"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>


            {/* Title */}
            <div className="self-stretch text-right mt-2">
                <span className="text-[#0D0D12] text-base font-semibold leading-relaxed tracking-wide">
                    {order.productName} | 
                </span>
                <span className="text-[#0D0D12] text-base  font-num-medium leading-relaxed tracking-wide mx-1">
                    {order.weight?.replace(/[^0-9]/g, '')}
                </span>
                <span className="text-[#0D0D12] text-base font-semibold leading-relaxed tracking-wide">
                     {order.weight?.replace(/[0-9]/g, '')}
                </span>
            </div>

            <div className="self-stretch flex-col justify-start items-end gap-4 flex w-full">
                
                {/* Image Section */}
                <div className="self-stretch flex-col justify-start items-start gap-3 flex w-full">
                    <img 
                        className="self-stretch h-[118px] w-full object-cover rounded-xl border border-[#DFE1E7] p-2.5" 
                        src="/Product.png" 
                        alt={order.productName}
                    />
                </div>

                {/* Details List */}
                <div className="self-stretch flex-col justify-start items-start gap-2 flex w-full">
                    
                    {/* Count */}
                    <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
                        <div className="flex-1 text-[#818898] text-base font-num-medium leading-relaxed tracking-wide text-left" dir="rtl">
                            {order.count} عدد
                        </div>
                        <div className="flex justify-end items-center gap-2 w-[70px]">
                            <div className="flex-1 text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                                تعداد
                            </div>
                        </div>
                    </div>

                    {/* Delivery Time */}
                    <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
                        <div className="flex-1 text-[#818898] text-base font-num-medium leading-relaxed tracking-wide text-left" dir="rtl">
                            {order.deliveryTime}
                        </div>
                        <div className="flex justify-end items-center gap-2 w-[79px]">
                            <div className="flex-1 text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                                موعد تحویل
                            </div>
                        </div>
                    </div>

                    {/* Income */}
                    <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
                        <div className="flex-1 text-[#818898] text-base font-num-medium leading-relaxed tracking-wide text-left" dir="rtl">
                            {order.amount}
                        </div>
                        <div className="flex justify-end items-center gap-2 w-[120px]">
                            <div className="w-full text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                                درآمد شما از فروش
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center">
                        <div className={`h-5 px-2 py-0.5 rounded-2xl flex justify-start items-center ${
                             order.statusText.includes("ارسال شده") || order.statusText.includes("تحویل") 
                             ? "bg-[#ECF9F7]" 
                             : "bg-[#FCE8EC]"
                        }`}>
                            <div className={`text-center text-xs font-num-medium leading-[18px] tracking-wide ${
                                order.statusText.includes("ارسال شده") || order.statusText.includes("تحویل") 
                                ? "text-[#267666]" 
                                : "text-[#B21634]"
                            }`}>
                                {order.statusText}
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-2 w-[79px]">
                            <div className="w-full text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                                وضعیت
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="self-stretch flex-col justify-start items-start gap-2 flex w-full h-[180px]">
                    <div className="self-stretch flex justify-start items-center">
                        <div className="flex-1 text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                            توضیحات
                        </div>
                    </div>
                    <div className="self-stretch flex-1 px-3 py-2.5 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] overflow-hidden flex flex-col justify-start items-start">
                        <div className="self-stretch flex-1 text-right text-[#0D0D12] text-base font-light leading-relaxed tracking-wide">
                            {order.description || order.note || "-"}
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="self-stretch flex justify-center items-center gap-4 w-full mt-2">
                    <div className="flex-1 h-12 px-6 py-3 bg-[#0A33FF] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer hover:bg-blue-700 transition-colors">
                        <div className="text-center text-[#D7D8DA] text-base font-num-medium leading-snug">
                            تغییر وضعیت سفارش
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default PopUpProduct;

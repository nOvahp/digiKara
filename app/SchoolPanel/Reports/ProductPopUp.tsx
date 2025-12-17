import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";

interface ProductPopUpProps {
    onClose: () => void;
    // We can add more props for dynamic data later
}

const ProductPopUp = ({ onClose }: ProductPopUpProps) => {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" dir="rtl">
             <div ref={modalRef} className="w-[380px] p-5 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-5 animate-in fade-in zoom-in duration-200 shadow-xl">
                
                {/* Header */}
                <div className="w-full text-right flex justify-between items-center bg-white">
                    <div className="flex items-center gap-1">
                        <span className="text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold leading-24 tracking-wide break-word">عسل آویشن ارگانیک | </span>
                        <span className="text-[#0D0D12] text-16 font-['PeydaFaNum'] font-semibold leading-24 tracking-wide break-word">۵۰۰</span>
                        <span className="text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold leading-24 tracking-wide break-word"> گرم </span>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full flex flex-col justify-start items-end gap-4">
                    
                    {/* Image */}
                    <div className="w-full flex flex-col justify-start items-start gap-3">
                         <img className="w-full h-[118px] px-3 py-2.5 rounded-xl border border-[#DFE1E7] object-cover" src="/Product.png" alt="Product" /> 
                    </div>

                    {/* Details List */}
                    <div className="w-full flex flex-col justify-start items-start gap-2">
                        
                        {/* Row 1: Quantity */}
                        <div className="w-full h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex justify-start items-center gap-2">
                            <div className="flex-1 text-[#818898] text-16 font-['PeydaFaNum'] font-normal leading-24 tracking-wide break-word text-right">۱ عدد</div>
                            <div className="w-[38px] flex justify-end items-center gap-2">
                                <div className="flex-1 text-right text-[#666D80] text-14 font-['PeydaWeb'] font-semibold leading-21 tracking-wide break-word">تعداد</div>
                            </div>
                        </div>

                         {/* Row 2: Delivery */}
                         <div className="w-full h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex justify-start items-center gap-2">
                            <div className="flex-1 text-[#818898] text-16 font-['PeydaFaNum'] font-normal leading-24 tracking-wide break-word text-right">۱ روز تا تحویل</div>
                            <div className="w-[79px] flex justify-end items-center gap-2">
                                <div className="flex-1 text-right text-[#666D80] text-14 font-['PeydaWeb'] font-semibold leading-21 tracking-wide break-word">موعد تحویل</div>
                            </div>
                        </div>

                        {/* Row 3: Income */}
                        <div className="w-full h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex justify-start items-center gap-2">
                            <div className="flex-1 text-[#818898] text-16 font-['PeydaFaNum'] font-normal leading-24 tracking-wide break-word text-right">۴,۵۰۰,۰۰۰ ریال</div>
                            <div className="w-[79px] flex justify-end items-center gap-2">
                                <div className="w-[113.47px] text-right text-[#666D80] text-14 font-['PeydaWeb'] font-semibold leading-21 tracking-wide break-word">درآمد شما از فروش</div>
                            </div>
                        </div>

                        {/* Row 4: Status */}
                        <div className="w-full h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex justify-between items-center">
                            <div className="h-5 px-2 py-0.5 bg-[#FCE8EC] rounded-2xl flex justify-start items-center">
                                <div className="text-center text-[#B21634] text-12 font-['PeydaFaNum'] font-normal leading-18 tracking-wide break-word">ارسال نشده</div>
                            </div>
                            <div className="w-[79px] flex justify-end items-center gap-2">
                                <div className="w-[113.47px] text-right text-[#666D80] text-14 font-['PeydaWeb'] font-semibold leading-21 tracking-wide break-word">وضعیت</div>
                            </div>
                        </div>

                         {/* Row 5: Team */}
                         <div className="w-full h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex justify-between items-center">
                             <div className="flex-1 flex justify-between items-center">
                                <div className="flex-1 text-[#818898] text-16 font-['PeydaFaNum'] font-normal leading-24 tracking-wide break-word text-right">آرش یوسفی, محمد کریمی</div>
                                <div className="w-[113.47px] text-right text-[#666D80] text-14 font-['PeydaWeb'] font-semibold leading-21 tracking-wide break-word">تیم تولید</div>
                             </div>
                        </div>

                    </div>

                    {/* Description */}
                    <div className="w-full h-[180px] flex flex-col justify-start items-start gap-2">
                        <div className="w-full flex justify-start items-center">
                            <div className="flex-1 text-right text-[#666D80] text-14 font-['PeydaWeb'] font-semibold leading-21 tracking-wide break-word">توضیحات</div>
                        </div>
                        <div className="w-full flex-1 px-3 py-2.5 bg-white overflow-hidden rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start">
                             <div className="w-full flex-1 text-right text-[#0D0D12] text-16 font-['PeydaWeb'] font-light leading-24 tracking-wide break-word">-</div>
                             <div className="w-full flex justify-end items-end"></div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="w-full flex justify-center items-center gap-4">
                        <div className="flex-1 h-12 px-6 py-[13px] bg-[#0A33FF] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer hover:bg-blue-700 transition-colors">
                            <div className="text-center text-[#D7D8DA] text-16 font-['PeydaFaNum'] font-extrabold leading-[22.40px] break-word">تغییر وضعیت سفارش</div>
                        </div>
                    </div>

                </div>
             </div>
        </div>
    );
};

export default ProductPopUp;

import React from 'react';
import { X } from 'lucide-react';

interface NewProductPage3Props {
    onClose: () => void;
    onNext: () => void;
}

export function NewProductPage3({ onClose, onNext }: NewProductPage3Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0D0D12] opacity-40 backdrop-blur-[1px]" 
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-[375px] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
                    <div className="w-10 h-10 relative overflow-hidden rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50" onClick={onClose}>
                        <div className="absolute w-6 h-6 overflow-hidden flex items-center justify-center">
                             <X className="w-5 h-5 text-[#0D0D12]" />
                        </div>
                    </div>
                    <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
                        افزودن محصول جدید
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto w-full">
                    {/* Progress Steps */}
                    <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex items-center gap-4 overflow-x-auto" dir="rtl">
                         <StepItem number="1" label="اطلاعات پایه" state="completed" />
                         <StepItem number="2" label="قیمت گذاری" state="active" />
                         <StepItem number="3" label="موجودی" state="inactive" />
                         <StepItem number="4" label="دسته بندی و برچسب ها" state="inactive" />
                         <StepItem number="5" label="تائید نهایی" state="inactive" />
                    </div>

                    {/* Form Fields */}
                    <div className="w-full px-5 py-5 flex flex-col gap-4" dir="rtl">
                        
                        {/* Pricing Type Toggle */}
                        <div className="w-full h-9 p-0.5 bg-[#F6F6F6] rounded-lg border border-[#D7D8DA] flex items-center">
                             <div className="flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer text-[#0A0A0A] text-sm font-semibold font-['PeydaWeb'] opacity-50">
                                 دارای چند قیمت
                             </div>
                             <div className="flex-1 h-[29px] px-3 py-1 bg-[#FFDD8A] shadow-sm rounded-md border border-[#D7D8DA] flex justify-center items-center gap-2.5 cursor-pointer text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">
                                 تک قیمتی
                             </div>
                        </div>

                        {/* Product Price */}
                        <div className="w-full flex flex-col gap-2">
                             <Label text="قیمت کالا" />
                             <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex items-center gap-2">
                                 <input 
                                     type="text" 
                                     defaultValue="2.300.000"
                                     className="flex-1 h-full bg-transparent border-none outline-none text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] text-right tracking-wider placeholder:text-gray-400" 
                                     dir="rtl"
                                 />
                                 <div className="w-px h-6 bg-[#DFE1E7]"></div>
                                 <div className="w-11 text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] h-full flex items-center justify-center">
                                     ریال
                                 </div>
                             </div>
                        </div>

                        {/* Service Fee Info */}
                        <div className="w-full flex flex-col gap-2.5">
                             <div className="w-full flex justify-between items-center px-1">
                                 <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">هزینه خدمات</div>
                                  <div className="text-right">
                                     <span className="text-[#666D80] text-sm font-semibold font-['PeydaFaNum']">230.000 </span>
                                     <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">ریال</span>
                                 </div>
                             </div>
                             <div className="w-full flex justify-between items-center px-1">
                                 <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">شما دریافت خواهید کرد</div>
                                 <div className="text-right">
                                     <span className="text-[#666D80] text-sm font-semibold font-['PeydaFaNum']">2.070.000 </span>
                                     <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">ریال</span>
                                 </div>
                             </div>
                             
                             <div className="w-full flex justify-center items-center gap-1 mt-2">
                                 <span className="text-[#666D80] text-sm font-light font-['Peyda']">برای مشاهده جزئیات</span>
                                 <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] underline cursor-pointer">اینجا کلیک کنید</span>
                             </div>
                        </div>

                        {/* Discount */}
                        <div className="w-full flex flex-col gap-2">
                             <Label text="تخفیف کالا" />
                             <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex items-center gap-2">
                                 <input 
                                     type="text" 
                                     defaultValue="0"
                                     className="flex-1 h-full bg-transparent border-none outline-none text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] text-right tracking-wider" 
                                     dir="rtl"
                                 />
                                 <div className="w-px h-6 bg-[#DFE1E7]"></div>
                                 <div className="w-11 text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] h-full flex items-center justify-center">
                                     درصد
                                 </div>
                             </div>
                        </div>

                        {/* Discount Code */}
                        <div className="w-full flex flex-col gap-2">
                             <Label text="ایجاد کد تخفیف" />
                             <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex items-center gap-2">
                                 <input 
                                     type="text" 
                                     defaultValue="NK-PEG40-GRY-001"
                                     className="flex-1 h-full bg-transparent border-none outline-none text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] text-right tracking-wider" 
                                     dir="rtl"
                                 />
                                 <div className="w-px h-6 bg-[#DFE1E7]"></div>
                                 <div className="w-11 text-center text-[#666D80] text-base font-semibold font-['PeydaFaNum'] h-full flex items-center justify-center">
                                     20%
                                 </div>
                             </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="w-full px-5 py-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10 mt-auto">
                     <button 
                        onClick={onNext}
                        className="flex-1 h-10 px-4 py-2 bg-gradient-to-t from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.15)] bg-[#0A33FF] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#0A33FF] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
                     >
                         <span className="text-center text-white text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">ادامه</span>
                     </button>
                </div>

            </div>
        </div>
    );
}

// Helpers

function StepItem({ number, label, state }: { number: string, label: string, state: 'active' | 'completed' | 'inactive' }) {
    let circleClass = 'bg-[#DFE1E7] text-white';
    let textClass = 'text-[#818898] font-semibold';

    if (state === 'active') {
        circleClass = 'bg-[#FFD369] text-[#393E46]'; // Yellow active
        textClass = 'text-[#0D0D12] font-semibold'; // Black text
    } else if (state === 'completed') {
        circleClass = 'bg-[#DFE1E7] text-white'; // Completed style from code provided (actually same as inactive in code snippet but label is Grey #C1C7D0)
        textClass = 'text-[#C1C7D0] font-semibold'; 
    }

    return (
        <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-['PeydaFaNum'] leading-[21px] tracking-wide ${circleClass}`}>
                {number}
            </div>
            <span className={`text-sm font-['PeydaWeb'] leading-[21px] tracking-wide whitespace-nowrap ${textClass}`}>
                {label}
            </span>
        </div>
    );
}

function Label({ text }: { text: string }) {
    return (
        <div className="w-full text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
            {text}
        </div>
    );
}

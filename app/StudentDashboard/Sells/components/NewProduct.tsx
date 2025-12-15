import React from 'react';
import { X } from 'lucide-react';

interface NewProductProps {
    onClose: () => void;
    onNext: () => void;
}

export function NewProduct({ onClose, onNext }: NewProductProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0D0D12] opacity-40 backdrop-blur-[1px]" 
                onClick={onClose}
            />

            {/* Modal Content - Dimensions from design: 375px width, 837px height (capped at view height) */}
            <div className="relative w-[375px] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
                    <div className="w-10 h-10 relative overflow-hidden rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50" onClick={onClose}>
                        <X className="w-5 h-5 text-[#0D0D12]" />
                    </div>
                    <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
                        افزودن محصول جدید
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto w-full">
                    {/* Progress Steps */}
                    <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex items-center gap-4 overflow-x-auto" dir="rtl">
                        <StepItem number="1" label="اطلاعات پایه" isActive={true} />
                        <StepItem number="2" label="قیمت گذاری" isActive={false} />
                        <StepItem number="3" label="موجودی" isActive={false} />
                        <StepItem number="4" label="دسته بندی و برچسب ها" isActive={false} />
                        <StepItem number="5" label="تائید نهایی" isActive={false} />
                    </div>

                    {/* Form Fields */}
                    <div className="w-full px-5 py-5 flex flex-col gap-4">
                        
                        {/* Product Name */}
                        <div className="w-full flex flex-col gap-2">
                            <Label text="نام محصول" />
                            <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex items-center">
                                <input 
                                    type="text" 
                                    className="w-full h-full bg-transparent border-none outline-none text-[#0D0D12] text-right font-['PeydaWeb'] placeholder-[#A4ACB9]" 
                                    dir="rtl"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="w-full h-[180px] flex flex-col gap-2">
                             <Label text="توضیحات" />
                             <div className="w-full flex-1 bg-white rounded-xl border border-[#DFE1E7] px-3 py-2.5 flex flex-col justify-between">
                                 <textarea 
                                    className="w-full flex-1 bg-transparent border-none outline-none resize-none text-[#0D0D12] text-sm font-['PeydaWeb'] text-right placeholder-[#A4ACB9]" 
                                    dir="rtl"
                                 />
                                 <div className="w-full text-left text-[#A4ACB9] text-xs font-light font-['PeydaFaNum'] leading-[18px] tracking-wide">
                                     0/200
                                 </div>
                             </div>
                        </div>

                        {/* Product Images - Drag & Drop */}
                        <div className="w-full h-[180px] flex flex-col gap-2">
                            <Label text="تصاویر محصول" />
                            <div className="w-full flex-1 bg-[#FFDC85]/20 rounded-xl border border-[#FFD369] px-3 flex justify-center items-center cursor-pointer border-dashed">
                                <span className="text-center">
                                    <span className="text-[#666D80] text-base font-light font-['PeydaWeb'] leading-normal tracking-wide">فایل های خود را بکشید و رها کنید یا </span>
                                    <span className="text-[#666D80] text-base font-semibold font-['PeydaWeb'] leading-normal tracking-wide">کلیک کنید</span>
                                </span>
                            </div>
                        </div>

                         {/* Category */}
                         <div className="w-full flex flex-col gap-2">
                            <Label text="دسته بندی" />
                            <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex justify-between items-center relative">
                                <select 
                                    className="w-full h-full appearance-none bg-transparent border-none outline-none text-[#0D0D12] text-base font-light font-['PeydaWeb'] leading-normal cursor-pointer text-right dir-rtl pr-2 z-10" 
                                    dir="rtl"
                                    defaultValue=""
                                >
                                    <option value="" disabled>انتخاب کنید</option>
                                    <option value="1">دسته بندی ۱</option>
                                    <option value="2">دسته بندی ۲</option>
                                </select>
                                <div className="absolute left-3 w-5 h-5 pointer-events-none">
                                    <div className="absolute left-[5px] top-[7.5px] w-[10px] h-[5px] border-[1.67px] border-[#818898] rounded-[0.83px] border-t-0 border-l-0 rotate-45 transform origin-center" style={{ transform: 'rotate(45deg)' }} /> 
                                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                                        <path d="M5 7.5 L10 12.5 L15 7.5" stroke="#818898" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                     </svg>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="w-full flex flex-col gap-2">
                            <Label text="برچسب ها" />
                            <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex justify-between items-center relative">
                                <select 
                                    className="w-full h-full appearance-none bg-transparent border-none outline-none text-[#0D0D12] text-base font-light font-['PeydaWeb'] leading-normal cursor-pointer text-right dir-rtl pr-2 z-10" 
                                    dir="rtl"
                                    defaultValue=""
                                >
                                    <option value="" disabled>انتخاب کنید</option>
                                    <option value="tag1">برچسب ۱</option>
                                    <option value="tag2">برچسب ۲</option>
                                </select>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 pointer-events-none">
                                    <path d="M5 7.5 L10 12.5 L15 7.5" stroke="#818898" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>

                         {/* Product ID */}
                         <div className="w-full flex flex-col gap-2">
                             <Label text="شناسه محصول" />
                             <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex items-center">
                                 <div className="flex-1 text-left text-[#818898] text-base font-normal font-['Geist'] leading-normal tracking-wide" dir="ltr">
                                     NK-PEG40-GRY-001
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full px-5 py-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10 mt-auto">
                     <button 
                        onClick={onNext}
                        className="flex-1 h-10 px-4 py-2 bg-gradient-to-t from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.15)] bg-[#FFDA7F] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#FFDA7F] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
                     >
                         <span className="text-center text-[#393E46] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">ادامه</span>
                     </button>
                </div>

            </div>
        </div>
    );
}

// Helper Components

function StepItem({ number, label, isActive }: { number: string, label: string, isActive: boolean }) {
    return (
        <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold font-['PeydaFaNum'] leading-[21px] tracking-wide ${isActive ? 'bg-[#FFD369] text-[#393E46]' : 'bg-[#DFE1E7]'}`}>
                {number}
            </div>
            <span className={`text-sm font-['PeydaWeb'] leading-[21px] tracking-wide whitespace-nowrap ${isActive ? "text-[#0D0D12] font-bold" : "text-[#818898] font-semibold"}`}>
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

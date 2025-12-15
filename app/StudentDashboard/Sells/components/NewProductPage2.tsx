import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';

interface NewProductPage2Props {
    onClose: () => void;
    onNext: () => void;
}

export function NewProductPage2({ onClose, onNext }: NewProductPage2Props) {
    const [activeImage, setActiveImage] = useState(1);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll Handler to update active badge
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = Math.abs(scrollContainerRef.current.scrollLeft);
            const width = scrollContainerRef.current.offsetWidth;
            const calculatedIndex = Math.round(scrollLeft / width) + 1;
            
            if (calculatedIndex !== activeImage && calculatedIndex >= 1 && calculatedIndex <= 4) {
                 setActiveImage(calculatedIndex);
            }
        }
    };

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
                         <StepItem number="1" label="اطلاعات پایه" isActive={true} />
                         <StepItem number="2" label="قیمت گذاری" isActive={false} />
                         <StepItem number="3" label="موجودی" isActive={false} />
                         <StepItem number="4" label="دسته بندی و برچسب ها" isActive={false} />
                         <StepItem number="5" label="تائید نهایی" isActive={false} />
                    </div>

                    {/* Form Fields - Filled State */}
                    <div className="w-full px-5 py-5 flex flex-col gap-4">
                        
                        {/* Product Name - Filled */}
                        <div className="w-full flex flex-col gap-2">
                             <Label text="نام محصول" />
                             <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex items-center">
                                 <input 
                                     type="text" 
                                     defaultValue="عسل چهل گیاه ارگانیک"
                                     className="w-full h-full bg-transparent border-none outline-none text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] text-right" 
                                     dir="rtl"
                                 />
                             </div>
                        </div>

                        {/* Description - Filled */}
                        <div className="w-full h-[180px] flex flex-col gap-2">
                             <Label text="توضیحات" />
                             <div className="w-full flex-1 bg-white rounded-xl border border-[#DFE1E7] px-3 py-2.5 flex flex-col justify-between overflow-hidden">
                                  <textarea 
                                     defaultValue="این عسل ترکیبی از شهد گیاهان مختلف است که در ارتفاعات دالاهو یافت می شود. طعم و عطر بی نظیر، خواص دارویی فراوان و بسته بندی نفیس، این محصول را به انتخابی ایده آل برای مصرف روزانه و هدیه دادن تبدیل کرده است."
                                     className="w-full flex-1 bg-transparent border-none outline-none resize-none text-[#0D0D12] text-base font-light font-['PeydaWeb'] leading-relaxed text-right" 
                                     dir="rtl"
                                  />
                                  <div className="w-full text-left text-[#A4ACB9] text-xs font-light font-['PeydaFaNum'] leading-[18px] tracking-wide">
                                     0/200
                                  </div>
                             </div>
                        </div>

                        {/* Product Images - Scrollable Carousel */}
                        <div className="w-full h-[180px] flex flex-col gap-2">
                            <Label text="تصاویر محصول" />
                            <div className="w-full flex-1 bg-white rounded-xl border border-[#DFE1E7] relative overflow-hidden">
                                
                                {/* Carousel Images */}
                                <div 
                                    ref={scrollContainerRef}
                                    className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                                    onScroll={handleScroll}
                                    dir="ltr"
                                >
                                    {[1, 2, 3, 4].map((i) => (
                                        <div 
                                            key={i} 
                                            id={`img-${i}`}
                                            className="w-full h-full flex-shrink-0 bg-center bg-cover bg-no-repeat snap-center"
                                            style={{ backgroundImage: "url('/Product.png')" }}
                                        />
                                    ))}
                                </div>

                                {/* Overlay Badges */}
                                <div className="absolute flex gap-2 z-10 bottom-3 right-3">
                                    <div className="flex gap-2 items-center flex-row-reverse">
                                        {[1, 2, 3, 4].map((num) => (
                                            <div 
                                                key={num} 
                                                onClick={() => {
                                                    const el = document.getElementById(`img-${num}`);
                                                    el?.scrollIntoView({ behavior: 'smooth' });
                                                    setActiveImage(num);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <ImageBadge number={num.toString()} isDark={activeImage !== num} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                         {/* Category - Filled */}
                         <div className="w-full flex flex-col gap-2">
                             <Label text="دسته بندی" />
                             <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex justify-between items-center relative">
                                 <select 
                                     className="w-full h-full appearance-none bg-transparent border-none outline-none text-[#0D0D12] text-base font-light font-['PeydaWeb'] leading-normal cursor-pointer text-right dir-rtl pr-2 z-10" 
                                     dir="rtl"
                                     defaultValue="agricultural"
                                 >
                                     <option value="agricultural">محصولات کشاورزی</option>
                                     <option value="other">سایر</option>
                                 </select>
                                 <div className="absolute left-3 w-5 h-5 pointer-events-none">
                                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                                         <path d="M5 7.5 L10 12.5 L15 7.5" stroke="#818898" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                 </div>
                             </div>
                         </div>

                        {/* Tags - Filled */}
                        <div className="w-full flex flex-col gap-2">
                             <Label text="برچسب ها" />
                             <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex justify-between items-center overflow-hidden">
                                  {/* Custom Tag Display */}
                                  <div className="flex gap-1.5 items-center flex-1 overflow-x-auto no-scrollbar">
                                      <div className="flex items-center gap-1 bg-white border border-[#DFE1E7] rounded px-2 py-0.5 whitespace-nowrap">
                                          <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">ارگانیک</span>
                                          <X className="w-3 h-3 text-[#818898] cursor-pointer" />
                                      </div>
                                      <div className="flex items-center gap-1 bg-white border border-[#DFE1E7] rounded px-2 py-0.5 whitespace-nowrap">
                                          <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">عسل طبیعی</span>
                                          <X className="w-3 h-3 text-[#818898] cursor-pointer" />
                                      </div>
                                  </div>
                                  
                                  <div className="w-5 h-5 flex-shrink-0 ml-1">
                                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M5 7.5 L10 12.5 L15 7.5" stroke="#818898" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                  </div>
                             </div>
                        </div>

                         {/* Product ID - Filled */}
                         <div className="w-full flex flex-col gap-2">
                             <Label text="شناسه محصول" />
                             <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex items-center">
                                 <div className="flex-1 text-left text-[#0D0D12] text-base font-normal font-['Geist'] leading-normal tracking-wide" dir="ltr">
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

// Helpers

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

function ImageBadge({ number, isDark }: { number: string, isDark: boolean }) {
    return (
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-['PeydaFaNum'] ${isDark ? 'bg-[#0D0D12]/45 text-white' : 'bg-[#FFD369] text-[#0D0D12]'}`}>
            {number}
        </div>
    );
}

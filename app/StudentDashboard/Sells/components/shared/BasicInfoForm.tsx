import React, { useState, useRef } from 'react';
import { FormLabel } from './FormLabel';

interface BasicInfoFormProps {
    defaultValues?: any;
    values?: { name: string; description: string; id: string; images?: string[] };
    onChange?: (updates: Partial<{ name: string; description: string; id: string; images?: string[] }>) => void;
}

export function BasicInfoForm({ defaultValues = {}, values, onChange }: BasicInfoFormProps) {
    const [activeImage, setActiveImage] = useState(1);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = Math.abs(scrollContainerRef.current.scrollLeft);
            const width = scrollContainerRef.current.offsetWidth;
            const calculatedIndex = Math.round(scrollLeft / width) + 1;
            
            if (calculatedIndex !== activeImage) {
                 setActiveImage(calculatedIndex);
            }
        }
    };

    const val = (field: string) => values ? ((values as any)[field] || "") : (defaultValues[field] || "");
    const productImages = values?.images && values.images.length > 0 ? values.images : ["/Product.png", "/Product.png", "/Product.png", "/Product.png"];

    const handleChange = (field: string, value: string) => {
        if (onChange) {
            onChange({ [field]: value });
        }
    };

    return (
        <div className="w-full bg-white rounded-xl border border-[#DFE1E7] p-5 flex flex-col gap-5 shadow-[0px_1px_2px_rgba(13,13,18,0.06)]">
             <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] tracking-wide text-right">
                اطلاعات پایه
            </div>
            
            {/* Name */}
            <div className="flex flex-col gap-2">
                 <FormLabel text="نام محصول" />
                 <div className="h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center">
                     <input 
                        type="text" 
                        value={val('name') || "عسل چهل گیاه ارگانیک"} 
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full text-right text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] bg-transparent outline-none" 
                        dir="rtl" 
                     />
                 </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
                 <FormLabel text="توضیحات" />
                 <div className="h-[180px] p-3 bg-white rounded-xl border border-[#DFE1E7] flex flex-col">
                     <textarea 
                        className="w-full flex-1 text-right text-[#0D0D12] text-base font-light font-['PeydaWeb'] bg-transparent outline-none resize-none leading-relaxed"
                        value={val('description') || "این عسل ترکیبی از شهد گیاهان مختلف است که در ارتفاعات دالاهو یافت می شود. طعم و عطر بی نظیر، خواص دارویی فراوان و بسته بندی نفیس، این محصول را به انتخابی ایده آل برای مصرف روزانه و هدیه دادن تبدیل کرده است."}
                        onChange={(e) => handleChange('description', e.target.value)}
                        dir="rtl"
                     />
                     <div className="text-left text-[#A4ACB9] text-xs font-light font-num-medium mt-2">{((val('description') || "").length)}/200</div>
                 </div>
            </div>

            {/* ID */}
            <div className="flex flex-col gap-2">
                 <FormLabel text="شناسه محصول" />
                 <div className="h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center">
                     <div className="w-full text-left text-[#0D0D12] text-base font-normal font-num-medium dir-ltr" dir="ltr">{val('id') || "NK-PEG40-GRY-001"}</div>
                 </div>
            </div>

            {/* Images - Carousel Logic */}
            <div className="flex flex-col gap-2">
                 <FormLabel text="تصاویر محصول" />
                 <div className="w-full h-[180px] rounded-xl border border-[#DFE1E7] overflow-hidden relative">
                    <div 
                        ref={scrollContainerRef}
                        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                        onScroll={handleScroll}
                        dir="ltr"
                    >
                        {productImages.map((img, i) => (
                            <div 
                                key={i} 
                                id={`img-${i + 1}`}
                                className="w-full h-full flex-shrink-0 bg-center bg-contain bg-no-repeat snap-center bg-gray-50"
                                style={{ backgroundImage: `url('${img}')` }}
                            />
                        ))}
                    </div>
                    
                    {/* Dots */}
                     <div className="absolute flex gap-2 z-10 bottom-3 right-3">
                        <div className="flex gap-2 items-center flex-row-reverse">
                            {productImages.map((_, i) => {
                                const num = i + 1;
                                return (
                                <div 
                                    key={num} 
                                    onClick={() => {
                                        if (scrollContainerRef.current) {
                                            const width = scrollContainerRef.current.offsetWidth;
                                            scrollContainerRef.current.scrollTo({
                                                left: width * (num - 1),
                                                behavior: 'smooth'
                                            });
                                        }
                                        setActiveImage(num);
                                    }}
                                    className="cursor-pointer"
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-num-medium ${activeImage === num ? 'bg-[#FFD369] text-[#0D0D12]' : 'bg-[#0D0D12]/45 text-white'}`}>
                                        {num}
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    );
}

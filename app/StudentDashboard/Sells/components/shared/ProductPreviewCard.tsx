import React, { useState, useRef } from 'react';
import { Star, Heart, Eye } from 'lucide-react';

export interface ProductPreviewProps {
    product?: {
        name: string;
        price: string;
        description: string;
        images: string[];
        // Add other fields if needed for preview
    }
}

export function ProductPreviewCard({ product }: ProductPreviewProps) {
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

    const productImages = product?.images && product.images.length > 0 ? product.images : ["/Product.png"];

    return (
        <div className="w-full bg-white rounded-xl border border-[#DFE1E7] p-5 flex flex-col gap-5 shadow-[0px_1px_2px_rgba(13,13,18,0.06)]">
            <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] tracking-wide text-right">
                پیش نمایش زنده
            </div>
            
            <div className="w-full flex flex-col gap-4">
                {/* Preview Image Card - Carousel */}
                <div className="w-full h-[305px] rounded-xl border border-[#DFE1E7] overflow-hidden relative bg-gray-50">
                    <div 
                        ref={scrollContainerRef}
                        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                        onScroll={handleScroll}
                        dir="ltr"
                    >
                        {productImages.map((img, i) => (
                            <div 
                                key={i} 
                                id={`preview-img-${i + 1}`}
                                className="w-full h-full flex-shrink-0 bg-center bg-contain bg-no-repeat snap-center"
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
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-['PeydaFaNum'] ${activeImage === num ? 'bg-[#FFD369] text-[#0D0D12]' : 'bg-[#0D0D12]/45 text-white'}`}>
                                        {num}
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>
                </div>

                {/* Preview Header */}
                <div className="flex justify-between items-center">
                     <div className="bg-[#ECF9F7] px-3 py-1 rounded-2xl">
                         <span className="text-[#267666] text-sm font-semibold font-['PeydaWeb']">پرفروش ترین</span>
                     </div>
                     <div className="text-[#0047AB] text-lg font-semibold font-['PeydaFaNum'] dir-rtl">
                        {product?.price ? `${product.price} ریال` : '--- ریال'}
                     </div>
                </div>
                
                <div className="text-right text-[#0D0D12] text-xl font-semibold font-['PeydaWeb']">
                    {product?.name || "نام محصول..."}
                </div>

                {/* Preview Stats */}
                <div className="flex justify-end gap-3">
                    <div className="h-7 px-3 bg-white border border-[#DFE1E7] rounded-lg flex items-center justify-center gap-2">
                         <div className="bg-[#FFBE4C] w-5 h-5 rounded-full flex items-center justify-center p-[3px]">
                             <Star className="text-white fill-white w-full h-full" />
                         </div>
                         <span className="text-[#666D80] text-sm font-normal font-['PeydaFaNum']">0 (0 نظر)</span>
                    </div>
                    <div className="h-7 px-3 bg-white border border-[#DFE1E7] rounded-lg flex items-center justify-center gap-2">
                         <Heart className="w-4 h-4 text-[#DF1C41] fill-[#DF1C41]" />
                         <span className="text-[#666D80] text-sm font-normal font-['PeydaFaNum']">0</span>
                    </div>
                    <div className="h-7 px-3 bg-white border border-[#DFE1E7] rounded-lg flex items-center justify-center gap-2">
                         <Eye className="w-4 h-4 text-[#A4ACB9]" />
                         <span className="text-[#666D80] text-sm font-normal font-['PeydaFaNum']">0</span>
                    </div>
                </div>

                {/* Preview Desc */}
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb']">توضیحات</div>
                    <div className="text-right text-[#818898] text-base font-light font-['PeydaWeb'] leading-relaxed w-full break-words whitespace-pre-wrap">
                        {product?.description || "توضیحات محصول در اینجا نمایش داده می‌شود..."}
                    </div>
                </div>

            </div>
        </div>
    );
}

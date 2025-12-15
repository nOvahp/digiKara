import React from 'react';
import Image from 'next/image';
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
    const mainImage = product?.images?.[0] || "/Product.png";
    const thumbs = product?.images?.slice(1, 4) || [1, 2, 3]; // Show up to 3 thumbs or placeholders if empty? Actually better to show nothing if empty? Let's fallback for now or show what we have.
    
    // If we want placeholders when empty:
    const displayThumbs = product?.images?.length ? product.images.slice(0, 4) : [1, 2, 3, 4]; 
    // Wait, main image is index 0. Thumbs should be indices.
    
    return (
        <div className="w-full bg-white rounded-xl border border-[#DFE1E7] p-5 flex flex-col gap-5 shadow-[0px_1px_2px_rgba(13,13,18,0.06)]">
            <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] tracking-wide text-right">
                پیش نمایش زنده
            </div>
            
            <div className="w-full flex flex-col gap-4">
                {/* Preview Image Card */}
                {/* Preview Image Card */}
                <div className="w-full">
                    {product?.images && product.images.length > 0 ? (
                        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar" dir="rtl">
                            {product.images.map((img, i) => (
                                <div key={i} className="relative min-w-[280px] h-[305px] rounded-xl border border-[#DFE1E7] overflow-hidden flex-shrink-0 bg-gray-50">
                                    <Image 
                                        src={img} 
                                        alt={`Product ${i}`} 
                                        layout="fill" 
                                        objectFit="cover" 
                                        className="w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="w-full h-[305px] rounded-xl border border-[#DFE1E7] overflow-hidden relative bg-gray-50 flex items-center justify-center text-gray-300">
                             <span className="text-4xl">🖼️</span>
                         </div>
                    )}
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
                    <div className="text-right text-[#818898] text-base font-light font-['PeydaWeb'] leading-relaxed w-full">
                        {product?.description || "توضیحات محصول در اینجا نمایش داده می‌شود..."}
                    </div>
                </div>

            </div>
        </div>
    );
}

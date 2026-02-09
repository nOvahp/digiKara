"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { 
    ArrowLeft, 
    Bookmark, 
    Star, 
    ShoppingBag,
} from "lucide-react"
import { useCart } from "./CartContext";
import { bazzarService, BazzarProductDetail, BazzarProduct } from "../services/bazzarService"

const PRODUCT_IMAGE_PLACEHOLDER = "/ProductDetails.png";

const Skeleton = ({ className }: { className: string }) => (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

export default function ProductDetails() {
    const { addItem } = useCart();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    
    const [product, setProduct] = useState<BazzarProductDetail | null>(null);
    const [similarProducts, setSimilarProducts] = useState<BazzarProduct[]>([]);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                 setLoading(false);
                 return;
            }

            try {
                setLoading(true);
                const data = await bazzarService.getProductDetails(parseInt(id));
                
                setProduct(data.product);
                setSimilarProducts(data.similar_products || []);

                // Set defaults based on data
                if (data.product.colors && data.product.colors.length > 0) {
                    setSelectedColor(data.product.colors[0].id);
                }
                if (data.product.sizes && data.product.sizes.length > 0) {
                    setSelectedSize(data.product.sizes[0]);
                }
                
            } catch (error) {
                console.error("Failed to fetch product details", error);
                // No mock fallback; product remains null to show placeholders
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        document.body.classList.add('full-width');
        return () => {
            document.body.classList.remove('full-width');
        };
    }, []);

    // Helper to determine if we are in "placeholder mode"
    // We show placeholders if loading OR if product is null (failed to load)
    const showPlaceholder = loading || !product;

    return (
        <div className="w-full flex justify-center min-h-screen">
            <div className="w-full max-w-[440px] relative flex flex-col overflow-hidden pb-[100px]">
                
                {/* Header Image Area */}
                <div className="relative w-full h-[443px] bg-gray-100">
                     {!showPlaceholder && product?.images && product.images.length > 0 ? (
                         <Image 
                            src={product.images[0]}
                            alt={product.title} 
                            fill 
                            className="object-cover"
                            priority
                         />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center bg-gray-200 animate-pulse">
                             <div className="text-gray-400">تصویر محصول</div>
                         </div>
                     )}
                     
                     {/* Header Controls (Overlay) */}
                     <div className="absolute top-0 left-0 w-full p-0 flex justify-between items-center z-10 pt-4 px-6">
                          <Link href="/Bazzar">
                             <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-white transition-colors">
                                 <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={2} />
                             </div>
                          </Link>

                          <span className="text-white text-lg font-['PeydaWeb'] font-bold drop-shadow-md">جزئیات محصول</span>

                          <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-white transition-colors">
                               <Bookmark className="w-5 h-5 text-[#0C1415]" strokeWidth={2} />
                          </div>
                     </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-col px-[8%] pt-6 gap-6" dir="rtl">
                    
                    {/* Title & Rating */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            {showPlaceholder ? (
                                <Skeleton className="h-4 w-24" />
                            ) : (
                                <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">
                                    {product?.specs && product.specs["جنس"] ? product.specs["جنس"] : "محصول باکیفیت"}
                                </span>
                            )}
                            
                            <div className="flex items-center gap-1">
                                {showPlaceholder ? (
                                    <Skeleton className="h-4 w-8" />
                                ) : (
                                    <span className="text-[#707F81] text-sm font-num-medium">{product?.rating || 0}</span>
                                )}
                                <Star className="w-4 h-4 text-[#FDD00A] fill-[#FDD00A]" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            {showPlaceholder ? (
                                <Skeleton className="h-8 w-3/4" />
                            ) : (
                                <h1 className="text-[#0C1415] text-lg font-['PeydaWeb'] font-bold leading-relaxed">
                                    {product?.title}
                                </h1>
                            )}
                            
                            {/* Random Tag Logic - preserved but only if product exists */}
                            {!showPlaceholder && product && product.id % 3 === 0 && (
                                <div style={{
                                    background: 'linear-gradient(0deg, rgba(100, 179, 39, 0.20) 0%, rgba(100, 179, 39, 0.20) 100%), white'
                                }} className="px-2 py-0.5 rounded-2xl flex items-center justify-center">
                                    <span className="text-[#64B327] text-[10px] font-medium leading-[18px]">قدرت گرفته از شغل بابام</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold ">جزییات محصول</h3>
                        {showPlaceholder ? (
                            <>
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </>
                        ) : (
                            <p className="text-[#707F81] text-sm font-['PeydaWeb'] font-light leading-6 text-justify break-words">
                                {product?.description || "توضیحاتی برای این محصول ثبت نشده است."}
                            </p>
                        )}
                        
                        {!showPlaceholder && (
                             <span className="text-[#2F51FF] text-sm font-['PeydaWeb'] font-semibold underline cursor-pointer self-end">
                                 مشاهده جزئیات محصول
                             </span>
                        )}
                    </div>

                    <div className="w-full h-px bg-gray-100" />

                    {/* Color Selection */}
                    <div className="flex flex-col gap-3">
                         <div className="flex items-center gap-1 text-base font-['PeydaWeb'] font-semibold">
                             <span className="text-[#0C1415]">انتخاب رنگ: </span>
                             {showPlaceholder ? <Skeleton className="h-5 w-16 mr-2" /> : (
                                 <span className="text-[#2F51FF]">
                                     {product?.colors?.find(c => c.id === selectedColor)?.name || "-"}
                                 </span>
                             )}
                         </div>
                         <div className="flex gap-4">
                             {showPlaceholder ? (
                                 [1, 2, 3].map(i => <Skeleton key={i} className="w-[24px] h-[24px] rounded-full" />)
                             ) : (
                                 product?.colors?.map((color) => (
                                     <div 
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.id)}
                                        className={`
                                            w-[24px] h-[24px] rounded-full cursor-pointer relative flex items-center justify-center
                                            ${selectedColor === color.id ? 'ring-2 ring-offset-2 ring-[#0C1415]' : ''}
                                        `}
                                        style={{ backgroundColor: color.hex }}
                                     >
                                        {selectedColor === color.id && <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />}
                                     </div>
                                 ))
                             )}
                             {!showPlaceholder && (!product?.colors || product.colors.length === 0) && (
                                 <span className="text-gray-400 text-xs">رنگی موجود نیست</span>
                             )}
                         </div>
                    </div>


                    <div className="w-full h-px bg-gray-100" />

                    {/* Size Selection */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-1 text-base font-['PeydaWeb'] font-semibold">
                             <span className="text-[#0C1415]">انتخاب اندازه: </span>
                             {showPlaceholder ? <Skeleton className="h-5 w-16 mr-2" /> : (
                                 <span className="text-[#2F51FF]">
                                    {selectedSize === "Large" ? "بزرگ" : selectedSize === "Medium" ? "متوسط" : selectedSize === "Small" ? "کوچک" : selectedSize || "-"}
                                 </span>
                             )}
                        </div>
                        <div className="flex gap-4">
                            {showPlaceholder ? (
                                [1, 2, 3].map(i => <Skeleton key={i} className="w-16 h-8 rounded" />)
                            ) : (
                                product?.sizes?.map((size) => (
                                    <div 
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`flex items-center gap-2 cursor-pointer ${selectedSize !== size ? "opacity-50" : ""}`}
                                    >
                                        <span className="text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold">
                                            {size === "Large" ? "بزرگ" : size === "Medium" ? "متوسط" : size === "Small" ? "کوچک" : size}
                                        </span>
                                        <div className={`w-4 h-4 rounded-full border border-[#E5E5E5] flex items-center justify-center ${selectedSize === size ? "border-black" : ""}`}>
                                            {selectedSize === size && <div className="w-2 h-2 bg-[#171717] rounded-full" />}
                                        </div>
                                    </div>
                                ))
                            )}
                             {!showPlaceholder && (!product?.sizes || product.sizes.length === 0) && (
                                 <span className="text-gray-400 text-xs">سایزی موجود نیست</span>
                             )}
                        </div>
                    </div>

                     <div className="w-full h-px bg-gray-100" />

                    {/* Reviews */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">نظرات خریداران</h3>
                        
                        {/* Rating Summary Block */}
                        <div className="flex items-center justify-between bg-white p-2">
                             {/* Big Number */}
                             <div className="flex flex-col items-center gap-1">
                                  {showPlaceholder ? <Skeleton className="h-8 w-8" /> : (
                                      <span className="text-4xl font-num-medium font-black text-[#0C1415]">{product?.rating}</span>
                                  )}
                                  <div className="flex gap-0.5">
                                      {[1,2,3,4,5].map((star) => (
                                          <Star key={star} className={`w-4 h-4 ${!showPlaceholder && product && star <= Math.round(product.rating || 0) ? 'text-[#FCAF23] fill-[#FCAF23]' : 'text-gray-300'}`} />
                                      ))}
                                  </div>
                                  {showPlaceholder ? <Skeleton className="h-3 w-16" /> : (
                                      <span className="text-[#707F81] text-xs font-num-medium">({product?.reviews_count || 0} نظر)</span>
                                  )}
                             </div>

                             {/* Bars */}
                             <div className="flex flex-col gap-1 w-1/2" dir="ltr">
                                  {showPlaceholder ? [1,2,3,4,5].map(i => <Skeleton key={i} className="h-2 w-full" />) : (
                                      [5,4,3,2,1].map((n) => {
                                          const count = product?.rating_distribution?.[n] || 0;
                                          const total = product?.reviews_count || 1; 
                                          const percentage = (count / total) * 100;
                                          
                                          return (
                                              <div key={n} className="flex items-center gap-2">
                                                  <span className="text-xs font-num-medium w-3 text-center">{n}</span>
                                                  <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                                      <div 
                                                        className="h-full bg-[#F7C309] rounded-full" 
                                                        style={{ width: `${percentage}%`}} 
                                                      />
                                                  </div>
                                              </div>
                                          )
                                      })
                                  )}
                             </div>
                        </div>

                         {/* Reviews List */}
                         <div className="flex flex-col gap-4 w-full">
                            {showPlaceholder ? (
                                <div className="flex flex-col gap-3">
                                     <div className="flex items-center gap-3">
                                          <Skeleton className="w-9 h-9 rounded-full" />
                                          <Skeleton className="h-4 w-24" />
                                     </div>
                                     <Skeleton className="h-16 w-full" />
                                </div>
                            ) : (
                                product?.reviews && product.reviews.length > 0 ? (
                                    product.reviews.map((review, index) => (
                                        <div key={index} className="flex flex-col gap-3 w-full">
                                            <div className="flex flex-col gap-4 w-full">
                                                <div className="relative w-full flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-[#D9D9D9] rounded-full overflow-hidden relative">
                                                            <div className="w-full h-full bg-gray-300"></div> 
                                                        </div>
                                                        <div className="flex flex-col items-start gap-3">
                                                            <div className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-medium break-words">{review.user}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-start gap-3 w-[67px]">
                                                        <div className="text-center text-[#707F81] text-xs font-num-medium font-normal break-words">{review.date}</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-start gap-2 w-full">
                                                    <div className="w-full text-right text-[#707F81] text-sm font-['PeydaFaNum'] font-normal break-words leading-6">
                                                        {review.comment}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 text-center font-['PeydaWeb']">هنوز نظری ثبت نشده است.</p>
                                )
                            )}
                         </div>

                    </div>

                    <div className="w-full h-px bg-gray-100 mt-2 mb-6" />

                    {/* Similar Products */}
                    <div className="flex flex-col gap-4 pb-6" dir="rtl">
                        <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">محصولات مشابه</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mr-[8%] pr-[8%]">
                            {loading ? (
                                [1,2,3].map(i => (
                                     <div key={i} className="flex flex-col items-start gap-2 w-[140px] shrink-0">
                                          <Skeleton className="w-[140px] h-[120px] rounded-lg" />
                                          <Skeleton className="w-2/3 h-4" />
                                          <Skeleton className="w-1/2 h-3" />
                                     </div>
                                ))
                            ) : (
                                similarProducts.length > 0 ? (
                                    similarProducts.map((simProduct) => (
                                        <Link href={`/Bazzar/ProductDetails?id=${simProduct.id}`} key={simProduct.id} className="flex flex-col items-start gap-2 w-[140px] shrink-0 cursor-pointer">
                                            <div className="relative w-[140px] h-[120px] bg-[#F6F6F6] rounded-lg overflow-hidden">
                                                <Image 
                                                    src={simProduct.image || "/ProductBazzar.png"} 
                                                    alt={simProduct.title} 
                                                    fill 
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="w-full flex flex-col items-start gap-1">
                                                <h3 className="text-[#1F2029] text-xs font-['PeydaWeb'] font-light text-right">{simProduct.title}</h3>
                                                <span className="text-[#1F2029] text-xs font-num-medium">
                                                    {typeof simProduct.price === 'number' ? `${simProduct.price.toLocaleString()} تومان` : simProduct.price}
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-sm">محصول مشابهی یافت نشد.</span>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Fixed Bottom Bar */}
                <div className="fixed bottom-0 w-full max-w-[440px] bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-2xl z-50">
                     <div className="flex items-center justify-between gap-4">
                         
                         {/* Price */}
                         <div className="flex flex-col items-end">
                             <span className="text-[#707F81] text-xs font-['PeydaFaNum']">هزینه نهایی</span>
                             {showPlaceholder ? <Skeleton className="h-5 w-24" /> : (
                                 <span className="text-[#0C1415] text-base font-num-medium">
                                     {typeof product?.price === 'number' ? `${product.price.toLocaleString()} تومان` : product?.price}
                                 </span>
                             )}
                         </div>

                         {/* Add to Cart Button */}
                         <button 
                            disabled={showPlaceholder}
                            onClick={() => {
                                if (!product) return;
                                const priceNumber = typeof product.price === 'number' ? product.price : parseInt(product.price.replace(/\D/g, '')) || 0;
                                addItem({
                                    id: product.id,
                                    name: product.title,
                                    shopName: "فروشنده نمونه", 
                                    price: priceNumber,
                                    image: (product.images && product.images[0]) || PRODUCT_IMAGE_PLACEHOLDER
                                });
                            }}
                            className={`flex-1 bg-[#FDD00A] h-12 rounded-xl flex items-center justify-center gap-2 transition-colors ${showPlaceholder ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#EAC009]'}`}
                         >
                             <span className="text-[#1A1C1E] text-base font-['PeydaWeb'] font-semibold">افزودن به سبد خرید</span>
                             <ShoppingBag className="w-5 h-5 text-[#0A0A0A]" />
                         </button>
                     </div>
                     
                     {/* iOS Indicator */}
                     <div className="w-full flex justify-center mt-3">
                        <div className="w-[134px] h-[5px] bg-black rounded-full" />
                     </div>
                </div>

            </div>
        </div>
    )
}

"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { 
    ArrowLeft, 
    Bookmark, 
    Star, 
    MoreHorizontal, 
    ChevronRight, 
    ShoppingBag,
    Share2,
    Heart
} from "lucide-react"
import { getProductDetail, ProductDetail } from "../data/productDetails"
import { products } from "../data/product"
import { useCart } from "./CartContext";

const PRODUCT_IMAGE = "/ProductDetails.png";

export default function ProductDetails() {
    const { addItem } = useCart();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    
    // Default mock if no ID found or ID not in DB (for dev preview)
    const defaultProduct: ProductDetail = {
        id: 0,
        title: "کیف دستی چرم مدرن",
        rating: 4.5,
        price: "Unknown",
        description: "این کیف دستی شیک دارای چرم دباغی شده گیاهی، فضای داخلی جادار و لهجه های سخت افزاری نقره ای است. این کیف برای حمل وسایل ضروری روزمره شما عالی است.",
        images: [PRODUCT_IMAGE],
        colors: [
             { name: "قهوه ای", hex: "#8D6E63", id: "brown" },
             { name: "سبز", hex: "#2E7D32", id: "green" },
             { name: "قرمز", hex: "#C62828", id: "red" },
             { name: "بنفش", hex: "#6A1B9A", id: "purple" }
        ],
        sizes: ["Small", "Medium", "Large"],
        category: "پوشاک",
        reviews: [],
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        reviewsCount: 0
    };

    const [product, setProduct] = useState<ProductDetail>(defaultProduct);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");

    useEffect(() => {
        if (id) {
            const data = getProductDetail(parseInt(id));
            if (data) {
                setProduct(data);
                // Set defaults based on data
                if (data.colors.length > 0) setSelectedColor(data.colors[0].id);
                if (data.sizes.length > 0) setSelectedSize(data.sizes[0]);
            }
        } else {
             // Set defaults for fallback
             setSelectedColor(defaultProduct.colors[0].id);
             setSelectedSize(defaultProduct.sizes[2]);
        }
    }, [id]);

    useEffect(() => {
        // Add full-width class to body to remove global padding
        document.body.classList.add('full-width');
        return () => {
            document.body.classList.remove('full-width');
        };
    }, []);

    return (
        <div className="w-full flex justify-center  min-h-screen">
            <div className="w-full max-w-[440px] relative flex flex-col  overflow-hidden pb-[100px]">
                
                {/* Header Image Area */}
                <div className="relative w-full h-[443px]">
                     <Image 
                        src={product.images[0] || PRODUCT_IMAGE}
                        alt={product.title} 
                        fill 
                        className="object-cover"
                        priority
                     />
                     
                     {/* Header Controls (Overlay) */}
                     <div className="absolute top-0 left-0 w-full p-0 flex justify-between items-center z-10 pt-4 px-6">
                          {/* Back Button */}
                          <Link href="/Bazzar">
                             <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-white transition-colors">
                                 <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={2} />
                             </div>
                          </Link>

                          <span className="text-white text-lg font-['PeydaWeb'] font-bold drop-shadow-md">جزئیات محصول</span>

                          {/* Action Button (Bookmark/Share) */}
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
                            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">
                                {product.specs && product.specs["جنس"] ? product.specs["جنس"] : "محصول باکیفیت"}
                            </span>
                            <div className="flex items-center gap-1">
                                <span className="text-[#707F81] text-sm font-['PeydaFaNum']">{product.rating}</span>
                                <Star className="w-4 h-4 text-[#FDD00A] fill-[#FDD00A]" />
                            </div>
                        </div>
                        <h1 className="text-[#0C1415] text-lg font-['PeydaWeb'] font-bold leading-relaxed">
                            {product.title}
                        </h1>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold ">جزییات محصول</h3>
                        <p className="text-[#707F81] text-sm font-['PeydaWeb'] font-light leading-6 text-justify">
                            {product.description}
                        </p>
                        <span className="text-[#2F51FF] text-sm font-['PeydaWeb'] font-semibold underline cursor-pointer self-end">
                            مشاهده جزئیات محصول
                        </span>
                    </div>

                    <div className="w-full h-px bg-gray-100" />

                    {/* Color Selection */}
                    <div className="flex flex-col gap-3">
                         <div className="flex items-center gap-1 text-base font-['PeydaWeb'] font-semibold">
                             <span className="text-[#0C1415]">انتخاب رنگ: </span>
                             <span className="text-[#2F51FF]">{product.colors.find(c => c.id === selectedColor)?.name}</span>
                         </div>
                         <div className="flex gap-4">
                             {product.colors.map((color) => (
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
                             ))}
                         </div>
                    </div>


                    <div className="w-full h-px bg-gray-100" />

                    {/* Size Selection */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-1 text-base font-['PeydaWeb'] font-semibold">
                             <span className="text-[#0C1415]">انتخاب اندازه: </span>
                             <span className="text-[#2F51FF]">{selectedSize === "Large" ? "بزرگ" : selectedSize === "Medium" ? "متوسط" : "کوچک"}</span>
                        </div>
                        <div className="flex gap-4">
                            {product.sizes.map((size) => (
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
                            ))}
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
                                  <span className="text-4xl font-['PeydaFaNum'] font-black text-[#0C1415]">{product.rating}</span>
                                  <div className="flex gap-0.5">
                                      {[1,2,3,4,5].map((star) => (
                                          <Star key={star} className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'text-[#FCAF23] fill-[#FCAF23]' : 'text-gray-300'}`} />
                                      ))}
                                  </div>
                                  <span className="text-[#707F81] text-xs font-['PeydaFaNum']">({product.reviewsCount} نظر)</span>
                             </div>

                             {/* Bars */}
                             <div className="flex flex-col gap-1 w-1/2" dir="ltr">
                                  {[5,4,3,2,1].map((n) => {
                                      const count = product.ratingDistribution?.[n as 1|2|3|4|5] || 0;
                                      const total = product.reviewsCount || 1; 
                                      const percentage = (count / total) * 100;
                                      
                                      return (
                                          <div key={n} className="flex items-center gap-2">
                                              <span className="text-xs font-['PeydaFaNum'] w-3 text-center">{n}</span>
                                              <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                                  <div 
                                                    className="h-full bg-[#F7C309] rounded-full" 
                                                    style={{ width: `${percentage}%`}} 
                                                  />
                                              </div>
                                          </div>
                                      )
                                  })}
                             </div>
                        </div>

                         {/* Reviews List */}
                         <div className="flex flex-col gap-4 w-full">
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((review, index) => (
                                    <div key={index} className="flex flex-col gap-3 w-full">
                                        <div className="flex flex-col gap-4 w-full">
                                            <div className="w-full h-0"></div>
                                            <div className="relative w-full flex justify-between items-center">
                                                
                                                {/* User Profile (Right Side in RTL) */}
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-[#D9D9D9] rounded-full overflow-hidden relative">
                                                        <div className="w-full h-full bg-gray-300"></div> 
                                                    </div>
                                                    <div className="flex flex-col items-start gap-3">
                                                        <div className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-medium break-words">{review.user}</div>
                                                    </div>
                                                </div>

                                                {/* Date (Left Side in RTL) */}
                                                <div className="flex flex-col items-start gap-3 w-[67px]">
                                                    <div className="text-center text-[#707F81] text-xs font-['PeydaFaNum'] font-normal break-words">{review.date}</div>
                                                </div>

                                                {/* Yellow Square Indicator */}
                                                <div className="absolute w-[13px] h-[14px] left-[351px] top-[10px] bg-[#F7C309] outline outline-1 outline-white hidden md:block" />
                                            </div>

                                            {/* Review Text & Rating */}
                                            <div className="flex flex-col items-start gap-2 w-full">
                                                <div className="w-full text-right text-[#707F81] text-sm font-['PeydaFaNum'] font-normal break-words leading-6">
                                                    {review.comment}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="text-[#707F81] text-sm font-['PeydaFaNum'] font-medium break-words">{review.rating}.0</div>
                                                    <Star className="w-3 h-3 text-gray-400 fill-[#FCAF23] stroke-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 text-center font-['PeydaWeb']">هنوز نظری ثبت نشده است.</p>
                            )}
                         </div>

                    </div>

                    <div className="w-full h-px bg-gray-100 mt-2 mb-6" />

                    {/* Similar Products */}
                    <div className="flex flex-col gap-4 pb-6" dir="rtl">
                        <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">محصولات مشابه</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mr-[8%] pr-[8%]">
                            {products
                                .filter(p => p.category === product.category && p.id !== product.id)
                                .slice(0, 5)
                                .map((simProduct) => (
                                <Link href={`/Bazzar/ProductDetails?id=${simProduct.id}`} key={simProduct.id} className="flex flex-col items-start gap-2 w-[140px] shrink-0 cursor-pointer">
                                    <div className="relative w-[140px] h-[120px] bg-[#F6F6F6] rounded-lg overflow-hidden">
                                        <Image 
                                            src={simProduct.image} 
                                            alt={simProduct.title} 
                                            fill 
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="w-full flex flex-col items-start gap-1">
                                        <h3 className="text-[#1F2029] text-xs font-['PeydaWeb'] font-light text-right">{simProduct.title}</h3>
                                        <span className="text-[#1F2029] text-xs font-['PeydaWeb'] font-semibold">{simProduct.price}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fixed Bottom Bar */}
                <div className="fixed bottom-0 w-full max-w-[440px] bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-2xl z-50">
                     <div className="flex items-center justify-between gap-4">
                         
                         {/* Price */}
                         <div className="flex flex-col items-end">
                             <span className="text-[#707F81] text-xs font-['PeydaFaNum']">هزینه نهایی</span>
                             <span className="text-[#0C1415] text-base font-['PeydaFaNum'] font-medium">{product.price}</span>
                         </div>

                         {/* Add to Cart Button */}
                         <button 
                            onClick={() => {
                                const priceNumber = parseInt(product.price.replace(/\D/g, '')) || 0;
                                addItem({
                                    id: product.id,
                                    name: product.title,
                                    shopName: "فروشنده نمونه", // Default shop name as it's not in product details yet
                                    price: priceNumber,
                                    image: product.images[0] || PRODUCT_IMAGE
                                });
                            }}
                            className="flex-1 bg-[#FDD00A] h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-[#EAC009] transition-colors"
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

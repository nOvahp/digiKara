"use client"

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { products, searchProducts } from '../../data/product';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Search as SearchIcon, MapPin } from 'lucide-react';
import SearchBar from '../../components/SearchBar';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';
    
    // Filter products
    const filteredProducts = React.useMemo(() => {
        return searchProducts(query);
    }, [query]);

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center pb-[50px]" dir="rtl">
             {/* Header Fixed Area */}
            <div className="w-full max-w-[440px] px-0 pt-8 pb-4 flex flex-col gap-4 bg-white sticky top-0 z-10">
                {/* Top Bar: Back & Location */}
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                         <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center cursor-pointer" onClick={() => router.back()}>
                             <ChevronRight size={20} className="text-[#0C1415]" />
                         </div>
                         <div className="flex flex-col items-start">
                             <span className="text-[#707F81] text-xs font-['PeydaWeb'] font-light">موقعیت</span>
                             <div className="flex items-center gap-1">
                                 <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">تهران، ایران</span>
                                 <MapPin size={14} className="text-[#FDD00A] fill-[#FDD00A]" />
                             </div>
                         </div>
                    </div>
                </div>

                {/* Search Input Area */}
                <SearchBar initialValue={query} />

                {/* Results Info */}
                <div className="w-full flex justify-between items-center mt-2">
                    <span className="text-[#3C5A5D] text-sm font-['PeydaFaNum'] font-medium">
                        {filteredProducts.length} مورد یافت شد
                    </span>
                    <h1 className="text-[#0C1415] text-lg font-['PeydaFaNum'] font-medium">
                        نتایج جستجو “{query}”
                    </h1>
                </div>
            </div>

            {/* Results Grid */}
            <div className="w-full max-w-[440px] px-0 grid grid-cols-2 gap-x-6 gap-y-8 mt-2">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Link href={`/Bazzar/ProductDetails?id=${product.id}`} key={product.id} className="flex flex-col gap-2 w-full cursor-pointer group">
                             <div className="relative w-full aspect-[170/150] bg-[#F6F6F6] rounded-lg overflow-hidden">
                                 {/* Image */}
                                 <Image 
                                    src={product.image} 
                                    alt={product.title}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                 />
                                 {/* Shadow decoration from design */}
                                  <div className="absolute w-[40%] h-[3px] left-[30%] bottom-[20%] rotate-1 bg-black/80 blur-[8px] opacity-40" />
                             </div>
                             
                             <div className="flex flex-col gap-1 w-full">
                                 <div className="flex justify-between items-start">
                                     <h3 className="text-[#1F2029] text-sm font-['PeydaWeb'] font-light text-right overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px]">
                                         {product.title}
                                     </h3>
                                     <div className="flex items-center gap-1 opacity-90">
                                         <span className="text-[#797979] text-xs font-['PeydaWeb'] font-light pt-0.5">
                                             {product.rating}
                                         </span>
                                         <SearchIcon size={0} className="hidden" /> 
                                         <svg width="12" height="12" viewBox="0 0 24 24" fill="#FDD00A" stroke="none" className="mb-0.5">
                                             <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                         </svg>
                                     </div>
                                 </div>
                                 <div className="text-[#1F2029] text-sm font-['PeydaWeb'] font-semibold text-left w-full">
                                     {product.price}
                                 </div>
                             </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-20 gap-4 opacity-60">
                         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                              <SearchIcon size={32} className="text-gray-400" />
                         </div>
                         <p className="text-gray-500 font-['PeydaWeb'] text-sm">هیچ محصولی با این نام یافت نشد</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="w-full h-screen flex justify-center items-center">Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";

// Types for our data
export interface ProductData {
    id: number;
    name: string;
    soldCount: number;
    revenue: string;
    inventoryCount: number;
    trendPercentage: string;
    trendType: 'positive' | 'negative';
}

interface ProductTableRowProps {
    product: ProductData;
    index: number;
    isChecked: boolean;
    onToggle: (id: number) => void;
}

function ProductTableRow({ product, index, isChecked, onToggle }: ProductTableRowProps) {
    const isPositive = product.trendType === 'positive';
    const trendBg = isPositive ? 'bg-[#ECF9F7]' : 'bg-[#FCE8EC]';
    const trendText = isPositive ? 'text-[#267666]' : 'text-[#B21634]';

    return (
        <div 
            onClick={() => onToggle(product.id)}
            className="flex min-w-max h-16 px-[9px] border-b border-[#DFE1E7] justify-end items-center hover:bg-gray-50 transition-colors cursor-pointer bg-white"
        >
            {/* Trend Icon */}
            <div className="h-16 px-3 border-b border-[#DFE1E7] flex justify-start items-center gap-2">
                <div className="w-5 h-5 relative">
                    <div className="absolute left-[1.67px] top-[8.33px] w-[16.67px] h-[3.33px] bg-[#666D80]" />
                </div>
            </div>

            {/* Badge */}
            <div className="w-[104px] h-16 px-3 border-b border-[#DFE1E7] flex justify-end items-center gap-1.5">
                <div className={cn("h-5 px-2 py-[2px] rounded-2xl flex justify-start items-center", trendBg)}>
                    <div className={cn("text-center text-xs font-normal font-['PeydaFaNum'] leading-[18px] tracking-wide", trendText)}>
                        {product.trendPercentage}
                    </div>
                </div>
            </div>

            {/* Inventory Count */}
            <div className="w-[127px] h-16 px-3 border-b border-[#DFE1E7] flex justify-end items-center gap-2.5">
                <div className="flex-1 text-center text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
                    {product.inventoryCount}
                </div>
            </div>

            {/* Revenue */}
            <div className="w-[140px] h-16 px-3 border-b border-[#DFE1E7] flex justify-end items-center gap-2.5">
                <div className="flex-1 text-center text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
                    {product.revenue}
                </div>
            </div>

            {/* Sold Count */}
            <div className="w-[138px] h-16 px-3 border-b border-[#DFE1E7] flex justify-end items-center gap-2.5">
                <div className="flex-1 text-center text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
                    {product.soldCount}
                </div>
            </div>

            {/* Product Name */}
            <div className="w-[177px] h-16 px-3 border-b border-[#DFE1E7] flex justify-start items-center gap-2.5">
                <div className="flex-1 text-right text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide truncate">
                    {product.name}
                </div>
            </div>

            {/* Number & Checkbox */}
            <div className="w-20 h-16 px-3 border-b border-[#DFE1E7] flex justify-start items-center gap-2.5">
                <div className="flex-1 text-right text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
                    {product.id}
                </div>
                <div className={cn(
                    "w-4 h-4 relative rounded border flex items-center justify-center",
                    isChecked ? "bg-white border-[#DFE1E7]" : "bg-white border-[#DFE1E7]" 
                )}>
                   {isChecked && (
                       <div className="w-2.5 h-2.5 bg-[#0D0D12] rounded-sm" /> 
                   )}
                </div>
            </div>
        </div>
    );
}

// Expanded Mock Data
const products: ProductData[] = [
    { id: 1, name: "عسل آویشن ارگانیک", soldCount: 300, revenue: "۴,۵۰۰,۰۰۰ ریال", inventoryCount: 100, trendPercentage: "+5.0%", trendType: "positive" },
    { id: 2, name: "عسل چهل گیاه ارگانیک", soldCount: 400, revenue: "۶,۰۰۰,۰۰۰ ریال", inventoryCount: 150, trendPercentage: "+7.5%", trendType: "negative" },
    { id: 3, name: "عسل زعفران ارگانیک", soldCount: 500, revenue: "۷,۵۰۰,۰۰۰ ریال", inventoryCount: 120, trendPercentage: "+6.0%", trendType: "positive" },
    { id: 4, name: "موم عسل طبیعی", soldCount: 250, revenue: "۳,۰۰۰,۰۰۰ ریال", inventoryCount: 80, trendPercentage: "+3.5%", trendType: "negative" },
    { id: 5, name: "شهد گلهای وحشی ارگانیک", soldCount: 320, revenue: "۵,۲۰۰,۰۰۰ ریال", inventoryCount: 90, trendPercentage: "+5.5%", trendType: "positive" },
    { id: 6, name: "گرده گل ارگانیک", soldCount: 150, revenue: "۲,۰۰۰,۰۰۰ ریال", inventoryCount: 50, trendPercentage: "+4.1%", trendType: "positive" },
    { id: 7, name: "سیب زمینی ارگانیک", soldCount: 600, revenue: "۱,۵۰۰,۰۰۰ ریال", inventoryCount: 300, trendPercentage: "+2.0%", trendType: "negative" },
    { id: 8, name: "گوجه فرنگی ارگانیک", soldCount: 550, revenue: "۱,۲۰۰,۰۰۰ ریال", inventoryCount: 250, trendPercentage: "+3.0%", trendType: "positive" },
    { id: 9, name: "شیرینی عسل ارگانیک", soldCount: 200, revenue: "۳,۵۰۰,۰۰۰ ریال", inventoryCount: 60, trendPercentage: "+5.2%", trendType: "positive" },
    { id: 10, name: "عسل گلابی ارگانیک", soldCount: 280, revenue: "۴,۰۰۰,۰۰۰ ریال", inventoryCount: 110, trendPercentage: "+6.5%", trendType: "negative" },
    { id: 11, name: "عسل نعنا ارگانیک", soldCount: 430, revenue: "۶,۰۰۰,۰۰۰ ریال", inventoryCount: 130, trendPercentage: "+4.5%", trendType: "positive" },
    { id: 12, name: "سیب ارگانیک", soldCount: 350, revenue: "۳,۰۰۰,۰۰۰ ریال", inventoryCount: 150, trendPercentage: "+3.5%", trendType: "positive" },
    { id: 13, name: "روغن حیوانی", soldCount: 80, revenue: "۸,۰۰۰,۰۰۰ ریال", inventoryCount: 20, trendPercentage: "+10.0%", trendType: "positive" },
    { id: 14, name: "کشک محلی", soldCount: 120, revenue: "۱,۰۰۰,۰۰۰ ریال", inventoryCount: 40, trendPercentage: "+1.5%", trendType: "negative" },
    { id: 15, name: "قره قروت", soldCount: 500, revenue: "۵۰۰,۰۰۰ ریال", inventoryCount: 200, trendPercentage: "+8.0%", trendType: "positive" },
    { id: 16, name: "لواشک خانگی", soldCount: 600, revenue: "۹۰۰,۰۰۰ ریال", inventoryCount: 100, trendPercentage: "+12.0%", trendType: "positive" },
    { id: 17, name: "سرکه سیب", soldCount: 90, revenue: "۱,۱۰۰,۰۰۰ ریال", inventoryCount: 30, trendPercentage: "+2.5%", trendType: "negative" },
    { id: 18, name: "آبغوره", soldCount: 110, revenue: "۱,۳۰۰,۰۰۰ ریال", inventoryCount: 45, trendPercentage: "+3.0%", trendType: "positive" },
    { id: 19, name: "رب انار", soldCount: 130, revenue: "۲,۵۰۰,۰۰۰ ریال", inventoryCount: 55, trendPercentage: "+4.0%", trendType: "positive" },
    { id: 20, name: "زعفران مثقالی", soldCount: 40, revenue: "۵,۰۰۰,۰۰۰ ریال", inventoryCount: 15, trendPercentage: "+9.0%", trendType: "negative" },
    { id: 21, name: "هل سبز", soldCount: 60, revenue: "۳,۲۰۰,۰۰۰ ریال", inventoryCount: 25, trendPercentage: "+5.0%", trendType: "positive" },
    { id: 22, name: "دارچین قلم", soldCount: 100, revenue: "۸۰۰,۰۰۰ ریال", inventoryCount: 70, trendPercentage: "+2.2%", trendType: "positive" },
    { id: 23, name: "زردچوبه", soldCount: 200, revenue: "۶۰۰,۰۰۰ ریال", inventoryCount: 80, trendPercentage: "+1.0%", trendType: "negative" },
    { id: 24, name: "فلفل سیاه", soldCount: 150, revenue: "۹۰۰,۰۰۰ ریال", inventoryCount: 60, trendPercentage: "+3.8%", trendType: "positive" },
    { id: 25, name: "آویشن کوهی", soldCount: 85, revenue: "۱,۵۰۰,۰۰۰ ریال", inventoryCount: 35, trendPercentage: "+6.1%", trendType: "positive" },
];

export function ProductTable() {
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const itemsPerPage = 8; 

    // Calculate total pages
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Slice for current page
    const currentProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const toggleId = (id: number) => {
        setCheckedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl border border-[#DFE1E7] overflow-hidden flex flex-col justify-start items-end inline-flex mb-8">
            
            {/* Header */}
            <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
                <div className="flex justify-start items-center gap-2">
                    <div className="w-8 h-8 px-4 py-2 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50">
                        <div className="w-4 h-4 relative">
                            {/* Filter Icon Placeholder from User Snippet */}
                            <div className="absolute left-[2px] top-[2px] w-3 h-3 border-[1.33px] border-[#818898] rounded-full" />
                        </div>
                    </div>
                    <div className="w-8 h-8 p-2 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50">
                        <div className="w-4 h-4 relative">
                             {/* icon placeholder */}
                            <div className="absolute left-[2px] top-[2px] w-3 h-3 border-[1.33px] border-[#818898] rounded-full" />
                        </div>
                    </div>
                </div>
                <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] leading-normal tracking-wide">
                    جدول محصولات
                </div>
            </div>

            {/* Scrollable Container */}
            <div className="w-full overflow-x-auto flex flex-col">
                {/* Table Column Headers */}
                <div className="flex min-w-max px-[9px] bg-[#F6F8FA] border-b border-[#DFE1E7] justify-end items-center">
                    {/* 1. Empty for Icon */}
                    <div className="w-[44px] h-10 px-3 bg-[#F6F8FA]" />

                    {/* 2. Trend */}
                    <div className="w-[104px] h-10 px-3 bg-[#F6F8FA] flex justify-end items-center gap-2.5">
                        <div className="flex justify-start items-center gap-1.5">
                            <div className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">روند</div>
                        </div>
                    </div>

                    {/* 3. Inventory */}
                    <div className="w-[127px] h-10 px-3 bg-[#F6F8FA] flex justify-center items-center gap-2.5">
                        <div className="flex justify-start items-center gap-1.5">
                            <div className="text-center text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">موجودی</div>
                        </div>
                    </div>

                    {/* 4. Revenue */}
                    <div className="w-[140px] h-10 px-3 bg-[#F6F8FA] flex justify-center items-center gap-2.5">
                    <div className="flex justify-start items-center gap-1.5">
                            <div className="text-center text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">درآمد</div>
                        </div>
                    </div>

                    {/* 5. Sold */}
                    <div className="w-[138px] h-10 px-3 bg-[#F6F8FA] flex justify-center items-center gap-2.5">
                        <div className="flex justify-start items-center gap-1.5">
                            <div className="text-center text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">فروخته شده</div>
                        </div>
                    </div>

                    {/* 6. Product */}
                    <div className="w-[177px] h-10 px-3 bg-[#F6F8FA] flex justify-end items-center gap-2.5">
                        <div className="flex justify-start items-center gap-1.5">
                            <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">محصول</div>
                        </div>
                    </div>

                    {/* 7. Number & Checkbox */}
                    <div className="w-20 h-10 px-3 bg-[#F6F8FA] flex justify-end items-center gap-2.5">
                        <div className="flex justify-start items-center gap-1.5">
                            <div className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">شماره</div>
                        </div>
                        <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                    </div>
                </div>

                {/* Rows */}
                {currentProducts.map((p, i) => (
                    <ProductTableRow 
                        key={p.id} 
                        product={p} 
                        index={i} 
                        isChecked={checkedIds.includes(p.id)} 
                        onToggle={toggleId}
                    />
                ))}
            </div>

            {/* Pagination Footer */}
            <div className="w-full px-5 py-4 flex justify-between items-center">
                <div className="text-center text-[#0D0D12] text-sm font-medium font-['PeydaFaNum'] leading-[21px] tracking-wide">
                    صفحه {currentPage} از {totalPages}
                </div>
                <div className="flex justify-start items-center gap-2">
                    {/* Previous Button */}
                    <button 
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={cn(
                            "w-8 h-8 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2 transition-colors",
                            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 bg-white"
                        )}
                    >
                         <div className="w-5 h-5 relative overflow-hidden">
                             <div className="absolute left-[7.50px] top-[19.51px] w-[14.51px] h-[5px] border-[1.50px] border-[#0D0D12] rounded-[0.83px] transform -rotate-90 origin-top-left" />
                         </div>
                    </button>

                    {/* Page Indicator */}
                    <div className="w-[55px] h-8 rounded-lg border border-[#DFE1E7] flex flex-col justify-center items-center gap-2">
                        <div className="flex flex-col justify-center text-[#0D0D12] text-xs font-medium font-['PeydaFaNum'] leading-[18px] tracking-wide">
                             {currentPage}/{totalPages}
                        </div>
                    </div>

                    {/* Next Button */}
                    <button 
                         onClick={handleNextPage}
                         disabled={currentPage === totalPages}
                         className={cn(
                            "w-8 h-8 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2 transition-colors",
                            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 bg-white"
                         )}
                    >
                         <div className="w-5 h-5 relative overflow-hidden">
                             <div className="absolute left-[12.50px] top-[5px] w-[14.51px] h-[5px] border-[1.50px] border-[#0D0D12] rounded-[0.83px] transform rotate-90 origin-top-left" />
                         </div>
                    </button>
                </div>
            </div>

        </div>
    );
}



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
// Product data moved to parent


interface ProductTableProps {
    products: ProductData[];
}

export function ProductTable({ products }: ProductTableProps) {
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



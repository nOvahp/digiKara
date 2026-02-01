"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Filter, Search, MoreHorizontal, Trash2, Edit, ArrowUpDown } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/app/components/Skeleton";

// Types for our data
import { Product } from '@/app/StudentDashboard/data/products';

// Types from shared data
export interface ProductData extends Product {}

interface ProductTableRowProps {
    product: ProductData;
    index: number;
    isChecked: boolean;
    onToggle: (id: number | string) => void;
    onDelete?: (id: number | string) => void;
}

function toFarsiNumber(n: number | string | undefined): string {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

function ProductTableRow({ product, index, isChecked, onToggle, onDelete }: ProductTableRowProps) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isPositive = product.trendType === 'positive';
    const trendBg = isPositive ? 'bg-[#ECF9F7]' : 'bg-[#FCE8EC]';
    const trendText = isPositive ? 'text-[#267666]' : 'text-[#B21634]';
    const containerRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleRowClick = () => {
        router.push(`/StudentDashboard/EditeProducts?id=${product.id}`);
    };

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMenuOpen(prev => !prev);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("Delete clicked for id:", product.id);
        setIsMenuOpen(false);
        if (onDelete) {
            onDelete(product.id);
        } else {
            console.error("onDelete prop is missing in ProductTableRow");
        }
    };

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/StudentDashboard/EditeProducts?id=${product.id}`);
    };

    return (
        <div 
            onClick={handleRowClick}
            className="flex min-w-max h-16 px-[9px] border-b border-[#DFE1E7] justify-end items-center hover:bg-gray-50 transition-colors cursor-pointer bg-white relative"
        >
            {/* Edit Menu */}
            <div 
                ref={containerRef}
                className="h-16 px-3 border-b border-[#DFE1E7] flex justify-start items-center gap-2 relative z-20"
            >
                <button 
                    onClick={toggleMenu}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                >
                    <MoreHorizontal className="w-5 h-5 text-[#666D80]" />
                </button>
                
                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div className="absolute top-10 left-0 w-32 bg-white rounded-lg shadow-[0px_4px_16px_rgba(0,0,0,0.1)] border border-[#EFF0F2] flex flex-col overflow-hidden animate-fade-in" dir="rtl">
                         <div 
                            onClick={handleEditClick}
                            className="px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-[#0D0D12] text-sm cursor-pointer"
                         >
                            <Edit className="w-4 h-4" />
                            <span>ویرایش</span>
                         </div>
                         <div 
                            onClick={handleDeleteClick}
                            className="px-3 py-2 hover:bg-red-50 flex items-center gap-2 text-red-500 text-sm cursor-pointer border-t border-gray-50"
                         >
                            <Trash2 className="w-4 h-4" />
                            <span>حذف</span>
                         </div>
                    </div>
                )}
            </div>

            {/* Badge */}
            <div className="w-[104px] h-16 px-3 border-b border-[#DFE1E7] flex justify-end items-center gap-1.5">
                <div className={cn("h-5 px-2 py-[2px] rounded-2xl flex justify-start items-center", trendBg)}>
                    <div className={cn("text-center text-xs font-num-medium leading-[18px] tracking-wide", trendText)}>
                        {toFarsiNumber(product.trendPercentage)}
                    </div>
                </div>
            </div>

            {/* Inventory Count */}
            <div className="w-[127px] h-16 px-3 border-b border-[#DFE1E7] flex justify-end items-center gap-2.5">
                <div className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium leading-[21px] tracking-wide">
                    {toFarsiNumber(product.inventoryCount)}
                </div>
            </div>

            {/* Revenue */}
            <div className="w-[140px] h-16 px-3 border-b border-[#DFE1E7] flex justify-end items-center gap-2.5">
                <div className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium leading-[21px] tracking-wide"dir="rtl">
                    {toFarsiNumber(product.revenue)}
                </div>
            </div>

            {/* Sold Count */}
            <div className="w-[138px] h-16 px-3 border-b border-[#DFE1E7] flex justify-end items-center gap-2.5">
                <div className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium leading-[21px] tracking-wide">
                    {toFarsiNumber(product.soldCount)}
                </div>
            </div>

            {/* Product Name */}
            <div className="w-[177px] h-16 px-3 border-b border-[#DFE1E7] flex justify-start items-center gap-2.5">
                <div className="flex-1 text-right text-[#0D0D12] text-sm font-semibold leading-[21px] tracking-wide truncate">
                    {product.name}
                </div>
            </div>

            {/* Number & Checkbox */}
            <div className="w-20 h-16 px-3 border-b border-[#DFE1E7] flex justify-start items-center gap-2.5">
                <div className="flex-1 text-right text-[#0D0D12] text-sm font-num-medium leading-[21px] tracking-wide">
                    {toFarsiNumber(product.id)}
                </div>
                <div 
                    onClick={(e) => { e.stopPropagation(); onToggle(product.id); }}
                    className={cn(
                    "w-4 h-4 relative rounded border flex items-center justify-center hover:bg-gray-100",
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
    loading?: boolean;
    onDelete?: (id: number | string) => void;
}

export function ProductTable({ products, loading = false, onDelete }: ProductTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [checkedIds, setCheckedIds] = useState<(number | string)[]>([]);
    const itemsPerPage = 8; 

    // Sort State
    type SortOption = 'id' | 'created_at' | 'updated_at';
    const [sortOption, setSortOption] = useState<SortOption>('id');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    // Close sort menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSortChange = (option: SortOption) => {
        if (sortOption === option) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortOption(option);
            setSortDirection('desc'); // Default to newest
        }
        setIsSortOpen(false);
        setCurrentPage(1);
    };

    const getSortLabel = (option: SortOption) => {
        switch(option) {
            case 'id': return 'شماره محصول';
            case 'created_at': return 'تاریخ ایجاد';
            case 'updated_at': return 'تاریخ ویرایش';
        }
    };

    const toggleId = (id: number | string) => {
        setCheckedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    // Filter Logic
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const filterRef = useRef<HTMLDivElement>(null);

    // Close filter when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [filterRef]);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Default scroll to right
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, [products]); // Re-run if products change (e.g. initial load)

    const handleFilterChange = (value: string) => {
        setSelectedFilters(prev => {
            if (prev.includes(value)) {
                return prev.filter(f => f !== value);
            } else {
                return [...prev, value];
            }
        });
        setCurrentPage(1);
    };

    const getFilterOptions = () => [
        { label: "موجود", value: "available" },
        { label: "ناموجود", value: "out_of_stock" },
        { label: "موجودی کم", value: "low_stock" },
    ];

    const filteredProducts = products.filter(product => {
        if (selectedFilters.length === 0) return true;
        
        // Check availability logic
        const count = typeof product.inventoryCount === 'string' ? parseInt(product.inventoryCount) : product.inventoryCount;
        
        if (selectedFilters.includes("available") && count > 10) return true;
        if (selectedFilters.includes("low_stock") && count > 0 && count <= 10) return true;
        if (selectedFilters.includes("out_of_stock") && count === 0) return true;
        
        return false;
    });

    // Sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        let valA: any = a[sortOption];
        let valB: any = b[sortOption];

        if (sortOption === 'id') {
             valA = Number(valA);
             valB = Number(valB);
        } else {
             // For dates (strings), ensure we handle empty strings
             valA = valA || '';
             valB = valB || '';
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    // Calculate total pages based on sorted (filtered) products
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    // Slice for current page
    const currentProducts = sortedProducts.slice(
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

    if (loading) {
        return (
            <div className="w-full flex-col justify-start items-center inline-flex" dir="rtl">
                 {/* Header Mock */}
                <div className="w-full h-[54px] px-3 bg-[#F8F9FB] border-b border-[#DFE1E7] flex justify-end items-center">
                     <div className="w-full flex justify-end gap-2 p-2">
                        <Skeleton className="h-4 w-24 ml-4" />
                        <Skeleton className="h-4 w-16 ml-4" />
                        <Skeleton className="h-4 w-16 ml-4" />
                        <Skeleton className="h-4 w-16 ml-4" />
                        <Skeleton className="h-4 w-32 ml-4" />
                     </div>
                </div>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-full h-16 px-[9px] border-b border-[#DFE1E7] flex justify-end items-center gap-4">
                        <div className="flex-1 flex justify-end gap-10 items-center">
                             <Skeleton className="h-6 w-20" />
                             <Skeleton className="h-6 w-20" />
                             <Skeleton className="h-6 w-20" />
                             <Skeleton className="h-6 w-20" />
                             <Skeleton className="h-6 w-32" />
                             <Skeleton className="h-6 w-8" />
                        </div>
                         <Skeleton className="h-4 w-4 rounded ml-2" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl border border-[#DFE1E7] flex flex-col justify-start items-end inline-flex mb-8">
            
            {/* Header */}
            <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
                <div className="flex justify-start items-center gap-2 relative" ref={filterRef}>
                    
                    {/* Sort Dropdown */}
                    <div className="relative" ref={sortRef}>
                         <div 
                            className={`w-8 h-8 px-0 py-0 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer transition-colors ${isSortOpen ? 'bg-gray-100 ring-2 ring-blue-100' : 'hover:bg-gray-50'}`}
                            onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
                        >
                            <ArrowUpDown className={`w-4 h-4 ${sortOption !== 'id' || sortDirection === 'asc' ? 'text-[#F7C61A]' : 'text-[#818898]'}`} />
                        </div>
                        {isSortOpen && (
                            <div className="absolute top-9 left-0 z-50 w-48 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-[#EFF0F2] p-2 flex flex-col gap-1 anim-fade-in" dir="rtl">
                                <div className="text-[#666D80] text-xs font-medium px-2 py-1 mb-1 border-b border-gray-100 text-right">
                                    مرتب‌سازی بر اساس
                                </div>
                                {(['id', 'created_at', 'updated_at'] as SortOption[]).map((opt) => (
                                    <div 
                                        key={opt}
                                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer"
                                        onClick={() => handleSortChange(opt)}
                                    >
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${sortOption === opt ? 'bg-[#F7C61A] border-[#F7C61A]' : 'border-[#DFE1E7] bg-white'}`}>
                                            {sortOption === opt && (
                                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`text-sm ${sortOption === opt ? 'text-[#0D0D12] font-semibold' : 'text-[#666D80] font-medium'}`}>
                                            {getSortLabel(opt)} {sortOption === opt && (sortDirection === 'asc' ? '(صعودی)' : '(نزولی)')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div 
                        className={`w-8 h-8 px-0 py-0 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer transition-colors ${isFilterOpen ? 'bg-gray-100 ring-2 ring-blue-100' : 'hover:bg-gray-50'}`}
                        onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
                    >
                        <Filter className={`w-4 h-4 ${selectedFilters.length > 0 ? 'text-[#F7C61A]' : 'text-[#818898]'}`} />
                    </div>

                    {/* Filter Dropdown */}
                    {isFilterOpen && (
                        <div className="absolute top-9 left-0 z-50 w-48 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-[#EFF0F2] p-2 flex flex-col gap-1 anim-fade-in" dir="rtl">
                            <div className="text-[#666D80] text-xs font-medium px-2 py-1 mb-1 border-b border-gray-100 text-right">
                                فیلتر بر اساس موجودی
                            </div>
                            {getFilterOptions().map((option) => (
                                <div 
                                    key={option.value}
                                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer"
                                    onClick={() => handleFilterChange(option.value)}
                                >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedFilters.includes(option.value) ? 'bg-[#F7C61A] border-[#F7C61A]' : 'border-[#DFE1E7] bg-white'}`}>
                                        {selectedFilters.includes(option.value) && (
                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </div>
                                    <span className={`text-sm ${selectedFilters.includes(option.value) ? 'text-[#0D0D12] font-semibold' : 'text-[#666D80] font-medium'}`}>
                                        {option.label}
                                    </span>
                                </div>
                            ))}
                            {selectedFilters.length > 0 && (
                                <div 
                                    className="text-center text-[#B21634] text-xs font-medium py-1.5 mt-1 border-t border-gray-100 cursor-pointer hover:bg-red-50 rounded-b-lg"
                                    onClick={() => setSelectedFilters([])}
                                >
                                    حذف فیلترها
                                </div>
                            )}
                        </div>
                    )}
                    <div className="w-8 h-8 p-2 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50">
                        <Search className="w-4 h-4 text-[#818898]" />
                    </div>
                </div>
                <div className="text-[#0D0D12] text-base font-semibold leading-normal tracking-wide">
                    جدول محصولات
                </div>
            </div>

            {/* Scrollable Container */}
            <div 
                ref={scrollContainerRef}
                className="w-full overflow-x-auto flex flex-col"
            >
                {/* Table Column Headers */}
                <div className="flex min-w-max px-[9px] bg-[#F6F8FA] border-b border-[#DFE1E7] justify-end items-center">
                    {/* 1. Empty for Icon */}
                    <div className="w-[44px] h-10 px-3 bg-[#F6F8FA]" />

                    {/* 2. Trend */}
                    <div className="w-[104px] h-10 px-3 bg-[#F6F8FA] flex justify-end items-center gap-2.5">
                        <div className="flex justify-start items-center gap-1.5">
                            <div className="text-[#666D80] text-sm font-semibold leading-[21px] tracking-wide">روند</div>
                        </div>
                    </div>

                    {/* 3. Inventory */}
                    <div className="w-[127px] h-10 px-3 bg-[#F6F8FA] flex justify-center items-center gap-2.5">
                        <div className="flex justify-start items-center gap-1.5">
                            <div className="text-center text-[#666D80] text-sm font-semibold leading-[21px] tracking-wide">موجودی</div>
                        </div>
                    </div>

                    {/* 4. Revenue */}
                    <div className="w-[140px] h-10 px-3 bg-[#F6F8FA] flex justify-center items-center gap-2.5">
                    <div className="flex justify-start items-center gap-1.5">
                            <div className="text-center text-[#666D80] text-sm font-semibold leading-[21px] tracking-wide">درآمد</div>
                        </div>
                    </div>

                    {/* 5. Sold */}
                    <div className="w-[138px] h-10 px-3 bg-[#F6F8FA] flex justify-center items-center gap-2.5">
                        <div className="flex justify-start items-center gap-1.5">
                            <div className="text-center text-[#666D80] text-sm font-semibold leading-[21px] tracking-wide">فروخته شده</div>
                        </div>
                    </div>

                    {/* 6. Product */}
                    <div className="w-[177px] h-10 px-3 bg-[#F6F8FA] flex justify-end items-center gap-2.5">
                        <div className="flex justify-start items-center gap-1.5">
                            <div className="text-right text-[#666D80] text-sm font-semibold leading-[21px] tracking-wide">محصول</div>
                        </div>
                    </div>

                    {/* 7. Number & Checkbox */}
                    <div className="w-20 h-10 px-3 bg-[#F6F8FA] flex justify-end items-center gap-2.5">
                        <div className="flex justify-start items-center gap-1.5">
                            <div className="text-[#666D80] text-sm font-semibold leading-[21px] tracking-wide">شماره</div>
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
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {/* Pagination Footer */}
            <div className="w-full px-5 py-4 flex justify-between items-center">
                <div className="text-center text-[#0D0D12] text-sm font-num-medium leading-[21px] tracking-wide">
                    صفحه {currentPage.toLocaleString('fa-IR')} از {totalPages.toLocaleString('fa-IR')}
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
                         <ChevronLeft className="w-5 h-5 text-[#0D0D12]" />
                    </button>

                    {/* Page Indicator */}
                    <div className="w-[55px] h-8 rounded-lg border border-[#DFE1E7] flex flex-col justify-center items-center gap-2">
                        <div className="flex flex-col justify-center text-[#0D0D12] text-xs font-num-medium leading-[18px] tracking-wide">
                             {currentPage.toLocaleString('fa-IR')}/{totalPages.toLocaleString('fa-IR')}
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
                         <ChevronRight className="w-5 h-5 text-[#0D0D12]" />
                    </button>
                </div>
            </div>

        </div>
    );
}



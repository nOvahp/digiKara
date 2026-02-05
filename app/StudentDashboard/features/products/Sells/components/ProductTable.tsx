"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal, Trash2, Edit, Search, Filter, ArrowUpDown } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/app/components/Skeleton";
// Use the interface from service which matches our updated mapping
import { Product } from '@/app/services/products/productsService';

interface ProductTableProps {
    products: Product[];
    loading?: boolean;
    onDelete?: (id: number | string) => void;
}

function toFarsiNumber(n: number | string | undefined): string {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

function formatPrice(price: string | number | undefined): string {
    if (!price) return '۰';
    const clean = String(price).replace(/\D/g, '');
    return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function ActionMenu({ onEdit, onDelete }: { onEdit: () => void, onDelete: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
            >
                <MoreHorizontal className="w-5 h-5" />
            </button>
            
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-[#EFF0F2] flex flex-col overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-100 origin-top-left" dir="rtl">
                        <div 
                        onClick={(e) => { e.stopPropagation(); setIsOpen(false); onEdit(); }}
                        className="px-3 py-2.5 hover:bg-gray-50 flex items-center gap-2 text-[#0D0D12] text-sm cursor-pointer transition-colors"
                        >
                        <Edit className="w-4 h-4" />
                        <span>ویرایش</span>
                        </div>
                        <div 
                        onClick={(e) => { e.stopPropagation(); setIsOpen(false); onDelete(); }}
                        className="px-3 py-2.5 hover:bg-red-50 flex items-center gap-2 text-red-500 text-sm cursor-pointer border-t border-gray-50 transition-colors"
                        >
                        <Trash2 className="w-4 h-4" />
                        <span>حذف</span>
                        </div>
                </div>
            )}
        </div>
    );
}

export function ProductTable({ products, loading = false, onDelete }: ProductTableProps) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');
    const [sortOption, setSortOption] = useState<string>('newest');

    const itemsPerPage = 8; 

    // Filter Logic
    const filteredProducts = products.filter(p => {
        const matchesSearch = (p.name && p.name.includes(searchQuery)) || (p.code && p.code.includes(searchQuery));
        const matchesStatus = statusFilter === 'all' 
            ? true 
            : statusFilter === 'approved' ? p.approved : !p.approved;
        return matchesSearch && matchesStatus;
    });

    // Sorting Logic
    const filteredAndSortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc': 
                return parseFloat(a.price || '0') - parseFloat(b.price || '0');
            case 'price-desc': 
                return parseFloat(b.price || '0') - parseFloat(a.price || '0');
            case 'sold-desc': 
                return (b.soldCount || 0) - (a.soldCount || 0);
            case 'oldest': 
                return a.id - b.id;
            case 'newest': 
            default: 
                return b.id - a.id;
        }
    });

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, sortOption]);

    // Calculate total pages based on filtered products
    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

    // Slice for current page
    const currentProducts = filteredAndSortedProducts.slice(
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
            <div className="w-full bg-white rounded-xl border border-[#DFE1E7] overflow-hidden">
                <div className="p-4 border-b border-[#DFE1E7] bg-gray-50/50">
                    <Skeleton className="h-6 w-32" />
                </div>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center p-4 border-b border-[#DFE1E7] gap-4">
                        <Skeleton className="w-12 h-12 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="w-full space-y-4" dir="rtl">
            
            {/* Search and Filters */}
            <div className="w-full flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-[#DFE1E7] shadow-sm">
                <div className="relative w-full lg:w-96">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="جستجو در محصولات..."
                        className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-[#DFE1E7] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 text-sm font-['PeydaWeb'] font-medium transition-all"
                    />
                </div>
                <div className="flex flex-row items-center gap-3 w-full lg:w-auto">
                    {/* Status Filter */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#DFE1E7] bg-white hover:bg-gray-50 transition-colors flex-1 sm:flex-none sm:w-[180px] relative">
                            <Filter className="w-4 h-4 text-gray-500 shrink-0" />
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as any)}
                                className="bg-transparent border-none outline-none text-sm font-['PeydaWeb'] font-medium text-[#0D0D12] cursor-pointer w-full appearance-none py-0.5 z-10"
                            >
                                <option value="all">همه وضعیت‌ها</option>
                                <option value="approved">تایید شده</option>
                                <option value="pending">در انتظار تایید</option>
                            </select>
                            <ChevronLeft className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>

                    {/* Sort Filter */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#DFE1E7] bg-white hover:bg-gray-50 transition-colors flex-1 sm:flex-none sm:w-[180px] relative">
                            <ArrowUpDown className="w-4 h-4 text-gray-500 shrink-0" />
                            <select 
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm font-['PeydaWeb'] font-medium text-[#0D0D12] cursor-pointer w-full appearance-none py-0.5 z-10"
                            >
                                <option value="newest">جدیدترین</option>
                                <option value="oldest">قدیمی‌ترین</option>
                                <option value="price-asc">ارزان‌ترین</option>
                                <option value="price-desc">گران‌ترین</option>
                                <option value="sold-desc">پرفروش‌ترین</option>
                            </select>
                            <ChevronLeft className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="w-full bg-white shadow-sm rounded-xl border border-[#DFE1E7] flex flex-col overflow-hidden mb-8">
                
                {/* Scrollable Table Container */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-right">
                    <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                        <tr>
                            <th className="px-4 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] w-[50px] text-center">#</th>
                            <th className="px-6 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] min-w-[300px]">محصول</th>
                            <th className="px-6 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] text-center whitespace-nowrap">قیمت (ریال)</th>
                            <th className="px-6 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] text-center whitespace-nowrap">موجودی</th>
                            <th className="px-6 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] text-center whitespace-nowrap">فروش</th>
                            <th className="px-6 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] text-center whitespace-nowrap">وضعیت</th>
                            <th className="px-6 py-4 w-[60px]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                        {filteredAndSortedProducts.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-['PeydaWeb']">
                                    هیچ محصولی با این مشخصات یافت نشد.
                                </td>
                            </tr>
                        ) : (
                            currentProducts.map((product, index) => (
                                <tr 
                                    key={product.id} 
                                    className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                                    onClick={() => router.push(`/StudentDashboard/EditeProducts?id=${product.id}`)}
                                >
                                    {/* Number */}
                                    <td className="px-4 py-4 text-center text-[#666D80] font-['PeydaFaNum'] font-medium">
                                        {toFarsiNumber((currentPage - 1) * itemsPerPage + index + 1)}
                                    </td>

                                    {/* Product */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0 bg-gray-50">
                                                {product.images?.[0] ? (
                                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1 min-w-0">
                                                <span className="text-[#0D0D12] font-semibold font-['PeydaWeb'] truncate" title={product.name}>
                                                    {product.name}
                                                </span>
                                                <span className="text-[#666D80] text-xs font-['Geist'] bg-gray-100 px-1.5 py-0.5 rounded w-fit">
                                                    {product.code || 'NK----'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-[#0D0D12] font-bold font-['PeydaFaNum'] text-sm">
                                            {toFarsiNumber(formatPrice(product.price))}
                                        </span>
                                    </td>

                                    {/* Inventory */}
                                    <td className="px-6 py-4 text-center">
                                        <span className={cn(
                                            "font-['PeydaFaNum'] font-medium text-sm px-2.5 py-1 rounded-full",
                                            product.inventoryCount === 0 ? "bg-red-50 text-red-600" : 
                                            product.inventoryCount < 10 ? "bg-amber-50 text-amber-600" : "text-[#0D0D12]"
                                        )}>
                                            {product.inventoryCount === 0 ? 'ناموجود' : toFarsiNumber(product.inventoryCount)}
                                        </span>
                                    </td>

                                    {/* Sold */}
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-[#666D80] font-['PeydaFaNum'] text-sm">
                                            {toFarsiNumber(product.soldCount)}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4 text-center">
                                        <span className={cn(
                                            "px-2.5 py-1 rounded-full text-xs font-medium font-['PeydaWeb'] border whitespace-nowrap",
                                            product.approved 
                                                ? "bg-[#ECFdf5] text-[#10B981] border-[#D1FAE5]" 
                                                : "bg-[#FEFCE8] text-[#EAB308] border-[#FEF9C3]"
                                        )}>
                                            {product.approved ? 'تایید شده' : 'در انتظار تایید'}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-left">
                                        <ActionMenu 
                                            onEdit={() => router.push(`/StudentDashboard/EditeProducts?id=${product.id}`)}
                                            onDelete={() => onDelete?.(product.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            {products.length > 0 && (
                <div className="w-full px-5 py-4 flex justify-between items-center border-t border-[#E5E7EB] bg-gray-50/30">
                    <div className="text-center text-[#666D80] text-sm font-num-medium leading-[21px] tracking-wide">
                        صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <button 
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={cn(
                                "w-9 h-9 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center transition-all",
                                currentPage === 1 ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:bg-white hover:shadow-sm hover:border-gray-300"
                            )}
                        >
                             <ChevronRight className="w-5 h-5 text-[#666D80]" />
                        </button>

                        <div className="h-9 min-w-[36px] px-3 bg-white rounded-lg border border-[#DFE1E7] flex items-center justify-center text-[#0D0D12] text-sm font-['PeydaFaNum'] font-medium">
                             {toFarsiNumber(currentPage)}
                        </div>

                        <button 
                             onClick={handleNextPage}
                             disabled={currentPage === totalPages}
                             className={cn(
                                "w-9 h-9 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center transition-all",
                                currentPage === totalPages ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:bg-white hover:shadow-sm hover:border-gray-300"
                             )}
                        >
                             <ChevronLeft className="w-5 h-5 text-[#666D80]" />
                        </button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}



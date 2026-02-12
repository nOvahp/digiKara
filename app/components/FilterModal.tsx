"use client"

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BazzarCategory } from '../services/bazzarService';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: BazzarCategory[];
    initialFilters: {
        minPrice: string;
        maxPrice: string;
        categoryId: number | null;
    };
    onApply: (filters: { minPrice: string; maxPrice: string; categoryId: number | null }) => void;
}

export default function FilterModal({ isOpen, onClose, categories, initialFilters, onApply }: FilterModalProps) {
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        if (isOpen) {
            setFilters(initialFilters);
        }
    }, [isOpen, initialFilters]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-[440px] bg-white rounded-t-3xl p-6 flex flex-col gap-6 animate-in slide-in-from-bottom duration-300">
                 {/* Header */}
                 <div className="flex justify-between items-center">
                     <h3 className="text-lg font-['PeydaWeb'] font-bold text-[#0C1415]">فیلترها</h3>
                     <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                         <X size={20} className="text-gray-500" />
                     </button>
                 </div>
                 
                 {/* Category Filter */}
                 <div className="flex flex-col gap-2">
                     <label className="text-sm font-['PeydaWeb'] font-semibold text-[#0C1415]">دسته بندی</label>
                     <div className="flex flex-wrap gap-2">
                         <button 
                             onClick={() => setFilters(prev => ({ ...prev, categoryId: null }))}
                             className={`px-3 py-1.5 rounded-lg text-xs font-['PeydaWeb'] border transition-colors ${!filters.categoryId ? 'bg-[#FDD00A] border-[#FDD00A] text-[#1A1C1E]' : 'border-gray-200 text-gray-500'}`}
                         >
                             همه
                         </button>
                         {categories.map((cat) => (
                             <button
                                 key={cat.id}
                                 onClick={() => setFilters(prev => ({ ...prev, categoryId: cat.category_id || cat.id }))} 
                                 className={`px-3 py-1.5 rounded-lg text-xs font-['PeydaWeb'] border transition-colors ${filters.categoryId === (cat.category_id || cat.id) ? 'bg-[#FDD00A] border-[#FDD00A] text-[#1A1C1E]' : 'border-gray-200 text-gray-500'}`}
                             >
                                 {cat.title}
                             </button>
                         ))}
                     </div>
                 </div>

                 {/* Price Range */}
                 <div className="flex flex-col gap-2">
                     <label className="text-sm font-['PeydaWeb'] font-semibold text-[#0C1415]">محدوده قیمت (ریال)</label>
                     <div className="flex items-center gap-4">
                         <div className="flex-1 flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400">حداقل</span>
                              <input 
                                type="number" 
                                value={filters.minPrice}
                                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                                className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm font-num-medium focus:outline-none focus:border-[#FDD00A] text-right"
                                placeholder="0"
                              />
                         </div>
                         <div className="flex-1 flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400">حداکثر</span>
                              <input 
                                type="number" 
                                value={filters.maxPrice}
                                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                                className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm font-num-medium focus:outline-none focus:border-[#FDD00A] text-right"
                                placeholder="مثلا 1000000"
                              />
                         </div>
                     </div>
                 </div>
                
                 {/* Actions */}
                 <div className="flex gap-3 mt-4">
                     <button 
                        onClick={() => setFilters({ minPrice: '', maxPrice: '', categoryId: null })}
                        className="flex-1 h-12 border border-gray-200 rounded-xl text-sm font-['PeydaWeb'] font-semibold text-gray-500 hover:bg-gray-50"
                     >
                         حذف فیلترها
                     </button>
                     <button
                        onClick={() => onApply(filters)}
                        className="flex-1 h-12 bg-[#FDD00A] rounded-xl text-sm font-['PeydaWeb'] font-semibold text-[#1A1C1E] hover:bg-[#EAC009]"
                     >
                         اعمال فیلتر
                     </button>
                 </div>
            </div>
        </div>
    );
}

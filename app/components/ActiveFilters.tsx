"use client"

import React from 'react';
import { X } from 'lucide-react';
import { BazzarCategory } from '../services/bazzarService';

interface ActiveFiltersProps {
    filters: {
        minPrice: string;
        maxPrice: string;
        categoryId: number | null;
    };
    categories: BazzarCategory[];
    onRemove: (key: "minPrice" | "maxPrice" | "categoryId") => void;
}

export default function ActiveFilters({ filters, categories, onRemove }: ActiveFiltersProps) {
    const activeFilters: { key: "minPrice" | "maxPrice" | "categoryId"; label: string; value: string | number }[] = [];

    // Category Filter
    if (filters.categoryId) {
        const category = categories.find(c => (c.category_id || c.id) === filters.categoryId);
        if (category) {
            activeFilters.push({
                key: 'categoryId',
                label: category.title,
                value: filters.categoryId
            });
        }
    }

    // Min Price Filter
    if (filters.minPrice) {
        activeFilters.push({
            key: 'minPrice',
            label: `از ${Number(filters.minPrice).toLocaleString()} تومان`,
            value: filters.minPrice
        });
    }

    // Max Price Filter
    if (filters.maxPrice) {
        activeFilters.push({
            key: 'maxPrice',
            label: `تا ${Number(filters.maxPrice).toLocaleString()} تومان`,
            value: filters.maxPrice
        });
    }

    if (activeFilters.length === 0) return null;

    return (
        <div className="w-full overflow-x-auto no-scrollbar py-1 px-4 flex items-center gap-2">
            {activeFilters.map((filter) => (
                <div 
                    key={`${filter.key}-${filter.value}`}
                    className="flex items-center gap-1 bg-white border border-[#D7D8DA] px-2 py-1.5 rounded-lg shadow-sm whitespace-nowrap"
                >
                    <span className="text-[#0C1415] text-[10px] font-['PeydaWeb']">{filter.label}</span>
                    <button 
                        onClick={() => onRemove(filter.key)}
                        className="p-0.5 hover:bg-gray-100 rounded-full transition-colors ml-1"
                    >
                        <X size={10} className="text-[#707F81]" />
                    </button>
                </div>
            ))}
            
            {activeFilters.length > 0 && (
                <button 
                    onClick={() => {
                        onRemove('minPrice');
                        onRemove('maxPrice');
                        onRemove('categoryId');
                    }}
                    className="text-[10px] text-red-500 font-medium mr-2 whitespace-nowrap"
                >
                    حذف همه
                </button>
            )}
        </div>
    );
}

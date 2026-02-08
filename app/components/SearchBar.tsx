"use client"

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
    initialValue?: string;
    placeholder?: string;
    onFilterClick?: () => void;
    extraParams?: Record<string, string | number | null>;
    onInputClick?: () => void;
    readOnly?: boolean;
}

export default function SearchBar({ initialValue = '', placeholder = 'جستجو', onFilterClick, extraParams, onInputClick, readOnly = false }: SearchBarProps) {
    const [query, setQuery] = useState(initialValue);
    const router = useRouter();

    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
             if (query.trim()) {
                 const params = new URLSearchParams();
                 params.append('q', query);
                 
                 if (extraParams) {
                     Object.entries(extraParams).forEach(([key, value]) => {
                         if (value !== null && value !== '' && value !== undefined) {
                             params.append(key, String(value));
                         }
                     });
                 }

                 router.push(`/Bazzar/Search?${params.toString()}`);
             }
        }
    };

    return (
        <div className="w-full flex gap-3" dir="rtl">
             <div 
                className="w-[48px] h-11 bg-[#FDD00A] rounded-lg shadow-sm flex items-center justify-center cursor-pointer hover:bg-[#EAC009] transition-colors"
                onClick={onFilterClick}
             >
                 {/* Filter Icon */}
                 <div className="flex flex-col justify-between items-center h-5 w-5 py-0.5">
                    <div className="w-full h-[2px] bg-[#393E46] rounded-full"></div>
                    <div className="w-[80%] h-[2px] bg-[#393E46] rounded-full"></div>
                    <div className="w-[60%] h-[2px] bg-[#393E46] rounded-full"></div>
                 </div>
             </div>
             <div className="flex-1 h-11 border border-[#D7D8DA] rounded-lg px-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 w-full">
                     <Search size={20} className="text-[#707F81] shrink-0" />
                     <input 
                         type="text"
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         onKeyDown={handleSearch}
                         onClick={onInputClick}
                         readOnly={readOnly}
                         placeholder={placeholder}
                         className="w-full h-full bg-transparent outline-none text-[#0C1415] text-sm font-['PeydaWeb'] font-light placeholder-[#707F81] cursor-pointer"
                     />
                  </div>
             </div>
        </div>
    );
}

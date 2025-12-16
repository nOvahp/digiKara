"use client"

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
    initialValue?: string;
    placeholder?: string;
}

export default function SearchBar({ initialValue = '', placeholder = 'جستجو' }: SearchBarProps) {
    const [query, setQuery] = useState(initialValue);
    const router = useRouter();

    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
             if (query.trim()) {
                 router.push(`/Bazzar/Search?q=${encodeURIComponent(query)}`);
             }
        }
    };

    return (
        <div className="w-full flex gap-3" dir="rtl">
             <div className="w-[48px] h-11 bg-[#FDD00A] rounded-lg shadow-sm flex items-center justify-center cursor-pointer">
                 {/* Filter Icon Mock */}
                 <div className="w-5 h-5 flex flex-col justify-between items-center py-1">
                     <div className="w-full h-[2px] bg-[#393E46] rounded-full"/>
                     <div className="w-[80%] h-[2px] bg-[#393E46] rounded-full"/>
                     <div className="w-[60%] h-[2px] bg-[#393E46] rounded-full"/>
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
                         placeholder={placeholder}
                         className="w-full h-full bg-transparent outline-none text-[#0C1415] text-sm font-['PeydaWeb'] font-light placeholder-[#707F81]"
                     />
                  </div>
             </div>
        </div>
    );
}

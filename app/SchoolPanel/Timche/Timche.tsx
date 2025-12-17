"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
    ChevronLeft,
    Search,
    Filter,
    Users,
    User,
    Calendar,
    Star,
    Wallet,
    Plus,
    TrendingUp
} from "lucide-react";

import { getTimches, TimcheItem } from "./TimcheStorage";

// Remove static timcheData array
/* const timcheData = ... */

const filterTabs = [
    { id: "all", label: "همه", active: true },
    { id: "active", label: "فعال", active: false },
    { id: "pending", label: "در انتظار", active: false },
    { id: "inactive", label: "غیرفعال", active: false },
    { id: "archive", label: "بایگانی", active: false }
];

const Timche = () => {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [timcheData, setTimcheData] = useState<TimcheItem[]>([]);

    React.useEffect(() => {
        setTimcheData(getTimches());
    }, []);

    return (
        <div className="w-full min-h-screen pb-12 pt-0 px-0 flex flex-col justify-start items-center gap-6" dir="rtl">
            
            {/* Header */}
            <div className="w-full pt-6 flex flex-col gap-3">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-right text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
                        مدیریت تیمچه ها
                    </h1>
                    <div onClick={() => router.back()} className="w-10 h-10 bg-white rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.25} />
                    </div>
                </div>
                
                {/* Add Timche Button */}
                <div onClick={() => router.push('/SchoolPanel/Timche/New')} className="w-full px-6 py-2 bg-[#FDD00A] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#e5c109] transition-colors">
                    <div className="text-center text-[#1A1C1E] text-[17.58px] font-['PeydaWeb'] font-semibold leading-[24.61px]">
                        افزودن تیمچه
                    </div>
                    <Plus className="w-6 h-6 text-[#0A0A0A]" strokeWidth={1.5} />
                </div>
            </div>

{/* Search & Filter */}
            <div className="w-full flex flex-col justify-center items-end gap-3">
                {/* Search Bar */}
                <div className="self-stretch flex justify-end items-start gap-1">
                    
                    <div className="flex-1 h-9 bg-white rounded-lg border border-[#DFE1E7] flex justify-start items-center">
                        <div className="pt-1.5 pb-1.5 pr-3 flex justify-end items-center gap-2.5">
                            <Search className="w-4 h-4 text-[#737373]" strokeWidth={1} />
                        </div>
                        <div className="flex-1 h-9 px-2 py-1 flex justify-start items-center gap-2.5">
                            <div className="opacity-50 text-[#737373] text-sm font-['PeydaWeb'] font-semibold leading-5">
                                جستوجو در تیمچه ها
                            </div>
                        </div>
                        <div className="pt-1.5 pb-1.5 pl-3 flex justify-end items-center gap-2.5">
                            <div className="text-[rgba(115,115,115,0.25)] text-sm font-num-medium leading-5">
                                ۱۲ نتیحه
                            </div>
                        </div>
                        
                        
                    </div>
                    <div className="w-9 self-stretch px-0 py-2 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2">
                        <Filter className="w-4 h-4 text-[#818898]" strokeWidth={1.33} />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="self-stretch flex justify-between items-center">
                    {filterTabs.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => setActiveFilter(tab.id)}
                            className={`h-8 px-4 rounded-xl border border-[#E5E5E5] shadow-[0px_1px_2px_rgba(0,0,0,0.10)] flex justify-center items-center gap-1.5 cursor-pointer ${
                                activeFilter === tab.id ? "bg-[#F7C61A]" : "bg-white"
                            }`}
                        >
                            <div className={`text-sm font-['PeydaWeb'] font-semibold leading-5 ${
                                activeFilter === tab.id ? "text-[#393E46]" : "text-[#737373]"
                            }`}>
                                {tab.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-3 w-full">
         {/* Orders */}
         {/* Orders */}
         <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
            <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
               <div className="self-stretch flex justify-start items-center gap-2.5">
                  <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide break-word">کل تیمچه‌ها</div>
               </div>
               <div className="self-stretch flex justify-start items-center gap-2">
                  <div className="w-full text-center text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px] break-word">3</div>
               </div>
            </div>
            <div className="self-stretch flex justify-start items-center gap-1">
               <div className="flex-1 text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide break-word">از ماه گذشته</div>
            </div>
         </div>

         {/* Active Teams */}
         {/* Active Teams */}
         <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
            <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
               <div className="self-stretch flex justify-start items-center gap-2.5">
                  <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide break-word">فروش کل (ریال)</div>
               </div>
               <div className="self-stretch flex justify-start items-center gap-2">
                  <div className="w-full text-center text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px] break-word">۱,۱۲۰,۰۴۵,۰۰۰ </div>
               </div>
            </div>
            <div className="self-stretch flex justify-start items-center gap-1">
               <div className="flex-1 text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide break-word">از ماه گذشته</div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center px-2 py-[1px] gap-0.5">
               <div className="text-[#28806F] text-[10px] font-num-medium font-semibold leading-[15px] tracking-wide break-word whitespace-nowrap">+3.6٪ </div>
            </div>
         </div>
      </div>

            {/* Timche List Title */}
            <div className="self-stretch flex justify-start items-center gap-20">
                <div className="text-center text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
                    تیمچه ها
                </div>
            </div>

            {/* Timche Cards */}
            <div className="w-full flex flex-col justify-start items-start gap-3">
                {timcheData.map((timche) => (
                    <div
                        key={timche.id}
                        className={`self-stretch p-3.5 rounded-xl border border-[#DCE4E8] flex flex-col justify-start items-center gap-3 ${
                            timche.status === "pending" ? "bg-[#FFF4DA]" : "bg-white"
                        }`}
                    >
                        <div className="self-stretch flex flex-col justify-start items-start gap-4">
                            <div className="self-stretch flex justify-start items-start gap-2.5">
                                {/* Image */}
                                <Image 
                                    src={timche.image} 
                                    alt={timche.title} 
                                    width={96} 
                                    height={200}
                                    className="h-full w-24 rounded-xl object-cover" 
                                />
                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-start items-start gap-4">
                                    {/* Title */}
                                    <div className="self-stretch flex flex-col justify-start items-start">
                                        <div className="self-stretch text-right flex flex-col justify-center text-[#0F172A] text-base font-['PeydaWeb'] font-semibold leading-relaxed tracking-wide break-words">
                                            {timche.title}
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="self-stretch flex flex-col justify-center items-end gap-1">
                                        {/* Row 1 */}
                                        <div className="self-stretch flex justify-between items-center">
                                            <div className="flex justify-start items-center gap-1.5">
                                                <User className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.25} />
                                                <div className="text-right text-[#0F172A] text-xs font-num-medium leading-tight tracking-wide">
                                                    {timche.manager}
                                                </div>
                                                
                                            </div>
                                            <div className="w-[100px] flex justify-start items-center gap-1.5">
                                                <Users className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.25} />
                                                <div className="text-right text-[#0F172A] text-xs font-num-medium leading-tight tracking-wide">
                                                    {timche.boothCount}
                                                </div>
                                                
                                            </div>
                                            
                                        </div>

                                        {/* Row 2 */}
                                        <div className="self-stretch flex justify-between items-center">
                                            <div className="flex justify-start items-center gap-1.5">
                                                <Star className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.25} />
                                                <div className="text-right text-[#0F172A] text-xs font-num-medium leading-tight tracking-wide">
                                                    {timche.performance}
                                                </div>
                                                
                                            </div>
                                            <div className="w-[100px] flex justify-start items-center gap-1.5">
                                                 <Calendar className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.25} />
                                                <div className="text-right text-[#0F172A] text-xs font-num-medium leading-tight tracking-wide">
                                                    {timche.lastUpdate}
                                                </div>
                                               
                                            </div>
                                            
                                        </div>

                                        {/* Row 3 - Sales */}
                                        <div className="h-6 flex justify-end items-center gap-1.5">
                                                <Wallet className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.25} />
                                                <div className="text-right flex flex-col justify-center text-[#0F172A] text-xs font-['PeydaWeb'] font-semibold leading-tight tracking-wide">
                                                    {timche.totalSales}
                                                </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                
                            </div>

                            {/* Action Buttons */}
                            <div className="self-stretch flex justify-start items-start gap-2.5">
                                <div className="w-[202px] h-[35px] px-6 py-3 bg-[#F7C61A] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer">
                                    <div className="text-center text-[#393E46] text-base font-['PeydaWeb'] font-semibold leading-snug">
                                        {timche.status === "pending" ? "بررسی" : "رصد وضعیت"}
                                    </div>
                                </div>
                                <div className={`flex-1 h-[35px] px-6 py-3 rounded-xl border border-[#DFE1E7] flex justify-center items-center gap-2.5 cursor-pointer ${
                                    timche.status === "pending" ? "bg-white" : ""
                                }`}>
                                    <div className="text-center text-[#393E46] text-base font-['PeydaWeb'] font-semibold leading-snug">
                                        {timche.status === "pending" ? "تائید اولیه" : "گزارش"}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>



        </div>
    );
};

export default Timche;

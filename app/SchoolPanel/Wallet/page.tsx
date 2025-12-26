"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
    Wallet,
    ArrowUpFromLine,
    ArrowDownToLine,
    MoreHorizontal,
    User,
    School,
    Users,
    LayoutGrid,
    Briefcase,
    Store,
    CreditCard,
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    Receipt
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { transactionsData } from "./wallet-data";
import TransactionCard from "./TransactionCard";

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

export default function WalletPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState<'all' | 'school' | 'student' | 'teacher'>('all');
    const itemsPerPage = 6; // Adjust number of items per page

    const filteredTransactions = activeFilter === 'all'
        ? transactionsData
        : transactionsData.filter(t => t.category === activeFilter);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

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

    const handleFilterChange = (filter: 'all' | 'school' | 'student' | 'teacher') => {
        setActiveFilter(filter);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    return (
        <div className="w-full min-h-screen pb-4 flex flex-col items-center pt-4 gap-6" dir="rtl">

            {/* Page Title */}
            <div className="w-full flex justify-between items-center">
                <h1 className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold">
                    کیف پول مدرسه
                </h1>
            </div>

            {/* Credit Card Section */}
            <div className="w-full relative overflow-hidden rounded-xl bg-gradient-to-tr from-[#17181C] to-[#444855] text-white p-4 shadow-[0px_25px_60px_-10px_rgba(28,39,49,0.12)] flex flex-col justify-start items-start gap-4">
                {/* Background decoration */}
                <div className="absolute left-[234px] top-[12px] w-[252px] h-[252px] opacity-5 pointer-events-none overflow-hidden">
                    <div className="absolute left-[105.39px] top-[105.51px] w-[121.41px] h-[121.49px] bg-white rounded-full opacity-50"></div>
                    <div className="absolute left-[32.16px] top-[32.32px] w-[187.24px] h-[186.92px] bg-white rounded-full opacity-30"></div>
                    <div className="absolute left-[25.20px] top-[25.20px] w-[121.39px] h-[121.28px] bg-white rounded-full opacity-60"></div>
                </div>

                <div className="w-full flex justify-end items-center gap-2 relative z-10">
                    <div className="text-right flex flex-col justify-center text-white text-sm font-['PeydaWeb'] font-semibold leading-[21.7px]">
                        کیف پول مدرسه هنرهای زیبا
                    </div>
                </div>

                <div className="w-full flex flex-col justify-start items-center relative z-10">
                    <div className="w-full flex justify-center items-center gap-3">
                        <div className="flex flex-col justify-center text-white text-lg font-['PeydaWeb'] font-light leading-[27.9px]">
                            ریال
                        </div>
                        <div className="flex flex-col justify-center text-white text-[32px] font-num-medium font-bold leading-[49.6px]">
                            {toFarsiNumber("2,434,770,000")}
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-between items-center relative z-10 text-center">
                    <div className="flex-1 flex justify-end items-center gap-2">
                        {/* Staff */}
                        <div className="flex-1 flex flex-col justify-start items-center gap-1">
                            <div className="w-full text-center flex flex-col justify-center text-white text-xs font-['PeydaWeb'] font-light leading-[18.6px]">
                                کادر آموزشی
                            </div>
                            <div className="w-full text-center flex flex-col justify-center">
                                <span className="text-white text-xs font-num-medium font-semibold leading-[18.6px]">{toFarsiNumber("432,760,000")}</span>
                                <span className="text-white text-[10px] font-num-medium font-light leading-[15.5px]">ریال</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-[31px] h-0 border-t border-white opacity-40 rotate-90 origin-center"></div>

                        {/* Students */}
                        <div className="flex-1 flex flex-col justify-start items-center gap-1">
                            <div className="w-full text-center flex flex-col justify-center text-white text-xs font-['PeydaWeb'] font-light leading-[18.6px]">
                                دانش آموزان
                            </div>
                            <div className="w-full text-center flex flex-col justify-center">
                                <span className="text-white text-xs font-num-medium font-semibold leading-[18.6px]">{toFarsiNumber("987,430,000")}</span>
                                <span className="text-white text-[10px] font-num-medium font-light leading-[15.5px]">ریال</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-[31px] h-0 border-t border-white opacity-40 rotate-90 origin-center"></div>

                        {/* School */}
                        <div className="flex-1 flex flex-col justify-start items-center gap-1">
                            <div className="w-full text-center flex flex-col justify-center text-white text-xs font-['PeydaWeb'] font-light leading-[18.6px]">
                                مدرسه
                            </div>
                            <div className="w-full text-center flex flex-col justify-center">
                                <span className="text-white text-xs font-num-medium font-semibold leading-[18.6px]">{toFarsiNumber("1,014,580,000")}</span>
                                <span className="text-white text-[10px] font-num-medium font-light leading-[15.5px]">ریال</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end items-start relative z-10">
                    <div className="flex-1 flex justify-end items-center gap-3">
                        <div className="text-center flex flex-col justify-center text-white text-xs font-['PeydaWeb'] font-light leading-[18.6px]">
                            شناسه کیف پول
                        </div>
                        <div className="flex flex-col justify-center text-white text-sm font-['Poppins'] font-semibold leading-[21.7px]">
                            SCZA2365
                        </div>

                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex gap-3">
                <button className="flex-1 h-[57px] bg-white border border-[#DFE1E7] rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                    <ArrowUpFromLine className="w-5 h-5 text-[#1A1C1E]" />
                    <span className="text-[#1A1C1E] text-sm font-semibold">خروجی از درآمد ها</span>
                </button>
                <button className="flex-1 h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-colors shadow-sm">
                    <ArrowDownToLine className="w-5 h-5 text-[#1A1C1E]" />
                    <span className="text-[#1A1C1E] text-sm font-semibold">برداشت از حساب</span>
                </button>
            </div>

            {/* Transactions Section */}
            <div className="w-full flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="text-[#0D0D12] text-lg font-semibold">جزئیات تراکنش ها</span>
                    <button className="text-[#818898] flex items-center gap-1 text-xs">
                        مشاهده همه
                        <ChevronLeft className="w-3 h-3" />
                    </button>
                </div>

                {/* Filter Badges */}
                <div className="w-full flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {/* All */}
                    <div
                        onClick={() => handleFilterChange('all')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-xl border border-[#818898] whitespace-nowrap cursor-pointer transition-colors",
                            activeFilter === 'all' ? "bg-[#FDD00A]" : "bg-white"
                        )}
                    >
                        <span className={cn("text-[#0D0D12] text-sm", activeFilter === 'all' && "font-semibold")}>همه</span>
                        <LayoutGrid className="w-4 h-4 text-[#0D0D12]" />
                    </div>
                    {/* School */}
                    <div
                        onClick={() => handleFilterChange('school')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-xl border border-[#818898] whitespace-nowrap cursor-pointer transition-colors",
                            activeFilter === 'school' ? "bg-[#FDD00A]" : "bg-white"
                        )}
                    >
                        <span className={cn("text-[#0D0D12] text-sm", activeFilter === 'school' && "font-semibold")}>مدرسه</span>
                        <School className="w-4 h-4 text-[#0D0D12]" />
                    </div>
                    {/* Students */}
                    <div
                        onClick={() => handleFilterChange('student')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-xl border border-[#818898] whitespace-nowrap cursor-pointer transition-colors",
                            activeFilter === 'student' ? "bg-[#FDD00A]" : "bg-white"
                        )}
                    >
                        <span className={cn("text-[#0D0D12] text-sm", activeFilter === 'student' && "font-semibold")}>دانش آموزان</span>
                        <Users className="w-4 h-4 text-[#0D0D12]" />
                    </div>
                    {/* Teachers */}
                    <div
                        onClick={() => handleFilterChange('teacher')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-1.5 rounded-xl border border-[#818898] whitespace-nowrap cursor-pointer transition-colors",
                            activeFilter === 'teacher' ? "bg-[#FDD00A]" : "bg-white"
                        )}
                    >
                        <span className={cn("text-[#0D0D12] text-sm", activeFilter === 'teacher' && "font-semibold")}>معلم</span>
                        <Briefcase className="w-4 h-4 text-[#0D0D12]" />
                    </div>
                </div>

                {/* Transaction Cards List */}
                <div className="flex flex-col gap-3">
                    {currentTransactions.map((transaction) => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="w-full px-5 py-2 flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={cn(
                                "w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center transition-colors",
                                (currentPage === totalPages || totalPages === 0) ? "opacity-50 cursor-not-allowed bg-gray-50 bg-opacity-50" : "hover:bg-gray-50 cursor-pointer"
                            )}
                        >
                            <ChevronRight className="w-5 h-5 text-[#0D0D12]" />
                        </button>
                        <div className="h-8 px-3 rounded-lg border border-[#DFE1E7] flex items-center justify-center text-[#0D0D12] text-xs font-num-medium opacity-100">
                            {toFarsiNumber(currentPage)}/{toFarsiNumber(totalPages || 1)}
                        </div>
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={cn(
                                "w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center transition-colors",
                                currentPage === 1 ? "opacity-50 cursor-not-allowed bg-gray-50 bg-opacity-50" : "hover:bg-gray-50 cursor-pointer"
                            )}
                        >
                            <ChevronLeft className="w-5 h-5 text-[#0D0D12]" />
                        </button>
                    </div>
                    <span className="text-[#0D0D12] text-sm font-num-medium">صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages || 1)}</span>
                </div>
            </div>
        </div>
    );
}

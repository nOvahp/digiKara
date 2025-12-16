"use client";
import React from 'react';
import { 
    Filter, 
    Search,
    BarChart3,
    MoreHorizontal, 
    ChevronRight, 
    ChevronLeft
} from 'lucide-react';
import { DashboardNavBar } from "../DashboardNavBar";
import { Navigation } from "../Navigation";

interface Order {
    id: string;
    customer: string;
    date: string;
    status: 'Completed' | 'Pending' | 'Cancelled';
    statusText: string;
    paymentMethod: string;
    amount: string;
}

const ordersData: Order[] = [
    { id: '#سفارش-۹۴۸۲', customer: 'سارا محمدی', date: '۱۹ آبان ۱۴۰۴', status: 'Completed', statusText: 'تکمیل شده', paymentMethod: 'کارت اعتباری', amount: '$۱۲۹.۰۰' },
    { id: '#سفارش-۹۴۸۳', customer: 'مایکل داوودی', date: '۲۰ آبان ۱۴۰۴', status: 'Pending', statusText: 'در انتظار', paymentMethod: 'پی پال', amount: '$۸۹.۵۰' },
    { id: '#سفارش-۹۴۸۴', customer: 'امیر حسینی', date: '۲۱ آبان ۱۴۰۴', status: 'Completed', statusText: 'تکمیل شده', paymentMethod: 'کارت نقدی', amount: '$۲۰۵.۷۵' },
    { id: '#سفارش-۹۴۸۵', customer: 'جیمز کریمی', date: '۲۲ آبان ۱۴۰۴', status: 'Cancelled', statusText: 'لغو شده', paymentMethod: 'کارت اعتباری', amount: '$۵۹.۹۹' },
    { id: '#سفارش-۹۴۸۶', customer: 'لیلا احمدی', date: '۲۳ آبان ۱۴۰۴', status: 'Completed', statusText: 'تکمیل شده', paymentMethod: 'اپل پی', amount: '$۴۵.۰۰' },
    { id: '#سفارش-۹۴۸۷', customer: 'رضا گودرزی', date: '۲۴ آبان ۱۴۰۴', status: 'Pending', statusText: 'در انتظار', paymentMethod: 'انتقال بانکی', amount: '$۱۵۰.۰۰' },
    { id: '#سفارش-۹۴۸۸', customer: 'مینا محمدی', date: '۲۵ آبان ۱۴۰۴', status: 'Completed', statusText: 'تکمیل شده', paymentMethod: 'کارت اعتباری', amount: '$۷۵.۲۵' },
    { id: '#سفارش-۹۴۸۹', customer: 'امیر یوسفی', date: '۲۶ آبان ۱۴۰۴', status: 'Cancelled', statusText: 'لغو شده', paymentMethod: 'کارت هدیه', amount: '$۰.۰۰' },
];

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'Completed':
            return { bg: 'bg-[#DDF3EF]', dot: 'bg-[#28806F]', text: 'text-[#28806F]' };
        case 'Pending':
            return { bg: 'bg-[#FFF9ED]', dot: 'bg-[#A77B2E]', text: 'text-[#A77B2E]' };
        case 'Cancelled':
            return { bg: 'bg-[#FCE8EC]', dot: 'bg-[#861127]', text: 'text-[#B21634]' };
        default:
            return { bg: 'bg-gray-100', dot: 'bg-gray-500', text: 'text-gray-500' };
    }
};

export default function ManageOrders() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 5;

    const totalPages = Math.ceil(ordersData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentOrders = ordersData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="w-full min-h-screen bg-white flex flex-col relative" dir="ltr">
            {/* Main Scrollable Content */}
            <div className="w-full h-full flex flex-col pb-[150px] gap-0">
                
                {/* Navbar - Sticky */}
                <div className="sticky top-0 z-40 w-full bg-white px-0 pt-0" dir="ltr">
                    <DashboardNavBar />
                </div>

                {/* Content - RTL */}
                <div className="w-full px-0 flex flex-col items-center gap-6" dir="rtl">
                    {/* Title & Action */}
                    <div className="w-full flex flex-col items-start gap-4 pr-0">
                        <h1 className="w-full text-END text-[#0D0D12] text-xl font-semibold font-['PeydaWeb']">مدیریت سفارشات</h1>
                        <button className="w-full h-[47px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors">
                            <span className="text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">خروجی از سفارشات</span>
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="w-full grid grid-cols-2 gap-3 px-0">
                        {/* Total Orders */}
                        <div className="w-full p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl border border-[#DFE1E7] flex flex-col gap-2.5">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-start items-center gap-2 min-w-0">
                                    <div className="w-9 h-9 bg-[#FFD369] rounded-lg shadow-inner flex items-center justify-center flex-shrink-0">
                                        <BarChart3 size={20} className="text-[#393E46]" />
                                    </div>
                                    <span className="text-right text-[#818898] text-sm font-semibold font-['PeydaWeb'] truncate">کل سفارشات</span>
                                </div>
                                <div className="flex items-center justify-end gap-2 w-full">
                                    <div className="px-2 py-0.5 bg-[#DDF3EF] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#28806F] text-xs font-semibold font-['PeydaWeb']">+۵.۳٪</span>
                                    </div>
                                    <span className="text-[#0D0D12] text-xl font-semibold font-['PeydaFaNum'] truncate" >۴,۲۸۰</span>
                                </div>
                            </div>
                            <span className="text-right text-[#818898] text-xs font-light font-['PeydaWeb'] truncate">از ماه گذشته</span>
                        </div>
                        {/* Total Revenue */}
                        <div className="w-full p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl border border-[#DFE1E7] flex flex-col gap-2.5">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-start items-center gap-2 min-w-0">
                                    <div className="w-9 h-9 bg-[#FFD369] rounded-lg shadow-inner flex items-center justify-center flex-shrink-0">
                                        <BarChart3 size={20} className="text-[#393E46]" />
                                    </div>
                                    <span className="text-right text-[#818898] text-sm font-semibold font-['PeydaWeb'] truncate">کل درآمد</span>
                                </div>
                                <div className="flex items-center justify-end gap-2 w-full">
                                    <div className="px-2 py-0.5 bg-[#DDF3EF] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#28806F] text-xs font-semibold font-['PeydaWeb']">+۶.۷٪</span>
                                    </div>
                                    <span className="text-[#0D0D12] text-xl font-semibold font-['PeydaFaNum'] truncate" dir="rtl">$۴۸۲,۶۰۰</span>
                                </div>
                            </div>
                            <span className="text-right text-[#818898] text-xs font-light font-['PeydaWeb'] truncate">از ماه گذشته</span>
                        </div>
                        {/* Pending Orders */}
                        <div className="w-full p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl border border-[#DFE1E7] flex flex-col gap-2.5">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-start items-center gap-2 min-w-0">
                                    <div className="w-9 h-9 bg-[#FFD369] rounded-lg shadow-inner flex items-center justify-center flex-shrink-0">
                                        <BarChart3 size={20} className="text-[#393E46]" />
                                    </div>
                                    <span className="text-right text-[#818898] text-sm font-semibold font-['PeydaWeb'] truncate">سفارشات در انتظار</span>
                                </div>
                                <div className="flex items-center justify-end gap-2 w-full">
                                    <div className="px-2 py-0.5 bg-[#FFF0F3] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#DF1C41] text-xs font-semibold font-['PeydaWeb']">−۲.۱٪</span>
                                    </div>
                                    <span className="text-[#0D0D12] text-xl font-semibold font-['PeydaFaNum'] truncate" dir="rtl">۱۲۴</span>
                                </div>
                            </div>
                            <span className="text-right text-[#818898] text-xs font-light font-['PeydaWeb'] truncate">از ماه گذشته</span>
                        </div>
                        {/* Shipped Orders */}
                        <div className="w-full p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl border border-[#DFE1E7] flex flex-col gap-2.5">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-start items-center gap-2 min-w-0">
                                    <div className="w-9 h-9 bg-[#FFD369] rounded-lg shadow-inner flex items-center justify-center flex-shrink-0">
                                        <BarChart3 size={20} className="text-[#393E46]" />
                                    </div>
                                    <span className="text-right text-[#818898] text-sm font-semibold font-['PeydaWeb'] truncate">ارسال شده</span>
                                </div>
                                <div className="flex items-center justify-end gap-2 w-full">
                                    <div className="px-2 py-0.5 bg-[#DDF3EF] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-[#28806F] text-xs font-semibold font-['PeydaWeb']">+۴.۸٪</span>
                                    </div>
                                    <span className="text-[#0D0D12] text-xl font-semibold font-['PeydaFaNum'] truncate" dir="rtl">۳,۹۸۰</span>
                                </div>
                            </div>
                            <span className="text-right text-[#818898] text-xs font-light font-['PeydaWeb'] truncate">از ماه گذشته</span>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="w-full bg-white rounded-xl border border-[#DFE1E7] shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] overflow-hidden flex flex-col mx-4">
                         {/* Toolbar */}
                        <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
                             <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] tracking-wide">
                                 جدول سفارشات
                             </div>
                             <div className="flex items-center gap-2">
                                 <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#DFE1E7] bg-white text-[#818898]">
                                    <Filter size={16} />
                                </div>
                                 <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#DFE1E7] bg-white text-[#818898]">
                                    <Search size={16} />
                                </div>
                             </div>
                        </div>
                    
                        {/* Scrollable Content */}
                        <div className="w-full overflow-x-auto no-scrollbar">
                            <div className="min-w-[1120px]">
                                {/* Header Row */}
                                <div className="w-full h-10 bg-[#F6F8FA] border-b border-[#DFE1E7] flex items-center px-[9px]">
                                    <div className="flex-1 h-10 px-3 flex items-center justify-start gap-2.5">
                                        <div className="w-4 h-4 rounded border border-[#DFE1E7] bg-white"></div>
                                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">شناسه سفارش</span>
                                    </div>
                                    <div className="flex-1 h-10 px-3 flex items-center justify-center gap-1.5">
                                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">مشتری</span>
                                    </div>
                                    <div className="flex-1 h-10 px-3 flex items-center justify-center gap-1.5">
                                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">تاریخ</span>
                                    </div>
                                    <div className="flex-1 h-10 px-3 flex items-center justify-center gap-1.5">
                                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">وضعیت</span>
                                    </div>
                                    <div className="flex-1 h-10 px-3 flex items-center justify-center gap-1.5">
                                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">پرداخت</span>
                                    </div>
                                    <div className="flex-1 h-10 px-3 flex items-center justify-center gap-1.5">
                                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">مجموع</span>
                                    </div>
                                    <div className="w-11 h-10 px-3 bg-[#F6F8FA]"></div> 
                                </div>
                                
                                {/* Rows */}
                                {currentOrders.map((order, idx) => {
                                    const styles = getStatusStyles(order.status);
                                    return (
                                        <div key={idx} className="w-full h-16 bg-white border-b border-[#DFE1E7] flex items-center px-[9px] hover:bg-gray-50 transition-colors">
                                            {/* Order ID */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-start gap-2.5">
                                                <div className="w-4 h-4 rounded border border-[#DFE1E7] bg-white cursor-pointer"></div>
                                                <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">{order.id}</span>
                                            </div>

                                            {/* Customer */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-center">
                                                <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">{order.customer}</span>
                                            </div>

                                            {/* Date */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-center">
                                                <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">{order.date}</span>
                                            </div>

                                            {/* Status */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-center">
                                                <div className={`h-5 px-2 py-0.5 rounded-2xl flex items-center gap-1 ${styles.bg}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                                                    <span className={`text-xs font-normal font-['PeydaFaNum'] ${styles.text}`}>{order.statusText}</span>
                                                </div>
                                            </div>

                                            {/* Payment */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-center">
                                                <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">{order.paymentMethod}</span>
                                            </div>

                                            {/* Amount */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-center">
                                                <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">{order.amount}</span>
                                            </div>

                                            {/* Actions */}
                                            <div className="w-11 h-16 px-3 flex items-center justify-center">
                                                 <div className="w-5 h-5 flex items-center justify-center text-[#666D80] cursor-pointer">
                                                    <MoreHorizontal size={20} />
                                                 </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                         {/* Footer / Pagination */}
                        <div className="w-full h-[64px] px-5 py-4 flex justify-between items-center bg-white border-t border-[#DFE1E7]">
                             <div className="flex items-center gap-2">
                                 <button 
                                     onClick={handlePrevPage}
                                     disabled={currentPage === 1}
                                     className="w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                     <ChevronRight size={16} className="text-[#0D0D12]" />
                                 </button>
                                 <div className="w-[55px] h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center bg-white">
                                     <span className="text-[#0D0D12] text-xs font-medium font-['Geist']">{currentPage.toLocaleString('fa-IR')}/{totalPages.toLocaleString('fa-IR')}</span>
                                 </div>
                                 <button 
                                     onClick={handleNextPage}
                                     disabled={currentPage === totalPages}
                                     className="w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                     <ChevronLeft size={16} className="text-[#0D0D12]" />
                                 </button>
                             </div>
                             <div className="text-[#0D0D12] text-sm font-medium font-['Geist']">
                                 صفحه {currentPage.toLocaleString('fa-IR')} از {totalPages.toLocaleString('fa-IR')}
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div dir="ltr">
                <Navigation />
            </div>
        </div>
    );
}

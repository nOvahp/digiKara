"use client";
import React from 'react';
import Image from 'next/image';
import { Star, MoreHorizontal, ChevronRight, ChevronLeft, Check, Search, Filter } from 'lucide-react';

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

interface Comment {
    id: number;
    user: string;
    product: string;
    review: string;
    date: string;
    status: 'Published' | 'Pending' | 'Approved' | 'Production' | 'Testing';
    statusText: string;
    rating: number;
}

const commentsData: Comment[] = [
    { id: 1, user: 'مهدی احمدی', product: 'عسل آویشن ارگانیک', review: 'طعم بی‌نظیر و خواص فراوان!', date: '21 آبان 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 2, user: 'فاطمه کریمی', product: 'عسل آویشن ارگانیک', review: 'بافت عالی و عطر دلپذیر!', date: '22 آبان 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 3, user: 'احسان یزدی', product: 'عسل آویشن ارگانیک', review: 'مناسب برای تقویت سیستم ایمنی!', date: '23 آبان 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 4, user: 'سارا نیک‌فر', product: 'عسل آویشن ارگانیک', review: 'بهترین انتخاب برای صبحانه!', date: '24 آبان 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 5, user: 'علی حسینی', product: 'عسل آویشن ارگانیک', review: 'طبیعی و بدون مواد افزودنی!', date: '25 آبان 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 6, user: 'نرگس رستمی', product: 'موم عسل طبیعی', review: 'سرشار از ویتامین‌ها و مواد معدنی!', date: '26 آبان 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 7, user: 'امیرعباس مصلحی', product: 'موم عسل طبیعی', review: 'درمان طبیعی برای سرماخوردگی!', date: '27 آبان 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 8, user: 'آرش کمانگر', product: 'موم عسل طبیعی', review: 'انرژی‌زا و مقوی!', date: '28 آبان 1404', status: 'Pending', statusText: 'در حال بررسی', rating: 5 },
    { id: 9, user: 'مینا راد', product: 'عصاره چای سبز', review: 'خواص شگفت‌انگیز!', date: '1 آذر 1404', status: 'Approved', statusText: 'تأیید شده', rating: 5 },
    { id: 10, user: 'پیمان مقیمی', product: 'روغن زیتون بکر', review: 'طبیعی و خالص!', date: '5 آذر 1404', status: 'Production', statusText: 'در حال تولید', rating: 5 },
    { id: 11, user: 'لیلا دانشمند', product: 'پودر کتان', review: 'مؤثر در سلامتی!', date: '10 آذر 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 12, user: 'رضا بختیاری', product: 'عصاره آلوئه ورا', review: 'مناسب برای تمام سنین!', date: '15 آذر 1404', status: 'Testing', statusText: 'در حال آزمایش', rating: 5 },
    { id: 13, user: 'الهام فردوسی', product: 'پودر زردچوبه', review: 'تقویت‌کننده ایمنی!', date: '20 آذر 1404', status: 'Approved', statusText: 'تأیید شده', rating: 5 },
    { id: 14, user: 'بهنام سهرابی', product: 'عصاره توت‌فرنگی', review: 'حاوی آنتی‌اکسیدان!', date: '25 آذر 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 15, user: 'مریم گلی', product: 'عسل آویشن ارگانیک', review: 'عالی بود', date: '1 دی 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 16, user: 'علی رضا', product: 'موم عسل طبیعی', review: 'خیلی خوب', date: '2 دی 1404', status: 'Pending', statusText: 'در حال بررسی', rating: 4 },
    { id: 17, user: 'سحر تهرانی', product: 'عصاره چای سبز', review: 'خوشمزه', date: '3 دی 1404', status: 'Approved', statusText: 'تأیید شده', rating: 5 },
    { id: 18, user: 'محمد موسوی', product: 'روغن زیتون بکر', review: 'راضی بودم', date: '4 دی 1404', status: 'Production', statusText: 'در حال تولید', rating: 5 },
    { id: 19, user: 'زهرا پناهی', product: 'پودر کتان', review: 'بد نبود', date: '5 دی 1404', status: 'Published', statusText: 'منتشر شده', rating: 3 },
    { id: 20, user: 'امید زند', product: 'عصاره آلوئه ورا', review: 'پیشنهاد میکنم', date: '6 دی 1404', status: 'Testing', statusText: 'در حال آزمایش', rating: 5 },
    { id: 21, user: 'نسیم شاد', product: 'پودر زردچوبه', review: 'کیفیت بالا', date: '7 دی 1404', status: 'Approved', statusText: 'تأیید شده', rating: 5 },
    { id: 22, user: 'کامران نیما', product: 'عصاره توت‌فرنگی', review: 'خوب', date: '8 دی 1404', status: 'Published', statusText: 'منتشر شده', rating: 4 },
    { id: 23, user: 'نازنین بیاتی', product: 'عسل آویشن ارگانیک', review: 'عالی برای صبحانه', date: '9 دی 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 24, user: 'کیانوش رستمی', product: 'موم عسل طبیعی', review: 'بسیار با کیفیت', date: '10 دی 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
    { id: 25, user: 'هستی مهدوی', product: 'عصاره چای سبز', review: 'تازه و خوش عطر', date: '11 دی 1404', status: 'Approved', statusText: 'تأیید شده', rating: 5 },
    { id: 26, user: 'پارسا پیروز', product: 'روغن زیتون بکر', review: 'بکر و عالی', date: '12 دی 1404', status: 'Production', statusText: 'در حال تولید', rating: 5 },
    { id: 27, user: 'طناز طباطبایی', product: 'پودر کتان', review: 'خوب بود', date: '13 دی 1404', status: 'Published', statusText: 'منتشر شده', rating: 4 },
    { id: 28, user: 'نوید محمدزاده', product: 'عصاره آلوئه ورا', review: 'راضی هستم', date: '14 دی 1404', status: 'Testing', statusText: 'در حال آزمایش', rating: 5 },
    { id: 29, user: 'پریناز ایزدیار', product: 'پودر زردچوبه', review: 'رنگ عالی', date: '15 دی 1404', status: 'Approved', statusText: 'تأیید شده', rating: 5 },
    { id: 30, user: 'بهرام رادان', product: 'عصاره توت‌فرنگی', review: 'طعم واقعی', date: '16 دی 1404', status: 'Published', statusText: 'منتشر شده', rating: 5 },
];

const getStatusStyles = (status: string) => {
    switch (status) {
        case 'Published':
        case 'Approved':
            return { bg: 'bg-[#DDF3EF]', dot: 'bg-[#28806F]', text: 'text-[#28806F]' };
        case 'Pending':
            return { bg: 'bg-[#FFF4E3]', dot: 'bg-[#FDB022]', text: 'text-[#B54708]' };
        case 'Production':
             return { bg: 'bg-[#DDF3EF]', dot: 'bg-[#28806F]', text: 'text-[#28806F]' };
        case 'Testing':
             return { bg: 'bg-[#DDF3EF]', dot: 'bg-[#28806F]', text: 'text-[#28806F]' };
        default:
            return { bg: 'bg-[#DDF3EF]', dot: 'bg-[#28806F]', text: 'text-[#28806F]' };
    }
};

export default function UserComments() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 11;
    const totalPages = Math.ceil(commentsData.length / itemsPerPage);

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

    const currentData = commentsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="w-full flex flex-col items-center py-8 px-4 gap-6 bg-transparent">
            {/* Header */}
            <div className="w-full flex flex-col items-end gap-4">
                <div className="text-center text-[#0D0D12] text-xl font-semibold leading-[27px]">
                    نظرات کاربران
                </div>
            </div>

            {/* Table Container */}
            <div className="w-full flex flex-col gap-6">
                <div className="w-full bg-white rounded-xl border border-[#DFE1E7] shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] overflow-hidden flex flex-col">
                    
                    {/* Table Header / Toolbar */}
                    <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
                         <div className="flex items-center gap-2">
                            {/* Icons mimicking the snippet's look */}
                             <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#DFE1E7] bg-white text-[#818898]">
                                <Filter size={16} />
                            </div>
                             <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#DFE1E7] bg-white text-[#818898]">
                                <Search size={16} />
                            </div>
                         </div>
                         <div className="text-[#0D0D12] text-base font-semibold tracking-wide">
                             جدول نظرات
                         </div>
                    </div>

                    {/* Scrollable Table Content */}
                    <div className="w-full overflow-x-auto no-scrollbar">
                        <div className="min-w-[1120px]">
                            {/* Table Columns Header */}
                            <div className="w-full h-10 bg-[#F6F8FA] border-b border-[#DFE1E7] flex items-center px-[9px]">
                                <div className="w-11 h-10 px-3 bg-[#F6F8FA]"></div> {/* Empty/Action */}
                                
                                 <div className="flex-1 h-10 px-3 flex items-center justify-center gap-2.5">
                                    <span className="text-[#666D80] text-sm font-semibold">وضعیت</span>
                                </div>
                                <div className="flex-1 h-10 px-3 flex items-center justify-center gap-2.5">
                                    <span className="text-[#666D80] text-sm font-semibold">امتیاز</span>
                                </div>
                                 <div className="flex-1 h-10 px-3 flex items-center justify-end gap-2.5">
                                    <span className="text-[#666D80] text-sm font-semibold">تاریخ</span>
                                </div>
                                 <div className="w-[248px] h-10 px-3 flex items-center justify-end gap-2.5">
                                    <span className="text-[#666D80] text-sm font-semibold">بررسی</span>
                                </div>
                                <div className="w-[200px] h-10 px-3 flex items-center justify-end gap-2.5">
                                    <span className="text-[#666D80] text-sm font-semibold">محصول</span>
                                </div>
                                <div className="w-[200px] h-10 px-3 flex items-center justify-end gap-2.5">
                                    <span className="text-[#666D80] text-sm font-semibold">کاربر</span>
                                    <div className="w-4 h-4 rounded border border-[#DFE1E7] bg-white ml-2"></div>
                                </div>
                            </div>

                            {/* Table Rows */}
                            <div>
                                {currentData.map((comment, index) => {
                                    const styles = getStatusStyles(comment.status);
                                    return (
                                        <div key={comment.id} className="w-full flex items-center px-[9px] border-b border-[#DFE1E7] bg-white hover:bg-gray-50 transition-colors">
                                            {/* Action/More Icon */}
                                            <div className="h-16 px-3 flex items-center justify-start gap-2">
                                                <div className="w-5 h-5 relative flex items-center justify-center cursor-pointer text-[#666D80]">
                                                     <MoreHorizontal size={20} />
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-center gap-1.5">
                                                <div className={`h-5 px-2 py-0.5 rounded-2xl flex items-center gap-1 ${styles.bg}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                                                    <span className={`text-xs font-num-medium ${styles.text}`}>{comment.statusText}</span>
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-start gap-0.5" dir="ltr">
                                                 {[...Array(5)].map((_, i) => (
                                                     <Star key={i} className="w-4 h-4 fill-[#FFBE4C] text-[#FFBE4C]" />
                                                 ))}
                                            </div>

                                            {/* Date */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-end gap-2.5">
                                                <span className="text-[#0D0D12] text-sm font-num-medium">{toFarsiNumber(comment.date)}</span>
                                            </div>

                                            {/* Review */}
                                            <div className="w-[248px] h-16 px-3 flex items-center justify-end gap-2.5">
                                                <span className="text-[#0D0D12] text-sm font-semibold truncate text-right w-full" dir="rtl">
                                                    “{comment.review}”
                                                </span>
                                            </div>

                                            {/* Product */}
                                            <div className="w-[200px] h-16 px-3 flex items-center justify-end gap-2.5">
                                                <span className="text-[#0D0D12] text-sm font-semibold truncate text-right w-full" dir="rtl">
                                                    {comment.product}
                                                </span>
                                            </div>

                                            {/* User */}
                                            <div className="w-[200px] h-16 px-3 flex items-center justify-end gap-2.5 text-right">
                                                <div className="flex flex-col items-end gap-0.5 flex-1">
                                                    <span className="text-[#0D0D12] text-sm font-semibold truncate">
                                                        {comment.user}
                                                    </span>
                                                </div>
                                                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
                                                    <Image src="/Avatar.png" alt={comment.user} layout="fill" objectFit="cover" />
                                                </div>
                                                <div className="w-4 h-4 rounded border border-[#DFE1E7] bg-white cursor-pointer ml-2"></div>
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Pagination */}
                    <div className="w-full h-[60px] px-5 py-4 flex justify-between items-center border-t border-[#DFE1E7] bg-white">
                         <div className="text-[#0D0D12] text-sm font-num-medium">
                             صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}
                         </div>
                         <div className="flex items-center gap-2">
                             <button 
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center bg-white transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                             >
                                 <ChevronLeft size={16} className="text-[#0D0D12]" />
                             </button>
                             <div className="h-8 px-3 rounded-lg border border-[#DFE1E7] flex items-center justify-center bg-white">
                                 <span className="text-[#0D0D12] text-xs font-num-medium">{toFarsiNumber(currentPage)}/{toFarsiNumber(totalPages)}</span>
                             </div>
                             <button 
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center bg-white transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                             >
                                 <ChevronRight size={16} className="text-[#0D0D12]" />
                             </button>
                         </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

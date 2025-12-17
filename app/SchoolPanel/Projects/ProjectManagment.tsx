"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
    MoreHorizontal, 
    ChevronLeft,
    ChevronRight,
    Search,
    Filter,
    Clock,
    Store,
    User,
    Users,
    Check,
    X,
    Plus,
} from "lucide-react";
import { products, Product } from "../Reports/product"; // Reusing mock data for now
import ProductPopUp from "../Reports/ProductPopUp";

const filterTabs = [
    { id: "all", label: "همه" },
    { id: "active", label: "فعال" },
    { id: "pending", label: "در انتظار" },
    { id: "inactive", label: "غیرفعال" },
    { id: "archive", label: "بایگانی" }
];

const ProjectManagment = () => {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("all");
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [isProductPopUpOpen, setIsProductPopUpOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsProductPopUpOpen(true);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    return (
        <div className="w-full min-h-screen pb-12 pt-5 px-0 flex flex-col justify-start items-center gap-6" dir="rtl">
            
            {/* Hero / Header */}
            <div className="w-full max-w-[1200px] px-4 flex justify-between items-center">
                <h1 className="text-center text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
                    مدیریت پروژه ها
                </h1>
                 <div onClick={() => router.back()} className="w-10 h-10 bg-white rounded-full border border-[rgba(8,11,17,0.10)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
                </div>
                
            </div>
            {/* Add Timche Button */}
                <div onClick={() => router.push('/SchoolPanel/Timche/New')} className="w-full px-6 py-2 bg-[#FDD00A] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#e5c109] transition-colors">
                    <div className="text-center text-[#1A1C1E] text-[17.58px] font-['PeydaWeb'] font-semibold leading-[24.61px]">
                        افزودن پروژه جدید
                    </div>
                    <Plus className="w-6 h-6 text-[#0A0A0A]" strokeWidth={1.5} />
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

            {/* Recent Requests Section */}
            <div className="w-full flex flex-col items-end gap-3">
                <div className="w-full flex justify-between items-center">
                     <div className="text-center text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold leading-[21.6px]">بررسی و تائید درخواست های اخیر</div>
                    <div className="text-right text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold">همه درخواست ها</div>
                   
                </div>

                {/* Card 1 */}
                <div className="w-full p-3.5 rounded-xl outline outline-1 outline-[#DCE4E8] -outline-offset-1 flex flex-col gap-3 bg-white">
                    <div className="w-full flex justify-start items-start gap-4">
                        {/* Image */}
                        <div className="w-24 h-[78px] relative rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            {/* Placeholder for image */}
                            <Image src="/tform.png" alt="table" fill className="object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col gap-4">
                             <div className="w-full text-right text-[#0F172A] text-base font-['PeydaWeb'] font-semibold leading-[26.4px] tracking-wide">
                                ساخت میز چوبی
                             </div>
                             
                             <div className="w-full flex flex-col gap-1">
                                 {/* Row 1 */}
                                 <div className="w-full flex justify-between items-center">
                                      <div className="flex items-center gap-1.5">
                                         <Store className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px]">تیمچه نجاری</span>
                                     </div>
                                     <div className="w-[100px] flex items-center gap-1.5">
                                         <Clock className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px] tracking-wide">14:30 امروز</span>
                                     </div>
                                    
                                 </div>
                                 
                                 {/* Row 2 */}
                                 <div className="w-full flex justify-between items-center">
                                     <div className="flex items-center gap-1.5">
                                         <Users className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px]">4 هنرجو</span>
                                     </div>
                                     <div className="w-[100px] flex items-center gap-1.5">
                                         <User className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px] tracking-wide">مهندس رضایی</span>
                                     </div>
                                     
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full flex items-center gap-2.5">
                         <div className="flex-1 h-[35px] bg-[#FDD00A] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#e5c109]">
                             <span className="text-[#393E46] text-base font-['PeydaWeb'] font-semibold">مشاهده جزئیات کامل</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-[35px] h-[35px] bg-[#64B327] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#529320]">
                                <Check className="w-4 h-4 text-[#0A0A0A]" strokeWidth={2.5} />
                            </div>
                            <div className="w-[35px] h-[35px] bg-[#D54141] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#c33a3a]">
                                <X className="w-4 h-4 text-[#0A0A0A]" strokeWidth={2.5} />
                            </div>
                        </div>
                       
                    </div>
                </div>

                {/* Card 2 */}
                <div className="w-full p-3.5 rounded-xl outline outline-1 outline-[#DCE4E8] -outline-offset-1 flex flex-col gap-3 bg-white">
                    <div className="w-full flex justify-start items-start gap-4">
                        {/* Image */}
                        <div className="w-24 h-[78px] relative rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image src="/tform.png" alt="furniture" fill className="object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col gap-4">
                             <div className="w-full text-right text-[#0F172A] text-base font-['PeydaWeb'] font-semibold leading-[26.4px] tracking-wide">
                                طراحی مبلمان مدرن
                             </div>
                             
                             <div className="w-full flex flex-col gap-1">
                                 {/* Row 1 */}
                                 <div className="w-full flex justify-between items-center">
                                      <div className="flex items-center gap-1.5">
                                         <Store className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px]">تیمچه گرافیک</span>
                                     </div>
                                     <div className="w-[100px] flex items-center gap-1.5">
                                         <Clock className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px] tracking-wide">16:00 امروز</span>
                                     </div>
                                    
                                 </div>
                                 
                                 {/* Row 2 */}
                                 <div className="w-full flex justify-between items-center">
                                     <div className="flex items-center gap-1.5">
                                         <Users className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px]">5 هنرجو</span>
                                     </div>
                                     <div className="w-[100px] flex items-center gap-1.5">
                                         <User className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px] tracking-wide">مهندس فلاحی</span>
                                     </div>
                                     
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full flex items-center gap-2.5">
                         <div className="flex-1 h-[35px] bg-[#FDD00A] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#e5c109]">
                             <span className="text-[#393E46] text-base font-['PeydaWeb'] font-semibold">مشاهده جزئیات کامل</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-[35px] h-[35px] bg-[#64B327] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#529320]">
                                <Check className="w-4 h-4 text-[#0A0A0A]" strokeWidth={2.5} />
                            </div>
                            <div className="w-[35px] h-[35px] bg-[#D54141] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#c33a3a]">
                                <X className="w-4 h-4 text-[#0A0A0A]" strokeWidth={2.5} />
                            </div>
                        </div>
                       
                    </div>
                </div>

                {/* Card 3 */}
                <div className="w-full p-3.5 rounded-xl outline outline-1 outline-[#DCE4E8] -outline-offset-1 flex flex-col gap-3 bg-white">
                    <div className="w-full flex justify-start items-start gap-4">
                        {/* Image */}
                        <div className="w-24 h-[78px] relative rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image src="/tform.png" alt="art" fill className="object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col gap-4">
                             <div className="w-full text-right text-[#0F172A] text-base font-['PeydaWeb'] font-semibold leading-[26.4px] tracking-wide">
                                نقاشی دیواری
                             </div>
                             
                             <div className="w-full flex flex-col gap-1">
                                 {/* Row 1 */}
                                 <div className="w-full flex justify-between items-center">
                                      <div className="flex items-center gap-1.5">
                                         <Store className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px]">تیمچه هنری</span>
                                     </div>
                                     <div className="w-[100px] flex items-center gap-1.5">
                                         <Clock className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px] tracking-wide">دیروز</span>
                                     </div>
                                    
                                 </div>
                                 
                                 {/* Row 2 */}
                                 <div className="w-full flex justify-between items-center">
                                     <div className="flex items-center gap-1.5">
                                         <Users className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px]">5 هنرجو</span>
                                     </div>
                                     <div className="w-[100px] flex items-center gap-1.5">
                                         <User className="w-4 h-4 text-[#666D80]" />
                                         <span className="text-[#666D80] text-xs font-['PeydaFaNum'] font-semibold leading-[20.4px] tracking-wide">آقای حسینی</span>
                                     </div>
                                     
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full flex items-center gap-2.5">
                         <div className="flex-1 h-[35px] bg-[#FDD00A] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#e5c109]">
                             <span className="text-[#393E46] text-base font-['PeydaWeb'] font-semibold">مشاهده جزئیات کامل</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-[35px] h-[35px] bg-[#64B327] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#529320]">
                                <Check className="w-4 h-4 text-[#0A0A0A]" strokeWidth={2.5} />
                            </div>
                            <div className="w-[35px] h-[35px] bg-[#D54141] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#c33a3a]">
                                <X className="w-4 h-4 text-[#0A0A0A]" strokeWidth={2.5} />
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full flex flex-col justify-start items-start gap-4">
                
                {/* Tabs for Table */}
                <div className="w-full h-9 p-[3px] bg-[#F6F6F6] rounded-lg outline outline-1 outline-[#D7D8DA] -outline-offset-1 flex justify-center items-center">
                    <div className="flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer text-[#0A0A0A] hover:bg-white/50">
                         <div className="text-center text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold leading-5 break-words">
                            پروژه های دانش آموزان
                        </div>
                    </div>
                    <div className="flex-1 h-[29px] px-3 py-1 bg-[#F7C61A] shadow-sm rounded-md outline outline-1 outline-[#D7D8DA] -outline-offset-1 flex justify-center items-center gap-2.5 cursor-pointer text-[#0A0A0A]">
                        <div className="text-center text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold leading-5 break-words">
                            پروژه های مدرسه
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] flex flex-col justify-start items-end overflow-hidden">
                    
                    {/* Header */}
                    <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
                        <div className="text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold leading-24 tracking-wide">لیست پروژه ها</div>
                        <div className="flex justify-start items-center gap-2">
                            <div className="w-8 h-8 px-4 py-2 bg-white rounded-lg outline outline-1 outline-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer">
                                <Filter className="w-4 h-4 text-[#818898]" />
                            </div>
                            <div className="w-8 h-8 p-2 bg-white rounded-lg outline outline-1 outline-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer">
                                <Search className="w-4 h-4 text-[#818898]" />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="w-full overflow-x-auto no-scrollbar">
                        <div className="min-w-[1000px] flex flex-col">
                            
                            {/* Table Header */}
                            <div className="w-full bg-[#F6F8FA] border-b border-[#DFE1E7] flex justify-end items-center px-2">
                                <div className="w-20 h-10 px-3 flex justify-end items-center">
                                    <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                                </div>
                                <div className="w-[272px] h-10 px-3 flex justify-end items-center">
                                    <div className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">محصول</div>
                                </div>
                                <div className="w-[73px] h-10 px-3 flex justify-center items-center">
                                    <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">تعداد</div>
                                </div>
                                <div className="w-[127px] h-10 px-3 flex justify-center items-center">
                                    <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">موعد تحویل</div>
                                </div>
                                <div className="w-[140px] h-10 px-3 flex justify-center items-center">
                                    <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">درآمد شما از فروش</div>
                                </div>
                                <div className="w-[104px] h-10 px-3 flex justify-center items-center">
                                    <div className="text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">وضعیت</div>
                                </div>
                                <div className="w-[272px] h-10 px-3 flex justify-end items-center">
                                    <div className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">تیم اجرایی</div>
                                </div>
                                <div className="w-11 h-10 px-3 bg-[#F6F8FA]" />
                            </div>

                            {/* Table Body - Rows */}
                            {currentProducts.map((product, idx) => {
                                const itemIndex = indexOfFirstProduct + idx + 1;
                                const statusBg = product.statusLabel === "ارسال شده" || product.statusLabel === "تحویل به مدرسه" ? "#ECF9F7" : "#FCE8EC";
                                const statusColor = product.statusLabel === "ارسال شده" || product.statusLabel === "تحویل به مدرسه" ? "#267666" : "#B21634";
                                
                                return (
                                    <div key={product.id} onClick={() => handleProductClick(product)} className="w-full h-16 border-b border-[#DFE1E7] flex justify-end items-center px-2 hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div className="w-20 h-16 px-3 flex justify-start items-center gap-2.5">
                                            <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold flex-1">{itemIndex}</span>
                                            <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7] cursor-pointer" />
                                        </div>
                                        <div className="w-[272px] h-16 px-3 flex justify-start items-center gap-2.5">
                                            <span className="text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide truncate">
                                                {product.productName}
                                            </span>
                                        </div>
                                        <div className="w-[73px] h-16 px-3 flex justify-end items-center gap-2.5">
                                            <span className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium font-semibold">{product.count}</span>
                                        </div>
                                        <div className="w-[127px] h-16 px-3 flex justify-end items-center gap-2.5">
                                            <span className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium font-semibold">{product.deliveryTime}</span>
                                        </div>
                                        <div className="w-[140px] h-16 px-3 flex justify-end items-center gap-2.5">
                                            <span className="flex-1 text-center text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">
                                                {product.price} ریال
                                            </span>
                                        </div>
                                        <div className="w-[104px] h-16 px-3 flex justify-center items-center gap-2.5">
                                            <div className="px-2 py-0.5 rounded-2xl flex justify-center items-center" style={{ backgroundColor: statusBg }}>
                                                <span className="text-[12px] font-num-medium" style={{ color: statusColor }}>{product.statusLabel}</span>
                                            </div>
                                        </div>
                                        <div className="w-[272px] h-16 px-3 flex justify-start items-center gap-2.5">
                                            <span className="text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold truncate">
                                                {product.team}
                                            </span>
                                        </div>
                                        <div className="w-11 h-16 px-3 flex justify-start items-center gap-2">
                                            <MoreHorizontal className="w-5 h-5 text-[#666D80]" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="w-full px-5 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div 
                                onClick={handleNextPage}
                                className={`w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#DFE1E7] cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                            >
                                <ChevronRight className="w-5 h-5 text-[#0D0D12]" />
                            </div>
                            <div className="w-[55px] h-8 rounded-lg border border-[#DFE1E7] flex justify-center items-center">
                                <span className="text-[#0D0D12] text-xs font-num-medium font-medium">{currentPage}/{totalPages}</span>
                            </div>
                            <div 
                                onClick={handlePrevPage}
                                className={`w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#DFE1E7] cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                            >
                                <ChevronLeft className="w-5 h-5 text-[#0D0D12]" />
                            </div>
                        </div>
                        <span className="text-center text-[#0D0D12] text-sm font-num-medium font-medium">صفحه {currentPage} از {totalPages}</span>
                    </div>

                </div>

            </div>

            {/* Product PopUp Overlay */}
            {isProductPopUpOpen && selectedProduct && (
                <ProductPopUp 
                    product={selectedProduct} 
                    onClose={() => {
                        setIsProductPopUpOpen(false);
                        setSelectedProduct(null);
                    }} 
                />
            )}

        </div>
    );
};

export default ProjectManagment;

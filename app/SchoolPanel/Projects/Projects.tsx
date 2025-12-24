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
    Briefcase,
    List
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, Product } from "../Reports/product";
import ProductPopUp from "../Reports/ProductPopUp";

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

const Projects = () => {
    const router = useRouter();
    // State for pagination and popup
    const [currentPage, setCurrentPage] = useState(1);
    const [isProductPopUpOpen, setIsProductPopUpOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Filter & Scroll Logic
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const filterRef = React.useRef<HTMLDivElement>(null);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    // Close filter when clicking outside
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Default scroll to right
    React.useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, [products]);

    const handleFilterChange = (value: string) => {
        setSelectedFilters(prev => {
            if (prev.includes(value)) {
                return prev.filter(f => f !== value);
            } else {
                return [...prev, value];
            }
        });
        setCurrentPage(1);
    };

    const getFilterOptions = () => [
        { label: "ارسال شده", value: "ارسال شده" },
        { label: "تحویل به مدرسه ", value: "تحویل به مدرسه " },
        { label: "لغو شده", value: "لغو شده" }, 
        
    ];

    const filteredProductsList = products.filter(product => {
        if (selectedFilters.length === 0) return true;
        return selectedFilters.includes(product.statusLabel);
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredProductsList.length / itemsPerPage);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProductsList.slice(indexOfFirstProduct, indexOfLastProduct);

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
        <div className="w-full min-h-screen  pb-12 pt-5 px-0 flex flex-col justify-start items-center gap-6" dir="rtl">
            
            {/* Header Section */}
            <div className="self-stretch flex flex-col justify-start items-end gap-4">
                <div className="w-full text-right text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-7">
                    داشبــــــورد مدیریت پروژه ها
                </div>
                
                {/* Tabs / Controls */}
                <div className="self-stretch flex flex-col justify-start items-center gap-3">
                     <div onClick={() => router.push('/SchoolPanel/Timche')} className="w-full py-2 px-6 bg-[#FDD00A] rounded-xl flex justify-center items-center gap-2 cursor-pointer shadow-sm">
                        <div className="text-center text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold leading-6">
                            مدیریت تیمچه ها
                        </div>
                    </div>
                    <div onClick={() => router.push('/SchoolPanel/Projects/ProjectManagment')} className="w-full py-2.5 px-6 rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="text-center text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold leading-6">
                            مدیریت حجره ها
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
                
                {/* Cooperation Section */}
                <div className="flex flex-col gap-4 w-full mt-2">
                    <div className="flex justify-between items-center w-full">
                        <h2 className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold">مشارکت فعال با تیمچه های دیگر</h2>
                        <span className="text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold cursor-pointer">مشاهده همه</span>
                    </div>
                    
                    <div className="w-full p-3.5 rounded-xl border border-[#DCE4E8] flex flex-col justify-start items-center gap-3">
                        <div className="w-full flex justify-start items-start gap-2.5">
                            <Image src="/tform.png" alt="Project" width={96} height={96} className="p-2.5 rounded-xl" />
                            <div className="flex-1 flex flex-col justify-start items-start gap-4">
                                <div className="w-full flex flex-col justify-start items-start">
                                    <div className="w-full text-right flex flex-col justify-center">
                                        <div className="text-[#0F172A] text-base font-['PeydaWeb'] font-semibold leading-relaxed tracking-wide break-word">
                                            دوخت لباس فرم - <span className="font-num-medium">{toFarsiNumber(10254)}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-center gap-2.5">
                                        <div className="flex-1 rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] flex justify-start items-start gap-2.5">
                                            <div className="flex-1 text-right text-[#0F172A] text-xs font-['PeydaWeb'] font-semibold leading-tight tracking-wide break-word">پروژه استانی - استان زنجان</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-start items-center gap-2.5">
                                    <div className="flex justify-center items-center gap-1.5">
                                        <div className="text-[#0F172A] text-sm font-num-bold  leading-snug tracking-wide break-word">{toFarsiNumber(6)}</div>
                                    </div>
                                    <div className="rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] flex justify-end items-center gap-2.5">
                                        <div className="text-right text-[#0F172A] text-sm font-['PeydaWeb'] font-semibold leading-snug tracking-wide break-word">تعداد مدارس همکار</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full  px-6 py-2 bg-[#F7C61A] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#e5b818]">
                            <div className="text-center text-[#393E46] text-base font-num-medium font-extrabold leading-snug break-word">برو به صفحه همکاری</div>
                        </div>
                    </div>
                </div>

                {/* Requests Section */}
                <div className="flex flex-col gap-4 w-full mt-2 relative">
                    <div className="flex justify-between items-center w-full">
                        <h2 className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold">درخواست همکاری</h2>
                        <span className="text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold cursor-pointer">مشاهده همه</span>
                    </div>
            
                    {/* Request Item 1 */}
                    <div className="w-full h-[61px] py-2 pl-[14px] pr-4 rounded-xl border border-[#DCE4E8] flex justify-start items-center gap-3">
                        <div className="relative flex justify-start items-center gap-3">
                            <div className="flex justify-start items-center gap-2.5">
                                <div className="w-[46.13px] h-[46.13px] bg-[#F8CB2E] rounded-lg" />
                            </div>
                            <div className="w-6 h-6 left-[11.07px] top-[11.07px] absolute flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
                            </div>
                        </div>
                        <div className="flex-1 pl-4 flex flex-col justify-center items-end gap-1">
                            <div className="w-full text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold break-word">درخواست همکاری در دوخت</div>
                            <div className="w-full flex justify-between items-center">
                                
                                <div className="flex justify-start items-center">
                                    <div className="text-center text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold break-word">مدرسه فن کاران هیدج</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <div className="w-8 h-8 px-4 py-2 bg-white shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2">
                                <div className="w-4 h-4 relative flex items-center justify-center">
                                    <List className="w-4 h-4 text-[#818898]" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Request Item 2 */}
                    <div className="w-full h-[61px] py-2 pl-[14px] pr-4 rounded-xl border border-[#DCE4E8] flex justify-start items-center gap-3">
                        <div className="relative flex justify-start items-center gap-3">
                            <div className="flex justify-start items-center gap-2.5">
                                <div className="w-[46.13px] h-[46.13px] bg-[#F8CB2E] rounded-lg" />
                            </div>
                            <div className="w-6 h-6 left-[11.07px] top-[11.07px] absolute flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
                            </div>
                        </div>
                        <div className="flex-1 pl-4 flex flex-col justify-center items-end gap-1">
                            <div className="w-full text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold break-word">درخواست همکاری در تولید محتوا</div>
                            <div className="w-full flex justify-between items-center">
                                
                                <div className="flex justify-start items-center">
                                    <div className="text-center text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold break-word">مدرسه کارآفرینان ابهر</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-2">
                            <div className="w-8 h-8 px-4 py-2 bg-white shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2">
                                <div className="w-4 h-4 relative flex items-center justify-center">
                                    <List className="w-4 h-4 text-[#818898]" strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute left-[14.39px] top-[35.18px] w-[71px] py-[1px] px-2 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center gap-0.5">
                        <div className="text-[#28806F] text-[10px] font-num-medium font-semibold leading-[15px] tracking-wide break-word">همکاری فعال</div>
                    </div>
                </div>
            </div>

            {/* Projects Section */}
            <div className="self-stretch flex flex-col justify-start items-end gap-3 w-full">
                <div className="self-stretch flex justify-start items-center mb-2">
                    <div className="text-center text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
                        پروژه ها
                    </div>
                </div>
                
                {/* Tabs for Table */}
                <div className="self-stretch h-9 p-[3px] bg-[#F6F6F6] rounded-lg outline outline-1 outline-[#D7D8DA] -outline-offset-1 flex justify-center items-center">
                    <div className="flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer text-[#0A0A0A] hover:bg-white/50">
                         <div className="text-sm font-['PeydaWeb'] font-semibold leading-5">
                            پروژه های دانش آموزان
                        </div>
                    </div>
                    <div className="flex-1 h-[29px] px-3 py-1 bg-[#F7C61A] shadow-sm rounded-md outline outline-1 outline-[#D7D8DA] -outline-offset-1 flex justify-center items-center gap-2.5 cursor-pointer text-[#0A0A0A]">
                        <div className="text-sm font-['PeydaWeb'] font-semibold leading-5">
                            پروژه های مدرسه 
                        </div>
                    </div>
                </div>

                {/* Table Container - EXACTLY LIKE HOME PAGE w/ Dynamic Data */}
                <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] flex flex-col justify-start items-end overflow-hidden">
                    
                    {/* Header */}
                    <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
                        <div className="text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold leading-24 tracking-wide">سفارش های فعال</div>
                        <div className="flex justify-start items-center gap-2">
                            <div className="flex items-center gap-2" ref={filterRef}>
                                <div className="relative">
                                     <div 
                                         className={`w-8 h-8 px-0 py-0 rounded-lg outline outline-1 outline-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer transition-colors ${isFilterOpen ? 'bg-gray-100 ring-2 ring-blue-100' : 'bg-white hover:bg-gray-50'}`}
                                         onClick={() => setIsFilterOpen(!isFilterOpen)}
                                     >
                                        <Filter className={`w-4 h-4 ${selectedFilters.length > 0 ? 'text-[#F7C61A]' : 'text-[#818898]'}`} />
                                    </div>
                                    
                                    {/* Filter Dropdown */}
                                    {isFilterOpen && (
                                        <div className="absolute top-9 left-0 z-50 w-48 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-[#EFF0F2] p-2 flex flex-col gap-1 anim-fade-in" dir="rtl">
                                            <div className="text-[#666D80] text-xs font-medium px-2 py-1 mb-1 border-b border-gray-100 text-right">
                                                فیلتر بر اساس وضعیت
                                            </div>
                                            {getFilterOptions().map((option) => (
                                                <div 
                                                    key={option.value}
                                                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer"
                                                    onClick={() => handleFilterChange(option.value)}
                                                >
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedFilters.includes(option.value) ? 'bg-[#F7C61A] border-[#F7C61A]' : 'border-[#DFE1E7] bg-white'}`}>
                                                        {selectedFilters.includes(option.value) && (
                                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className={`text-sm ${selectedFilters.includes(option.value) ? 'text-[#0D0D12] font-semibold' : 'text-[#666D80] font-medium'}`}>
                                                        {option.label}
                                                    </span>
                                                </div>
                                            ))}
                                            {selectedFilters.length > 0 && (
                                                <div 
                                                    className="text-center text-[#B21634] text-xs font-medium py-1.5 mt-1 border-t border-gray-100 cursor-pointer hover:bg-red-50 rounded-b-lg"
                                                    onClick={() => setSelectedFilters([])}
                                                >
                                                    حذف فیلترها
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="w-8 h-8 p-2 bg-white rounded-lg outline outline-1 outline-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer">
                                <Search className="w-4 h-4 text-[#818898]" />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div 
                        ref={scrollContainerRef}
                        className="w-full overflow-x-auto no-scrollbar"
                    >
                        <div className="min-w-[1000px] flex flex-col">
                            
                            {/* Table Header */}
                            <div className="w-full bg-[#F6F8FA] border-b border-[#DFE1E7] flex justify-end items-center px-2">
                                <div className="w-20 h-10 px-3 flex justify-end items-center">
                                    <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                                </div>
                                <div className="w-[272px] h-10 px-3 flex justify-start items-center">
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
                                <div className="w-[272px] h-10 px-3 flex justify-start items-center">
                                    <div className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">تیم اجرایی</div>
                                </div>
                                <div className="w-11 h-10 px-3 bg-[#F6F8FA]" />
                            </div>

                            {/* Table Body - Rows */}
                            {currentProducts.map((product, idx) => {
                                const itemIndex = indexOfFirstProduct + idx + 1;
                                const statusBg = product.statusLabel === "ارسال شده" || product.statusLabel === "تحویل به مدرسه " ? "#ECF9F7" : "#FCE8EC";
                                const statusColor = product.statusLabel === "ارسال شده" || product.statusLabel === "تحویل به مدرسه " ? "#267666" : "#B21634";
                                
                                return (
                                    <div key={product.id} onClick={() => handleProductClick(product)} className="w-full h-16 border-b border-[#DFE1E7] flex justify-end items-center px-2 hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div className="w-20 h-16 px-3 flex justify-start items-center gap-2.5">
                                            <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold flex-1">{toFarsiNumber(itemIndex)}</span>
                                            <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7] cursor-pointer" />
                                        </div>
                                        <div className="w-[272px] h-16 px-3 flex justify-start items-center gap-2.5">
                                            <span className="text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide truncate">
                                                {product.productName}
                                            </span>
                                        </div>
                                        <div className="w-[73px] h-16 px-3 flex justify-end items-center gap-2.5">
                                            <span className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium font-semibold">{toFarsiNumber(product.count)}</span>
                                        </div>
                                        <div className="w-[127px] h-16 px-3 flex justify-end items-center gap-2.5">
                                            <span className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium font-semibold">{toFarsiNumber(product.deliveryTime)}</span>
                                        </div>
                                        <div className="w-[140px] h-16 px-3 flex justify-end items-center gap-2.5">
                                            <span className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium font-semibold">
                                                {toFarsiNumber(product.price)} <span className="font-['PeydaWeb']">ریال</span>
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
                                <span className="text-[#0D0D12] text-xs font-num-medium font-medium">{toFarsiNumber(currentPage)}/{toFarsiNumber(totalPages)}</span>
                            </div>
                            <div 
                                onClick={handlePrevPage}
                                className={`w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#DFE1E7] cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                            >
                                <ChevronLeft className="w-5 h-5 text-[#0D0D12]" />
                            </div>
                        </div>
                        <span className="text-center text-[#0D0D12] text-sm font-num-medium font-medium">صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}</span>
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

export default Projects;

"use client";

import React, { useState, useEffect } from "react";
import { 
    MoreHorizontal, 
    ChevronLeft,
    ChevronRight,
    Search,
    Filter
} from "lucide-react";
import { managerService } from "@/app/services/manager/managerService";
import ManagerProductPopup from "./ManagerProductPopup";

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

const ManagerProductsTable = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    // Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const filterRef = React.useRef<HTMLDivElement>(null);
    const itemsPerPage = 7;

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await managerService.getManagerProducts();
            if (response.success && response.data) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Failed to load products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = 
            (product.model_data?.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.firstname || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
            (product.lastname || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.school_name || '').toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = 
            filterStatus === 'all' ? true :
            filterStatus === 'approved' ? product.approved :
            filterStatus === 'pending' ? !product.approved : true;

        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Reset pagination when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterStatus]);

    // Pagination Handlers
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handleProductClick = (product: any) => {
        setSelectedProduct(product);
        setIsPopupOpen(true);
    };

    const handleApproveFromPopup = () => {
        fetchProducts();
    };

    // Close filter when clicking outside
    useEffect(() => {
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
    
    // Render Empty State if no data after filtering (but allow search bar to be visible to clear)
    const isListEmpty = !loading && filteredProducts.length === 0;

    if (loading) return <div className="w-full h-40 flex items-center justify-center text-gray-500">در حال بارگذاری...</div>;

    return (
        <div className={`w-full ${!isListEmpty ? 'bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] overflow-hidden' : ''} flex flex-col justify-start items-end`}>
            
            {/* Header / Filters */}
            <div className={`w-full h-16 px-5 py-2 ${!isListEmpty ? 'border-b border-[#DFE1E7] bg-white' : ''} flex justify-between items-center mb-4`}>
                <div className="text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold leading-24 tracking-wide">
                     {/* Title hidden if empty? User requested "dont show table". But search box needs to be somewhere. Let's keep a minimal header. */}
                     {!isListEmpty }
                </div>
                <div className="flex justify-start items-center gap-2 w-full max-w-md">
                   
                    {/* Search Box */}
                    <div className="flex-1 relative">
                        <input 
                            type="text" 
                            placeholder="جستجو در محصولات..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pr-9 pl-4 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] text-sm text-[#0D0D12] focus:outline-blue-500 transition-colors font-['PeydaWeb']"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#818898]" />
                    </div>

                     {/* Filter Button */}
                    <div className="flex items-center gap-2" ref={filterRef}>
                        <div className="relative">
                             <div 
                                 className={`h-10 px-4 rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer transition-colors ${isFilterOpen ? 'bg-gray-100 ring-2 ring-blue-100' : 'bg-white hover:bg-gray-50'}`}
                                 onClick={() => setIsFilterOpen(!isFilterOpen)}
                             >
                                <Filter className={`w-4 h-4 ${filterStatus !== 'all' ? 'text-[#F7C61A]' : 'text-[#818898]'}`} />
                                <span className="text-xs font-semibold font-['PeydaWeb'] text-[#666D80]">
                                    {filterStatus === 'all' ? 'همه' : filterStatus === 'approved' ? 'تایید شده' : 'در انتظار'}
                                </span>
                            </div>
                            
                            {/* Filter Dropdown */}
                            {isFilterOpen && (
                                <div className="absolute top-12 left-0 z-50 w-48 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-[#EFF0F2] p-2 flex flex-col gap-1 anim-fade-in" dir="rtl">
                                    <div className="text-[#666D80] text-xs font-medium px-2 py-1 mb-1 border-b border-gray-100 text-right">
                                        فیلتر بر اساس وضعیت
                                    </div>
                                    {[
                                        { label: "همه", value: "all" },
                                        { label: "تایید شده", value: "approved" },
                                        { label: "در انتظار تایید", value: "pending" },
                                    ].map((option) => (
                                        <div 
                                            key={option.value}
                                            className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer"
                                            onClick={() => {
                                                setFilterStatus(option.value);
                                                setIsFilterOpen(false);
                                            }}
                                        >
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filterStatus === option.value ? 'bg-[#F7C61A] border-[#F7C61A]' : 'border-[#DFE1E7] bg-white'}`}>
                                                {filterStatus === option.value && (
                                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                )}
                                            </div>
                                            <span className={`text-sm ${filterStatus === option.value ? 'text-[#0D0D12] font-semibold' : 'text-[#666D80] font-medium'}`}>
                                                {option.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {isListEmpty ? (
                <div className="w-full flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-xl border border-[#DCE4E8] border-dashed">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="text-[#0D0D12] font-semibold">محصولی یافت نشد</div>
                    <div className="text-[#666D80] text-sm">نتیجه‌ای با این مشخصات پیدا نشد.</div>
                </div>
            ) : (
             /* Table */
            <div className="w-full overflow-x-auto no-scrollbar">
                <div className="min-w-[1000px] flex flex-col">
                    
                    {/* Table Header */}
                    <div className="w-full bg-[#F6F8FA] border-b border-[#DFE1E7] flex justify-end items-center px-2">
                         <div className="w-16 h-10 px-3 flex justify-end items-center">
                            <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                        </div>
                        <div className="w-[80px] h-10 px-3 flex justify-center items-center">
                            <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">تصویر</div>
                        </div>
                        <div className="w-[200px] h-10 px-3 flex justify-center items-center">
                            <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">نام محصول</div>
                        </div>
                         <div className="w-[100px] h-10 px-3 flex justify-center items-center">
                            <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">موجودی</div>
                        </div>
                        <div className="w-[120px] h-10 px-3 flex justify-center items-center">
                            <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">قیمت</div>
                        </div>
                         <div className="w-[180px] h-10 px-3 flex justify-center items-center">
                            <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">نام دانش آموز</div>
                        </div>
                         <div className="w-[180px] h-10 px-3 flex justify-center items-center">
                            <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">مدرسه</div>
                        </div>
                        <div className="w-[120px] h-10 px-3 flex justify-center items-center">
                            <div className="text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">وضعیت</div>
                        </div>
                         <div className="w-[120px] h-10 px-3 flex justify-center items-center">
                            <div className="text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">عملیات</div>
                        </div>
                    </div>

                    {/* Table Body - Rows */}
                    {currentItems.length > 0 ? (
                        currentItems.map((product, idx) => {
                            const itemIndex = indexOfFirstItem + idx + 1;
                            const statusBg = product.approved ? "#ECF9F7" : "#FFF4E5";
                            const statusColor = product.approved ? "#267666" : "#B98900";
                            const statusText = product.approved ? "تایید شده" : "در انتظار تایید";
                            
                            return (
                                <div key={product.id} onClick={() => handleProductClick(product)} className="w-full h-16 border-b border-[#DFE1E7] flex justify-end items-center px-2 hover:bg-gray-50 transition-colors cursor-pointer group">
                                     <div className="w-16 h-16 px-3 flex justify-start items-center gap-2.5">
                                        <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold flex-1">{toFarsiNumber(itemIndex)}</span>
                                        <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7] cursor-pointer" />
                                    </div>
                                    <div className="w-[80px] h-16 px-3 flex justify-center items-center">
                                        {product.model_data.image_path ? (
                                            <img src={`https://digikara.back.adiaweb.dev/storage/${product.model_data.image_path}`} alt="product" className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                                        )}
                                    </div>
                                    <div className="w-[200px] h-16 px-3 flex justify-center items-center">
                                        <span className="text-center text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold truncate w-full" dir="auto">
                                            {product.model_data.title}
                                        </span>
                                    </div>
                                     <div className="w-[100px] h-16 px-3 flex justify-center items-center">
                                        <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold">
                                            {toFarsiNumber(product.model_data.inventory)}
                                        </span>
                                    </div>
                                    <div className="w-[120px] h-16 px-3 flex justify-center items-center">
                                        <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold">
                                            {toFarsiNumber(product.model_data.price)}
                                        </span>
                                    </div>
                                    <div className="w-[180px] h-16 px-3 flex justify-center items-center">
                                        <span className="text-center text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold truncate w-full">
                                            {product.firstname} {product.lastname}
                                        </span>
                                    </div>
                                      <div className="w-[180px] h-16 px-3 flex justify-center items-center">
                                        <span className="text-center text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold truncate w-full">
                                            {product.school_name}
                                        </span>
                                    </div>
                                    <div className="w-[120px] h-16 px-3 flex justify-center items-center">
                                        <div className="px-2 py-0.5 rounded-2xl flex justify-center items-center" style={{ backgroundColor: statusBg }}>
                                            <span className="text-[12px] font-num-medium whitespace-nowrap" style={{ color: statusColor }}>{statusText}</span>
                                        </div>
                                    </div>
                                    <div className="w-[120px] h-16 px-3 flex justify-center items-center">
                                        {!product.approved ? (
                                             <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleProductClick(product);
                                                }}
                                                className="h-8 px-4 bg-[#0A33FF] hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                                            >
                                                تایید محصول
                                            </button>
                                        ) : (
                                            <MoreHorizontal className="w-5 h-5 text-[#666D80]" />
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                         <div className="w-full h-20 flex items-center justify-center text-gray-500">موردی یافت نشد</div>
                    )}
                </div>
            </div>
            )}

            {/* Footer */}
            {totalPages > 1 && (
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
            )}

            {isPopupOpen && selectedProduct && (
                <ManagerProductPopup 
                    product={selectedProduct}
                    onClose={() => {
                        setIsPopupOpen(false);
                        setSelectedProduct(null);
                    }}
                    onApprove={handleApproveFromPopup}
                />
            )}
        </div>
    );
};

export default ManagerProductsTable;

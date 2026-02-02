"use client";
import React from 'react';
import { 
    Filter, 
    Search,
    MoreHorizontal, 
    ChevronRight, 
    ChevronLeft,
    Check
} from 'lucide-react';
import { DashboardNavBar } from "../../../layout/DashboardNavBar";
import { Navigation } from "../../../layout/Navigation"; 
import { SmartSuggestions } from "../../overview/SmartSuggestions"; 
import { studentService, Order } from '@/app/services/studentService';
import { OrderTable } from '../OrderTable';
import { PopUpProduct } from '../../products/PopUpProduct';

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

export default function ManageOrders() {
    const [ordersData, setOrdersData] = React.useState<Order[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedTab, setSelectedTab] = React.useState("همه");
    const [selectedOrderIds, setSelectedOrderIds] = React.useState<(string | number)[]>([]);
    const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 10;

    React.useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            const response = await studentService.getOrders();
            if (response.success && response.data) {
                setOrdersData(response.data);
            }
            setIsLoading(false);
        };
        fetchOrders();
    }, []);

    // Filter Logic
    const filteredOrders = ordersData.filter(order => {
        // Search Filter
        const matchesSearch = searchTerm ? (
             order.id.includes(searchTerm) || 
             order.customer.includes(searchTerm)
        ) : true;
        
        if (!matchesSearch) return false;

        // Tab Filter
        if (selectedTab === "همه") return true;
        if (selectedTab === "فعال") return order.status === 'Completed'; 
        if (selectedTab === "در انتظار") return order.status === 'Pending';
        if (selectedTab === "غیرفعال") return order.status === 'Cancelled';
        if (selectedTab === "بایگانی") return false; // No archive data yet

        return true;
    });

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Selection Handlers
    const handleSelectRow = (id: string | number) => {
        setSelectedOrderIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })
    }

    const handleSelectAll = () => {
        const allSelected = currentOrders.every(item => selectedOrderIds.includes(item.id))
        
        if (allSelected) {
            const currentIds = currentOrders.map(item => item.id)
            setSelectedOrderIds(prev => prev.filter(id => !currentIds.includes(id as string)))
        } else {
            const currentIds = currentOrders.map(item => item.id)
            setSelectedOrderIds(prev => {
                const newSet = new Set([...prev, ...currentIds])
                return Array.from(newSet)
            })
        }
    }

    const handleBulkDeliver = async () => {
        if (selectedOrderIds.length === 0) return;
  
        if (!confirm("آیا از تحویل سفارش‌های انتخاب شده به مدرسه اطمینان دارید؟")) return;
  
        setIsLoading(true);
        try {
             await Promise.all(selectedOrderIds.map(id => 
                studentService.updateOrderStatus(String(id), "تحویل به مدرسه ")
            ));
            
            // Refetch
            const response = await studentService.getOrders();
            if (response.success && response.data) {
                setOrdersData(response.data);
            }
            setSelectedOrderIds([]);
        } catch (error) {
            console.error("Bulk update failed", error);
            alert("خطا در بروزرسانی وضعیت سفارش‌ها");
        } finally {
            setIsLoading(false);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    // Tabs Config
    const tabs = [
        { label: "همه", value: "همه" }, // Active by default
        { label: "فعال", value: "فعال" },
        { label: "در انتظار", value: "در انتظار" },
        { label: "غیرفعال", value: "غیرفعال" },
        { label: "بایگانی", value: "بایگانی" },
    ];



    return (
        <div className="w-full min-h-screen bg-white flex flex-col relative" dir="ltr">
             {/* Navbar - Sticky */}
             <div className="sticky top-0 z-40 w-full bg-white px-0 pt-0" dir="ltr">
                <DashboardNavBar />
            </div>

            {/* Main Content */}
            <div className="w-full flex flex-col pb-[150px] px-0 pt-0 gap-6" dir="rtl">
                
                {/* Header Section: Title */}
                <div className="w-full flex-col flex items-start gap-4">
                     <h1 className="text-center text-[#0D0D12] text-xl  font-semibold leading-[27px]">مدیریت سفارشات</h1>
                </div>

                {/* Toolbar: Search & Tabs */}
                <div className="w-full flex flex-col items-start gap-3">
                    {/* Search Row */}
                    <div className="w-full flex justify-between items-center gap-1">
                        {/* Search Input */}
                         <div className="flex-1 h-9 bg-white rounded-lg border border-[#DFE1E7] flex items-center">
                            <div className="px-3 py-1.5 flex items-center justify-center border-l border-[#DFE1E7]">
                                <span className="text-[#737373] text-opacity-25 text-sm font-['PeydaFaNum'] font-medium">{toFarsiNumber(filteredOrders.length)} نتیحه</span>
                            </div>
                            <div className="flex-1 flex items-center px-2 py-1">
                                <input 
                                    className="w-full h-full outline-none text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold placeholder:text-[#737373] placeholder:opacity-50"
                                    placeholder="جستجو در سفارشات"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="pr-3 pl-2 py-1.5 flex items-center justify-center">
                                <Search className="w-4 h-4 text-[#737373]" />
                            </div>
                        </div>

                        {/* Filter Button (Visual only based on snippet, or could toggle filters) */}
                        <div className="w-9 h-9 p-2 bg-white rounded-lg border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50">
                             <Filter className="w-4 h-4 text-[#818898]" />
                        </div>
                    </div>

                    {/* Tabs Row */}
                    <div className="w-full flex items-center justify-start gap-2 overflow-x-auto no-scrollbar pb-1">
                        {tabs.map((tab) => {
                            const isActive = selectedTab === tab.value;
                            return (
                                <div 
                                    key={tab.value}
                                    onClick={() => setSelectedTab(tab.value)}
                                    className={`h-8 px-4 rounded-xl border flex items-center justify-center cursor-pointer transition-colors whitespace-nowrap
                                        ${isActive 
                                            ? 'bg-[#F7C61A] border-[#E5E5E5] shadow-sm' 
                                            : 'bg-white border-[#E5E5E5] hover:bg-gray-50 shadow-sm'
                                        }`}
                                >
                                    <span className={`text-sm font-['PeydaWeb'] font-semibold ${isActive ? 'text-[#393E46]' : 'text-[#737373]'}`}>
                                        {tab.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Suggestions Component */}
                <div className="w-full">
                    <SmartSuggestions />
                </div>

                {/* Table */}
                <div className="w-full bg-white rounded-xl border border-[#DFE1E7] shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] overflow-hidden flex flex-col">
                    {/* Toolbar */}
                    <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
                        <div className="text-[#0D0D12] text-base font-semibold tracking-wide">
                            جدول سفارشات
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#DFE1E7] bg-white text-[#818898] cursor-pointer hover:bg-gray-50">
                                <Search size={16} />
                            </div>
                        </div>
                    </div>
                
                    {/* Scrollable Content */}
                    <div className="w-full overflow-x-auto no-scrollbar">
                        <div className="min-w-[1120px]">
                            <OrderTable 
                                orders={currentOrders}
                                isLoading={isLoading}
                                showCheckboxes={true}
                                selectedOrderIds={selectedOrderIds}
                                onSelectRow={handleSelectRow}
                                onSelectAll={handleSelectAll}
                                onRowClick={(order) => setSelectedOrder(order)}
                            />
                        </div>
                    </div>

                     {/* Footer / Pagination */}
                    <div className="w-full h-[64px] px-5 py-4 flex justify-between items-center bg-white border-t border-[#DFE1E7]">
                         <div className="flex items-center gap-2">
                             <button 
                                 onClick={handleNextPage}
                                 disabled={currentPage === totalPages}
                                 className="w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                 <ChevronRight size={16} className="text-[#0D0D12]" />
                             </button>
                             <div className="w-[55px] h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center bg-white">
                                 <span className="text-[#0D0D12] text-xs font-num-medium">{toFarsiNumber(currentPage)}/{toFarsiNumber(totalPages || 1)}</span>
                             </div>
                             <button 
                                 onClick={handlePrevPage}
                                 disabled={currentPage === 1}
                                 className="w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                 <ChevronLeft size={16} className="text-[#0D0D12]" />
                             </button>
                         </div>
                         <div className="text-[#0D0D12] text-sm font-num-medium">
                             صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages || 1)}
                         </div>
                    </div>
                </div>

            </div>

             {/* Bottom Navigation */}
             <div dir="ltr">
                <Navigation />
            </div>

            {/* Bottom Sheet Action Bar */}
            <div className={`fixed bottom-0 left-0 right-0 w-full bg-white border-t border-[#DFE1E7] p-4 z-[100] transition-all duration-300 ease-in-out transform ${selectedOrderIds.length > 0 ? 'translate-y-0 opacity-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]' : 'translate-y-full opacity-0 pointer-events-none shadow-none'}`}>
                 <div className="max-w-[1120px] mx-auto flex items-center justify-between">
                     
                     
                     <button 
                         onClick={handleBulkDeliver}
                         disabled={isLoading}
                         className="h-10 px-6 bg-[#F7C61A] rounded-lg text-[#0D0D12] text-sm font-semibold hover:bg-[#E5B50F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                     >
                         تحویل سفارش به مدرسه
                     </button>
                     <div className="flex items-center gap-3">
                         
                         <span className="text-[#0D0D12] text-sm font-medium">سفارش انتخاب شده</span>
                     <div className="w-8 h-8 bg-[#F7C61A] rounded-full flex items-center justify-center text-[#0D0D12] font-bold text-sm">
                             {toFarsiNumber(selectedOrderIds.length)}
                         </div>
                     </div>
                 </div>
            </div>
            {/* Product Popup */}
            {selectedOrder && (
                <PopUpProduct 
                    order={selectedOrder} 
                    onClose={() => setSelectedOrder(null)} 
                />
            )}
        </div>
    );
}

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
import { DashboardNavBar } from "../DashboardNavBar";
import { Navigation } from "../Navigation"; 
import { SmartSugesstions } from "../SmartSugesstions"; 
import { studentService } from '@/app/services/studentService';

interface Order {
    id: string;
    customer: string;
    date: string;
    status: 'Completed' | 'Pending' | 'Cancelled';
    statusText: string;
    paymentMethod: string;
    amount: string;
}

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

// Helper to map API status to our UI status
const mapApiStatus = (apiStatus: string): 'Completed' | 'Pending' | 'Cancelled' => {
    if (apiStatus === 'delivered' || apiStatus === 'sent' || apiStatus === 'تکمیل شده' || apiStatus.includes('ارسال شده')) return 'Completed';
    if (apiStatus === 'pending' || apiStatus === 'not_sent' || apiStatus === 'در انتظار ارسال' || apiStatus.includes('در انتظار')) return 'Pending';
    if (apiStatus === 'canceled' || apiStatus === 'لغو شده') return 'Cancelled';
    return 'Pending'; 
}

export default function ManageOrders() {
    const [ordersData, setOrdersData] = React.useState<Order[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedTab, setSelectedTab] = React.useState("همه");

    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 10;

    React.useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            const response = await studentService.getOrders();
            if (response.success && response.data) {
                const mappedOrders: Order[] = response.data.map((item: any) => ({
                    id: toFarsiNumber(item.id),
                    customer: item.customerName || 'کاربر مهمان', 
                    date: toFarsiNumber(item.deliveryTime) || toFarsiNumber("1403/01/01"),
                    status: mapApiStatus(item.status || item.statusLabel),
                    statusText: item.statusLabel || 'نامشخص',
                    paymentMethod: 'اینترنتی',
                    amount: toFarsiNumber(item.price) || '۰'
                }));
                setOrdersData(mappedOrders);
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

    return (
        <div className="w-full min-h-screen bg-white flex flex-col relative" dir="ltr">
             {/* Navbar - Sticky */}
             <div className="sticky top-0 z-40 w-full bg-white px-0 pt-0" dir="ltr">
                <DashboardNavBar />
            </div>

            {/* Main Content */}
            <div className="w-full flex flex-col pb-[150px] px-4 pt-0 gap-6" dir="rtl">
                
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
                    <SmartSugesstions />
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
                            {/* Header Row */}
                            <div className="w-full h-10 bg-[#F6F8FA] border-b border-[#DFE1E7] flex items-center px-[9px]">
                                <div className="flex-1 h-10 px-3 flex items-center justify-start gap-2.5">
                                    <div className="w-4 h-4 rounded border border-[#DFE1E7] bg-white"></div>
                                    <span className="text-[#666D80] text-sm font-semibold">شناسه سفارش</span>
                                </div>
                                <div className="flex-1 h-10 px-3 flex items-center justify-center gap-1.5">
                                    <span className="text-[#666D80] text-sm font-semibold">مشتری</span>
                                </div>
                                <div className="flex-1 h-10 px-3 flex items-center justify-center gap-1.5">
                                    <span className="text-[#666D80] text-sm font-semibold">تاریخ</span>
                                </div>
                                <div className="flex-1 h-10 px-3 flex items-center justify-center gap-1.5">
                                    <span className="text-[#666D80] text-sm font-semibold">وضعیت</span>
                                </div>
                                <div className="flex-1 h-10 px-3 flex items-center justify-center gap-1.5">
                                    <span className="text-[#666D80] text-sm font-semibold">پرداخت</span>
                                </div>
                                <div className="flex-1 h-10 px-3 flex items-center justify-center gap-1.5">
                                    <span className="text-[#666D80] text-sm font-semibold">مجموع</span>
                                </div>
                                <div className="w-11 h-10 px-3 bg-[#F6F8FA]"></div> 
                            </div>
                            
                            {/* Rows */}
                            {isLoading ? (
                                <div className="w-full h-24 flex items-center justify-center">
                                     <span className="text-[#818898] text-sm">در حال دریافت اطلاعات...</span>
                                </div>
                            ) : currentOrders.length > 0 ? (
                                currentOrders.map((order, idx) => {
                                    const styles = getStatusStyles(order.status);
                                    return (
                                        <div key={idx} className="w-full h-16 bg-white border-b border-[#DFE1E7] flex items-center px-[9px] hover:bg-gray-50 transition-colors">
                                            {/* Order ID */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-start gap-2.5">
                                                <div className="w-4 h-4 rounded border border-[#DFE1E7] bg-white cursor-pointer"></div>
                                                <span className="text-[#0D0D12] text-sm font-num-medium">{order.id}</span>
                                            </div>

                                            {/* Customer */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-center">
                                                <span className="text-[#0D0D12] text-sm font-semibold">{order.customer}</span>
                                            </div>

                                            {/* Date */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-center">
                                                <span className="text-[#0D0D12] text-sm font-num-medium">{order.date}</span>
                                            </div>

                                            {/* Status */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-center">
                                                <div className={`h-5 px-2 py-0.5 rounded-2xl flex items-center gap-1 ${styles.bg}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                                                    <span className={`text-xs font-num-medium ${styles.text}`}>{order.statusText}</span>
                                                </div>
                                            </div>

                                            {/* Payment */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-center">
                                                <span className="text-[#0D0D12] text-sm font-semibold">{order.paymentMethod}</span>
                                            </div>

                                            {/* Amount */}
                                            <div className="flex-1 h-16 px-3 flex items-center justify-center">
                                                <span className="text-[#0D0D12] text-sm font-num-medium"dir="rtl">{order.amount}</span>
                                            </div>

                                            {/* Actions */}
                                            <div className="w-11 h-16 px-3 flex items-center justify-center">
                                                 <div className="w-5 h-5 flex items-center justify-center text-[#666D80] cursor-pointer">
                                                    <MoreHorizontal size={20} />
                                                 </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="w-full h-24 flex items-center justify-center">
                                     <span className="text-[#818898] text-sm">هیچ سفارشی یافت نشد.</span>
                                </div>
                            )}
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
        </div>
    );
}

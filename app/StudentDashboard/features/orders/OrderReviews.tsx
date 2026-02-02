"use client"

import React, { useState, useEffect, useRef } from "react"
import { Search, Filter, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { PopUpProduct } from "../products/PopUpProduct"
import { studentService, Order } from "@/app/services/studentService"
import { toFarsiNumber } from "@/app/services/common/utils"

// Interface for Project Data (Mock)
export interface Project {
  id: number
  projectName: string
  category: string
  deadline: string
  price: string
  status: "completed" | "in_progress" | "pending" | "canceled"
  statusLabel: string
  description?: string
  team?: string 
}

const projects: any[] = []; 

const getStatusStyles = (statusLabel: string) => {
  if (!statusLabel) return "bg-[#ECF9F7] text-[#267666]";
  
  if (statusLabel.includes("تحویل به مدرسه ") || statusLabel.includes("ارسال شده") || statusLabel === "تکمیل شده") {
     if (statusLabel === "تحویل به مدرسه " || (statusLabel === "ارسال شده" && !statusLabel.includes("red")) || statusLabel === "تکمیل شده") return "bg-[#ECF9F7] text-[#267666]"
  }
  
  if (statusLabel === "ارسال نشده" || statusLabel === "در انتظار ارسال" || statusLabel === "در انتظار تایید" || statusLabel === "لغو شده") {
      return "bg-[#FCE8EC] text-[#B21634]"
  }
  
  if (statusLabel === "در حال انجام") {
      return "bg-[#FFF8E1] text-[#B7791F]" 
  }
  
  return "bg-[#ECF9F7] text-[#267666]" 
}

export function OrderReviews() {
  const [activeTab, setActiveTab] = useState("active_orders")
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  
  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  
  // Status Update State
  const [openStatusId, setOpenStatusId] = useState<string | number | null>(null);

  const itemsPerPage = 10
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  const handleStatusUpdate = async (displayId: string | number, orderDetailId: string | number | undefined, newStatus: string) => {
      setOpenStatusId(null);
      
      // If we don't have a real orderDetailId, fallback to displayId (mostly safe if they are the same)
      const targetId = orderDetailId || displayId;
      
      setIsLoading(true); // Or use a local loading state for better UX
      /* Optimistic update could go here */
      
      const result = await studentService.updateOrderStatus(targetId, newStatus);
      
      if (result.success) {
          // Refetch to get updated data and status text
         if (activeTab === 'active_orders') {
             // Re-fetch logic
             const response = await studentService.getOrders();
             if (response.success && response.data) {
                 setOrders(response.data);
             }
         }
      } else {
          // Handle Error (Toast or nice alert)
          alert(result.message || "خطا در بروزرسانی وضعیت");
      }
      setIsLoading(false);
  }

  useEffect(() => {
    // Click outside listener for status dropdown
    const handleClickOutsideStatus = (event: MouseEvent) => {
        if (openStatusId !== null) {
            // Simple check: if click is not inside a status dropdown (handled by stopPropagation on the dropdown itself usually, but let's be safe)
            setOpenStatusId(null);
        }
    }
    document.addEventListener("click", handleClickOutsideStatus);
    return () => {
        document.removeEventListener("click", handleClickOutsideStatus);
    }
  }, [openStatusId]);

  useEffect(() => {
    const fetchOrders = async () => {
        setIsLoading(true);
        const response = await studentService.getOrders();
        if (response.success && response.data) {
            setOrders(response.data);
        }
        setIsLoading(false);
    };

    if (activeTab === 'active_orders') {
        fetchOrders();
    }
  }, [activeTab]);


  // Close filter when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [filterRef])

  // Scroll to right on mount or tab change
  useEffect(() => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth
    }
  }, [activeTab])
  
  // Reset filters and page on tab change
  useEffect(() => {
      setCurrentPage(1)
      setSelectedFilters([])
      setIsFilterOpen(false)
  }, [activeTab])

  // Determine data source & Filter Logic
  const rawData = activeTab === 'active_orders' ? orders : projects
  
  const currentData = rawData.filter((item: any) => {
      if (selectedFilters.length === 0) return true
      // Order uses statusText, Project uses statusLabel
      const status = item.statusText || item.statusLabel;
      return selectedFilters.includes(status)
  })

  
  // Calculate total pages
  const totalPages = Math.ceil(currentData.length / itemsPerPage)
  
  // Slice orders/projects for current page
  const currentItems = currentData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  )

  const handleNextPage = () => {
      if (currentPage < totalPages) {
          setCurrentPage(prev => prev + 1)
      }
  }

  const handlePrevPage = () => {
      if (currentPage > 1) {
          setCurrentPage(prev => prev - 1)
      }
  }

  // Handle Filter Checkbox Change
  const handleFilterChange = (statusLabel: string) => {
      setSelectedFilters(prev => {
          if (prev.includes(statusLabel)) {
              return prev.filter(f => f !== statusLabel)
          } else {
              return [...prev, statusLabel]
          }
      })
      setCurrentPage(1) // Reset to first page when filtering
  }

  // Define available filter options based on active tab
  const getFilterOptions = () => {
      if (activeTab === 'active_orders') {
          return [
              { label: "تحویل به مدرسه ", value: "تحویل به مدرسه " },
              { label: "ارسال نشده", value: "ارسال نشده" },
              { label: "ارسال شده", value: "ارسال شده" },
              { label: "در انتظار ارسال", value: "در انتظار ارسال" },
              { label: "سفارش جدید", value: "سفارش جدید" },
          ]
      } else {
          return [
              { label: "در حال انجام", value: "در حال انجام" },
              { label: "در انتظار تایید", value: "در انتظار تایید" },
              { label: "تکمیل شده", value: "تکمیل شده" },
              { label: "لغو شده", value: "لغو شده" },
          ]
      }
  }

  // Handle row click
  const handleRowClick = (item: any) => {
    if (activeTab === 'active_orders') {
        setSelectedOrder(item as Order)
    }
  }

  return (
    <div className="w-full flex-col justify-start items-end gap-3 inline-flex dir-rtl mb-8 relative">
      {selectedOrder && (
          <PopUpProduct 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
          />
      )}

      {/* Header */}
      <div className="self-stretch justify-end items-center px-1 inline-flex w-full">
         <div className="text-[#222831] text-lg font-num-medium leading-relaxed">
            {activeTab === 'active_orders' ? 'سفارش ها' : 'پروژه ها'}
         </div>
         {/* Spacer or extra actions could go here */}
      </div>

      {/* Tabs */}
      <div className="self-stretch h-9 p-0.5 bg-[#F6F6F6] rounded-lg border border-[#D7D8DA] justify-center items-center inline-flex">
         <div 
             onClick={() => setActiveTab("active_orders")}
             className={`flex-1 h-[29px] px-3 py-1 rounded-md justify-center items-center gap-2.5 flex cursor-pointer ${activeTab === 'active_orders' ? 'bg-[#F7C61A] shadow-sm border border-[#D7D8DA]' : 'hover:bg-gray-100'}`}
         >
             <div className="text-[#0A0A0A] text-sm font-semibold leading-tight">سفارش های  فعال</div>
         </div>
      </div>

      {/* Table Section */}
      <div className="self-stretch justify-start items-start gap-6 inline-flex w-full">
         <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl border border-[#DFE1E7] flex-col justify-start items-end inline-flex">
            
            {/* Table Top Bar */}
            <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] justify-between items-center inline-flex bg-white">
                <div className="flex justify-start items-center gap-2 relative" ref={filterRef}>
                    {/* Filter Button */}
                    <div 
                        className={`w-8 h-8 px-0 py-2 bg-white rounded-lg border border-[#DFE1E7] justify-center items-center gap-2 flex cursor-pointer transition-colors ${isFilterOpen ? 'bg-gray-100 ring-2 ring-blue-100' : 'hover:bg-gray-50'}`}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <Filter className={`w-4 h-4 ${selectedFilters.length > 0 ? 'text-[#F7C61A]' : 'text-[#666D80]'}`} />
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

                    {/* Search Button */}
                    <div className="w-8 h-8 p-2 bg-white rounded-lg border border-[#DFE1E7] justify-center items-center gap-2 flex cursor-pointer hover:bg-gray-50">
                         <Search className="w-4 h-4 text-[#666D80]" />
                    </div>
                </div>
                <div className="text-[#0D0D12] text-base font-semibold leading-normal tracking-wide">
                    {activeTab === 'active_orders' ? 'سفارش های  فعال' : 'پروژه های فعال'}
                </div>
            </div>

            {/* Scrollable Table Content */}
            <div 
                ref={scrollContainerRef}
                className="self-stretch w-full overflow-x-auto flex flex-col"
            >
                {/* Header Row */}
                <div className="flex min-w-max border-b border-[#DFE1E7] bg-[#F6F8FA]">
                     <div className="w-[44px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center"></div> {/* Spacer / Checkbox */}
                     <div className="w-[272px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-end">
                         <span className="text-right text-[#666D80] text-sm font-semibold tracking-wide">توضیحات</span>
                     </div>
                     <div className="w-[104px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                         <span className="text-[#666D80] text-sm font-semibold tracking-wide">وضعیت</span>
                     </div>
                     <div className="w-[140px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                         <span className="text-center text-[#666D80] text-sm font-semibold tracking-wide">درآمد شما از فروش</span>
                     </div>
                     <div className="w-[127px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                         <span className="text-center text-[#666D80] text-sm font-semibold tracking-wide">موعد تحویل</span>
                     </div>
                     <div className="w-[73px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                         <span className="text-center text-[#666D80] text-sm font-semibold tracking-wide">
                             {activeTab === 'active_orders' ? 'تعداد' : 'تیم'}
                         </span>
                     </div>
                     <div className="w-[272px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-end">
                         <span className="text-right text-[#666D80] text-sm font-semibold tracking-wide">
                             {activeTab === 'active_orders' ? 'محصول' : 'پروژه'}
                         </span>
                     </div>
                     <div className="w-[80px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-end">
                         {/* Header Checkbox */}
                         <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                     </div>
                </div>

                {/* Data Rows */}
                {currentItems.map((item: any) => (
                    <div 
                        key={item.id} 
                        className="flex min-w-max border-b border-[#DFE1E7] bg-white hover:bg-gray-50 cursor-pointer h-16"
                        onClick={() => handleRowClick(item)}
                    >
                         {/* Action / Icon Column */}
                         <div className="w-[44px] h-16 px-3 flex items-center justify-center border-b border-[#DFE1E7]">
                             <Eye className="w-5 h-5 text-[#666D80]" />
                         </div>
                         
                         {/* Description/Note */}
                         <div className="w-[272px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                             <div className="text-right text-[#0D0D12] text-sm font-semibold tracking-wide line-clamp-2">
                                 {item.description || item.note || '-'}
                             </div>
                         </div>

                         {/* Status */}
                         <div className="w-[104px] h-16 px-3 flex items-center justify-center border-b border-[#DFE1E7] relative">
                             <div 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenStatusId(openStatusId === item.id ? null : item.id);
                                }}
                                className={`px-2 py-0.5 rounded-2xl flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity gap-1 ${getStatusStyles(item.statusText || item.statusLabel)}`}
                             >
                                 <span className="text-center text-xs font-num-medium tracking-wide whitespace-nowrap">
                                     {item.statusText || item.statusLabel}
                                 </span>
                                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-50">
                                     <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                 </svg>
                             </div>

                             {/* Status Change Dropdown */}
                             {openStatusId === item.id && (
                                 <div 
                                    className="absolute top-12 z-[60] w-32 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.12)] border border-[#EFF0F2] p-1 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-200"
                                    onClick={(e) => e.stopPropagation()}
                                 >
                                     {[
                                         { label: 'در انتظار ارسال', value: '1' },
                                         { label: 'ارسال شده', value: '2' },
                                         { label: 'تحویل به مدرسه', value: '3' }, 
                                         // { label: 'تکمیل شده', value: '4' }, // Optional additional status
                                         { label: 'لغو شده', value: '9' }
                                     ].map((opt) => (
                                         <div 
                                            key={opt.value}
                                            className="px-3 py-2 text-xs text-[#0D0D12] hover:bg-gray-50 rounded-lg cursor-pointer text-right font-medium transition-colors"
                                            onClick={() => handleStatusUpdate(item.id, item.orderDetailId, opt.value)}
                                         >
                                             {opt.label}
                                         </div>
                                     ))}
                                 </div>
                             )}
                         </div>

                         {/* Price */}
                         <div className="w-[140px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                              <span className="text-center text-[#0D0D12] text-sm font-num-medium tracking-wide w-full"dir="rtl">
                                  {item.amount || toFarsiNumber(item.price)}
                              </span>
                         </div>

                         {/* Delivery Time */}
                         <div className="w-[127px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]"dir="rtl">
                              <span className="text-center text-[#0D0D12] text-sm font-num-medium tracking-wide w-full">
                                  {item.date || toFarsiNumber(item.deliveryTime)}
                              </span>
                         </div>

                         {/* Count / Team */}
                         <div className="w-[73px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                              <span className={`text-center text-[#0D0D12] text-sm ${activeTab === 'active_projects' ? "font-num-medium" : "font-num-medium"} tracking-wide w-full`}>
                                  {activeTab === 'active_orders' ? toFarsiNumber(item.count) : item.team || '-'}
                              </span>
                         </div>

                         {/* Product / Project Name */}
                          <div className="w-[272px] h-16 px-3 flex items-center justify-end gap-1 border-b border-[#DFE1E7]">
                              {activeTab === 'active_orders' ? (
                                <>
                                    <span className="text-[#0D0D12] text-sm font-semibold tracking-wide"> {item.productName || 'محصول'} | </span>
                                    <span className="text-[#0D0D12] text-sm font-num-medium tracking-wide"dir="rtl"> {toFarsiNumber(item.weight)} </span>
                                </>
                              ) : (
                                <span className="text-[#0D0D12] text-sm font-semibold tracking-wide"> {item.projectName} </span>
                              )}
                         </div>

                         {/* Index & Checkbox */}
                         <div className="w-[80px] h-16 px-3 flex items-center justify-start gap-2.5 border-b border-[#DFE1E7]">
                             <span className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium tracking-wide">
                                 {toFarsiNumber(item.id)}
                             </span>
                             <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                         </div>
                    </div>
                ))}

            </div>

            {/* Footer / Pagination */}
            <div className="self-stretch px-5 py-4 flex justify-between items-center w-full">
                 <div className="text-center text-[#0D0D12] text-sm font-num-medium tracking-wide">
                     صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}
                 </div>
                 <div className="flex justify-start items-center gap-2">
                     <button 
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`w-8 h-8 bg-white rounded-lg border border-[#DFE1E7] flex items-center justify-center transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                     >
                         <ChevronLeft className="w-4 h-4 text-[#0D0D12]" />
                     </button>
                     <div className="w-[55px] h-8 rounded-lg border border-[#DFE1E7] flex flex-col justify-center items-center">
                          <span className="text-[#0D0D12] text-xs font-num-medium tracking-wide">{toFarsiNumber(currentPage)}/{toFarsiNumber(totalPages)}</span>
                     </div>
                     <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`w-8 h-8 bg-white rounded-lg border border-[#DFE1E7] flex items-center justify-center transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                     >
                         <ChevronRight className="w-4 h-4 text-[#0D0D12]" />
                     </button>
                 </div>
            </div>

         </div>
      </div>
    </div>
  )
}

export default OrderReviews;

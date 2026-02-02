"use client"

import React, { useState, useEffect, useRef } from "react"
import { Search, Filter, ChevronLeft, ChevronRight, Eye, MoreHorizontal } from "lucide-react"
import { PopUpProduct } from "../products/PopUpProduct"
import { studentService, Order } from "@/app/services/studentService"
import { toFarsiNumber } from "@/app/services/common/utils"
import { OrderTable } from "./OrderTable"

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

 

// getStatusStyles removed (moved to OrderTable)

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

  // Bulk Selection State
  const [selectedOrderIds, setSelectedOrderIds] = useState<(string | number)[]>([])

  // Toggle Single Row Selection
  const handleSelectRow = (id: string | number) => {
      setSelectedOrderIds(prev => {
          if (prev.includes(id)) {
              return prev.filter(item => item !== id)
          } else {
              return [...prev, id]
          }
      })
  }

  // Toggle Select All (current page)
  const handleSelectAll = () => {
      // Check if all current visible items are selected
      const allSelected = currentItems.every(item => selectedOrderIds.includes(item.id))
      
      if (allSelected) {
          // Deselect all current items
          const currentIds = currentItems.map(item => item.id)
          setSelectedOrderIds(prev => prev.filter(id => !currentIds.includes(id)))
      } else {
          // Select all current items
          const currentIds = currentItems.map(item => item.id)
          // Add current IDs to selection, avoiding duplicates
          setSelectedOrderIds(prev => {
              const newSet = new Set([...prev, ...currentIds])
              return Array.from(newSet)
          })
      }
  }

  // Bulk Delivery Action
  const handleBulkDeliver = async () => {
      if (selectedOrderIds.length === 0) return;

      if (!confirm("آیا از تحویل سفارش‌های انتخاب شده به مدرسه اطمینان دارید؟")) return;

      setIsLoading(true);
      try {
          // Process updates in parallel
           await Promise.all(selectedOrderIds.map(id => 
              studentService.updateOrderStatus(id, "تحویل به مدرسه ") // Note space to match filter option
          ));
          
          // Refetch and clear selection
          const response = await studentService.getOrders();
          if (response.success && response.data) {
              setOrders(response.data);
          }
          setSelectedOrderIds([]);
      } catch (error) {
          console.error("Bulk update failed", error);
          alert("خطا در بروزرسانی وضعیت سفارش‌ها");
      } finally {
          setIsLoading(false);
      }
  }

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
    <div className="w-full flex-col justify-start items-end gap-3 inline-flex mb-8 relative" dir="rtl">
      {selectedOrder && (
          <PopUpProduct 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
          />
      )}

      {/* Header */}
      <div className="self-stretch justify-start items-center px-1 inline-flex w-full">
         <div className="text-[#222831] text-lg font-num-medium leading-relaxed">
            {activeTab === 'active_orders' ? 'سفارش ها' : 'پروژه ها'}
         </div>
      </div>

      {/* Tabs */}
      <div className="self-stretch h-9 p-0.5 bg-[#F6F6F6] rounded-lg border border-[#D7D8DA] justify-center items-center inline-flex">
         <div 
             onClick={() => setActiveTab("active_orders")}
             className={`flex-1 h-[29px] px-3 py-1 rounded-md justify-center items-center gap-2.5 flex cursor-pointer ${activeTab === 'active_orders' ? 'bg-[#F7C61A] shadow-sm border border-[#D7D8DA]' : 'hover:bg-gray-100'}`}
         >
             <div className="text-[#0A0A0A] text-sm font-semibold leading-tight">سفارش های  فعال</div>
         </div>
         {/* Projects Tab (Commented out as per request) */}
         {/* <div 
             onClick={() => setActiveTab("active_projects")}
             className={`flex-1 h-[29px] px-3 py-1 rounded-md justify-center items-center gap-2.5 flex cursor-pointer ${activeTab !== 'active_orders' ? 'bg-[#F7C61A] shadow-sm border border-[#D7D8DA]' : 'hover:bg-gray-100'}`}
         >
             <div className="text-[#0A0A0A] text-sm font-semibold leading-tight">پروژه های فعال</div>
         </div> */}
      </div>

      {/* Table Section */}
      <div className="self-stretch justify-start items-start gap-6 inline-flex w-full">
         <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl border border-[#DFE1E7] flex-col justify-start items-end inline-flex">
            
            {/* Table Top Bar */}
            <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] justify-between items-center inline-flex bg-white">
                <div className="text-[#0D0D12] text-base font-semibold leading-normal tracking-wide">
                    {activeTab === 'active_orders' ? 'سفارش های  فعال' : 'پروژه های فعال'}
                </div>

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
            </div>

            {/* Scrollable Table Content */}
            <div 
                ref={scrollContainerRef}
                className="self-stretch w-full overflow-x-auto flex flex-col no-scrollbar"
            >
                {activeTab === 'active_orders' ? (
                    <div className="min-w-[1120px]">
                        <OrderTable 
                            orders={currentItems}
                            isLoading={false}
                            selectedOrderIds={selectedOrderIds}
                            onSelectRow={handleSelectRow}
                            onSelectAll={handleSelectAll}
                            onRowClick={handleRowClick}
                            showCheckboxes={true}
                        />
                    </div>
                ) : (
                     <div className="min-w-[1120px]">
                        {/* Header Row - Legacy Projects Style */}
                        <div className="flex min-w-max border-b border-[#DFE1E7] bg-[#F6F8FA]">
                             <div className="w-[44px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center"></div>
                             <div className="w-[272px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-end">
                                 <span className="text-right text-[#666D80] text-sm font-semibold tracking-wide">توضیحات</span>
                             </div>
                             <div className="w-[104px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                                 <span className="text-[#666D80] text-sm font-semibold tracking-wide">وضعیت</span>
                             </div>
                             <div className="w-[140px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                                 <span className="text-center text-[#666D80] text-sm font-semibold tracking-wide">درآمد شما</span>
                             </div>
                             <div className="w-[127px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                                 <span className="text-center text-[#666D80] text-sm font-semibold tracking-wide">موعد تحویل</span>
                             </div>
                             <div className="w-[73px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                                 <span className="text-center text-[#666D80] text-sm font-semibold tracking-wide">تیم</span>
                             </div>
                             <div className="w-[272px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-end">
                                 <span className="text-right text-[#666D80] text-sm font-semibold tracking-wide">پروژه</span>
                             </div>
                             <div className="w-[80px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-end">
                                 <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                             </div>
                        </div>

                        {/* Data Rows - Legacy */}
                        {currentItems.map((item: any) => (
                            <div 
                                key={item.id} 
                                className="flex min-w-max border-b border-[#DFE1E7] bg-white hover:bg-gray-50 cursor-pointer h-16"
                                onClick={() => handleRowClick(item)}
                            >
                                 <div className="w-[44px] h-16 px-3 flex items-center justify-center border-b border-[#DFE1E7]">
                                     <Eye className="w-5 h-5 text-[#666D80]" />
                                 </div>
                                 <div className="w-[272px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                                     <div className="text-right text-[#0D0D12] text-sm font-semibold tracking-wide line-clamp-2">
                                         {item.description || item.note || '-'}
                                     </div>
                                 </div>
                                 <div className="w-[104px] h-16 px-3 flex items-center justify-center border-b border-[#DFE1E7]">
                                     <span className="text-[#0D0D12] text-xs">{item.statusLabel || '-'}</span>
                                 </div>
                                 <div className="w-[140px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                                      <span className="text-center text-[#0D0D12] text-sm font-num-medium">{item.price}</span>
                                 </div>
                                 <div className="w-[127px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                                      <span className="text-center text-[#0D0D12] text-sm font-num-medium">{item.deadline}</span>
                                 </div>
                                 <div className="w-[73px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                                      <span className="text-center text-[#0D0D12] text-sm font-num-medium">{item.team}</span>
                                 </div>
                                 <div className="w-[272px] h-16 px-3 flex items-center justify-end gap-1 border-b border-[#DFE1E7]">
                                      <span className="text-[#0D0D12] text-sm font-semibold"> {item.projectName} </span>
                                 </div>
                                 <div className="w-[80px] h-16 px-3 flex items-center justify-start gap-2.5 border-b border-[#DFE1E7]">
                                     <span className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium"> {toFarsiNumber(item.id)} </span>
                                     <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                                 </div>
                            </div>
                        ))}
                     </div>
                )}
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
       {/* Bottom Sheet Action Bar */}
       <div className={`fixed bottom-0 left-0 right-0 w-full bg-white border-t border-[#DFE1E7] p-4 z-[100] transition-all duration-300 ease-in-out transform ${selectedOrderIds.length > 0 ? 'translate-y-0 opacity-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]' : 'translate-y-full opacity-0 pointer-events-none shadow-none'}`}>
            <div className="max-w-[1120px] mx-auto flex items-center justify-between">
                

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#F7C61A] rounded-full flex items-center justify-center text-[#0D0D12] font-bold text-sm">
                        {toFarsiNumber(selectedOrderIds.length)}
                    </div>
                    <span className="text-[#0D0D12] text-sm font-medium">سفارش انتخاب شده</span>
                    
                </div>
                <button 
                    onClick={handleBulkDeliver}
                    disabled={isLoading}
                    className="h-10 px-6 bg-[#F7C61A] rounded-lg text-[#0D0D12] text-sm font-semibold hover:bg-[#E5B50F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    تحویل سفارش به مدرسه
                </button>
            </div>
       </div>
    </div>
  )
}

export default OrderReviews;

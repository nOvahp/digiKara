"use client"

import React, { useState } from "react"
import { Search, Filter, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { PopUpProduct } from "./PopUpProduct"

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

// Interface for Order Data
export interface Order {
  id: number
  productName: string
  weight: string
  count: number
  deliveryTime: string // formatted string "1 روز تا تحویل"
  price: string // formatted price
  status: "delivered" | "not_sent" | "pending" | "sent"
  statusLabel: string
  description?: string // e.g., "تخفیف ویژه", "بسته بندی سفارشی"
  note: string // e.g., "یادداشت ندارد"
  hasDescription: boolean
}

const orders: Order[] = [
  {
    id: 1,
    productName: "عسل آویشن ارگانیک",
    weight: "500 گرم",
    count: 1,
    deliveryTime: "1 روز تا تحویل" ,
    price: "۴,۵۰۰,۰۰۰ ریال",
    status: "delivered",
    statusLabel: "تحویل به مدرسه",
    note: "یادداشت ندارد",
    hasDescription: true,
  },
  {
    id: 2,
    productName: "عسل آویشن ارگانیک",
    weight: "500 گرم",
    count: 2,
    deliveryTime: "1 روز تا تحویل",
    price: "۶,۰۰۰,۰۰۰ ریال",
    status: "not_sent",
    statusLabel: "ارسال نشده",
    description: "تخفیف ویژه",
    note: "توضیحات ندارد",
    hasDescription: true,
  },
  {
    id: 3,
    productName: "عسل آویشن ارگانیک",
    weight: "200 گرم",
    count: 4,
    deliveryTime: "4 روز تا تحویل",
    price: "۶,۰۰۰,۰۰۰ ریال",
    status: "not_sent",
    statusLabel: "ارسال نشده",
    description: "تخفیف ویژه",
    note: "توضیحات ندارد",
    hasDescription: true,
  },
  {
    id: 4,
    productName: "عسل زعفران ارگانیک",
    weight: "200 گرم",
    count: 3,
    deliveryTime: "1 روز تا تحویل",
    price: "۷,۵۰۰,۰۰۰ ریال",
    status: "sent",
    statusLabel: "ارسال شده",
    note: "توضیحات ندارد",
    hasDescription: true,
  },
  {
    id: 5,
    productName: "موم عسل طبیعی",
    weight: "بسته بندی کادوئی",
    count: 1,
    deliveryTime: "1 روز تا تحویل",
    price: "۳,۰۰۰,۰۰۰ ریال",
    status: "sent",
    statusLabel: "ارسال شده",
    description: "بسته بندی سفارشی",
    note: "توضیحات ندارد",
    hasDescription: true,
  },
  {
    id: 6,
    productName: "عسل زعفران ارگانیک",
    weight: "200 گرم",
    count: 4,
    deliveryTime: "4 روز تا تحویل",
    price: "۵,۲۰۰,۰۰۰ ریال",
    status: "not_sent",
    statusLabel: "ارسال نشده",
    description: "ارسال سریع",
    note: "توضیحات ندارد",
    hasDescription: true, 
  },
   {
       id: 7,
       productName: "عسل زعفران ارگانیک",
       weight: "200 گرم",
       count: 5,
       deliveryTime: "4 روز تا تحویل",
       price: "۴,۰۰۰,۰۰۰ ریال",
       status: "not_sent",
       statusLabel: "ارسال نشده",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 8,
       productName: "گرده گل ارگانیک",
       weight: "20 گرم",
       count: 6,
       deliveryTime: "6 روز تا تحویل",
       price: "۷,۰۰۰,۰۰۰ ریال",
       status: "sent",
       statusLabel: "ارسال شده",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 9, 
       productName: "عسل طبیعی",
       weight: "50 گرم",
       count: 7,
       deliveryTime: "3 روز تا تحویل",
       price: "۳,۵۰۰,۰۰۰ ریال",
       status: "pending",
       statusLabel: "در انتظار ارسال",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 10,
       productName: "چای سبز ارگانیک",
       weight: "100 گرم",
       count: 8,
       deliveryTime: "5 روز تا تحویل",
       price: "۲,۵۰۰,۰۰۰ ریال",
       status: "not_sent",
       statusLabel: "ارسال نشده",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 11,
       productName: "زعفران خالص",
       weight: "10 گرم",
       count: 9,
       deliveryTime: "6 روز تا تحویل",
       price: "۷,۰۰۰,۰۰۰ ریال",
       status: "not_sent",
       statusLabel: "ارسال نشده",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 12,
       productName: "زعفران خالص",
       weight: "10 گرم",
       count: 5,
       deliveryTime: "2 روز تا تحویل",
       price: "۵,۰۰۰,۰۰۰ ریال",
       status: "sent",
       statusLabel: "ارسال شده",
        note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 13,
       productName: "مربای توت فرنگی",
       weight: "250 گرم",
       count: 10,
       deliveryTime: "1 روز تا تحویل",
       price: "۶,۰۰۰,۰۰۰ ریال",
       status: "sent",
       statusLabel: "سفارش جدید",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 14,
       productName: "عسل کوهی",
       weight: "1 کیلوگرم",
       count: 2,
       deliveryTime: "3 روز تا تحویل",
       price: "۸,۵۰۰,۰۰۰ ریال",
       status: "pending",
       statusLabel: "در انتظار ارسال",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 15,
       productName: "شیره انگور",
       weight: "500 گرم",
       count: 5,
       deliveryTime: "2 روز تا تحویل",
       price: "۲,۰۰۰,۰۰۰ ریال",
       status: "sent",
       statusLabel: "ارسال شده",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 16,
       productName: "روغن زرد حیوانی",
       weight: "1 کیلوگرم",
       count: 1,
       deliveryTime: "4 روز تا تحویل",
       price: "۱۲,۰۰۰,۰۰۰ ریال",
       status: "not_sent",
       statusLabel: "ارسال نشده",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 17,
       productName: "کشک محلی",
       weight: "500 گرم",
       count: 3,
       deliveryTime: "5 روز تا تحویل",
       price: "۱,۵۰۰,۰۰۰ ریال",
       status: "sent",
       statusLabel: "ارسال شده",
       hasDescription: true,
       note: "توضیحات ندارد",
   },
   {
       id: 18,
       productName: "قره قروت",
       weight: "200 گرم",
       count: 10,
       deliveryTime: "6 روز تا تحویل",
       price: "۹۰۰,۰۰۰ ریال",
       status: "delivered",
       statusLabel: "تحویل به مدرسه",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 19,
       productName: "نان سنتی",
       weight: "بسته 5 تایی",
       count: 4,
       deliveryTime: "1 روز تا تحویل",
       price: "۵۰۰,۰۰۰ ریال",
       status: "pending",
       statusLabel: "در انتظار ارسال",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 20,
       productName: "رب انار",
       weight: "1 کیلوگرم",
       count: 2,
       deliveryTime: "3 روز تا تحویل",
       price: "۳,۲۰۰,۰۰۰ ریال",
       status: "not_sent",
       statusLabel: "ارسال نشده",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 21,
       productName: "آبغوره طبیعی",
       weight: "1 لیتر",
       count: 6,
       deliveryTime: "2 روز تا تحویل",
       price: "۱,۸۰۰,۰۰۰ ریال",
       status: "sent",
       statusLabel: "ارسال شده",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 22,
       productName: "سرکه سیب",
       weight: "1 لیتر",
       count: 3,
       deliveryTime: "4 روز تا تحویل",
       price: "۱,۲۰۰,۰۰۰ ریال",
       status: "delivered",
       statusLabel: "تحویل به مدرسه",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 23,
       productName: "لواشک خانگی",
       weight: "100 گرم",
       count: 15,
       deliveryTime: "5 روز تا تحویل",
       price: "۸۰۰,۰۰۰ ریال",
       status: "pending",
       statusLabel: "در انتظار ارسال",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 24,
       productName: "سبزی خشک",
       weight: "200 گرم",
       count: 8,
       deliveryTime: "6 روز تا تحویل",
       price: "۱,۴۰۰,۰۰۰ ریال",
       status: "not_sent",
       statusLabel: "ارسال نشده",
       note: "توضیحات ندارد",
       hasDescription: true
   },
   {
       id: 25,
       productName: "نعنا خشک",
       weight: "100 گرم",
       count: 5,
       deliveryTime: "1 روز تا تحویل",
       price: "۶۰۰,۰۰۰ ریال",
       status: "sent",
       statusLabel: "ارسال شده",
       note: "توضیحات ندارد",
       hasDescription: true
   }
]



const getStatusStyles = (statusLabel: string) => {
  if (statusLabel.includes("تحویل به مدرسه") || statusLabel.includes("ارسال شده")) {
     // Greenish for "Sent" or "Delivered" if intended, but looking at code:
     // "تحویل به مدرسه" -> bg-[#ECF9F7] text-[#267666] (Green)
     // "ارسال شده" (in some rows) -> bg-[#ECF9F7] text-[#267666] (Green)
     // BUT "ارسال شده" (in others, e.g. Gerdeh Gol) -> bg-[#FCE8EC] text-[#B21634] (Red).
     // I will use exact string matching from code for logic.
     if (statusLabel === "تحویل به مدرسه" || (statusLabel === "ارسال شده" && !statusLabel.includes("red"))) return "bg-[#ECF9F7] text-[#267666]"
  }
  
  if (statusLabel === "ارسال نشده" || statusLabel === "در انتظار ارسال") {
      return "bg-[#FCE8EC] text-[#B21634]"
  }
  
  // For the weird case where "ارسال شده" is Red in the code snippet:
  // Since I can't distinguish by ID easily without data, I'll assume Green for "Sent" and Red for "Not Sent" generally,
  // unless specific override.
  // The snippet had one "ارسال شده" with Red. I'll default "ارسال شده" to Green.
  return "bg-[#ECF9F7] text-[#267666]" 
}

export function OrderReviews() {
  const [activeTab, setActiveTab] = useState("active_orders")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const itemsPerPage = 10
  
  // Calculate total pages
  const totalPages = Math.ceil(orders.length / itemsPerPage)
  
  // Slice orders for current page
  const currentOrders = orders.slice(
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

  // Placeholder function for row click
  const handleRowClick = (order: Order) => {
    setSelectedOrder(order)
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
         <div className="text-[#222831] text-lg font-extrabold font-num-medium leading-relaxed">
            سفارش ها
         </div>
         {/* Spacer or extra actions could go here */}
      </div>

      {/* Tabs */}
      <div className="self-stretch h-9 p-0.5 bg-[#F6F6F6] rounded-lg border border-[#D7D8DA] justify-center items-center inline-flex">
         <div 
            onClick={() => setActiveTab("active_projects")}
            className={`flex-1 h-[29px] px-3 py-1 rounded-md justify-center items-center gap-2.5 flex cursor-pointer ${activeTab === 'active_projects' ? 'bg-[#F7C61A] shadow-sm border border-[#D7D8DA]' : ''}`}
         >
             <div className="text-[#0A0A0A] text-sm font-semibold font-['PeydaWeb'] leading-tight">پروژه های فعال</div>
         </div>
         <div 
             onClick={() => setActiveTab("active_orders")}
             className={`flex-1 h-[29px] px-3 py-1 rounded-md justify-center items-center gap-2.5 flex cursor-pointer ${activeTab === 'active_orders' ? 'bg-[#F7C61A] shadow-sm border border-[#D7D8DA]' : ''}`}
         >
             <div className="text-[#0A0A0A] text-sm font-semibold font-['PeydaWeb'] leading-tight">سفارش های  فعال</div>
         </div>
      </div>

      {/* Table Section */}
      <div className="self-stretch justify-start items-start gap-6 inline-flex w-full">
         <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl border border-[#DFE1E7] overflow-hidden flex-col justify-start items-end inline-flex">
            
            {/* Table Top Bar */}
            <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] justify-between items-center inline-flex bg-white">
                <div className="flex justify-start items-center gap-2">
                    {/* Filter Button */}
                    <div className="w-8 h-8 px-0 py-2 bg-white rounded-lg border border-[#DFE1E7] justify-center items-center gap-2 flex cursor-pointer hover:bg-gray-50">
                        <Filter className="w-4 h-4 text-[#666D80]" />
                    </div>
                    {/* Search Button */}
                    <div className="w-8 h-8 p-2 bg-white rounded-lg border border-[#DFE1E7] justify-center items-center gap-2 flex cursor-pointer hover:bg-gray-50">
                         <Search className="w-4 h-4 text-[#666D80]" />
                    </div>
                </div>
                <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] leading-normal tracking-wide">
                    سفارش های  فعال
                </div>
            </div>

            {/* Scrollable Table Content */}
            <div className="self-stretch w-full overflow-x-auto flex flex-col">
                {/* Header Row */}
                <div className="flex min-w-max border-b border-[#DFE1E7] bg-[#F6F8FA]">
                     <div className="w-[44px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center"></div> {/* Spacer / Checkbox */}
                     <div className="w-[272px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-end">
                         <span className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] tracking-wide">توضیحات</span>
                     </div>
                     <div className="w-[104px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                         <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] tracking-wide">وضعیت</span>
                     </div>
                     <div className="w-[140px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                         <span className="text-center text-[#666D80] text-sm font-semibold font-['PeydaWeb'] tracking-wide">درآمد شما از فروش</span>
                     </div>
                     <div className="w-[127px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                         <span className="text-center text-[#666D80] text-sm font-semibold font-['PeydaWeb'] tracking-wide">موعد تحویل</span>
                     </div>
                     <div className="w-[73px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-center">
                         <span className="text-center text-[#666D80] text-sm font-semibold font-['PeydaWeb'] tracking-wide">تعداد</span>
                     </div>
                     <div className="w-[272px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-end">
                         <span className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] tracking-wide">محصول</span>
                     </div>
                     <div className="w-[80px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-end">
                         {/* Header Checkbox */}
                         <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                     </div>
                </div>

                {/* Data Rows */}
                {currentOrders.map((order) => (
                    <div 
                        key={order.id} 
                        className="flex min-w-max border-b border-[#DFE1E7] bg-white hover:bg-gray-50 cursor-pointer h-16"
                        onClick={() => handleRowClick(order)}
                    >
                         {/* Action / Icon Column */}
                         <div className="w-[44px] h-16 px-3 flex items-center justify-center border-b border-[#DFE1E7]">
                             <Eye className="w-5 h-5 text-[#666D80]" />
                         </div>
                         
                         {/* Description/Note */}
                         <div className="w-[272px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                             <div className="text-right text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] tracking-wide line-clamp-2">
                                 {order.description || order.note}
                             </div>
                         </div>

                         {/* Status */}
                         <div className="w-[104px] h-16 px-3 flex items-center justify-center border-b border-[#DFE1E7]">
                             <div className={`px-2 py-0.5 rounded-2xl flex items-center justify-center ${getStatusStyles(order.statusLabel)}`}>
                                 <span className="text-center text-xs font-normal font-num-medium tracking-wide whitespace-nowrap">
                                     {order.statusLabel}
                                 </span>
                             </div>
                         </div>

                         {/* Price */}
                         <div className="w-[140px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                              <span className="text-center text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] tracking-wide w-full">
                                  {toFarsiNumber(order.price)}
                              </span>
                         </div>

                         {/* Delivery Time */}
                         <div className="w-[127px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                              <span className="text-center text-[#0D0D12] text-sm font-semibold font-num-medium tracking-wide w-full">
                                  {toFarsiNumber(order.deliveryTime)}
                              </span>
                         </div>

                         {/* Count */}
                         <div className="w-[73px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                              <span className="text-center text-[#0D0D12] text-sm font-semibold font-num-medium tracking-wide w-full">
                                  {toFarsiNumber(order.count)}
                              </span>
                         </div>

                         {/* Product Name */}
                          <div className="w-[272px] h-16 px-3 flex items-center justify-end gap-1 border-b border-[#DFE1E7]">
                              <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] tracking-wide"> {order.productName} | </span>
                              <span className="text-[#0D0D12] text-sm font-semibold font-num-medium tracking-wide"dir="rtl"> {toFarsiNumber(order.weight)} </span>
                         </div>

                         {/* Index & Checkbox */}
                         <div className="w-[80px] h-16 px-3 flex items-center justify-start gap-2.5 border-b border-[#DFE1E7]">
                             <span className="flex-1 text-center text-[#0D0D12] text-sm font-semibold font-num-medium tracking-wide">
                                 {toFarsiNumber(order.id)}
                             </span>
                             <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                         </div>
                    </div>
                ))}

            </div>

            {/* Footer / Pagination */}
            <div className="self-stretch px-5 py-4 flex justify-between items-center w-full">
                 <div className="text-center text-[#0D0D12] text-sm font-medium font-num-medium tracking-wide">
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
                         <span className="text-[#0D0D12] text-xs font-medium font-num-medium tracking-wide">{toFarsiNumber(currentPage)}/{toFarsiNumber(totalPages)}</span>
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

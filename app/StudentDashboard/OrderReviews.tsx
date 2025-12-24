"use client"

import React, { useState, useEffect, useRef } from "react"
import { Search, Filter, ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { PopUpProduct } from "./PopUpProduct"

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

// Interface for Project Data
export interface Project {
  id: number
  projectName: string
  category: string
  deadline: string
  price: string
  status: "completed" | "in_progress" | "pending" | "canceled"
  statusLabel: string
  description?: string
  team?: string // e.g. "تیم طراحی", "انفرادی"
}

const projects: Project[] = [
    {
        id: 1,
        projectName: "طراحی لوگو شرکتی",
        category: "گرافیک",
        deadline: "2 روز تا تحویل",
        price: "۱۵,۰۰۰,۰۰۰ ریال",
        status: "in_progress",
        statusLabel: "در حال انجام",
        description: "لوگو برای شرکت تکنولوژی",
        team: "تیم الف"
    },
    {
        id: 2,
        projectName: "توسعه وبسایت فروشگاهی",
        category: "برنامه نویسی",
        deadline: "10 روز تا تحویل",
        price: "۸۰,۰۰۰,۰۰۰ ریال",
        status: "pending",
        statusLabel: "در انتظار تایید",
        description: "مرحله اول: طراحی UI",
        team: "تیم ب"
    },
    {
        id: 3,
        projectName: "تولید محتوای اینستاگرام",
        category: "تولید محتوا",
        deadline: "1 روز تا تحویل",
        price: "۵,۰۰۰,۰۰۰ ریال",
        status: "completed",
        statusLabel: "تکمیل شده",
        description: "پکیج 10 پست",
        team: "انفرادی"
    },
    {
        id: 4,
        projectName: "سئو و بهینه سازی",
        category: "دیجیتال مارکتینگ",
        deadline: "15 روز تا تحویل",
        price: "۴۵,۰۰۰,۰۰۰ ریال",
        status: "in_progress",
        statusLabel: "در حال انجام",
        description: "بهینه سازی کلیدواژه ها",
        team: "انفرادی"
    },
    {
        id: 5,
        projectName: "طراحی کارت ویزیت",
        category: "گرافیک",
        deadline: "3 روز تا تحویل",
        price: "۳,۰۰۰,۰۰۰ ریال",
        status: "in_progress",
        statusLabel: "در حال انجام",
        description: "دو رو، لمینت",
        team: "تیم الف"
    },
    {
        id: 6,
        projectName: "ترجمه مقاله تخصصی",
        category: "ترجمه",
        deadline: "4 روز تا تحویل",
        price: "۲,۵۰۰,۰۰۰ ریال",
        status: "pending",
        statusLabel: "در انتظار تایید",
        description: "متن پزشکی",
        team: "انفرادی"
    },
    {
        id: 7,
        projectName: "طراحی بنر سایت",
        category: "گرافیک",
        deadline: "1 روز تا تحویل",
        price: "۱,۵۰۰,۰۰۰ ریال",
        status: "completed",
        statusLabel: "تکمیل شده",
        description: "سایز استاندارد",
        team: "تیم ب"
    },
    {
        id: 8,
        projectName: "برنامه نویسی اپلیکیشن",
        category: "برنامه نویسی",
        deadline: "20 روز تا تحویل",
        price: "۱۲۰,۰۰۰,۰۰۰ ریال",
        status: "in_progress",
        statusLabel: "در حال انجام",
        description: "نسخه اندروید و iOS",
        team: "تیم ج"
    },
    {
        id: 9,
        projectName: "مشاوره کسب و کار",
        category: "مشاوره",
        deadline: "2 روز تا تحویل",
        price: "۱۰,۰۰۰,۰۰۰ ریال",
        status: "completed",
        statusLabel: "تکمیل شده",
        description: "استراتژی بازاریابی",
        team: "انفرادی"
    },
    {
        id: 10,
        projectName: "عکاسی صنعتی",
        category: "عکاسی",
        deadline: "5 روز تا تحویل",
        price: "۲۵,۰۰۰,۰۰۰ ریال",
        status: "in_progress",
        statusLabel: "در حال انجام",
        description: "محصولات فروشگاهی",
        team: "تیم الف"
    },
    {
        id: 11,
        projectName: "ادیت ویدیو یوتیوب",
        category: "تدوین",
        deadline: "3 روز تا تحویل",
        price: "۴,۰۰۰,۰۰۰ ریال",
        status: "pending",
        statusLabel: "در انتظار تایید",
        description: "ولاگ سفر",
        team: "انفرادی"
    },
    {
        id: 12,
        projectName: "طراحی کاتالوگ",
        category: "گرافیک",
        deadline: "6 روز تا تحویل",
        price: "۸,۰۰۰,۰۰۰ ریال",
        status: "in_progress",
        statusLabel: "در حال انجام",
        description: "کاتالوگ دیجیتال",
        team: "تیم ب"
    },
    {
        id: 13,
        projectName: "نوشتن متن تبلیغاتی",
        category: "تولید محتوا",
        deadline: "1 روز تا تحویل",
        price: "۱,۰۰۰,۰۰۰ ریال",
        status: "canceled",
        statusLabel: "لغو شده",
        description: "کپی رایتینگ",
        team: "انفرادی"
    },
    {
        id: 14,
        projectName: "ساخت انیمیشن",
        category: "انیمیشن",
        deadline: "15 روز تا تحویل",
        price: "۵۰,۰۰۰,۰۰۰ ریال",
        status: "in_progress",
        statusLabel: "در حال انجام",
        description: "موشن گرافیک 1 دقیقه",
        team: "تیم ج"
    },
    {
        id: 15,
        projectName: "پروژه دیتا انتری",
        category: "اداری",
        deadline: "7 روز تا تحویل",
        price: "۳,۰۰۰,۰۰۰ ریال",
        status: "completed",
        statusLabel: "تکمیل شده",
        description: "ورود اطلاعات اکسل",
        team: "انفرادی"
    },
    {
        id: 16,
        projectName: "طراحی UI/UX",
        category: "طراحی",
        deadline: "12 روز تا تحویل",
        price: "۳۵,۰۰۰,۰۰۰ ریال",
        status: "in_progress",
        statusLabel: "در حال انجام",
        description: "ریدیزاین پنل",
        team: "تیم الف"
    },
    {
        id: 17,
        projectName: "پشتیبانی وردپرس",
        category: "پشتیبانی",
        deadline: "30 روز تا تحویل",
        price: "۱۵,۰۰۰,۰۰۰ ریال",
        status: "in_progress",
        statusLabel: "در حال انجام",
        description: "رفع ایرادات فنی",
        team: "تیم ب"
    },
    {
        id: 18,
        projectName: "گویندگی تیزر",
        category: "صداگذاری",
        deadline: "2 روز تا تحویل",
        price: "۲,۰۰۰,۰۰۰ ریال",
        status: "pending",
        statusLabel: "در انتظار تایید",
        description: "نریشن فارسی",
        team: "انفرادی"
    },
    {
        id: 19,
        projectName: "تحقیق کلمات کلیدی",
        category: "سئو",
        deadline: "3 روز تا تحویل",
        price: "۵,۰۰۰,۰۰۰ ریال",
        status: "completed",
        statusLabel: "تکمیل شده",
        description: "کیورد ریسرچ کامل",
        team: "انفرادی"
    },
    {
        id: 20,
        projectName: "طراحی لیبل محصول",
        category: "گرافیک",
        deadline: "4 روز تا تحویل",
        price: "۴,۵۰۰,۰۰۰ ریال",
        status: "in_progress",
        statusLabel: "در حال انجام",
        description: "لیبل مواد غذایی",
        team: "تیم الف"
    }
]

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
    statusLabel: "تحویل به مدرسه ",
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
       statusLabel: "تحویل به مدرسه ",
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
       statusLabel: "تحویل به مدرسه ",
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
  if (statusLabel.includes("تحویل به مدرسه ") || statusLabel.includes("ارسال شده") || statusLabel === "تکمیل شده") {
     if (statusLabel === "تحویل به مدرسه " || (statusLabel === "ارسال شده" && !statusLabel.includes("red")) || statusLabel === "تکمیل شده") return "bg-[#ECF9F7] text-[#267666]"
  }
  
  if (statusLabel === "ارسال نشده" || statusLabel === "در انتظار ارسال" || statusLabel === "در انتظار تایید" || statusLabel === "لغو شده") {
      return "bg-[#FCE8EC] text-[#B21634]"
  }
  
  if (statusLabel === "در حال انجام") {
      return "bg-[#FFF8E1] text-[#B7791F]" // Warnings/Progress color (Yellow/Orange)
  }
  
  return "bg-[#ECF9F7] text-[#267666]" 
}

export function OrderReviews() {
  const [activeTab, setActiveTab] = useState("active_projects") // Default to Active Projects
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  
  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  
  const itemsPerPage = 10
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

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
      return selectedFilters.includes(item.statusLabel)
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

  // Reset pagination on tab change - REMOVED (Handled in the new useEffect)
  // useEffect(() => {
  //     setCurrentPage(1)
  // }, [activeTab])

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
            {activeTab === 'active_orders' ? 'سفارش ها' : 'پروژه ها'}
         </div>
         {/* Spacer or extra actions could go here */}
      </div>

      {/* Tabs */}
      <div className="self-stretch h-9 p-0.5 bg-[#F6F6F6] rounded-lg border border-[#D7D8DA] justify-center items-center inline-flex">
         <div 
            onClick={() => setActiveTab("active_projects")}
            className={`flex-1 h-[29px] px-3 py-1 rounded-md justify-center items-center gap-2.5 flex cursor-pointer ${activeTab === 'active_projects' ? 'bg-[#F7C61A] shadow-sm border border-[#D7D8DA]' : 'hover:bg-gray-100'}`}
         >
             <div className="text-[#0A0A0A] text-sm font-semibold font-['PeydaWeb'] leading-tight">پروژه های فعال</div>
         </div>
         <div 
             onClick={() => setActiveTab("active_orders")}
             className={`flex-1 h-[29px] px-3 py-1 rounded-md justify-center items-center gap-2.5 flex cursor-pointer ${activeTab === 'active_orders' ? 'bg-[#F7C61A] shadow-sm border border-[#D7D8DA]' : 'hover:bg-gray-100'}`}
         >
             <div className="text-[#0A0A0A] text-sm font-semibold font-['PeydaWeb'] leading-tight">سفارش های  فعال</div>
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
                <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] leading-normal tracking-wide">
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
                         <span className="text-center text-[#666D80] text-sm font-semibold font-['PeydaWeb'] tracking-wide">
                             {activeTab === 'active_orders' ? 'تعداد' : 'تیم'}
                         </span>
                     </div>
                     <div className="w-[272px] h-10 px-3 bg-[#F6F8FA] flex items-center justify-end">
                         <span className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] tracking-wide">
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
                             <div className="text-right text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] tracking-wide line-clamp-2">
                                 {item.description || item.note}
                             </div>
                         </div>

                         {/* Status */}
                         <div className="w-[104px] h-16 px-3 flex items-center justify-center border-b border-[#DFE1E7]">
                             <div className={`px-2 py-0.5 rounded-2xl flex items-center justify-center ${getStatusStyles(item.statusLabel)}`}>
                                 <span className="text-center text-xs font-normal font-num-medium tracking-wide whitespace-nowrap">
                                     {item.statusLabel}
                                 </span>
                             </div>
                         </div>

                         {/* Price */}
                         <div className="w-[140px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                              <span className="text-center text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] tracking-wide w-full"dir="rtl">
                                  {toFarsiNumber(item.price)}
                              </span>
                         </div>

                         {/* Delivery Time */}
                         <div className="w-[127px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]"dir="rtl">
                              <span className="text-center text-[#0D0D12] text-sm font-semibold font-num-medium tracking-wide w-full">
                                  {toFarsiNumber(item.deliveryTime)}
                              </span>
                         </div>

                         {/* Count / Team */}
                         <div className="w-[73px] h-16 px-3 flex items-center justify-end border-b border-[#DFE1E7]">
                              <span className={`text-center text-[#0D0D12] text-sm ${activeTab === 'active_projects' ? "font-num-medium font-semibold" : "font-num-medium font-semibold"} tracking-wide w-full`}>
                                  {activeTab === 'active_orders' ? toFarsiNumber(item.count) : item.team || '-'}
                              </span>
                         </div>

                         {/* Product / Project Name */}
                          <div className="w-[272px] h-16 px-3 flex items-center justify-end gap-1 border-b border-[#DFE1E7]">
                              {activeTab === 'active_orders' ? (
                                <>
                                    <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] tracking-wide"> {item.productName} | </span>
                                    <span className="text-[#0D0D12] text-sm font-semibold font-num-medium tracking-wide"dir="rtl"> {toFarsiNumber(item.weight)} </span>
                                </>
                              ) : (
                                <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] tracking-wide"> {item.projectName} </span>
                              )}
                         </div>

                         {/* Index & Checkbox */}
                         <div className="w-[80px] h-16 px-3 flex items-center justify-start gap-2.5 border-b border-[#DFE1E7]">
                             <span className="flex-1 text-center text-[#0D0D12] text-sm font-semibold font-num-medium tracking-wide">
                                 {toFarsiNumber(item.id)}
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

"use client";

import React from "react";
import Image from "next/image";
import { 
  ChevronLeft, 
  ChevronRight,
  Wallet, 
  Store, 
  Users, 
  ShoppingBag, 
  Briefcase, 
  FileText, 
  MoreHorizontal,
  Lightbulb,
  CheckCircle2,
  List,
  Download,
  GraduationCap,
  Filter,
  Search,
  ArrowLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products, Product } from "./Reports/product";
import ProductPopUp from "./Reports/ProductPopUp";
import HojreRequestsTable from "./components/HojreRequestsTable";

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

import { managerService } from "@/app/services/manager/managerService";

const SchoolHomePage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isProductPopUpOpen, setIsProductPopUpOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  
  // Dashboard Stats
  const [stats, setStats] = React.useState({
      totalSales: 0,
      activeBooths: 0,
      totalBooths: 0,
      activeStudents: 0,
      totalStudents: 0,
      ordersCount: 0,
      completedOrders: 0
  });

  React.useEffect(() => {
      const fetchStats = async () => {
          try {
              const [ordersRes, requestsRes] = await Promise.all([
                  managerService.getManagerOrders(),
                  managerService.getStudentRequests()
              ]);

              let totalSales = 0;
              let ordersCount = 0;
              let completedOrders = 0;

              if (ordersRes.success && ordersRes.data) {
                  ordersCount = ordersRes.data.length;
                  // Calculate total sales
                  totalSales = ordersRes.data.reduce((sum: number, order: any) => sum + (Number(order.total_price) || 0), 0);
                  // Calculate completed orders
                  const completed = ordersRes.data.filter((o: any) => o.status === 'sent' || o.status === 'completed' || o.status === 'تکمیل شده');
                  completedOrders = completed.length;
              }

              let activeBooths = 0;
              let totalBooths = 0;
              let activeStudents = 0;
              let totalStudents = 0;
              
              if (requestsRes.success && requestsRes.data) {
                   totalBooths = requestsRes.data.length;
                   totalStudents = requestsRes.data.length;

                   // Active means approved: true
                   const approved = requestsRes.data.filter((r: any) => r.approved === true || r.approved === 1 || r.status === 'approved' || r.status === 'تایید شده');
                   activeBooths = approved.length;
                   activeStudents = approved.length; 
              }

              setStats({ 
                  totalSales, 
                  ordersCount, 
                  completedOrders,
                  activeBooths, 
                  totalBooths,
                  activeStudents,
                  totalStudents
              });

          } catch (error) {
              console.error("Failed to fetch dashboard stats", error);
          }
      };

      fetchStats();
  }, []);
  
  // Filter & Scroll Logic
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [activeTab, setActiveTab] = React.useState<'hojreh' | 'timche'>('hojreh');
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
      { label: "ارسال نشده", value: "ارسال نشده" },
      { label: "تحویل به مدرسه ", value: "تحویل به مدرسه " },
      { label: "لغو شده", value: "لغو شده" }, 
  ];

  const filteredProductsList = products.filter(product => {
      // Filter by tab
      const isHojrehProject = product.id % 2 !== 0;
      if (activeTab === 'hojreh' && !isHojrehProject) return false;
      if (activeTab === 'timche' && isHojrehProject) return false;

      // Filter by status dropdown
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

  const calculatePercent = (part: number, total: number) => {
      if (!total || total === 0) return 0;
      return Math.round((part / total) * 100);
  }

  return (
    <div className="w-full min-h-screen bg-white pb-12 pt-5 px-0 flex flex-col gap-6" dir="rtl">
      
      {/* Header Title */}
      <div className="flex flex-col items-start gap-4 w-full">
         <h1 className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-7">
           داشبــــــورد مدیریتی جامع
         </h1>
      </div>

      {/* Stats Grid: 2x2 */}
      <div className="flex flex-col gap-3 w-full">
          
          {/* Row 1: Sales & Orders */}
          <div className="flex gap-3 w-full">
              {/* Total Sales */}
              <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
                <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                    <div className="self-stretch flex justify-start items-center gap-2.5">
                        <div className="w-8 h-8 relative bg-[#FFD369] rounded-lg shadow-inner flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-[#393E46]" strokeWidth={2} />
                    </div>
                    <span className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide break-word">کل فروش</span>
                    </div>
                    <div className="self-stretch flex justify-start items-center gap-2 mt-2">
                    <span className="w-full text-center text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px] break-word">{stats.totalSales.toLocaleString('fa-IR')} ریال</span>
                    </div>
                </div>
                <div className="self-stretch flex justify-start items-center gap-1">
                     {/* Sales Chart or Subtext - keeping empty as no historical data */}
                     <span className="text-[#818898] text-xs font-['PeydaWeb'] font-light opacity-0">.</span> 
                </div>
                 {/*  No meaningful Badge for Total Sales without history */}
              </div>

               {/* Orders */}
                <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
                    <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                    <div className="self-stretch flex justify-start items-center gap-2.5">
                        <div className="w-8 h-8 bg-[#E8F5E9] rounded-lg shadow-inner flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-[#2E7D32]" strokeWidth={2} />
                        </div>
                        <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide break-word">سفارشات</div>
                    </div>
                    <div className="self-stretch flex justify-start items-center gap-2 mt-2">
                        <div className="w-full text-center text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px] break-word">
                            {toFarsiNumber(stats.completedOrders)} <span className="text-sm text-[#818898]">/ {toFarsiNumber(stats.ordersCount)}</span>
                        </div>
                    </div>
                    </div>
                    <div className="self-stretch flex justify-start items-center gap-1">
                         <div className="flex-1 text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide break-word">تکمیل شده</div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center px-2 py-[1px] gap-0.5">
                         <div className="text-[#28806F] text-[10px] font-num-medium font-semibold leading-[15px] tracking-wide break-word">
                             {toFarsiNumber(calculatePercent(stats.completedOrders, stats.ordersCount))}%+
                         </div>
                    </div>
                </div>
          </div>

          {/* Row 2: Booths & Students */}
          <div className="flex gap-3 w-full">
               {/* Active Booths */}
                <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
                    <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                    <div className="self-stretch flex justify-start items-center gap-2.5">
                        <div className="w-8 h-8 bg-[#FFD369] rounded-lg shadow-inner flex items-center justify-center">
                            <Store className="w-5 h-5 text-[#393E46]" strokeWidth={2} />
                        </div>
                        <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide break-word">حجره های فعال</div>
                    </div>
                    <div className="self-stretch flex justify-start items-center gap-2 mt-2">
                        <div className="w-full text-center text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px] break-word">
                            {toFarsiNumber(stats.activeBooths)} <span className="text-sm text-[#818898]">/ {toFarsiNumber(stats.totalBooths)}</span>
                        </div>
                    </div>
                    </div>
                    <div className="self-stretch flex justify-start items-center gap-1">
                         <div className="flex-1 text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide break-word">نرخ تایید</div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center px-2 py-[1px] gap-0.5">
                        <div className="text-[#28806F] text-[10px] font-num-medium font-semibold leading-[15px] tracking-wide break-word">
                            {toFarsiNumber(calculatePercent(stats.activeBooths, stats.totalBooths))}%+
                        </div>
                    </div>
                </div>

                {/* Active Students */}
                <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
                    <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
                    <div className="self-stretch flex justify-start items-center gap-2.5">
                        <div className="w-8 h-8 bg-[#E3F2FD] rounded-lg shadow-inner flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-[#1976D2]" strokeWidth={2} />
                        </div>
                        <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide break-word">دانش آموزان فعال</div>
                    </div>
                    <div className="w-full text-center rtl:flex rtl:justify-center rtl:items-baseline rtl:gap-1 mt-2">
                         <span className="text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px]">
                             {toFarsiNumber(stats.activeStudents)} <span className="text-sm text-[#818898]">/ {toFarsiNumber(stats.totalStudents)}</span>
                         </span>
                    </div>
                    </div>
                    <div className="self-stretch flex justify-start items-center gap-1">
                         <div className="flex-1 text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide break-word">نرخ تایید</div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center px-2 py-[1px] gap-0.5">
                        <div className="text-[#28806F] text-[10px] font-num-medium font-semibold leading-[15px] tracking-wide break-word">
                            {toFarsiNumber(calculatePercent(stats.activeStudents, stats.totalStudents))}%+
                        </div>
                    </div>
                </div>
          </div>
      </div>

      {/* Recent Reports Section */}
      <div className="flex flex-col gap-4 w-full mt-2">
         <div className="flex justify-between items-center w-full">
            <h2 className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold">گزارش‌های اخیر</h2>
            <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold">مشاهده همه</span>
                <ChevronLeft className="w-4 h-4 text-[#6C7278]" />
            </div>
         </div>
         
         {/* Report Item 1 */}
         <div className="w-full h-[61px] py-2 pl-[14px] pr-4 rounded-xl border border-[#DCE4E8] flex justify-start items-center gap-3">
            <div className="w-[46px] h-[46px] bg-[#F8CB2E] rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="w-6 h-6 text-[#0D0D12]" strokeWidth={1.5} />
            </div>
             
             <div className="flex-1 pl-4 flex flex-col justify-center items-end gap-1">
                 <div className="w-full text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold break-word">گزارش جامع فروش تیرماه</div>
                 <div className="w-full flex  items-center">
                     <div className="flex justify-end items-center">
                         <div className="text-center text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold break-word">{toFarsiNumber("1404/05/01")}</div>
                     </div>
                 </div>
             </div>
             <div className="flex justify-start items-center gap-2">
                 <div className="w-8 h-8 px-4 py-2 bg-white shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2">
                     <div className="w-4 h-4 relative flex items-center justify-center">
                         <Download className="w-4 h-4 text-[#818898]" strokeWidth={1.5} />
                     </div>
                 </div>
             </div>
         </div>

         
      </div>

      {/* Cooperation Section */}
      <div className="flex flex-col gap-4 w-full mt-2">
         <div className="flex justify-between items-center w-full">
            <h2 className="text-[#0D0D12] text-l font-['PeydaWeb'] font-semibold">مشارکت های فعال با تیمچه های دیگر</h2>
            <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold">مشاهده همه</span>
                <ChevronLeft className="w-4 h-4 text-[#6C7278]" />
            </div>
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
             <div className="w-full h-12 px-6 py-[13px] bg-[#F7C61A] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#e5b818]">
                 <div className="text-center text-[#393E46] text-base font-['peyda-Num'] font-extrabold leading-snug break-word">برو به صفحه همکاری</div>
                 <ArrowLeft className="w-5 h-5 text-[#393E46]" />
             </div>
         </div>
      </div>

      {/* Smart Suggestions */}
      <div className="flex flex-col gap-4 w-full mt-2">
         <h2 className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold text-start">پیشنهادات هوشمند</h2>
         <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
             {[
                 { title: "دوره آموزشی مدیریت مالی", desc: "با مشاهده این دوره کوتاه ۵ دقیقه‌ای، یاد بگیرید چگونه گزارش‌های مالی فصلی مدرسه را بهینه‌تر تحلیل کنید.." },
                 { title: "این سرویس در منطقه شما محبوب است.", desc: "«مدارس منطقه شما « تغذیه ارگانیک» را اضافه کرده‌اند. این خدمت با استقبال خوب  روبرو شده است." }
             ].map((item, idx) => (
                 <Card key={idx} className="min-w-[250px] p-3 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col gap-2">
                     <Lightbulb className="w-6 h-6 text-[#FDD00A]" />
                     <span className="text-[#0F172A] text-sm font-medium text-right font-['PeydaWeb']">{item.title}</span>
                     <p className="text-[#888B90] text-[10px] font-medium text-right leading-4 font-['PeydaWeb']">{item.desc}</p>
                 </Card>
             ))}
         </div>
      </div>

      {/* Hojre Requests Table (Moved to Bottom) */}
      <HojreRequestsTable />

      {/* Product PopUp */}
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

export default SchoolHomePage;

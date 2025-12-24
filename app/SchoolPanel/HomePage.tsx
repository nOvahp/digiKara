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

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

const SchoolHomePage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isProductPopUpOpen, setIsProductPopUpOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  
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

  return (
    <div className="w-full min-h-screen bg-white pb-12 pt-5 px-0 flex flex-col gap-6" dir="rtl">
      
      {/* Header Title */}
      <div className="flex flex-col items-start gap-4 w-full">
         <h1 className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-7">
           داشبــــــورد مدیریتی جامع
         </h1>
      </div>

      {/* Stats Section 1: Top Row */}
      <Card className="p-4 shadow-sm border border-gray-200 rounded-xl flex flex-col gap-2.5 w-full">
         <div className="flex flex-col gap-0.5 w-full">
            <div className="flex justify-start items-center w-full gap-2 ">
                <div className="w-8 h-8 relative bg-[#FFD369] rounded-lg shadow-inner flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-[#393E46]" strokeWidth={2} />
               </div>
               <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">کل فروش</span>
            </div>
            <div className="flex items-center justify-end gap-2 w-full">
               
                <Badge className="bg-[#DDF3EF] text-[#28806F] hover:bg-[#DDF3EF] rounded-full px-2 py-0.5 text-xs font-num-medium">
                 {toFarsiNumber("+12.4%")}
               </Badge>
               <span className="text-[#0D0D12] text-2xl  font-num-medium">۱,۱۲۰,۰۴۵,۰۰۰ ریال</span>
            </div>
         </div>
         <span className="text-[#818898] text-xs font-['PeydaWeb'] font-light self-end text-left w-full">از ماه گذشته</span>
      </Card>

      {/* Stats Section 2: Middle Row (Booths & Students) */}
      <div className="flex gap-3 w-full">
         {/* Active Booths */}
         {/* Active Booths */}
         <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
            <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
               <div className="self-stretch flex justify-start items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#FFD369] rounded-lg shadow-inner flex items-center justify-center">
                      <Store className="w-5 h-5 text-[#393E46]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide break-word">حجره های فعال</div>
               </div>
               <div className="self-stretch flex justify-start items-center gap-2">
                  <div className="w-full text-center text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px] break-word">{toFarsiNumber(45)}</div>
               </div>
            </div>
            <div className="self-stretch flex justify-start items-center gap-1">
               <div className="flex-1 text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide break-word">از ماه گذشته</div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center px-2 py-[1px] gap-0.5">
               <div className="text-[#28806F] text-[10px] font-num-medium font-semibold leading-[15px] tracking-wide break-word">{toFarsiNumber("+15.1%")}</div>
            </div>
         </div>

         {/* Active Students */}
         {/* Active Students */}
         <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
            <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
               <div className="self-stretch flex justify-start items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#E3F2FD] rounded-lg shadow-inner flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-[#1976D2]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide break-word">دانش آموزان فعال</div>
               </div>
               <div className="w-full text-center rtl:flex rtl:justify-center rtl:items-baseline rtl:gap-1">
                  <span className="text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px]">{toFarsiNumber(105)}</span>
                  <span className="text-[#818898] text-sm font-num-medium">/{toFarsiNumber(120)}</span>
               </div>
            </div>
            <div className="self-stretch flex justify-start items-center gap-1">
               <div className="flex-1 text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide break-word">از ماه گذشته</div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center px-2 py-[1px] gap-0.5">
               <div className="text-[#28806F] text-[10px] font-num-medium font-semibold leading-[15px] tracking-wide break-word">{toFarsiNumber("+15.1%")}</div>
            </div>
         </div>
      </div>

       {/* Stats Section 3: Bottom Row (Orders & Teams) */}
       <div className="flex gap-3 w-full">
         {/* Orders */}
         {/* Orders */}
         <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
            <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
               <div className="self-stretch flex justify-start items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#E8F5E9] rounded-lg shadow-inner flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-[#2E7D32]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide break-word">سفارشات</div>
               </div>
               <div className="self-stretch flex justify-start items-center gap-2">
                  <div className="w-full text-center text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px] break-word">{toFarsiNumber(340)}</div>
               </div>
            </div>
            <div className="self-stretch flex justify-start items-center gap-1">
               <div className="flex-1 text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide break-word">از ماه گذشته</div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center px-2 py-[1px] gap-0.5">
               <div className="text-[#28806F] text-[10px] font-num-medium font-semibold leading-[15px] tracking-wide break-word">{toFarsiNumber("+3.6%")}</div>
            </div>
         </div>

         {/* Active Teams */}
         {/* Active Teams */}
         <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
            <div className="self-stretch flex flex-col justify-start items-start gap-0.5">
               <div className="self-stretch flex justify-start items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#F3E5F5] rounded-lg shadow-inner flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#7B1FA2]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide break-word">تیمچه های فعال</div>
               </div>
               <div className="self-stretch flex justify-start items-center gap-2">
                  <div className="w-full text-center text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px] break-word">{toFarsiNumber(8)}</div>
               </div>
            </div>
            <div className="self-stretch flex justify-start items-center gap-1">
               <div className="flex-1 text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide break-word">از ماه گذشته</div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center px-2 py-[1px] gap-0.5">
               <div className="text-[#28806F] text-[10px] font-num-medium font-semibold leading-[15px] tracking-wide break-word whitespace-nowrap">1 مورد جدید</div>
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

      {/* Requests Section */}
      <div className="flex flex-col gap-4 w-full mt-2 relative">
         <div className="flex justify-between items-center w-full">
            <h2 className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold">درخواست همکاری</h2>
            <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold">مشاهده همه</span>
                <ChevronLeft className="w-4 h-4 text-[#6C7278]" />
            </div>
         </div>
         
         {/* Request Item 1 */}
         <div className="w-full h-[61px] py-2 pl-[14px] pr-4 rounded-xl border border-[#DCE4E8] flex justify-start items-center gap-3">
             <div className="w-[46px] h-[46px] bg-[#F8CB2E] rounded-lg flex items-center justify-center shadow-sm">
                 <Briefcase className="w-6 h-6 text-[#0D0D12]" strokeWidth={1.5} />
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
             <div className="w-[46px] h-[46px] bg-[#F8CB2E] rounded-lg flex items-center justify-center shadow-sm">
                 <Briefcase className="w-6 h-6 text-[#0D0D12]" strokeWidth={1.5} />
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
             <div className="text-[#28806F] text-[10px] font-['peyda-Num'] font-semibold leading-[15px] tracking-wide break-word">همکاری فعال</div>
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

      {/* Projects */}
      <div className="flex flex-col gap-4 w-full mt-2">
         <div className="flex justify-between items-center w-full">
             <h2 className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">پروژه ها</h2>
         </div>

         {/* Toggle */}
         {/* Toggle */}
         <div className="w-full h-[36px] p-[3px] bg-[#F6F6F6] rounded-lg outline outline-1 outline-[#D7D8DA] flex justify-center items-center">
             <div 
                onClick={() => setActiveTab('hojreh')}
                className={`flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer transition-all ${activeTab === 'hojreh' ? 'bg-[#F7C61A] shadow-[0px_1px_3px_rgba(0,0,0,0.10)] outline outline-1 outline-[#D7D8DA] text-[#0A0A0A]' : 'bg-transparent text-[#0A0A0A] hover:bg-white/50'}`}
             >
                 <div className="text-sm font-['PeydaWeb'] font-semibold leading-5 text-center">حجره ها</div>
             </div>
             <div 
                onClick={() => setActiveTab('timche')}
                className={`flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer transition-all ${activeTab === 'timche' ? 'bg-[#F7C61A] shadow-[0px_1px_3px_rgba(0,0,0,0.10)] outline outline-1 outline-[#D7D8DA] text-[#0A0A0A]' : 'bg-transparent text-[#0A0A0A] hover:bg-white/50'}`}
             >
                 <div className="text-sm font-['PeydaWeb'] font-semibold leading-5 text-center">تیمچه ها</div>
             </div>
         </div>

         {/* Active Orders List */}
         <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] flex flex-col justify-start items-end overflow-hidden">
             
             {/* Header */}
             <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
                 <div className="text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold leading-24 tracking-wide">سفارش های فعال</div>
                  <div className="flex justify-start items-center gap-2">
                       <div className="flex items-center gap-2" ref={filterRef}>
                           <div className="relative">
                                <div 
                                    className={`w-8 h-8 rounded-lg outline outline-1 outline-[#DFE1E7] flex justify-center items-center cursor-pointer transition-colors ${isFilterOpen ? 'bg-gray-100 ring-2 ring-blue-100' : 'bg-white hover:bg-gray-50'}`}
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
                           </div>
                       </div>
                       <div className="w-8 h-8 bg-white rounded-lg outline outline-1 outline-[#DFE1E7] flex justify-center items-center cursor-pointer hover:bg-gray-50">
                           <Search className="w-4 h-4 text-[#666D80]" />
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
                        const isEven = itemIndex % 2 === 0;
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
                                <span className="flex-1 text-center text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">
                                    {toFarsiNumber(product.price)} ریال
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

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

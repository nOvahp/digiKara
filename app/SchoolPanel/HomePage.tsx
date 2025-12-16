"use client";

import React from "react";
import Image from "next/image";
import { 
  ChevronLeft, 
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
  Download
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SchoolHomePage = () => {
  return (
    <div className="w-full min-h-screen bg-white pb-32 pt-5 px-0 flex flex-col gap-6" dir="rtl">
      
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
                 +۱۲.۴٪
               </Badge>
               <span className="text-[#0D0D12] text-2xl  font-num-medium">۱,۱۲۰,۰۴۵,۰۰۰ ریال</span>
            </div>
         </div>
         <span className="text-[#818898] text-xs font-['PeydaWeb'] font-light self-end text-left w-full">از ماه گذشته</span>
      </Card>

      {/* Stats Section 2: Middle Row (Booths & Students) */}
      <div className="flex gap-3 w-full">
         {/* Active Booths */}
         <Card className="flex-1 p-4 bg-white shadow-sm border border-gray-200 rounded-xl flex flex-col gap-2.5">
            <div className="flex flex-col gap-0.5 w-full">
               <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold text-center w-full">حجره های فعال</span>
               <span className="text-[#0D0D12] text-2xl font-num-medium text-center w-full">45</span>
            </div>
            <div className="flex justify-between items-center w-full relative">
               <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-light text-center w-full">از ماه گذشته</span>
                <Badge className="absolute left-0 -bottom-1 bg-[#DDF3EF] text-[#28806F] hover:bg-[#DDF3EF] rounded-full px-1.5 py-0 text-[10px] font-num-medium">
                 +3.6٪
               </Badge>
            </div>
         </Card>

         {/* Active Students */}
         <Card className="flex-1 p-4 bg-white shadow-sm border border-gray-200 rounded-xl flex flex-col gap-2.5">
            <div className="flex flex-col gap-0.5 w-full">
               <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold text-center w-full">هنرجویان فعال</span>
               <div className="text-center w-full rtl:flex rtl:justify-center rtl:items-baseline rtl:gap-1">
                  <span className="text-[#0D0D12] text-2xl font-num-medium">105</span>
                  <span className="text-[#818898] text-sm font-num-medium">/120</span>
               </div>
            </div>
            <div className="flex justify-between items-center w-full relative">
               <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-light text-center w-full">از ماه گذشته</span>
               <Badge className="absolute left-0 -bottom-1 bg-[#DDF3EF] text-[#28806F] hover:bg-[#DDF3EF] rounded-full px-1.5 py-0 text-[10px] font-num-medium">
                 +15.1٪
               </Badge>
            </div>
         </Card>
      </div>

       {/* Stats Section 3: Bottom Row (Orders & Teams) */}
       <div className="flex gap-3 w-full">
         {/* Orders */}
         <Card className="flex-1 p-4 bg-white shadow-sm border border-gray-200 rounded-xl flex flex-col gap-2.5">
            <div className="flex flex-col gap-0.5 w-full">
               <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold text-center w-full">سفارشات</span>
               <span className="text-[#0D0D12] text-2xl font-num-medium text-center w-full">340</span>
            </div>
             <div className="flex justify-between items-center w-full relative">
               <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-light text-center w-full">از ماه گذشته</span>
               <Badge className="absolute left-0 -bottom-1 bg-[#DDF3EF] text-[#28806F] hover:bg-[#DDF3EF] rounded-full px-1.5 py-0 text-[10px] font-num-medium">
                 +3.6٪
               </Badge>
            </div>
         </Card>

         {/* Active Teams */}
         <Card className="flex-1 p-4 bg-white shadow-sm border border-gray-200 rounded-xl flex flex-col gap-2.5">
            <div className="flex flex-col gap-0.5 w-full">
               <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold text-center w-full">تیمچه های فعال</span>
               <span className="text-[#0D0D12] text-2xl font-num-medium text-center w-full">8</span>
            </div>
             <div className="flex justify-between items-center w-full relative">
               <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-light text-center w-full">از ماه گذشته</span>
               <Badge className="absolute left-0 -bottom-1 bg-[#DDF3EF] text-[#28806F] hover:bg-[#DDF3EF] rounded-full px-1.5 py-0 text-[10px] font-num-medium whitespace-nowrap">
                 1 مورد جدید
               </Badge>
            </div>
         </Card>
      </div>

      {/* Recent Reports Section */}
      <div className="flex flex-col gap-4 w-full mt-2">
         <div className="flex justify-between items-center w-full">
            <h2 className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold">گزارش‌های اخیر</h2>
            <span className="text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold cursor-pointer">مشاهده همه</span>
         </div>
         
         {/* Report Item 1 */}
         <div className="w-full h-[61px] py-2 pl-[14px] pr-4 rounded-xl border border-[#DCE4E8] flex justify-start items-center gap-3">
            <div className="relative flex justify-start items-center gap-3">
                 <div className="flex justify-start items-center gap-2.5">
                     <div className="w-[46.13px] h-[46.13px] bg-[#F8CB2E] rounded-lg" />
                 </div>
                 <div className="w-6 h-6 left-[11.07px] top-[11.07px] absolute flex items-center justify-center">
                     <FileText className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
                 </div>
             </div>
             
             <div className="flex-1 pl-4 flex flex-col justify-center items-end gap-1">
                 <div className="w-full text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold break-word">گزارش جامع فروش تیرماه</div>
                 <div className="w-full flex  items-center">
                     <div className="flex justify-end items-center">
                         <div className="text-center text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold break-word">۱۴۰۴/۰۵/۰۱</div>
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

         {/* Report Item 2 */}
         <div className="w-full h-[61px] py-2 pl-[14px] pr-4 bg-white rounded-xl border border-[#DCE4E8] flex justify-start items-center gap-3">
             <div className="relative flex justify-start items-center gap-3">
                 <div className="flex justify-start items-center gap-2.5">
                     <div className="w-[46.13px] h-[46.13px] bg-[#F8CB2E] rounded-lg" />
                 </div>
                 <div className="w-6 h-6 left-[11.07px] top-[11.07px] absolute flex items-center justify-center">
                     <FileText className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
                 </div>
             </div>
             <div className="flex-1 pl-4 flex flex-col justify-center items-end gap-1">
                 <div className="w-full text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold break-word">ریز نمرات کارگاه‌ها</div>
                 <div className="w-full flex  items-center">
                     <div className="flex justify-end">
                         <div className="text-center text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold break-word">۱۴۰۴/۰۵/۰۱</div>
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
            <h2 className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold">همکاری هنرستان ها</h2>
            <span className="text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold cursor-pointer">مشاهده همه</span>
         </div>
         
         <div className="w-full p-3.5 rounded-xl border border-[#DCE4E8] flex flex-col justify-start items-center gap-3">
             <div className="w-full flex justify-start items-start gap-2.5">
                 <div className="flex-1 flex flex-col justify-start items-start gap-4">
                     <div className="w-full flex flex-col justify-start items-start">
                         <div className="w-full text-right flex flex-col justify-center">
                            <div className="text-[#0F172A] text-base font-['PeydaWeb'] font-semibold leading-relaxed tracking-wide break-word">
                                دوخت لباس فرم - <span className="font-['peyda-Num']">10254</span>
                            </div>
                         </div>
                         <div className="flex justify-start items-center gap-2.5">
                            <div className="flex-1 rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] flex justify-start items-start gap-2.5">
                                <div className="flex-1 text-right text-[#0F172A] text-xs font-['PeydaWeb'] font-semibold leading-tight tracking-wide break-word">پروژه استانی - استان زنجان</div>
                            </div>
                         </div>
                     </div>
                     <div className="w-full flex justify-end items-center gap-2.5">
                         <div className="flex justify-center items-center gap-1.5">
                             <div className="text-[#0F172A] text-sm font-['peyda-Num'] font-semibold leading-snug tracking-wide break-word">6</div>
                         </div>
                         <div className="rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] flex justify-end items-center gap-2.5">
                             <div className="text-right text-[#0F172A] text-sm font-['PeydaWeb'] font-semibold leading-snug tracking-wide break-word">تعداد هنرستان های همکار</div>
                         </div>
                     </div>
                 </div>
                 <Image src="https://placehold.co/96x96" alt="Project" width={96} height={96} className="p-2.5 rounded-xl" />
             </div>
             <div className="w-full h-12 px-6 py-[13px] bg-[#F7C61A] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#e5b818]">
                 <div className="text-center text-[#393E46] text-base font-['peyda-Num'] font-extrabold leading-snug break-word">برو به صفحه همکاری</div>
             </div>
         </div>
      </div>

      {/* Requests Section */}
      <div className="flex flex-col gap-4 w-full mt-2 relative">
         <div className="flex justify-between items-center w-full">
            <h2 className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold">درخواست همکاری</h2>
            <span className="text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold cursor-pointer">مشاهده همه</span>
         </div>
         
         {/* Request Item 1 */}
         <div className="w-full h-[61px] py-2 pl-[14px] pr-8 bg-white rounded-xl border border-[#DCE4E8] flex justify-start items-center gap-3">
             <div className="flex justify-start items-center gap-2">
                 <div className="w-8 h-8 px-4 py-2 bg-white shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2">
                     <div className="w-4 h-4 relative flex items-center justify-center">
                         <List className="w-4 h-4 text-[#818898]" strokeWidth={1.5} />
                     </div>
                 </div>
             </div>
             <div className="flex-1 pl-4 flex flex-col justify-center items-end gap-1">
                 <div className="w-full text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold break-word">درخواست همکاری در دوخت</div>
                 <div className="w-full flex justify-between items-center">
                     <div className="w-[52px] h-4" />
                     <div className="flex justify-start items-center">
                         <div className="text-center text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold break-word">هنرستان فن کاران هیدج</div>
                     </div>
                 </div>
             </div>
             <div className="relative flex justify-start items-center gap-3">
                 <div className="flex justify-start items-center gap-2.5">
                     <div className="w-[46.13px] h-[46.13px] bg-[#F8CB2E] rounded-lg" />
                 </div>
                 <div className="w-6 h-6 left-[11.07px] top-[11.07px] absolute flex items-center justify-center">
                     <Briefcase className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
                 </div>
             </div>
         </div>

         {/* Request Item 2 */}
         <div className="w-full h-[61px] py-2 pl-[14px] pr-8 bg-white rounded-xl border border-[#DCE4E8] flex justify-start items-center gap-3">
             <div className="flex justify-start items-center gap-2">
                 <div className="w-8 h-8 px-4 py-2 bg-white shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2">
                     <div className="w-4 h-4 relative flex items-center justify-center">
                         <List className="w-4 h-4 text-[#818898]" strokeWidth={1.5} />
                     </div>
                 </div>
             </div>
             <div className="flex-1 pl-4 flex flex-col justify-center items-end gap-1">
                 <div className="w-full text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold break-word">درخواست همکاری در تولید محتوا</div>
                 <div className="w-full flex justify-between items-center">
                     <div className="w-[52px] h-4" />
                     <div className="flex justify-start items-center">
                         <div className="text-center text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold break-word">هنرستان کارآفرینان ابهر</div>
                     </div>
                 </div>
             </div>
             <div className="relative flex justify-start items-center gap-3">
                 <div className="flex justify-start items-center gap-2.5">
                     <div className="w-[46.13px] h-[46.13px] bg-[#F8CB2E] rounded-lg" />
                 </div>
                 <div className="w-6 h-6 left-[11.07px] top-[11.07px] absolute flex items-center justify-center">
                     <Briefcase className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
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
                 { title: "دوره آموزشی مناسب", desc: "دوره «عکاسی از محصول با موبایل» می‌تواند به فروش شما کمک کند." },
                 { title: "این محصول پرفروش است", desc: "«کارهای دستی چوبی» در منطقه شما محبوبیت زیادی پیدا کرده است." }
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
         <h2 className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold text-start">پروژه ها</h2>
         
         {/* Toggle */}
         <div className="w-full bg-[#F6F6F6] p-1 rounded-lg flex border border-gray-300">
             <div className="flex-1 py-1 text-center text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold cursor-pointer">
                 پروژه های دانش آموزان
             </div>
             <div className="flex-1 py-1 text-center bg-[#F7C61A] rounded-md shadow-sm text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold cursor-pointer">
                 پروژه های مدرسه
             </div>
         </div>

         {/* Active Orders List */}
         <Card className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
             <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
                 <span className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold">سفارش های فعال</span>
                 <div className="flex gap-2">
                     <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg">
                        <MoreHorizontal className="w-4 h-4 text-[#818898]" />
                     </Button>
                     <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg">
                         <MoreHorizontal className="w-4 h-4 text-[#818898]" />
                     </Button>
                 </div>
             </div>
             
             {/* Table Headers (Mobile hidden or adapted) */}
             <div className="bg-[#F6F8FA] p-3 text-right hidden md:block">
                 <span className="text-[#666D80] text-sm font-['PeydaWeb'] font-semibold">لیست سفارشات</span>
             </div>
             
             {/* Order Rows */}
             {[
                 { id: 1, title: "طراحی ست اداری | کامل", team: "امیرحسین رضایی, محمد کریمی...", price: "۴,۵۰۰,۰۰۰", days: 1, status: "تحویل به مدرسه", statusColor: "bg-[#ECF9F7] text-[#267666]" },
                 { id: 2, title: "طراحی بسته بندی محصول | خلاقانه", team: "امیرحسین رضایی, محمد کریمی...", price: "۶,۰۰۰,۰۰۰", days: 1, status: "ارسال نشده", statusColor: "bg-[#FCE8EC] text-[#B21634]" },
                 { id: 3, title: "طراحی لوگو | 3 طرح اولیه", team: "محمد کریمی", price: "۷,۵۰۰,۰۰۰", days: 1, status: "ارسال شده", statusColor: "bg-[#ECF9F7] text-[#267666]" },
             ].map((order, idx) => (
                 <div key={idx} className="p-4 border-b border-gray-100 flex flex-col gap-3">
                     <div className="flex justify-between items-start">
                         <Badge className={`${order.statusColor} hover:${order.statusColor} rounded-full px-2 py-0.5 text-xs font-['PeydaWeb']`}>
                             {order.status}
                         </Badge>
                         <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold text-right">{order.title}</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                         <span className="text-[#0D0D12] font-['PeydaWeb']">{order.price} ریال</span>
                         <span className="text-[#666D80] font-['PeydaWeb'] text-right">{order.team}</span>
                     </div>
                     <div className="flex justify-between items-center mt-1">
                         <span className="text-[#0D0D12] text-xs font-['peyda-Num'] font-semibold">{order.days} روز تا تحویل</span>
                         <span className="text-[#0D0D12] text-xs font-['peyda-Num'] font-semibold">{order.id}</span>
                     </div>
                 </div>
             ))}

               {/* Pagination */}
               <div className="flex justify-between items-center p-4">
                   <div className="flex items-center gap-2">
                       <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg  bg-white">
                           <ChevronLeft className="w-4 h-4 rotate-180" />
                       </Button>
                       <span className="text-xs font-['peyda-Num'] border px-3 py-1.5 rounded-lg">1/15</span>
                       <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg bg-white">
                           <ChevronLeft className="w-4 h-4" />
                       </Button>
                   </div>
                   <span className="text-[#0D0D12] text-sm font-['peyda-Num']">صفحه 1 از 15</span>
               </div>
         </Card>
      </div>

    </div>
  );
};

export default SchoolHomePage;

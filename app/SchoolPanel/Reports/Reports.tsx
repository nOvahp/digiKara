"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  Lightbulb, 
  MoreHorizontal, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Search,
  Filter,
  Calendar,
  Sparkles,
  Star,
  FileText
} from "lucide-react";
import ProductPopUp from "./ProductPopUp";
import {
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#6b7280" fontSize={10} fontFamily="PeydaWeb" fontWeight={500}>
        {payload.value}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 border-none shadow-md rounded-lg p-3 font-['PeydaFaNum'] text-right" style={{ direction: 'rtl' }}>
        <p className="text-[#0D0D12] text-sm font-semibold mb-1">{label}</p>
        <p className="text-[#666D80] text-xs">
          {`فروش: ${payload[0].value.toLocaleString('fa-IR')}`}
        </p>
      </div>
    );
  }
  return null;
};

const ReportsPage = () => {
    const [isProductPopUpOpen, setIsProductPopUpOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = 15;

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    // Chart Data (Keeping existing data)
    const activityData = [
        { name: 'شنبه', students: 5, sales: 4 },
        { name: 'یکشنبه', students: 2, sales: 3 },
        { name: 'دوشنبه', students: 4, sales: 2 },
        { name: 'سه شنبه', students: 7, sales: 5 },
        { name: 'چهارشنبه', students: 3, sales: 3 },
        { name: 'پنجشنبه', students: 5, sales: 4 },
        { name: 'جمعه', students: 2, sales: 2 },
    ];



    return (
        <div className="w-full h-auto pt-4 pb-8 px-0 flex flex-col justify-start items-center gap-6" dir="rtl" style={{ direction: 'rtl' }}>
            
            {/* Header Profile Section */}
           

            {/* Dashboard Title */}
            <div className="w-full flex flex-col justify-start items-start gap-4">
                <h1 className="w-full text-right text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
                    داشبــــــورد
                </h1>
            </div>

            {/* Stats Section */}
            <div className="w-full flex flex-col justify-center items-start gap-3">
                
                {/* Total Sales Card (Big) */}
                <div className="w-full p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5">
                    <div className="w-full flex flex-col justify-start items-start gap-0.5">
                         <div className="w-full flex justify-between items-center gap-2.5">
                            <div className="w-9 h-9 relative bg-[#FFD369] rounded-lg shadow-[inset_0px_-4px_6px_rgba(255,255,255,0.5)] overflow-hidden">
                                  <div className="absolute left-2 top-2">
                                       <Wallet className="w-5 h-5 text-[#393E46]" strokeWidth={2} />
                                  </div>
                             </div>
                             <div className="flex-1 text-right text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">کل فروش</div>
                             
                         </div>
                         <div className="w-full flex justify-end items-center gap-2">
                            <div className="px-2 py-[1px] bg-[#DDF3EF] rounded-[36px] flex justify-center items-center gap-0.5">
                                 <div className="text-[#28806F] text-xs font-['PeydaWeb'] font-semibold leading-[18px tracking-wide">+۱۲.۴٪</div>
                             </div>
                             <div className="text-[#0D0D12] text-2xl font-['PeydaFaNum'] font-semibold leading-[31.2px]">۱,۱۲۰,۰۴۵,۰۰۰ <span className="text-sm">ریال</span></div>
                             
                         </div>
                    </div>
                    <div className="w-full flex justify-end items-center gap-1">
                        <div className="text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide">از ماه گذشته</div>
                    </div>
                </div>

                {/* Bottom Row: 3 Cards */}
                <div className="w-full flex gap-3">
                     
                     {/* Total Orders */}
                     <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
                        <div className="w-full flex flex-col justify-start items-start gap-0.5">
                           <div className="w-full flex justify-center items-center gap-2.5">
                               <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">کل سفارشات</div>
                           </div>
                           <div className="w-full flex justify-center items-center gap-2">
                               <div className="text-[#0D0D12] text-2xl font-['PeydaFaNum'] font-semibold leading-[31.2px]">۲۳۴</div>
                           </div>
                        </div>
                        <div className="w-full flex justify-center items-center gap-1">
                           <div className="text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide">از ماه گذشته</div>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center px-2 py-[1px] gap-0.5 z-10">
                           <div className="text-[#28806F] text-[10px] font-['PeydaFaNum'] font-semibold leading-[15px] tracking-wide">+۳۵۱٪</div>
                        </div>
                     </div>

                     {/* New Customers */}
                     <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
                        <div className="w-full flex flex-col justify-start items-start gap-0.5">
                           <div className="w-full flex justify-center items-center gap-2.5">
                               <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">مشتریان جدید</div>
                           </div>
                            <div className="w-full flex justify-center items-center gap-2">
                               <div className="text-[#0D0D12] text-2xl font-['PeydaFaNum'] font-semibold leading-[31.2px]">۸۶۰</div>
                           </div>
                        </div>
                        <div className="w-full flex justify-center items-center gap-1">
                           <div className="text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide">از ماه گذشته</div>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center px-2 py-[1px] gap-0.5 z-10">
                           <div className="text-[#28806F] text-[10px] font-['PeydaFaNum'] font-semibold leading-[15px] tracking-wide">+۳.۶٪</div>
                        </div>
                     </div>

                     {/* Profit Margin */}
                     <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5 relative">
                        <div className="w-full flex flex-col justify-start items-start gap-0.5">
                           <div className="w-full flex justify-center items-center gap-2.5">
                               <div className="flex-1 text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">حاشیه سود</div>
                           </div>
                           <div className="w-full flex justify-center items-center gap-2">
                               <div className="text-[#0D0D12] text-2xl font-['PeydaFaNum'] font-semibold leading-[31.2px]">۲۴.۶٪</div>
                           </div>
                        </div>
                        <div className="w-full flex justify-center items-center gap-1">
                           <div className="text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide">از ماه گذشته</div>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center px-2 py-[1px] gap-0.5 z-10">
                           <div className="text-[#28806F] text-[10px] font-['PeydaFaNum'] font-semibold leading-[15px] tracking-wide">+۱۵.۱٪</div>
                        </div>
                     </div>

                </div>
            </div>

             {/* Activity & Sales Chart */}
             <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start overflow-hidden mt-4">
                 <div className="w-full px-5 py-3 border-b border-[#DFE1E7] flex flex-col gap-3">
                     <div className="flex justify-between items-center w-full">
                         <span className="text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold">روند فعالیت و فروش</span>
                          <div className="flex gap-2">
                             <div className="w-8 h-8 flex items-center justify-center bg-white border border-[#DFE1E7] rounded-lg shadow-sm cursor-pointer hover:bg-gray-50">
                                 <Calendar className="w-4 h-4 text-[#818898]" />
                             </div>
                             <div className="w-8 h-8 flex items-center justify-center bg-white border border-[#DFE1E7] rounded-lg shadow-sm cursor-pointer hover:bg-gray-50">
                                  <Filter className="w-4 h-4 text-[#818898]" />
                             </div>
                          </div>
                     </div>
                     <div className="flex gap-2">
                        <div className="w-full h-9 p-[3px] rounded-lg border border-[#D7D8DA] flex gap-0">
                             <div className="flex-1 flex justify-center items-center rounded-md cursor-pointer hover:bg-gray-50">
                                 <span className="text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold">تعداد هنرجویان</span>
                             </div>
                             <div className="flex-1 flex justify-center items-center rounded-md bg-[#F7C61A] shadow-sm border border-[#D7D8DA]">
                                 <span className="text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold">میزان فروش</span>
                             </div>
                        </div>
                    </div>
                </div>
                {/* LTR for Charts to keep axes numeric order, but labels are Persian */}
                <div className="w-full h-[300px] p-0 pb-2 relative outline-none [&_*:focus]:outline-none" dir="ltr">
                   <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityData} barSize={32} margin={{ left: -20, right: 10 }}>
                            <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 3"/>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={<CustomXAxisTick />} interval={0} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontFamily: 'PeydaFaNum'}} tickCount={6} orientation="left" />
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                            <Bar dataKey="sales" radius={[8, 8, 8, 8]} activeBar={{fill: '#F7C61A', stroke: '#FFD369', strokeWidth: 1}}>
                                {activityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.sales === Math.max(...activityData.map(d => d.sales)) ? '#F7C61A' : '#ECEFF3'} />
                                ))}
                            </Bar>
                        </BarChart>
                   </ResponsiveContainer>
                </div>
            </div>

             {/* Smart Sales Forecast Chart */}
             <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start overflow-hidden mt-4">
                 
                 {/* Header */}
                 <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center">
                    <div className="flex flex-col items-start justify-center">
                         <div className="text-right text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold ">پیش بینی هوشمند فروش</div>
                         <div className="text-right text-[#666D80] text-[10px] font-['PeydaWeb'] font-light ">تحلیل روند آینده توسط هوش مصنوعی</div>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center bg-white border border-[#DFE1E7] rounded-lg shadow-sm">
                            <Lightbulb className="w-4 h-4 text-[#818898]" />
                        </div>
                     </div>
                 </div>

                 {/* Chart Area */}
                 <div className="w-full h-[270px] pt-[34px] flex flex-col justify-center items-center">
                    <div className="w-full h-[160px] relative px-6 outline-none [&_*:focus]:outline-none" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                                { name: 'اردیبهشت', value: 5 },
                                { name: 'خرداد', value: 25 },
                                { name: 'تیر', value: 20 },
                                { name: 'مرداد', value: 22 },
                                { name: 'شهریور', value: 35 },
                            ]} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid vertical={false} stroke="#E5E7EB" strokeDasharray="3 3"/>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={<CustomXAxisTick />} interval={0} dy={10} padding={{ left: 10, right: 10 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12, fontFamily: 'PeydaFaNum'}} tickCount={6} orientation="left" width={40} />
                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                                <Line type="monotone" dataKey="value" stroke="#64B327" strokeWidth={3} dot={{ r: 4, fill: "#64B327", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6, strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                     {/* Analysis Text */}
                     <div className="w-full px-4 pt-6 pb-2 text-right">
                         <span className="text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px]">تحلیل: </span>
                         <span className="text-[#666D80] text-sm font-['PeydaWeb'] font-light leading-[21px]">پیش‌بینی می‌شود با بازگشایی مدارس، فروش نوشت‌افزار در شهریورماه ۲۰٪ افزایش یابد.</span>
                     </div>
                 </div>
            </div>


            {/* Projects Section */}
            <div className="flex flex-col gap-4 w-full mt-4">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-[#222831] text-lg font-['PeydaFaNum'] font-extrabold leading-[25.2px] text-right">پروژه ها</h2>
                </div>

                {/* Toggle */}
                <div className="w-full h-[36px] p-[3px] bg-[#F6F6F6] rounded-lg outline outline-1 outline-[#D7D8DA] -outline-offset-1 flex justify-center items-center">
                    <div className="flex-1 h-[29px] px-3 py-1 bg-transparent rounded-md flex justify-center items-center gap-2.5 cursor-pointer">
                        <div className="text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold leading-5 text-center">پروژه های دانش آموزان</div>
                    </div>
                    <div className="flex-1 h-[29px] px-3 py-1 bg-[#F7C61A] shadow-[0px_1px_3px_rgba(0,0,0,0.10)] rounded-md outline outline-1 outline-[#D7D8DA] -outline-offset-1 flex justify-center items-center gap-2.5 cursor-pointer">
                        <div className="text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold leading-5 text-center">پروژه های مدرسه</div>
                    </div>
                </div>

                {/* Active Orders List */}
                <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-stretch overflow-hidden">
                    
                    {/* Header */}
                    <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
                        <div className="text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold leading-24 tracking-wide text-right">سفارش های فعال</div>
                         <div className="flex items-center gap-2">
                             <div className="w-8 h-8 flex items-center justify-center bg-white border border-[#DFE1E7] rounded-lg shadow-sm">
                                <Filter className="w-4 h-4 text-[#818898]" />
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center bg-white border border-[#DFE1E7] rounded-lg shadow-sm">
                                <Search className="w-4 h-4 text-[#818898]" />
                            </div>
                         </div>
                        
                    </div>

                    {/* Table */}
                    <div className="w-full overflow-x-auto no-scrollbar">
                        <div className="min-w-[1000px] flex flex-col">
                            
                            {/* Table Header */}
                            <div className="w-full h-10 bg-[#F6F8FA] border-b border-[#DFE1E7] flex justify-start items-center px-2">
                                <div className="w-11 h-10 px-3 bg-[#F6F8FA]" />
                                <div className="w-20 h-10 px-3 flex justify-center items-center">
                                    <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                                </div>
                                <div className="w-[272px] h-10 px-3 flex justify-start items-center">
                                    <div className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide w-full">محصول</div>
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
                            </div>

                            {/* Table Body - Rows */}
                            {Array.from({ length: 10 }).map((_, idx) => {
                                const itemIndex = (currentPage - 1) * 10 + idx + 1;
                                const isEven = itemIndex % 2 === 0;
                                // Mock data matching styles
                                const status = isEven ? "ارسال نشده" : "تحویل به مدرسه";
                                const statusBg = isEven ? "#FCE8EC" : "#ECF9F7";
                                const statusColor = isEven ? "#B21634" : "#267666";
                                const price = isEven ? "۶,۰۰۰,۰۰۰" : "۴,۵۰۰,۰۰۰";
                                // Using PeydaFaNum for numbers
                                
                                return (
                                <div key={idx} onClick={() => setIsProductPopUpOpen(true)} className="w-full h-16 border-b border-[#DFE1E7] flex justify-start items-center px-2 hover:bg-gray-50 transition-colors cursor-pointer group">
                                     <div className="w-11 h-16 px-3 flex justify-center items-center gap-2">
                                        <MoreHorizontal className="w-5 h-5 text-[#666D80]" />
                                    </div>
                                     <div className="w-20 h-16 px-3 flex justify-center items-center gap-2.5">
                                        <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7] cursor-pointer" />
                                        <span className="text-center text-[#0D0D12] text-sm font-['PeydaFaNum'] font-semibold flex-1">{itemIndex}</span>
                                    </div>
                                    <div className="w-[272px] h-16 px-3 flex justify-start items-center gap-2.5">
                                        <span className="text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide truncate w-full">
                                            {isEven ? "طراحی بسته بندی محصول | خلاقانه" : "طراحی ست اداری | کامل"}
                                        </span>
                                    </div>
                                    <div className="w-[73px] h-16 px-3 flex justify-center items-center gap-2.5">
                                        <span className="flex-1 text-center text-[#0D0D12] text-sm font-['PeydaFaNum'] font-semibold">{isEven ? "۲" : "۱"}</span>
                                    </div>
                                    <div className="w-[127px] h-16 px-3 flex justify-center items-center gap-2.5">
                                        <span className="flex-1 text-center text-[#0D0D12] text-sm font-['PeydaFaNum'] font-semibold">{isEven ? "۱ روز تا تحویل" : "۱ روز تا تحویل"}</span>
                                    </div>
                                    <div className="w-[140px] h-16 px-3 flex justify-center items-center gap-2.5">
                                        <span className="flex-1 text-center text-[#0D0D12] text-sm font-['PeydaFaNum'] font-semibold">
                                            {price} <span className="font-['PeydaWeb']">ریال</span>
                                        </span>
                                    </div>
                                    <div className="w-[104px] h-16 px-3 flex justify-center items-center gap-2.5">
                                        <div className="px-2 py-0.5 rounded-2xl flex justify-center items-center" style={{ backgroundColor: statusBg }}>
                                            <span className="text-[12px] font-['PeydaFaNum']" style={{ color: statusColor }}>{status}</span>
                                        </div>
                                    </div>
                                    <div className="w-[272px] h-16 px-3 flex justify-end items-center gap-2.5">
                                        <span className="text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold truncate">
                                            امیرحسین رضایی, محمد کریمی...
                                        </span>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="w-full px-5 py-4 flex justify-between items-center">
                         <div className="flex items-center gap-2">
                           <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#DFE1E7] cursor-pointer">
                                <div className="w-5 h-5 flex justify-center items-center">
                                    <ChevronLeft className="w-5 h-5 text-[#0D0D12]" />
                                </div>
                           </div>
                             <div className="w-[55px] h-8 rounded-lg border border-[#DFE1E7] flex justify-center items-center">
                                <span className="text-[#0D0D12] text-xs font-['PeydaFaNum'] font-medium">1/15</span>
                            </div>
                           <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#DFE1E7] cursor-pointer">
                                <ChevronRight className="w-5 h-5 text-[#0D0D12]" />
                           </div>
                        </div>
                        <span className="text-center text-[#0D0D12] text-sm font-['PeydaFaNum'] font-medium">صفحه 1 از 15</span>
                    </div>
                </div>
            </div>

            {/* Product PopUp */}
            {isProductPopUpOpen && (
                <ProductPopUp onClose={() => setIsProductPopUpOpen(false)} />
            )}

        </div>
    );
};

export default ReportsPage;

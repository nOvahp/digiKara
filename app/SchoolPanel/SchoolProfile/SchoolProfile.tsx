"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
    ChevronDown, 
    FileText, 
    Users, 
    Edit2, 
    MoreVertical, 
    Plus, 
    MapPin, 
    Phone, 
    LayoutGrid, 
    FileCheck,
    Briefcase,
    Shield
} from "lucide-react";
import { cn } from "../../../lib/utils";

export default function SchoolProfile() {
    const [expandedSections, setExpandedSections] = useState({
        basic: true,
        majors: false,
        licenses: false
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="w-full min-h-screen  pb-24 flex flex-col items-center" dir="rtl">
            
            {/* Header / Profile Summary */}
            <div className="w-full flex flex-col items-center gap-4 pt-6 px-0">
                <div className="w-full flex justify-between items-center mb-2">
                     <div className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold">
                        پروفایل هنرستان
                     </div>
                     {/* Placeholder for top left menu or notification if needed, usually empty in this design or back button */}
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="w-[120px] h-[120px] relative rounded-full overflow-hidden border border-[#DFE1E7]">
                        <Image 
                            src="/SchoolProfile.png" 
                            alt="School Profile" 
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <h1 className="text-[#222831] text-base font-['PeydaFaNum'] font-extrabold">
                            هنرستان هنرهای زیبا
                        </h1>
                        <div className="flex items-center gap-2 text-[#61656B] text-xs font-['PeydaFaNum'] font-extrabold">
                            <span>شناسه: ۱۲۳۴۵۶</span>
                            <span className="w-1 h-1 rounded-full bg-[#61656B]"></span>
                            <span>ابهر، زنجان</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Access */}
            <div className="w-full px-0 mt-6 flex flex-col gap-2">
                <div className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold text-right">
                    دسترسی سریع
                </div>
                <div className="flex items-center gap-2">
                    {/* Reports */}
                    <button className="flex-1 bg-[#FDD00A] rounded-lg p-2 pr-4 flex items-center justify-between hover:bg-[#e5bc09] transition-colors">
                        <span className="text-[#0F172A] text-sm font-['PeydaWeb'] font-semibold">گزارش ها</span>
                        <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center">
                            <FileText className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
                        </div>
                    </button>
                    {/* Students */}
                    <button className="flex-1 bg-[#FDD00A] rounded-lg p-2 pr-4 flex items-center justify-between hover:bg-[#e5bc09] transition-colors">
                        <span className="text-[#0F172A] text-sm font-['PeydaWeb'] font-semibold">هنرجویان</span>
                        <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center">
                            <Users className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
                        </div>
                    </button>
                    {/* Edit */}
                    <button className="flex-1 bg-[#FDD00A] rounded-lg p-2 pr-4 flex items-center justify-between hover:bg-[#e5bc09] transition-colors">
                        <span className="text-[#0F172A] text-sm font-['PeydaWeb'] font-semibold">ویرایش</span>
                        <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center">
                            <Edit2 className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="w-full px-0 mt-8 flex flex-col gap-3">
                <div className="flex gap-3">
                    {/* Staff */}
                    <div className="flex-1 bg-white border border-[#DFE1E7] rounded-xl p-4 shadow-sm flex flex-col items-center gap-2">
                         <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">کادر آموزشی</span>
                         <span className="text-[#0D0D12] text-2xl font-['PeydaFaNum'] font-semibold">۳۲</span>
                         <span className="text-[#818898] text-xs font-['PeydaWeb'] font-light">فعال در ترم جاری</span>
                    </div>
                    {/* Students */}
                    <div className="flex-1 bg-white border border-[#DFE1E7] rounded-xl p-4 shadow-sm flex flex-col items-center gap-2">
                         <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">کل دانش‌آموزان</span>
                         <span className="text-[#0D0D12] text-2xl font-['PeydaFaNum'] font-semibold">۴۵۰</span>
                         <div className="text-xs">
                            <span className="text-[#818898] font-['PeydaFaNum'] mx-1">15+</span>
                            <span className="text-[#818898] font-['PeydaWeb'] font-light">در ماه گذشته</span>
                         </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    {/* Orders */}
                    <div className="flex-1 bg-white border border-[#DFE1E7] rounded-xl p-4 shadow-sm flex flex-col items-center gap-2">
                         <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">سفارشات</span>
                         <span className="text-[#0D0D12] text-2xl font-['PeydaFaNum'] font-semibold">۳۴۰</span>
                         <span className="text-[#818898] text-xs font-['PeydaWeb'] font-light">در ماه گذشته</span>
                    </div>
                    {/* Active Timches */}
                    <div className="flex-1 bg-white border border-[#DFE1E7] rounded-xl p-4 shadow-sm flex flex-col items-center gap-2">
                         <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">تیمچه های فعال</span>
                         <span className="text-[#0D0D12] text-2xl font-['PeydaFaNum'] font-semibold">۸</span>
                         <div className="text-xs">
                            <span className="text-[#818898] font-['PeydaFaNum'] mx-1">1+</span>
                            <span className="text-[#818898] font-['PeydaWeb'] font-light">حمایت در ترم جاری</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* Information Details */}
            <div className="w-full px-0 mt-8 flex flex-col gap-3">
                <div className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold text-right mb-1">
                    جزئیات اطلاعات
                </div>
                
                <div className="w-full bg-white border border-[#DFE1E7] rounded-xl p-3 flex flex-col gap-2">
                    {/* Basic Info Header */}
                    <div 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => toggleSection('basic')}
                    >
                         <ChevronDown className={cn("w-5 h-5 text-[#666D80] transition-transform", expandedSections.basic ? "rotate-180" : "")} />
                         <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">اطلاعات پایه و تماس</span>
                    </div>

                    {expandedSections.basic && (
                        <div className="flex flex-col gap-2 mt-2">
                            {/* Official Name */}
                            <div className="w-full bg-[#fcfcfc] border border-[#DCE4E8] rounded-xl p-3 flex items-center justify-between">
                                <div className="bg-[#F8CB2E] w-[46px] h-[46px] rounded-lg flex items-center justify-center shrink-0">
                                    <Briefcase className="w-6 h-6 text-[#0D0D12]" />
                                </div>
                                <div className="flex-1 flex flex-col items-end pr-3">
                                    <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">نام رسمی</span>
                                    <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold mt-1">هنرستان فنی حرفه‌ای آینده‌سازان (دوره دوم)</span>
                                </div>
                                <div className="border border-[#DFE1E7] bg-white rounded-lg p-2 shadow-sm">
                                    <Edit2 className="w-4 h-4 text-[#818898]" />
                                </div>
                            </div>
                            
                            {/* Address */}
                            <div className="w-full bg-[#fcfcfc] border border-[#DCE4E8] rounded-xl p-3 flex items-center justify-between">
                                <div className="bg-[#F8CB2E] w-[46px] h-[46px] rounded-lg flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-[#0D0D12]" />
                                </div>
                                <div className="flex-1 flex flex-col items-end pr-3">
                                    <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">آدرس</span>
                                    <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold mt-1 text-right leading-tight">تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲</span>
                                </div>
                                <div className="border border-[#DFE1E7] bg-white rounded-lg p-2 shadow-sm">
                                    <Edit2 className="w-4 h-4 text-[#818898]" />
                                </div>
                            </div>

                             {/* Phone */}
                             <div className="w-full bg-[#fcfcfc] border border-[#DCE4E8] rounded-xl p-3 flex items-center justify-between">
                                <div className="bg-[#F8CB2E] w-[46px] h-[46px] rounded-lg flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-[#0D0D12]" />
                                </div>
                                <div className="flex-1 flex flex-col items-end pr-3">
                                    <span className="text-[#0D0D12] text-xs font-['PeydaWeb'] font-black">تلفن</span>
                                    <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold mt-1">۰۲۱-۸۸۸۸۱۲۳۴</span>
                                </div>
                                <div className="border border-[#DFE1E7] bg-white rounded-lg p-2 shadow-sm">
                                    <Edit2 className="w-4 h-4 text-[#818898]" />
                                </div>
                            </div>

                            {/* Postal Code */}
                            <div className="w-full bg-[#fcfcfc] border border-[#DCE4E8] rounded-xl p-3 flex items-center justify-between">
                                <div className="bg-[#F8CB2E] w-[46px] h-[46px] rounded-lg flex items-center justify-center shrink-0">
                                    <LayoutGrid className="w-6 h-6 text-[#0D0D12]" />
                                </div>
                                <div className="flex-1 flex flex-col items-end pr-3">
                                    <span className="text-[#0D0D12] text-xs font-['PeydaWeb'] font-black">کد پستی</span>
                                    <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold mt-1">۱۹۹۱۶۴۵۸۹۳</span>
                                </div>
                                <div className="border border-[#DFE1E7] bg-white rounded-lg p-2 shadow-sm">
                                    <Edit2 className="w-4 h-4 text-[#818898]" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Majors */}
                <div className="w-full bg-white border border-[#DFE1E7] rounded-xl py-3 flex items-center justify-between cursor-pointer" onClick={() => toggleSection('majors')}>
                     <div className="flex items-center gap-2">
                         <ChevronDown className={cn("w-5 h-5 text-[#666D80] transition-transform", expandedSections.majors ? "rotate-180" : "rotate-0")} />
                         <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">رشته ها و کارگاه های فعال</span>
                    </div>
                </div>

                 {/* Licenses */}
                 <div className="w-full bg-white border border-[#DFE1E7] rounded-xl py-3 flex items-center justify-between cursor-pointer" onClick={() => toggleSection('licenses')}>
                     <div className="flex items-center gap-2">
                         <ChevronDown className={cn("w-5 h-5 text-[#666D80] transition-transform", expandedSections.licenses ? "rotate-180" : "rotate-0")} />
                         <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">اطلاعات مجوز ها و اسناد</span>
                    </div>
                </div>
            </div>

            {/* Active Users */}
            <div className="w-full px-0 mt-8 flex flex-col gap-4">
                 <div className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold text-right">
                    کاربران فعال
                </div>
                
                 {/* Tabs */}
                 <div className="w-full bg-[#F6F6F6] border border-[#D7D8DA] rounded-lg p-1 flex">
                     <button className="flex-1 py-1 rounded-md text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold">
                         کادر آموزشی
                     </button>
                     <button className="flex-1 py-1 bg-[#F7C61A] rounded-md text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold shadow-sm">
                         هنرجویان
                     </button>
                 </div>

                 {/* Table */}
                 <div className="bg-white border border-[#DFE1E7] rounded-xl overflow-hidden shadow-sm">
                      <div className="flex items-center justify-between p-4 border-b border-[#DFE1E7]">
                          <div className="flex items-center gap-2">
                              {/* Filter/Sort Buttons Mock */}
                              <div className="w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center">
                                  <MoreVertical className="w-4 h-4 text-[#818898]" />
                              </div>
                               <div className="w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center">
                                  <ChevronDown className="w-4 h-4 text-[#818898]" />
                              </div>
                          </div>
                          <span className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold">هنرجویان فعال</span>
                      </div>

                      {/* Table Header */}
                      <div className="flex bg-[#F6F8FA] border-b border-[#DFE1E7] py-2 px-3 text-[#666D80] text-sm font-['PeydaWeb'] font-semibold">
                          <div className="w-[80px] text-center"></div>
                          <div className="flex-1 text-right pr-4">هنرجو</div>
                          <div className="w-[78px] text-center">وضعیت</div>
                          <div className="w-[44px]"></div>
                      </div>

                      {/* Rows mock based on design */}
                      {[
                          { id: 1, name: "امیرعلی محمدی", status: "active" },
                          { id: 2, name: "پیمان فرهادی", status: "active" },
                          { id: 3, name: "محمدحسین احمدی", status: "active" },
                          { id: 4, name: "علیرضا حسینی", status: "inactive" },
                          { id: 5, name: "رضا کریمی", status: "active" },
                          { id: 6, name: "مهدی عباسی", status: "active" },
                          { id: 7, name: "حامد باقری", status: "active" },
                          { id: 8, name: "سعید منصوری", status: "active" },
                           { id: 9, name: "ایمان مرادی", status: "active" },
                          { id: 10, name: "بهنام طاهری", status: "active" },
                      ].map((student) => (
                           <div key={student.id} className="flex items-center py-3 px-3 border-b border-[#DFE1E7] last:border-0 hover:bg-gray-50">
                               <div className="w-[80px] flex items-center justify-center gap-2">
                                     <div className="w-4 h-4 border border-[#DFE1E7] rounded bg-white"></div>
                                     <span className="text-[#0D0D12] font-['PeydaFaNum'] font-semibold">{student.id}</span>
                               </div>
                               <div className="flex-1 text-right pr-4 text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">
                                   {student.name}
                               </div>
                               <div className="w-[78px] flex justify-center">
                                   <div className={cn(
                                       "px-2 py-0.5 rounded-full text-xs font-['PeydaFaNum']",
                                       student.status === "active" ? "bg-[#ECF9F7] text-[#267666]" : "bg-[#FCE8EC] text-[#B21634]"
                                   )}>
                                       {student.status === "active" ? "فعال" : "غیرفعال"}
                                   </div>
                               </div>
                               <div className="w-[44px] flex justify-center">
                                    <MoreVertical className="w-4 h-4 text-[#666D80]" />
                               </div>
                           </div>
                      ))}

                      {/* Pagination */}
                       <div className="border-t border-[#DFE1E7] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {/* Next */}
                                <button className="w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center">
                                    <ChevronDown className="w-4 h-4 rotate-90" />
                                </button>
                                {/* Current Page */}
                                <div className="h-8 px-2 rounded-lg border border-[#DFE1E7] flex items-center justify-center text-[#0D0D12] text-xs font-['PeydaFaNum']">
                                    1/15
                                </div>
                                {/* Prev */}
                                <button className="w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center">
                                     <ChevronDown className="w-4 h-4 -rotate-90" />
                                </button>
                            </div>
                            <span className="text-[#0D0D12] text-sm font-['PeydaFaNum']">صفحه 1 از 15</span>
                       </div>
                 </div>
            </div>

            {/* Update Button */}
            <div className="w-full px-0 mt-8 pb-8">
                <button className="w-full bg-[#FDD00A] rounded-xl py-3 text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold hover:bg-[#e5bc09] transition-colors">
                    بروز رسانی اطلاعات هنرستان
                </button>
            </div>

        </div>
    );
}

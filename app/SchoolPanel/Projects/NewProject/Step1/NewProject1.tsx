"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown, Calendar, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
// If Switch doesn't exist, I'll build a simple one. The user design shows a switch.

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

const NewProject1 = () => {
    const router = useRouter();
    const [projectType, setProjectType] = useState<"product" | "project">("product");

    return (
        <div className="w-full min-h-screen  pb-24" dir="rtl">
            {/* Header */}
            <div className="w-full h-16 px-0 flex justify-between items-center bg-white border-b border-[#DFE1E7]">
               
               <div className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
                   افزودن پروژه
               </div>
               <div 
                   onClick={() => router.back()}
                   className="w-10 h-10 bg-white rounded-full border border-[rgba(8,11,17,0.10)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
               </div>
            </div>

            <div className="w-full max-w-md mx-auto p-0 flex flex-col gap-6">
                {/* Stepper */}
                <div className="w-full py-5 flex items-center gap-4 overflow-x-auto border-b border-[#DFE1E7] no-scrollbar">
                     
                     {/* Step 1: Basic Info (Active) */}
                     <div className="flex items-center gap-2.5 flex-shrink-0">
                          <div className="w-6 h-6 bg-[#FDD00A] rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(1)}</span>
                          </div>
                         <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">اطلاعات پایه</span>
                     </div>
                     
                     <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                     {/* Step 2: Resources */}
                     <div className="flex items-center gap-2.5 opacity-50 flex-shrink-0">
                          <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(2)}</span>
                          </div>
                         <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">منابع</span>
                     </div>
                     
                     <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                     {/* Step 3: Financial */}
                      <div className="flex items-center gap-2.5 opacity-50 flex-shrink-0">
                          <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(3)}</span>
                          </div>
                         <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">مالی</span>
                     </div>

                     <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                     {/* Step 4: Sharing */}
                      <div className="flex items-center gap-2.5 opacity-50 flex-shrink-0">
                          <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(4)}</span>
                          </div>
                         <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">تسهیم</span>
                     </div>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-6">
                    
                    {/* Project Title */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">عنوان پروژه</label>
                        <input 
                            type="text" 
                            className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 text-[#0D0D12] text-right focus:outline-none focus:border-[#FDD00A]" 
                        />
                    </div>

                    {/* Project Type */}
                    <div className="flex items-center justify-between">
                         <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">نوع پروژه</label>
                         
                         <div className="flex bg-white rounded-lg border border-[#E5E5E5] p-[1px] shadow-sm">
                             <div 
                                onClick={() => setProjectType("product")}
                                className={cn(
                                    "px-3 py-1.5 flex items-center gap-2 rounded-md cursor-pointer transition-all",
                                    projectType === "product" ? "bg-[#FDD00A]" : "bg-transparent"
                                )}
                             >
                                 <span className={cn("text-sm font-semibold font-['PeydaWeb']", projectType === "product" ? "text-black" : "text-[#666D80]")}>محصول محور</span>
                                 {/* Icon for Product (Box) */}
                                 <div className="w-4 h-4 border border-current rounded-sm"></div> 
                             </div>
                             
                             <div 
                                onClick={() => setProjectType("project")}
                                className={cn(
                                    "px-3 py-1.5 flex items-center gap-2 rounded-md cursor-pointer transition-all",
                                    projectType === "project" ? "bg-[#FDD00A]" : "bg-transparent"
                                )}
                             >
                                 <span className={cn("text-sm font-semibold font-['PeydaWeb']", projectType === "project" ? "text-black" : "text-[#666D80]")}>پروژه محور</span>
                                 {/* Icon for Project (Grid) */}
                                  <div className="w-4 h-4 border border-current rounded-sm"></div>
                             </div>
                         </div>
                    </div>

                    {/* Timche/Workshop */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">تیمچه/کارگاه مرتبط</label>
                        <div className="relative w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] flex items-center px-3 cursor-pointer">
                            <span className="flex-1"></span>
                            <ChevronDown className="w-5 h-5 text-[#666D80]" />
                        </div>
                    </div>

                    {/* Responsible Mentor */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">هنرآموز مسئول</label>
                        <div className="relative w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] flex items-center px-3 cursor-pointer">
                            <span className="flex-1"></span>
                            <ChevronDown className="w-5 h-5 text-[#666D80]" />
                        </div>
                    </div>

                    {/* Schedule */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">زمان بندی تقریبی</label>
                        <div className="relative w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] flex items-center px-3 cursor-pointer">
                            <span className="flex-1"></span>
                            <Calendar className="w-5 h-5 text-[#666D80]" />
                        </div>
                    </div>

                    {/* Support Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">این پروژه نیاز به حمایت دارد.</span>
                        {/* Custom Switch or default */}
                         <div className="w-12 h-6 bg-[#605F5F] rounded-full relative cursor-pointer">
                             <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-all"></div>
                         </div>
                    </div>
                    
                    {/* Desired Supports */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">حمایت های مدنظر</label>
                        <div className="relative w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] flex items-center px-3 cursor-pointer">
                            <span className="flex-1 text-right text-xs font-light text-[#666D80]">حمایت مالی، تجهیزات، ...</span>
                            <ChevronDown className="w-5 h-5 text-[#666D80]" />
                        </div>
                    </div>

                </div>

                {/* Next Button */}
                <div className="w-full pb-5 flex justify-end items-center gap-3.5 mt-4">
                    <button 
                        onClick={() => router.push('/SchoolPanel/Projects/NewProject/step2')}
                        className="flex-1 h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2.5 hover:bg-[#e5c109] transition-colors"
                    >
                         <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">ادامه</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProject1;

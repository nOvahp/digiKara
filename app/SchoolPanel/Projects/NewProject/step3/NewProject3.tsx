"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

const NewProject3 = () => {
    const router = useRouter();

    return (
        <div className="w-full min-h-screen pb-24" dir="rtl">
            {/* Header */}
            <div className="w-full h-16 px-0 flex justify-between items-center bg-white border-b border-[#DFE1E7]">
               <div className="w-10"></div>
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
                     
                     {/* Step 1: Basic Info (Inactive) */}
                     <div className="flex items-center gap-2.5 flex-shrink-0 opacity-50">
                         <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                             <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(1)}</span>
                         </div>
                         <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">اطلاعات پایه</span>
                     </div>
                     
                     <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                     {/* Step 2: Resources (Inactive) */}
                     <div className="flex items-center gap-2.5 flex-shrink-0 opacity-50">
                         <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                             <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(2)}</span>
                         </div>
                         <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">منابع</span>
                     </div>
                     
                     <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                     {/* Step 3: Financial (Active) */}
                      <div className="flex items-center gap-2.5 flex-shrink-0">
                         <div className="w-6 h-6 bg-[#FDD00A] rounded-full flex items-center justify-center">
                             <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(3)}</span>
                         </div>
                         <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">مالی</span>
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
                <div className="flex flex-col gap-6 px-0">
                    <div className="w-full text-right text-[#0D0D12] text-base font-semibold font-['PeydaWeb']">
                        برآورد مالی پروژه
                    </div>
                    
                    {/* Estimated Cost */}
                    <div className="flex flex-col gap-2">
                         <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] text-right">
                             هزینه تخمینی
                         </label>
                         <div className="relative w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] flex items-center px-3">
                            <span className="text-[#818898] text-base font-semibold font-['PeydaWeb'] ml-2">ریال</span>
                            <input 
                                type="text"
                                className="flex-1 h-full border-none outline-none text-[#0D0D12] text-left font-num-medium direction-ltr"
                                placeholder={toFarsiNumber(0)} 
                                style={{ direction: 'ltr' }} // Force LTR for numbers input
                            />
                         </div>
                    </div>

                    {/* Estimated Revenue */}
                    <div className="flex flex-col gap-2">
                         <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] text-right">
                             درآمد تخمینی
                         </label>
                         <div className="relative w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] flex items-center px-3">
                            <span className="text-[#818898] text-base font-semibold font-['PeydaWeb'] ml-2">ریال</span>
                             <input 
                                type="text"
                                className="flex-1 h-full border-none outline-none text-[#0D0D12] text-left font-num-medium"
                                placeholder={toFarsiNumber(0)} 
                                style={{ direction: 'ltr' }}
                            />
                         </div>
                    </div>

                    {/* Estimated Profit */}
                    <div className="flex flex-col gap-2">
                         <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] text-right">
                             سود تخمینی
                         </label>
                         <div className="relative w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] flex items-center px-3">
                            <span className="text-[#818898] text-base font-semibold font-['PeydaWeb'] ml-2">ریال</span>
                             <input 
                                type="text"
                                className="flex-1 h-full border-none outline-none text-[#0D0D12] text-left font-num-medium"
                                placeholder={toFarsiNumber(0)} 
                                style={{ direction: 'ltr' }}
                            />
                         </div>
                    </div>

                </div>

                <div className="w-full pb-5 px-0 flex justify-end items-center gap-3.5 mt-4">
                    <button 
                        onClick={() => router.push('/SchoolPanel/Projects/NewProject/Step4')}
                        className="flex-1 h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2.5 hover:bg-[#e5c109] transition-colors"
                    >
                         <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">ادامه</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProject3;

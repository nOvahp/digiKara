"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NewProject2 = () => {
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
                     
                     {/* Step 1: Basic Info (Inactive/Done) */}
                     {/* User prompts imply Step 1 was FDD00A. Now Step 2 should be FDD00A. */}
                     {/* What state should Step 1 be? "Done"? Usually Green or just colored? 
                         In the provided image, Step 2 is Yellow (Active). 
                         Step 1 is seemingly gray/white? 
                         I will make Step 1 Gray (visited) and Step 2 Yellow (Active).
                      */}
                     
                     <div className="flex items-center gap-2.5 flex-shrink-0 opacity-50">
                         <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                             <span className="text-white text-sm font-bold font-['PeydaFaNum']">1</span>
                         </div>
                         <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">اطلاعات پایه</span>
                     </div>
                     
                     <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                     {/* Step 2: Resources (Active) */}
                     <div className="flex items-center gap-2.5 flex-shrink-0">
                         <div className="w-6 h-6 bg-[#FDD00A] rounded-full flex items-center justify-center">
                             <span className="text-white text-sm font-bold font-['PeydaFaNum']">2</span>
                         </div>
                         <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">منابع</span>
                     </div>
                     
                     <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                     {/* Step 3: Financial */}
                      <div className="flex items-center gap-2.5 opacity-50 flex-shrink-0">
                         <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                             <span className="text-white text-sm font-bold font-['PeydaFaNum']">3</span>
                         </div>
                         <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">مالی</span>
                     </div>

                     <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                     {/* Step 4: Sharing */}
                      <div className="flex items-center gap-2.5 opacity-50 flex-shrink-0">
                         <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                             <span className="text-white text-sm font-bold font-['PeydaFaNum']">4</span>
                         </div>
                         <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">تسهیم</span>
                     </div>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-6 px-4">
                    
                    {/* Human Resources */}
                    <div className="flex flex-col gap-2">
                         <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] text-right">
                             تعداد نیروی انسانی مورد نیاز (پیش‌بینی اولیه)
                         </label>
                         <div className="relative w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] flex items-center px-3 cursor-pointer">
                            <span className="text-[#818898] text-base font-semibold font-['PeydaWeb']">نفر</span>
                            <ChevronDown className="w-4 h-4 text-[#818898] mr-auto" /> 
                            {/* NOTE: "mr-auto" pushes icon to left in RTL? No, "mr-auto" pushes to LEFT in LTR. In RTL flex row, "mr-auto" pushes to RIGHT.
                                Wait. Flex Row RTL: start is Right.
                                [Text] [Space] [Icon].
                                If I want Icon on Left: I need it at the END of the container.
                                Flex RTL: Start=Right, End=Left.
                                So I want Icon at End.
                                `flex items-center justify-between`?
                                User Code: 
                                <div (Icon+Text)> ... </div>
                                <div (flex 1)></div> (Spacer)
                                Wait, user code has:
                                [Icon+Text (Nafar)] [Spacer].
                                Wait. "Nafar" is usually the unit.
                                Code:
                                <div ... justify-start ... gap-4>
                                    <Icon> ... </Icon>
                                    <Text "Nafar"> ... </Text>
                                </div>
                                <div flex-1></div>
                                
                                So "Nafar" + Icon is on the Right?
                                Wait. Icon is 16x16 with outline. It looks like a "User" icon placeholder.
                                And "Nafar" text next to it.
                                Let's assume standard input: Value on Right? Or Select?
                                User code implies it's a display: "Nafar".
                                The image shows "Nafar" with an arrow pointing down (Select box).
                                
                                Let's recreate the Select look:
                                [Text "Nafar"] [ChevronDown (Left)].
                                Code: `justify-between`.
                             */}
                             <div className="flex items-center gap-2">
                                <div className="w-4 h-2 border border-[#818898] rounded-sm"></div> 
                                <span className="text-[#818898] text-base font-semibold font-['PeydaWeb']">نفر</span>
                             </div>
                             {/* Spacer to push arrow to left */}
                             <div className="flex-1"></div> 
                             <ChevronDown className="w-5 h-5 text-[#818898]" />
                         </div>
                    </div>

                    {/* Equipment Needed */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">تجهیزات مورد نیاز</label>
                            <span className="text-[#666D80] text-[10px] font-semibold font-['PeydaWeb']">هر مورد در یک خط</span>
                        </div>
                        <div className="w-full h-[200px] bg-white rounded-xl border border-[#DFE1E7] flex flex-col p-3">
                            <textarea 
                                className="w-full flex-1 resize-none outline-none text-[#0D0D12] text-sm font-['PeydaWeb'] placeholder-[#A4ACB9]" 
                                dir="rtl"
                            ></textarea>
                            <div className="w-full flex justify-end">
                                <span className="text-[#A4ACB9] text-xs font-light font-['PeydaFaNum']">0/200</span>
                            </div>
                        </div>
                    </div>

                    {/* Consumables */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">مواد مصرفی</label>
                            <span className="text-[#666D80] text-[10px] font-semibold font-['PeydaWeb']">هر مورد در یک خط</span>
                        </div>
                        <div className="w-full h-[200px] bg-white rounded-xl border border-[#DFE1E7] flex flex-col p-3">
                            <textarea 
                                className="w-full flex-1 resize-none outline-none text-[#0D0D12] text-sm font-['PeydaWeb'] placeholder-[#A4ACB9]" 
                                dir="rtl"
                            ></textarea>
                            <div className="w-full flex justify-end">
                                <span className="text-[#A4ACB9] text-xs font-light font-['PeydaFaNum']">0/200</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Button */}
                <div className="w-full pb-5 px-4 flex justify-end items-center gap-3.5 mt-4">
                    <button 
                        onClick={() => router.push('/SchoolPanel/Projects/NewProject/step3')}
                        className="flex-1 h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2.5 hover:bg-[#e5c109] transition-colors"
                    >
                         <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">ادامه</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProject2;

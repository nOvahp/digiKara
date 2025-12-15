"use client"

import React from "react"
import { cn } from "@/lib/utils"

export function Navigation() {
  return (
    <div className="w-full fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      <div className="relative w-full max-w-[440px] pointer-events-auto">
        <div 
            className="w-full bg-white shadow-[0px_0px_4px_#E9B443] rounded-t-[20px] flex flex-col justify-center items-center gap-1 pb-2 pt-2"
        >
            <div className="w-[335px] flex justify-between items-center">
                
                {/* School Project */}
                <div className="w-[42px] pt-2 flex flex-col justify-center items-center gap-1 cursor-pointer group">
                    <div className="w-6 h-6 relative overflow-hidden">
                        <div className="w-[10px] h-[14.81px] absolute left-[7px] top-[7.19px] border-[1.5px] border-[#605F5F] rounded-[1px]" />
                        <div className="w-[20px] h-[9px] absolute left-[2px] top-[13px] border-[1.5px] border-[#605F5F] rounded-[1px]" />
                        <div className="w-[4px] h-[5px] absolute left-[12px] top-[2px] border-[1.5px] border-[#605F5F] rounded-[1px]" />
                    </div>
                    <div className="text-[#605F5F] text-[10px] font-semibold font-['PeydaWeb']">پروژه مدرسه</div>
                </div>

                {/* Report */}
                <div className="w-[42px] pt-2 flex flex-col justify-center items-center gap-1 cursor-pointer group">
                    <div className="w-6 h-6 relative overflow-hidden">
                        <div className="w-[19px] h-[19px] absolute left-[2.5px] top-[2.5px] border-[1.5px] border-[#605F5F] rounded-[4px]" />
                        <div className="w-[11px] h-[5.5px] absolute left-[6px] top-[6px] border-[1.5px] border-[#605F5F] rounded-[1px]" />
                         {/* Chart line simulation */}
                         <div className="w-[4px] h-[4px] absolute left-[15px] top-[6px] border-[1.5px] border-[#605F5F] rounded-full" />
                    </div>
                    <div className="text-[#605F5F] text-[10px] font-semibold font-['PeydaWeb']">گزارش</div>
                </div>

                {/* Home (Active) */}
                <div className="w-[42px] -mt-6 pt-6 border-t-[4px] border-[#F7C61A] flex flex-col justify-center items-center gap-1 cursor-pointer">
                    <div className="w-6 h-6 relative overflow-hidden">
                        <div className="w-[18px] h-[19px] absolute left-[3px] top-[2.5px] border-[1.5px] border-[#F7C61A] rounded-[4px] rounded-t-[8px]" />
                        <div className="w-[6px] h-[1px] absolute left-[9px] top-[17px] bg-[#F7C61A]" />
                        {/* Smile/Curve */}
                        <div className="w-[8px] h-[4px] absolute left-[8px] top-[12px] border-b-[1.5px] border-[#F7C61A] rounded-full" />
                    </div>
                    <div className="text-[#F7C61A] text-[10px] font-semibold font-['PeydaWeb']">صفحه اصلی</div>
                </div>

                {/* Sale */}
                <div className="w-[42px] pt-2 flex flex-col justify-center items-center gap-1 cursor-pointer group">
                    <div className="w-6 h-6 relative overflow-hidden">
                        <div className="w-[6px] h-[3px] absolute left-[7px] top-[6px] border-[1.5px] border-[#605F5F] rounded-t-sm" />
                        <div className="w-[15px] h-[18px] absolute left-[2.5px] top-[3px] border-[1.5px] border-[#605F5F] rounded-[4px]" />
                        <div className="w-[9px] h-[18px] absolute left-[12.5px] top-[3px] border-[1.5px] border-[#605F5F] rounded-r-[4px] bg-white" />
                    </div>
                    <div className="text-[#605F5F] text-[10px] font-semibold font-['PeydaWeb']">فروش</div>
                </div>

                {/* Education */}
                <div className="w-[42px] pt-2 flex flex-col justify-center items-center gap-1 cursor-pointer group">
                    <div className="w-6 h-6 relative overflow-hidden">
                        <div className="w-[20px] h-[18px] absolute left-[2px] top-[3px] border-[1.5px] border-[#605F5F] rounded-[4px]" />
                        <div className="w-[5px] h-[5px] absolute left-[5px] top-[10px] border-[1.5px] border-[#605F5F] rounded-full" />
                        <div className="w-[6px] h-[4px] absolute left-[12px] top-[7px] border-[1.5px] border-[#605F5F]" />
                    </div>
                    <div className="text-[#605F5F] text-[10px] font-semibold font-['PeydaWeb']">آموزش</div>
                </div>

            </div>
            
            {/* iOS Home Indicator Mockup */}
            <div className="w-[148px] h-[5px] bg-[#61656B] rounded-full mt-2 opacity-30" />
        </div>
      </div>
    </div>
  )
}

export default Navigation;

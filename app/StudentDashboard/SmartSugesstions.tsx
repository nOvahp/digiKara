"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"

export function SmartSugesstions() {
  return (
    <div className="w-full inline-flex flex-col justify-start items-start gap-2" dir="rtl">
        
        {/* Header */}
        <div className="self-stretch inline-flex justify-start items-center gap-20">
            <div className="text-[#222831] text-[18px] font-num-medium leading-[25.20px] break-words">
                پیشنهادات هوشمند
            </div>
        </div>

        {/* Suggestions Row */}
        <div className="self-stretch flex justify-start items-center gap-2 overflow-x-auto pb-2">
            
            {/* Card 1 */}
            <div className="min-w-[250px] bg-white border border-[#DFE1E7] shadow-sm rounded-lg flex justify-start items-center gap-2 p-2.5">
                <div className="flex-1 flex flex-col justify-start items-start gap-1.5">
                    {/* Icon */}
                    <div className="w-6 h-6 relative">
                         <Sparkles className="w-5 h-5 text-[#F7C61A]" strokeWidth={1.5} />
                    </div>
                    {/* Title */}
                    <div className="self-stretch flex justify-start items-center gap-1.5">
                        <div className="text-right text-[#0F172A] text-sm font-['Meem'] font-medium leading-[21.70px] break-words">
                            دوره آموزشی مناسب
                        </div>
                    </div>
                    {/* Description */}
                    <div className="self-stretch flex justify-start items-center gap-1.5">
                        <div className="flex-1 text-right text-[#888B90] text-[10px] font-num-medium leading-[15.50px] break-words">
                            دوره «عکاسی از محصول با موبایل» می‌تواند به فروش شما کمک کند.
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="min-w-[250px] bg-white border border-[#DFE1E7] shadow-sm rounded-lg flex justify-start items-center gap-2 p-2.5">
                <div className="flex-1 flex flex-col justify-start items-start gap-1.5">
                     {/* Icon */}
                    <div className="w-6 h-6 relative">
                         <Sparkles className="w-5 h-5 text-[#F7C61A]" strokeWidth={1.5} />
                    </div>
                    {/* Title */}
                    <div className="self-stretch flex justify-start items-center gap-1.5">
                        <div className="text-right text-[#0F172A] text-sm font-['Meem'] font-medium leading-[21.70px] break-words">
                            این محصول پرفروش است.
                        </div>
                    </div>
                    {/* Description */}
                    <div className="self-stretch flex justify-start items-center gap-1.5">
                         <div className="flex-1 text-right text-[#888B90] text-[10px] font-num-medium leading-[15.50px] break-words">
                            «کارهای دستی چوبی» در منطقه شما محبوبیت زیادی پیدا کرده است.
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

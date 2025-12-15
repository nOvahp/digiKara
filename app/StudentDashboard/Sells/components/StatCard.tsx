import React from 'react';
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    trendType: 'positive' | 'negative';
    trendLabel: string; // e.g., "از ماه گذشته"
    icon: React.ReactNode;
}

export function StatCard({ title, value, trend, trendType, trendLabel, icon }: StatCardProps) {
    const isPositive = trendType === 'positive';
    
    // Derived styles based on trend type, matching the user's specific colors
    const trendBgColor = isPositive ? 'bg-[#DDF3EF]' : 'bg-[#FFF0F3]';
    const trendTextColor = isPositive ? 'text-[#28806F]' : 'text-[#DF1C41]';

    return (
        <div className="flex-1 min-w-[150px] p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] overflow-hidden rounded-xl border border-[#DFE1E7] flex flex-col gap-2.5">
            <div className="w-full flex flex-col gap-0.5">
                <div className="w-full flex justify-between items-center gap-2.5">
                    <div className="flex-1 text-right text-[#818898] text-sm font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
                        {title}
                    </div>
                    {/* Icon Container */}
                    <div className="w-9 h-9 relative bg-[#FFD369] shadow-[inset_0_-4px_6px_rgba(255,255,255,0.5)] overflow-hidden rounded-lg flex items-center justify-center">
                        {icon}
                    </div>
                </div>
                
                <div className="w-full flex justify-start items-center gap-2">
                    <div className="text-[#0D0D12] text-2xl font-semibold font-['PeydaFaNum'] leading-[31.2px]">
                        {value}
                    </div>
                    <div className={cn("px-2 py-[1px] rounded-[36px] flex justify-center items-center gap-0.5", trendBgColor)}>
                         <div className={cn("text-xs font-semibold font-['PeydaWeb'] leading-[18px] tracking-wide", trendTextColor)}>
                            {trend}
                         </div>
                    </div>
                </div>
            </div>
            
            <div className="w-full text-center text-[#818898] text-xs font-light font-['PeydaWeb'] leading-[18px] tracking-wide">
                {trendLabel}
            </div>
        </div>
    );
}

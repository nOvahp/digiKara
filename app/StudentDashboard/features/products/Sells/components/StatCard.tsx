import React from 'react';
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string;
    trend?: string;
    trendType?: 'positive' | 'negative';
    trendLabel?: string; 
    icon: React.ReactNode;
    color?: 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'gray';
}

const colorVariants = {
    blue: {
        icon: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
        border: "group-hover:border-blue-200",
        shadow: "group-hover:shadow-blue-100/50"
    },
    green: {
        icon: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
        border: "group-hover:border-emerald-200",
        shadow: "group-hover:shadow-emerald-100/50"
    },
    amber: {
        icon: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
        border: "group-hover:border-amber-200",
        shadow: "group-hover:shadow-amber-100/50"
    },
    red: {
        icon: "bg-rose-50 text-rose-600 group-hover:bg-rose-100",
        border: "group-hover:border-rose-200",
        shadow: "group-hover:shadow-rose-100/50"
    },
    purple: {
        icon: "bg-purple-50 text-purple-600 group-hover:bg-purple-100",
        border: "group-hover:border-purple-200",
        shadow: "group-hover:shadow-purple-100/50"
    },
    gray: {
        icon: "bg-gray-50 text-gray-600 group-hover:bg-gray-100",
        border: "group-hover:border-gray-200",
        shadow: "group-hover:shadow-gray-100/50"
    }
};

export function StatCard({ title, value, trend, trendType, trendLabel, icon, color = 'gray' }: StatCardProps) {
    const isPositive = trendType === 'positive';
    
    // Modern, softer colors for trends
    const trendBgColor = isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600';
    
    const variant = colorVariants[color] || colorVariants.gray;

    return (
        <div className={cn(
            "flex-1 min-w-0 p-4 sm:p-5 bg-white shadow-sm transition-all duration-300 rounded-2xl border border-gray-100 flex flex-col justify-between gap-2 group cursor-default",
            "hover:shadow-md",
            variant.border,
            variant.shadow
        )} dir="rtl">
            <div className="flex justify-between items-start">
                 <div className="flex flex-col gap-2">
                      <span className="text-gray-500 text-sm font-medium font-['PeydaWeb']">{title}</span>
                      <span className="text-[#0D0D12] text-2xl font-bold font-['PeydaFaNum'] tracking-tight">{value}</span>
                 </div>
                 <div className={cn(
                     "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-sm",
                     variant.icon
                 )}>
                      {icon}
                 </div>
            </div>

            {trend && (
                <div className="flex items-center gap-2 text-xs pt-2">
                    <span className={cn("px-2.5 py-0.5 rounded-full flex items-center gap-1 font-['PeydaFaNum'] font-medium", trendBgColor)}>
                        {trend}
                    </span>
                    {trendLabel && <span className="text-gray-400 font-['PeydaWeb']">{trendLabel}</span>}
                </div>
            )}
        </div>
    );
}

"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  
  // Helper for Item Styles
  const getItemClasses = (active: boolean) => cn(
      "w-[42px] flex flex-col justify-center items-center gap-1 cursor-pointer transition-all duration-300",
      active ? "-mt-6 pt-6 border-t-[4px] border-[#F7C61A]" : "pt-2 group"
  );

  const getTextClasses = (active: boolean) => cn(
      "text-[10px] font-semibold font-['PeydaWeb']",
      active ? "text-[#F7C61A]" : "text-[#605F5F]"
  );
  
  const getIconBorderColor = (active: boolean) => active ? "border-[#F7C61A]" : "border-[#605F5F]";
  const getIconBgColor = (active: boolean) => active ? "bg-[#F7C61A]" : "bg-[#605F5F]";

  return (
    <div className="w-full fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      <div className="relative w-full max-w-[440px] pointer-events-auto">
        <div 
            className="w-full bg-white shadow-[0px_0px_4px_#E9B443] rounded-t-[20px] flex flex-col justify-center items-center gap-1 pb-2 pt-2"
        >
            <div className="w-[335px] flex justify-between items-center px-2">
                
                {/* School Project */}
                <div className={getItemClasses(false)}>
                    <div className="w-6 h-6 relative overflow-hidden">
                        <div className="w-[10px] h-[14.81px] absolute left-[7px] top-[7.19px] border-[1.5px] border-[#605F5F] rounded-[1px]" />
                        <div className="w-[20px] h-[9px] absolute left-[2px] top-[13px] border-[1.5px] border-[#605F5F] rounded-[1px]" />
                        <div className="w-[4px] h-[5px] absolute left-[12px] top-[2px] border-[1.5px] border-[#605F5F] rounded-[1px]" />
                    </div>
                    <div className={getTextClasses(false)}>پروژه مدرسه</div>
                </div>

                {/* Report */}
                <div className={getItemClasses(false)}>
                    <div className="w-6 h-6 relative overflow-hidden">
                        <div className="w-[19px] h-[19px] absolute left-[2.5px] top-[2.5px] border-[1.5px] border-[#605F5F] rounded-[4px]" />
                        <div className="w-[11px] h-[5.5px] absolute left-[6px] top-[6px] border-[1.5px] border-[#605F5F] rounded-[1px]" />
                        <div className="w-[4px] h-[4px] absolute left-[15px] top-[6px] border-[1.5px] border-[#605F5F] rounded-full" />
                    </div>
                    <div className={getTextClasses(false)}>گزارش</div>
                </div>

                {/* Home */}
                <Link href="/StudentDashboard" className={getItemClasses(isActive('/StudentDashboard') || isActive('/StudentDashboard/'))}>
                    <div className="w-6 h-6 relative overflow-hidden">
                        <div className={cn("w-[18px] h-[19px] absolute left-[3px] top-[2.5px] border-[1.5px] rounded-[4px] rounded-t-[8px]", getIconBorderColor(isActive('/StudentDashboard') || isActive('/StudentDashboard/')))} />
                        {/* Door/Center line */}
                        <div className={cn("w-[6px] h-[1px] absolute left-[9px] top-[17px]", getIconBgColor(isActive('/StudentDashboard') || isActive('/StudentDashboard/')))} />
                        {/* Smile/Curve - simplified as border-b for now */}
                        <div className={cn("w-[8px] h-[4px] absolute left-[8px] top-[12px] border-b-[1.5px] rounded-full", getIconBorderColor(isActive('/StudentDashboard') || isActive('/StudentDashboard/')))} />
                    </div>
                    <div className={getTextClasses(isActive('/StudentDashboard') || isActive('/StudentDashboard/'))}>صفحه اصلی</div>
                </Link>

                {/* Sale */}
                <Link href="/StudentDashboard/Sells" className={getItemClasses(isActive('/StudentDashboard/Sells'))}>
                    <div className="w-6 h-6 relative overflow-hidden">
                        {/* Bag Handle */}
                        <div className={cn("w-[6px] h-[3px] absolute left-[7px] top-[6px] border-[1.5px] rounded-t-sm", getIconBorderColor(isActive('/StudentDashboard/Sells')))} />
                        {/* Bag Body Left */}
                        <div className={cn("w-[15px] h-[18px] absolute left-[2.5px] top-[3px] border-[1.5px] rounded-[4px]", getIconBorderColor(isActive('/StudentDashboard/Sells')))} />
                        {/* Bag Body Right (Flap/Pocket) */}
                        <div className={cn("w-[9px] h-[18px] absolute left-[12.5px] top-[3px] border-[1.5px] rounded-r-[4px] bg-white", getIconBorderColor(isActive('/StudentDashboard/Sells')))} />
                    </div>
                    <div className={getTextClasses(isActive('/StudentDashboard/Sells'))}>فروش</div>
                </Link>

                {/* Education */}
                <div className={getItemClasses(false)}>
                    <div className="w-6 h-6 relative overflow-hidden">
                        <div className="w-[20px] h-[18px] absolute left-[2px] top-[3px] border-[1.5px] border-[#605F5F] rounded-[4px]" />
                        <div className="w-[5px] h-[5px] absolute left-[5px] top-[10px] border-[1.5px] border-[#605F5F] rounded-full" />
                        <div className="w-[6px] h-[4px] absolute left-[12px] top-[7px] border-[1.5px] border-[#605F5F]" />
                    </div>
                    <div className={getTextClasses(false)}>آموزش</div>
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

"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/Bazzar' && pathname === '/Bazzar') return true;
    if (path !== '/Bazzar' && pathname?.startsWith(path)) return true;
    return false;
  };
  
  // Helper for Item Styles
  const getItemClasses = (active: boolean) => cn(
      "w-[42px] flex flex-col justify-center items-center gap-1 cursor-pointer transition-all duration-300",
      active ? "-mt-6 pt-6 border-t-[4px] border-[#F7C61A]" : "pt-2 group hover:opacity-80"
  );

  const getTextClasses = (active: boolean) => cn(
      "text-[10px] font-semibold font-['PeydaWeb']",
      active ? "text-[#F7C61A]" : "text-[#605F5F]"
  );
  
  const getIconBorderColor = (active: boolean) => active ? "border-[#F7C61A]" : "border-[#605F5F]";
  
  return (
    <div className="w-full fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      <div className="relative w-full max-w-[440px] pointer-events-auto">
        <div 
            className="w-full bg-white shadow-[0px_0px_4px_#E9B443] rounded-t-[20px] flex flex-col justify-center items-center gap-1 pb-2 pt-2"
        >
            <div className="w-[335px] flex justify-between items-center px-2">
                
                {/* Profile */}
                <Link href="/Bazzar/Profile" className={getItemClasses(isActive('/Bazzar/Profile'))}>
                    <div className="w-6 h-6 relative overflow-hidden">
                        {/* Head */}
                        <div className={cn("w-[7px] h-[7px] absolute left-[8.5px] top-[7.4px] border-[1.5px] rounded-full", getIconBorderColor(isActive('/Bazzar/Profile')))} />
                        {/* Body */}
                        <div className={cn("w-[14px] h-[6.5px] absolute left-[5px] top-[14.4px] border-[1.5px] rounded-t-[8px]", getIconBorderColor(isActive('/Bazzar/Profile')))} />
                    </div>
                    <div className={getTextClasses(isActive('/Bazzar/Profile'))}>حساب کاربری</div>
                </Link>

                {/* Cart */}
                <Link href="/Bazzar/Cart" className={getItemClasses(isActive('/Bazzar/Cart'))}>
                    <div className="w-6 h-6 relative overflow-hidden">
                        {/* Handle */}
                        <div className={cn("w-[6px] h-[3px] absolute left-[7px] top-[6px] border-[1.5px] rounded-t-sm", getIconBorderColor(isActive('/Bazzar/Cart')))} />
                        {/* Body */}
                        <div className={cn("w-[15px] h-[18px] absolute left-[2.5px] top-[3px] border-[1.5px] rounded-[4px]", getIconBorderColor(isActive('/Bazzar/Cart')))} />
                    </div>
                    <div className={getTextClasses(isActive('/Bazzar/Cart'))}>سبد خرید</div>
                </Link>

                {/* Home */}
                <Link href="/Bazzar" className={getItemClasses(isActive('/Bazzar'))}>
                    <div className="w-6 h-6 relative overflow-hidden">
                         <div className={cn("w-[18px] h-[19px] absolute left-[3px] top-[2.5px] border-[1.5px] rounded-[4px] rounded-t-[8px]", getIconBorderColor(isActive('/Bazzar')))} />
                         {/* Door */}
                        <div className={cn("w-[6px] h-[1px] absolute left-[9px] top-[17px] bg-current", getIconBorderColor(isActive('/Bazzar')))} />
                    </div>
                    <div className={getTextClasses(isActive('/Bazzar'))}>صفحه اصلی</div>
                </Link>

                {/* Categories */}
                <Link href="/Bazzar/Categories" className={getItemClasses(isActive('/Bazzar/Categories'))}>
                    <div className="w-6 h-6 relative overflow-hidden">
                        {/* Grid */}
                        <div className={cn("w-[20px] h-[20px] absolute left-[2px] top-[2px] border-[1.5px] rounded-[4px]", getIconBorderColor(isActive('/Bazzar/Categories')))} />
                        {/* Lines to look like grid */}
                        <div className={cn("w-[20px] h-[1.5px] absolute left-[2px] top-[11px] bg-gray-400 opacity-50", isActive('/Bazzar/Categories') && "bg-yellow-400")} />
                         <div className={cn("w-[1.5px] h-[20px] absolute left-[11px] top-[2px] bg-gray-400 opacity-50", isActive('/Bazzar/Categories') && "bg-yellow-400")} />
                    </div>
                    <div className={getTextClasses(isActive('/Bazzar/Categories'))}>دسته بندی ها</div>
                </Link>

                 {/* Favorites */}
                 <Link href="/Bazzar/Favorites" className={getItemClasses(isActive('/Bazzar/Favorites'))}>
                    <div className="w-6 h-6 relative overflow-hidden">
                        {/* Heart Shape Approximation */}
                         <div className={cn("w-[15px] h-[17px] absolute left-[3px] top-[5px] border-[1.5px] rounded-b-lg rounded-t-md", getIconBorderColor(isActive('/Bazzar/Favorites')))} />
                    </div>
                    <div className={getTextClasses(isActive('/Bazzar/Favorites'))}>علاقه مندی ها</div>
                </Link>

            </div>
            
            {/* iOS Home Indicator Mockup */}
            <div className="w-[148px] h-[5px] bg-[#61656B] rounded-full mt-2 opacity-30" />
        </div>
      </div>
    </div>
  )
}

export default NavBar;

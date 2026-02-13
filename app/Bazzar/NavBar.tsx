"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, LayoutGrid, Heart, ShoppingBag, User } from "lucide-react"

export function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/Bazzar' && pathname === '/Bazzar') return true;
    if (path !== '/Bazzar' && pathname?.startsWith(path)) return true;
    return false;
  };
  
  // Helper for Item Styles
  const getItemClasses = (active: boolean) => cn(
      "w-[20%] flex flex-col justify-center items-center gap-1 cursor-pointer transition-all duration-300",
      active ? "-mt-4 pt-4" : "pt-2 group hover:opacity-80"
  );

  const getTextClasses = (active: boolean) => cn(
      "text-[10px] sm:text-xs font-semibold font-['PeydaWeb'] whitespace-nowrap",
      active ? "text-[#F7C61A]" : "text-[#605F5F]"
  );
  
  const getIconColor = (active: boolean) => active ? "text-[#F7C61A]" : "text-[#605F5F]";
  
  // Hide on ProductDetails
  if (pathname?.startsWith('/Bazzar/ProductDetails')) return null;

  return (
    <div className="w-full fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      <div className="relative w-full max-w-[440px] pointer-events-auto">
        <div 
            className="w-full bg-white shadow-[0px_0px_4px_#E9B443] rounded-t-[20px] flex flex-col justify-center items-center gap-1 pb-2 pt-2"
        >
            <div className="w-full flex justify-between items-center px-4">
                
                {/* Profile */}
                <Link href="/Bazzar/UserProfile" className={getItemClasses(isActive('/Bazzar/UserProfile'))}>
                    <User className={cn("w-6 h-6", getIconColor(isActive('/Bazzar/UserProfile')))} strokeWidth={1.5} />
                    <div className={getTextClasses(isActive('/Bazzar/UserProfile'))}>حساب کاربری</div>
                </Link>

                {/* Cart */}
                <Link href="/Bazzar/DigiKaraCart" className={getItemClasses(isActive('/Bazzar/DigiKaraCart'))}>
                    <ShoppingBag className={cn("w-6 h-6", getIconColor(isActive('/Bazzar/DigiKaraCart')))} strokeWidth={1.5} />
                    <div className={getTextClasses(isActive('/Bazzar/DigiKaraCart'))}>سبد خرید</div>
                </Link>

                {/* Home */}
                <Link href="/Bazzar" className={getItemClasses(isActive('/Bazzar'))}>
                     <Home className={cn("w-6 h-6", getIconColor(isActive('/Bazzar')))} strokeWidth={1.5} />
                    <div className={getTextClasses(isActive('/Bazzar'))}>صفحه اصلی</div>
                </Link>

                {/* Categories */}
                <Link href="/Bazzar/Categories" className={getItemClasses(isActive('/Bazzar/Categories'))}>
                    <LayoutGrid className={cn("w-6 h-6", getIconColor(isActive('/Bazzar/Categories')))} strokeWidth={1.5} />
                    <div className={getTextClasses(isActive('/Bazzar/Categories'))}>دسته بندی ها</div>
                </Link>

                 {/* Favorites */}
                 <Link href="/Bazzar/Favorites" className={getItemClasses(isActive('/Bazzar/Favorites'))}>
                    <Heart className={cn("w-6 h-6", getIconColor(isActive('/Bazzar/Favorites')))} strokeWidth={1.5} />
                    <div className={getTextClasses(isActive('/Bazzar/Favorites'))}>علاقه مندی ها</div>
                </Link>

            </div>
            
            {/* iOS Home Indicator Mockup */}
            <div className="w-[134px] h-[5px] bg-[#61656B] rounded-full mt-2 opacity-30" />
        </div>
      </div>
    </div>
  )
}

export default NavBar;

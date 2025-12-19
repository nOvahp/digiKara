"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, School, FolderKanban, FileText, BookOpen } from "lucide-react"

export function Navigation() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    // Helper for Item Styles
    const getItemClasses = (active: boolean) => cn(
        "w-[20%] flex flex-col justify-center items-center gap-1 cursor-pointer transition-all duration-300",
        active ? "-mt-4 pt-4 border-t-[4px] border-[#F7C61A]" : "pt-2 group hover:opacity-80"
    );

    const getTextClasses = (active: boolean) => cn(
        "text-[10px] sm:text-xs font-semibold font-['PeydaWeb'] whitespace-nowrap",
        active ? "text-[#F7C61A]" : "text-[#605F5F]"
    );

    const getIconColor = (active: boolean) => active ? "text-[#F7C61A]" : "text-[#605F5F]";

    return (
        <div className="w-full fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
            <div className="relative w-full max-w-[440px] pointer-events-auto">
                <div
                    className="w-full bg-white shadow-[0px_0px_4px_#E9B443] rounded-t-[20px] flex flex-col justify-center items-center gap-1 pb-2 pt-2"
                >
                    <div className="w-full flex justify-between items-center px-4">

                        {/* School Profile */}
                        <Link href="/SchoolPanel/SchoolProfile" className={getItemClasses(isActive('/SchoolPanel/SchoolProfile'))}>
                            <School className={cn("w-6 h-6", getIconColor(isActive('/SchoolPanel/SchoolProfile')))} strokeWidth={1.5} />
                            <div className={getTextClasses(isActive('/SchoolPanel/SchoolProfile'))}>پروفایل مدرسه</div>
                        </Link>

                        {/* Report */}
                        <Link href="/SchoolPanel/Reports" className={getItemClasses(isActive('/SchoolPanel/Reports'))}>
                            <FileText className={cn("w-6 h-6", getIconColor(isActive('/SchoolPanel/Reports')))} strokeWidth={1.5} />
                            <div className={getTextClasses(isActive('/SchoolPanel/Reports'))}>گزارش</div>
                        </Link>

                        {/* Home (Main Page) */}
                        <Link href="/SchoolPanel" className={getItemClasses(isActive('/SchoolPanel'))}>
                            <Home className={cn("w-6 h-6", getIconColor(isActive('/SchoolPanel')))} strokeWidth={1.5} />
                            <div className={getTextClasses(isActive('/SchoolPanel'))}>صفحه اصلی</div>
                        </Link>

                        {/* Projects */}
                        <Link href="/SchoolPanel/Projects" className={getItemClasses(pathname.startsWith('/SchoolPanel/Projects') || pathname.startsWith('/SchoolPanel/Timche'))}>
                            <FolderKanban className={cn("w-6 h-6", getIconColor(pathname.startsWith('/SchoolPanel/Projects') || pathname.startsWith('/SchoolPanel/Timche')))} strokeWidth={1.5} />
                            <div className={getTextClasses(pathname.startsWith('/SchoolPanel/Projects') || pathname.startsWith('/SchoolPanel/Timche'))}>پروژه ها</div>
                        </Link>

                        {/* Education */}
                        <Link href="/SchoolPanel/Education" className={getItemClasses(isActive('/SchoolPanel/Education'))}>
                            <BookOpen className={cn("w-6 h-6", getIconColor(isActive('/SchoolPanel/Education')))} strokeWidth={1.5} />
                            <div className={getTextClasses(isActive('/SchoolPanel/Education'))}>آموزش</div>
                        </Link>

                    </div>

                    {/* iOS Home Indicator Mockup */}
                    <div className="w-[134px] h-[5px] bg-[#61656B] rounded-full mt-2 opacity-30" />
                </div>
            </div>
        </div>
    )
}

export default Navigation;

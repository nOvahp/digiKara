"use client"

import * as React from "react"
import Image from "next/image"
import { Store, ShoppingBag, Package } from "lucide-react"
import earningBg from "../../../../public/DashboardEarning.png"
import { cn } from "@/lib/utils"
import { toFarsiNumber } from "@/app/services/common/utils"

export function DashboardOverview({ isApproved }: { isApproved?: boolean }) {
    return (
        <div className="w-full flex flex-col gap-3 mb-6 font-['PeydaWeb']" dir="rtl">

            {/* Header Section */}
            <div className="w-full flex justify-between items-center px-0.5">
                <div className="text-[#222831] text-lg font-semibold leading-relaxed">
                    عملکرد این ماهت عالیه!
                </div>
                <div className="text-[#61656B] text-xs font-medium">
                    10 مهر 1404
                </div>
            </div>

            <div className="w-full flex flex-col gap-3">
                {/* Wallet / Earning Card */}
                <div className="w-full relative bg-transparent rounded-lg overflow-hidden h-auto aspect-[3/1]">
                    <Image
                        src={earningBg}
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Stats Row */}
                <div className="w-full flex gap-3 overflow-x-auto no-scrollbar pb-1">

                    {/* Store Status Card */}
                    <div className="flex-1 bg-white shadow-sm rounded-xl p-3.5 flex flex-col justify-center items-center gap-2.5 min-h-[114px] border border-gray-100/50">
                        <div className="flex flex-col items-center gap-1">
                            <Store className={cn("w-6 h-6 mb-1", isApproved ? "text-[#64B327]" : "text-amber-500")} />
                            <div className={cn("text-[17px] font-bold leading-tight text-center", isApproved ? "text-[#64B327]" : "text-amber-500")}>
                                {isApproved ? "فعال" : "در انتظار تایید"}
                            </div>
                        </div>
                        <div className="text-[#393E46] text-xs font-medium">
                            وضعیت حجره
                        </div>
                    </div>

                    <div className="flex-1 bg-white shadow-sm rounded-xl p-3.5 flex flex-col justify-center items-center gap-2.5 min-h-[114px] border border-gray-100/50">
                        <div className="flex flex-col items-center gap-1">
                            <ShoppingBag className="w-6 h-6 text-[#393E46] mb-1" />
                            <div className="text-[#393E46] text-[20px] font-bold leading-tight text-center">
                                {toFarsiNumber(3)}
                            </div>
                        </div>
                        <div className="text-[#393E46] text-xs font-medium text-center">
                            سفارشات جدید
                        </div>
                    </div>

                    <div className="flex-1 bg-white shadow-sm rounded-xl p-3.5 flex flex-col justify-center items-center gap-2.5 min-h-[114px] border border-gray-100/50">
                        <div className="flex flex-col items-center gap-1">
                            <Package className="w-6 h-6 text-[#393E46] mb-1" />
                            <div className="text-[#393E46] text-[20px] font-bold leading-tight text-center">
                                {toFarsiNumber(23)}
                            </div>
                        </div>
                        <div className="text-[#393E46] text-xs font-medium text-center">
                            محصولات فعال
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

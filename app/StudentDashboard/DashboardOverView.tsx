"use client"

import * as React from "react"
import Image from "next/image"
import earningBg from "../../public/DashboardEarning.png"

export function DashboardOverview() {
  return (
    <div className="w-full flex flex-col gap-3 mb-6" dir="rtl">
      
      {/* Header Section */}
      <div className="w-full flex justify-between items-center">
        <div className="text-[#222831] text-[18px] font-['PeydaFaNum'] font-extrabold leading-[25.20px]">
           عملکرد این ماهت عالیه!
        </div>
        <div className="text-[#61656B] text-[12px] font-['PeydaFaNum'] font-medium">
           10 مهر 1404
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        
        {/* Wallet / Earning Card */}
        {/* Wallet / Earning Card */}
        <div className="w-full relative bg-transparent rounded-lg overflow-hidden h-auto aspect-[3/1]">
             <Image 
                src={earningBg} 
                alt="Background" 
                fill
                className="object-cover"
             />
        </div>

        {/* Stats Row */}
        <div className="w-full flex gap-3">
            
            {/* Card 1: New Orders */}
            <div className="flex-1 bg-white shadow-sm rounded-lg p-3.5 flex flex-col justify-between items-center h-[81px]">
                <div className="flex flex-col items-center gap-1">
                    <div className="text-[#64B327] text-[18px] font-['PeydaFaNum'] font-extrabold leading-[25.2px]">
                        فعال
                    </div>
                </div>
                <div className="text-[#222831] text-[12px] font-['PeydaFaNum'] font-extrabold">
                    وضعیت غرفه
                </div>
            </div>
            <div className="flex-1 bg-white shadow-sm rounded-lg p-3.5 flex flex-col justify-between items-center h-[81px]">
                <div className="flex flex-col items-center gap-1">
                    <div className="text-[#393E46] text-[20px] font-['PeydaFaNum'] font-extrabold leading-7">
                        3
                    </div>
                </div>
                <div className="text-[#222831] text-[12px] font-['PeydaFaNum'] font-extrabold">
                    سفارشات جدید
                </div>
            </div>

            {/* Card 2: Active Products */}
            <div className="flex-1 bg-white shadow-sm rounded-lg p-3.5 flex flex-col justify-between items-center h-[81px]">
               <div className="flex flex-col items-center gap-1">
                    <div className="text-[#393E46] text-[20px] font-['PeydaFaNum'] font-extrabold leading-7">
                        23
                    </div>
                </div>
                <div className="text-[#222831] text-[12px] font-['PeydaFaNum'] font-extrabold">
                    محصولات فعال
                </div>
            </div>

            {/* Card 3: Store Status */}
            

        </div>

      </div>
    </div>
  )
}

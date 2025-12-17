"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TransitionPage() {
    const router = useRouter();

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center relative" dir="rtl">
            
            {/* Header */}
            <div className="w-full max-w-[440px] flex justify-between items-center px-6 py-4 shrink-0">
                 <div className="flex items-center justify-center w-full relative">
                     <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">نتیجه تراکنش</span>
                     <button 
                        onClick={() => router.back()}
                        className="absolute left-0 w-10 h-10 rounded-full border border-[rgba(0,0,0,0.10)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                     >
                         <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
                     </button>
                 </div>
            </div>

            {/* Content Content - Centered */}
            <div className="w-full max-w-[440px] flex flex-col items-center justify-center gap-6 px-6 flex-1 -mt-20">
                
                {/* Image */}
                <div className="w-[126px] h-[126px] relative">
                    {/* Assuming the image is in public/tick-circle.png as requested */}
                    <img 
                        src="/tick-circle.png" 
                        alt="Success" 
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Text */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-[#0C1415] text-[22px] font-['PeydaWeb'] font-semibold">
                        پرداخت موفقیت آمیز بود!
                    </h2>
                    <p className="text-[#707F81] text-sm font-['PeydaWeb'] font-light leading-[22px]">
                        از خرید شما سپاسگزاریم.
                    </p>
                </div>

            </div>

            {/* Bottom Bar - Action Buttons */}
             <div className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-[440px] mx-auto p-6 bg-transparent">
                 <div className="w-full bg-white rounded-2xl shadow-[0px_0px_30px_rgba(0,0,0,0.10)] border border-[rgba(0,0,0,0.10)] p-6 flex flex-col gap-3">
                    
                    {/* Track Order Button */}
                    <button 
                        onClick={() => router.push('/Bazzar/DigiKaraCart/OrderTracking')}
                        className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#e5bc09] transition-colors shadow-sm"
                    >
                        <span className="text-[#1A1C1E] text-[17px] font-['PeydaWeb'] font-semibold">
                            پیگیری سفارش
                        </span>
                    </button>

                    {/* View Receipt Button */}
                     <button 
                        onClick={() => router.push('/Bazzar/DigiKaraCart/Factor')}
                        className="w-full h-[57px] bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
                     >
                        <span className="text-[#1A1C1E] text-[17px] font-['PeydaWeb'] font-semibold">
                            مشاهده رسید خرید
                        </span>
                    </button>

                 </div>
             </div>

        </div>
    );
}

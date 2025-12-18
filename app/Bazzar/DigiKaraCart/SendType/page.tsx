"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Truck, Zap, Package, Clock, Circle } from "lucide-react";

export default function SendTypePage() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<string>("1");

    const options = [
        {
            id: "1",
            type: "اقتصادی",
            price: "750,000 ریال",
            estimate: "تخمین زمان رسیدن 3 مهر 1404", // Hardcoded per design
            icon: <Package className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
        },
        {
            id: "2",
            type: "معمولی",
            price: "1,050,000 ریال",
            estimate: "تخمین زمان رسیدن 2 مهر",
            icon: <Package className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
        },
        {
            id: "3",
            type: "باری",
            price: "1,350,000 ریال",
            estimate: "تخمین زمان رسیدن 31 شهریور",
            icon: <Truck className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
        },
        {
            id: "4",
            type: "فوری",
            price: "1,650,000 ریال",
            estimate: "تخمین زمان رسیدن 29 شهریور",
            icon: <Zap className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
        }
    ];

    // Helper to render estimate with specific font logic if needed, 
    // but for simplicity and matching the string structure:
    const renderEstimate = (text: string) => {
        // Simple string rendering, assuming font handling is sufficient or simpler than complex regex for this specific mockup content.
        // If exact "3" "Mehr" styling differences are CRITICAL, we can split.
        // Design had: <span ...>3</span> <span ...>Mehr</span>
        // Let's keep it simple text for now as it looks clean enough, or use FaNum class for the whole block.
        return <span className="text-[#707F81] text-xs font-['PeydaWeb'] font-light leading-5">{text}</span>;
    };

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center relative" dir="rtl">
            
            {/* Header */}
            <div className="w-full max-w-[440px] flex justify-between items-center px-0 py-4 shrink-0">
                 <div className="flex items-center justify-between w-full relative">
                     <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">نوع ارسال</span>
                     <button 
                        onClick={() => router.back()}
                        className="absolute left-0 w-10 h-10 rounded-full border border-[rgba(0,0,0,0.10)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                     >
                         <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
                     </button>
                 </div>
            </div>

            {/* List Container */}
            <div className="w-full max-w-[440px] flex flex-col gap-0 px-0 pb-24 flex-1 overflow-y-auto no-scrollbar">
                
                <div className="w-full flex flex-col gap-6 py-6">
                    {options.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <div 
                                onClick={() => setSelectedId(item.id)}
                                className="w-full flex items-center justify-between cursor-pointer group"
                            >
                                {/* Right Side: Icon & Info */}
                                <div className="flex-1 flex items-center justify-start gap-3">
                                    <div className="mt-1 shrink-0">
                                         {item.icon}
                                    </div>
                                    <div className="flex flex-col items-start gap-1 text-right">
                                        <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">
                                            {item.type}
                                        </span>
                                        {renderEstimate(item.estimate)}
                                    </div>
                                </div>

                                {/* Left Side: Price & Radio */}
                                <div className="flex items-center gap-3">
                                    <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-semibold">
                                        {item.price}
                                    </span>
                                    <div className="shrink-0">
                                        {selectedId === item.id ? (
                                            <div className="relative">
                                                <Circle className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-[#0C1415] rounded-full" />
                                                </div>
                                            </div>
                                        ) : (
                                            <Circle className="w-6 h-6 text-[#0C1415] opacity-20 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Divider */}
                            {index < options.length - 1 && (
                                <div className="w-full h-px bg-[rgba(0,0,0,0.10)]"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

            </div>

            {/* Bottom Bar */}
             <div className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-[440px] mx-auto p-6 bg-transparent">
                 <div className="w-full rounded-2xl  p-3">
                    <button 
                        onClick={() => router.back()} // Go back to confirm selection
                        className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#e5bc09] transition-colors shadow-sm"
                    >
                        <span className="text-[#1A1C1E] text-[17px] font-['PeydaWeb'] font-semibold">
                            تائیـــــــــــــد
                        </span>
                    </button>
                 </div>
             </div>

        </div>
    );
}

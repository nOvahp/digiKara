"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Plus, Circle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Address {
    id: string;
    label: string;
    address: string;
    city: string; // Extracted from design text for better structure if needed, or just keep full string
}

export default function AddressPage() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<string>("1");

    // Hardcoded data based on design
    const addresses = [
        {
            id: "1",
            label: "خانه",
            address: "تهران، خیابان ولیعصر، کوچه گلها، پلاک 12، واحد 5"
        },
        {
            id: "2",
            label: "دفتر کار",
            address: "اصفهان، خیابان شیخ بهایی، کوچه اردیبهشت، پلاک 7، واحد 2"
        },
        {
            id: "3",
            label: "منزل والدین",
            address: "شیراز، خیابان زند، کوچه نیلوفر، پلاک 3، واحد 1"
        },
        {
            id: "4",
            label: "خانه دوست",
            address: "مشهد، بلوار سجاد، کوچه یاس، پلاک 9، واحد 4"
        }
    ];

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center relative" dir="rtl">
            
            {/* Header */}
            <div className="w-full max-w-[440px] flex justify-between items-center px-0 py-4 shrink-0">
                 <div className="flex items-center justify-between w-full relative">
                     <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">آدرس حمل و نقل</span>
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
                    {addresses.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <div 
                                onClick={() => setSelectedId(item.id)}
                                className="w-full flex items-center justify-between cursor-pointer group"
                            >
                                {/* Content */}
                                <div className="flex-1 flex justify-start gap-3">
                                    <div className="mt-1 shrink-0">
                                         <MapPin className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex flex-col items-start gap-1 text-right">
                                        <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">
                                            {item.label}
                                        </span>
                                        <span className="text-[#707F81] text-xs font-['PeydaWeb'] font-light leading-5">
                                            {item.address}
                                        </span>
                                    </div>
                                </div>

                                {/* Radio Icon */}
                                <div className="mr-4 shrink-0">
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
                            
                            {/* Divider (except last item) */}
                            {index < addresses.length - 1 && (
                                <div className="w-full h-px bg-[rgba(0,0,0,0.10)]"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Add New Address Button */}
                <button className="w-full h-[57px] rounded-xl border border-[rgba(0,0,0,0.10)] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors mt-4">
                    <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] font-medium">
                        افزودن آدرس جدید
                    </span>
                    <div className="w-6 h-6 bg-transparent border-2 border-[#0C1415] rounded-md flex items-center justify-center p-0.5">
                        <Plus className="w-4 h-4 text-[#0C1415]" strokeWidth={2.5} />
                    </div>
                </button>

            </div>

            {/* Bottom Bar */}
             <div className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-[440px] mx-auto p-6 bg-transparent">
                 <div className="w-full  rounded-2xl  p-3">
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

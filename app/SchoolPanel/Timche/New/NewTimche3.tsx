"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
    ChevronLeft,
    Check,
    Plus,
    User,
    Wallet,
    ShoppingBag,
    Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const NewTimche3 = () => {
    const router = useRouter();
    
    // Hardcoded step 3 for this "page"
    const step = 3;

    const steps = [
        { id: 1, title: "اطلاعات پایه" },
        { id: 2, title: "پروژه‌ها" },
        { id: 3, title: "اعضا" },
        { id: 4, title: "معیارها" },
    ];

    const members = [
        { id: 1, name: "علی رضایی", role: "مسئول تیمچه", type: "manager", color: "bg-[#0A33FF]" },
        { id: 2, name: "امیرحسین محمدی", role: "هنرجو", type: "student", color: "bg-[#F8CB2E]" },
        { id: 3, name: "بهروز حسینی", role: "هنرجو", type: "student", color: "bg-[#F8CB2E]" },
    ];

    return (
        <div className="w-full min-h-screen flex flex-col items-center pb-10" dir="rtl">
            
            {/* Header */}
            <div className="w-full max-w-[440px] pt-4 flex flex-col gap-5">
                <div className="w-full px-4 flex justify-between items-center">
                    <h1 className="text-center text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
                        افزودن تیمچه
                    </h1>
                     <div onClick={() => router.back()} className="w-10 h-10 bg-white rounded-full border border-[rgba(8,11,17,0.10)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Stepper */}
                <div className="w-full px-0 py-5 border-b border-[#DFE1E7] flex justify-between items-center overflow-x-auto no-scrollbar gap-4">
                    {steps.map((s) => (
                        <div key={s.id} className={cn("flex items-center gap-2.5", step !== s.id && "opacity-50")}>
                            <span className={cn(
                                "text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide whitespace-nowrap",
                                step === s.id ? "text-[#0D0D12]" : "text-[#818898]"
                            )}>
                                {s.title}
                            </span>
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center shadow-sm",
                                step === s.id ? "bg-[#FDD00A]" : "bg-[#DFE1E7]"
                            )}>
                                 <span className="text-white text-sm font-num-bold font-bold leading-[21px]">{s.id}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step 3 Content: Members */}
            <div className="w-full max-w-[440px] px-0 py-6 flex flex-col gap-6">
                
                {/* Add Member Button */}
                <div className="w-full h-[57px] rounded-xl border border-dashed border-[#DFE1E7] flex items-center justify-center gap-2.5 cursor-pointer hover:bg-gray-50">
                    <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold leading-6">افزودن افراد یا حجره</span>
                   <div className="w-6 h-6 border-2 border-[#1A1C1E] rounded-full flex items-center justify-center">
                        <Plus className="w-4 h-4 text-[#1A1C1E]" strokeWidth={2.5} />
                    </div>
                </div>

                {/* Members List */}
                <div className="flex flex-col gap-2">
                    {members.map((member) => (
                        <div key={member.id} className="w-full h-[61px] p-2 pr-[14px] bg-white rounded-xl border border-[#DCE4E8] flex items-center justify-between">
                            
                            {/* Left Side: Avatar */}
                            <div className="flex items-center gap-3">
                            <div className={cn("w-[46px] h-[46px] rounded-lg flex items-center justify-center relative overflow-hidden", member.color)}>
                                   {/* Simplified Avatar Icon Logic */}
                                 {member.type === 'manager' ? (
                                         <Shield className="text-white w-6 h-6" /> // Placeholder for manager icon
                                 ) : (
                                         <User className="text-[#0D0D12] w-6 h-6" /> // Placeholder for student icon
                                 )}
                                </div>
                            </div>

                            {/* Right Side: Info */}
                            <div className="flex items-center gap-3 flex-1 justify-end">
                                <div className="flex flex-col items-end gap-1">
                                <span className="text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold leading-[21px]">
                                    {member.name}
                                </span>
                                    <span className="text-center text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold">
                                    {member.role}
                                </span>
                            </div>
                                <div className="w-8 h-8 bg-white rounded-lg border border-[#DFE1E7] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] flex items-center justify-center">
                                    <User className="w-4 h-4 text-[#818898]" />
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Access Matrix Section */}
                <div className="w-full flex flex-col gap-3 pt-3">
                    <div className="w-full flex justify-between items-center">
                         <span className="text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold">ویرایش</span>
                         <span className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold leading-[21.6px]">ماتریس دسترسی</span>
                    </div>

                    <div className="w-full bg-white rounded-xl border border-[#DFE1E7] overflow-hidden shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)]">
                        {/* Header Row */}
                        <div className="w-full h-10 bg-[#F6F8FA] border-b border-[#DFE1E7] flex">
                             <div className="flex-1 flex items-center justify-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold">محتوا</div>
                             <div className="flex-1 flex items-center justify-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold">قیمت</div>
                             <div className="flex-1 flex items-center justify-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold">سفارش</div>
                             <div className="w-[97px] flex items-center justify-end px-3 text-[#666D80] text-sm font-['PeydaWeb'] font-semibold">نقش</div>
                        </div>

                        {/* Manager Row */}
                        <div className="w-full h-16 border-b border-[#DFE1E7] flex">
                             <div className="flex-1 flex items-center justify-center border-l-[1px] border-[#DFE1E7] border-opacity-50">
                                <div className="w-5 h-5 relative">
                                    <div className="absolute inset-0 border-[1.25px] border-[#0A0A0A] rounded-[5px]" />
                                    <Check className="w-4 h-4 text-[#0A0A0A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />
                                </div>
                             </div>
                             <div className="flex-1 flex items-center justify-center border-l-[1px] border-[#DFE1E7] border-opacity-50">
                                <div className="w-5 h-5 relative">
                                    <div className="absolute inset-0 border-[1.25px] border-[#0A0A0A] rounded-[5px]" />
                                    <Check className="w-4 h-4 text-[#0A0A0A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />
                                </div>
                             </div>
                             <div className="flex-1 flex items-center justify-center">
                                <div className="w-5 h-5 relative">
                                    <div className="absolute inset-0 border-[1.25px] border-[#0A0A0A] rounded-[5px]" />
                                    <Check className="w-4 h-4 text-[#0A0A0A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />
                                </div>
                             </div>
                             <div className="w-[97px] flex items-center justify-end px-3 text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">
                                 مسئول
                             </div>
                        </div>

                         {/* Student Row */}
                         <div className="w-full h-16 flex">
                             <div className="flex-1 flex items-center justify-center text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold border-l-[1px] border-[#DFE1E7] border-opacity-50">-</div>
                             <div className="flex-1 flex items-center justify-center text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold border-l-[1px] border-[#DFE1E7] border-opacity-50">-</div>
                             <div className="flex-1 flex items-center justify-center">
                                <div className="w-5 h-5 relative">
                                    <div className="absolute inset-0 border-[1.25px] border-[#0A0A0A] rounded-[5px]" />
                                    <Check className="w-4 h-4 text-[#0A0A0A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />
                                </div>
                             </div>
                             <div className="w-[97px] flex items-center justify-end px-3 text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">
                                 هنرجو
                             </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer Buttons */}
             <div className="fixed bottom-0 w-full max-w-[440px] p-4 bg-white/80 backdrop-blur-sm border-t border-[#F0F0F0] mb-25 z-10">
                <div className="w-full flex gap-3.5">
                    <div 
                         onClick={() => {
                             router.push('/SchoolPanel/Timche/New/Step4');
                         }}
                        className="w-[279px] h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#e5c109] transition-colors shadow-sm"
                    >
                        <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold">ادامه</span>
                    </div>
                     <div 
                        onClick={() => router.back()}
                        className="flex-1 h-[57px] rounded-xl border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                         <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold">قبلی</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NewTimche3;

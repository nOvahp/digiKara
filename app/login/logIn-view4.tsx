"use client";

import React, { useState } from "react";
import { ArrowLeft, User, GraduationCap, School, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccountTypeSelection() {
  const [selectedType, setSelectedType] = useState<string | null>("student"); // Default to first option
  const router = useRouter();

  const accountTypes = [
    {
      id: "student",
      title: "هنرجو",
      subtitle: "هنرستانی های سراسر ایران",
      icon: <User className="w-8 h-8 text-[#393E46]" strokeWidth={1.5} />,
    },
    {
      id: "teacher",
      title: "هنرآموز",
      subtitle: "هنرآموزان و کادر آموزشی هنرستان ها",
      icon: <GraduationCap className="w-8 h-8 text-[#393E46]" strokeWidth={1.5} />,
    },
    {
      id: "manager",
      title: "مدیر مدرسه",
      subtitle: "مدیران هنرستان ها و کاربران ارشد",
      icon: <School className="w-8 h-8 text-[#393E46]" strokeWidth={1.5} />,
    },
    {
      id: "supervisor",
      title: "نهاد ناظر",
      subtitle: "نهاد های نظارتی و حمایتی",
      icon: <Building2 className="w-8 h-8 text-[#393E46]" strokeWidth={1.5} />,
    },
  ];

  const handleSelect = () => {
    console.log("Selected Account Type:", selectedType);
    // router.push("/next-step"); 
  };

  return (
    <div className="w-full min-h-screen bg-white relative flex flex-col items-center overflow-hidden" dir="rtl">
      
      {/* Yellow Gradient Header Background */}
      <div className="absolute top-0 left-0 w-full h-[225px] bg-gradient-to-b from-[#F7C309] to-white z-0 pointer-events-none" />

      {/* Header Content */}
      <div className="w-full max-w-[440px] px-6 pt-8 z-10 flex justify-between items-center">
         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
             {/* Back Button Placeholder if needed */}
             {/* <ArrowLeft className="w-6 h-6 text-[#393E46]" /> */}
         </div>
         <span className="text-[#393E46] text-lg font-['PeydaWeb'] font-black">دیجی کارا</span>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[440px] px-6 mt-12 z-10 flex flex-col gap-8 flex-1 pb-24">
        
        {/* Title Section */}
        <div className="flex flex-col gap-4 text-right">
            <h1 className="text-[#393E46] text-4xl font-['PeydaWeb'] font-black leading-tight">
                نوع حساب کاربری
            </h1>
            <p className="text-[#393E46] text-sm font-['PeydaWeb'] font-semibold">
                نوع حساب کاربری خود را انتخاب کنید.
            </p>
        </div>

        {/* Account Types List */}
        <div className="flex flex-col gap-6 mt-4">
            {accountTypes.map((type) => (
                <div 
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className="flex justify-between items-center cursor-pointer group"
                >
                    {/* Left: Radio & Text */}
                    <div className="flex items-center gap-4 flex-1">
                        
                        {/* Radio Button */}
                        <div className="relative w-6 h-6 flex items-center justify-center">
                            <div className={`w-6 h-6 rounded-full border-[1.5px] transition-colors ${selectedType === type.id ? 'border-[#0C1415]' : 'border-[#D1D1D6]'}`}></div>
                            {selectedType === type.id && (
                                <div className="absolute w-3 h-3 bg-[#0C1415] rounded-full"></div>
                            )}
                        </div>

                        {/* Text */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[#393E46] text-base font-['PeydaWeb'] font-black">{type.title}</span>
                            <span className="text-[#393E46] text-sm font-['PeydaWeb'] font-semibold">{type.subtitle}</span>
                        </div>
                    </div>

                    {/* Right: Avatar/Icon */}
                    <div className="w-[52px] h-[52px] rounded-full border border-black/10 bg-white flex items-center justify-center shrink-0">
                        {type.icon}
                    </div>

                </div>
            ))}
        </div>

      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[440px] mx-auto p-6 bg-transparent z-50">
           <button 
                onClick={handleSelect}
                className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-colors text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold shadow-sm"
            >
                انتخاب
            </button>
      </div>

    </div>
  );
}

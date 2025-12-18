"use client";

import React, { useState } from "react";
import { User, GraduationCap, School, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginHeader } from "./login-header";
import headerImg from "../../public/OtpHeader.png";

interface LoginViewProps {
  onNext?: () => void;
}

export function LoginView4({ onNext }: LoginViewProps) {
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
      id: "customer",
      title: "مشتری",
      subtitle: "ورود به بازارچه و خرید محصولات",
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
    
    if (selectedType === "student") {
        router.push("/StudentDashboard");
    } else if (selectedType === "manager") {
        router.push("/SchoolPanel");
    } else if (selectedType === "customer") {
        router.push("/Bazzar");
    } else if (selectedType === "supervisor") {
        alert("در دست ساخت");
    }

    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="w-full h-full   flex flex-col items-center " dir="rtl">
      
      <LoginHeader imageSrc={headerImg} imageClassName="!object-cover" />
      {/* Header Content */}
      <div className="absolute top-0 left-0 right-0 mx-auto w-full max-w-[440px] px-10 pt-15 z-10 flex flex-col gap-8">
         <div className="w-full flex justify-between items-center">
            <span className="text-[#393E46] text-lg font-['PeydaWeb'] font-black">دیجی کارا</span>
         </div>
         
         {/* Title Section */}
         <div className="flex flex-col gap-4 text-right">
            <h1 className="text-[#393E46] text-4xl font-['PeydaWeb'] font-black leading-tight">
                نوع حساب کاربری
            </h1>
            <p className="text-[#393E46] text-sm font-['PeydaWeb'] font-semibold">
                نوع حساب کاربری خود را انتخاب کنید.
            </p>
         </div>
      </div>
      {/* Main Content */}
      <div className="w-full  px-0 mt-12 z-10 flex flex-col gap-8 flex-1 pb-24">
        
        {/* Title Section */}


        {/* Account Types List */}
        <div className="flex flex-col gap-6 mt-4">
            {accountTypes.map((type) => (
                <div 
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className="flex justify-between items-center cursor-pointer group"
                >
                    {/* Right: Icon & Text */}
                    <div className="flex items-center gap-4">
                        <div className="w-[52px] h-[52px] rounded-full border border-black/10 bg-white flex items-center justify-center shrink-0">
                            {type.icon}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[#393E46] text-base font-['PeydaWeb'] font-black">{type.title}</span>
                            <span className="text-[#393E46] text-sm font-['PeydaWeb'] font-semibold">{type.subtitle}</span>
                        </div>
                    </div>

                    {/* Left: Radio */}
                    <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                        <div className={`w-6 h-6 rounded-full border-[1.5px] transition-colors ${selectedType === type.id ? 'border-[#0C1415]' : 'border-[#D1D1D6]'}`}></div>
                        {selectedType === type.id && (
                            <div className="absolute w-3 h-3 bg-[#0C1415] rounded-full"></div>
                        )}
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

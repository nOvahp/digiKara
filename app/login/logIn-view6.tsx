"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import headerImg from "../../public/OtpHeader.png";
// import Image from "next/image";
import { LoginHeader } from "./login-header";
import {
  BookOpen,
  Package,
  ShoppingCart,
  Code2,
  Zap,
  Palette,
  Music,
} from "lucide-react";

interface LoginViewProps {
  onNext?: () => void;
}

export function LoginView6({ onNext }: LoginViewProps) {
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchInterests = async () => {
      // Dynamic import to avoid circular dependency issues if any, or just direct import
      const { authService } = await import("@/app/services/authService");
      const result = await authService.getInterests();
      if (result.success && result.data) {
        setInterests(result.data);
      }
      setIsLoading(false);
    };
    fetchInterests();
  }, []);

  const toggleInterest = (id: number) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleContinue = () => {
    if (selectedInterests.length >= 2) {
      console.log("Selected Interests:", selectedInterests);
      if (onNext) {
        onNext();
      }
    }
  };

  const isValid = selectedInterests.length >= 2;

  return (
    <div className="flex h-full w-full flex-col bg-[#F8FAFC]">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Text */}
      <div className="absolute top-[100px] left-0 right-0 px-8 z-10 text-right">
        <h1 className="text-3xl font-black text-[#393E46] mb-2">علاقه مندی ها</h1>
        <p className="text-[#393E46] text-sm font-bold opacity-80 leading-relaxed">
           برای پیشنهاد محتوای بهتر، حداقل 2 مورد را انتخاب کنید
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-6 w-full max-w-[440px] mx-auto -mt-20 z-20 pb-28"> 
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 p-6 sm:p-8 animate-in slide-in-from-bottom-5 fade-in duration-500 relative pt-8">
            
             {/* Interests Grid */}
            <div className="flex flex-col gap-3">
            {isLoading ? (
                <div className="text-center text-gray-400 py-10">درحال بارگذاری...</div>
            ) : (
                interests.map((interest) => {
                    const isSelected = selectedInterests.includes(interest.id);

                    return (
                    <div
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-200 border-2 ${
                        isSelected
                            ? "border-[#FDD00A] bg-[#FFFBEB]"
                            : "border-transparent bg-[#F9FAFB] hover:bg-[#F3F4F6]"
                        }`}
                    >
                        <div className="flex items-center gap-4">
                        {/* Checkbox Visual */}
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            isSelected ? "bg-[#FDD00A] border-[#FDD00A]" : "border-[#D1D5DB] bg-white"
                            }`}>
                            {isSelected && <div className="w-2.5 h-1.5 border-b-2 border-l-2 border-black -rotate-45 mb-0.5" />}
                        </div>

                        <div className="flex-1 text-right">
                            <p className="text-[#393E46] text-sm font-bold">
                            {interest.title}
                            </p>
                            <p className="text-[#9CA3AF] text-xs mt-0.5">
                            {interest.sub_title}
                            </p>
                        </div>

                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm overflow-hidden bg-gray-100`}>
                            {interest.icon ? (
                                <img src={interest.icon} alt={interest.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-blue-400" />
                            )}
                        </div>
                        </div>
                    </div>
                    );
                })
            )}
            </div>

            <div className={`mt-6 text-center text-xs font-medium transition-colors ${
                selectedInterests.length < 2 ? "text-red-500" : "text-green-600"
            }`}>
                {selectedInterests.length} مورد انتخاب شده
                {selectedInterests.length < 2 && " (حداقل 2 مورد)"}
            </div>
        </div>
      </div>

       {/* Fixed Bottom Button */}
       <div className="fixed bottom-0 left-0 right-0 w-full max-w-[440px] mx-auto p-6 bg-transparent z-50">
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full h-[57px] rounded-2xl flex items-center justify-center gap-2 transition-all text-lg font-bold shadow-lg ${
            isValid
              ? "bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] shadow-[#FDD00A]/20 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          }`}
        >
          ادامه
        </button>
      </div>
    </div>
  );
}

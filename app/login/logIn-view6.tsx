"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft,
  Wrench,
  Package,
  Tag,
  Cpu,
  Palette,
  Check
} from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";

interface LoginViewProps {
  onNext?: () => void;
  onBack?: () => void;
}

// Visual configurations for interests (cycling styles)
const INTEREST_STYLES = [
  { // Skill Training
    bg: "bg-[#E4F9F5]",
    iconColor: "text-[#11999E]",
    Icon: Wrench,
    borderColor: "#E4F9F5"
  },
  { // Product Production
    bg: "bg-[#E0F7FA]",
    iconColor: "text-[#00BCD4]", 
    Icon: Package,
    borderColor: "#E0F7FA"
  },
  { // Sales
    bg: "bg-[#E0F2F1]", 
    iconColor: "text-[#009688]",
    Icon: Tag,
    borderColor: "#E0F2F1" 
  },
  { // Digital/AI
    bg: "bg-[#ECEFF1]",
    iconColor: "text-[#546E7A]",
    Icon: Cpu,
    borderColor: "#ECEFF1"
  },
  { // Art
    bg: "bg-[#F3E5F5]",
    iconColor: "text-[#8E24AA]",
    Icon: Palette,
    borderColor: "#F3E5F5"
  }
];

export function LoginView6({ onNext, onBack }: LoginViewProps) {
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const { studentService } = await import("@/app/services/student/studentService");
        const result = await studentService.getInterests();
        if (result.success && result.data) {
          setInterests(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch interests", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterests();
  }, []);

  const toggleInterest = (id: number) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleContinue = async () => {
    if (selectedInterests.length >= 2) {
      try {
        const { studentService } = await import("@/app/services/student/studentService");
        const result = await studentService.addFavorites(selectedInterests);
        if (result.success && onNext) {
          onNext();
        }
      } catch (error) {
         console.error("Failed to save interests", error);
      }
    }
  };

  const isValid = selectedInterests.length >= 2;

  return (
    <div className="flex h-full w-full flex-col bg-white relative overflow-hidden">
        
      {/* Top Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[230px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />

      {/* Header Content */}
      <div className="relative z-10 w-full px-6 pt-6 pb-2">
         {/* Top Bar */}
         <div className="flex justify-between items-center mb-8">
            {/* Back Button */}
            {onBack && (
              <button 
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 transition-all text-[#393E46]"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <span className="text-[#393E46] text-xl font-black">دیجی کارا</span>
         </div>

         {/* Title Section */}
         <div className="text-right space-y-2 mb-8">
            <h1 className="text-[#393E46] text-3xl font-black">علاقه مندی ها</h1>
            <p className="text-[#393E46] text-sm font-semibold opacity-90">
               حداقل دو مورد از حوزه های علاقه مندی خود را انتخاب کنید.
            </p>
         </div>
      </div>

      {/* Main Content List */}
      <div className="relative z-10 flex-1 w-full max-w-[440px] mx-auto overflow-y-auto px-6 pb-32 no-scrollbar"> 
         <div className="flex flex-col gap-0">
            {isLoading ? (
                 <div className="flex justify-center items-center py-20">
                    <span className="text-gray-400 text-sm">درحال بارگذاری...</span>
                 </div>
            ) : (
                interests.map((interest, index) => {
                    const isSelected = selectedInterests.includes(interest.id);
                    const style = INTEREST_STYLES[index % INTEREST_STYLES.length];
                    const Icon = style.Icon;

                    return (
                       <React.Fragment key={interest.id}>
                           <div 
                             onClick={() => toggleInterest(interest.id)}
                             className="group flex items-center justify-between py-5 cursor-pointer hover:bg-gray-50/50 rounded-xl transition-colors px-2"
                           >
                                {/* Checkbox (Left side) */}
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                                    isSelected 
                                    ? "bg-[#707F81] border-[#707F81]" 
                                    : "border-[#707F81] bg-transparent group-hover:border-gray-500"
                                }`}>
                                    {isSelected && <Check className="w-4 h-4 text-white" />}
                                </div>

                                {/* Content (Right side) */}
                                <div className="flex items-start gap-4 flex-1 justify-end">
                                    <div className="flex flex-col items-end gap-1 text-right">
                                        <span className="text-[#0C1415] text-base font-bold">
                                            {interest.title}
                                        </span>
                                        <span className="text-[#707F81] text-xs font-light max-w-[200px] leading-relaxed">
                                            {interest.sub_title}
                                        </span>
                                    </div>
                                    
                                    {/* Icon Box */}
                                    <div className={`w-[43px] h-[43px] rounded-2xl flex items-center justify-center shrink-0 ${style.bg}`}>
                                        <Icon className={`w-5 h-5 ${style.iconColor} stroke-[1.5]`} />
                                    </div>
                                </div>
                           </div>
                           
                           {/* Divider */}
                           {index < interests.length - 1 && (
                               <div className="h-[1px] w-full bg-gray-100" />
                           )}
                       </React.Fragment>
                    );
                })
            )}
         </div>
      </div>

       {/* Fixed Bottom Button */}
       <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm z-50 w-full max-w-[440px] mx-auto border-t border-gray-100/50">
        <Button
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full h-[57px] rounded-2xl text-lg font-bold shadow-lg transition-all ${
            isValid
              ? "bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] shadow-[#FDD00A]/20"
              : "bg-gray-100 text-gray-400 shadow-none hover:bg-gray-100"
          }`}
        >
          ادامه
        </Button>
      </div>
    </div>
  );
}

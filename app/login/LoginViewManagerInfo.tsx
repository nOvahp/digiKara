"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { 
  User, 
  CreditCard, 
  MapPin, 
  School, 
  AlertCircle,
  ChevronLeft,
  Phone,
  Map
} from "lucide-react";

interface LoginViewProps {
  onNext?: () => void;
  onReport?: () => void;
  onBack?: () => void;
}

// Reusable Info Field Component
const InfoField = ({ label, value, icon: Icon }: { label: string, value?: string, icon: any }) => (
  <div className="w-full">
    {/* Label with line connector (visual style from design) */}
    <div className="flex justify-end items-center mb-[-12px] pr-4 relative z-10">
      <span className="bg-white px-2 text-[#ACB5BB] text-xs font-bold font-peyda">{label}</span>
    </div>
    
    {/* Value Container */}
    <div className="w-full h-14 border border-[#DCE4E8] rounded-full flex items-center justify-between px-5 bg-white relative">
      {/* Icon */}
      <Icon className="w-5 h-5 text-[#DCE4E8] stroke-[1.5]" />
      
      {/* Value */}
      <span className="text-[#393E46] text-sm font-bold truncate flex-1 text-right" dir="auto">
        {value || "---"}
      </span>
    </div>
  </div>
);

export function LoginViewManagerInfo({ onNext, onReport, onBack }: LoginViewProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const handleContinue = async () => {
    try {
        const { managerService } = await import("@/app/services/managerService");
        await managerService.confirmInfo();
    } catch (e) {
        console.warn("Silent confirmation failed", e);
    }

    if (onNext) {
      onNext();
    }
  };

  const handleReport = () => {
    if (onReport) {
      onReport();
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[#393E46] text-lg font-bold">لطفا ابتدا وارد شوید</p>
          <Button onClick={() => onBack?.()} variant="outline">بازگشت</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-white relative overflow-hidden">
      
      {/* Top Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[230px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />

      {/* Header Content */}
      <div className="relative z-10 w-full px-6 pt-6 pb-2">
         {/* Top Bar */}
         <div className="flex justify-between items-center mb-12">
            
            {/* Back Button */}
            {onBack && (
              <button 
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 transition-all text-[#393E46]"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Logo Text */}
            <span className="text-[#393E46] text-xl font-black">دیجی کارا</span>
         </div>

         {/* Title Section */}
         <div className="text-right space-y-2 mb-8">
            <h1 className="text-[#393E46] text-3xl font-black">تایید اطلاعات مدیر</h1>
            <p className="text-[#393E46] text-sm font-semibold opacity-90">
                اطلاعات خود را بررسی کنید و در صورت صحت تایید کنید.
            </p>
         </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="relative z-10 flex-1 w-full max-w-[440px] mx-auto overflow-y-auto px-6 pb-32 no-scrollbar">
          <div className="space-y-6 pt-2">
              <InfoField 
                label="نام کامل" 
                value={`${user.firstname} ${user.lastname}`} 
                icon={User} 
              />
              
              <InfoField 
                label="شماره موبایل" 
                value={user.phone} 
                icon={Phone} 
              />

              <InfoField 
                label="کدملی" 
                value={user.national_code} 
                icon={CreditCard} 
              />
              
              <InfoField 
                label="استان - شهر" 
                value={`${user.province || ''} - ${user.city || ''}`} 
                icon={MapPin} 
              />

              <InfoField 
                label="منطقه" 
                value={user.district} 
                icon={Map} 
              />
              
              <InfoField 
                label="مدرسه" 
                value={user.school} 
                icon={School} 
              />
          </div>
      </div>

      {/* Bottom Buttons - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm z-50 w-full max-w-[440px] mx-auto border-t border-gray-100/50">
         <div className="flex gap-4 w-full">
            {/* Report Button (Secondary) */}
            <Button
                onClick={handleReport}
                variant="outline"
                className="flex-[0.4] bg-white border-[#DCE4E8] text-[#98B0BC] font-bold h-14 rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-200"
            >
                گزارش خطا
            </Button>

            {/* Confirm Button (Primary) */}
            <Button
                onClick={handleContinue}
                className="flex-1 bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold h-14 rounded-2xl text-lg shadow-lg shadow-[#FDD00A]/20"
            >
                تایید اطلاعات
            </Button>
         </div>
      </div>

    </div>
  );
}

'use client';

import React from 'react';
import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import {
  User,
  CreditCard,
  MapPin,
  School,
  GraduationCap,
  ChevronLeft,
  Phone,
  Map,
} from 'lucide-react';

interface LoginViewProps {
  onNext?: () => void;
  onReport?: () => void;
  onBack?: () => void;
}

// Reusable Info Field Component
const InfoField = ({ label, value, icon: Icon, isNum = false }: { label: string; value?: string; icon: React.ComponentType<{ className?: string }>; isNum?: boolean }) => (
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
      <span className={`text-[#393E46] text-sm truncate flex-1 text-right ${isNum ? 'font-num-medium' : 'font-bold'}`} dir="auto">
        {value || '---'}
      </span>
    </div>
  </div>
);

export function LoginView5({ onNext, onReport, onBack }: LoginViewProps) {
  const { user, isAuthenticated } = useAuth();
  const [showConfirmPopup, setShowConfirmPopup] = React.useState(false);

  const handleContinue = async () => {
    try {
      const { authService } = await import('@/app/services/authService');
      await authService.confirmInfo();
    } catch (e) {
      console.warn('Silent confirmation failed', e);
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
          <Button onClick={() => onBack?.()} variant="outline">
            بازگشت
          </Button>
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
          <h1 className="text-[#393E46] text-3xl font-black">اطلاعاتت درسته؟ </h1>
          <p className="text-[#393E46] text-sm font-semibold opacity-90">
          یه نگاه به اطلاعات زیر بنداز؛ اگه همه‌چیز مرتبه، تاییدش کن تا بریم برای شروع کار
          </p>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="relative z-10 flex-1 w-full max-w-[440px] mx-auto overflow-y-auto px-6 pb-32 no-scrollbar">
        <div className="space-y-6 pt-2">
          <InfoField label="نام و نام خانوادگی" value={`${user.firstname} ${user.lastname}`} icon={User} />

          <InfoField label="شماره موبایل" value={user.phone} icon={Phone} isNum />

          <InfoField label="کد ملی" value={user.national_code} icon={CreditCard} isNum />

          <InfoField
            label="استان و شهر"
            value={`${user.province || ''} - ${user.city || ''}`}
            icon={MapPin}
          />

          <InfoField label="منطقه تحصیلی" value={user.district} icon={Map} isNum />

          <InfoField label="نام مدرسه / هنرستان" value={user.school} icon={School} isNum />

          <InfoField
            label="پایه و رشته تحصیلی"
            value={`${user.grade}${user.field ? ` - ${user.field}` : ''}`}
            icon={GraduationCap}
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
            !اطلاعاتم اشتباهه
          </Button>

          {/* Confirm Button (Primary) */}
          <Button
            onClick={() => setShowConfirmPopup(true)}
            className="flex-1 bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold h-14 rounded-2xl text-lg shadow-lg shadow-[#FDD00A]/20"
          >
            بله، همه‌چیز درسته 
          </Button>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm p-0" dir="rtl">
          <div className="w-full max-w-[440px] bg-white rounded-t-3xl p-6 pb-10 flex flex-col gap-5 animate-in slide-in-from-bottom-4 duration-300">
            {/* Icon */}
            <div className="w-14 h-14 bg-[#FFFBEB] rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-2xl">✔️</span>
            </div>
            {/* Text */}
            <div className="text-center space-y-2">
              <h2 className="text-[#1A1C1E] text-xl font-black">همه‌چیز مرتبه؟ </h2>
              <p className="text-[#6C7278] text-sm font-medium leading-relaxed">
                اطلاعاتت تو سیستم ثبت میشه. خیالت راحت، بعداً هم می‌تونی از بخش پروفایلت ویرایششون کنی.
              </p>
            </div>
            {/* Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={() => { setShowConfirmPopup(false); handleContinue(); }}
                className="w-full h-14 bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold rounded-2xl text-base shadow-lg shadow-[#FDD00A]/20"
              >
                بله، ثبت بشه 
              </Button>
              <Button
                onClick={() => setShowConfirmPopup(false)}
                variant="outline"
                className="w-full h-12 bg-white border-2 border-[#E5E7EB] text-[#6C7278] font-bold rounded-2xl hover:bg-gray-50"
              >
                می‌خوام یه نگاه دیگه بندازم
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  FileText,
  Calendar,
  LogOut,
  CheckCircle2,
  ChevronLeft,
  MapPin,
  School,
  GraduationCap,
  BadgeCheck,
} from 'lucide-react';
import { bazzarService } from '@/app/services/bazzarService';
import { cn } from '@/lib/utils';
import { useAuth } from '@/app/providers/AuthProvider';

export default function UserProfilePage() {
  const router = useRouter();
  const { logoutCustomer } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Simulate slight delay for skeleton demo if needed, but for production just fetch
        const response = await bazzarService.getUserProfile();
        if (response && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ----------------------------------------------------------------------
  // Loading State (Skeleton)
  // ----------------------------------------------------------------------
  if (loading) {
    return (
      <div
        className="w-full h-[100dvh] bg-gray-50/50 flex flex-col items-center relative overflow-hidden"
        dir="rtl"
      >
        {/* Header Skeleton */}
        <div className="w-full max-w-[440px] flex justify-between items-center px-4 py-4 shrink-0 bg-white border-b border-gray-100">
          <div className="w-24 h-6 bg-gray-100 rounded-lg animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse"></div>
        </div>

        <div className="w-full max-w-[440px] flex-1 p-6 flex flex-col gap-6 overflow-hidden">
          {/* Profile Card Skeleton */}
          <div className="w-full flex flex-col items-center gap-4 py-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-40 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-32 h-4 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
          </div>
          {/* Rows Skeleton */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-4"
            >
              <div className="w-32 h-5 bg-gray-100 rounded-md animate-pulse mb-2"></div>
              <div className="w-full h-10 bg-gray-50 rounded-xl animate-pulse"></div>
              <div className="w-full h-10 bg-gray-50 rounded-xl animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // Error State
  // ----------------------------------------------------------------------
  if (!user) {
    return (
      <div
        className="w-full h-[100dvh] bg-white flex flex-col items-center justify-center gap-6 relative"
        dir="rtl"
      >
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center animate-bounce">
          <User className="w-10 h-10 text-red-400" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-[#0C1415] text-lg font-['PeydaWeb'] font-bold">
            خطا در دریافت اطلاعات
          </h3>
          <p className="text-[#707F81] text-sm font-['PeydaWeb']">
            متاسفانه مشکلی در بارگذاری پروفایل پیش آمده است.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-[#FDD00A] text-[#1A1C1E] rounded-xl text-sm font-['PeydaWeb'] font-semibold shadow-md active:scale-95 transition-all"
        >
          تلاش مجدد
        </button>

        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50"
        >
          <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // Components
  // ----------------------------------------------------------------------

  const InfoRow = ({ icon: Icon, label, value, isNum = false }: any) => (
    <div className="group w-full flex items-center justify-between py-3 px-2 rounded-xl hover:bg-gray-50/80 transition-colors duration-200 cursor-default">
      <div className="flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:shadow-sm flex items-center justify-center text-gray-500 transition-all duration-200">
          <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
        </div>
        <span className="text-[#707F81] text-[13px] font-['PeydaWeb'] font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'text-[#0C1415] text-sm font-semibold text-left',
            isNum ? 'font-num-bold' : "font-['PeydaWeb']",
          )}
        >
          {value || '---'}
        </span>
      </div>
    </div>
  );

  const SectionCard = ({ title, children, icon: TitleIcon }: any) => (
    <div className="w-full bg-white rounded-2xl p-5 border border-gray-100/80 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0px_6px_24px_rgba(0,0,0,0.05)] transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-50">
        {TitleIcon && <TitleIcon className="w-4 h-4 text-[#FDD00A]" />}
        <h3 className="text-[#0C1415] text-[15px] font-['PeydaWeb'] font-bold">{title}</h3>
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );

  // ----------------------------------------------------------------------
  // Main UI
  // ----------------------------------------------------------------------
  return (
    <div
      className="w-full h-[100dvh] bg-white flex flex-col items-center relative overflow-hidden"
      dir="rtl"
    >
      {/* Header - Sticky & Blurred */}
      <div className="w-full max-w-[440px] sticky top-0 z-50 flex justify-between items-center px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
        <div className="flex items-center justify-between w-full relative">
          <span className="text-[#0C1415] text-[17px] font-['PeydaWeb'] font-bold">پروفایل من</span>
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-transparent hover:bg-gray-100/80 border border-transparent hover:border-gray-200 flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="w-full max-w-[440px] flex-1 overflow-y-auto no-scrollbar pb-32 flex flex-col px-4">
        {/* Profile Header Section */}
        <div className="w-full flex flex-col items-center gap-5 py-8 relative">
          {/* Background Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-b from-[#FDD00A]/5 to-transparent -z-10 pointer-events-none" />

          <div className="relative group cursor-pointer">
            <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-[#FDD00A] to-[#ffeaa7] shadow-lg shadow-[#FDD00A]/20">
              <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center overflow-hidden relative">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="User"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center rounded-full">
                    <User className="w-10 h-10 text-gray-300" />
                  </div>
                )}
              </div>
            </div>
            {/* Status Badge */}
            {user.is_info_correct && (
              <div
                className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100 z-10"
                title="تایید شده"
              >
                <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-50" />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-1.5 z-0">
            <h2 className="text-[#0C1415] text-[22px] font-['PeydaWeb'] font-black tracking-tight">
              {user.firstname && user.lastname
                ? `${user.firstname} ${user.lastname}`
                : 'کاربر مهمان'}
            </h2>
            <span className="text-gray-400 text-sm font-num-medium tracking-wide">
              {user.phone || '---'}
            </span>
          </div>

          <div className="mt-2 px-5 py-2 bg-white border border-gray-100 shadow-sm rounded-full flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FDD00A] animate-pulse"></div>
            <span className="text-xs text-gray-600 font-['PeydaWeb'] font-medium">
              {user.grade ? `دانش‌آموز پایه ${user.grade}` : 'دانش‌آموز'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full">
          {/* Personal Info Card */}
          <SectionCard title="اطلاعات شخصی" icon={User}>
            <InfoRow
              icon={User}
              label="نام و نام خانوادگی"
              value={`${user.firstname || ''} ${user.lastname || ''}`}
            />
            <InfoRow icon={Phone} label="شماره موبایل" value={user.phone} isNum />
            <InfoRow icon={FileText} label="کد ملی" value={user.national_code} isNum />
          </SectionCard>

          {/* School Info Card */}
          <SectionCard title="اطلاعات تحصیلی" icon={GraduationCap}>
            <InfoRow icon={School} label="مدرسه" value={user.school} />
            <InfoRow icon={FileText} label="رشته تحصیلی" value={user.field} />
            <InfoRow icon={CheckCircle2} label="پایه تحصیلی" value={user.grade} />
          </SectionCard>

          {/* Location Info Card */}
          <SectionCard title="موقعیت مکانی" icon={MapPin}>
            <InfoRow icon={MapPin} label="استان" value={user.province} />
            <InfoRow icon={MapPin} label="شهر" value={user.city} />
            <InfoRow icon={MapPin} label="منطقه" value={user.district} isNum />
          </SectionCard>

          {/* Logout Button */}
          <button
            onClick={async () => {
              const res = await logoutCustomer();
              if (res.success) {
                router.push(`/login?role=customer&phone=${user?.phone || ''}`);
              }
            }}
            className="w-full mt-4 group bg-red-50 hover:bg-red-100/80 active:bg-red-100 border border-red-100 text-red-600 h-[56px] rounded-2xl flex items-center justify-center gap-3 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-['PeydaWeb'] font-bold text-[15px]">خروج از حساب کاربری</span>
          </button>

          <div className="w-full text-center pb-6">
            <span className="text-[10px] text-gray-300 font-['PeydaWeb']">نسخه 1.2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

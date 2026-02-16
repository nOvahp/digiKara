'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface LoginViewProps {
  onNext?: () => void;
  onLoginAgain?: () => void;
  onBack?: () => void;
}

// Reusable Input Field Component matching View 5 style
const PillInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) => (
  <div className={`w-full ${className}`}>
    <div className="flex justify-end items-center mb-[-12px] pr-4 relative z-10">
      <span className="bg-white px-2 text-[#ACB5BB] text-xs font-bold font-peyda">{label}</span>
    </div>
    <div className="w-full h-14 border border-[#DCE4E8] rounded-full flex items-center bg-white relative overflow-hidden focus-within:border-[#FDD00A] transition-colors">
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-none shadow-none focus-visible:ring-0 text-right h-full text-[#393E46] font-bold text-sm px-5"
      />
    </div>
  </div>
);

export function LoginViewManagerReport({ onLoginAgain, onBack }: LoginViewProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleGoHome = () => {
    router.push('/');
  };

  const handleLoginAgain = () => {
    if (onLoginAgain) {
      onLoginAgain();
    } else {
      router.push('/login');
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    school: '',
    province: '',
    city: '',
    district: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        school: user.school || '',
        province: user.province || '',
        city: user.city || '',
        district: user.district || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { managerService } = await import('@/app/services/managerService');

      const result = await managerService.reportSchoolDiscrepancy(formData);

      if (result.success) {
        setSuccessMessage(result.message || 'تغییرات با موفقیت ثبت شد');
        setShowSuccess(true);
      } else {
        setError(result.message || 'خطا در ویرایش اطلاعات');
      }
    } catch (err) {
      console.error(err);
      setError('خطای غیرمنتظره رخ داد');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-white relative overflow-hidden">
      {/* Top Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[230px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />

      {/* Header Content */}
      <div className="relative z-10 w-full px-6 pt-6 pb-2">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          {/* Back Button */}
          {(onBack || onLoginAgain) && (
            <button
              onClick={onBack || onLoginAgain}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-white/20 transition-all text-[#393E46]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <span className="text-[#393E46] text-xl font-black">دیجی کارا</span>
        </div>

        {/* Title Section */}
        <div className="text-right space-y-2 mb-8">
          <h1 className="text-[#393E46] text-3xl font-black">
            {showSuccess ? 'تغییرات ثبت شد' : 'ویرایش اطلاعات'}
          </h1>
          <p className="text-[#393E46] text-sm font-semibold opacity-90">
            {showSuccess ? 'اطلاعات شما با موفقیت بروزرسانی شد' : 'لطفا اطلاعات صحیح را وارد کنید'}
          </p>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="relative z-10 flex-1 w-full max-w-[440px] mx-auto overflow-y-auto px-6 pb-32 no-scrollbar">
        {showSuccess ? (
          <div className="flex flex-col items-center gap-6 py-10 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div className="text-center space-y-3">
              <p className="text-[#393E46] text-base font-bold leading-relaxed">
                {successMessage || 'گزارش شما با موفقیت در سیستم ثبت شد.'}
              </p>
              <div className="bg-[#F3F6FC] rounded-xl px-4 py-2 inline-block dir-ltr text-[#393E46] font-bold">
                {user?.phone}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            <div className="flex gap-3">
              <PillInput
                label="نام خانوادگی"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="flex-1"
              />
              <PillInput
                label="نام"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="flex-1"
              />
            </div>

            <PillInput
              label="مدرسه"
              name="school"
              value={formData.school}
              onChange={handleChange}
            />

            <div className="flex gap-2">
              <PillInput
                label="استان"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="flex-1"
              />
              <PillInput
                label="شهر"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="flex-1"
              />
              <PillInput
                label="منطقه"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="flex-1"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl text-center border border-red-100 flex items-center justify-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </form>
        )}
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm z-50 w-full max-w-[440px] mx-auto border-t border-gray-100/50">
        <div className="flex flex-col gap-3 w-full">
          {showSuccess ? (
            <>
              <Button
                onClick={handleGoHome}
                className="w-full h-[54px] bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold rounded-2xl text-lg shadow-lg shadow-[#FDD00A]/20"
              >
                بازگشت به صفحه اصلی
              </Button>
              <Button
                onClick={handleLoginAgain}
                variant="outline"
                className="w-full h-[54px] bg-white border-2 border-[#E5E7EB] text-[#6C7278] font-bold rounded-2xl hover:bg-gray-50"
              >
                صفحه ورود
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
                disabled={isLoading}
                className="w-full h-[54px] bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold rounded-2xl text-lg shadow-lg shadow-[#FDD00A]/20"
              >
                {isLoading ? <Loader2 className="animate-spin text-black" /> : 'ثبت تغییرات'}
              </Button>

              <Button
                onClick={onBack || onLoginAgain}
                variant="outline"
                className="w-full h-[54px] bg-white border-2 border-[#E5E7EB] text-[#6C7278] font-bold rounded-2xl hover:bg-gray-50"
              >
                انصراف
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

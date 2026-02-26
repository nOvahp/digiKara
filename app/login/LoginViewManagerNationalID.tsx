'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/app/providers/AuthProvider';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nationalIdSchema, NationalIdFormValues } from './utils/schemas';
import { toEnglishDigits } from '@/lib/number';

import { UserData } from '@/app/services/common/schemas';

interface LoginViewManagerNationalIDProps {
  onNext?: (user: UserData) => void;
  onBack?: () => void;
}

export function LoginViewManagerNationalID({ onNext, onBack }: LoginViewManagerNationalIDProps) {
  const { verifyManagerNationalId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const form = useForm<NationalIdFormValues>({
    resolver: zodResolver(nationalIdSchema),
    defaultValues: {
      nationalId: '',
    },
  });

  const onSubmit: SubmitHandler<NationalIdFormValues> = async (data) => {
    setIsLoading(true);
    setServerError('');

    try {
      const result = await verifyManagerNationalId(toEnglishDigits(data.nationalId));

      setIsLoading(false);

      if (result.success && result.user) {
        if (onNext) {
          onNext(result.user);
        }
      } else {
        setServerError(result.message || 'خطا در تایید شماره ملی');
      }
    } catch (err) {
      setIsLoading(false);
      setServerError('خطای شبکه');
      console.error('Manager National ID submit error:', err);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center relative overflow-hidden"
      dir="rtl"
    >
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />

      {/* Content Wrapper */}
      <div className="w-full h-full flex flex-col items-center p-6 z-10">
        {/* Top Header */}
        <div className="w-full max-w-md flex justify-between items-center py-6">
          <div className="flex items-center gap-2">
            <span className="text-[#393E46] text-xl font-black">دیجی کارا</span>
          </div>

          {/* Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100/50 transition-all text-[#393E46]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col flex-1 w-full max-w-md mt-10">
          {/* Title Section */}
          <div className="mb-10 text-right space-y-4">
            <h1 className="text-[#393E46] text-4xl font-black leading-tight">تایید شماره ملی</h1>
            <p className="text-[#393E46] text-sm font-semibold opacity-80">
              برای تکمیل ثبت‌نام، لطفاً کد ملی خود را وارد کنید
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="space-y-2">
              <Label htmlFor="national-id" className="text-[#ACB5BB] text-xs font-bold block px-2">
                شماره ملی
              </Label>

              {/* Input Container */}
              <div className="relative flex items-center bg-white rounded-full border border-[#DCE4E8] p-2 hover:border-[#FDD00A] transition-colors shadow-sm h-14">
                <Input
                  id="national-id"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="کد ملی ۱۰ رقمی"
                  {...form.register('nationalId')}
                  className="flex-1 border-none shadow-none rounded-none bg-transparent text-right placeholder:text-[#ACB5BB] focus-visible:ring-0 focus-visible:ring-offset-0 text-[#393E46] font-semibold text-base h-full px-3"
                  dir="ltr"
                />
              </div>

              {form.formState.errors.nationalId && (
                <p className="text-red-500 text-xs text-right px-2">
                  {form.formState.errors.nationalId.message}
                </p>
              )}
              {serverError && (
                <p className="text-red-500 text-xs text-right px-2">{serverError}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-[#FDD00A] hover:bg-[#f0c500] text-[#393E46] font-bold text-base rounded-full shadow-md"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'تایید و ادامه'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

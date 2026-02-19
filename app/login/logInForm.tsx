'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toEnglishDigits, toPersianDigits } from '@/lib/number';

import { useAuth } from '@/app/providers/AuthProvider';
import {
  phoneNumberSchema,
  otpSchema,
  PhoneNumberFormValues,
  OtpFormValues,
} from './utils/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ChevronLeft } from 'lucide-react';

const RESEND_DELAY = 120; // 2 minutes

import { UserData } from '@/app/services/common/schemas';

export function LogInForm({
  onNext,
  onExistingUser,
  onBack,
  onCustomerRegister,
  onCustomerLogin,
}: {
  onNext?: () => void;
  onExistingUser?: (user: UserData) => void;
  onBack?: () => void;
  onCustomerRegister?: (phone: string) => void;
  onCustomerLogin?: (phone: string) => void;
}) {
  const router = useRouter();
  const { requestOtp, verifyOtp, role } = useAuth();

  // Stages: PHONE_ENTRY -> WAITING (sending) -> OTP_ENTRY
  const [stage, setStage] = useState<'PHONE_ENTRY' | 'OTP_ENTRY'>('PHONE_ENTRY');
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customerStatus, setCustomerStatus] = useState<number | null>(null);

  // Timer Logic
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft]);

  const handleResend = () => {
    if (timeLeft === 0 && phoneForm.getValues('phoneNumber')) {
      onSubmitPhone({ phoneNumber: phoneForm.getValues('phoneNumber') });
    }
  };

  // --- Phone Form ---
  const phoneForm = useForm<PhoneNumberFormValues>({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: { phoneNumber: '' },
  });

  const onSubmitPhone: SubmitHandler<PhoneNumberFormValues> = async (data) => {
    setIsLoading(true);
    setServerError('');
    
    // Prepend '0' for backend
    const fullPhoneNumber = '0' + data.phoneNumber;

    const result = await requestOtp(fullPhoneNumber);
    setIsLoading(false);

    if (result.success) {
      if (role === 'customer' && result.status === 3) {
        onCustomerLogin?.(fullPhoneNumber);
        return;
      }
      setStage('OTP_ENTRY');
      setTimeLeft(RESEND_DELAY);
      if (result.status) setCustomerStatus(result.status);
    } else {
      setServerError(result.message || 'خطا در ارسال کد');
    }
  };

  // --- OTP Form ---
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const onSubmitOtp: SubmitHandler<OtpFormValues> = async (data) => {
    setIsLoading(true);
    setServerError('');
    const phone = '0' + phoneForm.getValues('phoneNumber');
    const result = await verifyOtp(phone, data.otp);

    setIsLoading(false);

    if (result.success) {
      // If we have user data, it means the user has completed onboarding/questions before.
      if (result.user) {
        // Save Manager School Info if applicable
        if (role === 'manager') {
          const managerData = {
            school: result.user.school || '',
            province: result.user.province || '',
            city: result.user.city || '',
          };
          localStorage.setItem('managerSchoolInfo', JSON.stringify(managerData));
        }

        if (onExistingUser) {
          onExistingUser(result.user);
        } else {
          if (role === 'customer') {
            router.push('/Bazzar');
          } else {
            router.push(role === 'manager' ? '/SchoolPanel' : '/StudentDashboard');
          }
        }
      } else {
        // First time user (user data is null), proceed to next onboarding step
        if (role === 'customer') {
          // Check captured status
          if (customerStatus === 1) {
            // New User -> Register
            onCustomerRegister?.(phone);
          } else if (customerStatus === 2 || customerStatus === 3 || !customerStatus) {
            if (result.token) {
              router.push('/Bazzar');
            } else {
              onCustomerLogin?.(phone);
            }
          } else {
            router.push('/Bazzar');
          }
        } else if (onNext) {
          onNext();
        } else {
          router.push(role === 'manager' ? '/SchoolPanel' : '/StudentDashboard');
        }
      }
    } else {
      setServerError(result.message || '');
    }
  };

  const handleEditPhone = () => {
    setStage('PHONE_ENTRY');
    setServerError('');
    otpForm.reset();
  };

  // Format timer
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const time = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return toPersianDigits(time);
  };

  // Determine title based on role
  const getTitle = () => {
    if (stage === 'OTP_ENTRY') return 'کد تایید';
    if (role === 'manager') return 'ورود مدیر مدرسه';
    if (role === 'customer') return 'ورود به بازارچه';
    return 'ورود دانش آموز';
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-white items-center relative overflow-hidden"
      dir="rtl"
    >
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />

      {/* Content Wrapper with Padding */}
      <div className="w-full h-full flex flex-col items-center p-6 z-10">
        {/* Top Header / Logo Area */}
        <div className="w-full max-w-md flex justify-between items-center py-6">
          <div className="flex items-center gap-2">
            <span className="text-[#393E46] text-xl font-black">دیجی کارا</span>
          </div>

          {/* Back Button (Top Left) */}
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100/50 transition-all text-[#393E46]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col flex-1 w-full max-w-md mt-10">
          {/* Title Section */}
          <div className="mb-10 text-right space-y-4">
            <h1 className="text-[#393E46] text-4xl font-black leading-tight">{getTitle()}</h1>
            <p className="text-[#393E46] text-sm font-semibold opacity-80">
              {stage === 'PHONE_ENTRY'
                ? 'اینجا حساب کاربری خود را ایجاد کنید'
                : `کد ارسال شده به ${toPersianDigits(phoneForm.getValues('phoneNumber'))} را وارد کنید`}
            </p>
          </div>

          {/* Form Section */}
          {stage === 'PHONE_ENTRY' ? (
            <form onSubmit={phoneForm.handleSubmit(onSubmitPhone)} className="flex flex-col gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#ACB5BB] text-xs font-bold block px-2">
                  شماره تلفن
                </Label>

                {/* Input Container - Pill Shape */}
                <div
                  dir="ltr"
                  className="relative flex items-center bg-white rounded-full border border-[#DCE4E8] p-2 hover:border-[#FDD00A] transition-colors shadow-sm h-14"
                >
                  {/* Flag & Prefix */}
                  <div
                    className="flex items-center gap-2 pr-4 border-r border-gray-100 mr-2"
                    dir="ltr"
                  >
                    <div className="w-6 h-4 bg-white relative overflow-hidden flex flex-col rounded-[2px] shadow-sm border border-gray-100">
                      {/* Simple CSS Flag Representation or use an image/emoji */}
                      <div className="h-1/3 bg-[#5EAA22]"></div>
                      <div className="h-1/3 bg-white flex justify-center items-center">
                        <div className="text-[4px] text-red-600">aaa</div>
                      </div>
                      <div className="h-1/3 bg-[#E31D1C]"></div>
                    </div>
                    <span className="text-[#1A1C1E] font-num-bold text-sm">+98</span>
                    {/* Arrow Icon */}
                    {/* <ChevronDown size={12} className="opacity-50" /> */}
                  </div>

                  {/* Text Input */}
                  <Input
                    {...phoneForm.register('phoneNumber')}
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="9123456789"
                    className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent text-left text-lg font-num-bold placeholder:text-gray-300 h-full"
                    autoFocus
                    onChange={(e) => {
                      let val = toEnglishDigits(e.target.value);
                      // Remove leading zero if present
                      if (val.startsWith('0')) {
                        val = val.substring(1);
                      }
                      phoneForm.setValue('phoneNumber', val, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </div>
                {phoneForm.formState.errors.phoneNumber && (
                  <p className="text-red-500 text-xs font-medium px-2">
                    {phoneForm.formState.errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {serverError && (
                <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl text-center border border-red-100">
                  {serverError}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold py-7 text-lg rounded-xl shadow-[#FDD00A]/20 transition-all"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5 text-[#1A1C1E]" /> : 'ادامه'}
              </Button>


            </form>
          ) : (
            <form
              onSubmit={otpForm.handleSubmit(onSubmitOtp)}
              className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={handleEditPhone}
                  className="text-[#4365DE] text-xs font-bold bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  ویرایش شماره
                </button>
                <p className="text-[#6C7278] text-sm font-num-bold dir-ltr">
                  {toPersianDigits(phoneForm.getValues('phoneNumber'))}
                </p>
              </div>

              <div className="flex justify-center dir-ltr py-4">
                <Input
                  {...otpForm.register('otp')}
                  dir="ltr"
                  maxLength={6}
                  className="text-center text-3xl tracking-[0.5em] py-8 px-2 rounded-2xl font-num-bold bg-[#F3F6FC] border-none focus-visible:ring-1 focus-visible:ring-[#FDD00A]/50 text-[#393E46]"
                  placeholder="— — — — —"
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  autoFocus
                  onChange={(e) => {
                    const val = toEnglishDigits(e.target.value);
                    otpForm.setValue('otp', val, { shouldValidate: true });
                  }}
                />
              </div>
              {otpForm.formState.errors.otp && (
                <p className="text-red-500 text-xs font-medium text-center -mt-2">
                  {otpForm.formState.errors.otp.message}
                </p>
              )}

              {serverError && (
                <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl text-center border border-red-100">
                  {serverError}
                </div>
              )}

              <div className="flex items-center justify-center text-sm">
                {timeLeft > 0 ? (
                  <div className="flex items-center gap-2 text-[#6C7278] font-num-bold bg-gray-50 px-4 py-2 rounded-full">
                    <Loader2 className="w-4 h-4 animate-spin opacity-50" />
                    <span>{formatTime(timeLeft)} تا ارسال مجدد</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#4365DE] font-bold hover:underline bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    ارسال مجدد کد پیامک
                  </button>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold py-7 text-lg rounded-xl mt-4 shadow-[#FDD00A]/20 transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5 text-[#1A1C1E]" />
                ) : (
                  'تایید و ورود'
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

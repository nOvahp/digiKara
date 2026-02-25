'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerLoginSchema, CustomerLoginValues, otpSchema, OtpFormValues } from './utils/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/app/providers/AuthProvider';
import { Loader2, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toEnglishDigits, toPersianDigits } from '@/lib/number';

const RESEND_DELAY = 120;

interface LoginViewCustomerLoginProps {
  phone: string;
  onBack?: () => void;
}

export function LoginViewCustomerLogin({ phone, onBack }: LoginViewCustomerLoginProps) {
  const { loginCustomer, verifyOtp, sendCustomerSms } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const smsSendingRef = React.useRef(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return toPersianDigits(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
  };

  // --- Password form ---
  const passwordForm = useForm<CustomerLoginValues>({
    resolver: zodResolver(customerLoginSchema),
    defaultValues: { password: '' },
  });

  const onSubmitPassword = async (data: CustomerLoginValues) => {
    setIsLoading(true);
    setServerError('');
    const result = await loginCustomer({ phone, password: data.password });
    setIsLoading(false);
    if (result.success) {
      router.push('/Bazzar');
    } else {
      setServerError(result.message || 'اطلاعات ورود نادرست است');
    }
  };

  // --- OTP form ---
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const handleSwitchToOtp = async () => {
    if (smsSendingRef.current || isLoading) return;
    smsSendingRef.current = true;
    setIsLoading(true);
    setServerError('');
    const result = await sendCustomerSms(phone);
    smsSendingRef.current = false;
    setIsLoading(false);
    if (result.success) {
      otpForm.reset();
      setMode('otp');
      setTimeLeft(RESEND_DELAY);
    } else {
      setServerError(result.message || 'خطا در ارسال پیامک');
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0 || smsSendingRef.current || isLoading) return;
    smsSendingRef.current = true;
    setIsLoading(true);
    setServerError('');
    const result = await sendCustomerSms(phone);
    smsSendingRef.current = false;
    setIsLoading(false);
    if (result.success) {
      setTimeLeft(RESEND_DELAY);
    } else {
      setServerError(result.message || 'خطا در ارسال مجدد پیامک');
    }
  };

  const onSubmitOtp = async (data: OtpFormValues) => {
    setIsLoading(true);
    setServerError('');
    const result = await verifyOtp(phone, data.otp);
    setIsLoading(false);
    if (result.success) {
      router.push('/Bazzar');
    } else {
      setServerError(result.message || 'کد وارد شده نادرست است');
    }
  };

  const handleBack = () => {
    if (mode === 'otp') {
      setMode('password');
      setServerError('');
      return;
    }
    onBack ? onBack() : router.push('/login');
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-white items-center relative overflow-hidden mb-10"
      dir="rtl"
    >
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />

      <div className="w-full h-full flex flex-col items-center z-10">
        {/* Header */}
        <div className="w-full max-w-md flex justify-between items-center py-6 px-6">
          <div className="flex items-center gap-2">
            <span className="text-[#393E46] text-xl font-black">دیجی کارا</span>
          </div>
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100/50 transition-all text-[#393E46]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col flex-1 w-full max-w-md mt-10 px-6">
          <div className="w-full text-right mb-10">
            <h1 className="text-[#393E46] text-4xl font-black mb-2 leading-tight">
              {mode === 'otp' ? 'کد تایید' : 'ورود به بازارچه'}
            </h1>
            <p className="text-[#6C7278] text-sm font-semibold">
              {mode === 'otp'
                ? `کد ارسال شده به ${toPersianDigits(phone)} را وارد کنید`
                : 'لطفا رمز عبور خود را وارد کنید'}
            </p>
          </div>

          {/* Phone badge */}
          {mode === 'password' && (
            <div className="bg-[#F3F6FC] p-4 rounded-2xl flex items-center justify-between mb-6">
              <span className="text-xs text-[#6C7278] font-bold">شماره موبایل:</span>
              <span className="text-sm font-black dir-ltr text-[#393E46]">{phone}</span>
            </div>
          )}

          {/* ---- PASSWORD MODE ---- */}
          {mode === 'password' && (
            <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="w-full flex flex-col gap-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold mb-3 block px-1">
                  رمز عبور
                </Label>
                <Input
                  {...passwordForm.register('password')}
                  id="password"
                  type="password"
                  placeholder="***********"
                  className="rounded-xl border-[#DCE4E8] bg-white h-14 text-lg px-4 text-left"
                  autoFocus
                  onChange={(e) => {
                    const val = toEnglishDigits(e.target.value);
                    passwordForm.setValue('password', val, { shouldValidate: true });
                  }}
                />
                {passwordForm.formState.errors.password && (
                  <p className="text-red-500 text-xs">{passwordForm.formState.errors.password.message}</p>
                )}
              </div>

              {serverError && (
                <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl text-center border border-red-100">
                  {serverError}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold py-7 text-lg rounded-xl shadow-[#FDD00A]/20 mt-4 transition-all"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'ورود'}
              </Button>

              {/* OTP login link */}
              <div className="flex flex-col items-center gap-3 mt-2">
                <button
                  type="button"
                  className="text-[#9CA3AF] text-xs font-bold hover:text-[#393E46] transition-colors"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </button>
                <button
                  type="button"
                  onClick={handleSwitchToOtp}
                  disabled={isLoading}
                  className="text-[#4365DE] text-sm font-bold hover:underline bg-blue-50 px-5 py-2.5 rounded-full hover:bg-blue-100 transition-colors disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin w-4 h-4 inline ml-1" /> : null}
                  وارد شدن با کد یکبار مصرف
                </button>
              </div>
            </form>
          )}

          {/* ---- OTP MODE ---- */}
          {mode === 'otp' && (
            <form
              onSubmit={otpForm.handleSubmit(onSubmitOtp)}
              className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => { setMode('password'); setServerError(''); }}
                  className="text-[#4365DE] text-xs font-bold bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  بازگشت به رمز عبور
                </button>
                <p className="text-[#6C7278] text-sm font-num-bold dir-ltr">
                  {toPersianDigits(phone)}
                </p>
              </div>

              <div className="flex justify-center dir-ltr py-4">
                <Input
                  {...otpForm.register('otp')}
                  dir="ltr"
                  maxLength={6}
                  className="text-center text-3xl tracking-[0.5em] py-8 px-2 rounded-2xl font-num-bold bg-[#F3F6FC] border-none focus-visible:ring-1 focus-visible:ring-[#FDD00A]/50 text-[#393E46]"
                  placeholder="— — — — — —"
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
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-[#4365DE] font-bold hover:underline bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors disabled:opacity-50"
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
                {isLoading ? <Loader2 className="animate-spin w-5 h-5 text-[#1A1C1E]" /> : 'تایید و ورود'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

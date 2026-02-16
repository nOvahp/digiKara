'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerLoginSchema, CustomerLoginValues } from './utils/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/app/providers/AuthProvider';
import { Loader2, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toEnglishDigits } from '@/lib/number';

interface LoginViewCustomerLoginProps {
  phone: string;
  onBack?: () => void;
}

export function LoginViewCustomerLogin({ phone, onBack }: LoginViewCustomerLoginProps) {
  const { loginCustomer } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const form = useForm<CustomerLoginValues>({
    resolver: zodResolver(customerLoginSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (data: CustomerLoginValues) => {
    setIsLoading(true);
    setServerError('');

    const result = await loginCustomer({
      phone: phone,
      password: data.password,
    });

    setIsLoading(false);

    if (result.success) {
      router.push('/Bazzar');
    } else {
      setServerError(result.message || 'اطلاعات ورود نادرست است');
    }
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-white items-center relative overflow-hidden mb-4"
      dir="rtl"
    >
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />

      <div className="w-full h-full flex flex-col items-center z-10">
        {/* Top Header / Logo Area */}
        <div className="w-full max-w-md flex justify-between items-center py-6 px-6">
          <div className="flex items-center gap-2">
            <span className="text-[#393E46] text-xl font-black">دیجی کارا</span>
          </div>

          {/* Back Button (Top Left) */}
          <button
            onClick={() => (onBack ? onBack() : router.push('/login'))}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100/50 transition-all text-[#393E46]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col flex-1 w-full max-w-md mt-10 px-6">
          <div className="w-full text-right mb-20">
            <h1 className="text-[#393E46] text-4xl font-black mb-2 leading-tight">
              ورود به بازارچه
            </h1>
            <p className="text-[#6C7278] text-sm font-semibold">لطفا رمز عبور خود را وارد کنید</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
            <div className="bg-[#F3F6FC] p-4 rounded-2xl flex items-center justify-between">
              <span className="text-xs text-[#6C7278] font-bold">شماره موبایل:</span>
              <span className="text-sm font-black dir-ltr text-[#393E46]">{phone}</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold mb-3 block px-1">
                رمز عبور
              </Label>
              <Input
                {...form.register('password')}
                type="password"
                placeholder="***********"
                className="rounded-xl border-[#DCE4E8] bg-white h-14 text-lg px-4 text-left "
                autoFocus
                onChange={(e) => {
                  const val = toEnglishDigits(e.target.value);
                  form.setValue('password', val, { shouldValidate: true });
                }}
              />
              {form.formState.errors.password && (
                <p className="text-red-500 text-xs">{form.formState.errors.password.message}</p>
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

            <div className="text-center mt-4">
              <button
                type="button"
                className="text-[#9CA3AF] text-xs font-bold hover:text-[#393E46] transition-colors"
              >
                رمز عبور را فراموش کرده‌اید؟
              </button>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => (onBack ? onBack() : router.push('/login'))}
                  className="text-[#393E46] text-sm font-bold hover:underline transition-colors"
                >
                  حساب کاربری ندارید؟
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

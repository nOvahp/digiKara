'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toEnglishDigits } from '@/lib/number';
import { useAuth } from '@/app/providers/AuthProvider';
import { phoneNumberSchema, PhoneNumberFormValues } from '../utils/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ChevronLeft } from 'lucide-react';

export function ManagerPhoneInput({
  onNext,
  onBack,
}: {
  onNext: (phone: string) => void;
  onBack?: () => void;
}) {
  const { requestOtp } = useAuth();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const phoneForm = useForm<PhoneNumberFormValues>({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: { phoneNumber: '' },
  });

  const onSubmitPhone: SubmitHandler<PhoneNumberFormValues> = async (data) => {
    setIsLoading(true);
    setServerError('');
    const fullPhone = '0' + data.phoneNumber;
    const result = await requestOtp(fullPhone);
    setIsLoading(false);
    if (result.success) {
      onNext(fullPhone);
    } else {
      setServerError(result.message || 'خطا در ارسال کد');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white items-center relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />
      <div className="w-full h-full flex flex-col items-center p-6 z-10">
        <div className="w-full max-w-md flex justify-between items-center py-6">
          <div className="flex items-center gap-2">
            <span className="text-[#393E46] text-xl font-black">دیجی کارا</span>
          </div>
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100/50 transition-all text-[#393E46]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col flex-1 w-full max-w-md mt-10">
          <div className="mb-10 text-right space-y-4">
            <h1 className="text-[#393E46] text-4xl font-black leading-tight">ورود مدیر مدرسه</h1>
            <p className="text-[#393E46] text-sm font-semibold opacity-80">اینجا حساب کاربری خود را ایجاد کنید</p>
          </div>

          <form onSubmit={phoneForm.handleSubmit(onSubmitPhone)} className="flex flex-col gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#ACB5BB] text-xs font-bold block px-2">شماره تلفن</Label>
              <div dir="ltr" className="relative flex items-center bg-white rounded-full border border-[#DCE4E8] p-2 hover:border-[#FDD00A] transition-colors shadow-sm h-14">
                <div className="flex items-center gap-2 pr-4 border-r border-gray-100 mr-2" dir="ltr">
                  <div className="w-6 h-4 bg-white relative overflow-hidden flex flex-col rounded-[2px] shadow-sm border border-gray-100">
                    <div className="h-1/3 bg-[#5EAA22]"></div>
                    <div className="h-1/3 bg-white flex justify-center items-center">
                      <div className="text-[4px] text-red-600">aaa</div>
                    </div>
                    <div className="h-1/3 bg-[#E31D1C]"></div>
                  </div>
                  <span className="text-[#1A1C1E] font-num-bold text-sm">+98</span>
                </div>
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
                    if (val.startsWith('0')) val = val.substring(1);
                    phoneForm.setValue('phoneNumber', val, { shouldValidate: true });
                  }}
                />
              </div>
              {phoneForm.formState.errors.phoneNumber && (
                <p className="text-red-500 text-xs font-medium px-2">{phoneForm.formState.errors.phoneNumber.message}</p>
              )}
            </div>
            {serverError && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl text-center border border-red-100">{serverError}</div>
            )}
            <Button type="submit" className="w-full bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold py-7 text-lg rounded-xl shadow-[#FDD00A]/20 transition-all" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin w-5 h-5 text-[#1A1C1E]" /> : 'ادامه'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

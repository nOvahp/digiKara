'use client';

import React, { useState } from 'react';
import { ChevronRight, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Schema Validation
const formSchema = z.object({
  shopName: z.string().min(2, {
    message: 'نام فروشگاه باید حداقل ۲ حرف باشد.',
  }),
  shopDescription: z.string().min(10, {
    message: 'توضیحات باید حداقل ۱۰ حرف باشد.',
  }),
  logo: z.any().optional(), // File validation can be complex, keeping strict validation off for initial UI
});

type FormValues = z.infer<typeof formSchema>;

import { useShopCreation } from '../context/ShopCreationContext';
import Image from 'next/image';

// ... (keep imports)

export default function ShopIdentityPage() {
  const router = useRouter();
  const { state, updateState } = useShopCreation();
  const [logoPreview, setLogoPreview] = useState<string | null>(state.logoPreview);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shopName: state.name,
      shopDescription: state.description,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Saving Step 3 Data:', data);
    updateState({
      name: data.shopName,
      description: data.shopDescription,
      // Logo file is already in state if uploaded, or handled via handleLogoChange
    });
    router.push('/StudentDashboard/hojreCreation/step4');
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setLogoPreview(previewUrl);
        updateState({ logo: file, logoPreview: previewUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center font-sans pb-24">
      {/* Header */}
      <div className="w-full max-w-md px-4 pt-4 flex flex-col items-center gap-4">
        <div className="w-full flex justify-between items-center relative h-11">
          <Link href="/StudentDashboard/hojreCreation/step2" className="p-1">
            <ChevronRight className="w-6 h-6 text-[#222831] rotate-180" />
          </Link>
          <div className="text-[#0D0D12] text-xl font-semibold font-['PeydaWeb'] leading-snug">
            ساخت حجره
          </div>
        </div>

        {/* Steps Indicator: Step 2 Active (Middle) */}
        <div className="w-full border-b border-[#DFE1E7] py-5 flex justify-end items-center gap-3 overflow-x-auto no-scrollbar">
          {/* Step 3 (Inactive) */}
          <div className="flex justify-start items-center gap-2 shrinks-0 whitespace-nowrap opacity-50">
            <div className="text-[#818898] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
              دسته بندی و محصول اولیه
            </div>
            <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center text-white text-sm font-bold font-['PeydaFaNum']">
              3
            </div>
          </div>

          {/* Dotted Line */}
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />

          {/* Step 2 (Active - Yellow) */}
          <div className="flex justify-start items-center gap-2 shrink-0 whitespace-nowrap">
            <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
              هویت بصری و عمومی
            </div>
            <div className="w-6 h-6 bg-[#FDD00A] rounded-full flex items-center justify-center text-white text-sm font-bold font-['PeydaFaNum']">
              2
            </div>
          </div>

          {/* Dotted Line */}
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />

          {/* Step 1 (Completed - Inactive/Gray for visual hierarchy focus on current step) */}
          {/* Based on typical wizard patterns, previous steps might look completed. 
                         However, aiming for exact visual match to Step 2 Design logic:
                         Active is Colored, Others Gray.
                      */}
          <div className="flex justify-start items-center gap-2 shrink-0 whitespace-nowrap opacity-50">
            <div className="text-[#818898] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
              منشور کارآفرینی
            </div>
            <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center text-white text-sm font-bold font-['PeydaFaNum']">
              1
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 w-full max-w-md px-4 mt-6 flex flex-col gap-6 overflow-y-auto"
      >
        {/* Logo Upload */}
        <label htmlFor="logo-upload" className="w-full cursor-pointer flex justify-center">
          {logoPreview ? (
            <div
              style={{
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 20.19,
                display: 'inline-flex',
              }}
            >
              <div className="relative">
                <Image
                  width={126}
                  height={126}
                  style={{ borderRadius: 63.11 }}
                  src={logoPreview}
                  alt="Shop Logo"
                  className="object-cover"
                />
                {/* Edit Icon Overlay */}
                <div
                  className="absolute bottom-0 right-0"
                  style={{ transform: 'translate(-10%, -10%)' }}
                >
                  <div
                    style={{
                      width: 45.44,
                      height: 45.44,
                      background: '#3C5A5D',
                      borderRadius: '50%',
                      border: '2.52px white solid',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 22.72,
                        height: 22.72,
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: 15.14,
                          height: 15.71,
                          left: 3.78,
                          top: 2.05,
                          position: 'absolute',
                          border: '1.56px white solid',
                          borderRadius: '2px',
                        }}
                      />
                      <div
                        style={{
                          width: 5.16,
                          height: 4.87,
                          left: 11.26,
                          top: 4.78,
                          position: 'absolute',
                          border: '1.56px white solid',
                          borderRadius: '50%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-14 rounded-xl border border-[#DFE1E7] flex justify-center items-center gap-2 bg-white hover:bg-gray-50 transition-colors">
              <div className="text-[#1A1C1E] text-[17.58px] font-semibold font-medium leading-normal">
                بارگذاری تصویر نماد فروشگاه
              </div>
              <ImageIcon className="w-6 h-6 text-[#1A1C1E]" />
            </div>
          )}
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoChange}
          />
        </label>

        {/* Shop Name */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <label className="text-right text-[#666D80] text-sm font-semibold font-medium leading-tight tracking-wide">
              نام فروشگاه
            </label>
          </div>
          <Input
            {...register('shopName')}
            placeholder="نامی که مشتری میبیند (مثلاً: پوشاک برتر)"
            className="h-[52px] bg-white rounded-xl border border-[#DFE1E7] text-right placeholder:text-[#DFE1E7] placeholder:font-medium text-[#1A1C1E]"
            dir="rtl"
          />
          {errors.shopName && (
            <span className="text-red-500 text-xs text-right font-medium">
              {errors.shopName.message}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <label className="text-right text-[#666D80] text-sm font-semibold font-medium leading-tight tracking-wide">
              توضیحات کوتاه
            </label>
          </div>
          <Textarea
            {...register('shopDescription')}
            placeholder="یک جمله برای معرفی کسب‌وکار (برای سئو و زیر نام فروشگاه)"
            className="h-[176px] bg-white rounded-xl border border-[#DFE1E7] text-right placeholder:text-[#DFE1E7] placeholder:font-medium text-[#1A1C1E] resize-none"
            dir="rtl"
          />
          {errors.shopDescription && (
            <span className="text-red-500 text-xs text-right font-medium">
              {errors.shopDescription.message}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="w-full flex gap-4 mt-auto mb-4">
          <button
            type="button"
            onClick={() => router.push('/StudentDashboard/hojreCreation/step2')}
            className="flex-1 h-14 rounded-xl border border-[#DFE1E7] flex justify-center items-center text-[#1A1C1E] text-lg font-semibold font-medium hover:bg-gray-50 transition-colors"
          >
            قبلی
          </button>

          <button
            type="submit"
            className="w-[279px] h-14 bg-[#FDD00A] active:bg-[#eac009] rounded-xl flex justify-center items-center text-[#1A1C1E] text-lg font-semibold font-medium transition-colors"
          >
            ادامه
          </button>
        </div>
      </form>
    </div>
  );
}

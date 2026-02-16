'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Schema Validation
const formSchema = z.object({
  workCategory: z.string().min(1, 'لطفاً یک راسته کاری انتخاب کنید.'),
  abilities: z.string().min(3, {
    message: 'توانمندی‌ها باید حداقل ۳ حرف باشد.',
  }),
  // Use z.coerce to automatically convert string input to number
  experience: z.coerce
    .number()
    .min(0, {
      message: 'تجربه نمیتواند منفی باشد',
    })
    .default(0),
});

// Explicitly define the type to match the transformed output
type FormValues = {
  workCategory: string;
  abilities: string;
  experience: number;
};

import { useShopCreation } from '../context/ShopCreationContext';
import { shopService } from '../../../services/student/shopService';

// ... (keep default imports)

export default function ShopCategoryPage() {
  const router = useRouter();
  const activeStepRef = React.useRef<HTMLDivElement>(null);
  const { state, updateState } = useShopCreation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      experience: 0,
      workCategory: state.workCategory || '',
      abilities: state.skill || '',
    },
  });

  // Auto-scroll to active step on mount
  React.useEffect(() => {
    // ... (keep useEffect)
    // Small timeout to ensure layout is calculated including the new padding/gap
    const timer = setTimeout(() => {
      if (activeStepRef.current) {
        activeStepRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log('Submitting Shop Creation...', data);

    // Construct Payload
    const formData = new FormData();
    formData.append('name', state.name); // From Step 3
    formData.append('description', state.description); // From Step 3
    formData.append('skill', data.abilities); // Mapped from 'abilities'
    formData.append('experience', data.experience.toString());
    // Work Category is not in required API spec but we can send it or append to skill if needed
    // For now, assuming API ignores extras or we keep it out if not requested.
    // User requested: experience, image, name, skill, description.

    if (state.logo) {
      formData.append('image', state.logo);
    } else {
      // Handle case where logo is missing if required
      console.warn('Logo image is missing!');
      // In a real app we might show an error or require it in Step 3
    }

    const result = await shopService.createShop(formData);

    if (result.success) {
      console.log('Shop Created Successfully:', result);
      if (typeof window !== 'undefined') {
        localStorage.setItem('hojre_created', 'true');
        // Persist new Hojre data into the user object for immediate dashboard reflection
        const storedUser = localStorage.getItem('user_data');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            // Store the new cell. If it's a student login, cell is usually on the user object.
            if (userData.user) {
              userData.user.cell = result.data;
            } else {
              userData.cell = result.data;
            }
            localStorage.setItem('user_data', JSON.stringify(userData));
          } catch (e) {
            console.error('Failed to update user_data with new cell', e);
          }
        }
      }
      router.push('/StudentDashboard/hojreCreation/success');
    } else {
      console.error('Shop Creation Failed:', result.message);
      // Optionally show toast error here
      alert(result.message || 'خطا در ساخت حجره');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center font-sans pb-24">
      {/* Header */}
      <div className="w-full max-w-md px-4 pt-4 flex flex-col items-center gap-4">
        <div className="w-full flex justify-between items-center relative h-11">
          <Link href="/StudentDashboard/hojreCreation/step3" className="p-1">
            <ChevronRight className="w-6 h-6 text-[#222831] rotate-180" />
          </Link>
          <div className="text-[#0D0D12] text-xl font-semibold font-['PeydaWeb'] leading-snug">
            ساخت حجره
          </div>
        </div>

        {/* Steps Indicator: Step 3 Active */}
        <div className="w-full border-b border-[#DFE1E7] py-5 flex items-center gap-4 overflow-x-auto no-scrollbar px-4">
          {/* Step 3 (Active - Yellow) */}
          <div
            ref={activeStepRef}
            className="flex justify-start items-center gap-2 shrinks-0 whitespace-nowrap"
          >
            <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
              دسته بندی و توانمندی ها
            </div>
            <div className="w-6 h-6 bg-[#FDD00A] rounded-full flex items-center justify-center text-white text-sm font-bold font-['PeydaFaNum']">
              3
            </div>
          </div>

          {/* Dotted Line */}
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />

          {/* Step 2 (Completed - Gray) */}
          <div className="flex justify-start items-center gap-2 shrink-0 whitespace-nowrap opacity-50">
            <div className="text-[#818898] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
              هویت بصری و عمومی
            </div>
            <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center text-white text-sm font-bold font-['PeydaFaNum']">
              2
            </div>
          </div>

          {/* Dotted Line */}
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />

          {/* Step 1 (Completed - Gray) */}
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
        {/* Work Category (Select) */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <label className="text-right text-[#666D80] text-sm font-semibold font-medium leading-tight tracking-wide">
              راسته کاری
            </label>
          </div>
          <Controller
            control={control}
            name="workCategory"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                <SelectTrigger className="h-[52px] w-full bg-white rounded-xl border border-[#DFE1E7] text-right font-medium text-[#1A1C1E]">
                  <SelectValue
                    placeholder="مثلاً: پوشاک، کالای دیجیتال، مواد غذایی"
                    className="placeholder:text-[#DFE1E7] placeholder:font-medium"
                  />
                </SelectTrigger>
                <SelectContent className="font-medium" align="end">
                  <SelectItem value="clothes" className="font-medium">
                    پوشاک
                  </SelectItem>
                  <SelectItem value="digital" className="font-medium">
                    کالای دیجیتال
                  </SelectItem>
                  <SelectItem value="food" className="font-medium">
                    مواد غذایی
                  </SelectItem>
                  <SelectItem value="art" className="font-medium">
                    صنایع دستی
                  </SelectItem>
                  <SelectItem value="services" className="font-medium">
                    خدمات
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.workCategory && (
            <span className="text-red-500 text-xs text-right font-medium">
              {errors.workCategory.message}
            </span>
          )}
        </div>

        {/* Abilities (Input) */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <label className="text-right text-[#666D80] text-sm font-semibold font-medium leading-tight tracking-wide">
              توانمندی ها
            </label>
          </div>
          <Input
            {...register('abilities')}
            placeholder="مثلاً: دوخت، برش، طراحی و ..."
            className="h-[52px] bg-white rounded-xl border border-[#DFE1E7] text-right placeholder:text-[#DFE1E7] placeholder:font-medium text-[#1A1C1E] font-medium"
            dir="rtl"
          />
          {errors.abilities && (
            <span className="text-red-500 text-xs text-right font-medium">
              {errors.abilities.message}
            </span>
          )}
        </div>

        {/* Experience (Input with Suffix) */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <label className="text-right text-[#666D80] text-sm font-semibold font-medium leading-tight tracking-wide">
              تجربه در راسته کاری
            </label>
          </div>
          <div className="relative w-full h-[52px]">
            <input
              {...register('experience')}
              type="number"
              className="w-full h-full bg-white rounded-xl border border-[#DFE1E7] text-right pr-6 pl-[60px] placeholder:text-[#DFE1E7] text-[#1A1C1E] font-['PeydaFaNum'] font-medium outline-none focus:ring-1 focus:ring-ring"
              placeholder="0"
              dir="ltr"
            />

            {/* Suffix Container (Left aligned) */}
            <div className="absolute top-0 left-0 h-full flex items-center pl-4 gap-3">
              {/* Suffix Text */}
              <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] tracking-wide">
                سال
              </div>
              {/* Separator Line */}
              <div className="w-[1px] h-6 bg-[#DFE1E7]" />
            </div>
          </div>
          {errors.experience && (
            <span className="text-red-500 text-xs text-right font-medium">
              {errors.experience.message}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="w-full flex gap-4 mt-auto mb-4">
          <button
            type="button"
            onClick={() => router.push('/StudentDashboard/hojreCreation/step3')}
            className="flex-1 h-14 rounded-xl border border-[#DFE1E7] flex justify-center items-center text-[#1A1C1E] text-lg font-semibold font-medium hover:bg-gray-50 transition-colors"
          >
            قبلی
          </button>

          <button
            type="submit"
            className="w-[279px] h-14 bg-[#FDD00A] active:bg-[#eac009] rounded-xl flex justify-center items-center text-[#1A1C1E] text-lg font-semibold font-medium transition-colors"
          >
            ساخت حجره
          </button>
        </div>
      </form>
    </div>
  );
}

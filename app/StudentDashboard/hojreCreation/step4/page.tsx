'use client';

import React from 'react';
import { ChevronRight, ChevronDown, Info } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WorkCategoryGuideModal } from './WorkCategoryGuideModal';
import { AbilitiesGuideModal } from './AbilitiesGuideModal';
import { ExperienceGuideModal } from './ExperienceGuideModal';

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
    }),
});

// Explicitly define the type to match the transformed output
type FormValues = {
  workCategory: string;
  abilities: string;
  experience: number | string;
};

import { useShopCreation } from '../context/ShopCreationContext';
import { shopService } from '../../../services/student/shopService';

// ... (keep default imports)

export default function ShopCategoryPage() {
  const router = useRouter();
  const activeStepRef = React.useRef<HTMLDivElement>(null);
  const { state, updateState } = useShopCreation();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [experienceUnit, setExperienceUnit] = React.useState<'سال' | 'ماه'>('سال');
  const [isWorkCategoryGuideOpen, setIsWorkCategoryGuideOpen] = React.useState(false);
  const [isAbilitiesGuideOpen, setIsAbilitiesGuideOpen] = React.useState(false);
  const [isExperienceGuideOpen, setIsExperienceGuideOpen] = React.useState(false);

  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      experience: '',
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const responseData = result.data as any;
            const newImage = responseData?.image || responseData?.logo;

            if (userData.user) {
              userData.user.cell = result.data;
              if (newImage) {
                userData.user.profile_image = newImage;
              }
            } else {
              userData.cell = result.data;
              if (newImage) {
                userData.profile_image = newImage;
              }
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
      toast.error(result.message || 'خطا در ساخت حجره');
    }
  };

  const handleBack = () => {
    const values = getValues();
    updateState({
      workCategory: values.workCategory,
      skill: values.abilities,
      experience: values.experience === '' ? 0 : Number(values.experience),
    });
    router.push('/StudentDashboard/hojreCreation/step3');
  };

  return (
    <>
    <WorkCategoryGuideModal isOpen={isWorkCategoryGuideOpen} onClose={() => setIsWorkCategoryGuideOpen(false)} />
    <AbilitiesGuideModal isOpen={isAbilitiesGuideOpen} onClose={() => setIsAbilitiesGuideOpen(false)} />
    <ExperienceGuideModal isOpen={isExperienceGuideOpen} onClose={() => setIsExperienceGuideOpen(false)} />
    <div className="w-full min-h-screen bg-white flex flex-col items-center font-sans pb-24">
      {/* Header */}
      <div className="w-full max-w-md px-4 pt-4 flex flex-col items-center gap-4">
        <div className="w-full flex justify-between items-center relative h-11">
          <div className="w-6 h-6" /> {/* Placeholder */}
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
            <div className="w-6 h-6 bg-[#FDD00A] rounded-full flex items-center justify-center text-white text-sm font-num-medium">
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
            <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center text-white text-sm font-num-medium">
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
            <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center text-white text-sm font-num-medium">
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
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setIsWorkCategoryGuideOpen(true)}
              className="flex items-center gap-1 text-[#3C5A5D] text-xs font-semibold font-['PeydaWeb'] hover:opacity-80 transition-opacity"
            >
              <span>راسته کاری چیه؟</span>
              <Info className="w-3.5 h-3.5" />
            </button>
            <label className="text-right text-[#666D80] text-sm font-semibold font-medium leading-tight tracking-wide">
              راسته کاری
            </label>
          </div>
          <Controller
            control={control}
            name="workCategory"
            render={({ field }) => (
              <div className="relative">
                <div
                  className={`flex items-center justify-between px-3 h-[52px] w-full bg-white rounded-xl border border-[#DFE1E7] font-medium cursor-pointer ${
                    field.value ? 'text-[#1A1C1E]' : 'text-[#DFE1E7]'
                  }`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <ChevronDown className={`w-5 h-5 text-[#818898] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className={`truncate flex-1 text-right ${field.value ? '' : 'text-[#DFE1E7]'}`}>
                    {field.value === 'clothes'
                      ? 'پوشاک'
                      : field.value === 'digital'
                      ? 'کالای دیجیتال'
                      : field.value === 'food'
                      ? 'مواد غذایی'
                      : field.value === 'art'
                      ? 'صنایع دستی'
                      : field.value === 'services'
                      ? 'خدمات'
                      : '...مثلاً: گرافیک، صنایع چوب، حسابداری، کامپیوتر'}
                  </span>
                </div>

                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#DFE1E7] rounded-xl shadow-lg z-20 overflow-hidden font-medium max-h-60 overflow-y-auto">
                      {[
                        { val: 'clothes', label: 'پوشاک' },
                        { val: 'digital', label: 'کالای دیجیتال' },
                        { val: 'food', label: 'مواد غذایی' },
                        { val: 'art', label: 'صنایع دستی' },
                        { val: 'services', label: 'خدمات' },
                      ].map((opt) => (
                        <div
                          key={opt.val}
                          className="px-3 py-3 text-right hover:bg-gray-50 cursor-pointer text-[#1A1C1E] border-b border-gray-100 last:border-none"
                          onClick={() => {
                            field.onChange(opt.val);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
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
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setIsAbilitiesGuideOpen(true)}
              className="flex items-center gap-1 text-[#3C5A5D] text-xs font-semibold font-['PeydaWeb'] hover:opacity-80 transition-opacity"
            >
              <span>کدوماش رو بنویسم؟</span>
              <Info className="w-3.5 h-3.5" />
            </button>
            <label className="text-right text-[#666D80] text-sm font-semibold font-medium leading-tight tracking-wide">
           مهارت‌های اصلی تو 
            </label>
          </div>
          <Input
            {...register('abilities')}
            placeholder="مثلاً: طراحی لوگو، معرق‌کاری، برنامه‌نویسی پایتون، دوخت مانتو..."
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
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setIsExperienceGuideOpen(true)}
              className="flex items-center gap-1 text-[#3C5A5D] text-xs font-semibold font-['PeydaWeb'] hover:opacity-80 transition-opacity"
            >
              <span>تجربه ندارم، چی بنویسم؟</span>
              <Info className="w-3.5 h-3.5" />
            </button>
            <label className="text-right text-[#666D80] text-sm font-semibold font-medium leading-tight tracking-wide">
              چقدر تو این زمینه تجربه داری؟
            </label>
          </div>
          <div className="relative w-full h-[52px]">
            <input
              {...register('experience', {
                onChange: (e) => {
                  const value = e.target.value;
                  // Remove leading zeros
                  if (value.length > 1 && value.startsWith('0')) {
                    e.target.value = value.replace(/^0+/, '');
                  }
                  // If just "0", clear it so it doesn't start with 0
                  if (value === '0') {
                    e.target.value = '';
                  }
                },
              })}
              type="number"
              className="w-full h-full bg-white rounded-xl border border-[#DFE1E7] text-right pr-6 pl-[100px] placeholder:text-[#DFE1E7] text-[#1A1C1E] font-num-medium outline-none focus:ring-1 focus:ring-ring"
              dir="ltr"
              placeholder="مثلاً: ۲"
            />

            {/* Suffix Container (Left aligned) */}
            <div className="absolute top-0 left-0 h-full flex items-center pl-2 gap-1">
              {/* Unit Toggle */}
              <div className="flex items-center bg-[#F4F4F4] rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setExperienceUnit('ماه')}
                  className={`px-2 py-1 rounded-md text-xs font-semibold font-['PeydaWeb'] transition-colors ${
                    experienceUnit === 'ماه'
                      ? 'bg-white text-[#1A1C1E] shadow-sm'
                      : 'text-[#888B90]'
                  }`}
                >
                  ماه
                </button>
                <button
                  type="button"
                  onClick={() => setExperienceUnit('سال')}
                  className={`px-2 py-1 rounded-md text-xs font-semibold font-['PeydaWeb'] transition-colors ${
                    experienceUnit === 'سال'
                      ? 'bg-white text-[#1A1C1E] shadow-sm'
                      : 'text-[#888B90]'
                  }`}
                >
                  سال
                </button>
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
        <div className="w-full flex gap-3 mt-auto mb-4">
          <button
            type="button"
            onClick={handleBack}
            className="w-[100px] h-14 rounded-xl border border-[#DFE1E7] flex justify-center items-center text-[#1A1C1E] text-lg font-semibold hover:bg-gray-50 transition-colors shrink-0"
          >
           <span className="text-base sm:text-lg">مرحله قبل</span>
          </button>

          <button
            type="submit"
            className="flex-1 h-14 bg-[#FDD00A] active:bg-[#eac009] rounded-xl flex justify-center items-center text-[#1A1C1E] text-lg font-semibold transition-colors"
          >
            <span className="text-base sm:text-lg">راه‌اندازی حجره </span>
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

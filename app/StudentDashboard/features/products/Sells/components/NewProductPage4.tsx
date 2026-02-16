import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { ChevronRight, X } from 'lucide-react';
import { AddProductFormState } from '../types';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

interface NewProductPage4Props {
  onClose: () => void;
  onNext: () => void;
  onStepClick: (step: string) => void;
  formData: AddProductFormState;
  updateFormData: (data: Partial<AddProductFormState>) => void;
}

import { z } from 'zod';

const inventorySchema = z.object({
  stock: z.string().min(1, 'لطفا موجودی محصول را وارد کنید'),
  maxOrderQuantity: z.string().min(1, 'لطفا حداکثر تعداد سفارش را وارد کنید'),
  lowStockWarning: z.string().min(1, 'لطفا هشدار موجودی را وارد کنید'),
});

export function NewProductPage4({
  onClose,
  onNext,
  onStepClick,
  formData,
  updateFormData,
}: NewProductPage4Props) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-scroll active step to center on mount
  useEffect(() => {
    if (progressBarRef.current && activeStepRef.current) {
      const progressBar = progressBarRef.current;
      const activeStep = activeStepRef.current;

      const scrollLeft =
        activeStep.offsetLeft - progressBar.clientWidth / 2 + activeStep.clientWidth / 2;
      progressBar.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, []);

  const handleNext = () => {
    setErrors({});
    try {
      const result = inventorySchema.safeParse({
        stock: formData.stock || '',
        maxOrderQuantity: formData.maxOrderQuantity || '',
        lowStockWarning: formData.lowStockWarning || '',
      });

      if (!result.success) {
        const formattedErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          formattedErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(formattedErrors);
        return;
      }

      onNext();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('خطای شبکه رخ داده است');
      } else {
        toast.error((error as Error).message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#0D0D12]/40 backdrop-blur-[1px]" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-[375px] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
          <div
            className="w-10 h-10 relative overflow-hidden rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-[#0D0D12]" />
          </div>
          <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
            افزودن محصول جدید
          </div>
        </div>

        {/* Progress Bar */}
        <div
          ref={progressBarRef}
          className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-end items-center gap-3 overflow-x-auto no-scrollbar"
          dir="ltr"
        >
          <StepItem
            step="6"
            label="تائید نهایی"
            isActive={false}
            onClick={() => onStepClick('step6')}
          />
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
          <StepItem
            step="5"
            label="دسته بندی و برچسب ها"
            isActive={false}
            onClick={() => onStepClick('step5')}
          />
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
          <StepItem
            step="4"
            label="موجودی"
            isActive={true}
            onClick={() => {}}
            ref={activeStepRef}
          />
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
          <StepItem
            step="3"
            label="قیمت گذاری"
            isActive={false}
            isCompleted={true}
            onClick={() => onStepClick('step3')}
          />
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
          <StepItem
            step="2"
            label="ویژگی ها"
            isActive={false}
            isCompleted={true}
            onClick={() => onStepClick('step2')}
          />
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
          <StepItem
            step="1"
            label="اطلاعات پایه"
            isActive={false}
            isCompleted={true}
            onClick={() => onStepClick('step1')}
          />
        </div>

        {/* Form Fields */}
        <div className="w-full flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
          {/* Inventory */}
          <div className="flex flex-col gap-2">
            <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
              موجودی
            </div>
            <div
              className={`w-full h-[52px] px-3 bg-white rounded-xl border ${errors.stock ? 'border-red-500' : 'border-[#DFE1E7]'} flex items-center gap-2`}
            >
              <div className="w-11 text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb']">
                عدد
              </div>
              <div className="w-[1px] h-full bg-[#DFE1E7]"></div>
              <input
                type="text"
                className="flex-1 h-full border-none outline-none text-right dir-rtl text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] placeholder:text-[#DFE1E7] bg-transparent"
                placeholder="۲۰۰"
                value={formData.stock || ''}
                onChange={(e) => {
                  updateFormData({ stock: e.target.value });
                  if (errors.stock) {
                    setErrors({ ...errors, stock: '' });
                  }
                }}
              />
            </div>
            {errors.stock && (
              <span className="text-right text-red-500 text-xs font-medium font-['PeydaWeb'] mt-1">
                {errors.stock}
              </span>
            )}
          </div>

          {/* Max Order Quantity */}
          <div className="flex flex-col gap-2">
            <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
              حداکثر تعداد در سفارش
            </div>
            <div
              className={`w-full h-[52px] px-3 bg-white rounded-xl border ${errors.maxOrderQuantity ? 'border-red-500' : 'border-[#DFE1E7]'} flex items-center gap-2`}
            >
              <div className="w-11 text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb']">
                عدد
              </div>
              <div className="w-[1px] h-full bg-[#DFE1E7]"></div>
              <input
                type="text"
                className="flex-1 h-full border-none outline-none text-right dir-rtl text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] placeholder:text-[#DFE1E7] bg-transparent"
                placeholder="۱۰"
                value={formData.maxOrderQuantity || ''}
                onChange={(e) => {
                  updateFormData({ maxOrderQuantity: e.target.value });
                  if (errors.maxOrderQuantity) {
                    setErrors({ ...errors, maxOrderQuantity: '' });
                  }
                }}
              />
            </div>
            {errors.maxOrderQuantity && (
              <span className="text-right text-red-500 text-xs font-medium font-['PeydaWeb'] mt-1">
                {errors.maxOrderQuantity}
              </span>
            )}
          </div>

          {/* Low Stock Warning */}
          <div className="flex flex-col gap-2">
            <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
              ایجاد یادآوری در موجودی
            </div>
            <div
              className={`w-full h-[52px] px-3 bg-white rounded-xl border ${errors.lowStockWarning ? 'border-red-500' : 'border-[#DFE1E7]'} flex items-center gap-2`}
            >
              <div className="w-11 text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb']">
                عدد
              </div>
              <div className="w-[1px] h-full bg-[#DFE1E7]"></div>
              <input
                type="text"
                className="flex-1 h-full border-none outline-none text-right dir-rtl text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] placeholder:text-[#DFE1E7] bg-transparent"
                placeholder="۱۰"
                value={formData.lowStockWarning || ''}
                onChange={(e) => {
                  updateFormData({ lowStockWarning: e.target.value });
                  if (errors.lowStockWarning) {
                    setErrors({ ...errors, lowStockWarning: '' });
                  }
                }}
              />
            </div>
            {errors.lowStockWarning && (
              <span className="text-right text-red-500 text-xs font-medium font-['PeydaWeb'] mt-1">
                {errors.lowStockWarning}
              </span>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="w-full p-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10 mt-auto">
          <button
            className="w-[57px] h-[57px] rounded-xl border border-[#DCE4E8] flex justify-center items-center hover:bg-gray-50 transition-colors"
            onClick={() => onStepClick('step3')}
          >
            <ChevronRight className="w-6 h-6 text-[#1A1C1E] rotate-180" />
          </button>
          <button
            onClick={handleNext}
            className="flex-1 h-[57px] bg-[#FDD00A] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-xl flex justify-center items-center hover:opacity-90 transition-opacity"
          >
            <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">
              ادامه
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Helpers
const StepItem = React.forwardRef<
  HTMLDivElement,
  {
    step: string;
    label: string;
    isActive: boolean;
    onClick?: () => void;
  }
>(({ step, label, isActive, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer"
      onClick={onClick}
    >
      <span
        className={`text-sm font-medium font-['PeydaWeb'] leading-[21px] tracking-wide whitespace-nowrap ${isActive ? 'text-[#0D0D12]' : 'text-[#818898]'}`}
      >
        {label}
      </span>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-['PeydaFaNum'] leading-[21px] tracking-wide ${isActive ? 'bg-[#FFD369] text-white' : 'bg-[#DFE1E7] text-white'}`}
      >
        {toFarsiNumber(step)}
      </div>
    </div>
  );
});

StepItem.displayName = 'StepItem';

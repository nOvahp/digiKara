import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { ChevronRight, X } from 'lucide-react';
import { AddProductFormState } from '../types';

interface NewProductPage4Props {
  onClose: () => void;
  onNext: () => void;
  onStepClick: (step: string) => void;
  formData: AddProductFormState;
  updateFormData: (data: Partial<AddProductFormState>) => void;
  maxStep: number;
}

import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { ProductStepper } from './shared/ProductStepper';

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
  maxStep
}: NewProductPage4Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        toast.error('خطای غیرمنتظره‌ای در اعتبارسنجی رخ داده است');
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
        <ProductStepper currentStep="step4" onStepClick={onStepClick} maxStep={maxStep} />

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
              <Input
                type="text"
                className="flex-1 h-full border-none outline-none text-right dir-rtl text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] placeholder:text-[#DFE1E7] bg-transparent shadow-none focus-visible:ring-0 px-0"
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
              <Input
                type="text"
                className="flex-1 h-full border-none outline-none text-right dir-rtl text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] placeholder:text-[#DFE1E7] bg-transparent shadow-none focus-visible:ring-0 px-0"
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
              <Input
                type="text"
                className="flex-1 h-full border-none outline-none text-right dir-rtl text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] placeholder:text-[#DFE1E7] bg-transparent shadow-none focus-visible:ring-0 px-0"
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
            className="w-[100px] h-[57px] rounded-xl border border-[#DCE4E8] flex justify-center items-center hover:bg-gray-50 transition-colors"
            onClick={() => onStepClick('step3')}
          >
             <span className="text-[#1A1C1E] text-base font-medium font-['PeydaWeb']">
              بازگشت
            </span>
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


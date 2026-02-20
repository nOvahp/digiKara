import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { ProductPreviewCard } from './shared/ProductPreviewCard';
import { ProductStepper } from './shared/ProductStepper';
import { AddProductFormState } from '../types';

import { AlertTriangle, RefreshCw } from 'lucide-react'; // Add imports

interface NewProductPage6Props {
  onClose: () => void;
  onNext: () => void;
  onStepClick: (step: string) => void;
  formData: AddProductFormState;
  maxStep: number;
  error?: string | null;
  onErrorReset?: () => void;
  isLoading?: boolean;
}

export function NewProductPage6({
  onClose,
  onNext,
  onStepClick,
  formData,
  maxStep,
  error,
  onErrorReset,
  isLoading,
}: NewProductPage6Props) {
  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[#0D0D12]/40 backdrop-blur-[1px]" onClick={onClose} />
        <div className="relative w-[375px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
           {/* Header */}
           <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
            <div
              className="w-10 h-10 relative overflow-hidden rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              <X className="w-6 h-6 text-[#0D0D12]" />
            </div>
            <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
              خطا در ثبت محصول
            </div>
          </div>

          <div className="p-8 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-2">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-[#0D0D12] text-lg font-bold font-['PeydaWeb']">
              متاسفانه مشکلی پیش آمده!
            </h3>
            <p className="text-[#666D80] text-sm font-medium font-['PeydaWeb'] leading-6">
              {error}
            </p>
            <p className="text-[#666D80] text-xs font-light font-['PeydaWeb'] opacity-80">
              لطفا اتصال اینترنت خود را بررسی کنید و دوباره تلاش نمایید.
            </p>
          </div>

          <div className="p-5 border-t border-[#DFE1E7] bg-white flex flex-col gap-3">
            <button
              onClick={onErrorReset} // This should retry or go back to preview to retry
              className="w-full h-[48px] bg-[#FDD00A] rounded-xl flex justify-center items-center gap-2 hover:bg-[#eac009] transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-[#1A1C1E]" />
              <span className="text-[#1A1C1E] text-base font-semibold font-['PeydaWeb']">تلاش مجدد</span>
            </button>
            <button
               onClick={() => onStepClick('step5')}
               className="w-full h-[48px] bg-white border border-[#DFE1E7] rounded-xl flex justify-center items-center text-[#666D80] font-medium hover:bg-gray-50 transition-colors"
            >
              بازگشت و ویرایش
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#0D0D12]/40 backdrop-blur-[1px]" onClick={onClose} />

      {/* Modal Content */}
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
        <ProductStepper currentStep="step6" onStepClick={onStepClick} maxStep={maxStep} />

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto w-full px-5 py-5 flex flex-col gap-4">
          <ProductPreviewCard product={formData} />
        </div>

        {/* Footer Buttons */}
        <div className="w-full p-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10 mt-auto">
          <button
            className="w-[100px] h-[57px] rounded-xl border border-[#DCE4E8] flex justify-center items-center hover:bg-gray-50 transition-colors"
            onClick={() => onStepClick('step5')}
          >
            <span className="text-[#1A1C1E] text-base font-medium font-['PeydaWeb']">
              بازگشت
            </span>
          </button>
          <button
            onClick={onNext}
            disabled={isLoading}
            className={`flex-1 h-[57px] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-xl flex justify-center items-center transition-all duration-200 ${
              isLoading
                ? 'bg-[#E5E7EB] opacity-70 cursor-not-allowed'
                : 'bg-[#FDD00A] hover:opacity-90'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#666D80] animate-spin" />
                <span className="text-center text-[#666D80] text-lg font-semibold font-['PeydaWeb']">
                  در حال ثبت...
                </span>
              </div>
            ) : (
              <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">
                تائید
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Helpers


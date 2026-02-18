import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { ProductPreviewCard } from './shared/ProductPreviewCard';
import { ProductStepper } from './shared/ProductStepper';
import { AddProductFormState } from '../types';

interface NewProductPage6Props {
  onClose: () => void;
  onNext: () => void;
  onStepClick: (step: string) => void;
  formData: AddProductFormState;
  maxStep: number;
}

export function NewProductPage6({ onClose, onNext, onStepClick, formData, maxStep }: NewProductPage6Props) {


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
            className="w-[57px] h-[57px] rounded-xl border border-[#DCE4E8] flex justify-center items-center hover:bg-gray-50 transition-colors"
            onClick={() => onStepClick('step5')}
          >
            <ChevronRight className="w-6 h-6 text-[#1A1C1E] rotate-180" />
          </button>
          <button
            onClick={onNext}
            className="flex-1 h-[57px] bg-[#FDD00A] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-xl flex justify-center items-center hover:opacity-90 transition-opacity"
          >
            <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">
              تائید
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Helpers


import React from 'react';
import { X } from 'lucide-react';
import { PricingForm } from './shared/PricingForm';
import { toast } from 'sonner';
import axios from 'axios';

interface NewProductPage3Props {
    onClose: () => void;
    onNext: () => void;
    onStepClick: (step: string) => void;
    formData: any;
    updateFormData: (data: any) => void;
}

export function NewProductPage3({ onClose, onNext, onStepClick, formData, updateFormData }: NewProductPage3Props) {
    const handleNext = () => {
        try {
            if (!formData.price || formData.price === '0') throw new Error("لطفا قیمت کالا را وارد کنید");
            // Add other mandatory fields if any
            
            onNext();
        } catch (error) {
             if (axios.isAxiosError(error)) {
                toast.error("خطای شبکه رخ داده است");
            } else {
                toast.error((error as Error).message);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0D0D12] opacity-40 backdrop-blur-[1px]" 
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-[375px] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
                    <div className="w-10 h-10 relative overflow-hidden rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50" onClick={onClose}>
                        <div className="absolute w-6 h-6 overflow-hidden flex items-center justify-center">
                             <X className="w-5 h-5 text-[#0D0D12]" />
                        </div>
                    </div>
                    <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
                        افزودن محصول جدید
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto w-full">
                    {/* Progress Steps */}
                    <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex items-center gap-4 overflow-x-auto" dir="rtl">
                         <StepItem number="1" label="اطلاعات پایه" state="completed" onClick={() => onStepClick('step1')} />
                         <StepItem number="2" label="قیمت گذاری" state="active" onClick={() => onStepClick('step3')} />
                         <StepItem number="3" label="موجودی" state="inactive" onClick={() => onStepClick('step4')} />
                         <StepItem number="4" label="تائید نهایی" state="inactive" onClick={() => onStepClick('step6')} />
                    </div>

                    {/* Form Fields - Replaced with Shared Component */}
                    <div className="w-full px-5 py-5 flex flex-col gap-4" dir="rtl">
                        {/* Pricing Type Toggle - Kept here as it feels specific to the wizard step */}
                        <div className="w-full h-9 p-0.5 bg-[#F6F6F6] rounded-lg border border-[#D7D8DA] flex items-center mb-2">
                             <div className="flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer text-[#0A0A0A] text-sm font-semibold font-['PeydaWeb'] opacity-50">
                                 دارای چند قیمت
                             </div>
                             <div className="flex-1 h-[29px] px-3 py-1 bg-[#FFDD8A] shadow-sm rounded-md border border-[#D7D8DA] flex justify-center items-center gap-2.5 cursor-pointer text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">
                                 تک قیمتی
                             </div>
                        </div>

                        <PricingForm 
                            values={formData}
                            onChange={(updates) => updateFormData(updates)} 
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full px-5 py-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10 mt-auto">
                     <button 
                        onClick={handleNext}
                        className="flex-1 h-10 px-4 py-2 bg-gradient-to-t from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.15)] bg-[#0A33FF] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#0A33FF] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
                     >
                         <span className="text-center text-white text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">ادامه</span>
                     </button>
                </div>
            </div>
        </div>
    );
}

// Helpers
function StepItem({ number, label, state, onClick }: { number: string, label: string, state: 'active' | 'completed' | 'inactive', onClick?: () => void }) {
    let circleClass = 'bg-[#DFE1E7] text-white';
    let textClass = 'text-[#818898] font-semibold';

    if (state === 'active') {
        circleClass = 'bg-[#FFD369] text-[#393E46]'; 
        textClass = 'text-[#0D0D12] font-semibold'; 
    } else if (state === 'completed') {
        circleClass = 'bg-[#DFE1E7] text-white'; 
        textClass = 'text-[#C1C7D0] font-semibold'; 
    }

    return (
        <div className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity" onClick={onClick}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-num-medium leading-[21px] tracking-wide ${circleClass}`}>
                {number}
            </div>
            <span className={`text-sm font-['PeydaWeb'] leading-[21px] tracking-wide whitespace-nowrap ${textClass}`}>
                {label}
            </span>
        </div>
    );
}

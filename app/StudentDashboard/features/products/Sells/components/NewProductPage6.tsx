import React, { useRef, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { ProductPreviewCard } from './shared/ProductPreviewCard';

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

interface NewProductPage6Props {
    onClose: () => void;
    onNext: () => void;
    onStepClick: (step: string) => void;
    formData: any;
}

export function NewProductPage6({ onClose, onNext, onStepClick, formData }: NewProductPage6Props) {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const activeStepRef = useRef<HTMLDivElement>(null);
    
    // Auto-scroll active step to center on mount
    useEffect(() => {
        if (progressBarRef.current && activeStepRef.current) {
            const progressBar = progressBarRef.current;
            const activeStep = activeStepRef.current;
            const scrollLeft = activeStep.offsetLeft - (progressBar.clientWidth / 2) + (activeStep.clientWidth / 2);
            progressBar.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Overlay */}
            <div 
                className="absolute inset-0 bg-[#0D0D12]/40 backdrop-blur-[1px]" 
                onClick={onClose}
            />

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
                <div 
                    ref={progressBarRef} 
                    className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-end items-center gap-3 overflow-x-auto no-scrollbar" 
                    dir="ltr"
                >
                     <StepItem step="6" label="تائید نهایی" isActive={true} onClick={() => {}} ref={activeStepRef} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     <StepItem step="5" label="دسته بندی و برچسب ها" isActive={false} isCompleted={true} onClick={() => onStepClick('step5')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     <StepItem step="4" label="موجودی" isActive={false} isCompleted={true} onClick={() => onStepClick('step4')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     <StepItem step="3" label="قیمت گذاری" isActive={false} isCompleted={true} onClick={() => onStepClick('step3')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     <StepItem step="2" label="ویژگی ها" isActive={false} isCompleted={true} onClick={() => onStepClick('step2')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     <StepItem step="1" label="اطلاعات پایه" isActive={false} isCompleted={true} onClick={() => onStepClick('step1')} />
                </div>

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
                        <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">تائید</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

// Helpers
const StepItem = React.forwardRef<HTMLDivElement, { step: string, label: string, isActive: boolean, isCompleted?: boolean, onClick?: () => void }>(
    ({ step, label, isActive, isCompleted, onClick }, ref) => {
        return (
            <div 
                ref={ref}
                className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer"
                onClick={onClick}
            >
                 <span className={`text-sm font-medium font-['PeydaWeb'] leading-[21px] tracking-wide whitespace-nowrap ${isActive ? "text-[#0D0D12]" : "text-[#818898]"}`}>
                    {label}
                </span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-['PeydaFaNum'] leading-[21px] tracking-wide ${isActive ? 'bg-[#FFD369] text-white' : 'bg-[#DFE1E7] text-white'}`}>
                    {toFarsiNumber(step)}
                </div>
            </div>
        );
    }
);

StepItem.displayName = 'StepItem';

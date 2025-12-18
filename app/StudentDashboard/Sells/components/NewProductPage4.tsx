import React from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

interface NewProductPage4Props {
    onClose: () => void;
    onNext: () => void;
    onStepClick: (step: string) => void;
    formData: any;
    updateFormData: (data: any) => void;
}

export function NewProductPage4({ onClose, onNext, onStepClick, formData, updateFormData }: NewProductPage4Props) {
    const handleNext = () => {
        try {
            if (!formData.stock) throw new Error("لطفا موجودی محصول را وارد کنید");
            
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
                         <StepItem number="2" label="قیمت گذاری" state="completed" onClick={() => onStepClick('step3')} />
                         <StepItem number="3" label="موجودی" state="active" onClick={() => onStepClick('step4')} />
                         <StepItem number="4" label="تائید نهایی" state="inactive" onClick={() => onStepClick('step6')} />
                    </div>

                    {/* Form Fields */}
                    <div className="w-full px-5 py-5 flex flex-col gap-4" dir="rtl">
                        
                        {/* Inventory Count */}
                        <div className="w-full flex flex-col gap-2">
                             <Label text="موجودی" />
                             <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex items-center gap-2">
                                 <input 
                                     type="text" 
                                     value={formData.stock}
                                     placeholder="تعداد موجودی"
                                     onChange={(e) => updateFormData({ stock: e.target.value })}
                                     className="flex-1 h-full bg-transparent border-none outline-none text-[#0D0D12] text-base font-semibold font-num-medium text-right tracking-wider placeholder:text-gray-400" 
                                     dir="rtl"
                                 />
                                 <div className="w-px h-6 bg-[#DFE1E7]"></div>
                                 <div className="w-11 text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] h-full flex items-center justify-center">
                                     عدد
                                 </div>
                             </div>
                        </div>

                        {/* Reminder Count */}
                        <div className="w-full flex flex-col gap-2">
                             <Label text="ایجاد یادآوری در موجودی" />
                             <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex items-center gap-2">
                                 <input 
                                     type="text" 
                                     value={formData.reminder}
                                     placeholder={`حداقل موجودی (مثلا ${toFarsiNumber(10)})`}
                                     onChange={(e) => updateFormData({ reminder: e.target.value })}
                                     className="flex-1 h-full bg-transparent border-none outline-none text-[#0D0D12] text-base font-semibold font-num-medium text-right tracking-wider placeholder:text-gray-400" 
                                     dir="rtl"
                                 />
                                 <div className="w-px h-6 bg-[#DFE1E7]"></div>
                                 <div className="w-11 text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] h-full flex items-center justify-center">
                                     عدد
                                 </div>
                             </div>
                        </div>

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
        circleClass = 'bg-[#FFD369] text-white'; // Yellow active, white text per user snippet/image? Image shows white number.
        textClass = 'text-[#0D0D12] font-semibold'; // Black text
    } else if (state === 'completed') {
        circleClass = 'bg-[#DFE1E7] text-white'; 
        textClass = 'text-[#818898] font-semibold'; // Grey text 
    }

    return (
        <div className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity" onClick={onClick}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-num-medium leading-[21px] tracking-wide ${circleClass}`}>
                {toFarsiNumber(number)}
            </div>
            <span className={`text-sm font-['PeydaWeb'] leading-[21px] tracking-wide whitespace-nowrap ${textClass}`}>
                {label}
            </span>
        </div>
    );
}

function Label({ text }: { text: string }) {
    return (
        <div className="w-full text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
            {text}
        </div>
    );
}

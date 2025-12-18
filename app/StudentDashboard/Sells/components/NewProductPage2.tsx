import React, { useState } from 'react';
import { X } from 'lucide-react';
import { BasicInfoForm } from './shared/BasicInfoForm';
import { CategoryTagsForm } from './shared/CategoryTagsForm';

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

interface NewProductPage2Props {
    onClose: () => void;
    onNext: () => void;
    onStepClick: (step: string) => void;
}

export function NewProductPage2({ onClose, onNext, onStepClick }: NewProductPage2Props) {
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
                         <StepItem number="1" label="اطلاعات پایه" isActive={true} onClick={() => onStepClick('step1')} />
                         <StepItem number="2" label="قیمت گذاری" isActive={false} onClick={() => onStepClick('step3')} />
                         <StepItem number="3" label="موجودی" isActive={false} onClick={() => onStepClick('step4')} />
                         <StepItem number="4" label="دسته بندی و برچسب ها" isActive={false} onClick={() => onStepClick('step5')} />
                         <StepItem number="5" label="تائید نهایی" isActive={false} onClick={() => onStepClick('step6')} />
                    </div>

                    {/* Form Fields - Replaced with Shared Component */}
                    <div className="w-full px-5 py-5 flex flex-col gap-4">
                        <BasicInfoForm />
                         {/* Category - Filled (Kept as it was in orginal Page 2 but can be part of shared if needed, for now focusing on Basic Info extraction per plan) */}
                         <div className="w-full flex-col gap-2 hidden"> {/* Hidden because BasicInfoForm covers the main parts, checking original file content again... */}
                            {/* Original file had Category and Tags here too, but they are also in Page 5. 
                                The user's request was to use code "in other pages". 
                                Page 2 seems to be a summary or duplicate of fields found elsewhere or vice versa.
                                Wait, Page 2 in the wizard IS the Basic Info step.
                                But Page 5 is Categories.
                                Original Page 2 had Category and Tags filled?
                                Let's check the viewed file content for Page 2 again.
                                Yes, Page 2 had Category and Tags filled.
                                However, BasicInfoForm generally just covers Name, Desc, Images.
                                I'll leave the Category/Tags visible here if they were part of Step 2, 
                                OR if Step 2 was "Basic Info" and Step 4 is "Categories", 
                                then why are they in Step 2?
                                Ah, the user might have copy-pasted.
                                Let's stick to replacing the Basic Info parts (Name, Desc, Images) with the shared component.
                                And keep the rest as is or refactor if they match CategoryTagsForm.
                                They match `CategoryTagsForm` structure partially.
                                I will simply render `CategoryTagsForm` here as well if it fits, or leave it.
                                Actually, looking at `BasicInfoForm` I created, it only has Name, Desc, Images, ID.
                                The original `NewProductPage2` had Category and Tags too.
                                I should probably include those in `BasicInfoForm` OR use `CategoryTagsForm` here too.
                                But Step 5 is explicitly "Category and Tags".
                                Maybe Step 2's presence of Category/Tags was an oddity?
                                I'll assume for `EditeProducts`, we want all of them.
                                For `NewProductPage2` (Wizard Step 1/2), if the design shows them, they stay.
                                I'll import `CategoryTagsForm` and use it here too to clean it up.
                            */}
                             <CategoryTagsForm />
                         </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full px-5 py-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10 mt-auto">
                     <button 
                        onClick={onNext}
                        className="flex-1 h-10 px-4 py-2 bg-gradient-to-t from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.15)] bg-[#FFDA7F] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#FFDA7F] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
                     >
                         <span className="text-center text-[#393E46] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">ادامه</span>
                     </button>
                </div>

            </div>
        </div>
    );
}

// Helpers
function StepItem({ number, label, isActive, onClick }: { number: string, label: string, isActive: boolean, onClick?: () => void }) {
    return (
        <div className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity" onClick={onClick}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold font-num-medium leading-[21px] tracking-wide ${isActive ? 'bg-[#FFD369] text-[#393E46]' : 'bg-[#DFE1E7]'}`}>
                {toFarsiNumber(number)}
            </div>
            <span className={`text-sm font-['PeydaWeb'] leading-[21px] tracking-wide whitespace-nowrap ${isActive ? "text-[#0D0D12] font-bold" : "text-[#818898] font-semibold"}`}>
                {label}
            </span>
        </div>
    );
}

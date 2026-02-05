import React from 'react';
import { X, Check } from 'lucide-react';

interface NewProductPage7Props {
    onClose: () => void;
    onReset: () => void;
    onStepClick: (step: string) => void;
}

export function NewProductPage7({ onClose, onReset, onStepClick }: NewProductPage7Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#0D0D12] opacity-40 backdrop-blur-[1px]" 
                onClick={onClose}
            />

            {/* Modal Content - Based on User Design */}
            <div className="relative w-[375px] h-[834px] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden items-center">
                
                {/* Header */}
                <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
                    <div 
                        className="w-10 h-10 relative overflow-hidden rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors" 
                        onClick={onClose}
                    >
                        <div className="w-6 h-6 flex items-center justify-center">
                            <X className="w-5 h-5 text-[#0D0D12]" />
                        </div>
                    </div>
                    <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
                        افزودن محصول جدید
                    </div>
                </div>

                {/* Body Content */}
                <div className="flex-1 w-full flex flex-col justify-center items-center gap-6 px-4">
                    
                    {/* Illustration Circle */}
                    <div className="w-[120px] h-[120px] relative bg-[#FFDD89] rounded-full overflow-hidden flex items-center justify-center">
                        <div className="w-[75px] h-[75px] bg-[#FFB600] rounded-full overflow-hidden relative flex items-center justify-center">
                            {/* Graphic Elements from design (converted to tailwind/css) */}
                            {/* The user's code had specific outlines. Using simple divs to replicate the 'Package' look */}
                            <div className="relative w-8 h-8">
                                {/* Outer Box */}
                                <div className="absolute left-[3px] top-[3px] w-[26px] h-[26px] border-[2px] border-[#0D0D12] rounded-[1px]"></div>
                                {/* Inner Mark */}
                                <div className="absolute left-[11px] top-[12px] w-[10px] h-[8px] border-[2px] border-[#0D0D12] rounded-[1px]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    <div className="flex flex-col items-center gap-5 w-full">
                        <div className="text-center text-black text-[28px] font-semibold font-['PeydaWeb']">
                            با موفقیت افزوده شد
                        </div>
                        <div className="text-center text-black text-xs font-light font-['PeydaWeb'] w-[293px] leading-relaxed">
                            محصول پس از تائید مدرسه به انتشار عمومی درخواهد آمد.
                        </div>
                    </div>

                </div>

                {/* Footer Button */}
                <div className="w-full px-5 py-5 flex justify-center items-center gap-3.5 mb-5">
                     <button 
                        onClick={onReset}
                        className="w-full h-14 bg-[#FDD00A] rounded-xl flex justify-center items-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]"
                     >
                         <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb'] leading-normal">
                             افزودن محصول جدید
                         </span>
                     </button>
                </div>

            </div>
        </div>
    );
}

// Add simple helper for illustration if needed, but inline is fine for this single use.

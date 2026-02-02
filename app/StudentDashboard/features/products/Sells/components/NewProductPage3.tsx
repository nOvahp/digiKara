import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PricingForm } from './shared/PricingForm';
import { toast } from 'sonner';
import axios from 'axios';

const PRICE_TYPES = [
    { id: 1, label: 'رنگ' },
    { id: 2, label: 'سایز' },
    { id: 3, label: 'جنس' },
    { id: 4, label: 'گارانتی' },
    { id: 5, label: 'متفرقه' },
];

interface NewProductPage3Props {
    onClose: () => void;
    onNext: () => void;
    onStepClick: (step: string) => void;
    formData: any;
    updateFormData: (data: any) => void;
}

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

export function NewProductPage3({ onClose, onNext, onStepClick, formData, updateFormData }: NewProductPage3Props) {
    const isMultiPrice = formData.isMultiPrice;
    const [newPrice, setNewPrice] = useState({
        title: '', 
        amount: '', 
        discount_percent: '', 
        inventory: '', 
        type: '1', 
        warn_inventory: ''
    });

    const handleNext = () => {
         try {
            // If Single Price mode: Check main price
            if (!isMultiPrice) {
                if (!formData.price || formData.price === '0') throw new Error("لطفا قیمت کالا را وارد کنید");
            } else {
                // If Multi Price mode: Check if at least one price added
                if (!formData.extraPrices || formData.extraPrices.length === 0) throw new Error("لطفا حداقل یک قیمت اضافه کنید");
            }
            onNext();
        } catch (error) {
             toast.error((error as Error).message);
        }
    };
    
    // ...

    // In the return JSX
    // Update the toggles to use updateFormData({ isMultiPrice: ... })
    // I need to use MultiReplace for the toggles as well or do a larger replace.
    // I'll do a larger replace of the component body parts.


    const handleAddPrice = () => {
        if (!newPrice.title || !newPrice.amount) {
            toast.error("عنوان و قیمت الزامی است");
            return;
        }

        const priceObj = {
            title: newPrice.title,
            amount: parseInt(newPrice.amount.replace(/\D/g, '') || '0'),
            type: parseInt(newPrice.type || '1'),
            discount_percent: newPrice.discount_percent ? parseInt(newPrice.discount_percent) : null,
            inventory: newPrice.inventory ? parseInt(newPrice.inventory) : null,
            type_inventory: 1, 
            warn_inventory: newPrice.warn_inventory ? parseInt(newPrice.warn_inventory) : null,
        };

        updateFormData({ extraPrices: [...(formData.extraPrices || []), priceObj] });
        setNewPrice({ title: '', amount: '', discount_percent: '', inventory: '', type: '1', warn_inventory: '' });
        toast.success("قیمت افزوده شد");
    };

    const removePrice = (index: number) => {
        const newPrices = [...(formData.extraPrices || [])];
        newPrices.splice(index, 1);
        updateFormData({ extraPrices: newPrices });
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
                    <div className="text-[#0D0D12] text-lg font-semibold leading-relaxed tracking-wide">
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

                    {/* Form Fields */}
                    <div className="w-full px-5 py-5 flex flex-col gap-4" dir="rtl">
                        {/* Pricing Type Toggle */}
                        <div className="w-full h-9 p-0.5 bg-[#F6F6F6] rounded-lg border border-[#D7D8DA] flex items-center mb-2">
                             <div 
                                onClick={() => updateFormData({ isMultiPrice: true })}
                                className={`flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer text-sm font-semibold ${isMultiPrice ? 'bg-[#FFDD8A] shadow-sm border border-[#D7D8DA] text-[#0D0D12]' : 'text-[#0A0A0A] opacity-50'}`}
                             >
                                 دارای چند قیمت
                             </div>
                             <div 
                                onClick={() => updateFormData({ isMultiPrice: false })}
                                className={`flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer text-sm font-semibold ${!isMultiPrice ? 'bg-[#FFDD8A] shadow-sm border border-[#D7D8DA] text-[#0D0D12]' : 'text-[#0A0A0A] opacity-50'}`}
                             >
                                 تک قیمتی
                             </div>
                        </div>

                        {!isMultiPrice ? (
                            <PricingForm 
                                values={formData}
                                onChange={(updates) => updateFormData(updates)} 
                            />
                        ) : (
                            <div className="flex flex-col gap-4">
                                {/* Add New Price Form */}
                                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-3">
                                    <div className="text-sm font-bold text-gray-700">افزودن قیمت جدید</div>
                                    <div className="flex gap-2">
                                        <div className="relative w-1/3">
                                            <select 
                                                className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-regular text-sm bg-white outline-none focus:border-[#0A33FF] appearance-none cursor-pointer"
                                                value={newPrice.type}
                                                onChange={e => setNewPrice({...newPrice, type: e.target.value})}
                                            >
                                                {PRICE_TYPES.map(t => (
                                                    <option key={t.id} value={t.id}>{t.label}</option>
                                                ))}
                                            </select>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L5 5L9 1" stroke="#666D80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <input 
                                            placeholder="عنوان (مثلا: قرمز، XL)"
                                            className="flex-1 h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-regular text-sm outline-none focus:border-[#0A33FF]"
                                            value={newPrice.title}
                                            onChange={e => setNewPrice({...newPrice, title: e.target.value})}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <input 
                                            placeholder="قیمت (تومان)"
                                            className="flex-1 h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-num-medium text-sm"
                                            value={newPrice.amount ? parseInt(newPrice.amount).toLocaleString() : ''}
                                            onChange={e => setNewPrice({...newPrice, amount: e.target.value.replace(/\D/g, '')})}
                                        />
                                        <input 
                                            placeholder="تخفیف %"
                                            className="w-20 h-10 px-3 rounded-lg border border-[#DFE1E7] text-center font-num-medium text-sm"
                                            value={newPrice.discount_percent}
                                            onChange={e => setNewPrice({...newPrice, discount_percent: e.target.value})}
                                        />
                                    </div>
                                    <input 
                                        placeholder="موجودی"
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-num-medium text-sm"
                                        value={newPrice.inventory}
                                        onChange={e => setNewPrice({...newPrice, inventory: e.target.value})}
                                    />
                                    <input 
                                        placeholder="هشدار موجودی"
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-num-medium text-sm"
                                        value={newPrice.warn_inventory}
                                        onChange={e => setNewPrice({...newPrice, warn_inventory: e.target.value})}
                                    />
                                    <button 
                                        onClick={handleAddPrice}
                                        className="w-full h-9 bg-blue-600 text-white rounded-lg text-sm font-bold mt-1"
                                    >
                                        افزودن
                                    </button>
                                </div>

                                {/* List of Added Prices */}
                                <div className="flex flex-col gap-2">
                                    {formData.extraPrices?.map((p: any, idx: number) => (
                                        <div key={idx} className="p-3 rounded-lg border border-[#E0E0E0] flex justify-between items-center bg-white">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-bold text-[#0D0D12]">{p.title}</span>
                                                <span className="text-xs text-gray-500">{p.amount.toLocaleString()} تومان | {p.inventory || 0} عدد</span>
                                            </div>
                                            <X className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => removePrice(idx)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full px-5 py-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10 mt-auto">
                     <button 
                        onClick={handleNext}
                        className="flex-1 h-10 px-4 py-2 bg-gradient-to-t from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.15)] bg-[#0A33FF] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#0A33FF] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
                     >
                         <span className="text-center text-white text-sm font-semibold leading-[21px] tracking-wide">ادامه</span>
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
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-num-medium leading-[21px] tracking-wide ${circleClass}`}>
                {toFarsiNumber(number)}
            </div>
            <span className={`text-sm leading-[21px] tracking-wide whitespace-nowrap ${textClass}`}>
                {label}
            </span>
        </div>
    );
}

import React from 'react';
import { FormLabel } from './FormLabel';

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

interface PricingFormProps {
    defaultValues?: any;
    values?: { price: string; fee: string; receive: string; discount: string; code: string; percent: string };
    onChange?: (updates: Partial<{ price: string; fee: string; receive: string; discount: string; code: string; percent: string }>) => void;
}

export function PricingForm({ defaultValues = {}, values, onChange }: PricingFormProps) {
    const handleChange = (field: string, value: string) => {
        if (!onChange) return;

        let updates: any = { [field]: value };

        if (field === 'price') {
            // Remove non-digits to calculate
            const cleanValue = value.replace(/\D/g, '');
            const numericPrice = parseInt(cleanValue || '0', 10);
            
            if (!isNaN(numericPrice) && numericPrice > 0) {
                 // Calculate 10% fee
                const fee = Math.floor(numericPrice * 0.10);
                
                // Calculate receive amount
                const receive = numericPrice - fee;

                // Format with dots
                const format = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                updates.fee = format(fee);
                updates.receive = format(receive);
                updates.price = format(numericPrice); 
            } else {
                updates.fee = '';
                updates.receive = '';
            }
        } else if (field === 'discount') {
             const cleanValue = value.replace(/\D/g, '');
             const numericValue = parseInt(cleanValue || '0', 10);
             if (!isNaN(numericValue) && numericValue > 0) {
                 const format = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                 updates.discount = format(numericValue);
             }
        }
        
        onChange(updates);
    };

    const val = (field: string) => values ? ((values as any)[field] || "") : (defaultValues[field] || "");

    return (
        <div className="w-full bg-white rounded-2xl border border-[#DFE1E7] p-3 md:p-5 flex flex-col gap-5 shadow-sm">
            <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] text-right">
                قیمت گذاری
            </div>
            
            {/* Price Input */}
            <div className="flex flex-col gap-2">
                 <FormLabel text="قیمت کالا" />
                 <div className="h-[52px] px-2 md:px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center gap-2 md:gap-3 focus-within:border-[#FDD00A] transition-colors">
                     <input 
                        type="text" 
                        className="flex-1 min-w-0 h-full bg-transparent border-none outline-none text-right text-[#0D0D12] text-base font-bold font-['PeydaFaNum'] placeholder:text-[#DFE1E7]"
                        value={val('price')}
                        placeholder={toFarsiNumber('2300000')}
                        onChange={(e) => handleChange('price', e.target.value)}
                        dir="rtl"
                     />
                     <div className="w-[1px] h-6 bg-[#DFE1E7]"></div>
                     <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] whitespace-nowrap">ریال</div>
                 </div>
            </div>

            {/* Fees Calculation */}
            <div className="flex flex-col gap-4">
                 <div className="flex flex-col gap-2.5">
                     <div className="flex justify-between items-center text-sm flex-wrap gap-2">
                         <span className="text-[#666D80] font-semibold font-['PeydaWeb']">هزینه خدمات</span>
                         <div className="flex gap-1 items-center">
                              <input 
                                className="w-20 bg-transparent border-none outline-none text-left text-[#666D80] font-bold font-['PeydaFaNum']"
                                value={val('fee')}
                                placeholder={toFarsiNumber('230000')}
                                onChange={(e) => handleChange('fee', e.target.value)}
                              />
                              <span className="text-[#666D80] font-semibold font-['PeydaWeb']">ریال</span>
                         </div>
                     </div>
                     <div className="flex justify-between items-center text-sm flex-wrap gap-2">
                         <span className="text-[#666D80] font-semibold font-['PeydaWeb']">شما دریافت خواهید کرد</span>
                         <div className="flex gap-1 items-center">
                              <input 
                                className="w-20 bg-transparent border-none outline-none text-left text-[#666D80] font-bold font-['PeydaFaNum']"
                                value={val('receive')}
                                placeholder={toFarsiNumber('2070000')}
                                onChange={(e) => handleChange('receive', e.target.value)}
                              />
                              <span className="text-[#666D80] font-semibold font-['PeydaWeb']">ریال</span>
                         </div>
                     </div>
                 </div>
                 <div className="flex justify-center items-center gap-1 text-sm">
                     <span className="text-[#666D80] font-light font-['PeydaWeb']">برای مشاهده جزئیات</span>
                     <span className="text-[#0D0D12] font-semibold underline cursor-pointer font-['PeydaWeb']">اینجا کلیک کنید</span>
                 </div>
            </div>

            {/* Discount */}
            <div className="flex flex-col gap-2">
                 <FormLabel text="تخفیف کالا" />
                 <div className="h-[52px] px-2 md:px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center gap-2 md:gap-3 focus-within:border-[#FDD00A] transition-colors">
                     <input 
                        type="text" 
                        className="flex-1 min-w-0 h-full bg-transparent border-none outline-none text-right text-[#0D0D12] text-base font-bold font-['PeydaFaNum'] placeholder:text-[#DFE1E7]"
                        value={val('discount')}
                        placeholder={toFarsiNumber('0')}
                        onChange={(e) => handleChange('discount', e.target.value)}
                        dir="rtl"
                     />
                     <div className="w-[1px] h-6 bg-[#DFE1E7]"></div>
                     <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] whitespace-nowrap">ریال</div>
                 </div>
            </div>

            {/* Code Discount */}
            <div className="flex flex-col gap-2">
                 <FormLabel text="ایجاد کد تخفیف" />
                 <div className="h-[52px] px-2 md:px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center gap-2 md:gap-3 focus-within:border-[#FDD00A] transition-colors">
                     <input 
                        type="text" 
                        className="flex-1 min-w-0 h-full bg-transparent border-none outline-none text-right text-[#0D0D12] text-base font-medium font-['Geist'] placeholder:text-[#DFE1E7]"
                        value={val('code')}
                        placeholder="NK-PEG40-GRY-001"
                        onChange={(e) => handleChange('code', e.target.value)}
                        dir="ltr"
                     />
                     <div className="w-[1px] h-6 bg-[#DFE1E7]"></div>
                     <input 
                        type="text" 
                        className="w-12 h-full bg-transparent border-none outline-none text-center text-[#666D80] text-base font-bold font-['PeydaFaNum'] placeholder:text-[#DFE1E7]"
                        value={val('percent')}
                        placeholder="20%"
                        onChange={(e) => handleChange('percent', e.target.value)}
                        dir="ltr"
                     />
                 </div>
            </div>
        </div>
    );
}

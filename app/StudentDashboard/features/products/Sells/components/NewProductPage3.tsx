import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus, ChevronDown, Info, Check, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { ServiceFeeModal } from './ServiceFeeModal';

interface NewProductPage3Props {
    onClose: () => void;
    onNext: () => void;
    onStepClick: (step: string) => void;
    formData: any;
    updateFormData: (data: any) => void;
}

interface VariantPrice {
    variantLabel: string; // e.g., "رنگ: قرمز"
    amount: number; // final price for this variant
    title: string; // variant title
    type: number; // variant type (integer)
    discount_percent: number | null; // discount percentage (0-100)
    inventory: number | null; // stock quantity
    type_inventory: number | null; // inventory type
    warn_inventory: number | null; // warning inventory level
}

// Zod validation schema
const variantPriceSchema = z.object({
    basePrice: z.string().min(1, "قیمت پایه الزامی است"),
    variantPrices: z.array(z.object({
        variantLabel: z.string(),
        amount: z.number().min(0),
        title: z.string().max(255),
        type: z.number(),
        discount_percent: z.number().min(0).max(100).nullable(),
        inventory: z.number().min(0).nullable(),
        type_inventory: z.number().nullable(),
        warn_inventory: z.number().min(0).nullable()
    })).min(1, "حداقل یک ویژگی باید اضافه شود")
});

export function NewProductPage3({ onClose, onNext, onStepClick, formData, updateFormData }: NewProductPage3Props) {
    const isMultiPrice = formData.isMultiPrice ?? false;
    
    // Refs for auto-scrolling
    const progressBarRef = useRef<HTMLDivElement>(null);
    const activeStepRef = useRef<HTMLDivElement>(null);
    
    // State for multi-price variant management
    const [selectedVariant, setSelectedVariant] = useState('');
    const [variantAmount, setVariantAmount] = useState('');
    const [isAddition, setIsAddition] = useState(true); // true = plus, false = minus
    const [variantType, setVariantType] = useState('1');
    const [variantDiscount, setVariantDiscount] = useState('');
    const [variantInventory, setVariantInventory] = useState('');
    const [variantWarnInventory, setVariantWarnInventory] = useState('');
    const [variantPrices, setVariantPrices] = useState<VariantPrice[]>(formData.variantPrices || []);
    
    // State for service fee modal
    const [showServiceFeeModal, setShowServiceFeeModal] = useState(false);

    // Auto-scroll active step to center on mount
    useEffect(() => {
        if (progressBarRef.current && activeStepRef.current) {
            const progressBar = progressBarRef.current;
            const activeStep = activeStepRef.current;
            
            const scrollLeft = activeStep.offsetLeft - (progressBar.clientWidth / 2) + (activeStep.clientWidth / 2);
            progressBar.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }, []);

    // Get unique feature types from Step 2
    const getFeatureTypes = (): string[] => {
        if (!formData.variantFeatures || formData.variantFeatures.length === 0) return [];
        return formData.variantFeatures.map((f: any) => f.title);
    };

    // Check which feature types have been covered
    const getCoveredFeatures = (): Set<string> => {
        const covered = new Set<string>();
        variantPrices.forEach(vp => {
            const featureType = vp.variantLabel.split(':')[0].trim();
            covered.add(featureType);
        });
        return covered;
    };

    const featureTypes = getFeatureTypes();
    const coveredFeatures = getCoveredFeatures();
    const missingFeatures = featureTypes.filter(ft => !coveredFeatures.has(ft));

    // Generate variant options from Step 2's variantFeatures
    const generateVariantOptions = (): string[] => {
        if (!formData.variantFeatures || formData.variantFeatures.length === 0) return [];
        
        const options: string[] = [];
        formData.variantFeatures.forEach((feature: any) => {
            if (feature.values && feature.values.length > 0) {
                feature.values.forEach((value: string) => {
                    if (value.trim()) {
                        options.push(`${feature.title}: ${value.trim()}`);
                    }
                });
            }
        });
        return options;
    };

    const variantOptions = generateVariantOptions();

    const handleAddVariantPrice = () => {
        if (!selectedVariant) {
            toast.error("لطفا یک ویژگی انتخاب کنید");
            return;
        }
        if (!variantAmount) {
            toast.error("لطفا قیمت را وارد کنید");
            return;
        }

        // Calculate final amount from base price +/- difference
        const basePrice = parseInt(formData.price?.replace(/\D/g, '') || '0');
        const priceDifference = parseInt(variantAmount.replace(/\D/g, '') || '0');
        const finalAmount = isAddition ? basePrice + priceDifference : basePrice - priceDifference;

        const newVariantPrice: VariantPrice = {
            variantLabel: selectedVariant,
            amount: finalAmount, // Final calculated price
            title: selectedVariant, // Use the selected variant as title
            type: parseInt(variantType),
            discount_percent: variantDiscount ? parseInt(variantDiscount) : null,
            inventory: variantInventory ? parseInt(variantInventory.replace(/\D/g, '') || '0') : null,
            type_inventory: null, // Not required, always null
            warn_inventory: variantWarnInventory ? parseInt(variantWarnInventory.replace(/\D/g, '') || '0') : null
        };

        const updatedVariantPrices = [...variantPrices, newVariantPrice];
        setVariantPrices(updatedVariantPrices);
        updateFormData({ variantPrices: updatedVariantPrices });

        // Reset form
        setSelectedVariant('');
        setVariantAmount('');
        setIsAddition(true);
        setVariantType('1');
        setVariantDiscount('');
        setVariantInventory('');
        setVariantWarnInventory('');
    };

    const removeVariantPrice = (index: number) => {
        const updated = variantPrices.filter((_, i) => i !== index);
        setVariantPrices(updated);
        updateFormData({ variantPrices: updated });
    };

    const calculatePriceDifference = (variantPrice: VariantPrice): { difference: number; isAddition: boolean } => {
        const basePrice = parseInt(formData.price?.replace(/\D/g, '') || '0');
        const difference = variantPrice.amount - basePrice;
        return {
            difference: Math.abs(difference),
            isAddition: difference >= 0
        };
    };

    const calculateServiceFee = (): number => {
        const basePrice = parseInt(formData.price?.replace(/\D/g, '') || '0');
        return Math.floor(basePrice * 0.10); // 10% service fee
    };

    const calculateNetAmount = (): number => {
        const basePrice = parseInt(formData.price?.replace(/\D/g, '') || '0');
        return basePrice - calculateServiceFee();
    };

    const validateAndProceed = (): boolean => {
        // Validate with Zod
        const validation = variantPriceSchema.safeParse({
            basePrice: formData.price || '',
            variantPrices: variantPrices
        });

        if (!validation.success) {
            toast.error(validation.error.issues[0].message);
            return false;
        }

        // Check if all feature types are covered
        if (missingFeatures.length > 0) {
            toast.error(`لطفا برای این ویژگی‌ها قیمت اضافه کنید: ${missingFeatures.join('، ')}`);
            return false;
        }

        return true;
    };

    const handleNext = () => {
        try {
            if (!isMultiPrice) {
                if (!formData.price || formData.price === '0') {
                    throw new Error("لطفا قیمت پایه را وارد کنید");
                }
            } else {
                if (!formData.price || formData.price === '0') {
                    throw new Error("لطفا قیمت پایه را وارد کنید");
                }
                if (!validateAndProceed()) {
                    return;
                }
            }
            onNext();
        } catch (error) {
            toast.error((error as Error).message);
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
                    <div className="text-[#0D0D12] text-lg font-semibold leading-relaxed tracking-wide">
                        افزودن محصول جدید
                    </div>
                </div>

                {/* Progress Bar */}
                <div ref={progressBarRef} className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-end items-center gap-3 overflow-x-auto no-scrollbar" dir="ltr">
                     <StepItem step="6" label="تائید نهایی" isActive={false} onClick={() => onStepClick('step6')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     <StepItem step="5" label="دسته بندی و برچسب ها" isActive={false} onClick={() => onStepClick('step5')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     <StepItem step="4" label="موجودی" isActive={false} onClick={() => onStepClick('step4')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     <StepItem step="3" label="قیمت گذاری" isActive={true} onClick={() => {}} ref={activeStepRef} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     <StepItem step="2" label="ویژگی ها" isActive={false} isCompleted={true} onClick={() => onStepClick('step2')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     <StepItem step="1" label="اطلاعات پایه" isActive={false} isCompleted={true} onClick={() => onStepClick('step1')} />
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto w-full px-5 py-5" dir="rtl">
                    {/* Pricing Type Toggle */}
                    <div className="w-full h-9 p-0.5 bg-[#F6F6F6] rounded-lg border border-[#D7D8DA] flex items-center mb-4">
                         <div 
                            onClick={() => updateFormData({ isMultiPrice: true })}
                            className={`flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer text-sm font-semibold ${isMultiPrice ? 'bg-[#FFDD8A] shadow-sm border border-[#D7D8DA] text-[#0D0D12]' : 'text-[#0D0D12]'}`}
                         >
                             دارای چند قیمت
                         </div>
                         <div 
                            onClick={() => updateFormData({ isMultiPrice: false })}
                            className={`flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer text-sm font-semibold ${!isMultiPrice ? 'bg-[#FFDD8A] shadow-sm border border-[#D7D8DA] text-[#0D0D12]' : 'text-[#0D0D12]'}`}
                         >
                             تک قیمتی
                         </div>
                    </div>

                    {/* Info Alert (only for multi-price) */}
                    {isMultiPrice && (
                        <div className="w-full flex justify-end items-start gap-2 mb-4">
                            <Info className="w-5 h-5 text-[#666D80] mt-0.5 shrink-0" />
                            <p className="flex-1 text-right text-[#666D80] text-[13px] font-light font-['PeydaWeb'] leading-tight">
                                ابتدا قیمت پایه محصول را وارد کنید، سپس ویژگیها (مانند وزن یا اندازه) و تفاوت قیمتها را مشخص کنید تا تغییرات قیمت نهایی به درستی محاسبه شود.
                            </p>
                            
                        </div>
                    )}

                    {/* Feature Reference List (only for multi-price) */}
                    {isMultiPrice && featureTypes.length > 0 && (
                        <div className="w-full p-3 bg-[#F6F6F6] rounded-xl mb-4">
                            <div className="text-right text-[#666D80] text-sm font-semibold mb-2">
                                ویژگی‌های انتخاب شده در مرحله قبل:
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {featureTypes.map((ft, idx) => (
                                    <div 
                                        key={idx}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                                            coveredFeatures.has(ft) 
                                                ? 'bg-green-50 border-green-300' 
                                                : 'bg-white border-[#DFE1E7]'
                                        }`}
                                    >
                                        {coveredFeatures.has(ft) && (
                                            <Check className="w-4 h-4 text-green-600" />
                                        )}
                                        <span className={`text-sm font-semibold ${
                                            coveredFeatures.has(ft) ? 'text-green-700' : 'text-[#666D80]'
                                        }`}>
                                            {ft}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {missingFeatures.length > 0 && (
                                <div className="mt-2 text-right text-[#D54141] text-xs font-medium">
                                    باید برای همه ویژگی‌ها حداقل یک قیمت اضافه کنید
                                </div>
                            )}
                        </div>
                    )}

                    {/* Base Price Input */}
                    <div className="w-full flex flex-col gap-2 mb-4">
                        <div className="text-right text-[#666D80] text-sm font-semibold">
                            قیمت پایه
                        </div>
                        <div className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center gap-2">
                            
                            <input 
                                type="text"
                                className="flex-1 h-full outline-none text-left text-[#0D0D12] text-base font-num-semibold  placeholder:text-[#DFE1E7]"
                                placeholder="2.300.000"
                                value={formData.price ? parseInt(formData.price.replace(/\D/g, '')).toLocaleString() : ''}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    updateFormData({ price: val });
                                }}
                            />
                            <div className="w-[1px] h-[50px] bg-[#DFE1E7]"></div>
                            <div className="text-[#0D0D12] text-base font-semibold">ریال</div>
                            
                        </div>
                    </div>

                    {/* Multi-Price Variant Section */}
                    {isMultiPrice && (
                        <div className="w-full flex flex-col gap-4">
                            <div className="text-right text-[#666D80] text-sm font-semibold">
                                ویژگی ها
                            </div>

                            {/* Variant Dropdown */}
                            <div className="relative w-full">
                                <select 
                                    className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] text-right text-base font-semibold font-['PeydaWeb'] outline-none appearance-none cursor-pointer"
                                    value={selectedVariant}
                                    onChange={(e) => setSelectedVariant(e.target.value)}
                                    style={{ color: selectedVariant ? '#0D0D12' : '#DFE1E7' }}
                                >
                                    <option value="" disabled>وزن، نوع محصول و ...</option>
                                    {variantOptions.map((option, idx) => (
                                        <option key={idx} value={option}>{option}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#818898] pointer-events-none" />
                            </div>

                            {/* Variant Amount (Price) Input with Plus/Minus */}
                            <div className="w-full flex flex-col gap-2">
                                <div className="text-right text-[#666D80] text-sm font-semibold">
                                    تفاوت قیمت (اضافه یا کسر از قیمت پایه)
                                </div>
                                <div className="w-full flex items-center gap-2">
                                    {/* Plus/Minus Buttons */}
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setIsAddition(true)}
                                            className={`w-[35px] h-[35px] rounded-lg border border-[#DFE1E7] flex items-center justify-center ${isAddition ? 'bg-[#35685A]' : 'bg-white'}`}
                                        >
                                            <Plus className={`w-5 h-5 ${isAddition ? 'text-white' : 'text-[#666D80]'}`} />
                                        </button>
                                        <button 
                                            onClick={() => setIsAddition(false)}
                                            className={`w-[35px] h-[35px] rounded-lg border border-[#DFE1E7] flex items-center justify-center ${!isAddition ? 'bg-[#D54141]' : 'bg-white'}`}
                                        >
                                            <Minus className={`w-5 h-5 ${!isAddition ? 'text-white' : 'text-[#666D80]'}`} />
                                        </button>
                                    </div>
                                    <div className="flex-1 h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center gap-2">
                                        <input 
                                            type="text"
                                            className="flex-1 h-full outline-none text-left text-[#0D0D12] text-base font-num-semibold placeholder:text-[#DFE1E7]"
                                            placeholder="2.300.000"
                                            value={variantAmount ? parseInt(variantAmount.replace(/\D/g, '')).toLocaleString() : ''}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                setVariantAmount(val);
                                            }}
                                        />
                                         <div className="w-[1px] h-[50px] bg-[#DFE1E7]"></div>
                                         <div className="text-[#0D0D12] text-base font-semibold">ریال</div>
                                    </div>
                                </div>
                            </div>

                            {/* Variant Type Input */}
                            <div className="w-full flex flex-col gap-2">
                                <div className="text-right text-[#666D80] text-sm font-semibold">
                                    نوع ویژگی
                                </div>
                                <input 
                                    type="number"
                                    className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] text-right outline-none text-[#0D0D12] text-base font-num-semibold placeholder:text-[#DFE1E7]"
                                    placeholder="1"
                                    value={variantType}
                                    onChange={(e) => setVariantType(e.target.value)}
                                />
                            </div>

                            {/* Optional Fields Row 1: Discount & Inventory */}
                            <div className="w-full grid grid-cols-2 gap-3">
                                {/* Discount Percent */}
                                <div className="flex flex-col gap-2">
                                    <div className="text-right text-[#666D80] text-sm font-semibold">
                                        تخفیف (%)
                                    </div>
                                    <input 
                                        type="number"
                                        className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] text-right outline-none text-[#0D0D12] text-base font-num-semibold placeholder:text-[#DFE1E7]"
                                        placeholder="0-100"
                                        min="0"
                                        max="100"
                                        value={variantDiscount}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            // Only allow empty or numbers between 0-100
                                            if (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 100)) {
                                                setVariantDiscount(val);
                                            }
                                        }}
                                    />
                                </div>

                                {/* Inventory */}
                                <div className="flex flex-col gap-2">
                                    <div className="text-right text-[#666D80] text-sm font-semibold">
                                        موجودی
                                    </div>
                                    <input 
                                        type="text"
                                        className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] text-right outline-none text-[#0D0D12] text-base font-num-semibold placeholder:text-[#DFE1E7]"
                                        placeholder="100"
                                        value={variantInventory ? parseInt(variantInventory.replace(/\D/g, '')).toLocaleString() : ''}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '');
                                            setVariantInventory(val);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Optional Field: Warn Inventory */}
                            <div className="w-full flex flex-col gap-2">
                                <div className="text-right text-[#666D80] text-sm font-semibold">
                                    هشدار موجودی
                                </div>
                                <input 
                                    type="text"
                                    className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] text-right outline-none text-[#0D0D12] text-base font-num-semibold placeholder:text-[#DFE1E7]"
                                    placeholder="10"
                                    value={variantWarnInventory ? parseInt(variantWarnInventory.replace(/\D/g, '')).toLocaleString() : ''}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '');
                                        setVariantWarnInventory(val);
                                    }}
                                />
                            </div>

                            {/* Add Variant Button */}
                            <button 
                                onClick={handleAddVariantPrice}
                                className="w-full h-[57px] rounded-xl border border-[#DFE1E7] flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-[#666D80] text-sm font-semibold">افزودن ویژگی ها</span>
                                <Plus className="w-5 h-5 text-[#666D80]" />
                            </button>

                            {/* List of Added Variant Prices */}
                            {variantPrices.length > 0 && (
                                <div className="w-full flex flex-col gap-2 mt-2">
                                    {variantPrices.map((vp, idx) => {
                                        const { difference, isAddition } = calculatePriceDifference(vp);
                                        return (
                                            <div key={idx} className="p-3 rounded-lg border border-[#E0E0E0] flex justify-between items-start bg-white">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-semibold text-[#0D0D12]">{vp.title}</span>
                                                    <span className="text-xs text-gray-500 font-num-semibold">
                                                        {vp.variantLabel}
                                                    </span>
                                                    <span className="text-xs text-gray-600 font-num-semibold">
                                                        تفاوت قیمت: {isAddition ? '+' : '-'} {difference.toLocaleString()} ریال
                                                    </span>
                                                    <span className="text-xs text-gray-900 font-num-bold">
                                                        قیمت نهایی: {vp.amount.toLocaleString()} ریال
                                                    </span>
                                                    {(vp.discount_percent || vp.inventory !== null) && (
                                                        <span className="text-xs text-gray-500 font-num-semibold">
                                                            {vp.discount_percent && `تخفیف: ${vp.discount_percent}%`}
                                                            {vp.discount_percent && vp.inventory !== null && ' | '}
                                                            {vp.inventory !== null && `موجودی: ${vp.inventory.toLocaleString()}`}
                                                        </span>
                                                    )}
                                                </div>
                                                <X className="w-4 h-4 text-red-500 cursor-pointer flex-shrink-0 mt-1" onClick={() => removeVariantPrice(idx)} />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pricing Summary */}
                    <div className="w-full flex flex-col gap-4 mt-6">
                        <div className="flex flex-col gap-2.5">
                            <div className="flex justify-between items-center">
                                  <span className="text-[#666D80] text-sm font-semibold">هزینه خدمات</span>
                                <span className="text-[#666D80] text-sm font-num-semibold">
                                    {calculateServiceFee().toLocaleString()} ریال
                                </span>
                              
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#666D80] text-sm font-semibold">شما دریافت خواهید کرد</span>
                                <span className="text-[#666D80] text-sm font-num-semibold">
                                    {calculateNetAmount().toLocaleString()} ریال
                                </span>
                                
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                            <span className="text-[#666D80] text-sm font-light">برای مشاهده جزئیات </span>
                            <span 
                                className="text-[#0D0D12] text-sm font-semibold underline cursor-pointer"
                                onClick={() => setShowServiceFeeModal(true)}
                            >
                                اینجا کلیک کنید
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full p-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10">
                     <button 
                        className="w-[57px] h-[57px] rounded-xl border border-[#DCE4E8] flex justify-center items-center hover:bg-gray-50"
                        onClick={() => onStepClick('step2')} 
                     >
                         <ChevronRight className="w-6 h-6 text-[#1A1C1E] rotate-180" /> 
                    </button>

                    <button 
                        onClick={handleNext}
                        className="flex-1 h-10 px-4 py-3.5 bg-gradient-to-t from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.15)] bg-[#FDD00A] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-xl border border-[#FDD00A] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity h-[57px]"
                    >
                        <span className="text-center text-[#1A1C1E] text-[17.58px] font-semibold font-['PeydaWeb'] leading-[24.61px]">ادامه</span>
                    </button>
                </div>
            </div>
            
            {/* Service Fee Modal */}
            <ServiceFeeModal 
                isOpen={showServiceFeeModal} 
                onClose={() => setShowServiceFeeModal(false)} 
            />
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
                 <span className={`text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide whitespace-nowrap ${isActive ? "text-[#0D0D12]" : "text-[#818898]"}`}>
                    {label}
                </span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-['PeydaFaNum'] leading-[21px] tracking-wide ${isActive ? 'bg-[#FFD369] text-white' : 'bg-[#DFE1E7] text-white'}`}>
                    {step}
                </div>
            </div>
        );
    }
);

StepItem.displayName = 'StepItem';

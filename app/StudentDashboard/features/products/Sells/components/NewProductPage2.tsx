// ... imports
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Info, X, Plus, Trash2, Check } from 'lucide-react';

// ... interfaces

const VARIANT_OPTIONS = [
    { id: 'color', label: 'رنگ', icon: '🎨' },
    { id: 'weight', label: 'وزن', icon: '⚖️' },
    { id: 'size', label: 'اندازه', icon: '📏' },
    { id: 'volume', label: 'حجم', icon: '🧊' }
];

const COLORS = [
    { bg: '#FF3B30', name: 'قرمز' },
    { bg: '#FFCC00', name: 'زرد' },
    { bg: '#34C759', name: 'سبز' },
    { bg: '#32ADE6', name: 'آبی آسمانی' },
    { bg: '#007AFF', name: 'آبی' },
    { bg: '#AF52DE', name: 'بنفش' },
    { bg: '#FF2D55', name: 'صورتی' },
    { bg: 'linear-gradient(180deg, #007AFF 0%, #F5234B 100%)', name: 'چند رنگ' }
];

interface FeatureItem {
    key: string;
    value: string;
}

interface NewProductPage2Props {
    onClose: () => void;
    onNext: () => void;
    onStepClick: (step: string) => void;
    formData: any;
    updateFormData: (data: any) => void;
}

export function NewProductPage2({ onClose, onNext, onStepClick, formData, updateFormData }: NewProductPage2Props) {
    const [openSection, setOpenSection] = useState<string | null>('id');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Initialize variant features if not present
    useEffect(() => {
        if (!formData.variantFeatures) {
            updateFormData({ variantFeatures: [] });
        }
    }, []);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const updateStaticFeatures = (section: 'id' | 'visual' | 'production' | 'packaging', items: FeatureItem[]) => {
        const currentFeatures = formData.features || { id: [], visual: [], production: [], packaging: [] };
        updateFormData({
            features: {
                ...currentFeatures,
                [section]: items
            }
        });
    };

    const toggleVariantFeature = (type: string) => {
        const currentVariants = formData.variantFeatures || [];
        const exists = currentVariants.find((v: any) => v.id === type);
        
        if (exists) {
            // Remove
            updateFormData({
                variantFeatures: currentVariants.filter((v: any) => v.id !== type)
            });
        } else {
            // Add
            updateFormData({
                variantFeatures: [...currentVariants, { id: type, title: VARIANT_OPTIONS.find(o => o.id === type)?.label, values: [] }]
            });
        }
    };

    const updateVariantValues = (id: string, values: string[]) => {
        const currentVariants = formData.variantFeatures || [];
        updateFormData({
            variantFeatures: currentVariants.map((v: any) => 
                v.id === id ? { ...v, values } : v
            )
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0D0D12] opacity-40 backdrop-blur-[1px]" onClick={onClose} />
            <div className="relative w-[375px] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
                
                {/* Header */}
                <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
                    <div className="w-10 h-10 relative overflow-hidden rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50" onClick={onClose}>
                        <X className="w-5 h-5 text-[#0D0D12]" />
                    </div>
                    <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
                        افزودن محصول جدید
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto w-full no-scrollbar">
                    {/* Progress Bar */}
                    <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-end items-center gap-3 overflow-x-auto no-scrollbar" dir="ltr">
                         <StepItem step="6" label="تائید نهایی" isActive={false} onClick={() => onStepClick('step6')} />
                         <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                         <StepItem step="5" label="دسته بندی و برچسب ها" isActive={false} onClick={() => onStepClick('step5')} />
                         <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                         <StepItem step="4" label="موجودی" isActive={false} onClick={() => onStepClick('step4')} />
                         <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                         <StepItem step="3" label="قیمت گذاری" isActive={false} onClick={() => onStepClick('step3')} />
                         <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                         <StepItem step="2" label="ویژگی ها" isActive={true} onClick={() => {}} />
                         <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                         <StepItem step="1" label="اطلاعات پایه" isActive={false} isCompleted={true} onClick={() => onStepClick('step1')} />
                    </div>

                    <div className="p-5 flex flex-col gap-4" dir="rtl">
                        
                        {/* Variant Feature Selector */}
                        <div className="relative w-full z-20">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-between px-3 hover:border-[#FDD00A] transition-colors"
                            >
                               <div className="flex justify-start items-center gap-2">
                                    <span className="text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] leading-6 tracking-wide">
                                        ویژگی
                                    </span>
                                    
                                </div>
                                <div className="w-[1px] h-[40px] bg-[#DFE1E7] mx-2 "></div>
                                <div className="flex-1 text-right text-[#DFE1E7] text-base font-semibold font-['PeydaFaNum'] leading-6 tracking-wide">
                                    توضیحات
                                </div>
                                
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute top-[60px] left-0 right-0 bg-white rounded-xl shadow-lg border border-[#E4E2E4] overflow-hidden flex flex-col z-30 animate-in fade-in zoom-in-95 duration-200">
                                    {VARIANT_OPTIONS.map(opt => {
                                        const isSelected = formData.variantFeatures?.some((v: any) => v.id === opt.id);
                                        return (
                                            <div 
                                                key={opt.id}
                                                onClick={() => toggleVariantFeature(opt.id)}
                                                className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[#262527] font-semibold font-['PeydaWeb']">{opt.label}</span>
                                                </div>
                                                <div className={`w-5 h-5 rounded border ${isSelected ? 'bg-[#FDD00A] border-[#FDD00A]' : 'border-[#DFE1E7]'} flex items-center justify-center`}>
                                                    {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="p-2">
                                        <button 
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="w-full py-2 text-[#4365DE] text-sm font-semibold font-['PeydaWeb'] hover:bg-blue-50 rounded-lg"
                                        >
                                            تائید
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Selected Variant Inputs */}
                        <div className="flex flex-col gap-3">
                            {formData.variantFeatures?.map((feature: any) => (
                                <div key={feature.id} className="w-full bg-white rounded-xl border border-[#DFE1E7] p-1 flex items-center h-[52px]">
                                    
                                    {/* Label Section */}
                                    <div className="w-[80px] h-full flex items-center justify-center border-l border-[#DFE1E7]">
                                        <span className="text-[#262527] font-semibold font-['PeydaWeb']">{feature.title}</span>
                                    </div>
                                    
                                    {/* Input Section */}
                                    <div className="flex-1 px-3 h-full flex items-center">
                                        {feature.id === 'color' ? (
                                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar h-full">
                                                {COLORS.map((color, idx) => {
                                                     const isSelected = feature.values?.includes(color.name);
                                                     return (
                                                        <div 
                                                            key={idx}
                                                            onClick={() => {
                                                                const current = feature.values || [];
                                                                const newValues = current.includes(color.name) 
                                                                    ? current.filter((c: string) => c !== color.name)
                                                                    : [...current, color.name];
                                                                updateVariantValues('color', newValues);
                                                            }}
                                                            className={`w-[24px] h-[24px] rounded-md cursor-pointer flex-shrink-0 flex items-center justify-center transition-all ${isSelected ? 'ring-2 ring-offset-1 ring-[#FDD00A]' : ''}`}
                                                            style={{ background: color.bg }}
                                                            title={color.name}
                                                        >
                                                            {isSelected && <Check className="w-3 h-3 text-white drop-shadow-md" />}
                                                        </div>
                                                     );
                                                })}
                                            </div>
                                        ) : (
                                            <input 
                                                type="text"
                                                className="w-full h-full outline-none text-right text-sm font-['PeydaWeb'] font-medium placeholder:text-[#DFE1E7] placeholder:font-medium placeholder:font-['PeydaFaNum']"
                                                placeholder={`با ، ${feature.title} های مختلف را از هم جدا کنید`}
                                                value={feature.values?.join('، ') || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    // Split by English comma or Persian comma
                                                    const vals = val.split(/,|،/).map((s: string) => s.trim());
                                                    updateVariantValues(feature.id, vals);
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Info Alert */}
                        <div className="w-full flex justify-start items-start gap-2">
                             <Info className="w-5 h-5 text-[#666D80] mt-0.5 shrink-0" />
                             <p className="flex-1 text-right text-[#666D80] text-[13px] font-light font-['PeydaWeb'] leading-tight">
                                اگر محصول شما دارای تنوع در ویژگی‌ها و قیمت‌ها است، ویژگی‌های اصلی قابل انتخاب توسط مشتری را تعیین کنید.
                            </p>
                        </div>

                        {/* Accordions (Static Features) */}
                        <div className="w-full flex flex-col gap-2">
                            <AccordionItem 
                                label="مشخصات شناسنامه‌ای محصول" 
                                isOpen={openSection === 'id'} 
                                onClick={() => toggleSection('id')}
                            >
                                <FeatureSection 
                                    items={formData.features?.id || []} 
                                    onChange={(items) => updateStaticFeatures('id', items)} 
                                    placeholderKey="عنوان (مثلا: برند)"
                                    placeholderValue="مقدار (مثلا: نایک)"
                                />
                            </AccordionItem>
                             {/* ... other accordions ... */}
                           <AccordionItem 
                                label="مشخصات ظاهری و حسی" 
                                isOpen={openSection === 'visual'} 
                                onClick={() => toggleSection('visual')}
                            >
                                <FeatureSection 
                                    items={formData.features?.visual || []} 
                                    onChange={(items) => updateStaticFeatures('visual', items)} 
                                    placeholderKey="عنوان (مثلا: رنگ)"
                                    placeholderValue="مقدار (مثلا: قرمز)"
                                />
                            </AccordionItem>
                            
                            <AccordionItem 
                                label="نحوه تولید و فرآوری" 
                                isOpen={openSection === 'production'} 
                                onClick={() => toggleSection('production')}
                            >
                                <FeatureSection 
                                    items={formData.features?.production || []} 
                                    onChange={(items) => updateStaticFeatures('production', items)} 
                                    placeholderKey="عنوان (مثلا: روش تولید)"
                                    placeholderValue="مقدار (مثلا: دست‌ساز)"
                                />
                            </AccordionItem>
                            
                            <AccordionItem 
                                label="بسته‌بندی و عرضه" 
                                isOpen={openSection === 'packaging'} 
                                onClick={() => toggleSection('packaging')}
                            >
                                <FeatureSection 
                                    items={formData.features?.packaging || []} 
                                    onChange={(items) => updateStaticFeatures('packaging', items)} 
                                    placeholderKey="عنوان (مثلا: نوع بسته)"
                                    placeholderValue="مقدار (مثلا: جعبه مقوایی)"
                                />
                            </AccordionItem>
                        </div>

                         {/* Bottom Info */}
                         <div className="w-full flex justify-end items-start gap-2 mt-2">
                             <Info className="w-5 h-5 text-[#666D80] mt-0.5 transform rotate-180" />
                             <p className="flex-1 text-right text-[#666D80] text-[13px] font-light font-['PeydaWeb'] leading-tight">
                                تکمیل جزئیات فنی محصول، علاوه بر افزایش اعتماد مشتری، باعث بهبود رتبه محصول در نتایج جستجو می‌شود. توصیه می‌کنیم برای تمایز از رقبا، این بخش را تکمیل فرمایید.
                            </p>
                            
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full p-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10 mt-auto">
                     <button 
                        className="w-[57px] h-[57px] rounded-xl border border-[#DCE4E8] flex justify-center items-center hover:bg-gray-50"
                        onClick={() => onStepClick('step1')} 
                     >
                         <ChevronRight className="w-6 h-6 text-[#1A1C1E] rotate-180" /> 
                    </button>

                    <button 
                        onClick={onNext}
                        className="flex-1 h-10 px-4 py-3.5 bg-gradient-to-t from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.15)] bg-[#FDD00A] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-xl border border-[#FDD00A] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity h-[57px]"
                    >
                        <span className="text-center text-[#1A1C1E] text-[17.58px] font-semibold font-['PeydaWeb'] leading-[24.61px]">ادامه</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

// Helper Components
function StepItem({ step, label, isActive, isCompleted, onClick }: { step: string, label: string, isActive: boolean, isCompleted?: boolean, onClick?: () => void }) {
    return (
        <div 
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

function AccordionItem({ label, isOpen, onClick, children }: { label: string, isOpen: boolean, onClick: () => void, children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col items-end border-b border-[#F0F0F0] last:border-0 pb-2">
            <div 
                className="w-full flex justify-between items-center cursor-pointer py-3 hover:bg-gray-50 rounded-lg px-2"
                onClick={onClick}
            >
                <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
                    {label}
                </span>
                <ChevronLeft className={`w-5 h-5 text-[#666D80] transition-transform duration-200 ${isOpen ? '-rotate-90' : ''}`} />
            </div>
            <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-2 pt-0 w-full" dir="rtl">
                    {children}
                </div>
            </div>
        </div>
    );
}

function FeatureSection({ items, onChange, placeholderKey, placeholderValue }: { 
    items: FeatureItem[], 
    onChange: (items: FeatureItem[]) => void,
    placeholderKey: string,
    placeholderValue: string
}) {
    const addRow = () => onChange([...items, { key: '', value: '' }]);
    const removeRow = (idx: number) => onChange(items.filter((_, i) => i !== idx));
    const updateRow = (idx: number, field: 'key' | 'value', val: string) => {
        const newItems = [...items];
        newItems[idx] = { ...newItems[idx], [field]: val };
        onChange(newItems);
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            {items.length === 0 && (
                <div className="text-xs text-gray-400 text-center py-2">
                    ویژگی‌ای افزوده نشده است.
                </div>
            )}
            
            {items.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center w-full">
                    <input 
                        value={item.key} 
                        onChange={e => updateRow(idx, 'key', e.target.value)} 
                        placeholder={placeholderKey}
                        className="flex-1 h-10 px-3 rounded-lg border border-[#DFE1E7] text-right text-sm outline-none focus:border-[#FDD00A] focus:ring-1 focus:ring-[#FDD00A]"
                    />
                    <div className="text-gray-400">:</div>
                    <input 
                        value={item.value} 
                        onChange={e => updateRow(idx, 'value', e.target.value)} 
                        placeholder={placeholderValue}
                        className="flex-1 h-10 px-3 rounded-lg border border-[#DFE1E7] text-right text-sm outline-none focus:border-[#FDD00A] focus:ring-1 focus:ring-[#FDD00A]"
                    />
                    <button onClick={() => removeRow(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-md">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ))}
            
            <button 
                onClick={addRow} 
                className="w-full h-9 mt-1 border border-dashed border-[#FDD00A] text-[#FDD00A] bg-[#FEFCE8] hover:bg-[#FEF9C3] rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
                <Plus className="w-4 h-4" />
                <span>افزودن ویژگی جدید</span>
            </button>
        </div>
    );
}

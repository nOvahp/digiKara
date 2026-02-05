import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { studentProductService } from '@/app/services/studentProductService';
import { ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewProductProps {
    onClose: () => void;
    onNext: () => void;
    onStepClick: (step: string) => void;
    formData: any;
    updateFormData: (data: any) => void;
    categories?: {id: number | string, name: string}[];
}

export function NewProduct({ onClose, onNext, onStepClick, formData, updateFormData, categories = [] }: NewProductProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fetchedCategories, setFetchedCategories] = useState<{id: number | string, name: string}[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    React.useEffect(() => {
        const fetchCategories = async () => {
            const { success, data } = await studentProductService.getCategories();
            if (success && data) {
                setFetchedCategories(data);
            }
        };
        fetchCategories();
    }, []);

    const activeCategories = fetchedCategories.length > 0 ? fetchedCategories : categories;

    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors(prev => {
                const newErr = { ...prev };
                delete newErr[field];
                return newErr;
            });
        }
    };

    const handleNext = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.name) newErrors.name = "لطفا نام محصول را وارد کنید";
        if (!formData.category) newErrors.category = "لطفا دسته بندی را انتخاب کنید";
        if (!formData.description) newErrors.description = "لطفا توضیحات محصول را وارد کنید";
        if (formData.images.length === 0) newErrors.images = "لطفا حداقل یک تصویر برای محصول انتخاب کنید";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onNext();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            const newImages = newFiles.map(file => URL.createObjectURL(file));
            
            const currentFiles = formData.imageFiles || [];
            
            updateFormData({ 
                images: [...formData.images, ...newImages],
                imageFiles: [...currentFiles, ...newFiles]
            });
            clearError('images');
        }
    };

    const removeImage = (index: number) => {
        const newImages = formData.images.filter((_: string, i: number) => i !== index);
        const currentFiles = formData.imageFiles || [];
        const newFiles = currentFiles.filter((_: any, i: number) => i !== index);
        
        updateFormData({ 
            images: newImages, 
            imageFiles: newFiles 
        });
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
                <div className="w-full p-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
                     <button 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full border border-[#DFE1E7] flex items-center justify-center hover:bg-gray-50"
                    >
                         <div className="relative w-6 h-6 flex items-center justify-center">
                            <span className="text-xl font-bold text-[#0D0D12]">&times;</span> 
                        </div>
                    </button>
                    <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
                        افزودن محصول جدید
                    </div>
                </div>

                {/* Steps Bar - Style matched to hojreCreation/step2 */}
                {/* Steps Bar - Style matched to hojreCreation/step2 */}
                <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-end items-center gap-3 overflow-x-auto no-scrollbar" dir="ltr">
                     <StepIndicator step="6" label="تائید نهایی" isActive={false} onClick={() => onStepClick('step6')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     
                     <StepIndicator step="5" label="دسته بندی و برچسب ها" isActive={false} onClick={() => onStepClick('step5')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     
                     <StepIndicator step="4" label="موجودی" isActive={false} onClick={() => onStepClick('step4')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     
                     <StepIndicator step="3" label="قیمت گذاری" isActive={false} onClick={() => onStepClick('step3')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     
                     <StepIndicator step="2" label="ویژگی ها" isActive={false} onClick={() => onStepClick('step2')} />
                     <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
                     
                     <StepIndicator step="1" label="اطلاعات پایه" isActive={true} onClick={() => onStepClick('step1')} />
                </div>

                {/* Scrollable Form Body */}
                <div className="flex-1 overflow-y-auto w-full p-5 flex flex-col gap-4">
                    
                    {/* Product Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight tracking-wide">
                            نام محصول
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => {
                                updateFormData({ name: e.target.value });
                                clearError('name');
                            }}
                            className={`w-full h-[52px] bg-white rounded-xl border ${errors.name ? 'border-red-500' : 'border-[#DFE1E7]'} px-3 text-right text-[#0D0D12] text-sm font-normal outline-none focus:border-[#FDD00A] placeholder:text-[#DFE1E7] placeholder:font-medium`}
                            placeholder="نام محصول را وارد کنید"
                            dir="rtl"
                        />
                        {errors.name && <span className="text-red-500 text-xs text-right font-medium">{errors.name}</span>}
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight">
                            دسته بندی
                        </label>
                        <Select
                            value={String(formData.category)}
                            onValueChange={(val) => {
                                updateFormData({ category: val });
                                clearError('category');
                            }}
                            dir="rtl"
                        >
                            <SelectTrigger className={`w-full h-[52px] bg-white rounded-xl border ${errors.category ? 'border-red-500' : 'border-[#DFE1E7]'} px-3 flex flex-row-reverse justify-between text-[#0D0D12] text-right font-light shadow-none focus:ring-0 focus:border-[#FDD00A]`}>
                                <SelectValue placeholder="انتخاب کنید" />
                            </SelectTrigger>
                            <SelectContent className="bg-white" dir="rtl">
                                {activeCategories.map((cat) => (
                                    <SelectItem key={cat.id} value={String(cat.id)} className="text-right cursor-pointer hover:bg-gray-50">
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category && <span className="text-red-500 text-xs text-right font-medium">{errors.category}</span>}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2 h-auto">
                        <label className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight tracking-wide">
                            توضیحات
                        </label>
                        <div className={`w-full h-[180px] bg-white rounded-xl border ${errors.description ? 'border-red-500' : 'border-[#DFE1E7]'} px-3 py-2.5 flex flex-col overflow-hidden focus-within:border-[#FDD00A]`}>
                            <textarea
                                value={formData.description}
                                onChange={(e) => {
                                    updateFormData({ description: e.target.value });
                                    clearError('description');
                                }}
                                className="flex-1 w-full bg-transparent border-none outline-none resize-none text-[#0D0D12] text-sm font-normal text-right font-['PeydaWeb'] placeholder:text-[#DFE1E7] placeholder:font-medium"
                                dir="rtl"
                                maxLength={200}
                                placeholder="توضیحات محصول..."
                            />
                             <div className="w-full text-left text-[#A4ACB9] text-xs font-light font-['PeydaFaNum'] tracking-wide">
                                {formData.description?.length || 0}/200
                            </div>
                        </div>
                        {errors.description && <span className="text-red-500 text-xs text-right font-medium">{errors.description}</span>}
                    </div>

                    {/* Images */}
                    <div className="flex flex-col gap-2">
                         <label className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight tracking-wide">
                            تصاویر محصول
                        </label>
                        
                        {formData.images.length > 0 ? (
                             <div className="w-full h-[137px] flex gap-2 overflow-x-auto pb-2" dir="rtl">
                                  <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`min-w-[100px] h-full bg-[rgba(255,220,133,0.20)] rounded-xl border ${errors.images ? 'border-red-500' : 'border-[#FFD369]'} flex flex-col justify-center items-center cursor-pointer hover:bg-[rgba(255,220,133,0.30)] transition-colors flex-shrink-0`}
                                  >
                                     <span className="text-[#666D80] text-xl font-bold">+</span>
                                  </div>
                                  {formData.images.map((img: string, index: number) => (
                                        <div key={index} className="relative min-w-[137px] h-full rounded-xl border border-[#DFE1E7] overflow-hidden flex-shrink-0 group">
                                            <img src={img} alt="Product" className="w-full h-full object-cover" />
                                            <button 
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                  ))}
                             </div>
                        ) : (
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className={`w-full h-[137px] bg-[rgba(255,220,133,0.20)] rounded-xl border ${errors.images ? 'border-red-500' : 'border-[#FFD369]'} flex justify-center items-center cursor-pointer hover:bg-[rgba(255,220,133,0.30)] transition-colors`}
                            >
                                <div className="text-center px-4">
                                    <span className="text-[#666D80] text-base font-light font-['PeydaWeb'] leading-normal tracking-wide">فایل های خود را بکشید و رها کنید یا </span>
                                    <span className="text-[#666D80] text-base font-semibold font-['PeydaWeb'] leading-normal tracking-wide">کلیک کنید</span>
                                </div>
                            </div>
                        )}
                        {errors.images && <span className="text-red-500 text-xs text-right font-medium">{errors.images}</span>}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full p-5 border-t border-[#DFE1E7] flex justify-between items-center bg-white z-10">
                     <button 
                        className="w-[57px] h-[57px] rounded-xl border border-[#DCE4E8] flex justify-center items-center hover:bg-gray-50"
                        onClick={onClose} 
                     >
                         <ChevronRight className="w-6 h-6 text-[#1A1C1E] rotate-180" /> 
                    </button>

                    <button
                        onClick={handleNext}
                        className="flex-1 h-[57px] bg-[#FDD00A] rounded-xl flex justify-center items-center hover:bg-[#eac009] transition-colors ml-3"
                    >
                        <span className="text-center text-[#1A1C1E] text-[17.58px] font-semibold font-['PeydaWeb'] leading-normal">
                            ادامه
                        </span>
                    </button>
                </div>

            </div>
        </div>
    );
}

// Helper Component for Steps
function StepIndicator({ step, label, isActive, onClick }: { step: string, label: string, isActive: boolean, onClick?: () => void }) {
    return (
        <div 
            className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
            onClick={onClick}
        >
             <span className={`text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide whitespace-nowrap ${isActive ? "text-[#0D0D12]" : "text-[#818898]"}`}>
                {label}
            </span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-['PeydaFaNum'] leading-[21px] tracking-wide ${isActive ? 'bg-[#FDD00A] text-white' : 'bg-[#DFE1E7] text-white'}`}>
                {step}
            </div>
        </div>
    );
}

import React, { useState, useRef } from 'react';
import { CategoryTagsForm } from './shared/CategoryTagsForm';
import { X, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

import { studentProductService } from '@/app/services/studentProductService';

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

    React.useEffect(() => {
        const fetchCategories = async () => {
            const { success, data } = await studentProductService.getCategories();
            if (success && data) {
                setFetchedCategories(data);
            }
        };
        fetchCategories();
    }, []);

    const handleNext = () => {
        try {
            if (!formData.name) throw new Error("لطفا نام محصول را وارد کنید");
            if (!formData.description) throw new Error("لطفا توضیحات محصول را وارد کنید");
            if (formData.images.length === 0) throw new Error("لطفا حداقل یک تصویر برای محصول انتخاب کنید");
            if (!formData.category) throw new Error("لطفا دسته بندی را انتخاب کنید");

            onNext();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error("خطای شبکه رخ داده است");
            } else {
                toast.error((error as Error).message);
            }
        }
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

            {/* Modal Content - Dimensions from design: 375px width, 837px height (capped at view height) */}
            <div className="relative w-[375px] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">

                {/* Header */}
                <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
                    <div className="w-10 h-10 relative overflow-hidden rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50" onClick={onClose}>
                        <div className="absolute w-6 h-6 overflow-hidden flex items-center justify-center">
                            <X className="w-5 h-5 text-[#0D0D12]" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-[#0D0D12] text-lg font-semibold leading-relaxed tracking-wide">
                            افزودن محصول جدید
                        </div>
                        <div className="px-2 py-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-full flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-3 h-3 text-white" />
                            <span className="text-[10px] font-bold text-white tracking-wider">AI</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto w-full">
                    {/* Progress Steps */}
                    <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex items-center gap-4 overflow-x-auto" dir="rtl">
                        <StepItem number="1" label="اطلاعات پایه" isActive={true} onClick={() => onStepClick('step1')} />
                        <StepItem number="2" label="قیمت گذاری" isActive={false} onClick={() => onStepClick('step3')} />
                        <StepItem number="3" label="موجودی" isActive={false} onClick={() => onStepClick('step4')} />
                        <StepItem number="4" label="تائید نهایی" isActive={false} onClick={() => onStepClick('step6')} />
                    </div>

                    {/* Form Fields */}
                    <div className="w-full px-5 py-5 flex flex-col gap-4">

                        {/* Product Name */}
                        <div className="w-full flex flex-col gap-2">
                            <Label text="نام محصول" />
                            <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex items-center">
                                <input
                                    type="text"
                                    className="w-full h-full bg-transparent border-none outline-none text-[#0D0D12] text-right font-regular placeholder-[#A4ACB9]"
                                    dir="rtl"
                                    value={formData.name}
                                    onChange={(e) => updateFormData({ name: e.target.value })}
                                    placeholder="نام محصول را وارد کنید"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="w-full h-[180px] flex flex-col gap-2">
                            <div className="w-full flex justify-between items-center">
                                <button className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-full hover:opacity-90 transition-opacity group shadow-[0px_2px_4px_rgba(59,130,246,0.2)]">
                                    <Sparkles className="w-3 h-3 text-white" />
                                    <span className="text-white text-[9px] font-bold">تولید با هوش مصنوعی</span>
                                </button>
                                <Label text="توضیحات" />
                            </div>
                            <div className="w-full flex-1 bg-white rounded-xl border border-[#DFE1E7] px-3 py-2.5 flex flex-col justify-between">
                                <textarea
                                    className="w-full flex-1 bg-transparent border-none outline-none resize-none text-[#0D0D12] text-sm font-regular text-right placeholder-[#A4ACB9]"
                                    dir="rtl"
                                    value={formData.description}
                                    onChange={(e) => updateFormData({ description: e.target.value })}
                                    placeholder="توضیحات محصول را بنویسید..."
                                />
                                <div className="w-full text-left text-[#A4ACB9] text-xs font-num-medium leading-[18px] tracking-wide">
                                    {formData.description.length}/200
                                </div>
                            </div>
                        </div>

                        {/* Product Images - Drag & Drop & Preview */}
                        <div className="w-full flex flex-col gap-2">
                            <Label text="تصاویر محصول" />

                            {formData.images.length > 0 ? (
                                <div className="w-full h-[180px] flex gap-2 overflow-x-auto pb-2">
                                    <div
                                        className="min-w-[120px] h-full bg-[#FFDC85]/20 rounded-xl border border-[#FFD369] flex flex-col justify-center items-center cursor-pointer border-dashed flex-shrink-0 hover:bg-[#FFDC85]/30 transition-colors"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#FFD369] flex items-center justify-center mb-2">
                                            <span className="text-[#0D0D12] text-xl font-bold">+</span>
                                        </div>
                                        <span className="text-[#666D80] text-sm font-semibold">افزودن</span>
                                    </div>
                                    {formData.images.map((img: string, index: number) => (
                                        <div key={index} className="relative min-w-[180px] h-full rounded-xl border border-[#DFE1E7] overflow-hidden flex-shrink-0 group">
                                            <img src={img} alt={`Product ${index}`} className="w-full h-full object-cover" />
                                            <div
                                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-transform hover:scale-110"
                                                onClick={() => {
                                                    if (confirm('آیا از حذف این تصویر اطمینان دارید؟')) {
                                                        removeImage(index);
                                                    }
                                                }}
                                            >
                                                <X className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div
                                    className="w-full h-[180px] flex-1 bg-[#FFDC85]/20 rounded-xl border border-[#FFD369] px-3 flex justify-center items-center cursor-pointer border-dashed hover:bg-[#FFDC85]/30 transition-colors"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <span className="text-center">
                                        <span className="text-[#666D80] text-base font-light leading-normal tracking-wide">فایل های خود را بکشید و رها کنید یا </span>
                                        <span className="text-[#666D80] text-base font-semibold leading-normal tracking-wide">کلیک کنید</span>
                                    </span>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>

                        {/* Category and Tags - Replaced with Shared Component */}
                        {/* Category and Tags - Replaced with Shared Component */}
                        <CategoryTagsForm
                            values={{
                                category: formData.category,
                                tags: formData.tags,
                                metadata: '' // Assuming metadata isn't in main formData yet, or add it
                            }}
                            onChange={(updates) => updateFormData(updates)}
                            categories={fetchedCategories.length > 0 ? fetchedCategories : categories}
                        />

                        {/* Product ID */}
                        <div className="w-full flex flex-col gap-2">
                            <Label text="شناسه محصول" />
                            <div className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] px-3 flex items-center">
                                <div className="flex-1 text-left text-[#818898] text-base font-num-medium leading-normal tracking-wide" dir="ltr">
                                    {formData.id}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full px-5 py-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10 mt-auto">
                    <button
                        onClick={handleNext}
                        className="flex-1 h-10 px-4 py-2 bg-gradient-to-t from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.15)] bg-[#FFDA7F] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#FFDA7F] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <span className="text-center text-[#393E46] text-sm font-semibold leading-[21px] tracking-wide">ادامه</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

// Helper Components

function StepItem({ number, label, isActive, onClick }: { number: string, label: string, isActive: boolean, onClick?: () => void }) {
    return (
        <div className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity" onClick={onClick}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-num-medium leading-[21px] tracking-wide ${isActive ? 'bg-[#FFD369] text-[#393E46]' : 'bg-[#DFE1E7]'}`}>
                {number}
            </div>
            <span className={`text-sm leading-[21px] tracking-wide whitespace-nowrap ${isActive ? "text-[#0D0D12] font-bold" : "text-[#818898] font-semibold"}`}>
                {label}
            </span>
        </div>
    );
}

function Label({ text }: { text: string }) {
    return (
        <div className="w-full text-right text-[#666D80] text-sm font-semibold leading-[21px] tracking-wide">
            {text}
        </div>
    );
}

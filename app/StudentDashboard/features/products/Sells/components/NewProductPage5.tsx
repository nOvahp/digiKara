import React, { useState } from 'react';

import { ChevronRight, X, ChevronDown, Info } from 'lucide-react';
import { AddProductFormState } from '../types';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ProductStepper } from './shared/ProductStepper';

interface NewProductPage5Props {
  onClose: () => void;
  onNext: () => void;
  onStepClick: (step: string) => void;
  formData: AddProductFormState;
  updateFormData: (data: Partial<AddProductFormState>) => void;
  maxStep: number;
}

export function NewProductPage5({
  onClose,
  onNext,
  onStepClick,
  formData,
  updateFormData,
  maxStep,
}: NewProductPage5Props) {
  const [tags, setTags] = useState<string[]>(formData.tags || []);
  const [metadata, setMetadata] = useState(formData.metadata || '');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [showMetaInfo, setShowMetaInfo] = useState(false);

  // Mock available tags
  const availableTags = [
    'ارگانیک',
    'عسل طبیعی',
    'ویژه',
    'محلی',
    'بدون قند',
    'تخفیفی',
    'کوهی',
    'دست‌ساز',
  ];

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      updateFormData({ tags: newTags });
    }
    setIsTagDropdownOpen(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((t) => t !== tagToRemove);
    setTags(newTags);
    updateFormData({ tags: newTags });
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setMetadata(val);
    updateFormData({ metadata: val });
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#0D0D12]/40 backdrop-blur-[1px]" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-[375px] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
          <div
            className="w-10 h-10 relative overflow-hidden rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-[#0D0D12]" />
          </div>
          <div className="text-[#0D0D12] text-lg font-semibold leading-relaxed tracking-wide">
            افزودن محصول جدید
          </div>
        </div>

        {/* Progress Bar */}
        <ProductStepper currentStep="step5" onStepClick={onStepClick} maxStep={maxStep} />

        {/* Form Fields */}
        <div className="w-full flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
          {/* Tags */}
          <div className="flex flex-col gap-2">
            <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
              برچسب ها
            </div>
            <div className="relative">
              <div
                className="w-full min-h-[52px] px-3 py-2 bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-between cursor-pointer"
                onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                dir="rtl"
              >
                <div className="flex flex-wrap gap-2 flex-1 justify-start">
                  {tags.length > 0 ? (
                    tags.map((tag) => (
                      <div
                        key={tag}
                        className="h-6 pl-1 pr-2 bg-white rounded border border-[#DFE1E7] flex items-center gap-1"
                      >
                        <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">
                          {tag}
                        </span>
                        <div
                          className="w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveTag(tag);
                          }}
                        >
                          <X className="w-3 h-3 text-[#818898]" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-[#818898] text-base font-light font-['PeydaWeb']">
                      انتخاب کنید...
                    </span>
                  )}
                </div>
                <ChevronDown className="w-5 h-5 text-[#818898] shrink-0 ml-2" />
              </div>

              {/* Dropdown Menu */}
              {isTagDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#DFE1E7] rounded-xl shadow-lg z-20 max-h-[200px] overflow-y-auto">
                  {availableTags
                    .filter((t) => !tags.includes(t))
                    .map((tag) => (
                      <div
                        key={tag}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-[#0D0D12] text-sm font-medium text-right border-b border-[#F0F0F0] last:border-none"
                        onClick={() => handleAddTag(tag)}
                      >
                        {tag}
                      </div>
                    ))}
                  {availableTags.filter((t) => !tags.includes(t)).length === 0 && (
                    <div className="px-4 py-3 text-[#818898] text-sm font-['PeydaWeb'] text-center">
                      موردی یافت نشد
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-row-reverse">
             <button
                onClick={() => setShowMetaInfo(true)}
                className="w-5 h-5 rounded-full flex items-center justify-center text-[#818898] hover:text-[#FDD00A] transition-colors"
              >
                <Info className="w-4 h-4" />
              </button>
              <div className="text-right text-[#666D80] text-sm font-semibold ">
                متا دیتا (توضیحات سئو)
              </div>
              
            </div>
            
            <Textarea
              className="w-full h-[100px] px-3 py-3 bg-white rounded-xl border border-[#DFE1E7] outline-none text-right dir-rtl text-[#0D0D12] text-sm font-['PeydaWeb'] placeholder:text-[#9CA3AF] resize-none focus-visible:ring-0 shadow-none focus:border-[#FDD00A]"
              value={metadata}
              onChange={handleMetadataChange}
              placeholder="مثال: پیراهن نخی مردانه، مناسب فصل تابستان، بدون آبرفت، دارای ضمانت بازگشت وجه، ارسال فوری..."
            />
            <div className="text-right text-[#818898] text-xs font-light font-['PeydaWeb'] leading-relaxed">
              برای بهبود رتبه بندی در موتورهای جستجو، توضیحات متا را اضافه کنید.
            </div>
          </div>

          {/* Product ID */}
          <div className="flex flex-col gap-2">
            <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
              شناسه محصول
            </div>
            <div className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center">
              <Input
                type="text"
                className="w-full h-full border-none outline-none text-left dir-ltr text-[#DFE1E7] text-base font-normal font-['Geist'] bg-transparent cursor-default shadow-none focus-visible:ring-0 px-0"
                value="NK-PEG40-GRY-001"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="w-full p-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10 mt-auto">
          <button
            className="w-[57px] h-[57px] rounded-xl border border-[#DCE4E8] flex justify-center items-center hover:bg-gray-50 transition-colors"
            onClick={() => onStepClick('step4')}
          >
            <ChevronRight className="w-6 h-6 text-[#1A1C1E] rotate-180" />
          </button>
          <button
            onClick={handleNext}
            className="flex-1 h-[57px] bg-[#FDD00A] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-xl flex justify-center items-center hover:opacity-90 transition-opacity"
          >
            <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">
              ادامه
            </span>
          </button>
        </div>
      </div>

      {/* Meta Info Modal */}
      {showMetaInfo && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setShowMetaInfo(false)}
          />
          <div className="relative w-[340px] bg-white rounded-2xl shadow-xl p-5 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
               <button 
                onClick={() => setShowMetaInfo(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <h3 className="text-lg font-bold text-[#0D0D12] font-bold">
                توضیحات متا چیست؟
              </h3>
            </div>
            
            <div className="space-y-4 text-right" dir="rtl">
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                توضیحات متا (Meta Description) متنی کوتاه است که در نتایج جستجو (مانند گوگل) زیر عنوان محصول شما نمایش داده می‌شود.
              </p>
              
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-800 font-medium mb-1">چرا مهم است؟</p>
                <p className="text-xs text-blue-600 leading-relaxed font-medium">
                  نوشتن یک متن جذاب و شامل کلمات کلیدی، نرخ کلیک (CTR) را افزایش می‌دهد و باعث می‌شود مشتریان بیشتری محصول شما را ببینند.
                </p>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                <p className="text-xs text-yellow-800 font-medium mb-1">مثال خوب:</p>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  &quot;کفش ورزشی نایک مدل ایرمکس، سبک و راحت برای پیاده‌روی روزانه. با کفی طبی و ضمانت اصالت کالا. ارسال رایگان به سراسر کشور.&quot;
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowMetaInfo(false)}
              className="w-full mt-5 h-10 bg-[#FDD00A] rounded-xl text-[#0D0D12] text-sm font-semibold hover:bg-[#eac009] transition-colors"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helpers


import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { ChevronRight, X, ChevronDown } from 'lucide-react';
import { z } from 'zod';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

interface NewProductPage5Props {
  onClose: () => void;
  onNext: () => void;
  onStepClick: (step: string) => void;
  formData: any;
  updateFormData: (data: any) => void;
}

export function NewProductPage5({
  onClose,
  onNext,
  onStepClick,
  formData,
  updateFormData,
}: NewProductPage5Props) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<string[]>(formData.tags || []);
  const [metadata, setMetadata] = useState(formData.metadata || '');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

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

  // Auto-scroll active step to center on mount
  useEffect(() => {
    if (progressBarRef.current && activeStepRef.current) {
      const progressBar = progressBarRef.current;
      const activeStep = activeStepRef.current;

      const scrollLeft =
        activeStep.offsetLeft - progressBar.clientWidth / 2 + activeStep.clientWidth / 2;
      progressBar.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, []);

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
        <div
          ref={progressBarRef}
          className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-end items-center gap-3 overflow-x-auto no-scrollbar"
          dir="ltr"
        >
          <StepItem
            step="6"
            label="تائید نهایی"
            isActive={false}
            onClick={() => onStepClick('step6')}
          />
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
          <StepItem
            step="5"
            label="دسته بندی و برچسب ها"
            isActive={true}
            onClick={() => {}}
            ref={activeStepRef}
          />
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
          <StepItem
            step="4"
            label="موجودی"
            isActive={false}
            isCompleted={true}
            onClick={() => onStepClick('step4')}
          />
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
          <StepItem
            step="3"
            label="قیمت گذاری"
            isActive={false}
            isCompleted={true}
            onClick={() => onStepClick('step3')}
          />
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
          <StepItem
            step="2"
            label="ویژگی ها"
            isActive={false}
            isCompleted={true}
            onClick={() => onStepClick('step2')}
          />
          <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />
          <StepItem
            step="1"
            label="اطلاعات پایه"
            isActive={false}
            isCompleted={true}
            onClick={() => onStepClick('step1')}
          />
        </div>

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
            <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
              متا دیتا
            </div>
            <textarea
              className="w-full h-[52px] px-3 py-3 bg-white rounded-xl border border-[#DFE1E7] outline-none text-right dir-rtl text-[#0D0D12] text-base font-normal font-['PeydaWeb'] placeholder:text-[#DFE1E7] resize-none h-auto min-h-[52px]"
              value={metadata}
              onChange={handleMetadataChange}
            />
            <div className="text-right text-[#818898] text-sm font-light font-['PeydaWeb'] leading-relaxed">
              برای بهبود رتبه بندی در موتورهای جستجو، توضیحات متا را اضافه کنید.
            </div>
          </div>

          {/* Product ID */}
          <div className="flex flex-col gap-2">
            <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
              شناسه محصول
            </div>
            <div className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center">
              <input
                type="text"
                className="w-full h-full border-none outline-none text-left dir-ltr text-[#DFE1E7] text-base font-normal font-['Geist'] bg-transparent cursor-default"
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
    </div>
  );
}

// Helpers
const StepItem = React.forwardRef<
  HTMLDivElement,
  {
    step: string;
    label: string;
    isActive: boolean;
    isCompleted?: boolean;
    onClick?: () => void;
  }
>(({ step, label, isActive, isCompleted, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer"
      onClick={onClick}
    >
      <span
        className={`text-sm font-medium font-['PeydaWeb'] leading-[21px] tracking-wide whitespace-nowrap ${isActive ? 'text-[#0D0D12]' : 'text-[#818898]'}`}
      >
        {label}
      </span>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold font-['PeydaFaNum'] leading-[21px] tracking-wide ${isActive ? 'bg-[#FFD369] text-white' : 'bg-[#DFE1E7] text-white'}`}
      >
        {toFarsiNumber(step)}
      </div>
    </div>
  );
});

StepItem.displayName = 'StepItem';

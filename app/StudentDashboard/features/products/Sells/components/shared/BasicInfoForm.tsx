import React, { useState, useRef } from 'react';
import { FormLabel } from './FormLabel';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

interface BasicInfoFormProps {
  defaultValues?: Record<string, unknown>;
  values?: {
    name: string;
    description: string;
    id: string;
    images?: string[];
    image?: string | null;
    imageFile?: File | null;
  };
  onChange?: (
    updates: Partial<{
      name: string;
      description: string;
      id: string;
      images?: string[];
      image?: string | null;
      imageFile?: File | null;
    }>,
  ) => void;
}

export function BasicInfoForm({ defaultValues = {}, values, onChange }: BasicInfoFormProps) {
  const [activeImage, setActiveImage] = useState(1);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const val = (field: string): string => {
    const value = values ? (values as Record<string, unknown>)[field] : (defaultValues as Record<string, unknown>)[field];
    return String(value || '');
  };

  // Normalize images: use provided images array, or fallback to single image, or placeholder
  const getImages = () => {
    if (values?.images && values.images.length > 0) return values.images;
    if (values?.image) return [values.image];
    return [];
  };

  const productImages = getImages();

  const handleChange = (field: string, value: unknown) => {
    if (onChange) {
      onChange({ [field]: value });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation (e.g. size, type)
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast.error('حجم تصویر نباید بیشتر از ۵ مگابایت باشد');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Append to images list
      const currentImages = [...productImages];
      currentImages.push(base64String);

      // Update images array
      handleChange('images', currentImages);
      // Also update single 'image' field if it's the first one
      if (currentImages.length === 1) {
        handleChange('image', base64String);
        handleChange('imageFile', file); // Pass the raw file
      }
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveImage = (index: number) => {
    const currentImages = [...productImages];
    currentImages.splice(index, 1);

    handleChange('images', currentImages);
    // Update 'image' field logic
    if (currentImages.length > 0) {
      // If we removed the 'main' one (index 0 usually), update 'image' to new first
      // Simply syncing 'image' to the first item roughly maps to 'main image'
      handleChange('image', currentImages[0]);
      // Note: If we remove the main image, we lose the 'imageFile' ref for it
      // unless we track an array of files. For now, assuming single image upload flow primarily.
      if (index === 0) handleChange('imageFile', null);
    } else {
      handleChange('image', null);
      handleChange('imageFile', null);
    }

    // Adjust active index
    if (activeImage > currentImages.length && currentImages.length > 0) {
      setActiveImage(currentImages.length);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#DFE1E7] p-5 flex flex-col gap-5 shadow-sm">
      <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] text-right">
        اطلاعات پایه
      </div>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <FormLabel text="نام محصول" />
        <input
          type="text"
          value={val('name') || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] text-right text-[#0D0D12] text-base font-medium font-['PeydaWeb'] outline-none focus:border-[#FDD00A] transition-colors placeholder:text-[#DFE1E7]"
          dir="rtl"
          placeholder="نام محصول را وارد کنید"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <FormLabel text="توضیحات" />
        <div className="h-[180px] p-3 bg-white rounded-xl border border-[#DFE1E7] flex flex-col focus-within:border-[#FDD00A] transition-colors">
          <textarea
            className="w-full flex-1 text-right text-[#0D0D12] text-base font-normal font-['PeydaWeb'] bg-transparent outline-none resize-none leading-relaxed placeholder:text-[#DFE1E7]"
            value={val('description') || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            dir="rtl"
            placeholder="توضیحات محصول..."
          />
          <div className="text-left text-[#A4ACB9] text-xs font-light font-['PeydaFaNum'] mt-2">
            {toFarsiNumber((val('description') || '').length)}
          </div>
        </div>
      </div>

      {/* ID */}
      <div className="flex flex-col gap-2">
        <FormLabel text="شناسه محصول" />
        <div className="h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center">
          <div
            className="w-full text-left text-[#0D0D12] text-base font-num-medium dir-ltr"
            dir="ltr"
          >
            {val('id') || '---'}
          </div>
        </div>
      </div>

      {/* Images - Carousel Logic */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <FormLabel text="تصاویر محصول" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 text-[#0A33FF] text-xs font-semibold hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            اضافه کردن تصویر
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        <div className="w-full h-[180px] rounded-xl border border-[#DFE1E7] overflow-hidden relative group">
          {productImages.length === 0 ? (
            <div
              className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="w-8 h-8 opacity-50" />
              <span className="text-xs font-medium">تصویری وجود ندارد. برای افزودن کلیک کنید</span>
            </div>
          ) : (
            <>
              <div
                ref={scrollContainerRef}
                className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              >
                {productImages.map((img, i) => (
                  <div
                    key={i}
                    className="w-full h-full flex-shrink-0 relative snap-center bg-gray-50 flex items-center justify-center"
                  >
                    <Image
                      src={img}
                      alt={`product-${i}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105 cursor-zoom-in"
                      onClick={() => setExpandedImage(img)}
                      sizes="100vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.classList.add('bg-gray-100');
                          if (!parent.querySelector('.img-error-msg')) {
                            const msg = document.createElement('div');
                            msg.className =
                              'img-error-msg absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-gray-400';
                            msg.innerHTML = `<span class="text-[10px]">تصویر یافت نشد</span>`;
                            parent.appendChild(msg);
                          }
                        }
                      }}
                    />

                    {/* Remove Button */}
                    <div className="absolute top-2 right-2 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('آیا از حذف این تصویر اطمینان دارید؟')) {
                            handleRemoveImage(i);
                          }
                        }}
                        className="w-7 h-7 bg-white/80 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center shadow-sm backdrop-blur-sm transition-all"
                        title="حذف تصویر"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              {productImages.length > 1 && (
                <div className="absolute flex gap-2 z-10 bottom-3 right-3">
                  <div className="flex gap-2 items-center flex-row-reverse">
                    {productImages.map((_, i) => {
                      const num = i + 1;
                      return (
                        <div
                          key={num}
                          onClick={() => {
                            if (scrollContainerRef.current) {
                              const width = scrollContainerRef.current.offsetWidth;
                              scrollContainerRef.current.scrollTo({
                                left: width * (num - 1),
                                behavior: 'smooth',
                              });
                            }
                            setActiveImage(num);
                          }}
                          className="cursor-pointer"
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-num-medium transition-colors ${activeImage === num ? 'bg-[#FFD369] text-[#0D0D12]' : 'bg-[#0D0D12]/45 text-white'}`}
                          >
                            {toFarsiNumber(num)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setExpandedImage(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedImage(null);
            }}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full">
            <Image
              src={expandedImage}
              fill
              className="object-contain rounded-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
              alt="Full size"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}

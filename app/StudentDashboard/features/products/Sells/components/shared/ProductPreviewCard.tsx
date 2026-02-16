import React, { useState, useEffect } from 'react';
import { Heart, Eye, ListCheck, Info, Star, Share2 } from 'lucide-react';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const formatPrice = (price: string | number) => {
  if (!price) return '۰';
  return toFarsiNumber(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
};

// Helper to map color names to codes (basic mock)
const getColorCode = (name: string) => {
  const map: Record<string, string> = {
    قرمز: '#EF4444',
    آبی: '#3B82F6',
    سبز: '#10B981',
    زرد: '#F59E0B',
    مشکی: '#000000',
    سفید: '#FFFFFF',
    'قهوه ای': '#A2845E',
    خاکستری: '#6B7280',
    نارنجی: '#F97316',
    بنفش: '#8B5CF6',
    صورتی: '#EC4899',
  };
  return map[name] || '#CCCCCC';
};

const PRICE_TYPE_LABELS: Record<number, string> = {
  1: 'رنگ',
  2: 'سایز',
  3: 'جنس',
  4: 'گارانتی',
  5: 'متفرقه',
  6: 'وزن',
};

import { AddProductFormState, VariantFeature, VariantPrice } from '../../types';
import { Product } from '@/app/services/products/productsService';

// Define a unified type for preview
type PreviewProduct = Omit<Partial<Product>, 'id'> & {
  id?: string | number;
  variantFeatures?: VariantFeature[];
  variantPrices?: VariantPrice[];
  extraPrices?: VariantPrice[]; // Legacy support
  isMultiPrice?: boolean;
  features?: {
    id: FeatureItem[];
    visual: FeatureItem[];
    production: FeatureItem[];
    packaging: FeatureItem[];
  };
};

interface FeatureItem {
  key: string;
  value: string;
}

export interface ProductPreviewProps {
  product: PreviewProduct;
}

export function ProductPreviewCard({ product }: ProductPreviewProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [currentPrice, setCurrentPrice] = useState<string | number>(product.price || 0);

  // Initialize images
  const images =
    product.images && product.images.length > 0
      ? product.images.map((img) => (typeof img === 'string' ? img : URL.createObjectURL(img)))
      : [];

  const mainImage = activeImage || (images.length > 0 ? images[0] : null);

  // Determine mode
  const isEditMode = !!(product.prices && product.prices.length > 0);
  const isWizardMode = !!(product.variantFeatures && product.variantFeatures.length > 0);

  // Derive features from either variantFeatures (Wizard) or prices (Edit Page)
  const displayFeatures = React.useMemo(() => {
    // Priority: Prices (Edit Mode) > VariantFeatures (Wizard Legacy/Metadata)
    // If we have explicit price definitions, they are the source of truth.
    if (isEditMode && product.prices) {
      const groups: Record<string, Set<string>> = {};
      product.prices.forEach((p) => {
        const price = p as { type?: number | string; title?: string };
        let effectiveType = Number(price.type);
        let value = price.title || '';

        // HEURISTIC: Detect "Weight" mislabeled as "Color"
        if (value.trim().startsWith('وزن:') || value.trim().startsWith('وزن :')) {
          effectiveType = 6; // Force Weight Type
        }

        const label = PRICE_TYPE_LABELS[effectiveType] || 'سایر';
        if (!groups[label]) groups[label] = new Set();

        // Normalize: string prefix
        const prefix = `${label}:`;
        const prefixPersian = `${label} :`;

        if (value.startsWith(prefix)) {
          value = value.substring(prefix.length).trim();
        } else if (value.startsWith(prefixPersian)) {
          value = value.substring(prefixPersian.length).trim();
        } else if (value.includes(':')) {
          const parts = value.split(':');
          if (parts.length > 1 && parts[0].trim() === label) {
            value = parts.slice(1).join(':').trim();
          }
        }

        if (value) groups[label].add(value);
      });

      return Object.entries(groups).map(([title, valuesSet]) => ({
        title,
        values: Array.from(valuesSet as Set<string>),
      }));
    }

    if (isWizardMode) {
      return product.variantFeatures;
    }

    return [];
  }, [product, isEditMode, isWizardMode]);

  // Initialize default selections
  useEffect(() => {
    if (displayFeatures && displayFeatures.length > 0) {
      const defaults: Record<string, string> = {};
      displayFeatures.forEach((f) => {
        if (f.values && f.values.length > 0) {
          defaults[f.title] = f.values[0];
        }
      });
      setSelectedVariants(defaults);
    }
  }, [displayFeatures]);

  // Update price when selections change
  useEffect(() => {
    const basePrice = parseInt(product.price?.toString().replace(/\D/g, '') || '0');
    let calculatedPrice = basePrice;

    // 1. Logic for "Edit Page"
    if (isEditMode && product.prices) {
      Object.entries(selectedVariants).forEach(([label, value]) => {
        // Find price item matching Type Label + Title
        const priceItem = product.prices!.find((p) => {
          const price = p as { type?: number | string; title?: string };
          let effectiveType = Number(price.type);
          let rawTitle = price.title || '';

          // HEURISTIC: Detect "Weight" mislabeled
          if (rawTitle.trim().startsWith('وزن:') || rawTitle.trim().startsWith('وزن :')) {
            effectiveType = 6;
          }

          const typeLabel = PRICE_TYPE_LABELS[effectiveType] || 'سایر';
          if (typeLabel !== label) return false;

          // Normalize title for comparison
          const prefix = `${label}:`;
          const prefixPersian = `${label} :`;

          if (rawTitle.startsWith(prefix)) {
            rawTitle = rawTitle.substring(prefix.length).trim();
          } else if (rawTitle.startsWith(prefixPersian)) {
            rawTitle = rawTitle.substring(prefixPersian.length).trim();
          } else if (rawTitle.includes(':')) {
            const parts = rawTitle.split(':');
            if (parts.length > 1 && parts[0].trim() === label) {
              rawTitle = parts.slice(1).join(':').trim();
            }
          }

          return rawTitle === value;
        });

        if (priceItem) {
          const variantAmount = parseInt((priceItem as any).amount?.toString().replace(/\D/g, '') || '0');
          const difference = variantAmount - basePrice;
          calculatedPrice += difference;
        }
      });
      setCurrentPrice(calculatedPrice);
      return;
    }

    // 2. Logic for "Wizard"
    const wizardPrices = product.variantPrices || product.extraPrices || [];
    if (wizardPrices.length > 0) {
      for (const [title, value] of Object.entries(selectedVariants)) {
        const key = `${title}: ${value}`;
        const variantPrice = wizardPrices.find(
          (p: unknown) => (p as { variantLabel?: string; title?: string }).variantLabel === key || (p as { variantLabel?: string; title?: string }).title === key,
        );
        if (variantPrice) {
          const variantAmount = parseInt(variantPrice.amount?.toString().replace(/\D/g, '') || '0');
          const difference = variantAmount - basePrice;
          calculatedPrice += difference;
        }
      }
      setCurrentPrice(calculatedPrice);
      return;
    }

    // Fallback
    setCurrentPrice(basePrice);
  }, [selectedVariants, product, isEditMode]);

  const handleSelect = (title: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [title]: value }));
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Headers, Images, Price, etc... (Unchanged) */}
      <div className="text-right text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] leading-normal tracking-wide">
        پیش نمایش زنده
      </div>

      <div className="flex flex-col gap-3">
        {mainImage ? (
          <img
            src={mainImage}
            alt="Product Preview"
            className="w-full h-[305px] object-cover rounded-xl border border-[#DFE1E7]"
          />
        ) : (
          <div className="w-full h-[305px] bg-gray-50 rounded-xl border border-[#DFE1E7] flex flex-col items-center justify-center text-gray-400 gap-2">
            <Info className="w-8 h-8" />
            <span className="text-sm">تصویری بارگذاری نشده است</span>
          </div>
        )}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 px-1" dir="rtl">
            {images.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className={`w-[75px] h-[56px] object-cover rounded-lg border cursor-pointer transition-all ${mainImage === img ? 'border-[#FDD00A] ring-2 ring-[#FDD00A]/20' : 'border-[#DFE1E7] hover:border-gray-400'}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center" dir="rtl">
        <div className="px-3 py-1 bg-[#ECF9F7] rounded-2xl flex items-center justify-center">
          <span className="text-[#267666] text-sm font-semibold font-['PeydaWeb'] tracking-wide">
            پرفروش ترین
          </span>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-[#0047AB] text-lg font-semibold font-['PeydaFaNum']">
            {formatPrice(currentPrice)} ریال
          </div>
          {(isEditMode || product.isMultiPrice) && (
            <span className="text-xs text-gray-500 font-['PeydaWeb']">قیمت بسته به ویژگی</span>
          )}
        </div>
      </div>

      <div className="text-right text-[#0D0D12] text-xl font-semibold font-['PeydaWeb'] leading-relaxed">
        {product.name || 'نام محصول'}
      </div>

      {/* Engagement Stats... (Keep Unchanged) */}
      <div className="flex justify-start items-center gap-2" dir="rtl">
        <div className="h-[30px] px-2.5 bg-white rounded-lg border border-[#E4E6EA] flex items-center gap-1.5 select-none">
          <Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
          <span className="text-[#3D424D] text-[13px] font-medium font-['PeydaFaNum'] mt-0.5">
            ۴.۵
          </span>
          <span className="text-[#9CA3AF] text-[11px] font-normal font-['PeydaFaNum'] mt-0.5">
            (۱۲ نظر)
          </span>
        </div>
        <div className="h-[30px] px-2.5 bg-white rounded-lg border border-[#E4E6EA] flex items-center gap-1.5 select-none">
          <Heart className="w-4 h-4 text-[#FF4D4D] fill-[#FF4D4D]" />
          <span className="text-[#3D424D] text-[13px] font-medium font-['PeydaFaNum'] mt-0.5">
            ۳۲
          </span>
        </div>
        <div className="h-[30px] px-2.5 bg-white rounded-lg border border-[#E4E6EA] flex items-center gap-1.5 select-none">
          <Eye className="w-4 h-4 text-[#9CA3AF]" />
          <span className="text-[#3D424D] text-[13px] font-medium font-['PeydaFaNum'] mt-0.5">
            ۲۰۴
          </span>
        </div>
        <div className="ml-auto">
          <div className="w-[30px] h-[30px] bg-white rounded-lg border border-[#E4E6EA] flex items-center justify-center cursor-pointer hover:bg-gray-50">
            <Share2 className="w-4 h-4 text-[#6B7280]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-right border-t border-[#DFE1E7] pt-4">
        <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] tracking-wide">
          توضیحات
        </div>
        <div className=" rounded-xl p-4 ">
          <p className="text-[#6D7280] text-[15px] font-light  leading-7 tracking-wide whitespace-pre-wrap break-words">
            {product.description || 'توضیحات محصول ...'}
          </p>
        </div>
      </div>

      {/* Dynamic Variant Features (Selectable) */}
      {displayFeatures && displayFeatures.length > 0 && (
        <div className="flex flex-col gap-4 border-t border-[#DFE1E7] pt-4" dir="rtl">
          <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">
            ویژگی‌های قابل انتخاب
          </div>
          {displayFeatures.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-2">
              <div className="text-right text-[#0D0D12] text-sm font-medium font-['PeydaWeb']">
                {feature.title}:{' '}
                <span className="text-[#35685A]">{selectedVariants[feature.title] || ''}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {feature.values.map((val: string, i: number) => {
                  const isSelected = selectedVariants[feature.title] === val;
                  return (
                    <div
                      key={i}
                      onClick={() => handleSelect(feature.title, val)}
                      className={`
                                                ${feature.title === 'رنگ' ? 'w-8 h-8 rounded-full border' : 'px-3 py-1 rounded-full border text-sm font-medium'}
                                                cursor-pointer flex items-center justify-center transition-all
                                                ${
                                                  isSelected
                                                    ? 'border-[#35685A] ring-1 ring-[#35685A] bg-gray-50'
                                                    : 'border-[#E5E5E5] hover:border-gray-300'
                                                }
                                            `}
                      style={feature.title === 'رنگ' ? { backgroundColor: getColorCode(val) } : {}}
                    >
                      {feature.title !== 'رنگ' && val}
                      {feature.title === 'رنگ' && isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Product Specifications (Read-only from Step 2) */}
      {product.features && Object.values(product.features).some((arr) => arr.length > 0) && (
        <div className="flex flex-col gap-3 border-t border-[#DFE1E7] pt-4" dir="rtl">
          <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] flex items-center gap-2">
            <ListCheck className="w-4 h-4" />
            مشخصات فنی
          </div>

          {/* Helper to render spec section */}
          {Object.entries({
            'ویژگی‌های ظاهری': product.features.visual,
            'ویژگی‌های تولید': product.features.production,
            'ویژگی‌های بسته بندی': product.features.packaging,
            شناسه: product.features.id,
          }).map(
            ([label, items]: [string, any]) =>
              items &&
              items.length > 0 && (
                <div key={label} className="flex flex-col gap-2 bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs font-semibold text-gray-500 mb-1">{label}</div>
                  {items.map((item: { key: string; value: string }, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm border-b border-gray-200 last:border-0 pb-1 last:pb-0"
                    >
                      <span className="text-[#666D80]">{item.key}</span>
                      <span className="text-[#0D0D12] font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}

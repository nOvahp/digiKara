'use client';

import React, { useRef, useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, Star, ListCheck } from 'lucide-react';
import { managerService } from '@/app/services/manager/managerService';

interface ManagerProductPopupProps {
  onClose: () => void;
  product: any;
  onApprove?: () => void;
}

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const formatPrice = (price: string | number) => {
  if (!price) return '۰';
  return toFarsiNumber(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
};

const PRICE_TYPE_LABELS: Record<number, string> = {
  1: 'رنگ',
  2: 'سایز',
  3: 'جنس',
  4: 'گارانتی',
  5: 'متفرقه',
  6: 'وزن',
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

const ManagerProductPopup = ({
  onClose,
  product: initialProduct,
  onApprove,
}: ManagerProductPopupProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [product, setProduct] = useState(initialProduct);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);

  // Fetch detailed product data
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!initialProduct?.id) return;
      setIsLoading(true);
      try {
        const response = await managerService.getManagerProductById(initialProduct.id);
        if (response.success && response.data) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch product details', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [initialProduct?.id]);

  // Variant Logic
  const { model_data } = product || {};
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [currentPrice, setCurrentPrice] = useState<string | number>(model_data?.price || 0);

  // Initial Setup for Variants
  const displayFeatures = React.useMemo(() => {
    if (model_data?.prices && model_data.prices.length > 0) {
      const groups: Record<string, Set<string>> = {};
      model_data.prices.forEach((p: any) => {
        let effectiveType = Number(p.type);
        let value = p.title;

        // HEURISTIC: Detect "Weight" mislabeled
        if (value.trim().startsWith('وزن:') || value.trim().startsWith('وزن :')) {
          effectiveType = 6;
        }

        const label = PRICE_TYPE_LABELS[effectiveType] || 'سایر';
        if (!groups[label]) groups[label] = new Set();

        // Normalize title
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
    return [];
  }, [model_data]);

  // Set defaults
  useEffect(() => {
    if (displayFeatures && displayFeatures.length > 0) {
      const defaults: Record<string, string> = {};
      displayFeatures.forEach((f: any) => {
        if (f.values && f.values.length > 0) {
          defaults[f.title] = f.values[0];
        }
      });
      setSelectedVariants(defaults);
    }
  }, [displayFeatures]);

  // Calculate Price
  useEffect(() => {
    const basePrice = parseInt(model_data?.price?.toString().replace(/\D/g, '') || '0');
    let calculatedPrice = basePrice;

    if (model_data?.prices && model_data.prices.length > 0) {
      Object.entries(selectedVariants).forEach(([label, value]) => {
        const priceItem = model_data.prices.find((p: any) => {
          let effectiveType = Number(p.type);
          let rawTitle = p.title;

          if (rawTitle.trim().startsWith('وزن:') || rawTitle.trim().startsWith('وزن :')) {
            effectiveType = 6;
          }

          const typeLabel = PRICE_TYPE_LABELS[effectiveType] || 'سایر';
          if (typeLabel !== label) return false;

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
          const variantAmount = parseInt(priceItem.amount?.toString().replace(/\D/g, '') || '0');
          const difference = variantAmount - basePrice;
          calculatedPrice += difference;
        }
      });
    }
    setCurrentPrice(calculatedPrice);
  }, [selectedVariants, model_data]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleApprove = async () => {
    if (!product || product.approved) return;

    setIsApproving(true);
    try {
      const response = await managerService.approveManagerProduct(product.id);
      if (response.success) {
        setProduct((prev: any) => ({ ...prev, approved: true }));
        if (onApprove) onApprove();
      }
    } catch (error) {
      console.error('Failed to approve product', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleSelect = (title: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [title]: value }));
  };

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      dir="rtl"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[440px] h-[90vh] bg-white rounded-xl border border-[#DFE1E7] overflow-y-auto flex flex-col justify-start items-start gap-5 p-5 relative shadow-lg animate-in fade-in zoom-in duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-20"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Title */}
        <div className="self-stretch text-right mt-2 flex flex-col items-start gap-1">
          <span className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
            {model_data?.title || '...'}
          </span>
          <span className="text-[#666D80] text-sm">
            توسط: {product.firstname} {product.lastname}
          </span>
        </div>

        {isLoading ? (
          <div className="flex-1 w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A33FF]"></div>
          </div>
        ) : (
          <div className="self-stretch flex-col justify-start items-end gap-4 flex w-full flex-1 overflow-y-auto no-scrollbar pb-20">
            {/* Image Section */}
            {model_data.image_path ? (
              <div className="self-stretch flex-col justify-start items-start gap-3 flex w-full shrink-0">
                <img
                  className="self-stretch h-[200px] w-full object-cover rounded-xl border border-[#DFE1E7]"
                  src={`https://digikara.back.adiaweb.dev/storage/${model_data.image_path}`}
                  alt={model_data.title}
                />
              </div>
            ) : (
              <div className="self-stretch h-[200px] bg-gray-50 rounded-xl border border-[#DFE1E7] flex flex-col items-center justify-center text-gray-400 gap-2">
                <Info className="w-8 h-8" />
                <span className="text-sm">تصویری بارگذاری نشده است</span>
              </div>
            )}

            {/* Price and Variants Section */}
            <div className="w-full flex justify-between items-center bg-[#F9FAFB] p-3 rounded-xl border border-[#DFE1E7]">
              <div className="flex flex-col items-start">
                <span className="text-[#666D80] text-xs">قیمت نهایی</span>
                <div className="text-[#0047AB] text-lg font-semibold font-['PeydaFaNum']">
                  {formatPrice(currentPrice)} ریال
                </div>
              </div>
              {model_data.prices && model_data.prices.length > 0 && (
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                  چند قیمتی
                </span>
              )}
            </div>

            {/* Dynamic Variant Selectors */}
            {displayFeatures && displayFeatures.length > 0 && (
              <div className="self-stretch flex flex-col gap-3 w-full border-t border-[#DFE1E7] pt-3">
                {displayFeatures.map((feature: any) => (
                  <div key={feature.title} className="flex flex-col gap-2">
                    <div className="text-right text-[#0D0D12] text-sm font-medium font-['PeydaWeb']">
                      {feature.title}:{' '}
                      <span className="text-[#35685A]">
                        {selectedVariants[feature.title] || ''}
                      </span>
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
                            style={
                              feature.title === 'رنگ' ? { backgroundColor: getColorCode(val) } : {}
                            }
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

            {/* Details List */}
            <div className="self-stretch flex-col justify-start items-start gap-2 flex w-full">
              {/* School */}
              <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl border border-[#DFE1E7] flex justify-between items-center gap-2">
                <div className="flex justify-end items-center gap-2 w-[100px]">
                  <div className="flex-1 text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight tracking-wide">
                    مدرسه
                  </div>
                </div>
                <div className="flex-1 text-[#818898] text-base font-medium leading-relaxed tracking-wide text-left truncate">
                  {product.school_name}
                </div>
              </div>

              {/* Count */}
              <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl border border-[#DFE1E7] flex justify-between items-center gap-2">
                <div className="flex justify-end items-center gap-2 w-[100px]">
                  <div className="flex-1 text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight tracking-wide">
                    موجودی
                  </div>
                </div>
                <div className="flex-1 text-[#818898] text-base font-medium leading-relaxed tracking-wide text-left">
                  {toFarsiNumber(model_data.inventory)} عدد
                </div>
              </div>

              {/* Status */}
              <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl border border-[#DFE1E7] flex justify-between items-center">
                <div className="flex justify-end items-center gap-2 w-[100px]">
                  <div className="w-full text-right text-[#666D80] text-sm font-bold leading-tight tracking-wide">
                    وضعیت
                  </div>
                </div>
                <div
                  className={`h-5 px-2 py-0.5 rounded-2xl flex justify-start items-center ${
                    product.approved ? 'bg-[#ECF9F7]' : 'bg-[#FFF4E5]'
                  }`}
                >
                  <div
                    className={`flex items-center gap-1 text-center text-xs font-normal font-['PeydaFaNum'] leading-[18px] tracking-wide ${
                      product.approved ? 'text-[#267666]' : 'text-[#B98900]'
                    }`}
                  >
                    {product.approved ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    <span className="font-num-medium">
                      {product.approved ? 'تایید شده' : 'در انتظار تایید'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="self-stretch flex-col justify-start items-start gap-2 flex w-full">
              <div className="self-stretch flex justify-start items-center">
                <div className="flex-1 text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-tight tracking-wide">
                  توضیحات
                </div>
              </div>
              <div className="self-stretch px-3 py-2.5 bg-white rounded-xl border border-[#DFE1E7] overflow-hidden flex flex-col justify-start items-start min-h-[100px]">
                <div className="self-stretch flex-1 text-right text-[#0D0D12] text-sm font-light font-['PeydaWeb'] leading-relaxed tracking-wide whitespace-pre-wrap break-all">
                  {model_data.description}
                </div>
              </div>
            </div>

            {/* Features Read Only */}
            {model_data.features &&
              Object.values(model_data.features).some((arr: any) => arr.length > 0) && (
                <div
                  className="flex flex-col gap-3 border-t border-[#DFE1E7] pt-4 w-full"
                  dir="rtl"
                >
                  <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] flex items-center gap-2">
                    <ListCheck className="w-4 h-4" />
                    مشخصات فنی
                  </div>

                  {Object.entries({
                    'ویژگی‌های ظاهری': model_data.features.visual,
                    'ویژگی‌های تولید': model_data.features.production,
                    'ویژگی‌های بسته بندی': model_data.features.packaging,
                    شناسه: model_data.features.id,
                  }).map(
                    ([label, items]: [string, any]) =>
                      items &&
                      items.length > 0 && (
                        <div
                          key={label}
                          className="flex flex-col gap-2 bg-gray-50 p-3 rounded-lg border border-[#DFE1E7]"
                        >
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
        )}

        {/* Bottom Fixed Button */}
        {!product.approved && (
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100/50 rounded-b-xl z-30">
            <button
              onClick={handleApprove}
              disabled={isApproving}
              className={`w-full h-12 px-6 py-3 rounded-xl flex justify-center items-center gap-2.5 transition-colors ${
                isApproving
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#0A33FF] cursor-pointer hover:bg-blue-700'
              }`}
            >
              <div className="text-center text-[#D7D8DA] text-base font-extrabold font-num-medium leading-snug">
                {isApproving ? 'در حال تایید...' : 'تایید محصول'}
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerProductPopup;

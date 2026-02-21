'use client';

import React, { useRef, useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, ListCheck } from 'lucide-react';
import { managerService, ManagerProduct } from '@/app/services/manager/managerService';
import ConfirmationModal from './ConfirmationModal';
import Image from 'next/image';
import { toast } from 'sonner';

interface ManagerProductPopupProps {
  onClose: () => void;
  product: ManagerProduct;
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
  const [product, setProduct] = useState<ManagerProduct>(initialProduct);
  const [oldProduct, setOldProduct] = useState<ManagerProduct | null>(null);
  const [activeTab, setActiveTab] = useState<'new' | 'old'>('new');
  const [isLoading, setIsLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // Fetch detailed product data
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!initialProduct?.id) return;
      setIsLoading(true);
      try {
        const response = await managerService.getManagerProductById(initialProduct.id);
        if (response.success && response.data) {
          if (response.data.newProduct) {
            setProduct(response.data.newProduct);
            setOldProduct(response.data.oldProduct || null);
          } else {
            setProduct(response.data);
          }
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
      model_data.prices.forEach((p) => {
        const price = p;
        let effectiveType = Number(price.type);
        let value = price.title || '';

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
      displayFeatures.forEach((f) => {
        const feature = f;
        if (feature.values && feature.values.length > 0) {
          defaults[feature.title || ''] = feature.values[0];
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
        const priceItem = model_data.prices?.find((p) => {
          const price = p;
          let effectiveType = Number(price.type);
          let rawTitle = price.title || '';

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

  const handleApprove = () => {
    if (!product || product.status === 'تایید شده') return;
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmation = async (status: 2 | 1 | 0, description?: string | null) => {
    if (!product) return;

    setIsApproving(true);
    try {
      const response = await managerService.approveManagerProduct(product.id, status, description);
      if (response.success) {
        const newStatusStr = status === 2 ? 'تایید شده' : status === 0 ? 'در انتظار تایید' : 'رد شده';
        setProduct((prev) => ({ ...prev, status: newStatusStr }));
        setIsConfirmationModalOpen(false);
        toast.success('وضعیت با موفقیت ثبت شد');
        if (onApprove) onApprove();
        onClose();
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

  const isOldTab = oldProduct && activeTab === 'old';
  const displayTitle = isOldTab ? oldProduct.title : model_data?.title;
  const displayPrice = isOldTab ? oldProduct.price : currentPrice;
  const displayInventory = isOldTab ? oldProduct.inventory : model_data?.inventory;
  const displayDescription = isOldTab ? oldProduct.description : model_data?.description;
  const displayImage = isOldTab 
      ? (oldProduct.image_path?.startsWith('http') ? oldProduct.image_path : (oldProduct.image_path ? `https://digikara.back.adiaweb.dev/storage/${oldProduct.image_path}` : ''))
      : (model_data?.image_path ? `https://digikara.back.adiaweb.dev/storage/${model_data.image_path}` : '');

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      dir="rtl"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[440px] h-[96vh] bg-white rounded-3xl overflow-hidden flex flex-col relative shadow-2xl animate-in fade-in zoom-in duration-200"
      >
        {/* Header Image Area */}
        <div className="relative w-full h-[200px] bg-gray-100 shrink-0">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center animate-pulse bg-gray-200">
              <div className="w-8 h-8 rounded-full border-2 border-t-[#0A33FF] animate-spin" />
            </div>
          ) : displayImage ? (
            <Image
              src={displayImage}
              alt={displayTitle || 'محصول'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
              unoptimized={displayImage.includes('storage')}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
              <Info className="w-8 h-8" />
              <span className="text-sm">تصویر ندارد</span>
            </div>
          )}

          {/* Header Controls (Overlay) */}
          <div className="absolute top-0 left-0 w-full p-0 flex justify-between items-center z-10 pt-4 px-4">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-[#0C1415]" strokeWidth={2} />
            </button>
            <div className="px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm">
              <span className="text-[#0D0D12] text-xs font-semibold">
                پیش‌نمایش محصول
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-[100px] bg-white">
          <div className="flex flex-col px-5 pt-6 gap-6">
            
            {/* Title & Price Row */}
            <div className="flex flex-col gap-3">
              {oldProduct && (
                 <div className="flex w-full bg-gray-100 p-1 rounded-xl mb-1">
                    <button
                      onClick={() => setActiveTab('new')}
                      className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                        activeTab === 'new' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                       اطلاعات جدید
                    </button>
                    <button
                      onClick={() => setActiveTab('old')}
                      className={`flex-1 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                        activeTab === 'old' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                       اطلاعات قبلی
                    </button>
                 </div>
              )}
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-right text-[#0D0D12] text-xl font-semibold leading-relaxed">
                  {displayTitle || 'در حال بارگذاری...'}
                </h1>
                
                {/* Status Badge */}
                <div
                  className={`h-7 px-2.5 rounded-full flex items-center shrink-0 ${
                    product.status === 'تایید شده' ? 'bg-[#ECF9F7]' : product.status === 'رد شده' ? 'bg-[#FEE2E2]' : 'bg-[#FFF4E5]'
                  }`}
                >
                  <div
                    className={`flex items-center gap-1.5 text-xs font-semibold ${
                      product.status === 'تایید شده' ? 'text-[#267666]' : product.status === 'رد شده' ? 'text-[#DC2626]' : 'text-[#B98900]'
                    }`}
                  >
                    {product.status === 'تایید شده' ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : product.status === 'رد شده' ? (
                      <AlertCircle className="w-3.5 h-3.5" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5" />
                    )}
                    <span>{product.status || 'در انتظار تایید'}</span>
                  </div>
                </div>
              </div>

              {/* Highlight Metrics */}
              <div className="flex justify-between items-center pt-2">
                 <div className="flex items-center gap-2">
                    <span className="text-[#0D0D12] text-xl font-bold text-[#0047AB]">
                        {formatPrice(displayPrice || 0)} <span className="text-sm font-medium">ریال</span>
                    </span>
                 </div>
                 <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <span className="text-[#666D80] text-xs font-medium">موجودی:</span>
                    <span className="text-[#0D0D12] text-sm font-bold">{toFarsiNumber(displayInventory)} عدد</span>
                 </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-100" />
            
            {/* Seller Info */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 font-bold border border-gray-200">
                        {product.school_name ? product.school_name.charAt(0) : '?'}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#0D0D12] text-sm font-bold">{product.school_name || 'نامشخص'}</span>
                        <span className="text-[#666D80] text-xs font-medium">{product.firstname} {product.lastname}</span>
                    </div>
                </div>
            </div>

            {/* Dynamic Variant Selectors */}
            {!isOldTab && displayFeatures && displayFeatures.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="text-[#0D0D12] text-sm font-semibold">
                  ویژگی‌های قابل انتخاب
                </div>
                <div className="flex flex-col gap-3">
                    {displayFeatures.map((feature) => {
                    const f = feature;
                    return (
                        <div key={f.title} className="flex flex-col gap-2">
                        <div className="text-right text-[#666D80] text-xs font-medium">
                            {f.title}: <span className="text-[#0D0D12] font-semibold">{selectedVariants[f.title] || ''}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {feature.values.map((val: string, i: number) => {
                            const isSelected = selectedVariants[f.title] === val;
                            return (
                                <div
                                key={i}
                                onClick={() => handleSelect(f.title, val)}
                                className={`
                                    ${f.title === 'رنگ' ? 'w-8 h-8 rounded-full border' : 'px-4 py-1.5 rounded-full border text-sm font-medium'}
                                    cursor-pointer flex items-center justify-center transition-all
                                    ${
                                        isSelected
                                        ? 'border-[#0A33FF] ring-2 ring-[#0A33FF]/20 bg-blue-50 text-[#0A33FF]'
                                        : 'border-[#DFE1E7] hover:border-gray-300 text-[#393E46]'
                                    }
                                `}
                                style={
                                    f.title === 'رنگ' ? { backgroundColor: getColorCode(val) } : {}
                                }
                                >
                                {f.title !== 'رنگ' && val}
                                {f.title === 'رنگ' && isSelected && (
                                    <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />
                                )}
                                </div>
                            );
                            })}
                        </div>
                        </div>
                    );
                    })}
                </div>
              </div>
            )}

            <div className="w-full h-[1px] bg-gray-100" />

            {/* Description */}
            <div className="flex flex-col gap-2">
              <div className="text-[#0D0D12] text-base font-semibold">
                توضیحات محصول
              </div>
              <p className="text-[#6D7280] text-sm font-light leading-relaxed whitespace-pre-wrap break-words">
                {displayDescription || 'توضیحات اضافی ثبت نشده است.'}
              </p>
            </div>

            {/* Features List */}
            {!isOldTab && model_data?.features && Object.values(model_data.features).some((arr) => Array.isArray(arr) && arr.length > 0) && (
              <div className="flex flex-col gap-3 pt-2">
                <div className="text-[#0D0D12] text-base font-semibold flex items-center gap-2">
                  <ListCheck className="w-5 h-5 text-[#0A33FF]" />
                  مشخصات فنی
                </div>

                <div className="flex flex-col gap-3">
                    {Object.entries({
                    'ویژگی‌های ظاهری': model_data.features.visual,
                    'ویژگی‌های تولید': model_data.features.production,
                    'ویژگی‌های بسته بندی': model_data.features.packaging,
                    شناسه: model_data.features.id,
                    }).map(
                    ([label, items]) =>
                        items && items.length > 0 && (
                        <div key={label} className="w-full flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0 border-dashed">
                            <span className="text-[#666D80] text-sm font-medium">{label}</span>
                            <div className="flex flex-col items-end gap-1">
                                {(items as any[]).map((item, idx) => (
                                    <span key={idx} className="text-[#0D0D12] text-sm font-semibold">
                                        {String(item.key || '')}: {String(item.value || '')}
                                    </span>
                                ))}
                            </div>
                        </div>
                        ),
                    )}
                </div>
              </div>
            )}
            
          </div>
        </div>

        {/* Fixed Bottom Action */}
        <div className="w-full p-4 bg-white border-t border-gray-100 z-10 shrink-0 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
          {product.status !== 'تایید شده' ? (
            <button
              onClick={() => setIsConfirmationModalOpen(true)}
              disabled={isApproving}
              className={`w-full h-12 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg ${
                isApproving
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                  : 'bg-[#0A33FF] hover:bg-blue-700 text-white shadow-blue-600/20'
              }`}
            >
              <span className="text-base font-semibold">
                {isApproving ? 'کمی صبر کنید...' : 'بررسی و ثبت وضعیت'}
              </span>
            </button>
          ) : (
            <div className="w-full h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-sm">
                این محصول قبلاً تعیین وضعیت شده است
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={handleConfirmation}
          loading={isApproving}
          title="بررسی نهایی محصول"
          itemName={model_data?.title || 'محصول'}
        />
      </div>
    </div>
  );
};

export default ManagerProductPopup;

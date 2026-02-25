'use client';

import React, { useRef, useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import {
  managerService,
  FlatProduct,
  ProductPriceVariant,
} from '@/app/services/manager/managerService';
import Image from 'next/image';

interface Props {
  product: FlatProduct;
  onClose: () => void;
}

const PRICE_TYPE_LABELS: Record<number, string> = {
  1: 'رنگ',
  2: 'سایز',
  3: 'جنس',
  4: 'گارانتی',
  5: 'متفرقه',
  6: 'وزن',
};

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const formatPrice = (price: number | string | undefined) => {
  if (!price) return '۰';
  return toFarsiNumber(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
};

const getImageSrc = (path: string | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `https://digikara.back.adiaweb.dev/storage/${path.replace(/^\//, '')}`;
};

const ProductDetailsPopup = ({ product: initialProduct, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [product, setProduct] = useState<FlatProduct>(initialProduct);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const response = await managerService.getManagerProductById(initialProduct.id);
        if (response.success && response.data) {
          setProduct(response.data as unknown as FlatProduct);
        }
      } catch (error) {
        console.error('Failed to fetch product details', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [initialProduct.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const imgSrc = getImageSrc(product.image_path);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      dir="rtl"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[440px] max-h-[90vh] bg-white rounded-3xl overflow-hidden flex flex-col relative shadow-2xl"
      >
        {/* Header Image */}
        <div className="relative w-full h-[180px] bg-gray-100 shrink-0">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center animate-pulse bg-gray-200">
              <div className="w-8 h-8 rounded-full border-2 border-t-[#0A33FF] animate-spin" />
            </div>
          ) : imgSrc ? (
            <Image src={imgSrc} alt={product.title} fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
              <Info className="w-8 h-8" />
              <span className="text-sm">تصویر ندارد</span>
            </div>
          )}
          <div className="absolute top-4 left-4 z-10">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-[#0C1415]" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="flex flex-col px-5 pt-5 pb-8 gap-5">
            {/* Title + Status */}
            <div className="flex justify-between items-start gap-3">
              <h1 className="text-right text-[#0D0D12] text-xl font-semibold leading-relaxed">
                {product.title}
              </h1>
              <div
                className={`h-7 px-2.5 rounded-full flex items-center shrink-0 ${product.approved ? 'bg-[#ECF9F7]' : 'bg-[#FFF4E5]'}`}
              >
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${product.approved ? 'text-[#267666]' : 'text-[#B98900]'}`}>
                  {product.approved
                    ? <CheckCircle className="w-3.5 h-3.5" />
                    : <AlertCircle className="w-3.5 h-3.5" />}
                  <span>{product.approved ? 'تایید شده' : 'در انتظار'}</span>
                </div>
              </div>
            </div>

            {/* Price + Inventory */}
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-1.5">
                <span className="text-[#666D80] text-xs">موجودی:</span>
                <span className="text-[#0D0D12] text-sm font-bold font-num-medium">
                  {toFarsiNumber(product.inventory)} عدد
                </span>
              </div>
              <div>
                <span className="text-[#0047AB] text-lg font-bold font-num-medium">{formatPrice(product.price)}</span>
                <span className="text-[#666D80] text-xs mr-1">ریال</span>
              </div>
            </div>

            {/* Info rows */}
            <div className="flex flex-col gap-0">
              {[
                { label: 'کد محصول', value: product.code || '—' },
                { label: 'حداکثر سفارش', value: toFarsiNumber(product.max_order) },
                { label: 'حداقل موجودی هشدار', value: toFarsiNumber(product.warn_inventory) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
                  <span className="text-[#666D80] text-sm">{label}</span>
                  <span className="text-[#0D0D12] text-sm font-semibold font-num-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'فروش رفته', value: toFarsiNumber(product.sold_count) },
                { label: 'بازدید', value: toFarsiNumber(product.view_count) },
                { label: 'علاقه‌مند', value: toFarsiNumber(product.like_count) },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[#0D0D12] text-base font-bold font-num-medium">{value}</span>
                  <span className="text-[#818898] text-xs">{label}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            {product.description && (
              <div className="flex flex-col gap-2">
                <span className="text-[#0D0D12] text-sm font-semibold">توضیحات</span>
                <p className="text-[#6D7280] text-sm leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            {/* Prices / Variants */}
            {!isLoading && product.prices && product.prices.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="text-[#0D0D12] text-sm font-semibold">
                  قیمت‌گذاری به تفکیک ویژگی
                </span>
                <div className="flex flex-col gap-2">
                  {product.prices.map((variant: ProductPriceVariant, i) => (
                    <div
                      key={variant.id}
                      className="w-full rounded-xl border border-[#DFE1E7] overflow-hidden"
                      dir="rtl"
                    >
                      {/* Variant header */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#F6F8FA] border-b border-[#DFE1E7]">
                        <div className="flex items-center gap-2">
                          <span className="text-[#0D0D12] text-sm font-bold">{variant.title}</span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F0F4FF] text-[#3B5BDB]">
                            {PRICE_TYPE_LABELS[variant.type] || String(variant.type)}
                          </span>
                        </div>
                        <span className="text-[#818898] text-xs font-num-medium">ویژگی {toFarsiNumber(i + 1)}</span>
                      </div>
                      {/* Variant fields */}
                      <div className="flex flex-col divide-y divide-[#F3F4F6]">
                        {[
                          {
                            label: 'قیمت',
                            value: (
                              <span className="text-[#0047AB] font-bold font-num-medium text-sm">
                                {formatPrice(variant.amount)} ریال
                              </span>
                            ),
                          },
                          {
                            label: 'تخفیف',
                            value: Number(variant.discount_percent) > 0 ? (
                              <span className="text-white text-xs font-bold font-num-medium bg-[#E03131] px-2 py-0.5 rounded-full">
                                {toFarsiNumber(variant.discount_percent)}٪
                              </span>
                            ) : (
                              <span className="text-[#C0C4CC] text-sm">ندارد</span>
                            ),
                          },
                          {
                            label: 'موجودی',
                            value: (
                              <span className="text-[#0D0D12] font-semibold font-num-medium text-sm">
                                {toFarsiNumber(variant.inventory)} عدد
                              </span>
                            ),
                          },
                          {
                            label: 'هشدار موجودی',
                            value: (
                              <span className="text-[#0D0D12] font-num-medium text-sm">
                                {toFarsiNumber(variant.warn_inventory)} عدد
                              </span>
                            ),
                          },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center justify-between px-4 py-2.5">
                            <span className="text-[#666D80] text-sm">{label}</span>
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPopup;

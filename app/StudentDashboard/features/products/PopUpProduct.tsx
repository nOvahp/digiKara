'use client';

import { createPortal } from 'react-dom';
import React, { useState, useEffect } from 'react';
import { Order } from '@/app/services/studentService';
import { toFarsiNumber } from '@/app/services/common/utils';
import Image from 'next/image';

interface PopUpProductProps {
  order: Order;
  onClose: () => void;
}

export function PopUpProduct({ order, onClose }: PopUpProductProps) {
  const [portalContainer] = useState<HTMLElement | null>(() => {
    if (typeof document === 'undefined') return null;
    const portalRoot = document.createElement('div');
    portalRoot.id = 'popup-portal-root';
    portalRoot.style.position = 'fixed';
    portalRoot.style.top = '0';
    portalRoot.style.left = '0';
    portalRoot.style.right = '0';
    portalRoot.style.bottom = '0';
    portalRoot.style.zIndex = '999999';
    portalRoot.style.pointerEvents = 'none';
    
    // Append primarily if it doesn't exist? 
    // Actually standard pattern is typically to append in effect, but user asked for lazy init.
    // We'll append here, but strict mode might duplicate. 
    // For now following instructions strictly.
    document.body.appendChild(portalRoot);
    return portalRoot;
  });

  useEffect(() => {
    if (!portalContainer) return;
    
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
      if (document.body.contains(portalContainer)) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [portalContainer]);

  // Prevent click propagation to parent (which might close the modal)
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Safe weight parsing (if weight exists)
  const weightVal = order.weight ? order.weight.replace(/[^0-9]/g, '') : '';
  const weightUnit = order.weight ? order.weight.replace(/[0-9]/g, '') : '';

  if (!portalContainer) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
      style={{
        direction: 'rtl',
        zIndex: 999999,
        pointerEvents: 'auto',
      }}
    >
      <div
        className="w-full max-w-[440px] h-auto max-h-[90vh] bg-white rounded-xl outline outline-1 outline-[#DFE1E7] overflow-y-auto flex flex-col justify-start items-start gap-5 p-5 relative shadow-lg"
        onClick={handleContentClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Title */}
        <div className="self-stretch text-right mt-2 pr-2">
          <span className="text-[#0D0D12] text-lg font-semibold leading-relaxed tracking-wide">
            {order.productName || 'محصول نامشخص'}
          </span>
          {weightVal && (
            <>
              <span className="text-[#0D0D12] text-lg font-num-medium leading-relaxed tracking-wide mx-1">
                | {toFarsiNumber(weightVal)}
              </span>
              <span className="text-[#0D0D12] text-lg font-semibold leading-relaxed tracking-wide">
                {weightUnit}
              </span>
            </>
          )}
        </div>

        <div className="self-stretch flex-col justify-start items-end gap-4 flex w-full">
          {/* Image Section */}
          <div className="self-stretch flex-col justify-start items-start gap-3 flex w-full">
            {order.productImage ? (
              <div className="relative self-stretch h-[180px] w-full rounded-xl border border-[#DFE1E7] overflow-hidden">
                <Image
                  fill
                  className="object-cover"
                  src={order.productImage}
                  alt={order.productName || 'محصول'}
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            ) : (
              <div className="self-stretch h-[120px] w-full bg-gray-50 rounded-xl border border-[#DFE1E7] flex items-center justify-center text-gray-400 text-sm">
                تصویر موجود نیست
              </div>
            )}
          </div>

          {/* Details List */}
          <div className="self-stretch flex-col justify-start items-start gap-2 flex w-full">
            {/* Count */}
            <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
              <div className="flex-1 text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                تعداد
              </div>
              <div className="text-[#0D0D12] text-base font-num-medium leading-relaxed tracking-wide text-left">
                {toFarsiNumber(order.count)} عدد
              </div>
            </div>

            {/* Delivery Time */}
            <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
              <div className="flex-1 text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                موعد تحویل
              </div>
              <div className="text-[#0D0D12] text-base font-num-medium leading-relaxed tracking-wide text-left">
                {order.deliveryTime || 'نامشخص'}
              </div>
            </div>

            {/* Income */}
            <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-2">
              <div className="flex-1 text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                درآمد شما از فروش
              </div>
              <div className="text-[#0D0D12] text-base font-num-medium leading-relaxed tracking-wide text-left">
                {toFarsiNumber(order.amount)} ریال
              </div>
            </div>

            {/* Status */}
            <div className="self-stretch h-[52px] px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center">
              <div className="text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                وضعیت
              </div>
              <div
                className={`h-6 px-3 py-0.5 rounded-2xl flex justify-center items-center ${
                  order.status === 'Completed'
                    ? 'bg-[#ECF9F7] text-[#267666]'
                    : order.status === 'Cancelled'
                      ? 'bg-[#FEF3F2] text-[#B42318]'
                      : 'bg-[#FFFAEB] text-[#B54708]'
                }`}
              >
                <span className="text-xs font-num-medium leading-[18px] tracking-wide">
                  {order.statusText}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="self-stretch flex-col justify-start items-start gap-2 flex w-full">
            <div className="self-stretch flex justify-start items-center">
              <div className="flex-1 text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
                توضیحات
              </div>
            </div>
            <div className="self-stretch min-h-[80px] p-3 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] overflow-hidden flex flex-col justify-start items-start">
              <div className="self-stretch flex-1 text-right text-[#0D0D12] text-sm font-light leading-relaxed tracking-wide whitespace-pre-wrap">
                {order.description || order.note || 'توضیحات اضافی ثبت نشده است.'}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="self-stretch flex justify-center items-center gap-4 w-full mt-4">
            <div className="flex-1 h-12 px-6 py-3 bg-[#0A33FF] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer hover:bg-blue-700 transition-colors">
              <div className="text-center text-white text-base font-num-medium leading-snug">
                تغییر وضعیت سفارش
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    portalContainer,
  );
}

export default PopUpProduct;

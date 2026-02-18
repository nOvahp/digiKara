'use client';

import React, { useRef, useEffect, useState } from 'react';
import { X, Info, Clock, Tag, Percent } from 'lucide-react';
import { managerService, Order } from '@/app/services/manager/managerService';
import Image from 'next/image';

interface ManagerOrderPopupProps {
  onClose: () => void;
  orderId: number | string;
  onUpdate?: () => void;
}

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const formatPrice = (price: string | number | undefined) => {
  if (!price) return '۰';
  return toFarsiNumber(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
};

const ManagerOrderPopup = ({ onClose, orderId, onUpdate }: ManagerOrderPopupProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      setIsLoading(true);
      try {
        const response = await managerService.getManagerOrderById(orderId);
        if (response.success && response.data) {
          setOrder(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch order details', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

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

  const handleStatusUpdate = async (newStatus: string) => {
    if (!order) return;

    setIsUpdating(true);
    try {
      const response = await managerService.updateManagerOrder(orderId, {
        status: newStatus,
      });
      if (response.success) {
        setOrder((prev: Order | null) => prev ? ({ ...prev, status: newStatus }) : null);
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error('Failed to update order status', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!order && !isLoading) return null;

  const { product, status, quantity, price, discount } = order || {};

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      dir="rtl"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[480px] h-auto max-h-[90vh] bg-white rounded-xl border border-[#DFE1E7] overflow-y-auto flex flex-col justify-start items-start gap-5 p-5 relative shadow-lg animate-in fade-in zoom-in duration-200"
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
            جزئیات سفارش
          </span>
          <span className="text-[#666D80] text-sm font-num-medium">
            کد سفارش: {toFarsiNumber(orderId)}
          </span>
        </div>

        {isLoading ? (
          <div className="flex-1 w-full flex items-center justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A33FF]"></div>
          </div>
        ) : (
          <div className="self-stretch flex-col justify-start items-end gap-4 flex w-full flex-1 overflow-y-auto no-scrollbar">
            {/* Product Info */}
            <div className="w-full p-4 rounded-xl border border-[#DFE1E7] flex justify-start items-start gap-4">
              {product?.image_path ? (
                <Image
                  src={`https://digikara.back.adiaweb.dev/storage/${product.image_path.startsWith('http') ? product.image_path.split('/storage/')[1] : product.image_path}`}
                  alt={product.title || 'محصول'}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover border border-[#DFE1E7]"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-gray-50 border border-[#DFE1E7] flex items-center justify-center">
                  <Info className="w-6 h-6 text-gray-300" />
                </div>
              )}
              <div className="flex-1 flex flex-col gap-2">
                <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] line-clamp-2">
                  {product?.title || 'محصول نامشخص'}
                </div>
                {product?.code && (
                  <div className="text-[#666D80] text-xs font-num-medium">
                    کد محصول: {toFarsiNumber(product.code)}
                  </div>
                )}
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="w-full grid grid-cols-2 gap-3">
               <div className="p-3 bg-gray-50 rounded-xl flex flex-col gap-1">
                 <span className="text-xs text-[#666D80]">تعداد</span>
                 <span className="text-sm font-medium font-num-medium text-[#0D0D12]">{toFarsiNumber(quantity)} عدد</span>
               </div>
               <div className="p-3 bg-gray-50 rounded-xl flex flex-col gap-1">
                 <span className="text-xs text-[#666D80]">قیمت واحد</span>
                 <span className="text-sm font-medium font-num-medium text-[#0D0D12]">{formatPrice(price)} ریال</span>
               </div>
               <div className="p-3 bg-gray-50 rounded-xl flex flex-col gap-1">
                 <span className="text-xs text-[#666D80] flex items-center gap-1">
                    <Percent className="w-3 h-3" /> تخفیف
                 </span>
                 <span className="text-sm font-medium font-num-medium text-[#0D0D12]">{toFarsiNumber(discount)}٪</span>
               </div>
               <div className="p-3 bg-gray-50 rounded-xl flex flex-col gap-1">
                 <span className="text-xs text-[#666D80] flex items-center gap-1">
                    <Tag className="w-3 h-3" /> قیمت نهایی
                 </span>
                  {/* Calculate final price if needed or just use price if it's already final. Assuming 'price' is unit price. */}
                 <span className="text-sm font-medium font-num-medium text-[#0D0D12]">
                    {formatPrice((Number(price || 0) * Number(quantity || 0)) * (1 - (Number(discount || 0) / 100)))} ریال
                 </span>
               </div>
            </div>

            {/* Order Status */}
            <div className="self-stretch flex-col gap-3 flex w-full border-t border-[#DFE1E7] pt-4 mt-2">
              <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                وضعیت سفارش
              </div>

              {/* Status Selector */}
              <div className="w-full grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleStatusUpdate('pending')}
                  disabled={isUpdating}
                  className={`h-10 rounded-lg text-sm font-medium transition-all ${
                    status === 'pending' || status === 'در انتظار' || status === 'در حال انتظار'
                      ? 'bg-amber-100 text-amber-700 border border-amber-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  در انتظار
                </button>
                <button
                  onClick={() => handleStatusUpdate('sent')}
                  disabled={isUpdating}
                  className={`h-10 rounded-lg text-sm font-medium transition-all ${
                    status === 'sent' || status === 'ارسال شده' || status === 'تکمیل شده'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  تکمیل شده
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerOrderPopup;

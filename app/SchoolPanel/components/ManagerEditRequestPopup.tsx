'use client';

import React, { useRef, useEffect, useState } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { managerService, EditRequest, ManagerProduct } from '@/app/services/manager/managerService';
import Image from 'next/image';

interface Props {
  request: EditRequest;
  onClose: () => void;
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

const getImageSrc = (path: string | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `https://digikara.back.adiaweb.dev/storage/${path.replace(/^\//, '')}`;
};

// A single product card showing title, image, price, inventory, description
const ProductCard = ({
  product,
  label,
  highlight,
}: {
  product: ManagerProduct | undefined;
  label: string;
  highlight?: boolean;
}) => {
  const data = product?.model_data;
  const title = data?.title || product?.title || '—';
  const price = data?.price ?? product?.price;
  const inventory = data?.inventory ?? product?.inventory;
  const description = data?.description || product?.description;
  const imgPath = data?.image_path || product?.image_path;
  const imgSrc = getImageSrc(imgPath);

  return (
    <div
      className={`flex-1 flex flex-col gap-3 p-4 rounded-xl border ${
        highlight ? 'border-[#0A33FF]/30 bg-[#F5F7FF]' : 'border-[#DFE1E7] bg-[#F9FAFB]'
      }`}
    >
      {/* Label */}
      <div className={`text-xs font-semibold font-['PeydaWeb'] ${highlight ? 'text-[#0A33FF]' : 'text-[#818898]'}`}>
        {label}
      </div>

      {/* Image */}
      <div className="w-full h-[90px] relative rounded-lg overflow-hidden border border-[#DFE1E7] bg-gray-100">
        {imgSrc ? (
          <Image src={imgSrc} alt={title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-['PeydaWeb']">
            بدون تصویر
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-2">
        <Row label="نام" value={title} />
        <Row label="قیمت" value={price !== undefined ? `${formatPrice(price)} ریال` : '—'} isNum />
        <Row label="موجودی" value={inventory !== undefined ? `${toFarsiNumber(inventory)} عدد` : '—'} isNum />
        {description && (
          <div className="flex flex-col gap-0.5 text-right">
            <span className="text-[#818898] text-[10px] font-['PeydaWeb']">توضیحات</span>
            <span className="text-[#0D0D12] text-xs font-medium font-['PeydaWeb'] leading-relaxed line-clamp-3">
              {description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const Row = ({ label, value, isNum }: { label: string; value: string; isNum?: boolean }) => (
  <div className="flex justify-between items-center gap-2">
    <span className={`text-[#0D0D12] text-xs ${isNum ? 'font-num-medium' : 'font-medium font-["PeydaWeb"]'} truncate flex-1 text-left`}>
      {value}
    </span>
    <span className="text-[#818898] text-[10px] font-['PeydaWeb'] flex-shrink-0">{label}</span>
  </div>
);

const ManagerEditRequestPopup = ({ request, onClose, onUpdate }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(request.status || '');
  const [rejectNote, setRejectNote] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleApprove = async () => {
    setIsUpdating(true);
    try {
      const res = await managerService.approveProductEditRequest(request.id, 2);
      if (res.success) {
        setCurrentStatus('تایید شده');
        if (onUpdate) onUpdate();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReject = async () => {
    setIsUpdating(true);
    try {
      const res = await managerService.approveProductEditRequest(request.id, 0, rejectNote || null);
      if (res.success) {
        setCurrentStatus('رد شده');
        setShowRejectInput(false);
        if (onUpdate) onUpdate();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const isDone = currentStatus === 'تایید شده' || currentStatus === 'رد شده';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      dir="rtl"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[520px] max-h-[90vh] bg-white rounded-xl border border-[#DFE1E7] overflow-y-auto flex flex-col gap-5 p-5 relative shadow-lg animate-in fade-in zoom-in duration-200"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1 text-right mt-1">
          <span className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb']">
            بررسی درخواست ویرایش محصول
          </span>
          <span className="text-[#666D80] text-sm font-['PeydaWeb']">
            {request.firstname} {request.lastname}
            {request.school_name && (
              <span className="mr-1 text-[#818898]">— {request.school_name}</span>
            )}
          </span>
        </div>

        {/* Old vs New product cards */}
        <div className="flex gap-3">
          <ProductCard product={request.oldProduct} label="محصول قدیمی" />
          <ProductCard product={request.newProduct} label="محصول جدید (درخواستی)" highlight />
        </div>

        {/* Status / Action area */}
        <div className="border-t border-[#DFE1E7] pt-4 flex flex-col gap-3">
          {isDone ? (
            <div
              className={`w-full py-3 rounded-xl text-center text-sm font-semibold font-['PeydaWeb'] ${
                currentStatus === 'تایید شده'
                  ? 'bg-[#ECFDF5] text-[#065F46]'
                  : 'bg-[#FEF2F2] text-[#991B1B]'
              }`}
            >
              {currentStatus === 'تایید شده' ? '✓ درخواست تایید شد' : '✗ درخواست رد شد'}
            </div>
          ) : (
            <>
              {showRejectInput ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={rejectNote}
                    onChange={(e) => setRejectNote(e.target.value)}
                    placeholder="دلیل رد درخواست (اختیاری)..."
                    rows={3}
                    className="w-full p-3 rounded-xl border border-[#DFE1E7] text-sm font-['PeydaWeb'] text-[#0D0D12] resize-none focus:outline-none focus:border-red-300"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleReject}
                      disabled={isUpdating}
                      className="flex-1 h-10 rounded-xl bg-[#FEF2F2] text-[#991B1B] text-sm font-semibold font-['PeydaWeb'] flex items-center justify-center gap-2 hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      تایید رد درخواست
                    </button>
                    <button
                      onClick={() => setShowRejectInput(false)}
                      className="h-10 px-4 rounded-xl border border-[#DFE1E7] text-[#666D80] text-sm font-['PeydaWeb'] hover:bg-gray-50 transition-colors"
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleApprove}
                    disabled={isUpdating}
                    className="flex-1 h-11 rounded-xl bg-[#ECFDF5] text-[#065F46] text-sm font-semibold font-['PeydaWeb'] flex items-center justify-center gap-2 hover:bg-green-100 transition-colors disabled:opacity-50 border border-[#065F46]/20"
                  >
                    <CheckCircle className="w-4 h-4" />
                    تایید ویرایش
                  </button>
                  <button
                    onClick={() => setShowRejectInput(true)}
                    disabled={isUpdating}
                    className="flex-1 h-11 rounded-xl bg-[#FEF2F2] text-[#991B1B] text-sm font-semibold font-['PeydaWeb'] flex items-center justify-center gap-2 hover:bg-red-100 transition-colors disabled:opacity-50 border border-[#991B1B]/20"
                  >
                    <XCircle className="w-4 h-4" />
                    رد درخواست
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerEditRequestPopup;

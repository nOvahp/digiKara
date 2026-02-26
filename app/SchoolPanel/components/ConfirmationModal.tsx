'use client';

import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (status: 2 | 1 | 0, description?: string | null) => Promise<void>;
  loading?: boolean;
  title: string;
  itemName: string;
  itemLabel?: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title,
  itemName,
  itemLabel = 'نام محصول',
}: ConfirmationModalProps) => {
  const [status, setStatus] = useState<2 | 1 | 0>(0);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Strip any Latin/English characters entirely
    const val = e.target.value.replace(/[a-zA-Z]/g, '');
    setDescription(val);
    setDescriptionError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Block typing English letters directly
    if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      setDescriptionError(true);
      setTimeout(() => setDescriptionError(false), 2000);
    }
  };

  const handleConfirm = async () => {
    if (descriptionError) return;
    const finalDescription = description.trim() || null;
    await onConfirm(status, finalDescription);
    setDescription('');
    setDescriptionError(false);
    setStatus(0);
  };

  const statusOptions = [
    {
      value: 2 as const,
      label: 'تایید شده',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      value: 0 as const,
      label: 'در حال انتظار',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      value: 1 as const,
      label: 'رد شده',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/40"
      dir="rtl"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .modal-slide-up {
          animation: slideUp 0.32s cubic-bezier(0.32, 0.72, 0, 1) both;
        }
      `}</style>

      <div className="modal-slide-up w-full max-w-lg rounded-t-3xl bg-white px-6 pt-5 pb-8 shadow-2xl">
        {/* Drag handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-[#0D0D12]">{title}</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item Name */}
        <div className="mb-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">{itemLabel}:</p>
          <p className="text-sm font-semibold text-[#0D0D12] break-words">{itemName}</p>
        </div>

        {/* Status Selection */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-[#0D0D12] mb-3">وضعیت</label>
          <div className="grid grid-cols-3 gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatus(option.value)}
                disabled={loading}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all disabled:opacity-50 cursor-pointer ${
                  status === option.value
                    ? `${option.bgColor} ${option.borderColor}`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <option.icon className={`w-5 h-5 ${option.color}`} />
                <span className="text-xs font-medium text-center text-[#0D0D12]">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#0D0D12] mb-2">
            توضیحات (اختیاری)
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="دلیل تایید یا رد درخواست را بنویسید..."
            className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent resize-none disabled:bg-gray-100 disabled:text-gray-500 font-['PeydaWeb'] text-sm ${
              descriptionError
                ? 'border-red-400 focus:ring-red-300'
                : 'border-gray-300 focus:ring-yellow-400'
            }`}
            rows={3}
            style={{ fontFamily: 'PeydaWeb, Tahoma, Arial, sans-serif' }}
          />
          <div className="flex justify-between items-center mt-1">
            {descriptionError ? (
              <p className="text-xs text-red-500 font-medium">⚠️ تایپ انگلیسی مجاز نیست — زبان کیبورد را تغییر دهید</p>
            ) : (
              <span />
            )}
            <p className="text-xs text-gray-400">{description.length} کاراکتر</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-[#0D0D12] font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            انصراف
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || descriptionError}
            className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              status === 2
                ? 'bg-green-600 hover:bg-green-700'
                : status === 0
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {loading ? 'در حال پردازش...' : 'ثبت'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;


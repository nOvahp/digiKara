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
  itemLabel?: 'نام محصول' | 'نام حجره';
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

  const handleConfirm = async () => {
    const finalDescription = description.trim() || null;
    await onConfirm(status, finalDescription);
    setDescription('');
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

  const selectedStatusOption = statusOptions.find((opt) => opt.value === status);
  const StatusIcon = selectedStatusOption?.icon || CheckCircle;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/10 px-4"
      dir="rtl"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">{itemLabel}:</p>
          <p className="text-sm font-medium text-[#0D0D12] break-words">{itemName}</p>
        </div>

        {/* Status Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#0D0D12] mb-3">وضعیت</label>
          <div className="grid grid-cols-3 gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatus(option.value)}
                disabled={loading}
                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all disabled:opacity-50 cursor-pointer ${
                  status === option.value
                    ? `${option.bgColor} ${option.borderColor} border-2`
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
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            placeholder="دلیل تایید یا رد درخواست را بنویسید..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none disabled:bg-gray-100 disabled:text-gray-500"
            rows={4}
          />
          <p className="text-xs text-gray-500 mt-1">
            {description.length} کاراکتر
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-[#0D0D12] font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            انصراف
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              status === 2
                ? 'bg-green-600 hover:bg-green-700'
                : status === 0
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {loading ? 'در حال پردازش...' : 'تایید'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

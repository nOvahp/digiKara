import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={isLoading ? undefined : onClose}
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-xl flex flex-col items-center p-6 gap-4"
        dir="rtl"
      >
        {/* Icon */}
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-[#D32F2F]" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-[#0D0D12] text-lg font-bold font-['PeydaWeb']">{title}</div>
          <div className="text-[#666D80] text-sm font-normal font-['PeydaWeb'] leading-6">
            {message}
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex gap-3 mt-2">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 h-11 bg-[#D32F2F] text-white rounded-xl text-sm font-bold font-['PeydaWeb'] hover:bg-[#B71C1C] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? 'در حال حذف...' : 'حذف محصول'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 h-11 bg-white border border-[#DFE1E7] text-[#0D0D12] rounded-xl text-sm font-bold font-['PeydaWeb'] hover:bg-gray-50 transition-colors disabled:opacity-70"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

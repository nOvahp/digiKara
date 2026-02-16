import React from 'react';
import { CheckCircle} from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function SuccessModal({ isOpen, onClose, title, message }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-xl flex flex-col items-center p-6 gap-4"
        dir="rtl"
      >
        {/* Icon */}
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-[#2E7D32]" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-[#0D0D12] text-lg font-bold font-['PeydaWeb']">{title}</div>
          <div className="text-[#666D80] text-sm font-normal font-['PeydaWeb'] leading-6">
            {message}
          </div>
        </div>

        {/* Button */}
        <div className="w-full mt-2">
          <button
            onClick={onClose}
            className="w-full h-11 bg-[#2E7D32] text-white rounded-xl text-sm font-bold font-['PeydaWeb'] hover:bg-[#1B5E20] transition-colors"
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
}

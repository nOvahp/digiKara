import React, { useRef, useEffect } from 'react';
import { Box, BarChart, AlertTriangle, XCircle, CheckCircle, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NotificationsProps {
  onClose: () => void;
}

const Notifications = ({ onClose }: NotificationsProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      dir="rtl"
    >
      <div
        ref={modalRef}
        className="w-[380px] bg-white shadow-[0px_16px_32px_-1px_rgba(128,136,151,0.20)] overflow-hidden rounded-2xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start animate-in fade-in zoom-in duration-200"
      >
        {/* Header */}
        <div className="self-stretch px-6 py-4 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-[#0D0D12]" />
            </button>
            <div className="text-[#0D0D12] text-16 font-regular font-light leading-24 tracking-wide break-word">
              اعلان ها
            </div>
          </div>
          <div className="text-[#3D424A] text-sm font-regular font-light underline leading-[21px] tracking-wide break-word cursor-pointer">
            علامت زدن همه به عنوان خوانده شده
          </div>
        </div>

        {/* List */}
        <ScrollArea className="h-[400px] w-full" dir="rtl">
          <div className="px-6 py-4 flex flex-col justify-center items-center min-h-[300px] gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 text-gray-400">
                <Box size={32} />
              </div>
            </div>
            <div className="text-gray-500 text-sm font-light">
              در حال حاضر اعلان جدیدی وجود ندارد
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="self-stretch px-6 py-4 border-t border-[#DFE1E7] flex justify-center items-center gap-2 bg-white">
          <div className="flex-1 text-center text-[#3D424A] text-sm font-regular font-light underline leading-[21px] tracking-wide break-word cursor-pointer">
            مشاهده همه اعلان ها
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

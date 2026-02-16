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
          <div className="px-6 py-4 flex flex-col justify-start items-start">
            {/* Item 1 */}
            <div className="self-stretch py-4 flex justify-start items-start gap-3 border-b border-dashed border-[#E5E7EB]">
              {/* Icon Box */}
              <div className="w-8 h-8 relative bg-[#FFD369] shadow-[inset_0px_-4px_6px_rgba(255,255,255,0.50)] overflow-hidden rounded-lg flex-shrink-0 flex items-center justify-center">
                <Box className="w-5 h-5 text-[#393E46]" />
              </div>

              <div className="flex-1 flex flex-col justify-start items-start gap-1">
                <div className="self-stretch flex flex-col justify-start items-end gap-2">
                  <div className="self-stretch flex justify-between items-center">
                    <div className="text-right text-[#0D0D12] text-sm font-regular font-light leading-[21px] tracking-wide break-word">
                      سفارش جدید دریافت شد
                    </div>
                    <div className="w-2 h-2 bg-[#DF1C41] rounded-full" />
                  </div>
                  <div className="self-stretch text-right text-[#666D80] text-xs font-regular font-light leading-[18px] tracking-wide break-word">
                    شما یک سفارش جدید INV-۱۴۰۴-۵۶۷ از مینا حسینی به ارزش ۱۲,۴۵۰,۰۰۰ ریال دریافت کرده
                    اید.
                  </div>
                </div>
                <div className="self-stretch flex justify-between items-center mt-1">
                  <div className="h-5 px-2 bg-[#DCF6FC] rounded-[36px] flex justify-center items-center gap-2">
                    <div className="text-center text-[#222831] text-xs font-semibold leading-[18px] tracking-wide min-w-[70px]">
                      پیام مدیر مدرسه{' '}
                    </div>
                  </div>
                  <div className="text-[#666D80] text-xs font-regular font-light leading-[18px] tracking-wide break-word">
                    ۵ دقیقه پیش
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="self-stretch py-4 flex justify-start items-start gap-3 border-b border-dashed border-[#E5E7EB]">
              <div className="w-8 h-8 relative bg-[#FFD369] shadow-[inset_0px_-4px_6px_rgba(255,255,255,0.50)] overflow-hidden rounded-lg flex-shrink-0 flex items-center justify-center">
                <BarChart className="w-5 h-5 text-[#393E46]" />
              </div>
              <div className="flex-1 flex flex-col justify-start items-start gap-1">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch flex justify-between items-center">
                    <div className="text-[#0D0D12] text-sm font-regular font-light leading-[21px] tracking-wide break-word">
                      گزارش فروش ماهانه ایجاد شد
                    </div>
                    <div className="w-2 h-2 bg-[#DF1C41] rounded-full" />
                  </div>
                  <div className="self-stretch text-right text-[#666D80] text-xs font-regular font-light leading-[18px] tracking-wide break-word">
                    گزارش عملکرد فروش شما برای آبان ۱۴۰۴ اکنون برای دانلود در دسترس است.
                  </div>
                </div>
                <div className="self-stretch flex justify-between items-center mt-1">
                  <div className="h-5 px-2 bg-[#FFF0CC] rounded-[36px] flex justify-center items-center gap-2">
                    <div className="text-center text-[#222831] text-xs font-semibold leading-[18px] tracking-wide min-w-[60px]">
                      پیام سامانه
                    </div>
                  </div>
                  <div className="text-[#666D80] text-xs font-regular font-light leading-[18px] tracking-wide break-word">
                    ۲۰ دقیقه پیش
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="self-stretch py-4 flex justify-start items-start gap-3 border-b border-dashed border-[#E5E7EB]">
              <div className="w-8 h-8 relative bg-[#FFD369] shadow-[inset_0px_-4px_6px_rgba(255,255,255,0.50)] overflow-hidden rounded-lg flex-shrink-0 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#393E46]" />
              </div>
              <div className="flex-1 flex flex-col justify-start items-start gap-1">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch flex justify-between items-center">
                    <div className="text-[#0D0D12] text-sm font-regular font-light leading-[21px] tracking-wide break-word">
                      هشدار کمبود موجودی
                    </div>
                    <div className="w-2 h-2 bg-[#DF1C41] rounded-full" />
                  </div>
                  <div className="self-stretch text-right text-[#666D80] text-xs font-regular font-light leading-[18px] tracking-wide break-word">
                    موجودی <span className="font-semibold">"عسل چهل گیاه ارگانیک"</span> رو به اتمام
                    است - فقط ۸ مورد در انبار باقی مانده است.
                  </div>
                </div>
                <div className="self-stretch flex justify-between items-center mt-1">
                  <div className="h-5 px-2 bg-[#E0F0D4] rounded-[36px] flex justify-center items-center gap-2">
                    <div className="text-center text-[#222831] text-xs font-semibold leading-[18px] tracking-wide min-w-[60px]">
                      پیام راهبر
                    </div>
                  </div>
                  <div className="text-[#666D80] text-xs font-regular font-light leading-[18px] tracking-wide break-word">
                    ۱۰ دقیقه پیش
                  </div>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="self-stretch py-4 flex justify-start items-start gap-3 border-b border-dashed border-[#E5E7EB]">
              <div className="w-8 h-8 relative bg-[#FFD369] shadow-[inset_0px_-4px_6px_rgba(255,255,255,0.50)] overflow-hidden rounded-lg flex-shrink-0 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-[#393E46]" />
              </div>
              <div className="flex-1 flex flex-col justify-start items-end gap-1">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch flex justify-start items-center">
                    <div className="text-[#0D0D12] text-sm font-regular font-light leading-[21px] tracking-wide break-word">
                      پرداخت ناموفق
                    </div>
                  </div>
                  <div className="self-stretch text-right text-[#666D80] text-xs font-regular font-light leading-[18px] tracking-wide break-word">
                    پرداخت برای سفارش INV-۱۴۰۴-۲۳۴ ناموفق بود. لطفا روش پرداخت را بررسی کنید.
                  </div>
                </div>
                <div className="self-stretch flex justify-between items-center mt-1">
                  <div className="h-5 px-2 bg-[#CCDAEE] rounded-[36px] flex justify-center items-center gap-2">
                    <div className="text-center text-[#222831] text-xs font-semibold leading-[18px] tracking-wide min-w-[70px]">
                      پیام کاربران
                    </div>
                  </div>
                  <div className="text-[#666D80] text-xs font-regular font-light leading-[18px] tracking-wide break-word">
                    ۳۰ دقیقه پیش
                  </div>
                </div>
              </div>
            </div>

            {/* Item 5 */}
            <div className="self-stretch py-4 flex justify-start items-start gap-3">
              <div className="w-8 h-8 relative bg-[#FFD369] shadow-[inset_0px_-4px_6px_rgba(255,255,255,0.50)] overflow-hidden rounded-lg flex-shrink-0 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#393E46]" />
              </div>
              <div className="flex-1 flex flex-col justify-start items-start gap-1">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch flex justify-start items-center">
                    <div className="text-[#0D0D12] text-sm font-regular font-light leading-[21px] tracking-wide break-word">
                      محصول به روز شد
                    </div>
                  </div>
                  <div className="self-stretch text-right text-[#666D80] text-xs font-regular font-light leading-[18px] tracking-wide break-word">
                    جزئیات و سطوح سهام <span className="font-semibold">"عسل چهل گیاه ارگانیک"</span>{' '}
                    با موفقیت به روز شده اند.
                  </div>
                </div>
                <div className="self-stretch flex justify-between items-center mt-1">
                  <div className="h-5 px-2 bg-[#FEDBCC] rounded-[36px] flex justify-center items-center gap-2">
                    <div className="text-center text-[#222831] text-xs font-semibold leading-[18px] tracking-wide min-w-[80px]">
                      پیام از پشتیبانی
                    </div>
                  </div>
                  <div className="text-[#666D80] text-xs font-regular font-light leading-[18px] tracking-wide break-word">
                    ۱ ساعت پیش
                  </div>
                </div>
              </div>
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

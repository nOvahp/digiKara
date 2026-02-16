import React from 'react';
import { X } from 'lucide-react';

interface ServiceFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceFeeModal({ isOpen, onClose }: ServiceFeeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md h-full bg-white flex flex-col overflow-hidden" dir="rtl">
        {/* Header */}
        <div className="w-full px-5 py-3 border-b border-gray-200 flex justify-between items-center">
          <div className="w-10" /> {/* Spacer */}
          <div className="text-[#0C1415] text-base font-semibold font-['PeydaWeb']">
            جزئیات هزینه خدمات
          </div>
          <div
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-[#0C1415]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-col gap-8 pt-6">
            {/* Introduction */}
            <div className="flex flex-col gap-4 items-start">
              <h2 className="text-[#0C1415] text-base font-semibold font-['PeydaWeb'] text-right">
                فروشنده گرامی، همراه استراتژیک ما
              </h2>
              <p className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide text-justify">
                شاید این سوال برای شما پیش آمده باشد که چرا دیجی کارا{' '}
                <span className="font-['PeydaFaNum']">10</span> درصد از هر فروش را تحت عنوان «هزینه
                خدمات» کسر میکند؟
                <br />
                <br />
                این هزینه، مبلغی نیست که از جیب شما کسر شود، بلکه سرمایهگذاری مشترکی است تا محصول
                شما بدون دغدغه به دست مشتری نهایی در سراسر کشور برسد. ما این مبالغ را صرف
                زیرساختهایی میکنیم که فروش شما را تضمین میکند.
              </p>
              <p className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide text-justify">
                ما برای شفافیت کامل، بودجه حاصل از خدمات را به شکل زیر مدیریت میکنیم تا بهترین
                بازدهی برای محصولات شما ایجاد شود:
              </p>
            </div>

            <div className="w-full h-[1px] bg-gray-200"></div>

            {/* Breakdown Table */}
            <div className="flex flex-col gap-6">
              {/* Table Header */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="text-[#0C1415] text-base font-semibold font-['PeydaWeb']">
                    سهم از کل هزینه خدمات
                  </div>
                  <div className="text-[#0C1415] text-base font-semibold font-['PeydaWeb']">
                    شرح خدمات
                  </div>
                </div>
                <div className="w-full h-[1px] bg-gray-200"></div>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="text-[#080B11] text-sm font-medium font-['PeydaFaNum']">%۴۰</div>
                  <div className="text-[#707F81] text-sm font-semibold font-['PeydaWeb']">
                    بازاریابی و تبلیغات (Ads)
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#080B11] text-sm font-medium font-['PeydaFaNum']">%۱۵</div>
                  <div className="text-[#707F81] text-sm font-semibold font-['PeydaWeb']">
                    درگاه پرداخت و امنیت مالی
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#080B11] text-sm font-medium font-['PeydaFaNum']">%۲۰</div>
                  <div className="text-[#707F81] text-sm font-semibold font-['PeydaWeb']">
                    پشتیبانی و مرکز تماس
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#080B11] text-sm font-medium font-['PeydaFaNum']">%۱۵</div>
                  <div className="text-[#707F81] text-sm font-semibold font-['PeydaWeb']">
                    توسعه فنی پلتفرم
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[#080B11] text-sm font-medium font-['PeydaFaNum']">%۱۰</div>
                  <div className="text-[#707F81] text-sm font-semibold font-['PeydaWeb']">
                    داوری و حل اختلاف
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-200"></div>

            {/* Footer Text */}
            <p className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide text-justify">
              هزینه بازاریابی و جذب یک مشتری جدید به صورت انفرادی، معمولاً بسیار بیشتر از این درصد
              ناچیز خواهد بود. با ما، شما فقط هزینه «فروش نهایی شده» را میپردازید، نه هزینه «تبلیغات
              بینتیجه» را.
            </p>

            <div className="w-full h-[1px] bg-gray-200"></div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="px-6 py-3 bg-white border-t border-gray-200 shadow-lg">
          <button
            onClick={onClose}
            className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center"
          >
            <span className="text-[#1A1C1E] text-[18px] font-semibold font-['PeydaWeb']">
              متوجه شدم
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

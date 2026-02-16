'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, ClipboardList, Package, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/app/Bazzar/CartContext';

export default function OrderTrackingPage() {
  const router = useRouter();
  const { items } = useCart();

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center relative" dir="rtl">
      {/* Header */}
      <div className="w-full max-w-[440px] flex justify-between items-center px-0 py-4 shrink-0">
        <div className="flex items-center justify-between w-full relative">
          <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">
            پیگیری سفارش
          </span>
          <button
            onClick={() => router.back()}
            className="absolute left-0 w-10 h-10 rounded-full border border-[rgba(0,0,0,0.10)] flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Content List */}
      <div className="w-full max-w-[440px] flex flex-col gap-0 px-0 pb-12 flex-1 overflow-y-auto no-scrollbar">
        {/* Order List Header */}
        <div className="flex justify-between items-center w-full mt-4 mb-4">
          <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">
            لیست سفارش
          </span>
          <button className="text-[#707F81] text-xs font-['PeydaFaNum'] font-normal hover:text-[#0C1415] transition-colors">
            مشاهده همه
          </button>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-4 w-full">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex gap-4 items-center justify-start w-full">
                <div className="w-[84px] h-[84px] bg-[#F6F6F6] rounded-lg shrink-0 overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="84px"
                    className="object-cover"
                    unoptimized
                  />
                  {/* Design effect for first item */}
                  {index === 0 && (
                    <div className="absolute -bottom-2 -left-2 w-full h-4 bg-black/80 blur-lg opacity-20 rotate-1"></div>
                  )}
                </div>
                <div className="flex-1 flex flex-col items-start gap-1">
                  <span className="text-[#0C1415] text-sm font-['PeydaFaNum'] line-clamp-1 text-right">
                    {item.name}
                  </span>
                  <span className="text-[#707F81] text-xs font-['PeydaFaNum'] text-right">
                    {item.shopName || 'فروشگاه'}
                  </span>
                  <span className="text-[#0C1415] text-sm font-num-medium mt-1 text-right">
                    {(item.price * item.count).toLocaleString()} ریال
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
          {items.length === 0 && (
            <div className="w-full text-center text-[#707F81] py-4 text-sm font-['PeydaWeb']">
              سوابق خریدی موجود نیست
            </div>
          )}
        </div>

        <div className="w-full h-px bg-[rgba(0,0,0,0.10)] my-6"></div>

        {/* Order Details Grid */}
        <div className="flex flex-col gap-4 w-full mb-6">
          <div className="flex justify-between items-center w-full">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold align-middle">
              جزییات سفارش
            </span>
          </div>

          <div className="flex justify-between items-center w-full">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">
              تاریخ تحویل مورد انتظار
            </span>
            <span className="text-[#080B11] text-sm font-num-medium font-semibold">
              ۱۲ شهریور ۱۴۰۴
            </span>
          </div>

          <div className="flex justify-between items-center w-full">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">
              شناسه رهگیری
            </span>
            <span className="text-[#080B11] text-sm font-num-medium font-semibold">987654321</span>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center w-full mb-2">
            <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">
              وضعیت سفارش
            </span>
          </div>

          <div className="relative flex flex-col gap-8 pr-2">
            {/* Vertical Line */}
            <div className="absolute top-[20px] bottom-[20px] left-[11px] w-[2px] bg-gray-100"></div>
            <div className="absolute top-[20px] h-[70px] left-[11px] w-[2px] bg-[#3C5A5D]"></div>

            {/* Step 1: Placed (Done) */}
            <div className="flex items-start gap-4 relative z-10 ">
              <div className="flex justify-start gap-2 w-full items-start">
                <ClipboardList className="w-6 h-6 text-[#3C5A5D]" strokeWidth={1.5} />
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">
                    سفارش ثبت شد
                  </span>
                  <span className="text-[#707F81] text-xs font-num-medium">۱ مهر ۱۴۰۴، ۱۶:۲۵</span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#3C5A5D] flex items-center justify-center shrink-0 border border-[#3C5A5D]">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Step 2: Processing (Done/Current) */}
            <div className="flex items-start gap-4 relative z-10">
              <div className="flex justify-start gap-2 w-full items-start">
                <Package className="w-6 h-6 text-[#3C5A5D]" strokeWidth={1.5} />
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">
                    در حال پردازش
                  </span>
                  <span className="text-[#707F81] text-xs font-num-medium">۱ مهر ۱۴۰۴، ۱۵:۵۴</span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#3C5A5D] flex items-center justify-center shrink-0 border border-[#3C5A5D]">
                <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
              </div>
            </div>

            {/* Step 3: Shipped (Pending) */}
            <div className="flex items-start gap-4 relative z-10">
              <div className="flex justify-start gap-2 w-full items-start">
                <Truck className="w-6 h-6 text-[#3C5A5D]" strokeWidth={1.5} />
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">
                    ارسال شده
                  </span>
                  <span className="text-[#707F81] text-xs font-num-medium">
                    انتظار می رود ۱۱ شهریور ۱۴۰۴
                  </span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              </div>
            </div>

            {/* Step 4: Delivered (Pending) */}
            <div className="flex items-start gap-4 relative z-10">
              <div className="flex justify-start gap-2 w-full items-start">
                <CheckCircle2 className="w-6 h-6 text-[#3C5A5D]" strokeWidth={1.5} />
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">
                    تحویل داده شده
                  </span>
                  <span className="text-[#707F81] text-xs font-num-medium">۱ مهر ۱۴۰۴</span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-200">
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

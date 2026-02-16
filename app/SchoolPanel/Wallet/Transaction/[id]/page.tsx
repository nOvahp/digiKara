'use client';

import React from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  Share2,
  MoreHorizontal,
  Store,
  Wallet,
  Download,
  Copy,
  ChevronLeft,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '../../../../../lib/utils';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

export default function TransactionDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center pb-4" dir="rtl">
      {/* Header */}
      <div className="w-full max-w-md px-0 pt-4 pb-2 flex justify-between items-center">
        <h1 className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold">جزئیات درآمد</h1>
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50"
        >
          <ChevronLeft className="w-6 h-6 text-[#0D0D12]" />
        </button>
      </div>

      <div className="w-full max-w-md px-0 flex flex-col gap-6 mt-4">
        {/* Product Image & Title */}
        <div className="flex flex-col gap-3">
          <div className="w-full h-[151px] relative rounded-xl border border-[#DFE1E7] overflow-hidden">
            <Image src="/incomeReport.png" alt="Product" fill className="object-cover" />
          </div>
          <div className="w-full text-right">
            <span className="text-[#0D0D12] text-lg font-['PeydaWeb'] font-black">
              گلدان مینا کاری{' '}
            </span>
            <span className="text-[#0D0D12] text-lg font-['PeydaWeb'] font-light">
              | اندازه متوسط
            </span>
          </div>
        </div>

        {/* Primary Details */}
        <div className="flex flex-col gap-4">
          {/* Row 1 */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1">
              <Store className="w-4 h-4 text-[#818898]" />
              <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">
                حجره چرم آژاکس
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Wallet className="w-4 h-4 text-[#818898]" />
              <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">
                واریز به کیف پول مدرسه
              </span>
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1">
              <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">
                سهم مدرسه:
              </span>
              <div className="flex">
                <span className="text-[#818898] text-sm font-num-medium font-semibold">
                  {toFarsiNumber(20)}
                </span>
                <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">%</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">محصول:</span>
              <span className="text-[#818898] text-sm font-['Poppins'] font-medium">NK40Y001</span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100"></div>

        {/* Date */}
        <div className="flex justify-between items-center">
          <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
            تاریخ پرداخت
          </span>
          <span className="text-[#080B11] text-sm font-num-medium font-medium">
            {toFarsiNumber('27 شهریور 1404 | 10:00')}
          </span>
        </div>

        <div className="h-px w-full bg-gray-100"></div>

        {/* Price Details */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold text-right">
            جزئیات قیمت
          </h2>

          <div className="flex justify-between items-center">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
              مبلغ فروش
            </span>
            <span className="text-[#080B11] text-sm font-num-medium font-medium">
              {toFarsiNumber('13,000,000')} ریال
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
              خدمات دیجی کارا
            </span>
            <span className="text-[#080B11] text-sm font-num-medium font-medium">
              {toFarsiNumber('3,000,000')} ریال
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">مالیات</span>
            <span className="text-[#080B11] text-sm font-num-medium font-medium">
              {toFarsiNumber('250,000')} ریال
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">تخفیف</span>
            <span className="text-[#080B11] text-sm font-num-medium font-medium">
              {toFarsiNumber(0)} ریال
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100"></div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-[#707F81] text-base font-['PeydaWeb'] font-semibold">جمع کل</span>
          <span className="text-[#080B11] text-base font-num-medium font-bold">
            {toFarsiNumber('9,750,000')} ریال
          </span>
        </div>

        <div className="h-px w-full bg-gray-100"></div>

        {/* Income Sharing */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold text-right">
            تسهیم درآمد
          </h2>

          <div className="flex justify-between items-center">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
              سهم مدرسه
            </span>
            <span className="text-[#080B11] text-sm font-num-medium font-medium">
              {toFarsiNumber('1,000,000')} ریال
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
              سهم هنرآموز
            </span>
            <span className="text-[#080B11] text-sm font-num-medium font-medium">
              {toFarsiNumber('750,000')} ریال
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
              سهم هنرجو
            </span>
            <span className="text-[#080B11] text-sm font-num-medium font-medium">
              {toFarsiNumber('8,000,000')} ریال
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100"></div>

        {/* Transaction Details */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold text-right">
            جزئیات تراکنش
          </h2>

          <div className="flex justify-between items-center">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
              درگاه پرداخت
            </span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                {/* Bank Icon Placeholder */}
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              </div>
              <span className="text-[#3C5A5D] text-sm font-num-medium font-medium">بانک سامان</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
              شناسه پرداخت
            </span>
            <div className="flex items-center gap-2 text-[#0C1415] text-sm font-num-medium font-medium">
              <span>{toFarsiNumber('124575665531')}</span>
              <Copy className="w-4 h-4 text-[#3C5A5D] cursor-pointer" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
              شناسه پیگیری
            </span>
            <div className="flex items-center gap-2 text-[#0C1415] text-sm font-['Inter'] font-medium">
              <span>TR2565HGJD</span>
              <Copy className="w-4 h-4 text-[#3C5A5D] cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div className="w-full h-24 border border-[#DCE4E8] rounded-xl flex items-center justify-center p-2 relative overflow-hidden">
          <Image src="/incomeReportBarcode.png" alt="Barcode" fill className="object-contain" />
        </div>

        {/* Action Button */}
        <div className="w-full pt-4">
          <button className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-colors">
            <Download className="w-5 h-5 text-[#1A1C1E]" />
            <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold">
              دانلود فاکتور
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

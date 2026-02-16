'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/app/StudentDashboard/layout/Navigation';
import { Button } from '@/components/ui/button';
import { AddProductFlow } from '@/app/StudentDashboard/features/products/Sells/components/AddProductFlow';

export default function ShopSuccessPage() {
  const router = useRouter();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center font-sans pb-24 relative overflow-x-hidden">
      {/* Header */}
      <div className="w-full max-w-md px-4 pt-4 flex justify-between items-center relative h-11 mb-6">
        {/* Back Button */}
        <button onClick={() => router.back()} className="p-1">
          <ChevronRight className="w-6 h-6 text-[#222831] rotate-180" />
        </button>

        {/* Title */}
        <div className="text-[#0D0D12] text-xl font-semibold font-['PeydaWeb'] leading-snug">
          ساخت حجره
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 w-full max-w-md px-4 flex flex-col items-center justify-center gap-6 -mt-10">
        {/* Illustration */}
        <div className="relative w-[280px] h-[280px]">
          <Image
            src="/man fell in love with shopping.png"
            alt="Success Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="text-[#0A0A0A] text-lg font-semibold font-['PeydaWeb'] leading-7">
            با موفقیت حجره ساخته شد.
          </h2>
          <p className="text-[#737373] text-sm font-light font-['PeydaWeb'] leading-tight max-w-[300px]">
            حالا که حجره با موفقیت ساخته شد، وقتشه اولین محصول رو اضافه کنی و فروشت رو شروع کنی!
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full items-center mt-4">
          <div className="flex gap-4 w-full justify-center px-4">
            {/* Education */}
            <Button
              variant="outline"
              className="h-10 px-6 bg-white border-[#E5E5E5] text-[#666D80] text-sm font-semibold font-['PeydaWeb'] hover:bg-gray-50 flex items-center gap-2"
            >
              <span>آموزش</span>
              <ArrowUpRight className="w-4 h-4 text-[#737373]" />
            </Button>

            {/* Add Product */}
            <Button
              onClick={() => setIsAddProductOpen(true)}
              className="h-10 px-6 bg-[#FDD00A] hover:bg-[#eac009] text-[#0A0A0A] text-sm font-semibold font-['PeydaWeb'] shadow-sm border-none"
            >
              افزودن محصول
            </Button>
          </div>

          {/* Go to Dashboard */}
          <Button
            variant="ghost"
            onClick={() => router.push('/StudentDashboard')}
            className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] hover:bg-gray-50 flex items-center gap-2"
          >
            <span>بازگشت به پیشخوان</span>
            <ChevronRight className="w-4 h-4 text-[#666D80] rotate-180" />
          </Button>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navigation />

      <AddProductFlow isOpen={isAddProductOpen} onClose={() => setIsAddProductOpen(false)} />
    </div>
  );
}

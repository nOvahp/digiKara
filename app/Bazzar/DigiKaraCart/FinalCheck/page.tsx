'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, MapPin, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '@/app/Bazzar/CartContext';
import { bazzarService, Address } from '@/app/services/bazzarService';



export default function FinalCheckPage() {
  const router = useRouter();
  const { items } = useCart();
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(null);

  React.useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await bazzarService.getAddresses();
        if (response && response.data && response.data.length > 0) {
          // Default to the first address for now, or implement selection logic
          setSelectedAddress(response.data[0]);
        } else {
          setSelectedAddress(null);
        }
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      }
    };
    fetchAddress();
  }, []);

  return (
    <div
      className="w-full h-[100dvh] bg-white flex flex-col items-center relative overflow-hidden"
      dir="rtl"
    >
      {/* Header */}
      <div className="w-full max-w-[440px] flex justify-between items-center px-0 py-4 shrink-0">
        <div className="flex items-center justify-between w-full relative">
          <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">
            بررسی نهایی
          </span>
          <button
            onClick={() => router.back()}
            className="absolute left-0 w-10 h-10 rounded-full border border-[rgba(0,0,0,0.10)] flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="w-full max-w-[440px] flex flex-col gap-0 px-0 pb-48 flex-1 overflow-y-auto no-scrollbar">
        {/* Address Section */}
        <div className="w-full flex flex-col gap-4 py-6">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">
              انتخاب آدرس
            </h3>
          </div>

          {selectedAddress ? (
            <div className="w-full flex justify-between items-center bg-white">
              <div className="flex gap-4 items-start">
                <div className="mt-1">
                  <MapPin className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">
                    {selectedAddress.title || selectedAddress.city || 'آدرس'}
                  </span>
                  <p className="text-[#707F81] text-xs font-['PeydaWeb'] font-light leading-5">
                    {selectedAddress.address}
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push('/Bazzar/DigiKaraCart/Address')}
                className="px-5 py-2 rounded border border-[rgba(0,0,0,0.10)] text-[#3C5A5D] text-xs font-['PeydaWeb'] font-semibold hover:bg-gray-50 transition-colors tracking-wide"
              >
                تغییر
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 border border-dashed border-gray-300 gap-3">
              <p className="text-[#707F81] text-sm font-medium">هنوز آدرسی ثبت نکرده‌اید</p>
              <button
                onClick={() => router.push('/Bazzar/DigiKaraCart/Address/Add')}
                className="px-5 py-2 bg-[#FDD00A] rounded-lg text-[#1A1C1E] text-sm  font-semibold hover:bg-[#e5bc09] transition-colors"
              >
                افزودن آدرس جدید
              </button>
            </div>
          )}
        </div>

        <div className="w-full h-px bg-[rgba(0,0,0,0.10)]"></div>

        {/* Delivery Section */}
        <div className="w-full flex flex-col gap-4 py-6">
          <h3 className="text-[#0C1415] text-base font-semibold">انتخاب نوع ارسال</h3>

          <div className="w-full flex justify-between items-center">
            <div className="flex gap-4 items-start">
              <div className="mt-1 relative">
                <Truck className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                <div className="absolute -bottom-1 -right-1 bg-[#3C5A5D] w-3 h-3 rounded-full flex items-center justify-center border border-white">
                  <Check className="w-2 h-2 text-white" strokeWidth={3} />
                </div>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-[#0C1415] text-sm font-['PeydaWeb'] font-semibold">
                  اقتصادی
                </span>
                <span className="text-[#707F81] text-xs font-['PeydaWeb'] font-light">
                  تاریخ تحویل تخمینی <span className="font-num-medium">3</span> مهر{' '}
                  <span className="font-num-medium">1404</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => router.push('/Bazzar/DigiKaraCart/SendType')}
              className="px-5 py-2 rounded border border-[rgba(0,0,0,0.10)] text-[#3C5A5D] text-xs font-['PeydaWeb'] font-semibold hover:bg-gray-50 transition-colors tracking-wide"
            >
              تغییر
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-[rgba(0,0,0,0.10)]"></div>

        {/* Order List */}
        <div className="w-full flex flex-col gap-6 py-6">
          <h3 className="text-[#0C1415] text-base font-semibold">لیست سفارش</h3>

          {items.length === 0 ? (
            <div className="w-full text-center text-[#707F81] py-8 text-sm font-medium">
              سبد خرید خالی است
            </div>
          ) : (
            items.map((item, index) => (
              <div key={item.id} className="flex gap-4 items-center justify-start w-full">
                <div className="w-[84px] h-[84px] bg-[#F6F6F6] rounded-lg shrink-0 overflow-hidden relative group">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="84px"
                    className="object-cover"
                    unoptimized
                  />
                  {/* Shadow effect only on first item or if needed, let's keep it simple or strictly per design */}
                  {index === 0 && (
                    <div className="absolute -bottom-2 -left-2 w-full h-4 bg-black/80 blur-lg opacity-20 rotate-1"></div>
                  )}
                </div>
                <div className="flex-1 flex flex-col items-start gap-1">
                  <span className="text-[#0C1415] text-sm font-medium line-clamp-1 text-right">
                    {item.name}
                  </span>
                  <span className="text-[#707F81] text-xs font-medium text-right">
                    {item.shopName || 'فروشگاه'}
                  </span>
                  <span className="text-[#0C1415] text-sm font-num-medium mt-1 text-right">
                    {(item.price * item.count).toLocaleString()} ریال
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Bar - Floating */}
      <div className="fixed bottom-[85px] left-0 right-0 z-40 w-full max-w-[440px] mx-auto p-6 pointer-events-none">
        <div className="w-full pointer-events-auto">
          {/* Next Button */}
          <button
            onClick={() => router.push('/Bazzar/DigiKaraCart/PaymentMethode')}
            className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#e5bc09] transition-colors shadow-sm"
          >
            <span className="text-[#1A1C1E] text-[17px] font-semibold">ادامه به پرداخت</span>
            <ShoppingBag className="w-5 h-5 text-[#1A1C1E]" />
          </button>
        </div>
      </div>
    </div>
  );
}

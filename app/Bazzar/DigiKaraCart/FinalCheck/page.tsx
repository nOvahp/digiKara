'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, MapPin, Truck, ShoppingBag, Loader2, AlertTriangle } from 'lucide-react';
import { bazzarService, Address, CartItem } from '@/app/services/bazzarService';
import { useOrder } from '@/app/Bazzar/OrderContext';

const DELIVERY_LABELS: Record<number, string> = {
  1: 'اقتصادی',
  2: 'معمولی',
  3: 'باری',
  4: 'فوری',
};

export default function FinalCheckPage() {
  const router = useRouter();
  const { selectedAddressId, selectedDeliveryType } = useOrder();

  const [orderItems, setOrderItems] = React.useState<CartItem[]>([]);
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [loadingItems, setLoadingItems] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const [reviewRes, addressRes] = await Promise.all([
          bazzarService.getOrderReview(),
          bazzarService.getAddresses(),
        ]);
        if (reviewRes?.data) setOrderItems(reviewRes.data);
        if (addressRes?.data) setAddresses(addressRes.data);
      } catch (err: unknown) {
        const msg = (err as { message?: string })?.message ?? 'خطا در دریافت اطلاعات سبد خرید';
        console.error('Failed to load order review:', err);
        setLoadError(msg);
      } finally {
        setLoadingItems(false);
      }
    };
    load();
  }, []);

  const selectedAddress: Address | undefined = selectedAddressId
    ? addresses.find((a) => String(a.id) === selectedAddressId)
    : addresses[0];

  const handleContinue = async () => {
    const addressId = selectedAddressId ?? (addresses[0] ? String(addresses[0].id) : null);
    if (!addressId) {
      setError('لطفاً یک آدرس انتخاب کنید');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await bazzarService.submitOrderReview({
        address_id: addressId,
        delivery_type: selectedDeliveryType,
      });
      router.push('/Bazzar/DigiKaraCart/PaymentMethode');
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message ?? 'خطا در ثبت سفارش';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="w-full h-[100dvh] bg-white flex flex-col items-center relative overflow-hidden"
      dir="rtl"
    >
      {/* ─── LOAD ERROR FULL-PAGE STATE ─── */}
      {!loadingItems && loadError && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center px-8 gap-6">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-[#0C1415] text-xl font-['PeydaWeb'] font-bold">خطا در بارگذاری سبد خرید</h2>
            <p className="text-[#707F81] text-sm font-['PeydaWeb'] leading-6">{loadError}</p>
            <p className="text-[#ACB5BB] text-xs font-['PeydaWeb'] mt-1">
              ممکن است سبد خرید شما خالی باشد یا مشکلی در اتصال پیش آمده باشد.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push('/Bazzar')}
            className="w-full max-w-[320px] h-[52px] bg-[#FDD00A] rounded-xl flex items-center justify-center font-['PeydaWeb'] font-semibold text-[#1A1C1E] hover:bg-[#e5bc09] transition-colors"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      )}

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
                    {selectedAddress.address ?? selectedAddress.details}
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
                className="px-5 py-2 bg-[#FDD00A] rounded-lg text-[#1A1C1E] text-sm font-semibold hover:bg-[#e5bc09] transition-colors"
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
                  {DELIVERY_LABELS[selectedDeliveryType] ?? 'اقتصادی'}
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

          {loadingItems ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-[#3C5A5D]" />
            </div>
          ) : orderItems.length === 0 ? (
            <div className="w-full text-center text-[#707F81] py-8 text-sm font-medium">
              سبد خرید خالی است
            </div>
          ) : (
            orderItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center justify-start w-full">
                <div className="w-[84px] h-[84px] bg-[#F6F6F6] rounded-lg shrink-0 overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="84px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 flex flex-col items-start gap-1">
                  <span className="text-[#0C1415] text-sm font-medium line-clamp-2 text-right">
                    {item.title}
                  </span>
                  <span className="text-[#707F81] text-xs font-medium text-right">
                    تعداد: <span className="font-num-medium">{item.quantity}</span>
                  </span>
                  <span className="text-[#0C1415] text-sm font-num-medium mt-1 text-right">
                    {(item.price * item.quantity).toLocaleString()} ریال
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Bar - Floating */}
      <div className="fixed bottom-[85px] left-0 right-0 z-40 w-full max-w-[440px] mx-auto p-6 pointer-events-none">
        <div className="w-full pointer-events-auto flex flex-col gap-2">
          {error && (
            <p className="text-red-500 text-xs text-center font-['PeydaWeb']">{error}</p>
          )}
          <button
            onClick={handleContinue}
            disabled={submitting}
            className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#e5bc09] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#1A1C1E]" />
            ) : (
              <>
                <span className="text-[#1A1C1E] text-[17px] font-semibold">ادامه به پرداخت</span>
                <ShoppingBag className="w-5 h-5 text-[#1A1C1E]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


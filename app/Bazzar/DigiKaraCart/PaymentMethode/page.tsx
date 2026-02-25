'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  Circle,
  Landmark,
  Loader2,
  AlertTriangle,
  RefreshCcw,
} from 'lucide-react';
import { bazzarService } from '@/app/services/bazzarService';
import { getToken } from '@/app/services/auth/tokenService';

const PAYMENT_GATEWAY_URL = 'https://digikara.back.adiaweb.dev/payments/send';

export default function PaymentMethodPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'spot' | 'online'>('online');
  const [selectedBank, setSelectedBank] = useState<string>('saman');

  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const res = await bazzarService.getCheckout();
        if (res?.data?.final_price !== undefined) {
          setFinalPrice(res.data.final_price);
        } else if (res?.data?.total_price !== undefined) {
          setFinalPrice(res.data.total_price);
        }
      } catch (err: unknown) {
        const msg = (err as { message?: string })?.message ?? 'خطا در دریافت اطلاعات پرداخت';
        console.error('Failed to fetch checkout:', err);
        setLoadError(msg);
      } finally {
        setLoadingPrice(false);
      }
    };
    fetchCheckout();
  }, []);

  const handlePay = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const callbackUrl = `${window.location.origin}/Bazzar/DigiKaraCart/payment-result`;
      const res = await bazzarService.submitCheckout(callbackUrl);
      const token = res?.data?.token ?? getToken();

      console.log('[PaymentMethode] callback URL:', callbackUrl);
      console.log('[PaymentMethode] token present:', !!token);
      console.log('[PaymentMethode] token value:', token ? String(token).slice(0, 40) + '...' : 'MISSING');

      // Log server-side so URL is visible in VS Code terminal
      await fetch('/api/debug-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callbackUrl, gatewayUrl: token ? `${PAYMENT_GATEWAY_URL}?token=${encodeURIComponent(token)}` : null, token }),
      });

      if (!token) {
        setError('توکن احراز هویت یافت نشد. لطفاً دوباره وارد شوید.');
        setSubmitting(false);
        return;
      }

      const gatewayUrl = `${PAYMENT_GATEWAY_URL}?token=${encodeURIComponent(token)}`;
      console.log('[PaymentMethode] gateway redirect URL:', gatewayUrl);
      window.location.href = gatewayUrl;
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message ?? 'خطا در پردازش پرداخت';
      console.error('[PaymentMethode] submitCheckout error:', err);
      setError(msg);
      setSubmitting(false);
    }
  };

  return (
    <div
      className="w-full h-[100dvh] bg-white flex flex-col items-center relative overflow-hidden"
      dir="rtl"
    >
      {/* ─── LOAD ERROR FULL-PAGE STATE ─── */}
      {!loadingPrice && loadError && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center px-8 gap-6">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-[#0C1415] text-xl font-['PeydaWeb'] font-bold">خطا در بارگذاری اطلاعات پرداخت</h2>
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

      {/* ─── PAYMENT ERROR FULL-PAGE STATE ─── */}
      {error && (
        <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center px-8 gap-6">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-[#0C1415] text-xl font-['PeydaWeb'] font-bold">
              خطا در اتصال به درگاه پرداخت
            </h2>
            <p className="text-[#707F81] text-sm font-['PeydaWeb'] leading-6">
              متأسفانه ارتباط با درگاه پرداخت برقرار نشد.
              <br />
              لطفاً اتصال اینترنت خود را بررسی کرده و مجدداً تلاش کنید.
            </p>
            <p className="text-[#ACB5BB] text-xs font-['PeydaWeb'] mt-1">
              در صورت کسر وجه از حساب، مبلغ حداکثر تا ۷۲ ساعت کاری بازگشت داده می‌شود.
            </p>
          </div>

          <div className="w-full max-w-[320px] flex flex-col gap-3 mt-2">
            <button
              onClick={() => { setError(null); setSubmitting(false); }}
              className="w-full h-[52px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-colors font-['PeydaWeb'] font-semibold text-[#1A1C1E]"
            >
              <RefreshCcw className="w-4 h-4" />
              تلاش مجدد
            </button>
            <button
              onClick={() => router.push('/Bazzar/DigiKaraCart')}
              className="w-full h-[52px] rounded-xl border border-[#DFE1E7] flex items-center justify-center font-['PeydaWeb'] text-sm text-[#707F81] hover:bg-gray-50 transition-colors"
            >
              بازگشت به سبد خرید
            </button>
          </div>

          <p className="text-[#ACB5BB] text-xs font-['PeydaWeb'] text-center mt-2">
            کد خطا: PAY-001 &nbsp;|&nbsp; پشتیبانی: support@digikara.ir
          </p>
        </div>
      )}

      {/* Header */}
      <div className="w-full max-w-[440px] flex justify-between items-center px-0 py-4 shrink-0">
        <div className="flex items-center justify-between w-full relative">
          <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">
            روش های پرداخت
          </span>
          <button
            onClick={() => router.back()}
            className="absolute left-0 w-10 h-10 rounded-full border border-[rgba(0,0,0,0.10)] flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="w-full max-w-[440px] flex flex-col gap-6 px-0 pb-48 flex-1 overflow-y-auto no-scrollbar">
        {/* Cost Summary */}
        <div className="w-full bg-white rounded-lg border border-[#DFE1E7] p-5 flex flex-col gap-5 mt-4">
          <div className="flex justify-between items-center w-full">
            <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">هزینه نهایی</span>
            {loadingPrice ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#3C5A5D]" />
            ) : (
              <span className="text-[#0C1415] text-sm font-num-medium">
                {finalPrice !== null ? finalPrice.toLocaleString() : '---'} ریال
              </span>
            )}
          </div>
        </div>

        {/* Payment Options */}
        <div className="w-full flex flex-col gap-4">
          {/* Pay on Spot */}
          <div
            onClick={() => setPaymentMethod('spot')}
            className={`w-full p-3 bg-white rounded-lg border cursor-pointer transition-all ${
              paymentMethod === 'spot'
                ? 'border-[#0C1415] shadow-sm'
                : 'border-[#E5E7EB] hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Wallet className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
                  پرداخت در محل
                </span>
              </div>
              <div className="shrink-0">
                {paymentMethod === 'spot' ? (
                  <div className="relative">
                    <Circle className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-[#0C1415] rounded-full" />
                    </div>
                  </div>
                ) : (
                  <Circle className="w-6 h-6 text-[#D1D1D6]" strokeWidth={1.5} />
                )}
              </div>
            </div>
          </div>

          {/* Online Payment */}
          <div
            onClick={() => setPaymentMethod('online')}
            className={`w-full p-3 bg-white rounded-lg border cursor-pointer transition-all ${
              paymentMethod === 'online'
                ? 'border-[#0C1415] shadow-sm'
                : 'border-[#E5E7EB] hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
                  پرداخت آنلاین (کارت اعتباری)
                </span>
              </div>
              <div className="shrink-0">
                {paymentMethod === 'online' ? (
                  <div className="relative">
                    <Circle className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-[#0C1415] rounded-full" />
                    </div>
                  </div>
                ) : (
                  <Circle className="w-6 h-6 text-[#D1D1D6]" strokeWidth={1.5} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bank Gateways (Only if online selected) */}
        {paymentMethod === 'online' && (
          <div className="w-full flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold mb-2">
              درگاه های پرداخت
            </h3>

            <div className="w-full bg-white rounded-lg border border-[#E5E7EB] p-3 flex flex-col shadow-[0px_3px_24px_rgba(0,0,0,0.03)]">
              {/* Saman */}
              <div
                onClick={() => setSelectedBank('saman')}
                className="w-full flex justify-between items-center py-4 cursor-pointer border-b border-[#E5E7EB] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <Landmark className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
                    درگاه بانک سامان
                  </span>
                </div>
                <div className="shrink-0">
                  {selectedBank === 'saman' ? (
                    <div className="relative">
                      <Circle className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#0C1415] rounded-full" />
                      </div>
                    </div>
                  ) : (
                    <Circle className="w-6 h-6 text-[#D1D1D6]" strokeWidth={1.5} />
                  )}
                </div>
              </div>

              {/* Mellat */}
              <div
                onClick={() => setSelectedBank('mellat')}
                className="w-full flex justify-between items-center py-4 cursor-pointer border-b border-[#E5E7EB] last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                    <Landmark className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
                    درگاه بانک ملت
                  </span>
                </div>
                <div className="shrink-0">
                  {selectedBank === 'mellat' ? (
                    <div className="relative">
                      <Circle className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#0C1415] rounded-full" />
                      </div>
                    </div>
                  ) : (
                    <Circle className="w-6 h-6 text-[#D1D1D6]" strokeWidth={1.5} />
                  )}
                </div>
              </div>

              {/* Pasargad */}
              <div
                onClick={() => setSelectedBank('pasargad')}
                className="w-full flex justify-between items-center py-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center">
                    <Landmark className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">
                    درگاه بانک پاسارگاد
                  </span>
                </div>
                <div className="shrink-0">
                  {selectedBank === 'pasargad' ? (
                    <div className="relative">
                      <Circle className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#0C1415] rounded-full" />
                      </div>
                    </div>
                  ) : (
                    <Circle className="w-6 h-6 text-[#D1D1D6]" strokeWidth={1.5} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Navigation Buttons */}
      <div className="fixed bottom-[85px] left-0 right-0 z-40 w-full max-w-[440px] mx-auto p-6 pointer-events-none">
        <div className="w-full pointer-events-auto flex flex-col gap-2">
          <button
            type="button"
            onClick={handlePay}
            disabled={submitting}
            className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#e5bc09] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#1A1C1E]" />
            ) : (
              <span className="text-[#1A1C1E] text-[17px] font-['PeydaWeb'] font-semibold">
                پرداخت
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


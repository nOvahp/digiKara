'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

/**
 * Payment result callback page.
 * The payment gateway redirects back here after processing.
 * Common query params returned by Iranian gateways:
 *   ?status=success|failed  or  ?State=OK|NOK  or  ?ResCode=0
 */
export default function PaymentResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    // Parse common return params from Iranian payment gateways
    const state     = searchParams.get('State');        // Saman: OK / NOK
    const resCode   = searchParams.get('ResCode');      // Mellat: 0 = success
    const statusRaw = searchParams.get('status');       // Generic: success / failed
    const refNum    = searchParams.get('RefNum') ?? searchParams.get('SaleReferenceId') ?? searchParams.get('referenceNumber') ?? searchParams.get('ref');

    setReferenceId(refNum);

    let isSuccess = false;
    if (state !== null)     isSuccess = state === 'OK';
    else if (resCode !== null) isSuccess = resCode === '0';
    else if (statusRaw !== null) isSuccess = statusRaw === 'success' || statusRaw === '1';
    else isSuccess = false; // if no params, treat as failure

    setStatus(isSuccess ? 'success' : 'failed');
  }, [searchParams]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" dir="rtl">
        <Loader2 className="w-10 h-10 animate-spin text-[#FDD00A]" />
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 gap-6" dir="rtl">
        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-green-500" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-[#0C1415] text-xl font-['PeydaWeb'] font-bold">
            پرداخت با موفقیت انجام شد
          </h2>
          <p className="text-[#707F81] text-sm font-['PeydaWeb'] leading-6">
            سفارش شما ثبت و در حال پردازش است.
            <br />
            نتیجه سفارش از طریق پیامک به شما اطلاع داده می‌شود.
          </p>
          {referenceId && (
            <p className="text-[#ACB5BB] text-xs font-num-medium mt-1">
              کد پیگیری: {referenceId}
            </p>
          )}
        </div>

        <div className="w-full max-w-[320px] flex flex-col gap-3 mt-2">
          <button
            onClick={() => router.push('/Bazzar')}
            className="w-full h-[52px] bg-[#FDD00A] rounded-xl flex items-center justify-center font-['PeydaWeb'] font-semibold text-[#1A1C1E] hover:bg-[#e5bc09] transition-colors"
          >
            ادامه خرید
          </button>
        </div>
      </div>
    );
  }

  // Failed
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 gap-6" dir="rtl">
      <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
        <XCircle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-[#0C1415] text-xl font-['PeydaWeb'] font-bold">
          پرداخت ناموفق بود
        </h2>
        <p className="text-[#707F81] text-sm font-['PeydaWeb'] leading-6">
          تراکنش با موفقیت انجام نشد یا توسط کاربر لغو شد.
          <br />
          در صورت کسر وجه، مبلغ حداکثر تا ۷۲ ساعت کاری بازگشت داده می‌شود.
        </p>
        {referenceId && (
          <p className="text-[#ACB5BB] text-xs font-num-medium mt-1">
            کد پیگیری: {referenceId}
          </p>
        )}
      </div>

      <div className="w-full max-w-[320px] flex flex-col gap-3 mt-2">
        <button
          onClick={() => router.push('/Bazzar/DigiKaraCart/PaymentMethode')}
          className="w-full h-[52px] bg-[#FDD00A] rounded-xl flex items-center justify-center font-['PeydaWeb'] font-semibold text-[#1A1C1E] hover:bg-[#e5bc09] transition-colors"
        >
          تلاش مجدد
        </button>
        <button
          onClick={() => router.push('/Bazzar/DigiKaraCart')}
          className="w-full h-[52px] rounded-xl border border-[#DFE1E7] flex items-center justify-center font-['PeydaWeb'] text-sm text-[#707F81] hover:bg-gray-50 transition-colors"
        >
          بازگشت به سبد خرید
        </button>
      </div>
    </div>
  );
}

'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Store, ShoppingBag, Package, Loader2, Eye, EyeOff } from 'lucide-react';
import earningBg from '../../../../public/Earnings.png';
import { cn } from '@/lib/utils';
import { toFarsiNumber } from '@/app/services/common/utils';
import { dashboardService, DashboardStats } from '@/app/services/dashboard/dashboardService';
import moment from 'jalali-moment';

// Persian Solar Calendar Component
function PersianDate() {
  const [persianDate, setPersianDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const formatted = moment().locale('fa').format('jDD jMMMM jYYYY');
      setPersianDate(formatted);
    };

    updateDate();
    const interval = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return <div className="text-[#61656B] text-xs font-medium">{persianDate}</div>;
}

export function DashboardOverview({ isApproved: propIsApproved }: { isApproved?: boolean }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      const response = await dashboardService.getStats();

      if (response.success && response.data) {
        setStats(response.data);
      } else {
        setError(response.message || 'خطا در دریافت آمار');
        // Use defaults on error
        setStats({
          storeStatus: propIsApproved ? 'active' : 'pending',
          newOrders: 0,
          activeProducts: 0,
          totalEarnings: 0,
          isApproved: propIsApproved,
        });
      }
      setLoading(false);
    };

    fetchStats();
  }, [propIsApproved]);

  const isApproved = stats?.isApproved ?? propIsApproved ?? false;
  const newOrders = stats?.newOrders ?? 0;
  const activeProducts = stats?.activeProducts ?? 0;
  const totalEarnings = 0; // Hardcoded for now as requested

  return (
    <div className="w-full flex flex-col gap-3 mb-6 font-['PeydaWeb']" dir="rtl">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center px-0.5">
        <div className="text-[#222831] text-lg font-semibold leading-relaxed">
          عملکرد این ماهت عالیه!
        </div>
        <PersianDate />
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      <div className="w-full flex flex-col gap-3">
        {/* Wallet / Earning Card */}
        <div className="w-full relative bg-transparent rounded-lg overflow-hidden h-auto aspect-[3/1]">
          <Image src={earningBg} alt="Background" fill className="object-cover" priority />
          <div className="absolute inset-0 px-6 flex flex-col justify-center items-start gap-1">
            <div className="text-[#222831] text-sm font-medium opacity-90">موجودی کیف پول شما</div>
            <div className="text-[#222831] text-2xl font-bold flex items-center gap-2">
              {showBalance ? (
                <>
                  {toFarsiNumber(totalEarnings)} <span className="text-sm font-normal">تومان</span>
                </>
              ) : (
                <span className="mt-2 text-lg tracking-widest">****</span>
              )}
              <button onClick={() => setShowBalance(!showBalance)} className="mr-2">
                {showBalance ? <EyeOff className="w-5 h-5 text-[#222831]" /> : <Eye className="w-5 h-5 text-[#222831]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="w-full flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {/* Store Status Card */}
          <div className="flex-1 bg-white shadow-sm rounded-xl p-3.5 flex flex-col justify-center items-center gap-2.5 min-h-[114px] border border-gray-100/50">
            {loading ? (
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            ) : (
              <>
                <div className="flex flex-col items-center gap-1">
                  <Store
                    className={cn('w-6 h-6 mb-1', isApproved ? 'text-[#64B327]' : 'text-amber-500')}
                  />
                  <div
                    className={cn(
                      'text-[17px] font-bold leading-tight text-center',
                      isApproved ? 'text-[#64B327]' : 'text-amber-500',
                    )}
                  >
                    {isApproved ? 'فعال' : 'در انتظار تایید'}
                  </div>
                </div>
                <div className="text-[#393E46] text-xs font-medium">وضعیت حجره</div>
              </>
            )}
          </div>

          <div className="flex-1 bg-white shadow-sm rounded-xl p-3.5 flex flex-col justify-center items-center gap-2.5 min-h-[114px] border border-gray-100/50">
            {loading ? (
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            ) : (
              <>
                <div className="flex flex-col items-center gap-1">
                  <ShoppingBag className="w-6 h-6 text-[#393E46] mb-1" />
                  <div className="text-[#393E46] text-[20px] font-bold leading-tight text-center">
                    {toFarsiNumber(newOrders)}
                  </div>
                </div>
                <div className="text-[#393E46] text-xs font-medium text-center">سفارشات جدید</div>
              </>
            )}
          </div>

          <div className="flex-1 bg-white shadow-sm rounded-xl p-3.5 flex flex-col justify-center items-center gap-2.5 min-h-[114px] border border-gray-100/50">
            {loading ? (
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            ) : (
              <>
                <div className="flex flex-col items-center gap-1">
                  <Package className="w-6 h-6 text-[#393E46] mb-1" />
                  <div className="text-[#393E46] text-[20px] font-bold leading-tight text-center">
                    {toFarsiNumber(activeProducts)}
                  </div>
                </div>
                <div className="text-[#393E46] text-xs font-medium text-center">محصولات فعال</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

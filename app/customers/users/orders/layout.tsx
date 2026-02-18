'use client';

import React from 'react';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const currentStatus = segments[0] || 'processing';

  const tabs = [
    { id: 'processing', label: 'جاری' },
    { id: 'complete', label: 'تحویل شده' },
    { id: 'cancel', label: 'لغو شده' },
  ];

  return (
    <div className="w-full h-[100dvh] bg-gray-50 flex flex-col items-center relative overflow-hidden" dir="rtl">
      {/* Header */}
      <div className="w-full max-w-[440px] sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-[#0C1415] text-[16px] font-['PeydaWeb'] font-bold">سفارشات من</span>
          </div>
          <button
            onClick={() => router.push('/Bazzar/UserProfile')}
            className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center px-4 border-b border-gray-100 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = currentStatus === tab.id;
            return (
              <Link
                key={tab.id}
                href={`/customers/users/orders/${tab.id}`}
                className={cn(
                  "flex-1 min-w-[80px] text-center py-3 text-sm font-['PeydaWeb'] font-medium border-b-2 transition-colors duration-200",
                  isActive
                    ? 'border-[#FDD00A] text-[#0C1415] font-bold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}

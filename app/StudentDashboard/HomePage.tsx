'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/AuthProvider';
import { DashboardNavBar } from './layout/DashboardNavBar';
import { QuickAccess } from './features/overview/Quickaccess';
import { DashboardOverview } from './features/overview/DashboardOverView';
import { Progress } from './features/overview/Progress';
import { SmartSuggestions } from './features/overview/SmartSuggestions';
import OrderReviews from './features/orders/OrderReviews';
import { Navigation } from './layout/Navigation';
import DashboardEmptyPage from './hojreCreation/page';
import { shopService } from '../services/student/shopService';

export function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [hasHojre, setHasHojre] = React.useState<boolean | null>(null);
  const [isApproved, setIsApproved] = React.useState<boolean>(false);

  React.useEffect(() => {
    // If not loading and not authenticated, redirect
    if (!isLoading && !isAuthenticated) {
      router.push('/login?role=student');
    }
  }, [isLoading, isAuthenticated, router]);

  React.useEffect(() => {
    // We still check hojre_created from localStorage as it might not be in authUser yet
    // Or we could derive it from authUser if available
    const created = localStorage.getItem('hojre_created');
    setHasHojre(created === 'true');

    // Fetch fresh cell data to get latest approved status
    if (created === 'true') {
      shopService.getShop().then((res) => {
        if (res.success && res.hasShop && res.data) {
          const cellData = Array.isArray(res.data) ? res.data[0] : res.data;
          setIsApproved(!!(cellData?.approved || cellData?.is_active || cellData?.active));
        }
      });
    }
  }, []);

  if (isLoading) {
      return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-50 font-['PeydaWeb']">
          در حال بررسی دسترسی...
        </div>
      );
  }

  if (!isAuthenticated) {
      return null; // Will redirect
  }

  if (hasHojre === null) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-50 font-['PeydaWeb']">
        در حال بارگذاری...
      </div>
    );
  }

  if (!hasHojre) {
    return <DashboardEmptyPage />;
  }

  return (
    <div className="max-w-[440px] mx-auto min-h-screen pb-24 font-['PeydaWeb']" dir="rtl">
      <DashboardNavBar />

      <div className="px-4 flex flex-col gap-6 mt-6">
        <DashboardOverview isApproved={isApproved} />
        <QuickAccess />
        <div className="grid grid-cols-1 gap-6">
          <Progress />
          <SmartSuggestions />
        </div>
        <OrderReviews />
      </div>

      <Navigation />
    </div>
  );
}

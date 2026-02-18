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

export function HomePage() {
  const router = useRouter();
  const { user: authUser, isAuthenticated, isLoading } = useAuth();
  const [hasHojre, setHasHojre] = React.useState<boolean | null>(null);

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

  // Use authUser if available, otherwise fallback (though useAuth is preferred source of truth)
  const userToUse = authUser || {};
  console.log('Dashboard User Data:', userToUse);
  
  // Support both { cell: ... } and { user: { cell: ... } } structures
  // AuthProvider usually returns flat UserData, but let's be safe matching original logic
  const actualUser = ((userToUse as any)?.user || userToUse) as Record<string, unknown>;

  // Robust check for cell: handle single object or array, and multiple field names
  const cell = Array.isArray(actualUser?.cell) ? actualUser.cell[0] : actualUser?.cell;
  const isApproved = !!(cell?.approved || cell?.is_active || cell?.active);

  return (
    <div className="w-full min-h-screen pb-24 font-['PeydaWeb']" dir="rtl">
      <DashboardNavBar />

      <div className="px-4 flex flex-col gap-6 mt-6">
        <DashboardOverview isApproved={isApproved} />
        <QuickAccess />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Progress />
          <SmartSuggestions />
        </div>
        <OrderReviews />
      </div>

      <div className="fixed bottom-0 w-full z-50">
        <Navigation />
      </div>
    </div>
  );
}

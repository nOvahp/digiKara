'use client';

import * as React from 'react';
import { DashboardNavBar } from './layout/DashboardNavBar';
import { QuickAccess } from './features/overview/Quickaccess';
import { DashboardOverview } from './features/overview/DashboardOverView';
import { Progress } from './features/overview/Progress';
import { SmartSuggestions } from './features/overview/SmartSuggestions';
import OrderReviews from './features/orders/OrderReviews';
import { Navigation } from './layout/Navigation';
import DashboardEmptyPage from './hojreCreation/page';

export function HomePage() {
  const [user, setUser] = React.useState<Record<string, unknown> | null>(null);
  const [hasHojre, setHasHojre] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const created = localStorage.getItem('hojre_created');
    const storedUser = localStorage.getItem('user_data');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }
    setHasHojre(created === 'true');
  }, []);

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

  console.log('Dashboard User Data:', user);
  // Support both { cell: ... } and { user: { cell: ... } } structures
  const actualUser = user?.user || user;

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

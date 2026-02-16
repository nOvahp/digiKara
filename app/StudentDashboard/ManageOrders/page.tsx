import { Suspense } from 'react';
import ManageOrders from '@/app/StudentDashboard/features/orders/ManageOrders/ManageOrders';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManageOrders />
    </Suspense>
  );
}

import { Suspense } from 'react';
import SellsPage from '@/app/StudentDashboard/features/products/Sells/SellsPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SellsPage />
    </Suspense>
  );
}

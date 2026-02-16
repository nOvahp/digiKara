import { Suspense } from 'react';
import { EditeProducts } from '@/app/StudentDashboard/features/products/EditeProducts';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditeProducts />
    </Suspense>
  );
}

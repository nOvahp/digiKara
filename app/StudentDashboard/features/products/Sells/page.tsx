import { Suspense } from 'react';
import SellsPage from "./SellsPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SellsPage />
    </Suspense>
  );
}

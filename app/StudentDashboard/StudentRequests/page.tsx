import { Suspense } from 'react';
import StudentRequests from '@/app/StudentDashboard/features/requests/StudentRequests';

export default function StudentRequestsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-['PeydaWeb'] text-[#6B7280]">در حال بارگذاری...</div>}>
      <StudentRequests />
    </Suspense>
  );
}

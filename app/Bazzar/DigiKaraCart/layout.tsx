import React from 'react';

export default function DigiKaraCartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-[100dvh] bg-gray-50 flex justify-center">
      <div className="w-full max-w-[440px] relative">
        {children}
      </div>
    </div>
  );
}

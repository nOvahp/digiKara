'use client';

import React, { useEffect } from 'react';
import HomePage from './HomePage';
import HomePageWeb from './_components/HomePageWeb';

export default function BazzarPage() {
  useEffect(() => {
    // Explicitly add landing-page and full-width to ensure the systemic max-width constraint is bypassed
    document.body.classList.add('landing-page', 'full-width');
    return () => {
      document.body.classList.remove('landing-page', 'full-width');
    };
  }, []);

  return (
    <>
      {/* Mobile Layout block - Restoring default 3% body padding since we bypassed it with full-width globally */}
      <div className="block lg:hidden w-full px-[3%] pt-[3%]">
        <HomePage />
      </div>
      <div className="hidden lg:block w-full">
        <HomePageWeb />
      </div>
    </>
  );
}

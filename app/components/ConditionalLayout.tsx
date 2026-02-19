'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar';
import MobileNavBar from './MobileNavBar';

export default function ConditionalLayout() {
  const pathname = usePathname();

  useEffect(() => {
    const isLandingPage = pathname === '/' || pathname?.startsWith('/homePage');
    const isLoginPage = pathname?.startsWith('/login');

    if (isLandingPage) {
      document.body.classList.add('landing-page');
    } else {
      document.body.classList.remove('landing-page');
    }



    if (isLoginPage) {
      document.body.classList.add('login-page');
    } else {
      document.body.classList.remove('login-page');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('landing-page');
      document.body.classList.remove('login-page');
    };
  }, [pathname]);

  // Hide global navs on School Panel, Login, and Customers pages
  if (
    pathname?.startsWith('/SchoolPanel') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/customers')
  ) {
    return null;
  }

  return (
    <>
      <Navbar />
      <MobileNavBar />
    </>
  );
}

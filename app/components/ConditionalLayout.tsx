"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./Navbar";
import MobileNavBar from "./MobileNavBar";

export default function ConditionalLayout() {
  const pathname = usePathname();

  useEffect(() => {
    const isLandingPage = pathname === "/" || pathname?.startsWith("/homePgae");

    if (isLandingPage) {
      document.body.classList.add("landing-page");
    } else {
      document.body.classList.remove("landing-page");
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("landing-page");
    };
  }, [pathname]);
  
  // Hide global navs on School Panel and Login pages
  if (pathname?.startsWith("/SchoolPanel") || pathname?.startsWith("/login")) {
    return null;
  }
  
  return (
    <>
      <Navbar />
      <MobileNavBar />
    </>
  );
}

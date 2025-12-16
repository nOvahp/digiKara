"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import MobileNavBar from "./MobileNavBar";

export default function ConditionalLayout() {
  const pathname = usePathname();
  
  // Hide global navs on School Panel pages
  if (pathname?.startsWith("/SchoolPanel")) {
    return null;
  }
  
  return (
    <>
      <Navbar />
      <MobileNavBar />
    </>
  );
}

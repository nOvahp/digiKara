"use client";

import React from "react";
import DashBoardNavbar from "./DashBoardNavbar";
import Navigation from "./Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white min-h-screen pb-20"> {/* pb-20 added for bottom nav spacing */}
      <DashBoardNavbar />
      {children}
      <Navigation />
    </div>
  );
}

import React from "react";
import DashBoardNavbar from "./DashBoardNavbar";
import Navigation from "./Navigation";
import SchoolHomePage from "./HomePage";

export default function SchoolPanelPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashBoardNavbar />
      <SchoolHomePage />
      <Navigation />
    </div>
  );
}

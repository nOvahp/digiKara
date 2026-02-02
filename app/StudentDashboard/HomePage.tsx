"use client"

import * as React from "react"
import { DashboardNavBar } from "./layout/DashboardNavBar"
import { QuickAccess } from "./features/overview/Quickaccess"
import { DashboardOverview } from "./features/overview/DashboardOverView"
import { Progress } from "./features/overview/Progress"
import { SmartSuggestions } from "./features/overview/SmartSuggestions"
import OrderReviews from "./features/orders/OrderReviews"
import { Navigation } from "./layout/Navigation"

export function HomePage() {
  return (
    <div className="w-full min-h-screen bg-background p-0" dir="ltr">
      <DashboardNavBar />
      
      
      <div className="mt-8 flex flex-col gap-8 px-0 pb-20">
        <DashboardOverview />
        <QuickAccess />
        <Progress />
        <SmartSuggestions />
        <OrderReviews />
      </div>
      <Navigation />
    </div>
  )
}

"use client"

import * as React from "react"
import { DashboardNavBar } from "./DashboardNavBar"
import { QuickAccess } from "./Quickaccess"
import { DashboardOverview } from "./DashboardOverView"
import { Progress } from "./Progress"
import { SmartSugesstions } from "./SmartSugesstions"

export function HomePage() {
  return (
    <div className="w-full min-h-screen bg-background p-0" dir="ltr">
      <DashboardNavBar />
      
      
      <div className="mt-8 flex flex-col gap-8 px-0 pb-6">
        <DashboardOverview />
        <QuickAccess />
        <Progress />
        <SmartSugesstions />
      </div>
    </div>
  )
}

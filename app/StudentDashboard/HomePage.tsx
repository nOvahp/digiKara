"use client"

import * as React from "react"
import { DashboardNavBar } from "./layout/DashboardNavBar"
import { QuickAccess } from "./features/overview/Quickaccess"
import { DashboardOverview } from "./features/overview/DashboardOverView"
import { Progress } from "./features/overview/Progress"
import { SmartSuggestions } from "./features/overview/SmartSuggestions"
import OrderReviews from "./features/orders/OrderReviews"
import { Navigation } from "./layout/Navigation"
import DashboardEmptyPage from "./hojreCreation/page"

export function HomePage() {
  return (
    <DashboardEmptyPage />
  )
}

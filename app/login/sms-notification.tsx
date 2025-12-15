"use client"

import * as React from "react"
import { MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface SmsNotificationProps {
  code: string;
  visible: boolean;
  onDismiss?: () => void;
}

export function SmsNotification({ code, visible, onDismiss }: SmsNotificationProps) {
  if (!visible) return null

  return (
    <div 
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50",
        "bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-4",
        "flex items-start gap-4 cursor-pointer transition-all duration-500",
        "animate-in slide-in-from-top-10 fade-in"
      )}
      onClick={onDismiss}
      dir="ltr"
    >
      <div className="bg-green-500 p-2 rounded-xl">
        <MessageSquare className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
         <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-900 text-sm">Messages</h4>
            <span className="text-xs text-gray-500">now</span>
         </div>
         <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium text-gray-900">DigiKara:</span> Your verification code is {code}
         </p>
      </div>
    </div>
  )
}

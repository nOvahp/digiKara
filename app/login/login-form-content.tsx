"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

type LoginStage = "PHONE_ENTRY" | "OTP_ENTRY"

interface LoginFormContentProps {
  stage: LoginStage;
  phoneNumber: string;
  onPhoneChange: (value: string) => void;
  otp: string;
  onOtpChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string;
  timeLeft: number;
  onResend: () => void;
}

export function LoginFormContent({
  stage,
  phoneNumber,
  onPhoneChange,
  otp,
  onOtpChange,
  onSubmit,
  isLoading,
  error,
  timeLeft,
  onResend
}: LoginFormContentProps) {

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-start bg-background rounded-t-3xl z-10 p-6 -mt-10 pt-8 gap-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <form 
        onSubmit={onSubmit}
        className="w-full space-y-6 mt-4"
      >
        <div className="space-y-2">
          <Label htmlFor={stage === "PHONE_ENTRY" ? "phone" : "otp"} className="sr-only">
            {stage === "PHONE_ENTRY" ? "شماره موبایل" : "کد تایید"}
          </Label>
          
          {stage === "PHONE_ENTRY" ? (
            <Input
              id="phone"
              type="tel"
              placeholder="09123456789"
              value={phoneNumber}
              onChange={(e) => onPhoneChange(e.target.value)}
              className="text-left text-lg py-6 rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all text-direction-ltr"
              style={{ direction: 'ltr' }}
              autoFocus
            />
          ) : (
            <Input
              id="otp"
              type="text"
              placeholder="- - - -"
              value={otp}
              onChange={(e) => onOtpChange(e.target.value)}
              className="text-center text-2xl py-6 tracking-[1em] rounded-xl border-gray-200 bg-gray-50 focus:bg-white transition-all font-mono"
              maxLength={6}
              autoFocus
            />
          )}
          
          {error && (
            <p className="text-red-500 text-sm text-right px-1">{error}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#393E46] hover:bg-[#222831] text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-gray-200/50 transition-all active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            stage === "PHONE_ENTRY" ? "تایید" : "ورود"
          )}
        </Button>

        {stage === "OTP_ENTRY" && (
            <div className="text-center">
              <Button 
                type="button"
                variant="link" 
                className="text-sm text-gray-500"
                onClick={onResend}
                disabled={timeLeft > 0}
              >
                {timeLeft > 0 ? `ارسال مجدد (${formatTime(timeLeft)})` : "ارسال مجدد کد"}
              </Button>
            </div>
        )}
      </form>
    </div>
  )
}

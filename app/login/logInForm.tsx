"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginHeader } from "./login-header"
import headerImg from "../../public/OtpHeader.png"
import { LoginTopNav } from "./login-top-nav"
import { LoginHeaderText } from "./login-header-text"
import { LoginFormContent } from "./login-form-content"
import { SmsNotification } from "./sms-notification"

type LoginStage = "PHONE_ENTRY" | "OTP_ENTRY"

const RESEND_DELAY = 120 // 2 minutes

export function LogInForm({ onNext }: { onNext?: () => void }) {
  const router = useRouter()
  const [mockOtp, setMockOtp] = useState("12345")

  useEffect(() => {
    setMockOtp(Math.floor(10000 + Math.random() * 90000).toString())
  }, [])
  const [stage, setStage] = useState<LoginStage>("PHONE_ENTRY")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Timer & Notification Logic
  const [timeLeft, setTimeLeft] = useState(0)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [timeLeft])

  const startOtpProcess = () => {
    setStage("OTP_ENTRY")
    setTimeLeft(RESEND_DELAY)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 5000) // Hide after 5 sec
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (phoneNumber.length < 10) {
      setError("لطفا شماره موبایل معتبر وارد کنید")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      startOtpProcess()
    }, 1000)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (otp !== mockOtp) {
        if (otp.length < 4) {
             setError("کد تایید معتبر نیست")
             return
        }
        if (otp !== mockOtp) {
            setError(`کد وارد شده صحیح نیست (کد آزمایشی: ${mockOtp})`)
            return
        }
    }
    
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log("Logged in!")
      if (onNext) {
          onNext(); // Proceed to next step instead of redirect
      } else {
          router.push("/StudentDashboard"); // Fallback
      }
    }, 1000)
  }

  const handleBack = () => {
    if (stage === "OTP_ENTRY") {
      setStage("PHONE_ENTRY")
      setError("")
      setOtp("")
      setTimeLeft(0)
      setShowNotification(false)
    }
  }

  const handleResend = () => {
    if (timeLeft === 0) {
      // Simulate resend
      startOtpProcess()
    }
  }

  return (
    <div className="flex h-full w-full flex-col relative">
      <SmsNotification 
        code={mockOtp} 
        visible={showNotification} 
        onDismiss={() => setShowNotification(false)}
      />

      <LoginTopNav onBackClick={handleBack} />
      
      <LoginHeaderText stage={stage} phoneNumber={phoneNumber} />

      <LoginHeader imageSrc={headerImg} />
      
      <LoginFormContent 
        stage={stage}
        phoneNumber={phoneNumber}
        onPhoneChange={setPhoneNumber}
        otp={otp}
        onOtpChange={setOtp}
        onSubmit={stage === "PHONE_ENTRY" ? handlePhoneSubmit : handleOtpSubmit}
        isLoading={isLoading}
        error={error}
        timeLeft={timeLeft}
        onResend={handleResend}
      />
    </div>
  )
}

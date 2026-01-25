"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginHeader } from "./login-header";
import headerImg from "../../public/OtpHeader.png";
import { LoginTopNav } from "./login-top-nav";
import { LoginHeaderText } from "./login-header-text";
import { LoginFormContent } from "./login-form-content";
import { SmsNotification } from "./sms-notification";
import { useAuth } from "@/app/providers/AuthProvider";

type LoginStage = "PHONE_ENTRY" | "WAITING" | "OTP_ENTRY";

const RESEND_DELAY = 120; // 2 minutes

export function LogInForm({ onNext }: { onNext?: () => void }) {
  const router = useRouter();
  const { requestOtp, verifyOtp } = useAuth();
  const [stage, setStage] = useState<LoginStage>("PHONE_ENTRY");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Timer & Notification Logic
  const [timeLeft, setTimeLeft] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const startOtpProcess = () => {
    setStage("WAITING");
    setTimeLeft(RESEND_DELAY);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 8000); // Hide after 5 sec
    // After waiting, go to OTP entry
    setTimeout(() => {
      setStage("OTP_ENTRY");
    }, 2000); // Wait 2 seconds to simulate waiting for SMS
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (phoneNumber.length < 11 || phoneNumber.length > 11) {
      setError("لطفا شماره موبایل معتبر وارد کنید");
      return;
    }
    setIsLoading(true);
    console.log("📞 Phone Submit - Requesting OTP for:", phoneNumber);
    try {
      const result = await requestOtp(phoneNumber);
      if (result.success) {
        console.log("✅ OTP request successful:", result);
        setIsLoading(false);
        startOtpProcess();
      } else {
        console.log("❌ OTP request failed:", result);
        setIsLoading(false);
        setError(result.message || "خطا در درخواست کد تایید");
      }
    } catch (err) {
      setIsLoading(false);
      setError("خطای شبکه");
      console.error("Phone submit error:", err);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.length < 4) {
      setError("کد تایید معتبر نیست");
      return;
    }

    setIsLoading(true);
    console.log("🔐 OTP Submit - Verifying OTP for:", { phoneNumber, otp });
    try {
      const result = await verifyOtp(phoneNumber, otp);
      if (result.success) {
        setIsLoading(false);
        console.log("✅ OTP verification successful!");
        console.log("👤 User authenticated:", result);
        if (onNext) {
          onNext(); // Proceed to next step instead of redirect
        } else {
          router.push("/StudentDashboard"); // Fallback
        }
      } else {
        setIsLoading(false);
        console.log("❌ OTP verification failed:", result);
        setError(result.message || "کد تایید نادرست است");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("OTP submit error:", err);
      setError("خطای شبکه");
    }
  };

  const handleBack = () => {
    if (stage === "OTP_ENTRY" || stage === "WAITING") {
      setStage("PHONE_ENTRY");
      setError("");
      setOtp("");
      setTimeLeft(0);
      setShowNotification(false);
    }
  };

  const handleResend = () => {
    if (timeLeft === 0) {
      // Simulate resend
      startOtpProcess();
    }
  };
  
  return (
    <div className="flex h-full w-full flex-col relative">
      <SmsNotification
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
  );
}

"use client"

import * as React from "react"

interface LoginHeaderTextProps {
  stage: "PHONE_ENTRY" | "OTP_ENTRY";
  phoneNumber?: string;
}

export function LoginHeaderText({ stage, phoneNumber }: LoginHeaderTextProps) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col justify-center items-end gap-4">
        <div className="text-right text-[#393E46] text-[36px]  font-extrabold leading-[43.20px] break-words">
          {stage === "PHONE_ENTRY" ? "وارد حساب خود شوید" : "کد تایید"}
        </div>
        <div className="text-right text-[#393E46] text-[14px]  font-medium leading-[19.60px] break-words">
          {stage === "PHONE_ENTRY" 
            ? "لطفا شماره موبایل خود را وارد کنید" 
            : `کد ارسال شده به شماره ${phoneNumber} را وارد کنید`
          }
        </div>
    </div>
  )
}

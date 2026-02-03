"use client"

import * as React from "react"
import { LoginHeader } from "./login-header"
import { LoginDescription } from "./login-description"
import { loginContent3 } from "./login-data"


 interface LoginViewProps {
  onNext?: () => void;
  onBack?: () => void;
}
export function LoginView3({ onNext, onBack }: LoginViewProps) {
 
 
  return (
    <div className="flex h-full w-full flex-col ">
          <LoginHeader 
            imageSrc={loginContent3.headerImage}
            overlayImageSrc={loginContent3.overlayImage}
            onBack={onBack}
          />
          <div className="flex flex-1 flex-col items-center justify-start    bg-background rounded-t-3xl z-10">
            <LoginDescription onNext={onNext} title={loginContent3.title}
                      description={loginContent3.description}
                      buttonText="بعدی"
            />
           
          </div>
          </div>
  )
}

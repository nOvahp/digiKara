"use client"

import * as React from "react"
// import { LoadingScreen } from "./loading-screen"
import { LoginHeader } from "./login-header"
import { LoginDescription } from "./login-description"
import { loginContent2 } from "./login-data"


 interface LoginViewProps {
  onNext?: () => void;
}
export function LoginView2({ onNext }: LoginViewProps) {
 
 
  return (
    <div className="flex h-full w-full flex-col ">
          <LoginHeader 
            imageSrc={loginContent2.headerImage}
           overlayImageSrc={loginContent2.overlayImage}
          />
          <div className="flex flex-1 flex-col items-center justify-start    bg-background rounded-t-3xl z-10">
            <LoginDescription onNext={onNext} title={loginContent2.title}
                      description={loginContent2.description}/>
           
          </div>
          </div>
  )
}

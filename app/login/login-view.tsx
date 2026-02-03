"use client"

import * as React from "react"
import { LoadingScreen } from "./loading-screen"
import { LoginHeader } from "./login-header"
// import { LoginForm } from "./login-form"
import { LoginDescription } from "./login-description"
import { loginContent, loginContent2 } from "./login-data"

interface LoginViewProps {
  onNext?: () => void;
  onBack?: () => void;
}

export function LoginView({ onNext, onBack }: LoginViewProps) {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="flex h-full w-full flex-col ">
      <LoginHeader 
        imageSrc={loginContent.headerImage}
        overlayImageSrc={loginContent.overlayImage}
        onBack={onBack}
      />
      <div className="flex flex-1 flex-col items-center justify-start    bg-background rounded-t-3xl z-10">
        <LoginDescription onNext={onNext} title={loginContent.title}
                  description={loginContent.description}/>
       
      </div>
    </div>
  )
}

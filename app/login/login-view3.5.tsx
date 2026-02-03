"use client"

import * as React from "react"
import { LoginHeader } from "./login-header"
import { LoginDescription } from "./login-description"
import { loginContent35 } from "./login-data"


interface LoginViewProps {
    onNext?: () => void;
    onBack?: () => void;
}
export function LoginView35({ onNext, onBack }: LoginViewProps) {


    return (
        <div className="flex h-full w-full flex-col ">
            <LoginHeader
                imageSrc={loginContent35.headerImage}
                overlayImageSrc={loginContent35.overlayImage}
                onBack={onBack}
            />
            <div className="flex flex-1 flex-col items-center justify-start    bg-background rounded-t-3xl z-10">
                <LoginDescription onNext={onNext} title={loginContent35.title}
                    description={loginContent35.description}
                    buttonText="شروع کنید"
                />

            </div>
        </div>
    )
}

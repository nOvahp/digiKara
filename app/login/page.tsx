"use client"

import * as React from "react"
import { LoginView } from "./login-view"
import { LoginView2 } from "./login-view2"
import { LoginView3 } from "./login-view3"
import { LoginView4 } from "./logIn-view4"
import { Login } from "./logIn"

import { LogInForm } from "./logInForm"

export default function LoginPage() {
  const [step, setStep] = React.useState(1)

  if (step === 1) {
    return <LoginView onNext={() => setStep(2)} />
  }

  if (step === 2) {
    return <LoginView2 onNext={() => setStep(3)} />
  }

  if (step === 3) {
    return <LoginView3 onNext={() => setStep(4)} />
  }

  if (step === 4) {
    return <Login onNext={() => setStep(5)} />
  }

  if (step === 5) {
    return <LogInForm onNext={() => setStep(6)} />
  }
  
  if (step === 6) {
    return <LoginView4 />
  }

  return <LogInForm /> // Default or fallback
}

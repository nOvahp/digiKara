"use client";

import * as React from "react";
import { LoginView } from "./login-view";
import { LoginView2 } from "./login-view2";
import { LoginView3 } from "./login-view3";
import { LoginView35 } from "./login-view3.5";
import { LoginView4 } from "./logIn-view4";
import { Login } from "./logIn";
import { LoginView5 } from "./logIn-view5";
import { LoginView6 } from "./logIn-view6";
import { LoginView7 } from "./logIn-view7";
import { LoginView8 } from "./logIn-view8";

import { LogInForm } from "./logInForm";

export default function LoginPage() {
  const [step, setStep] = React.useState(1);

  if (step === 1) {
    return <LoginView onNext={() => setStep(2)} />;
  }

  if (step === 2) {
    return <LoginView2 onNext={() => setStep(3)} />;
  }

  if (step === 3) {
    return <LoginView3 onNext={() => setStep(3.5)} />;
  }

  if (step === 3.5) {
    return <LoginView35 onNext={() => setStep(4)} />;
  }

  if (step === 4) {
    return <Login onNext={() => setStep(5)} />;
  }

  if (step === 5) {
    return <LogInForm onNext={() => setStep(6)} />;
  }

  if (step === 6) {
    return <LoginView5 onNext={() => setStep(7)} />;
  }

  if (step === 7) {
    return <LoginView6 onNext={() => setStep(8)} />;
  }

  if (step === 8) {
    return <LoginView7 onNext={() => setStep(9)} />;
  }

  if (step === 9) {
    return <LoginView8 onNext={() => setStep(10)} />;
  }

  if (step === 10) {
    return <LoginView4 />;
  }

  return <LogInForm />; // Default or fallback
}

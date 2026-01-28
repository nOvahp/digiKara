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
import { LoginViewNationalID } from "./login-view-nationalID";
import { LoginViewReport } from "./login-view-report";

import { LogInForm } from "./logInForm";

// Define simpler step constants
enum Step {
  INTRO_1 = 1,
  INTRO_2 = 2,
  INTRO_3 = 3,
  INTRO_3_5 = 3.5,
  LOGIN_LANDING = 4,
  LOGIN_FORM = 5,
  NATIONAL_ID = 5.5,
  VIEW_REPORT = 6,
  REPORT_DETAILS = 6.5,
  VIEW_6 = 7,
  VIEW_7 = 8,
  VIEW_8 = 9,
  FINAL = 10
}

export default function LoginPage() {
  const [step, setStep] = React.useState<number>(Step.INTRO_1);

  // Simple Router based on Step
  switch (step) {
    case Step.INTRO_1:
      return <LoginView onNext={() => setStep(Step.INTRO_2)} />;
    case Step.INTRO_2:
      return <LoginView2 onNext={() => setStep(Step.INTRO_3)} />;
    case Step.INTRO_3:
      return <LoginView3 onNext={() => setStep(Step.INTRO_3_5)} />;
    case Step.INTRO_3_5:
      return <LoginView35 onNext={() => setStep(Step.LOGIN_LANDING)} />;
    
    // Main Login Flow
    case Step.LOGIN_LANDING:
      // "Login" component is the landing with buttons (Login with Phone, Student Account, etc.)
      return <Login onNext={() => setStep(Step.LOGIN_FORM)} />;
    case Step.LOGIN_FORM:
      // The actual Form (Phone -> OTP)
      return <LogInForm onNext={() => setStep(Step.NATIONAL_ID)} />;
    
    // Post-Login / Flow Specifics
    case Step.NATIONAL_ID:
      return <LoginViewNationalID onNext={() => setStep(Step.VIEW_REPORT)} />;
    case Step.VIEW_REPORT:
      return <LoginView5 onNext={() => setStep(Step.VIEW_6)} onReport={() => setStep(Step.REPORT_DETAILS)} />;
    case Step.REPORT_DETAILS:
      return <LoginViewReport onNext={() => setStep(Step.VIEW_6)} onLoginAgain={() => setStep(Step.LOGIN_FORM)} />;
    
    case Step.VIEW_6:
      return <LoginView6 onNext={() => setStep(Step.VIEW_7)} />;
    case Step.VIEW_7:
      return <LoginView7 onNext={() => setStep(Step.VIEW_8)} />;
    case Step.VIEW_8:
      return <LoginView8 onNext={() => setStep(Step.FINAL)} />;
    case Step.FINAL:
      return <LoginView4 />;
      
    default:
      return <LoginView onNext={() => setStep(Step.INTRO_1)} />;
  }
}

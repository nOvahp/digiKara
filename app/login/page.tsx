'use client';

import * as React from 'react';
import { LoginView } from './login-view';
import { LoginView2 } from './login-view2';
import { LoginView3 } from './login-view3';
import { LoginView35 } from './login-view3.5';
import { Login } from './logIn';
import { LoginView5 } from './logIn-view5';
import { LoginView6 } from './logIn-view6';
import { LoginView7 } from './logIn-view7';
import { LoginViewNationalID } from './login-view-nationalID';
import { LoginViewReport } from './login-view-report';

import { useRouter, useSearchParams } from 'next/navigation';
import { LogInForm } from './logInForm';

import { useAuth } from '@/app/providers/AuthProvider';
import { LoginViewManagerInfo } from './LoginViewManagerInfo';
import { LoginViewManagerReport } from './LoginViewManagerReport';
import { LoginViewCustomerRegister } from './login-view-customer-register';
import { LoginViewCustomerLogin } from './login-view-customer-login';

// Define step constants
enum Step {
  LOADING = 0,
  INTRO_1 = 1,
  INTRO_2 = 2,
  INTRO_3 = 3,
  INTRO_3_5 = 3.5,
  LOGIN_LANDING = 4,
  LOGIN_FORM = 5,
  // Otp is handled inside LOGIN_FORM
  NATIONAL_ID = 5.5,
  VIEW_REPORT = 6,
  REPORT_DETAILS = 6.5,
  // Student Flows
  VIEW_6 = 7,
  VIEW_7 = 8,
  VIEW_8 = 9,
  FINAL = 10,

  // Manager Flows
  MANAGER_INFO = 11,
  MANAGER_REPORT = 12,

  // Customer Flows
  CUSTOMER_REGISTER = 13,
  CUSTOMER_LOGIN = 14,
}

import { UserData } from '@/app/services/common/schemas';

// ... (imports remain)

// ... (step enum remains)

export default function LoginPage() {
  const [step, setStep] = React.useState<number>(Step.INTRO_1);
  const [phone, setPhone] = React.useState<string>(''); // Store phone for multi-step flows
  const router = useRouter();
  const searchParams = useSearchParams();
  const { role, user } = useAuth(); // Get selected role and user

  React.useEffect(() => {
    const phoneParam = searchParams.get('phone');
    if (phoneParam) {
      setPhone(phoneParam);
      setStep(Step.CUSTOMER_LOGIN);
    }
  }, [searchParams]);

  // Handler for successful login (returning user)
  const handleLoginSuccess = (userData?: UserData) => {
    if (userData) {
      try {
        localStorage.setItem('user_data', JSON.stringify(userData));
        // cell is typed as any in UserData, so this check is valid
        if (userData.cell) {
          localStorage.setItem('hojre_created', 'true');
        }
      } catch (e) {
        console.error('Failed to save user data on login success', e);
      }
    }

    if (role === 'manager') {
      setStep(Step.MANAGER_INFO);
    } else {
      setStep(Step.FINAL); // Or dashboard for students who data is OK
    }
  };

  // --- Smart Navigation Logic ---
  const handleNextStep = (currentUserData: UserData | null = user) => {
    console.log('🚀 [Smart Nav] handleNextStep called with:', currentUserData);

    // Save user data to localStorage for persistence across app
    if (currentUserData) {
      try {
        console.log('Saving user_data to localStorage:', currentUserData);
        localStorage.setItem('user_data', JSON.stringify(currentUserData));
      } catch (e) {
        console.error('Failed to save user data to localStorage', e);
      }
    } else {
      console.warn('⚠️ handleNextStep: No currentUserData provided!');
    }

    // If no user data, fallback
    if (!currentUserData) {
      console.warn('Navigation: No user data found');
      return;
    }

    // 1. Check Info Correct -> View 5 (Confirmation)
    // If is_info_correct is FALSE or NULL, we go to View 5
    console.log('Checking is_info_correct:', currentUserData.is_info_correct);
    if (currentUserData.is_info_correct !== true) {
      console.log('-> Going to View 5 (is_info_correct is not true)');
      setStep(Step.VIEW_REPORT);
      return;
    }

    // 2. Check Favorites -> View 6 (Interests)
    // If favorites is FALSE or NULL, we go to View 6
    if (currentUserData.favorites !== true) {
      setStep(Step.VIEW_6);
      return;
    }

    // 3. Check Meta -> View 7 (Experience)
    // If meta is FALSE or NULL, we go to View 7
    if (currentUserData.meta !== true) {
      setStep(Step.VIEW_7);
      return;
    }

    // 4. All Flags True -> Go to Final Destination
    handleFinalRedirect();
  };

  const handleFinalRedirect = React.useCallback(async () => {
    // Direct redirect based on role
    if (role === 'manager') {
      router.push('/SchoolPanel');
      return;
    }

    if (role === 'customer') {
      router.push('/Bazzar');
      return;
    }

    // For student, check if hojre exists
    let currentUser: UserData | null = user;
    try {
      const stored = localStorage.getItem('user_data');
      if (stored) currentUser = JSON.parse(stored) as UserData;
    } catch {
      // ignore json parse error
    }

    // Logic to check cell existence
    const checkHojre = async () => {
      // 1. Check in user object
      // Handle potential nested user object (legacy or safety check)
      const hasNestedUser = currentUser && 'user' in (currentUser as unknown as Record<string, unknown>);
      const actualUser = hasNestedUser ? (currentUser as unknown as { user: UserData }).user : currentUser;

      const hasCellInUser = actualUser?.cell
        ? Array.isArray(actualUser.cell)
          ? actualUser.cell.length > 0
          : true // if cell is object/truthy
        : false;

      if (hasCellInUser) {
        localStorage.setItem('hojre_created', 'true');
        router.push('/StudentDashboard');
        return;
      }

      // 2. If not in user object, double check with API (to be sure)
      // Import dynamically to avoid cycle if any, or just use imported service
      const { shopService } = await import('@/app/services/student/shopService');
      const result = await shopService.getShop();

      if (result.success && result.hasShop) {
        // Update local storage to avoid future checks
        localStorage.setItem('hojre_created', 'true');

        // Optionally update user_data in local storage with the new cell info if possible
        // but for now just redirect
        router.push('/StudentDashboard');
      } else {
        // No shop found -> Creation Flow
        localStorage.removeItem('hojre_created');
        router.push('/StudentDashboard/hojreCreation');
      }
    };

    checkHojre();
  }, [role, router, user]);

  // Wrapper for LoginViewNationalID which passes userData directly
  const handleNationalIdNext = (userData: UserData) => {
    handleNextStep(userData);
  };

  // Wrapper for subsequent steps which rely on stored context
  // This logic assumes the CURRENT step is now "done" and checks FUTURE flags
  const handleSequentialNext = () => {
    // From View 5 (Confirmation) -> Next is 6
    if (step === Step.VIEW_REPORT || step === Step.REPORT_DETAILS) {
      // Assume Info is now correct. Check Favorites.
      if (user?.favorites) {
        // Favorites done. Check Meta.
        if (user?.meta) {
          handleFinalRedirect();
        } else {
          setStep(Step.VIEW_7);
        }
      } else {
        // Favorites not done. Go to 6.
        setStep(Step.VIEW_6);
      }
      return;
    }

    // From View 6 (Interests) -> Next is 7
    if (step === Step.VIEW_6) {
      // Assume Info & Favorites now correct. Check Meta.
      if (user?.meta) {
        handleFinalRedirect();
      } else {
        setStep(Step.VIEW_7);
      }
      return;
    }

    // From View 7 (Experience) -> Next is Final
    if (step === Step.VIEW_7) {
      handleFinalRedirect();
      return;
    }
  };

  // --- Redirect Effect ---
  React.useEffect(() => {
    if (step === Step.FINAL || step === Step.VIEW_8) {
      handleFinalRedirect();
    }
  }, [handleFinalRedirect, step]);

  // Simple Router based on Step
  switch (step) {
    case Step.LOADING:
      return (
        <div className="flex w-full h-full items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      );

    case Step.INTRO_1:
      return <LoginView onNext={() => setStep(Step.INTRO_2)} />;
    case Step.INTRO_2:
      return (
        <LoginView2 onNext={() => setStep(Step.INTRO_3)} onBack={() => setStep(Step.INTRO_1)} />
      );
    case Step.INTRO_3:
      return (
        <LoginView3 onNext={() => setStep(Step.INTRO_3_5)} onBack={() => setStep(Step.INTRO_2)} />
      );
    case Step.INTRO_3_5:
      return (
        <LoginView35
          onNext={() => setStep(Step.LOGIN_LANDING)}
          onBack={() => setStep(Step.INTRO_3)}
        />
      );

    case Step.LOGIN_LANDING:
      return (
        <Login onNext={() => setStep(Step.LOGIN_FORM)} onBack={() => setStep(Step.INTRO_3_5)} />
      );

    case Step.LOGIN_FORM:
      return (
        <LogInForm
          onNext={() =>
            role === 'manager' ? setStep(Step.MANAGER_INFO) : setStep(Step.NATIONAL_ID)
          }
          onExistingUser={handleLoginSuccess}
          onBack={() => setStep(Step.LOGIN_LANDING)}
          onCustomerRegister={(ph) => {
            setPhone(ph);
            setStep(Step.CUSTOMER_REGISTER);
          }}
          onCustomerLogin={(ph) => {
            setPhone(ph);
            setStep(Step.CUSTOMER_LOGIN);
          }}
        />
      );

    // Student Post-Login
    case Step.NATIONAL_ID:
      return (
        <LoginViewNationalID
          onNext={(u) => handleNationalIdNext(u)}
          onBack={() => setStep(Step.LOGIN_FORM)}
        />
      );

    case Step.VIEW_REPORT:
      return (
        <LoginView5
          onNext={handleSequentialNext}
          onReport={() => setStep(Step.REPORT_DETAILS)}
          onBack={() => setStep(Step.NATIONAL_ID)}
        />
      );

    case Step.REPORT_DETAILS:
      return (
        <LoginViewReport
          onNext={handleSequentialNext}
          onLoginAgain={() => setStep(Step.LOGIN_FORM)}
          onBack={() => setStep(Step.VIEW_REPORT)}
        />
      );

    case Step.VIEW_6:
      return <LoginView6 onNext={handleSequentialNext} onBack={() => setStep(Step.VIEW_REPORT)} />;

    case Step.VIEW_7:
      return <LoginView7 onNext={handleSequentialNext} onBack={() => setStep(Step.VIEW_6)} />;

    // Using VIEW_8 / FINAL for any manual redirects if needed, but logic handles it.
    case Step.VIEW_8:
    case Step.FINAL:
      // Redirect handled by useEffect
      return (
        <div className="flex w-full h-full items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      );

    case Step.MANAGER_INFO:
      return (
        <LoginViewManagerInfo
          onNext={() => router.push('/SchoolPanel')}
          onReport={() => setStep(Step.MANAGER_REPORT)}
        />
      );

    case Step.MANAGER_REPORT:
      return (
        <LoginViewManagerReport
          onLoginAgain={() => setStep(Step.MANAGER_INFO)}
          onNext={() => setStep(Step.MANAGER_INFO)}
        />
      );

    case Step.CUSTOMER_REGISTER:
      return (
        <LoginViewCustomerRegister phone={phone} onNext={() => setStep(Step.CUSTOMER_LOGIN)} />
      );

    case Step.CUSTOMER_LOGIN:
      return <LoginViewCustomerLogin phone={phone} onBack={() => setStep(Step.LOGIN_LANDING)} />;

    default:
      return <LoginView onNext={() => setStep(Step.INTRO_1)} />;
  }
}

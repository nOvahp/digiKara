'use client';

import React, { createContext, useContext, useState } from 'react';
import { authService, UserData } from '../services/authService';
import { getToken, removeToken } from '../services/tokenService';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
  token: string | null;
  requestOtp: (
    phoneNumber: string,
  ) => Promise<{ success: boolean; message?: string; status?: number }>;
  verifyOtp: (
    phoneNumber: string,
    code: string,
  ) => Promise<{
    success: boolean;
    message?: string;
    user?: UserData | null;
    token?: string;
  }>;
  verifyNationalId: (
    nationalId: string,
  ) => Promise<{ success: boolean; user?: UserData; message?: string }>;
  signIn: (
    phoneNumber: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  registerCustomer: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
  loginCustomer: (data: {
    phone: string;
    password: string;
  }) => Promise<{ success: boolean; token?: string; message?: string }>;
  logoutCustomer: () => Promise<{ success: boolean; message?: string }>;
  reportIssue: (data: Record<string, unknown>) => Promise<{ success: boolean; message?: string }>;
  saveStudentData: (data: {
    meta: unknown;
    training_course: boolean;
  }) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
  role: 'student' | 'manager' | 'customer' | null;
  setRole: (role: 'student' | 'manager' | 'customer') => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Lazy initialize state to avoid set-state-in-effect and double render
  // Initialize state with server-safe defaults (no window/localStorage access)
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<'student' | 'manager' | 'customer' | null>('student');

  // Hydrate state from localStorage on client mount
  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // Hydrate Token
        const storedToken = getToken();
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
        }

        // Hydrate User Data
        const storedUser = localStorage.getItem('user_data');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error('AuthProvider hydration error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestOtp = async (phoneNumber: string) => {
    return await authService.requestOtp(phoneNumber, role || 'student');
  };

  const verifyOtp = async (phoneNumber: string, code: string) => {
    const result = await authService.verifyOtp(phoneNumber, code, role || 'student');

    if (result.success) {
      const userData = result.user || null;

      // Ensure local state is updated
      setUser(userData);
      if (result.token) {
        setToken(result.token);
        console.log('🔐 [AuthProvider] Token Received:', result.token);
        setIsAuthenticated(true);
      }

      return {
        success: result.success,
        message: result.message,
        user: userData,
        token: result.token,
      };
    }

    return { success: result.success, message: result.message };
  };

  const verifyNationalId = async (nationalId: string) => {
    const result = await authService.verifyNationalId(nationalId);

    if (result.success && result.user) {
      setUser(result.user);
      return { success: true, user: result.user };
    }

    return { success: false, message: result.message };
  };

  const signIn = async (phoneNumber: string, password: string) => {
    const result = await authService.login(phoneNumber, password);

    if (result.success && result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      // If login endpoint returns user data, set it here. Otherwise, you might need a separate /me call.
    }

    return { success: result.success, message: result.message };
  };

  const registerCustomer = async (formData: FormData) => {
    return await authService.registerCustomer(formData);
  };

  const loginCustomer = async (data: { phone: string; password: string }) => {
    const result = await authService.loginCustomer(data);
    if (result.success && result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
    }
    return result;
  };

  const reportIssue = async (data: Record<string, unknown>) => {
    return await authService.reportIssue(data);
  };

  const saveStudentData = async (data: { meta: unknown; training_course: boolean }) => {
    return await authService.saveStudentData(data);
  };

  const signOut = async () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    removeToken();
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    token,
    role,
    setRole,
    requestOtp,
    verifyOtp,
    verifyNationalId,
    signIn,
    registerCustomer,
    loginCustomer,
    reportIssue,
    saveStudentData,
    signOut,
    logoutCustomer: async () => {
      const result = await authService.logoutCustomer();
      if (result.success) {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        removeToken();
      }
      return result;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

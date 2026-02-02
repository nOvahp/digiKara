"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authService, UserData } from "../services/authService";
import { getToken, saveToken, removeToken } from "../services/tokenService";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
  token: string | null;
  requestOtp: (phoneNumber: string) => Promise<{ success: boolean; message?: string }>;
  verifyOtp: (phoneNumber: string, code: string) => Promise<{ success: boolean; message?: string; user?: UserData | null; token?: string }>;
  verifyNationalId: (nationalId: string) => Promise<{ success: boolean; message?: string }>;
  signIn: (phoneNumber: string, password: string) => Promise<{ success: boolean; message?: string }>;
  reportIssue: (data: any) => Promise<{ success: boolean; message?: string }>;
  saveStudentData: (data: { meta: any; training_course: boolean }) => Promise<{ success: boolean; message?: string }>;
    signOut: () => Promise<void>;
    role: 'student' | 'manager' | null;
    setRole: (role: 'student' | 'manager') => void;
  };
  
  const AuthContext = createContext<AuthContextType | null>(null);
  
  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<'student' | 'manager' | null>('student'); // Default to student
  
    useEffect(() => {
      // Check for token on mount
      const storedToken = getToken();
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        // Optional: Fetch user profile here if token exists but user data is missing
      }
      setIsLoading(false);
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
          console.log("🔐 [AuthProvider] Token Received:", result.token);
          setIsAuthenticated(true);
        }
        
        return { success: result.success, message: result.message, user: userData, token: result.token };
      }
  
      return { success: result.success, message: result.message };
    };
  
    const verifyNationalId = async (nationalId: string) => {
      const result = await authService.verifyNationalId(nationalId);
  
      if (result.success && result.user) {
        setUser(result.user);
        return { success: true };
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
  
    const reportIssue = async (data: any) => {
      return await authService.reportIssue(data);
    };
  
    const saveStudentData = async (data: { meta: any; training_course: boolean }) => {
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
      reportIssue,
      saveStudentData,
      signOut,
    };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

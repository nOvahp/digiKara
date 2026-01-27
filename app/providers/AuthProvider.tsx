"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authService, getToken, saveToken, removeToken } from "../services/authService";

interface UserData {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  national_code: string | null;
  meta: any | null;
  phone: string;
  school: string | null;
  field: string | null;
  province: string | null;
  city: string | null;
  district: string | null;
  grade: string | null;
}
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
  token: string | null;
  requestOtp: (
    phoneNumber: string,
  ) => Promise<{ success: boolean; message?: string }>;
  verifyOtp: (
    phoneNumber: string,
    code: string,
  ) => Promise<{ success: boolean; message?: string }>;
  signIn: (
    phoneNumber: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const requestOtp = async (
    phoneNumber: string,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const result = await authService.requestOtp(phoneNumber);
      return result;
    } catch (error) {
      console.error("Request OTP error:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  };

  const verifyOtp = async (
    phoneNumber: string,
    code: string,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const result = await authService.verifyOtp(phoneNumber, code);

      if (result.success) {
        // Transform API user data to expected format
        const transformedUser: UserData | null = result.user ? {
          id: result.user.id,
          name: `${result.user.firstname} ${result.user.lastname}`,
          firstname: result.user.firstname,
          lastname: result.user.lastname,
          national_code: result.user.national_code,
          meta: result.user.meta,
          phone: result.user.phone,
          school: result.user.school || '',
          city: result.user.city || '', 
          field: result.user.field || '',
          grade: result.user.grade || '',
          district: result.user.district || '',
          province: result.user.province || '',
        } : null;

        setToken(result.token || null);
        setUser(transformedUser);
        setIsAuthenticated(true);

        if (result.token) {
          saveToken(result.token);
        }

        return { success: true };
      } else {
        return {
          success: false,
          message: result.message || "OTP verification failed",
        };
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  };

  const signIn = async (
    phoneNumber: string,
    password: string,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const result = await authService.login(phoneNumber, password);

      if (result.success) {
        setToken(result.token || null);
        setIsAuthenticated(true);
        if (result.token) {
          saveToken(result.token);
        }
        return { success: true };
      } else {
        return { success: false, message: result.message || "Login failed" };
      }
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  };

  const signOut = async () => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      removeToken();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    token,
    requestOtp,
    verifyOtp,
    signIn,
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

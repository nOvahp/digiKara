import axios from 'axios';
import apiClient from '../common/apiClient';
import { saveToken } from '../auth/tokenService';
import { UserData, ApiResponse, UserSchema } from '../common/schemas';

const USE_MOCK_BACKEND = process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === 'true';

// --- Interfaces ---

interface RequestOtpPayload {
  phone: string;
}

interface RequestOtpResponseData {
  status: number; // 1=New, 2=Student/Manager, 3=Existing
}

interface VerifyOtpPayload {
  phone: string;
  code: string;
}

interface VerifyOtpResponseData {
  user: UserData;
  token: string;
}

interface LoginPayload {
  phone_number: string;
  password: string;
}

// Login response structure based on usage: could be { access_token: ... } or { token: ... }
interface LoginResponse {
  access_token?: string;
  token?: string;
  message?: string;
  status?: string;
}

interface CustomerRegisterResponse {
  status?: string;
  code?: number;
  message?: string;
}

interface CustomerLoginPayload {
  phone: string;
  password: string;
  password_confirmation: string;
}

// Customer login response: observed potential nesting in original code
interface CustomerLoginResponse {
  data?: {
    token?: string;
  };
  access_token?: string;
  token?: string;
  message?: string;
  status?: string;
}

interface LogoutResponse {
  status?: string;
  code?: number;
  message?: string;
}

// --- Service ---

export const authService = {
  requestOtp: async (
    phone: string,
    role: 'student' | 'manager' | 'customer' = 'student',
  ): Promise<{ success: boolean; message?: string; status?: number }> => {
    // Mock backend logic for dev
    if (USE_MOCK_BACKEND) {
      try {
        const { mockAuthService } = await import('../mockAuthService');
        // Standardize mock response type if possible or cast
        const res = (await mockAuthService.requestOtp(phone)) as {
          success: boolean;
          message?: string;
          status?: number;
        };
        return { ...res, status: Number(res.status || 0) };
      } catch (e) {
        console.warn('Mock service not found');
      }
    }

    const endpoint =
      role === 'manager'
        ? '/manager/otp'
        : role === 'customer'
          ? '/customers/otp'
          : '/students/otp';

    try {
      const response = await apiClient.post<ApiResponse<RequestOtpResponseData>>(endpoint, {
        phone: String(phone),
      } as RequestOtpPayload);

      if (response.status === 'success' || response.code === 200) {
        return {
          success: true,
          message: response.message || 'کد تایید ارسال شد',
          status: response.data?.status,
        };
      }

      return { success: false, message: response.message || 'خطا در ارسال کد' };
    } catch (error: unknown) {
      let message = 'خطای شبکه';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      return { success: false, message };
    }
  },

  verifyOtp: async (
    phone: string,
    code: string,
    role: 'student' | 'manager' | 'customer' = 'student',
  ): Promise<{
    success: boolean;
    token?: string;
    user?: UserData;
    message?: string;
  }> => {
    if (USE_MOCK_BACKEND) {
      try {
        const { mockAuthService } = await import('../mockAuthService');
        return mockAuthService.verifyOtp(phone, code) as Promise<{
          success: boolean;
          token?: string;
          user?: UserData;
          message?: string;
        }>;
      } catch (e) {
        console.warn('Mock service not found');
      }
    }

    const endpoint =
      role === 'manager'
        ? '/manager/otp/check'
        : role === 'customer'
          ? '/customers/otp/check'
          : '/students/otp/check';

    try {
      const response = await apiClient.post<ApiResponse<VerifyOtpResponseData>>(endpoint, {
        phone: String(phone),
        code: String(code),
      } as VerifyOtpPayload);

      if (response.status === 'success' || response.code === 200) {
        const { token, user } = response.data;

        let validUser = user;

        // Validate User Data (Add robustness)
        if (role === 'student') {
          const parsedUser = UserSchema.safeParse(user);
          validUser = parsedUser.success ? (parsedUser.data as UserData) : user;
        }

        if (token) {
          saveToken(token);
        }

        return {
          success: true,
          token,
          user: validUser,
        };
      }

      return {
        success: false,
        message: response.message || 'کد تایید اشتباه است',
      };
    } catch (error: unknown) {
      let message = 'خطای غیرمنتظره';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      return { success: false, message };
    }
  },

  login: async (
    phoneNumber: string,
    password: string,
  ): Promise<{ success: boolean; token?: string; message?: string }> => {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        phone_number: String(phoneNumber),
        password: password,
      } as LoginPayload);

      if (response && (response.access_token || response.token)) {
        const token = response.access_token || response.token;
        if (token) {
          saveToken(token);
          return { success: true, token };
        }
      }
      return {
        success: false,
        message: response.message || 'نام کاربری یا رمز عبور اشتباه است',
      };
    } catch (error: unknown) {
      let message = 'Login failed';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      }
      return { success: false, message };
    }
  },

  registerCustomer: async (formData: FormData): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<CustomerRegisterResponse>(
        '/customers/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message || 'Register failed' };
    } catch (error: unknown) {
      let message = 'Register failed';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      }
      return { success: false, message };
    }
  },

  loginCustomer: async (data: {
    phone: string;
    password: string;
  }): Promise<{ success: boolean; token?: string; message?: string }> => {
    try {
      const payload: CustomerLoginPayload = {
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password,
      };

      const response = await apiClient.post<CustomerLoginResponse>('/customers/login', payload);

      if (response && (response.data?.token || response.access_token || response.token)) {
        const token = response.data?.token || response.access_token || response.token;
        if (token) {
          saveToken(token);
          return { success: true, token };
        }
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (error: unknown) {
      let message = 'Login failed';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      }
      return { success: false, message };
    }
  },

  logoutCustomer: async (): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<LogoutResponse>('/customers/logout', {});
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message || 'Logout failed' };
    } catch (error: unknown) {
      let message = 'Logout failed';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message };
    }
  },

  verifyNationalId: async (
    nationalId: string,
  ): Promise<{ success: boolean; user?: UserData; message?: string }> => {
    try {
      // Reusing the endpoint logic from studentService for consistency
      const response = await apiClient.post<ApiResponse<UserData>>(
        '/student/users/check/national_code',
        {
          national_code: nationalId,
        },
      );

      if (response.status === 'success' || response.code === 200) {
        const resData = response.data as unknown as Record<string, unknown>;
        const toBool = (val: unknown) => val === true || val === 'true' || val === 1;

        const user: UserData = {
          ...response.data,
          is_info_correct: toBool(resData.is_info_correct),
          favorites: toBool(resData.favorites),
          meta: toBool(resData.meta),
        };
        return { success: true, user };
      }

      return { success: false, message: response.message || 'خطا در بررسی کد ملی' };
    } catch (error: unknown) {
      let message = 'خطای شبکه';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      return { success: false, message };
    }
  },
};

import axios from 'axios';
import apiClient from '../common/apiClient';
import { saveToken } from '../auth/tokenService';
import { UserData, ApiResponse, UserSchema } from '../common/schemas';

const USE_MOCK_BACKEND = process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === 'true';

// ─── Persian error translation ────────────────────────────────────────────────
// Maps English backend/Laravel validation messages to Persian equivalents.
const englishToPersian: Record<string, string> = {
  // Birthday / date
  'must be a valid date': 'تاریخ تولد وارد شده معتبر نیست',
  'birthday field is required': 'وارد کردن تاریخ تولد الزامی است',
  'birthday': 'تاریخ تولد وارد شده معتبر نیست',
  // Name
  'firstname field is required': 'وارد کردن نام الزامی است',
  'lastname field is required': 'وارد کردن نام خانوادگی الزامی است',
  // Phone
  'phone has already been taken': 'این شماره موبایل قبلاً ثبت شده است',
  'phone field is required': 'شماره موبایل الزامی است',
  'the phone': 'شماره موبایل وارد شده معتبر نیست',
  // Password
  'password field is required': 'وارد کردن رمز عبور الزامی است',
  'password confirmation does not match': 'تکرار رمز عبور با رمز عبور مطابقت ندارد',
  'password must be at least': 'رمز عبور باید حداقل ۸ کاراکتر باشد',
  // Gender
  'gender field is required': 'انتخاب جنسیت الزامی است',
  // Generic
  'the given data was invalid': 'اطلاعات وارد شده معتبر نیست',
  'unauthenticated': 'لطفاً دوباره وارد شوید',
  'server error': 'خطای سرور، لطفاً دوباره تلاش کنید',
  'network error': 'خطا در ارتباط با سرور، اینترنت خود را بررسی کنید',
  'register failed': 'ثبت‌نام با خطا مواجه شد',
  'login failed': 'ورود با خطا مواجه شد',
};

function translateApiError(message: string, errorsObj?: Record<string, string[]>): string {
  // If backend sends field-level errors object, flatten and translate the first one
  if (errorsObj && typeof errorsObj === 'object') {
    const firstField = Object.keys(errorsObj)[0];
    if (firstField) {
      const firstMsg = errorsObj[firstField][0] || '';
      const translated = translateSingleMessage(firstMsg);
      if (translated !== firstMsg) return translated;
    }
  }
  return translateSingleMessage(message);
}

function translateSingleMessage(message: string): string {
  const lower = message.toLowerCase();
  for (const [key, persian] of Object.entries(englishToPersian)) {
    if (lower.includes(key.toLowerCase())) return persian;
  }
  // If already Persian (contains Persian chars), return as-is
  if (/[\u0600-\u06FF]/.test(message)) return message;
  return 'خطایی رخ داده است، لطفاً دوباره تلاش کنید';
}
// ─────────────────────────────────────────────────────────────────────────────


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
      } catch {
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
    } catch (error: any) {
      // apiClient already formats the error as { success: false, message: ... }
      // We just need to return it, or extract the message if it's not in that format.
      return {
        success: false,
        message: error.message || 'خطای نامشخص',
      };
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
      } catch {
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
        const token = response.data?.token ?? undefined;
        const user = response.data?.user ?? undefined;

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
        message: response.message,
      };
    } catch (error: any) {
      // apiClient should have rejected with a structured object { success, message, ... }
      // but just in case, we fallback to extracting message from error object
      const msg = error?.message || (error instanceof Error ? error.message : 'خطای نامشخص');
      return {
        success: false,
        message: msg,
      };
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
      return { success: false, message: translateApiError(response.message || 'register failed') };
    } catch (error: unknown) {
      let rawMessage = 'register failed';
      let errorsObj: Record<string, string[]> | undefined;
      if (axios.isAxiosError(error)) {
        rawMessage = error.response?.data?.message || error.message || rawMessage;
        errorsObj = error.response?.data?.errors;
      }
      return { success: false, message: translateApiError(rawMessage, errorsObj) };
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

  sendCustomerSms: async (phone: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<{ status?: string; code?: number; message?: string }>(
        '/customers/send-sms',
        { phone: String(phone) },
      );
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message || 'خطا در ارسال پیامک' };
    } catch (error: unknown) {
      let message = 'خطا در ارسال پیامک';
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

  verifyManagerNationalId: async (
    nationalId: string,
  ): Promise<{ success: boolean; user?: UserData; message?: string }> => {
    try {
      const response = await apiClient.post<ApiResponse<UserData>>(
        '/manager/users/check/national_code',
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
      if (error && typeof error === 'object' && 'message' in error) {
        // apiClient interceptor rejects with a plain object { success, message, ... }
        message = (error as { message: string }).message || message;
      } else if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      return { success: false, message };
    }
  },
};

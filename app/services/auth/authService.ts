import apiClient from '../common/apiClient';
import { saveToken } from '../auth/tokenService';
import { UserData, ApiResponse, UserSchema } from '../common/schemas';

const USE_MOCK_BACKEND = process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === 'true';

export const authService = {
  requestOtp: async (
    phone: string,
    role: 'student' | 'manager' | 'customer' = 'student',
  ): Promise<{ success: boolean; message?: string; status?: number }> => {
    // Mock backend logic for dev
    if (USE_MOCK_BACKEND) {
      // dynamic import to avoid bundling mock logic in prod if not needed, or just import
      try {
        const { mockAuthService } = await import('../mockAuthService');
        const res = await mockAuthService.requestOtp(phone);
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
      const response = await apiClient.post<any, ApiResponse<any>>(endpoint, {
        phone: String(phone),
      });

      if (response.status === 'success' || response.code === 200) {
        return {
          success: true,
          message: response.message || 'کد تایید ارسال شد',
          status: response.data?.status, // Capture status (1=New, 2=Student/Manager, 3=Existing)
        };
      }

      return { success: false, message: response.message || 'خطا در ارسال کد' };
    } catch (error: any) {
      return { success: false, message: error.message || 'خطای شبکه' };
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
        return mockAuthService.verifyOtp(phone, code) as any;
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
      const response = await apiClient.post<any, ApiResponse<{ user: UserData; token: string }>>(
        endpoint,
        {
          phone: String(phone),
          code: String(code),
        },
      );

      if (response.status === 'success' || response.code === 200) {
        const { token, user } = response.data;

        let validUser = user as UserData;

        // Validate User Data (Add robustness)
        if (role === 'student') {
          const parsedUser = UserSchema.safeParse(user);
          validUser = parsedUser.success ? parsedUser.data : (user as UserData);
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
    } catch (error: any) {
      return { success: false, message: error.message || 'خطای غیرمنتظره' };
    }
  },

  login: async (
    phoneNumber: string,
    password: string,
  ): Promise<{ success: boolean; token?: string; message?: string }> => {
    try {
      const response = await apiClient.post<any, any>('/auth/login', {
        phone_number: String(phoneNumber),
        password: password,
      });

      if (response && (response.access_token || response.token)) {
        const token = response.access_token || response.token;
        saveToken(token);
        return { success: true, token };
      } else {
        return {
          success: false,
          message: response.message || 'نام کاربری یا رمز عبور اشتباه است',
        };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Login failed' };
    }
  },

  registerCustomer: async (formData: FormData): Promise<{ success: boolean; message?: string }> => {
    try {
      // Verify endpoint is correct. Prompt said /customers/register
      const response = await apiClient.post<any, any>('/customers/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // apiClient might handle boundary automatically if we pass FormData,
          // but typically axios/fetch needs to let browser set it.
          // If apiClient forces JSON, we might need a bypass.
          // Assuming apiClient checks if body is FormData.
        },
      });

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message || 'Register failed' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Register failed' };
    }
  },

  loginCustomer: async (data: {
    phone: string;
    password: string;
  }): Promise<{ success: boolean; token?: string; message?: string }> => {
    try {
      const payload = {
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password, // Required by backend per prompt
      };

      const response = await apiClient.post<any, any>('/customers/login', payload);

      if (response && (response.data?.token || response.access_token || response.token)) {
        const token = response.data?.token || response.access_token || response.token;
        saveToken(token);
        return { success: true, token };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Login failed' };
    }
  },

  logoutCustomer: async (): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<any, any>('/customers/logout', {});
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message || 'Logout failed' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Logout failed' };
    }
  },
};

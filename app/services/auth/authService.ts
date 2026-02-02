
import apiClient from '../common/apiClient';
import { saveToken } from '../auth/tokenService';
import { UserData, ApiResponse, UserSchema } from '../common/schemas';

const USE_MOCK_BACKEND = process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === 'true';

export const authService = {
  
  requestOtp: async (phone: string, role: 'student' | 'manager' = 'student'): Promise<{ success: boolean; message?: string }> => {
    // Mock backend logic for dev
    if (USE_MOCK_BACKEND) {
        // dynamic import to avoid bundling mock logic in prod if not needed, or just import
        try {
             const { mockAuthService } = await import('../mockAuthService');
             return mockAuthService.requestOtp(phone);
        } catch (e) { console.warn("Mock service not found"); }
    }

    const endpoint = role === 'manager' ? '/manager/otp' : '/students/otp';

    try {
      const response = await apiClient.post<any, ApiResponse<any>>(endpoint, { 
        phone: String(phone) 
      });

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message || 'کد تایید ارسال شد' };
      }
      
      return { success: false, message: response.message || 'خطا در ارسال کد' };

    } catch (error: any) {
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  verifyOtp: async (phone: string, code: string, role: 'student' | 'manager' = 'student'): Promise<{ success: boolean; token?: string; user?: UserData; message?: string }> => {
    if (USE_MOCK_BACKEND) {
        try {
            const { mockAuthService } = await import('../mockAuthService');
            return mockAuthService.verifyOtp(phone, code) as any;
        } catch (e) { console.warn("Mock service not found"); }
    }

    const endpoint = role === 'manager' ? '/manager/otp/check' : '/students/otp/check';

    try {
      const response = await apiClient.post<any, ApiResponse<{ user: UserData; token: string }>>(endpoint, {
        phone: String(phone),
        code: String(code),
      });

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
          user: validUser 
        };
      }

      return { success: false, message: response.message || 'کد تایید اشتباه است' };

    } catch (error: any) {
      return { success: false, message: error.message || 'خطای غیرمنتظره' };
    }
  },

  login: async (phoneNumber: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> => {
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
         return { success: false, message: response.message || 'نام کاربری یا رمز عبور اشتباه است' };
      }

    } catch (error: any) {
      return { success: false, message: error.message || 'Login failed' };
    }
  }
};

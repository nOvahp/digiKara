import apiClient from './apiClient';
import { z } from 'zod';
import { saveToken } from './tokenService';

// Use environment variable or constant for testing
const USE_MOCK_BACKEND = process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === 'true';

// --- Zod Schemas for Type Safety ---

// --- Zod Schemas for Type Safety ---

const UserSchema = z.object({
  id: z.number(),
  firstname: z.string().nullable().optional(),
  lastname: z.string().nullable().optional(),
  national_code: z.string().nullable().optional(),
  phone: z.string(),
  school: z.string().nullable().optional(),
  field: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  district: z.string().nullable().optional(),
  grade: z.string().nullable().optional(),
  meta: z.any().optional(),
});

export type UserData = z.infer<typeof UserSchema>;

// --- API Service ---

// Since we updated apiClient to return `response.data` directly, 
// we need to match the backend structure based on what it actually returns.
// Assuming standard structure: { code: 200, status: 'success', message: '...', data: ... }

interface ApiResponse<T> {
  code?: number;
  status?: string;
  message?: string;
  data: T;
}

export const authService = {

  requestOtp: async (phone: string): Promise<{ success: boolean; message?: string }> => {
    if (USE_MOCK_BACKEND) {
        // Fallback or Mock logic here if strictly needed, 
        // but for Professional use we assume the API is the source of truth.
        // Importing mockAuthService dynamically to avoid bloat if possible, or just skip it.
        const { mockAuthService } = await import('./mockAuthService');
        return mockAuthService.requestOtp(phone);
    }

    try {
      const response = await apiClient.post<any, ApiResponse<any>>('/otp', { 
        phone: String(phone) 
      });

      // Axios interceptor returns response.data, so 'response' here IS the body.
      // Check logical success (API dependent, standard is often code 200)
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message || 'کد تایید ارسال شد' };
      }
      
      return { success: false, message: response.message || 'خطا در ارسال کد' };

    } catch (error: any) {
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  verifyOtp: async (phone: string, code: string): Promise<{ success: boolean; token?: string; user?: UserData; message?: string }> => {
    if (USE_MOCK_BACKEND) {
        const { mockAuthService } = await import('./mockAuthService');
        return mockAuthService.verifyOtp(phone, code) as any;
    }

    try {
      const response = await apiClient.post<any, ApiResponse<{ user: UserData; token: string }>>('/otp/check', {
        phone: String(phone),
        code: String(code),
      });

      if (response.status === 'success' || response.code === 200) {
        const { token, user } = response.data;
        
        // Validate User Data (Add robustness)
        const parsedUser = UserSchema.safeParse(user);
        const validUser = parsedUser.success ? parsedUser.data : (user as UserData); // Fallback if schema doesn't perfectly match but we want to proceed

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

      // Adjust based on your specific Login API response structure
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
  },
};

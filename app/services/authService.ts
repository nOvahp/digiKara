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

interface AddFavoritesPayload {
  favorite_student_ids: number[];
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

  verifyNationalId: async (nationalCode: string): Promise<{ success: boolean; user?: UserData; message?: string }> => {
    try {
      const response = await apiClient.post<any, ApiResponse<UserData>>('/student/users/check/national_code', {
        national_code: nationalCode
      });

      if (response.status === 'success' || response.code === 200) {
        return { success: true, user: response.data };
      }
      
      return { success: false, message: response.message || 'خطا در تایید کد ملی' };
    } catch (error: any) {
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  getInterests: async (): Promise<{ success: boolean; data?: any[]; message?: string }> => {
    try {
      const response = await apiClient.get<any, ApiResponse<any[]>>('/student/students/favorites/list');

      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return { success: false, message: response.message || 'خطا در دریافت لیست علاقه مندی ها' };
    } catch (error: any) {
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  confirmInfo: async (): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<any, any>('/student/students/correct_info');

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'اطلاعات با موفقیت تایید شد' };
      }
      return { success: false, message: response.message || 'خطا در تایید اطلاعات' };
    } catch (error: any) {
      console.error("confirmInfo Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  addFavorites: async (favorites: number[]): Promise<{ success: boolean; message?: string }> => {
    // Runtime Guard: Ensure favorites is an array
    if (!Array.isArray(favorites)) {
      console.error("addFavorites Error: Input must be an array");
      return { success: false, message: 'Invalid data format' };
    }

    const payload: AddFavoritesPayload = {
      favorite_student_ids: favorites
    };

    console.log("🚀 [AuthService] Sending favorites:", payload);

    try {
      const response = await apiClient.post<any, any>('/student/students/add/favorite', payload);

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'علاقه مندی ها با موفقیت ثبت شد' };
      }
      return { success: false, message: response.message || 'خطا در ثبت علاقه مندی ها' };
    } catch (error: any) {
      console.error("addFavorites Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
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

  reportIssue: async (data: any): Promise<{ success: boolean; message?: string }> => {
    try {
       const response = await apiClient.post<any, any>('/report/issue', data);
       
       if (response.status === 'success' || response.code === 200) {
         return { success: true, message: 'گزارش با موفقیت ارسال شد' };
       }
       return { success: false, message: response.message || 'خطا در ارسال گزارش' };
    } catch (error: any) {
      console.error("Report issue error", error);
      return { success: false, message: 'خطا در برقراری ارتباط با سرور' };
    }
  },

  changeStudentInfo: async (data: any): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<any, any>('/student/students/change_info/student', data);

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message || 'درخواست ویرایش اطلاعات با موفقیت ثبت شد' };
      }
      return { success: false, message: response.message || 'خطا در ویرایش اطلاعات' };
    } catch (error: any) {
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  saveStudentData: async (data: { meta: any; training_course: boolean }): Promise<{ success: boolean; message?: string }> => {
    console.log("🚀 [AuthService] Sending student data:", data);
    try {
      const response = await apiClient.post<any, any>('/student/students/complete/data', data);
      
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'اطلاعات با موفقیت ثبت شد' };
      }
      return { success: false, message: response.message || 'خطا در ثبت اطلاعات' };
      
    } catch (error: any) {
      console.error("Save student data error:", error);
      return { success: false, message: error.message || 'خطا در برقراری ارتباط با سرور' };
    }
  }
};

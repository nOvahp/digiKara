import apiClient from './apiClient';
import { saveToken } from './tokenService';
import { UserData, ApiResponse, UserSchema } from './schemas';

// Re-export services for backward compatibility or ease of use
export * from './studentService';
export * from './reportService';
export * from './schemas';

const USE_MOCK_BACKEND = process.env.NEXT_PUBLIC_USE_MOCK_BACKEND === 'true';

export const authService = {
  
  requestOtp: async (phone: string, role: 'student' | 'manager' = 'student'): Promise<{ success: boolean; message?: string }> => {
    if (USE_MOCK_BACKEND) {
        const { mockAuthService } = await import('./mockAuthService');
        return mockAuthService.requestOtp(phone);
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
        const { mockAuthService } = await import('./mockAuthService');
        return mockAuthService.verifyOtp(phone, code) as any;
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
        
        // Validate User Data (Add robustness) - Only for students for now as manager schema might differ
        // Or if schemas share structure, we can validate both.
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
  },
  
  // -- DEPRECATED / PROXY METHODS --
  // These are kept to avoid breaking old imports immediately, but should be migrated.
  // In a full refactor, we would remove these and update consumers to use `studentService`.

  async verifyNationalId(nationalCode: string) {
      const { studentService } = await import('./studentService');
      return studentService.verifyNationalId(nationalCode);
  },

  async getInterests() {
      const { studentService } = await import('./studentService');
      return studentService.getInterests();
  },

  async confirmInfo() {
      const { studentService } = await import('./studentService');
      return studentService.confirmInfo();
  },

  async addFavorites(favorites: number[]) {
      const { studentService } = await import('./studentService');
      return studentService.addFavorites(favorites);
  },
  
  async reportIssue(data: any) {
      const { reportService } = await import('./reportService');
      return reportService.reportIssue(data);
  },

  async changeStudentInfo(data: any) {
       const { studentService } = await import('./studentService');
       return studentService.changeStudentInfo(data);
  },

  async saveStudentData(data: any) {
       const { studentService } = await import('./studentService');
       return studentService.saveStudentData(data);
  }
};


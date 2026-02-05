
import apiClient from '../common/apiClient';
import { ApiResponse, UserData } from '@/app/services/common/schemas';

export interface AddFavoritesPayload {
  favorite_student_ids: number[];
}

export const studentService = {
  verifyNationalId: async (nationalCode: string): Promise<{ success: boolean; user?: UserData; message?: string }> => {
    try {
      const response = await apiClient.post<any, ApiResponse<UserData>>('/student/users/check/national_code', {
        national_code: nationalCode
      });


      if (response.status === 'success' || response.code === 200) {
        // Merge top-level flags into the user object
        // The flags are inside `data`, not the root response
        const resData = response.data as any;
        
        // Helper to normalize boolean values (handles true, "true", 1, etc)
        const toBool = (val: any) => val === true || val === "true" || val === 1;

        const userWithFlags = {
          ...response.data,
          is_info_correct: toBool(resData.is_info_correct),
          favorites: toBool(resData.favorites),
          meta: toBool(resData.meta)
        };

        // Persist user data from national code check as requested
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('user_data', JSON.stringify(userWithFlags));
                console.log("✅ User data saved to localStorage from service");
            } catch (e) {
                console.error("Failed to save user data in service", e);
            }
        }

        return { success: true, user: userWithFlags };
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
      const response = await apiClient.put<any, any>('/student/students/correct_info', {});

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
    if (!Array.isArray(favorites)) {
      console.error("addFavorites Error: Input must be an array");
      return { success: false, message: 'Invalid data format' };
    }

    const payload: AddFavoritesPayload = {
      favorite_student_ids: favorites
    };

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

  changeStudentInfo: async (data: any): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<any, any>('/student/students/change_info', data);

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message || 'درخواست ویرایش اطلاعات با موفقیت ثبت شد' };
      }
      return { success: false, message: response.message || 'خطا در ویرایش اطلاعات' };
    } catch (error: any) {
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  saveStudentData: async (data: { meta: any; training_course: boolean }): Promise<{ success: boolean; message?: string }> => {
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

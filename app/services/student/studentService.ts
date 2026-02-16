import apiClient from '../common/apiClient';
import { ApiResponse, UserData } from '@/app/services/common/schemas';

export interface AddFavoritesPayload {
  favorite_student_ids: number[];
}

export const studentService = {
  verifyNationalId: async (
    nationalCode: string,
  ): Promise<{ success: boolean; user?: UserData; message?: string }> => {
    try {
      const response = await apiClient.post<ApiResponse<UserData>>(
        '/student/users/check/national_code',
        {
          national_code: nationalCode,
        },
      );

      if (response.status === 'success' || response.code === 200) {
        // Merge top-level flags into the user object
        // The flags are inside `data`, not the root response
        const resData = response.data as unknown as Record<string, unknown>;

        // Helper to normalize boolean values (handles true, "true", 1, etc)
        const toBool = (val: unknown) => val === true || val === 'true' || val === 1;

        const userWithFlags: UserData = {
          ...response.data,
          is_info_correct: toBool(resData.is_info_correct),
          favorites: toBool(resData.favorites),
          meta: toBool(resData.meta),
        };

        // Persist user data from national code check as requested
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('user_data', JSON.stringify(userWithFlags));
            console.log('✅ User data saved to localStorage from service');
          } catch (e) {
            console.error('Failed to save user data in service', e);
          }
        }

        return { success: true, user: userWithFlags };
      }

      return {
        success: false,
        message: response.message || 'خطا در تایید کد ملی',
      };
    } catch (error: unknown) {
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  getInterests: async (): Promise<{
    success: boolean;
    data?: unknown[];
    message?: string;
  }> => {
    try {
      const response = await apiClient.get<ApiResponse<unknown[]>>(
        '/student/students/favorites/list',
      );

      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return {
        success: false,
        message: response.message || 'خطا در دریافت لیست علاقه مندی ها',
      };
    } catch (error: unknown) {
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  confirmInfo: async (): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<ApiResponse<unknown>>('/student/students/correct_info', {});

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'اطلاعات با موفقیت تایید شد' };
      }
      return {
        success: false,
        message: response.message || 'خطا در تایید اطلاعات',
      };
    } catch (error: unknown) {
      console.error('confirmInfo Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  addFavorites: async (favorites: number[]): Promise<{ success: boolean; message?: string }> => {
    if (!Array.isArray(favorites)) {
      console.error('addFavorites Error: Input must be an array');
      return { success: false, message: 'Invalid data format' };
    }

    const payload: AddFavoritesPayload = {
      favorite_student_ids: favorites,
    };

    try {
      const response = await apiClient.post<ApiResponse<unknown>>('/student/students/add/favorite', payload);

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'علاقه مندی ها با موفقیت ثبت شد' };
      }
      return {
        success: false,
        message: response.message || 'خطا در ثبت علاقه مندی ها',
      };
    } catch (error: unknown) {
      console.error('addFavorites Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  changeStudentInfo: async (data: unknown): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<ApiResponse<unknown>>('/student/students/change_info', data);

      if (response.status === 'success' || response.code === 200) {
        return {
          success: true,
          message: response.message || 'درخواست ویرایش اطلاعات با موفقیت ثبت شد',
        };
      }
      return {
        success: false,
        message: response.message || 'خطا در ویرایش اطلاعات',
      };
    } catch (error: unknown) {
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  saveStudentData: async (data: {
    meta: unknown;
    training_course: boolean;
  }): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<ApiResponse<unknown>>('/student/students/complete/data', data);

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'اطلاعات با موفقیت ثبت شد' };
      }
      return {
        success: false,
        message: response.message || 'خطا در ثبت اطلاعات',
      };
    } catch (error: unknown) {
      console.error('Save student data error:', error);
      let message = 'خطا در برقراری ارتباط با سرور';
      if (error instanceof Error) message = error.message || message;
      return {
        success: false,
        message,
      };
    }
  },
};

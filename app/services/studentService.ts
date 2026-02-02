import apiClient from './apiClient';
import { ApiResponse, UserData } from './schemas';

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

    console.log("🚀 [StudentService] Sending favorites:", payload);

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
    console.log("🚀 [StudentService] Sending student data:", data);
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
  },

  getOrders: async (): Promise<{ success: boolean; data?: any[]; message?: string }> => {
    try {
        const response = await apiClient.get<any, ApiResponse<any[]>>('/student/orders');
        
        if (response.status === 'success' || response.code === 200) {
            return { success: true, data: response.data || [] };
        }
        return { success: false, message: response.message || 'خطا در دریافت لیست سفارشات' };
    } catch (error: any) {
        console.error("getOrders Error:", error);
        return { success: false, message: error.message || 'خطای شبکه' };
    }
  }
};

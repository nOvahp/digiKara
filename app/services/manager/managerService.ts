
import apiClient from '../common/apiClient';

export const managerService = {
  confirmInfo: async (): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<any, any>('/manager/school/correct_info');

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'اطلاعات با موفقیت تایید شد' };
      }
      return { success: false, message: response.message || 'خطا در تایید اطلاعات' };
    } catch (error: any) {
      console.error("confirmInfo Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  changeManagerInfo: async (data: any): Promise<{ success: boolean; message?: string }> => {
    try {
      // Endpoint provided: /manager/managers/change_info/student
      const response = await apiClient.post<any, any>('/manager/managers/change_info/student', data);

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message || 'درخواست ویرایش اطلاعات با موفقیت ثبت شد' };
      }
      return { success: false, message: response.message || 'خطا در ویرایش اطلاعات' };
    } catch (error: any) {
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  // School Verification Methods
  confirmSchoolInfo: async (): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<any, any>('/manager/school/correct_info');

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'اطلاعات مدرسه با موفقیت تایید شد' };
      }
      return { success: false, message: response.message || 'خطا در تایید اطلاعات مدرسه' };
    } catch (error: any) {
      console.error("confirmSchoolInfo Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  reportSchoolDiscrepancy: async (data: any): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<any, any>('/manager/school/change_info', data);

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message || 'گزارش مغایرت با موفقیت ثبت شد' };
      }
      return { success: false, message: response.message || 'خطا در ثبت گزارش مغایرت' };
    } catch (error: any) {
      console.error("reportSchoolDiscrepancy Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  }
};

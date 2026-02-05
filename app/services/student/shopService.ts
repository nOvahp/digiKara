
import apiClient from '../common/apiClient';

export interface ShopCreationData {
  name: string;
  description: string;
  skill: string;
  experience: number;
  image: File;
}

export const shopService = {
  createShop: async (data: FormData): Promise<{ success: boolean; message?: string; data?: any }> => {
    try {
      const response = await apiClient.post<any, any>('/student/cells', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 'success' || response.code === 200 || response.success) {
        return { success: true, message: 'حجره با موفقیت ساخته شد', data: response.data };
      }
      return { success: false, message: response.message || 'خطا در ساخت حجره' };
    } catch (error: any) {
      console.error("Create Shop Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  }
};

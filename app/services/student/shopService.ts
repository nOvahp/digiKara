import apiClient from '../common/apiClient';

export interface ShopCreationData {
  name: string;
  description: string;
  skill: string;
  experience: number;
  image: File;
}

export const shopService = {
  createShop: async (
    data: FormData,
  ): Promise<{ success: boolean; message?: string; data?: any }> => {
    try {
      const response = await apiClient.post<any, any>('/student/cells', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 'success' || response.code === 200 || response.success) {
        return {
          success: true,
          message: 'حجره با موفقیت ساخته شد',
          data: response.data,
        };
      }
      return {
        success: false,
        message: response.message || 'خطا در ساخت حجره',
      };
    } catch (error: any) {
      console.error('Create Shop Error:', error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  getShop: async (): Promise<{
    success: boolean;
    hasShop: boolean;
    data?: any;
    message?: string;
  }> => {
    try {
      const response = await apiClient.get<any, any>('/student/cells');

      if (response.status === 'success' || response.code === 200 || response.success) {
        const data = response.data;
        const hasShop = Array.isArray(data) ? data.length > 0 : !!data;
        return { success: true, hasShop, data };
      }
      return { success: false, hasShop: false, message: response.message };
    } catch (error: any) {
      // 404 might mean no shop, or just error. Assuming 404 = no shop safely.
      if (error?.response?.status === 404) {
        return { success: true, hasShop: false };
      }
      console.error('Get Shop Error:', error);
      return {
        success: false,
        hasShop: false,
        message: error.message || 'خطای شبکه',
      };
    }
  },
};

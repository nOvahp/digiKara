import axios from 'axios';
import apiClient from '../common/apiClient';
import { ApiResponse } from '../common/schemas';

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
  ): Promise<{ success: boolean; message?: string; data?: unknown }> => {
    try {
      const response = await apiClient.post<ApiResponse<unknown>>('/student/cells', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (
        response.status === 'success' ||
        response.code === 200 ||
        (response as unknown as Record<string, unknown>).success
      ) {
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
    } catch (error: unknown) {
      console.error('Create Shop Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  getShop: async (): Promise<{
    success: boolean;
    hasShop: boolean;
    data?: unknown;
    message?: string;
  }> => {
    try {
      // API might return array or object, using unknown
      const response = await apiClient.get<ApiResponse<unknown>>('/student/cells');

      if (
        response.status === 'success' ||
        response.code === 200 ||
        (response as unknown as Record<string, unknown>).success
      ) {
        const data = response.data;
        const hasShop = Array.isArray(data) ? data.length > 0 : !!data;
        return { success: true, hasShop, data };
      }
      return { success: false, hasShop: false, message: response.message };
    } catch (error: unknown) {
      // 404 might mean no shop, or just error. Assuming 404 = no shop safely.
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return { success: true, hasShop: false };
      }
      console.error('Get Shop Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return {
        success: false,
        hasShop: false,
        message,
      };
    }
  },
};

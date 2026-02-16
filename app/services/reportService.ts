import apiClient from './apiClient';
import { ApiResponse } from './common/schemas';

export const reportService = {
  reportIssue: async (data: unknown): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<ApiResponse<unknown>>('/report/issue', data);

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'گزارش با موفقیت ارسال شد' };
      }
      return {
        success: false,
        message: response.message || 'خطا در ارسال گزارش',
      };
    } catch (error: unknown) {
      console.error('Report issue error', error);
      let message = 'خطا در برقراری ارتباط با سرور';
      if (error instanceof Error) message = error.message || message;
      return { success: false, message };
    }
  },
};

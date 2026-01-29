import apiClient from './apiClient';

export const reportService = {
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
  }
};

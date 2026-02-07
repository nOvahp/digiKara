
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
  },

  getStudentRequests: async (): Promise<{ success: boolean; data?: any[]; message?: string }> => {
    try {
      const response = await apiClient.get<any, any>('/manager/students');
      
      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return { success: false, message: response.message || 'خطا در دریافت لیست درخواست‌ها' };
    } catch (error: any) {
      console.error("getStudentRequests Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  getStudentRequestById: async (id: number): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const response = await apiClient.get<any, any>(`/manager/students/${id}`);
      
      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return { success: false, message: response.message || 'خطا در دریافت جزئیات درخواست' };
    } catch (error: any) {
      console.error("getStudentRequestById Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  approveStudentRequest: async (id: number): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<any, any>(`/manager/students/${id}`);
      
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message || 'درخواست با موفقیت تایید شد' };
      }
      return { success: false, message: response.message || 'خطا در تایید درخواست' };
    } catch (error: any) {
      console.error("approveStudentRequest Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  getManagerProducts: async (): Promise<{ success: boolean; data?: any[]; message?: string }> => {
    try {
      const response = await apiClient.get<any, any>('/manager/products');
      
      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return { success: false, message: response.message || 'خطا در دریافت لیست محصولات' };
    } catch (error: any) {
      console.error("getManagerProducts Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  getManagerProductById: async (id: number): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const response = await apiClient.get<any, any>(`/manager/products/${id}`);
      
      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return { success: false, message: response.message || 'خطا در دریافت جزئیات محصول' };
    } catch (error: any) {
      console.error("getManagerProductById Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  approveManagerProduct: async (id: number): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<any, any>(`/manager/products/${id}`);
      
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message || 'محصول با موفقیت تایید شد' };
      }
      return { success: false, message: response.message || 'خطا در تایید محصول' };
    } catch (error: any) {
      console.error("approveManagerProduct Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  // Manager Orders
  getManagerOrders: async (): Promise<{ success: boolean; data?: any[]; message?: string }> => {
    try {
      const response = await apiClient.get<any, any>('/manager/orders');
      
      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return { success: false, message: response.message || 'خطا در دریافت لیست سفارشات' };
    } catch (error: any) {
      console.error("getManagerOrders Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  getManagerOrderById: async (id: number | string): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const response = await apiClient.get<any, any>(`/manager/orders/${id}`);
      
      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return { success: false, message: response.message || 'خطا در دریافت جزئیات سفارش' };
    } catch (error: any) {
      console.error("getManagerOrderById Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  updateManagerOrder: async (id: number | string, data: any): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<any, any>(`/manager/orders/${id}`, data);
      
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: response.message || 'وضعیت سفارش با موفقیت تغییر کرد' };
      }
      return { success: false, message: response.message || 'خطا در تغییر وضعیت سفارش' };
    } catch (error: any) {
      console.error("updateManagerOrder Error:", error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  }
};

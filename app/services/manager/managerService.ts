import apiClient from '../common/apiClient';
import { ApiResponse } from '../common/schemas';

export interface Order {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  discount: number;
  is_updated: boolean;
  status: string;
  product: {
    id: number;
    title: string;
    description: string;
    image_path: string;
    category_id?: number;
    code?: string;
    inventory?: number;
    price?: number;
    // Add other fields as optional if needed
  };
}

export interface ManagerProduct {
  id: number;
  firstname?: string;
  lastname?: string;
  school_name?: string;
  approved?: boolean;
  status?: string;
  model_data?: {
    title?: string;
    description?: string;
    price?: string | number;
    inventory?: number;
    image_path?: string;
    prices?: {
      type?: number;
      title?: string;
      amount?: string | number;
    }[];
    features?: {
      visual?: { key: string; value: string }[];
      production?: { key: string; value: string }[];
      packaging?: { key: string; value: string }[];
      id?: { key: string; value: string }[];
    };
  };
  // Flat fields that might appear in oldProduct
  title?: string;
  description?: string;
  image_path?: string;
  category_id?: number | string;
  price?: number;
  inventory?: number;
  code?: string;
}

export interface ManagerProductResponsePayload extends ManagerProduct {
  newProduct?: ManagerProduct;
  oldProduct?: ManagerProduct;
}

export const managerService = {
  confirmInfo: async (): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<ApiResponse<unknown>>('/manager/school/correct_info');

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

  changeManagerInfo: async (data: unknown): Promise<{ success: boolean; message?: string }> => {
    try {
      // Endpoint provided: /manager/managers/change_info/student
      const response = await apiClient.post<ApiResponse<unknown>>(
        '/manager/managers/change_info/student',
        data,
      );

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

  // School Verification Methods
  confirmSchoolInfo: async (): Promise<{
    success: boolean;
    message?: string;
  }> => {
    try {
      const response = await apiClient.put<ApiResponse<unknown>>('/manager/school/correct_info');

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'اطلاعات مدرسه با موفقیت تایید شد' };
      }
      return {
        success: false,
        message: response.message || 'خطا در تایید اطلاعات مدرسه',
      };
    } catch (error: unknown) {
      console.error('confirmSchoolInfo Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  reportSchoolDiscrepancy: async (data: unknown): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<ApiResponse<unknown>>('/manager/school/change_info', data);

      if (response.status === 'success' || response.code === 200) {
        return {
          success: true,
          message: response.message || 'گزارش مغایرت با موفقیت ثبت شد',
        };
      }
      return {
        success: false,
        message: response.message || 'خطا در ثبت گزارش مغایرت',
      };
    } catch (error: unknown) {
      console.error('reportSchoolDiscrepancy Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  getStudentRequests: async (): Promise<{
    success: boolean;
    data?: unknown[];
    message?: string;
  }> => {
    try {
      const response = await apiClient.get<ApiResponse<unknown[]>>('/manager/students');

      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return {
        success: false,
        message: response.message || 'خطا در دریافت لیست درخواست‌ها',
      };
    } catch (error: unknown) {
      console.error('getStudentRequests Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  getStudentRequestById: async (
    id: number,
  ): Promise<{ success: boolean; data?: unknown; message?: string }> => {
    try {
      const response = await apiClient.get<ApiResponse<unknown>>(`/manager/students/${id}`);

      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return {
        success: false,
        message: response.message || 'خطا در دریافت جزئیات درخواست',
      };
    } catch (error: unknown) {
      console.error('getStudentRequestById Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  approveStudentRequest: async (
    id: number,
    status: 2 | 1 | 0,
    description?: string | null,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<ApiResponse<unknown>>(`/manager/students/${id}`, {
        status,
        description,
      });

      if (response.status === 'success' || response.code === 200) {
        return {
          success: true,
          message: response.message || 'درخواست با موفقیت تایید شد',
        };
      }
      return {
        success: false,
        message: response.message || 'خطا در تایید درخواست',
      };
    } catch (error: unknown) {
      console.error('approveStudentRequest Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  getManagerProducts: async (): Promise<{
    success: boolean;
    data?: unknown[];
    message?: string;
  }> => {
    try {
      const response = await apiClient.get<ApiResponse<unknown[]>>('/manager/products');

      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return {
        success: false,
        message: response.message || 'خطا در دریافت لیست محصولات',
      };
    } catch (error: unknown) {
      console.error('getManagerProducts Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  getManagerProductById: async (
    id: number,
  ): Promise<{ success: boolean; data?: ManagerProductResponsePayload; message?: string }> => {
    try {
      const response = await apiClient.get<ApiResponse<ManagerProductResponsePayload>>(`/manager/products/${id}`);

      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return {
        success: false,
        message: response.message || 'خطا در دریافت جزئیات محصول',
      };
    } catch (error: unknown) {
      console.error('getManagerProductById Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  approveManagerProduct: async (
    id: number,
    status: 2 | 1 | 0,
    description?: string | null,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<ApiResponse<unknown>>(`/manager/products/${id}`, {
        status,
        description,
      });

      if (response.status === 'success' || response.code === 200) {
        return {
          success: true,
          message: response.message || 'محصول با موفقیت تایید شد',
        };
      }
      return {
        success: false,
        message: response.message || 'خطا در تایید محصول',
      };
    } catch (error: unknown) {
      console.error('approveManagerProduct Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },



  // Manager Orders
  getManagerOrders: async (): Promise<{
    success: boolean;
    data?: Order[];
    message?: string;
  }> => {
    try {
      const response = await apiClient.get<ApiResponse<Order[]>>('/manager/orders');

      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return {
        success: false,
        message: response.message || 'خطا در دریافت لیست سفارشات',
      };
    } catch (error: unknown) {
      console.error('getManagerOrders Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  getManagerOrderById: async (
    id: number | string,
  ): Promise<{ success: boolean; data?: Order; message?: string }> => {
    try {
      const response = await apiClient.get<ApiResponse<Order>>(`/manager/orders/${id}`);

      if (response.status === 'success' || response.code === 200) {
        return { success: true, data: response.data };
      }
      return {
        success: false,
        message: response.message || 'خطا در دریافت جزئیات سفارش',
      };
    } catch (error: unknown) {
      console.error('getManagerOrderById Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  updateManagerOrder: async (
    id: number | string,
    data: unknown,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<ApiResponse<unknown>>(`/manager/orders/${id}`, data);

      if (response.status === 'success' || response.code === 200) {
        return {
          success: true,
          message: response.message || 'وضعیت سفارش با موفقیت تغییر کرد',
        };
      }
      return {
        success: false,
        message: response.message || 'خطا در تغییر وضعیت سفارش',
      };
    } catch (error: unknown) {
      console.error('updateManagerOrder Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },
};

import apiClient from './apiClient';
import { ApiResponse, UserData } from './schemas';

export interface AddFavoritesPayload {
  favorite_student_ids: number[];
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  statusText: string;
  paymentMethod: string;
  amount: string;
  // Extra fields for OrderReviews if needed, or keep them optional
  productName?: string;
  weight?: string;
  count?: number;
  deliveryTime?: string;
  description?: string;
  note?: string;
  item?: any; // Keep original item if needed for other components
}

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

const mapApiStatus = (apiStatus: string): 'Completed' | 'Pending' | 'Cancelled' => {
    if (!apiStatus) return 'Pending';
    if (apiStatus === 'delivered' || apiStatus === 'sent' || apiStatus === 'تکمیل شده' || apiStatus.includes('ارسال شده')) return 'Completed';
    if (apiStatus === 'pending' || apiStatus === 'not_sent' || apiStatus === 'در انتظار ارسال' || apiStatus.includes('در انتظار')) return 'Pending';
    if (apiStatus === 'canceled' || apiStatus === 'لغو شده') return 'Cancelled';
    return 'Pending'; 
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

  getOrders: async (): Promise<{ success: boolean; data?: Order[]; message?: string }> => {
    try {
        const response = await apiClient.get<any, ApiResponse<any[]>>('/student/orders');
        
        if (response.status === 'success' || response.code === 200) {
            const rawData = response.data || [];
            if (!Array.isArray(rawData)) return { success: true, data: [] };

            const mappedOrders: Order[] = rawData
                .filter((item: any) => item !== null && item !== undefined && typeof item === 'object')
                .map((item: any) => ({
                    id: toFarsiNumber(item.id),
                    customer: item.customerName || 'کاربر مهمان',
                    date: toFarsiNumber(item.deliveryTime) || toFarsiNumber("1403/01/01"),
                    status: mapApiStatus(item.status || item.statusLabel),
                    statusText: item.statusLabel || 'نامشخص',
                    paymentMethod: 'اینترنتی',
                    amount: toFarsiNumber(item.price) || '۰',
                    // Preserve other fields
                    productName: item.productName || '',
                    weight: item.weight || '',
                    count: item.count || 0,
                    deliveryTime: item.deliveryTime,
                    description: item.description,
                    note: item.note,
                    item: item // Full original object just in case
                }));
            
            return { success: true, data: mappedOrders };
        }
        return { success: false, message: response.message || 'خطا در دریافت لیست سفارشات' };
    } catch (error: any) {
        console.error("getOrders Error:", error);
        return { success: false, message: error.message || 'خطای شبکه' };
    }
  }
};

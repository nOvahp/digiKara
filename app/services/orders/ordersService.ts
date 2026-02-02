
import apiClient from '../common/apiClient';
import { ApiResponse } from '@/app/services/common/schemas';
import { toFarsiNumber } from '../common/utils';

// Helper to map API status to UI status
const mapApiStatus = (apiStatus: string): 'Completed' | 'Pending' | 'Cancelled' => {
    if (!apiStatus) return 'Pending';
    if (apiStatus === 'delivered' || apiStatus === 'sent' || apiStatus === 'تکمیل شده' || apiStatus.includes('ارسال شده')) return 'Completed';
    if (apiStatus === 'pending' || apiStatus === 'not_sent' || apiStatus === 'در انتظار ارسال' || apiStatus.includes('در انتظار')) return 'Pending';
    if (apiStatus === 'canceled' || apiStatus === 'لغو شده') return 'Cancelled';
    return 'Pending'; 
}

export interface Order {
  id: string;
  orderDetailId?: number | string;
  customer: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  statusText: string;
  paymentMethod: string;
  amount: string;
  productName?: string;
  weight?: string;
  count?: number;
  deliveryTime?: string;
  description?: string;
  note?: string;
  item?: any;
}

export const ordersService = {
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
                    orderDetailId: item.id, 
                    customer: item.customerName || 'کاربر مهمان',
                    date: toFarsiNumber(item.deliveryTime) || toFarsiNumber("1403/01/01"),
                    status: mapApiStatus(item.status || item.statusLabel),
                    statusText: item.statusLabel || 'نامشخص',
                    paymentMethod: 'اینترنتی',
                    amount: toFarsiNumber(item.price) || '۰',
                    productName: item.productName || '',
                    weight: item.weight || '',
                    count: item.count || 0,
                    deliveryTime: item.deliveryTime,
                    description: item.description,
                    note: item.note,
                    item: item 
                }));
            
            return { success: true, data: mappedOrders };
        }
        return { success: false, message: response.message || 'خطا در دریافت لیست سفارشات' };
    } catch (error: any) {
        console.error("getOrders Error:", error);
        return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  updateOrderStatus: async (orderDetailId: number | string, status: string): Promise<{ success: boolean; message?: string }> => {
      try {
          const response = await apiClient.put<any, ApiResponse<any>>(`/student/orders/orderDetail/${orderDetailId}/status`, {
              status: status
          });

          if (response.status === 'success' || response.code === 200) {
              return { success: true, message: response.message || 'وضعیت سفارش با موفقیت تغییر کرد' };
          }
          return { success: false, message: response.message || 'خطا در تغییر وضعیت سفارش' };
      } catch (error: any) {
          console.error("updateOrderStatus Error:", error);
          return { success: false, message: error.message || 'خطای شبکه' };
      }
  }
};

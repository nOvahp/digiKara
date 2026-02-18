import apiClient from '../common/apiClient';
import { ApiResponse } from '@/app/services/common/schemas';
import { toFarsiNumber } from '../common/utils';

// Helper to map API status to UI status
const mapApiStatus = (apiStatus: string): 'Completed' | 'Pending' | 'Cancelled' => {
  if (!apiStatus) return 'Pending';
  if (
    apiStatus === 'delivered' ||
    apiStatus === 'sent' ||
    apiStatus === 'تکمیل شده' ||
    apiStatus === 'تایید شده' ||
    apiStatus.includes('ارسال شده')
  )
    return 'Completed';
  if (
    apiStatus === 'pending' ||
    apiStatus === 'not_sent' ||
    apiStatus === 'در انتظار ارسال' ||
    apiStatus.includes('در انتظار')
  )
    return 'Pending';
  if (apiStatus === 'canceled' || apiStatus === 'لغو شده') return 'Cancelled';
  return 'Pending';
};

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
  productImage?: string;
  weight?: string;
  count?: number;
  deliveryTime?: string;
  description?: string;
  note?: string;
  item?: unknown;
}

// Internal interface for API response shape
interface RawOrderResponse {
  id: string | number;
  status?: string;
  price?: string | number;
  quantity?: number;
  product?: {
    title?: string;
    image?: string;
    image_path?: string;
    description?: string;
  };
  [key: string]: unknown;
}

export const ordersService = {
  getOrders: async (status?: string): Promise<{
    success: boolean;
    data?: Order[];
    message?: string;
  }> => {
    try {
      // Map UI status to API endpoint
      // processing -> /customers/users/orders/processing
      // complete -> /customers/users/orders/complete
      // cancel -> /customers/users/orders/cancel
      const endpoint = status ? `/customers/users/orders/${status}` : '/customers/users/orders';
      
      const response = await apiClient.get<ApiResponse<unknown[]>>(endpoint);

      if (response.status === 'success' || response.code === 200) {
        const rawData = response.data || [];
        if (!Array.isArray(rawData)) return { success: true, data: [] };

        const mappedOrders: Order[] = rawData
          .filter(
            (item: unknown): item is RawOrderResponse =>
              item !== null && item !== undefined && typeof item === 'object',
          )
          .map((item) => ({
            id: toFarsiNumber(item.id),
            orderDetailId: item.id,
            customer: 'شما',
            date: toFarsiNumber((item as any).created_at || '---'),
            status: mapApiStatus(item.status || ''),
            statusText: item.status || 'نامشخص',
            paymentMethod: 'اینترنتی',
            amount: toFarsiNumber(item.price) || '۰',
            productName: item.product?.title || 'محصول نامشخص',
            productImage: item.product?.image || item.product?.image_path || '',
            weight: item.product?.description || '',
            count: item.quantity || 0,
            deliveryTime: 'نامشخص',
            description: item.product?.description,
            note: '',
            item: item,
          }));

        return { success: true, data: mappedOrders };
      }
      return {
        success: false,
        message: response.message || 'خطا در دریافت لیست سفارشات',
      };
    } catch (error: unknown) {
      console.error('getOrders Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },

  updateOrderStatus: async (
    orderDetailId: number | string,
    status: string,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<ApiResponse<unknown>>(
        `/student/orders/orderDetail/${orderDetailId}/status`,
        {
          status: status,
        },
      );

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
      console.error('updateOrderStatus Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) message = error.message;
      return { success: false, message };
    }
  },
};

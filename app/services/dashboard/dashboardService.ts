import apiClient from '../common/apiClient';
import { ApiResponse } from '@/app/services/common/schemas';

export interface DashboardStats {
  storeStatus: 'active' | 'pending';
  newOrders: number;
  activeProducts: number;
  totalEarnings: number;
  isApproved?: boolean;
}

export const dashboardService = {
  getStats: async (): Promise<{
    success: boolean;
    data?: DashboardStats;
    message?: string;
  }> => {
    try {
      // Fetch products and orders in parallel
      const [productsResponse, ordersResponse] = await Promise.all([
        apiClient.get<any, ApiResponse<any[]>>('/student/products'),
        apiClient.get<any, ApiResponse<any[]>>('/student/orders'),
      ]);

      // Calculate stats from the responses
      const products =
        productsResponse.status === 'success' || productsResponse.code === 200
          ? productsResponse.data || []
          : [];

      const orders =
        ordersResponse.status === 'success' || ordersResponse.code === 200
          ? ordersResponse.data || []
          : [];

      // Count active (approved) products
      const activeProductsCount = Array.isArray(products)
        ? products.filter((p: any) => p.approved === true || p.approved === 1).length
        : 0;

      // Count new orders (orders with status "سفارش جدید" or similar)
      const newOrdersCount = Array.isArray(orders)
        ? orders.filter(
            (o: any) =>
              o.status === 'سفارش جدید' ||
              o.status === 'new' ||
              o.status === 'pending' ||
              o.status === 'در انتظار ارسال',
          ).length
        : 0;

      // Check if any product is approved (store is active)
      const hasApprovedProducts = activeProductsCount > 0;

      const stats: DashboardStats = {
        storeStatus: hasApprovedProducts ? 'active' : 'pending',
        newOrders: newOrdersCount,
        activeProducts: activeProductsCount,
        totalEarnings: 0, // Calculate from orders if needed
        isApproved: hasApprovedProducts,
      };

      return { success: true, data: stats };
    } catch (error: any) {
      console.error('getDashboardStats Error:', error);
      return {
        success: false,
        message: error.message || 'خطای شبکه',
        data: {
          storeStatus: 'pending',
          newOrders: 0,
          activeProducts: 0,
          totalEarnings: 0,
          isApproved: false,
        },
      };
    }
  },
};

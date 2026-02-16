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
      // Define partial types for what we need to calculate stats
      type RawProduct = { approved?: boolean | number };
      type RawOrder = { status?: string };

      const [productsResponse, ordersResponse] = await Promise.all([
        apiClient.get<ApiResponse<RawProduct[]>>('/student/products'),
        apiClient.get<ApiResponse<RawOrder[]>>('/student/orders'),
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
        ? products.filter((p) => p.approved === true || p.approved === 1).length
        : 0;

      // Count new orders (orders with status "سفارش جدید" or similar)
      const newOrdersCount = Array.isArray(orders)
        ? orders.filter(
            (o) =>
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
    } catch (error: unknown) {
      console.error('getDashboardStats Error:', error);
      const message =
        error instanceof Error
          ? error.message
          : (error as Record<string, unknown>)?.message &&
              typeof (error as Record<string, unknown>).message === 'string'
            ? ((error as Record<string, unknown>).message as string)
            : 'خطای شبکه';
      return {
        success: false,
        message,
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

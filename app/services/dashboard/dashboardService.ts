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
      // Fetch products, orders, and cell (hojre) in parallel
      type RawProduct = { approved?: boolean | number };
      type RawOrder = { status?: string };
      type RawCell = { approved?: boolean | number; is_active?: boolean | number; active?: boolean | number };

      const [productsResponse, ordersResponse, cellResponse] = await Promise.all([
        apiClient.get<ApiResponse<RawProduct[]>>('/student/products'),
        apiClient.get<ApiResponse<RawOrder[]>>('/student/orders'),
        apiClient.get<ApiResponse<RawCell | RawCell[]>>('/student/cells'),
      ]);

      const products =
        productsResponse.status === 'success' || productsResponse.code === 200
          ? productsResponse.data || []
          : [];

      const orders =
        ordersResponse.status === 'success' || ordersResponse.code === 200
          ? ordersResponse.data || []
          : [];

      // Hojre approval = the cell's own approval status, not product approvals
      const cellRaw = cellResponse.status === 'success' || cellResponse.code === 200
        ? cellResponse.data
        : null;
      const cellData: RawCell | null = Array.isArray(cellRaw) ? (cellRaw[0] ?? null) : (cellRaw ?? null);
      const isCellApproved = !!(cellData?.approved || cellData?.is_active || cellData?.active);

      // Count active (approved) products
      const activeProductsCount = Array.isArray(products)
        ? products.filter((p) => p.approved === true || p.approved === 1).length
        : 0;

      // Count new orders
      const newOrdersCount = Array.isArray(orders)
        ? orders.filter(
            (o) =>
              o.status === 'سفارش جدید' ||
              o.status === 'new' ||
              o.status === 'pending' ||
              o.status === 'در انتظار ارسال',
          ).length
        : 0;

      const stats: DashboardStats = {
        storeStatus: isCellApproved ? 'active' : 'pending',
        newOrders: newOrdersCount,
        activeProducts: activeProductsCount,
        totalEarnings: 0,
        isApproved: isCellApproved,
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

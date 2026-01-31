import apiClient from './apiClient';
import { ApiResponse } from './schemas';
import { Product } from '@/app/StudentDashboard/data/products';

// Define the shape of a product as it comes from the API
export interface ApiProduct {
  id: number | string;
  title?: string;
  name?: string;
  price?: number | string;
  count?: number;
  inventory?: number;
  sold?: number;
  revenue?: string | number;
  trend?: string;
  status?: string;
  // Add other potential fields
  [key: string]: any;
}

export const studentProductService = {
  getProducts: async (): Promise<{ success: boolean; data?: Product[]; message?: string }> => {
    try {
      const response = await apiClient.get<any, ApiResponse<ApiProduct[]>>('/student/products');

      if (response.status === 'success' || response.code === 200) {
        // Map API data to the Product interface used by the UI
        const mappedProducts: Product[] = (response.data || []).map((item) => ({
          id: item.id,
          name: item.name || item.title || 'نامشخص',
          soldCount: item.sold || item.soldCount || 0,
          revenue: item.revenue ? item.revenue.toString() : '---',
          inventoryCount: item.inventory || item.count || item.inventoryCount || 0,
          trendPercentage: item.trend || '---',
          trendType: (item.trendType === 'positive' || item.trendType === 'negative') ? item.trendType : 'positive', // Default or derived
          price: item.price ? item.price.toString() : '---',
          description: item.description || 'توضیحات موجود نیست',
          category: item.category || 'دسته بندی نشده',
          tags: item.tags || [],
          images: item.images || [],
          // Fill other required fields with placeholders if missing
          fee: item.fee ? item.fee.toString() : '---',
          receive: item.receive ? item.receive.toString() : '---',
          discount: item.discount ? item.discount.toString() : '---',
          code: item.code || '---',
          percent: item.percent ? item.percent.toString() : '---',
          stock: item.stock ? item.stock.toString() : '---',
          reminder: item.reminder || '---'
        }));

        return { success: true, data: mappedProducts };
      }
      
      return { success: false, message: response.message || 'خطا در دریافت لیست محصولات' };
    } catch (error: any) {
      console.error('getProducts Error:', error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  getCategories: async (): Promise<{ success: boolean; data?: { id: number | string; name: string }[]; message?: string }> => {
    try {
      const response = await apiClient.get<any, ApiResponse<any[]>>('/student/products/categories');
      
      if (response.status === 'success' || response.code === 200) {
          const mapped = (response.data || []).map(c => ({
              id: c.id,
              name: c.name || c.title || 'بدون نام'
          }));
          return { success: true, data: mapped };
      }
      return { success: false, message: response.message || 'خطا در دریافت دسته بندی ها' };
    } catch (error: any) {
       console.error('getCategories Error:', error);
       return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  getProductById: async (id: string | number): Promise<{ success: boolean; data?: Product; message?: string }> => {
    try {
      const response = await apiClient.get<any, ApiResponse<ApiProduct>>(`/student/products/${id}`);
      
      if (response.status === 'success' || response.code === 200 && response.data) {
        const item = response.data;
        const product: Product = {
          id: item.id,
          name: item.name || item.title || 'نامشخص',
          soldCount: item.sold_count || 0,
          revenue: item.revenue ? item.revenue.toString() : '0', // API doesn't seem to return revenue in single product, default 0
          inventoryCount: item.inventory || 0,
          trendPercentage: item.trend || '0%', // Mock or derived
          trendType: 'positive', // Default
          price: item.price ? item.price.toString() : '0',
          description: item.description || '',
          category: item.category_id ? item.category_id.toString() : '', // Mapping ID to string? Or fetching name? UI expects name or ID? EditeProducts uses `formData`.
          // `Product` interface has `category?: string`.
          // `CategoryTagsForm` expects `category` to be the ID string if using the new logic.
          tags: [], // API returning `tag_path` null? Need to check. User example `tag_path: null`.
          images: item.image_path ? [item.image_path] : [], 
          code: item.code,
          stock: item.inventory ? item.inventory.toString() : '',
          reminder: item.warn_inventory ? item.warn_inventory.toString() : '',
          metadata: '', // Not in API response example
          // Add other fields as necessary for the form
        };
        return { success: true, data: product };
      }
      return { success: false, message: response.message || 'خطا در دریافت اطلاعات محصول' };
    } catch (error: any) {
      console.error('getProductById Error:', error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  updateProduct: async (id: string | number, data: any): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<any, any>(`/student/products/${id}`, data);
      if (response.status === 'success' || response.code === 200) {
          return { success: true, message: 'محصول با موفقیت ویرایش شد' };
      }
      return { success: false, message: response.message || 'خطا در ویرایش محصول' };
    } catch (error: any) {
        console.error('updateProduct Error:', error);
        return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  deleteProduct: async (id: string | number): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.delete<any, any>(`/student/products/${id}`);
      if (response.status === 'success' || response.code === 200) {
          return { success: true, message: 'محصول با موفقیت حذف شد' };
      }
      return { success: false, message: response.message || 'خطا در حذف محصول' };
    } catch (error: any) {
        console.error('deleteProduct Error:', error);
        return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  addProduct: async (data: FormData): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<any, any>('/student/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'محصول با موفقیت ثبت شد' };
      }
      return { success: false, message: response.message || 'خطا در ثبت محصول' };
    } catch (error: any) {
      console.error('addProduct Error:', error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  }
};

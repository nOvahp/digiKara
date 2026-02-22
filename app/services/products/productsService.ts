import apiClient from '../common/apiClient';
import { ApiResponse } from '../common/schemas';

// Helper to normalize image URLs
const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;

  // Base URL for images
  const baseUrl = 'https://digikara.back.adiaweb.dev';
  let cleanPath = path.replace(/^\//, '');

  // Common Laravel usage: if path doesn't start with 'storage', prepend it
  if (!cleanPath.startsWith('storage')) {
    cleanPath = `storage/${cleanPath}`;
  }

  const fullUrl = `${baseUrl}/${cleanPath}`;
  return fullUrl;
};

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
  image_path?: string;
  images?: string[];
  description?: string;
  category_id?: number | string;
  category?: string;
  prices?: unknown[];
  code?: string;
  fee?: number | string;
  receive?: number | string;
  discount?: number | string;
  percent?: number | string;
  stock?: number | string;
  reminder?: string | number;
  max_order?: string | number;
  created_at?: string;
  updated_at?: string;
  approved?: boolean;
  warn_inventory?: number;
  sold_count?: number;
  soldCount?: number;
  inventoryCount?: number;
  trendType?: string;
  tags?: string[];
  [key: string]: unknown;
}

// Define UI Product Interface (should be shared ideally, but defining here for now to match)
export interface Product {
  id: number;
  name: string;
  soldCount: number;
  revenue: string;
  inventoryCount: number;
  trendPercentage: string;
  trendType: 'positive' | 'negative';
  price: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  stock: string;
  reminder: string;
  maxOrderQuantity: string;
  metadata: string;
  prices: unknown[];
  code?: string;
  fee?: string;
  receive?: string;
  discount?: string;
  percent?: string;
  created_at?: string;
  updated_at?: string;
  approved?: boolean;
}

const safeNumber = (val: unknown): number => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }
  return 0; // Handle {}, [], null, undefined cases
};

export const productsService = {
  getProducts: async (): Promise<{
    success: boolean;
    data?: Product[];
    message?: string;
  }> => {
    try {
      const response = await apiClient.get<ApiResponse<ApiProduct[]>>('/student/products');

      if (response.status === 'success' || response.code === 200) {
        // Map API data to the Product interface used by the UI
        const mappedProducts: Product[] = (response.data || [])
          .filter((item): item is ApiProduct => item !== null && item !== undefined)
          .map((item) => ({
            id: Number(item.id),
            name: item.name || item.title || 'نامشخص',
            soldCount: safeNumber(item.sold) || safeNumber(item.soldCount) || 0,
            revenue: item.revenue ? item.revenue.toString() : '---',
            inventoryCount: safeNumber(item.inventory) || safeNumber(item.count) || safeNumber(item.inventoryCount) || 0,
            trendPercentage: item.trend || '---',
            trendType:
              item.trendType === 'positive' || item.trendType === 'negative'
                ? (item.trendType as 'positive' | 'negative')
                : 'positive',
            price: item.price ? item.price.toString() : '---',
            description: item.description || 'توضیحات موجود نیست',
            category: item.category || 'دسته بندی نشده',
            tags: item.tags || [],
            images: item.image_path
              ? [getImageUrl(item.image_path)]
              : Array.isArray(item.images)
                ? item.images.map(getImageUrl)
                : [],
            fee: item.fee ? item.fee.toString() : '---',
            receive: item.receive ? item.receive.toString() : '---',
            discount: item.discount ? item.discount.toString() : '---',
            code: item.code || '---',
            percent: item.percent ? item.percent.toString() : '---',
            stock: item.stock ? item.stock.toString() : '---',
            reminder: item.reminder ? item.reminder.toString() : '---',
            maxOrderQuantity: item.max_order ? item.max_order.toString() : '',
            created_at: item.created_at || '',
            updated_at: item.updated_at || '',
            metadata: '',
            prices: item.prices || [],
            approved: item.approved,
          }));

        return { success: true, data: mappedProducts };
      }

      return {
        success: false,
        message: response.message || 'خطا در دریافت لیست محصولات',
      };
    } catch (error: unknown) {
      console.error('getProducts Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      return { success: false, message };
    }
  },

  getCategories: async (): Promise<{
    success: boolean;
    data?: { id: number | string; name: string }[];
    message?: string;
  }> => {
    try {
      const response = await apiClient.get<ApiResponse<{ id: number; name?: string; title?: string }[]>>('/student/products/categories');

      if (response.status === 'success' || response.code === 200) {
        const mapped = (response.data || []).map((c) => ({
          id: c.id,
          name: c.name || c.title || 'بدون نام',
        }));
        return { success: true, data: mapped };
      }
      return {
        success: false,
        message: response.message || 'خطا در دریافت دسته بندی ها',
      };
    } catch (error: unknown) {
      console.error('getCategories Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      return { success: false, message };
    }
  },

  getProductById: async (
    id: string | number,
  ): Promise<{ success: boolean; data?: Product; message?: string }> => {
    try {
      const response = await apiClient.get<ApiResponse<ApiProduct>>(`/student/products/show/${id}`);

      if (response.status === 'success' || (response.code === 200 && response.data)) {
        const item = response.data;

        const allImages: string[] = [];

        if (item.image_path) {
          allImages.push(getImageUrl(item.image_path));
        }

        if (Array.isArray(item.images)) {
          item.images.forEach((img: string) => {
            const url = getImageUrl(img);
            if (!allImages.includes(url)) {
              allImages.push(url);
            }
          });
        }

        const product: Product = {
          id: Number(item.id),
          name: item.name || item.title || 'نامشخص',
          soldCount: safeNumber(item.sold_count),
          revenue: item.revenue ? item.revenue.toString() : '0',
          inventoryCount: safeNumber(item.inventory),
          trendPercentage: item.trend || '0%',
          trendType: 'positive',
          price: item.price ? item.price.toString() : '0',
          description: item.description || '',
          category: item.category_id ? item.category_id.toString() : '',
          tags: [],
          images: allImages,
          stock: item.inventory ? item.inventory.toString() : '',
          reminder: item.warn_inventory ? item.warn_inventory.toString() : '',
          maxOrderQuantity: item.max_order ? item.max_order.toString() : '',
          metadata: '',
          prices: item.prices || [],
          code: item.code,
        };
        return { success: true, data: product };
      }
      return {
        success: false,
        message: response.message || 'خطا در دریافت اطلاعات محصول',
      };
    } catch (error: unknown) {
      console.error('getProductById Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      return { success: false, message };
    }
  },

  updateProduct: async (
    id: string | number,
    data: unknown,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const isFormData = data instanceof FormData;
      const headers = isFormData ? { 'Content-Type': 'multipart/form-data' } : {};

      const response = await apiClient.put<ApiResponse<unknown>>(`/student/products/${id}`, data, {
        headers: headers,
      });

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'محصول با موفقیت ویرایش شد' };
      }
      return {
        success: false,
        message: response.message || 'خطا در ویرایش محصول',
      };
    } catch (error: unknown) {
      console.error('updateProduct Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      return { success: false, message };
    }
  },

  deleteProduct: async (id: string | number): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.delete<ApiResponse<unknown>>(`/student/products/${id}`);
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'محصول با موفقیت حذف شد' };
      }
      return {
        success: false,
        message: response.message || 'خطا در حذف محصول',
      };
    } catch (error: unknown) {
      console.error('deleteProduct Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      return { success: false, message };
    }
  },

  addProduct: async (
    data: FormData,
  ): Promise<{ success: boolean; message?: string; data?: unknown }> => {
    try {
      const response = await apiClient.post<ApiResponse<unknown>>('/student/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 'success' || response.code === 200) {
        return {
          success: true,
          message: 'محصول با موفقیت ثبت شد',
          data: response.data,
        };
      }
      return {
        success: false,
        message: response.message || 'خطا در ثبت محصول',
      };
    } catch (error: unknown) {
      console.error('addProduct Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      return { success: false, message };
    }
  },

  addProductPrice: async (
    productId: string | number,
    priceData: unknown,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post<ApiResponse<unknown>>(
        `/student/products/${productId}/prices`,
        priceData,
      );
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'قیمت با موفقیت افزوده شد' };
      }
      return { success: false, message: response.message || 'خطا در ثبت قیمت' };
    } catch (error: unknown) {
      console.error('addProductPrice Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      return { success: false, message };
    }
  },

  updateProductPrice: async (
    priceId: string | number,
    priceData: unknown,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.put<ApiResponse<unknown>>(
        `/student/products/prices/${priceId}`,
        priceData,
      );
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'قیمت با موفقیت ویرایش شد' };
      }
      return {
        success: false,
        message: response.message || 'خطا در ویرایش قیمت',
      };
    } catch (error: unknown) {
      console.error('updateProductPrice Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      return { success: false, message };
    }
  },

  deleteProductPrice: async (
    priceId: string | number,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.delete<ApiResponse<unknown>>(`/student/products/prices/${priceId}`);
      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'قیمت با موفقیت حذف شد' };
      }
      return { success: false, message: response.message || 'خطا در حذف قیمت' };
    } catch (error: unknown) {
      console.error('deleteProductPrice Error:', error);
      let message = 'خطای شبکه';
      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as Record<string, unknown>).message);
      }
      return { success: false, message };
    }
  },
};

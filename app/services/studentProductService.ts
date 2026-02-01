import apiClient from './apiClient';
import { ApiResponse } from './schemas';
import { Product } from '@/app/StudentDashboard/data/products';

// Helper to normalize image URLs
const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  
  // Base URL for images
  const baseUrl = "https://digikara.back.adiaweb.dev";
  let cleanPath = path.replace(/^\//, '');

  // Common Laravel usage: if path doesn't start with 'storage', prepend it
  if (!cleanPath.startsWith('storage')) {
      cleanPath = `storage/${cleanPath}`;
  }
  
  const fullUrl = `${baseUrl}/${cleanPath}`;
  console.log(`🖼️ Processed Image URL: ${path} -> ${fullUrl}`);
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
          // Handle both singular image_path and plural images array
          images: item.image_path 
            ? [getImageUrl(item.image_path)] 
            : (Array.isArray(item.images) ? item.images.map(getImageUrl) : []),
          // Fill other required fields with placeholders if missing
          fee: item.fee ? item.fee.toString() : '---',
          receive: item.receive ? item.receive.toString() : '---',
          discount: item.discount ? item.discount.toString() : '---',
          code: item.code || '---',
          percent: item.percent ? item.percent.toString() : '---',
          stock: item.stock ? item.stock.toString() : '---',
          reminder: item.reminder || '---',
          created_at: item.created_at || '',
          updated_at: item.updated_at || ''
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
        
        console.log("📦 Raw Product Data:", item); // Debug log
        
          // Fix: Combine image_path (main) and images (gallery)
          const allImages: string[] = [];
          
          if (item.image_path) {
              allImages.push(getImageUrl(item.image_path));
          }
          
          if (Array.isArray(item.images)) {
              item.images.forEach((img: string) => {
                  const url = getImageUrl(img);
                  // Avoid duplicates
                  if (!allImages.includes(url)) {
                       allImages.push(url);
                  }
              });
          }
          
          const product: Product = {
            id: item.id,
            name: item.name || item.title || 'نامشخص',
            soldCount: item.sold_count || 0,
            revenue: item.revenue ? item.revenue.toString() : '0',
            inventoryCount: item.inventory || 0,
            trendPercentage: item.trend || '0%',
            trendType: 'positive',
            price: item.price ? item.price.toString() : '0',
            description: item.description || '',
            category: item.category_id ? item.category_id.toString() : '',
            tags: [],
            images: allImages, // Use the combined list
            stock: item.inventory ? item.inventory.toString() : '',
            reminder: item.warn_inventory ? item.warn_inventory.toString() : '',
            metadata: '',
            prices: item.prices || [],
            code: item.code,
          };
          console.log("🔄 Mapped Product Images:", product.images);
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
      const isFormData = data instanceof FormData;
      const headers = isFormData ? { 'Content-Type': 'multipart/form-data' } : {};
      
      const response = await apiClient.put<any, any>(`/student/products/${id}`, data, { headers });
      
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

  addProduct: async (data: FormData): Promise<{ success: boolean; message?: string; data?: any }> => {
    try {
      const response = await apiClient.post<any, any>('/student/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 'success' || response.code === 200) {
        return { success: true, message: 'محصول با موفقیت ثبت شد', data: response.data };
      }
      return { success: false, message: response.message || 'خطا در ثبت محصول' };
    } catch (error: any) {
      console.error('addProduct Error:', error);
      return { success: false, message: error.message || 'خطای شبکه' };
    }
  },

  addProductPrice: async (productId: string | number, priceData: any): Promise<{ success: boolean; message?: string }> => {
      try {
          const response = await apiClient.post<any, any>(`/student/products/${productId}/prices`, priceData);
          if (response.status === 'success' || response.code === 200) {
              return { success: true, message: 'قیمت با موفقیت افزوده شد' };
          }
          return { success: false, message: response.message || 'خطا در ثبت قیمت' };
      } catch (error: any) {
          console.error('addProductPrice Error:', error);
          return { success: false, message: error.message || 'خطای شبکه' };
      }
  },
  updateProductPrice: async (priceId: string | number, priceData: any): Promise<{ success: boolean; message?: string }> => {
      try {
          const response = await apiClient.put<any, any>(`/student/products/prices/${priceId}`, priceData);
          if (response.status === 'success' || response.code === 200) {
              return { success: true, message: 'قیمت با موفقیت ویرایش شد' };
          }
          return { success: false, message: response.message || 'خطا در ویرایش قیمت' };
      } catch (error: any) {
          console.error('updateProductPrice Error:', error);
          return { success: false, message: error.message || 'خطای شبکه' };
      }
  },
  deleteProductPrice: async (priceId: string | number): Promise<{ success: boolean; message?: string }> => {
      try {
          const response = await apiClient.delete<any, any>(`/student/products/prices/${priceId}`);
          if (response.status === 'success' || response.code === 200) {
              return { success: true, message: 'قیمت با موفقیت حذف شد' };
          }
          return { success: false, message: response.message || 'خطا در حذف قیمت' };
      } catch (error: any) {
          console.error('deleteProductPrice Error:', error);
          return { success: false, message: error.message || 'خطای شبکه' };
      }
  }
};

import apiClient from './common/apiClient';

export interface BazzarCategory {
  id: number;
  title: string;
  icon_path: string | null;
  category_id: number | null;
  parent_id?: number | null; // Added based on common category structures
}

export interface BazzarSchool {
  id: number;
  name: string;
  image_path: string | null;
}

export interface BazzarPriceVariant {
  id: number;
  title: string;
  amount: number;
  type: number;
  discount_percent: string;
  inventory: number;
  warn_inventory: number;
  type_inventory: number;
}

export interface BazzarProductDetail {
  id: number;
  title: string;
  description: string;
  image_path: string | null;
  category_id: number;
  tag_path: string | null;
  code: string;
  inventory: number;
  warn_inventory: number;
  sold_count: number;
  view_count: number;
  like_count: number;
  price: number;
  type_inventory: number;
  cell_id: number;
  approved: boolean;
  prices: BazzarPriceVariant[];
  rating?: number;
  discount?: number | string;
  reviews_count?: number;
  rating_distribution?: Record<number, number>;
  reviews?: unknown[]; // Changed from any[] to unknown[]
}

export interface BazzarProductDetailsResponse {
  product: BazzarProductDetail;
  similar_products: BazzarProduct[];
}

export interface BazzarProduct {
  id: number;
  title: string;
  price: number | string;
  image?: string | null;
  image_path?: string | null;
  rating?: number;
  discount?: number;
  originalPrice?: number | string;
}

export interface BazzarHomeData {
  categories: BazzarCategory[];
  most_sell: BazzarProduct[];
  most_view: BazzarProduct[];
  popular_schools: BazzarSchool[];
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  discount: number;
  is_updated: boolean;
  status: string;
  title: string;
  image: string;
  shop_name?: string;
}

export interface CartResponse {
  status: string;
  message: string;
  data: CartItem[];
  code: number;
}

export interface Address {
  id: number;
  province_id: number;
  city_id: number;
  details: string;
  postal_code: string;
  receiver_name: string;
  receiver_phone: string;
  title?: string;
  city?: string;
  address?: string;
}

export interface Province {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  province_id: number;
}

export interface UserProfile {
  id: number;
  name: string;
  mobile: string;
  image?: string;
  is_info_correct?: boolean;
  firstname?: string;
  lastname?: string;
  phone?: string;
  grade?: string;
  national_code?: string;
  school?: string;
  field?: string;
  province?: string;
  city?: string;
  district?: string | number;
}

// Generic API Response wrappers
export interface ApiResponse<T> {
  data: T;
  status?: string;
  message?: string;
}

export interface BazzarSearchParams {
  page: number;
  search?: string | null;
  category_id?: number | null;
  min_price?: number | null;
  max_price?: number | null;
  perPage?: number | null;
}

export interface BazzarSearchResponse {
  status: string;
  data: BazzarProduct[];
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
  };
}

export const bazzarService = {
  getHomePageData: async (): Promise<BazzarHomeData> => {
    const response = await apiClient.get<ApiResponse<BazzarHomeData>>('/index');
    return response.data;
  },

  getProductDetails: async (id: number): Promise<BazzarProductDetailsResponse> => {
    const response = await apiClient.get<ApiResponse<BazzarProductDetailsResponse>>(
      `/product/${id}`,
    );
    return response.data;
  },

  getProducts: async (params: BazzarSearchParams): Promise<BazzarSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', params.page.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.category_id) queryParams.append('category_id', params.category_id.toString());
    if (params.min_price) queryParams.append('min_price', params.min_price.toString());
    if (params.max_price) queryParams.append('max_price', params.max_price.toString());
    if (params.perPage) queryParams.append('perPage', params.perPage.toString());

    return await apiClient.get<BazzarSearchResponse>(`/products?${queryParams.toString()}`);
  },

  addToCart: async (
    productId: number,
    priceId?: number,
  ): Promise<{ success: boolean; message?: string }> => {
    const payload = priceId ? { prices: [priceId] } : {};
    return await apiClient.post<{ success: boolean; message?: string }>(
      `/customers/orders/store/product/${productId}`,
      payload,
    );
  },

  getOrders: async (): Promise<CartResponse> => {
    return await apiClient.get<CartResponse>('/customers/orders/index');
  },

  incrementOrderItem: async (orderDetailId: number): Promise<ApiResponse<null>> => {
    return await apiClient.put<ApiResponse<null>>(
      `/customers/orders/increment/orderDetail/${orderDetailId}`,
      {},
    );
  },

  decrementOrderItem: async (orderDetailId: number): Promise<ApiResponse<null>> => {
    return await apiClient.put<ApiResponse<null>>(
      `/customers/orders/decrement/orderDetail/${orderDetailId}`,
      {},
    );
  },

  getAddresses: async (): Promise<ApiResponse<Address[]>> => {
    return await apiClient.get<ApiResponse<Address[]>>('/customers/addresses');
  },

  getProvinces: async (): Promise<ApiResponse<Province[]>> => {
    return await apiClient.get<ApiResponse<Province[]>>('/customers/addresses/provinces');
  },

  getCities: async (provinceId: number): Promise<ApiResponse<City[]>> => {
    if (!provinceId || isNaN(provinceId) || provinceId <= 0) {
      console.warn('Invalid provinceId passed to getCities:', provinceId);
      return { data: [] };
    }
    return await apiClient.get<ApiResponse<City[]>>(
      `/customers/addresses/province/${provinceId}/city`,
    );
  },

  createAddress: async (data: Partial<Address>): Promise<ApiResponse<Address>> => {
    return await apiClient.post<ApiResponse<Address>>('/customers/addresses', data);
  },

  updateAddress: async (
    addressId: number,
    data: Partial<Address>,
  ): Promise<ApiResponse<Address>> => {
    return await apiClient.put<ApiResponse<Address>>(`/customers/addresses/${addressId}`, data);
  },

  deleteAddress: async (addressId: number): Promise<ApiResponse<null>> => {
    return await apiClient.delete<ApiResponse<null>>(`/customers/addresses/${addressId}`);
  },

  getUserProfile: async (): Promise<ApiResponse<UserProfile>> => {
    return await apiClient.get<ApiResponse<UserProfile>>('/customers/users');
  },
};

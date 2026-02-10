import apiClient from './common/apiClient';

export interface BazzarCategory {
    id: number;
    title: string;
    icon_path: string | null;
    category_id: number | null;
}

export interface BazzarSchool {
    id: number;
    name: string;
    image_path: string | null;
}

// Updated interfaces based on API Response
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
    // Optional UI placeholders for reviews (not in API yet)
    rating?: number; 
    discount?: number | string; // Added to fix lint and support product-level discount
    reviews_count?: number;
    rating_distribution?: Record<number, number>;
    reviews?: any[];
}

export interface BazzarProductDetailsResponse {
    product: BazzarProductDetail;
    similar_products: BazzarProduct[];
}

// BazzarProduct is used in similar_products and home lists
// Update if similar_products inside detail has diff structure, 
// User JSON shows similar_products items have: id, title, image_path, category_id, tag_path, price
export interface BazzarProduct {
    id: number;
    title: string;
    price: number | string;
    image?: string | null; // For home page compatibility (it used 'image') - or align to image_path
    image_path?: string | null; // For detail similar_products
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

export const bazzarService = {
    getHomePageData: async (): Promise<BazzarHomeData> => {
        const response = await apiClient.get<{ data: BazzarHomeData }>('/index');
        // Handle response mapping if needed
        const result = response as unknown as { data: BazzarHomeData };
        return result.data; 
    },

    getProductDetails: async (id: number): Promise<BazzarProductDetailsResponse> => {
        const response = await apiClient.get<{ data: BazzarProductDetailsResponse }>(`/product/${id}`);
        const result = response as unknown as { data: BazzarProductDetailsResponse };
        return result.data;
    },

    getProducts: async (params: BazzarSearchParams): Promise<BazzarSearchResponse> => {
        const queryParams = new URLSearchParams();
        queryParams.append('page', params.page.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.category_id) queryParams.append('category_id', params.category_id.toString());
        if (params.min_price) queryParams.append('min_price', params.min_price.toString());
        if (params.max_price) queryParams.append('max_price', params.max_price.toString());
        if (params.perPage) queryParams.append('perPage', params.perPage.toString());

        const response = await apiClient.get<any>(`/products?${queryParams.toString()}`);
        return response as unknown as BazzarSearchResponse; 
    },

    addToCart: async (productId: number, priceId?: number): Promise<any> => {
        // Endpoint: /customers/orders/store/product/{product_id}
        // Sending prices array in body as required by backend (validation error received)
        const payload = priceId ? { prices: [priceId] } : {};
        const response = await apiClient.post(`/customers/orders/store/product/${productId}`, payload);
        return response;
    },

    getOrders: async (): Promise<any> => {
        const response = await apiClient.get('/customers/orders/index');
        return response;
    },

    incrementOrderItem: async (orderDetailId: number): Promise<any> => {
        const response = await apiClient.put(`/customers/orders/increment/orderDetail/${orderDetailId}`, {});
        return response;
    },

    decrementOrderItem: async (orderDetailId: number): Promise<any> => {
        const response = await apiClient.put(`/customers/orders/decrement/orderDetail/${orderDetailId}`, {});
        return response;
    },

    getAddresses: async (): Promise<any> => {
        const response = await apiClient.get('/customers/addresses');
        return response;
    },

    getProvinces: async (): Promise<any> => {
        const response = await apiClient.get('/provinces');
        return response;
    },

    getCities: async (provinceId: number): Promise<any> => {
        const response = await apiClient.get(`/cities?province_id=${provinceId}`);
        return response;
    },

    createAddress: async (data: any): Promise<any> => {
        const response = await apiClient.post('/customers/addresses', data);
        return response;
    }
};

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

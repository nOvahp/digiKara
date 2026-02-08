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

export interface BazzarProduct {
    id: number;
    title: string;
    price: number | string; // API might return number or formatted string
    image: string | null;
    rating?: number; // Optional as not in sample but used in UI
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
        // The apiClient interceptor returns response.data directly, which is the full object including 'data', 'status', etc.
        // Based on apiClient.ts: return response.data;
        // The API response structure is: { status, message, data: { ... }, code }
        // So the return value of apiClient.get is that whole object.
        // We need to access .data from that.
        
        // Let's cast the response to allow access
        const result = response as unknown as { data: BazzarHomeData };
        return result.data; 
    },

    getProductDetails: async (id: number): Promise<BazzarProductDetailsResponse> => {
        const response = await apiClient.get<{ data: BazzarProductDetailsResponse }>(`/${id}`);
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
    data: BazzarProduct[]; // Assuming data is an array of products
    // Add pagination meta if available in response, e.g.:
    // meta?: { current_page: number; last_page: number; total: number; per_page: number; }; 
    // For now we will rely on data length or if user provided specific meta structure.
    // Given the user description "image we have 1000 result... we get page 1", 
    // valid pagination usually brings meta data. I'll add a generic meta placeholder for now.
    meta?: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
}

export interface BazzarProductDetail {
    id: number;
    title: string;
    price: number | string;
    description?: string;
    images?: string[]; // Array of image URLs
    category?: string;
    rating?: number;
    reviews_count?: number;
    // Potentially other fields matching the UI:
    colors?: { name: string; hex: string; id: string }[];
    sizes?: string[];
    specs?: Record<string, string>;
    reviews?: any[]; // Define specific review type if needed
    rating_distribution?: Record<number, number>;
}

export interface BazzarProductDetailsResponse {
    product: BazzarProductDetail;
    similar_products: BazzarProduct[];
}

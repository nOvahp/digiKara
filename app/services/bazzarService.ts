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
    }
};

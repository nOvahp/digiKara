
export interface Price {
    id: number | string;
    title?: string;
    amount?: string | number;
    type?: number;
    discount_percent?: string | number;
    inventory?: string | number;
    warn_inventory?: string | number;
    type_inventory?: number;
}

export interface Product {
    id: number | string;
    name: string;
    soldCount: number;
    revenue: string;
    inventoryCount: number;
    trendPercentage: string;
    trendType: 'positive' | 'negative';
    description?: string;
    category?: string;
    tags?: string[];
    images?: string[];
    metadata?: string;
    price?: string;
    fee?: string;
    receive?: string;
    discount?: string;
    code?: string;
    percent?: string;
    stock?: string;
    reminder?: string;
    created_at?: string;
    updated_at?: string;
    prices?: Price[];
}

const initialProducts: Product[] = [
    { 
        id: 1, 
        name: "عسل آویشن ارگانیک", 
        soldCount: 300, 
        revenue: "۴,۵۰۰,۰۰۰ ریال", 
        inventoryCount: 100, 
        trendPercentage: "+5.0%", 
        trendType: "positive", 
        price: "4.500.000", 
        description: "عسل آویشن طبیعی با خواص درمانی فراوان، برداشت شده از ارتفاعات پاک و بکر. این محصول دارای طعمی منحصر به فرد و عطری دلپذیر است.",
        images: ["/Product.png", "/Product.png", "/Product.png"]
    },
    { 
        id: 2, 
        name: "عسل چهل گیاه ارگانیک", 
        soldCount: 400, 
        revenue: "۶,۰۰۰,۰۰۰ ریال", 
        inventoryCount: 150, 
        trendPercentage: "+7.5%", 
        trendType: "negative", 
        price: "6.000.000", 
        description: "عسل چهل گیاه تهیه شده از دل طبیعت، ترکیبی از شهد گل‌های متنوع بهاری. مناسب برای تقویت سیستم ایمنی.",
        images: ["/Product.png", "/Product.png", "/Product.png"]
    },
    { 
        id: 3, 
        name: "عسل زعفران ارگانیک", 
        soldCount: 500, 
        revenue: "۷,۵۰۰,۰۰۰ ریال", 
        inventoryCount: 120, 
        trendPercentage: "+6.0%", 
        trendType: "positive", 
        price: "7.500.000",
        description: "ترکیب فوق‌العاده عسل طبیعی و زعفران اعلاء. نشاط‌ آور و مقوی قلب.",
        images: ["/Product.png", "/Product.png"]
    },
    { id: 4, name: "موم عسل طبیعی", soldCount: 250, revenue: "۳,۰۰۰,۰۰۰ ریال", inventoryCount: 5, trendPercentage: "+3.5%", trendType: "negative", price: "3.000.000" },
    { id: 5, name: "شهد گلهای وحشی ارگانیک", soldCount: 320, revenue: "۵,۲۰۰,۰۰۰ ریال", inventoryCount: 0, trendPercentage: "+5.5%", trendType: "positive", price: "5.200.000" },
    { id: 6, name: "گرده گل ارگانیک", soldCount: 150, revenue: "۲,۰۰۰,۰۰۰ ریال", inventoryCount: 8, trendPercentage: "+4.1%", trendType: "positive", price: "2.000.000" },
    { id: 7, name: "سیب زمینی ارگانیک", soldCount: 600, revenue: "۱,۵۰۰,۰۰۰ ریال", inventoryCount: 300, trendPercentage: "+2.0%", trendType: "negative", price: "1.500.000" },
    { id: 8, name: "گوجه فرنگی ارگانیک", soldCount: 550, revenue: "۱,۲۰۰,۰۰۰ ریال", inventoryCount: 0, trendPercentage: "+3.0%", trendType: "positive", price: "1.200.000" },
    { id: 9, name: "شیرینی عسل ارگانیک", soldCount: 200, revenue: "۳,۵۰۰,۰۰۰ ریال", inventoryCount: 3, trendPercentage: "+5.2%", trendType: "positive", price: "3.500.000" },
    { id: 10, name: "عسل گلابی ارگانیک", soldCount: 280, revenue: "۴,۰۰۰,۰۰۰ ریال", inventoryCount: 110, trendPercentage: "+6.5%", trendType: "negative", price: "4.000.000" },
    { id: 11, name: "عسل نعنا ارگانیک", soldCount: 430, revenue: "۶,۰۰۰,۰۰۰ ریال", inventoryCount: 0, trendPercentage: "+4.5%", trendType: "positive", price: "6.000.000" },
    { id: 12, name: "سیب ارگانیک", soldCount: 350, revenue: "۳,۰۰۰,۰۰۰ ریال", inventoryCount: 150, trendPercentage: "+3.5%", trendType: "positive", price: "3.000.000" },
    { id: 13, name: "روغن حیوانی", soldCount: 80, revenue: "۸,۰۰۰,۰۰۰ ریال", inventoryCount: 20, trendPercentage: "+10.0%", trendType: "positive", price: "8.000.000" },
    { id: 14, name: "کشک محلی", soldCount: 120, revenue: "۱,۰۰۰,۰۰۰ ریال", inventoryCount: 2, trendPercentage: "+1.5%", trendType: "negative", price: "1.000.000" },
    { id: 15, name: "قره قروت", soldCount: 500, revenue: "۵۰۰,۰۰۰ ریال", inventoryCount: 200, trendPercentage: "+8.0%", trendType: "positive", price: "500.000" },
    { id: 16, name: "لواشک خانگی", soldCount: 600, revenue: "۹۰۰,۰۰۰ ریال", inventoryCount: 100, trendPercentage: "+12.0%", trendType: "positive", price: "900.000" },
    { id: 17, name: "سرکه سیب", soldCount: 90, revenue: "۱,۱۰۰,۰۰۰ ریال", inventoryCount: 9, trendPercentage: "+2.5%", trendType: "negative", price: "1.100.000" },
    { id: 18, name: "آبغوره", soldCount: 110, revenue: "۱,۳۰۰,۰۰۰ ریال", inventoryCount: 0, trendPercentage: "+3.0%", trendType: "positive", price: "1.300.000" },
    { id: 19, name: "رب انار", soldCount: 130, revenue: "۲,۵۰۰,۰۰۰ ریال", inventoryCount: 55, trendPercentage: "+4.0%", trendType: "positive", price: "2.500.000" },
    { id: 20, name: "زعفران مثقالی", soldCount: 40, revenue: "۵,۰۰۰,۰۰۰ ریال", inventoryCount: 15, trendPercentage: "+9.0%", trendType: "negative", price: "5.000.000" },
    { id: 21, name: "هل سبز", soldCount: 60, revenue: "۳,۲۰۰,۰۰۰ ریال", inventoryCount: 1, trendPercentage: "+5.0%", trendType: "positive", price: "3.200.000" },
    { id: 22, name: "دارچین قلم", soldCount: 100, revenue: "۸۰۰,۰۰۰ ریال", inventoryCount: 70, trendPercentage: "+2.2%", trendType: "positive", price: "800.000" },
    { id: 23, name: "زردچوبه", soldCount: 200, revenue: "۶۰۰,۰۰۰ ریال", inventoryCount: 80, trendPercentage: "+1.0%", trendType: "negative", price: "600.000" },
    { id: 24, name: "فلفل سیاه", soldCount: 150, revenue: "۹۰۰,۰۰۰ ریال", inventoryCount: 60, trendPercentage: "+3.8%", trendType: "positive", price: "900.000" },
    { id: 25, name: "آویشن کوهی", soldCount: 85, revenue: "۱,۵۰۰,۰۰۰ ریال", inventoryCount: 0, trendPercentage: "+6.1%", trendType: "positive", price: "1.500.000" },
];

class ProductService {
    private products: Product[] = initialProducts;

    getAll(): Product[] {
        return this.products;
    }

    getById(id: number | string): Product | undefined {
        return this.products.find(p => p.id.toString() === id.toString());
    }

    add(product: Product): void {
        this.products.unshift(product);
    }

    // Since this is client-side mock, updates usually need to find and replace
    update(id: number | string, updates: Partial<Product>): void {
        const index = this.products.findIndex(p => p.id.toString() === id.toString());
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updates };
        }
    }
}

export const productService = new ProductService();

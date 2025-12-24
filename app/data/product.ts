export interface Product {
    id: number;
    title: string;
    price: string;
    rating: number;
    image: string;
    category: string;
    description?: string;
    // Flags
    isSpecialSale?: boolean;
    isNewCollection?: boolean;
    isBestSeller?: boolean;
    isSuggested?: boolean;
    isPopular?: boolean;
    // Extra
    originalPrice?: string;
    discount?: number;
    reviewsCount?: number;
}

export const products: Product[] = [
    // =========================================================================
    // Category: صنایع چوبی (Wood Industries)
    // Subcategories: Sofa, Armchair, Lamp, Closet, Table, Bed, Library, Office Chair, etc.
    // =========================================================================
    
    // -- Special / Featured Items --
    { id: 1011, title: "میز غذاخوری", price: "500,000 تومان", rating: 5.0, image: "/12.png", category: "صنایع چوبی", isSpecialSale: true },
    { id: 102, title: "صندلی ناهارخوری", price: "180,000 تومان", rating: 4.2, image: "/12.png", category: "صنایع چوبی", },
    { id: 103, title: "کمد لباس MDF", price: "700,000 تومان", rating: 4.8, image: "/5v7w8315WyxejSIP.jpg", category: "صنایع چوبی", isSpecialSale: true,isPopular: true },
   

    // -- Regular Items --
    { id: 1001, title: "مبل راحتی سه نفره", price: "4,500,000 تومان", rating: 4.6, image: "/sofa87.webp", category: "صنایع چوبی",isBestSeller: true },
    { id: 1002, title: "مبل ال کلاسیک", price: "8,200,000 تومان", rating: 4.8, image: "/10.png", category: "صنایع چوبی" },
    { id: 1003, title: "صندلی لهستانی", price: "350,000 تومان", rating: 4.3, image: "/12.png", category: "صنایع چوبی",isPopular: true },
   

    // =========================================================================
    // Category: پوشاک (Clothing)
    // Subcategories: Shirt, Pants, Shoes, Suit, Bag, Hat, Socks, Underwear
    // =========================================================================
    { id: 2001, title: "پیراهن مردانه نخی", price: "350,000 تومان", rating: 4.3, image: "/13.jpg", category: "پوشاک", isSpecialSale: true,isBestSeller: true },
    { id: 2002, title: "پیراهن چهارخانه فلانل", price: "420,000 تومان", rating: 4.5, image: "/9.jpg", category: "پوشاک", isNewCollection: true,  isPopular: true },
    { id: 2003, title: "شلوار جین راسته", price: "650,000 تومان", rating: 4.4, image: "/11.jpg", category: "پوشاک" },
    { id: 2004, title: "شلوار کتان کرم", price: "580,000 تومان", rating: 4.2, image: "/11.jpg", category: "پوشاک" },
    { id: 2005, title: " کفش چرم", price: "350,000 تومان", rating: 4.3, image: "/img_52445245242.jpg", category: "پوشاک", isSpecialSale: true,isBestSeller: true },
    { id: 2006, title: "کتونی اسپرت پیاده‌روی", price: "950,000 تومان", rating: 4.6, image: "/ProductDetails.png", category: "پوشاک" },
    { id: 2007, title: "کت و شلوار مجلسی", price: "3,500,000 تومان", rating: 4.9, image: "/13.jpg", category: "پوشاک" },
    { id: 2008, title: "کیف دوشی چرم", price: "850,000 تومان", rating: 4.7, image: "/ProductDetails.png", category: "پوشاک" },
    { id: 2009, title: "کوله پشتی دانشجویی", price: "450,000 تومان", rating: 4.5, image: "/ProductDetails.png", category: "پوشاک" },
    { id: 2010, title: "کلاه بافتنی زمستانه", price: "420,000 تومان", rating: 4.5, image: "/knitted-hat-gray-g199.jpg", category: "پوشاک", isNewCollection: true,  isPopular: true },
    { id: 2011, title: "کلاه کپ", price: "150,000 تومان", rating: 4.4, image: "/ProductDetails.png", category: "پوشاک" },
    { id: 2012, title: "جوراب نانو", price: "90,000 تومان", rating: 4.6, image: "/ProductDetails.png", category: "پوشاک" },
    
   

    // =========================================================================
    // Category: خوراکی (Food)
    // Subcategories: Fruit, Veg, Bread, Drink, Snacks, Spices, Sweets
    // =========================================================================
    

    // =========================================================================
    // Category: صنایع هنری (Art)
    // Subcategories: Painting, Calligraphy, Pottery, Carpet, Enamel, Inlay
    // =========================================================================
    { id: 4001, title: "تابلو نقاشی رنگ روغن", price: "3,500,000 تومان", rating: 4.8, image: "/6.jpg", category: "صنایع هنری", isSuggested: true, isNewCollection: true },
    { id: 4002, title: "تابلو خطاطی نستعلیق", price: "1,800,000 تومان", rating: 4.9, image: "/7.jpg", category: "صنایع هنری", isSpecialSale: true,isSuggested: true },
    { id: 4003, title: "گلدان سفالی لعاب‌دار", price: "250,000 تومان", rating: 4.5, image: "/4.jpg", category: "صنایع هنری", isPopular: true,isBestSeller: true },
    

    // =========================================================================
    // Category: طلا و جواهر (Jewelry)
    // Subcategories: Necklace, Pendant, Earring, Bracelet, Ring, Watch
    // =========================================================================
    { id: 5001, title: "گردنبند نقره", price: "12,000,000 تومان", rating: 4.9, image: "/7e649474-50f6-42f0-b8b4-9532bae40909.jfif", category: "طلا و جواهر", isBestSeller: true, isPopular: true },
    { id: 5002, title: "انگشتر نقره", price: "4,500,000 تومان", rating: 4.7, image: "/9d7f7c48-dabc-4e0c-859a-f50eab97f54a.jfif", category: "طلا و جواهر", isSpecialSale: true ,isPopular: true},
    { id: 5003, title: "انگشتر نقره فیروزه", price: "3,200,000 تومان", rating: 4.6, image: "/d460c433-9182-4bf2-8fa0-fe1aa38e7b64.jfif", category: "طلا و جواهر", isSuggested: true },
   
];

export const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category);
}

export const searchProducts = (query: string) => {
    if (!query) return products;
    return products.filter(p => p.title.includes(query) || p.category.includes(query));
}

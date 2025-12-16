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
    { id: 101, title: "میز غذاخوری", price: "500,000 تومان", rating: 5.0, image: "/ProductBazzar.png", category: "صنایع چوبی", isSpecialSale: true },
    { id: 102, title: "صندلی ناهارخوری", price: "180,000 تومان", rating: 4.2, image: "/ProductBazzar.png", category: "صنایع چوبی", isSpecialSale: true },
    { id: 103, title: "کمد لباس MDF", price: "700,000 تومان", rating: 4.8, image: "/ProductBazzar.png", category: "صنایع چوبی", isSpecialSale: true },
    { id: 201, title: "صندلی دسته دار کلاسیک", price: "180,000 تومان", rating: 4.9, image: "/ProductBazzar.png", category: "صنایع چوبی", isNewCollection: true, isPopular: true, isBestSeller: true },
    { id: 202, title: "صندلی راحتی مدرن", price: "250,000 تومان", rating: 4.5, image: "/ProductBazzar.png", category: "صنایع چوبی", isNewCollection: true, isPopular: true, isBestSeller: true },
    { id: 203, title: "میز تحریر مینیمال", price: "300,000 تومان", rating: 4.7, image: "/ProductBazzar.png", category: "صنایع چوبی", isNewCollection: true, isPopular: true },

    // -- Regular Items --
    { id: 1001, title: "مبل راحتی سه نفره", price: "4,500,000 تومان", rating: 4.6, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1002, title: "مبل ال کلاسیک", price: "8,200,000 تومان", rating: 4.8, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1003, title: "صندلی لهستانی", price: "350,000 تومان", rating: 4.3, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1004, title: "آباژور ایستاده چوبی", price: "950,000 تومان", rating: 4.5, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1005, title: "لوستر چوبی مدرن", price: "1,200,000 تومان", rating: 4.7, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1006, title: "کمد ریلی دو درب", price: "3,500,000 تومان", rating: 4.4, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1007, title: "میز جلو مبلی راش", price: "1,800,000 تومان", rating: 4.6, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1008, title: "تخت خواب دو نفره کینگ", price: "6,000,000 تومان", rating: 4.9, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1009, title: "تخت خواب یک نفره اسپرت", price: "3,200,000 تومان", rating: 4.5, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1010, title: "کتابخانه دیواری", price: "850,000 تومان", rating: 4.3, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1011, title: "قفسه کتاب ایستاده", price: "1,100,000 تومان", rating: 4.6, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1012, title: "صندلی اداری طبی", price: "2,500,000 تومان", rating: 4.8, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1013, title: "میز مدیریت", price: "5,500,000 تومان", rating: 4.7, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1014, title: "صندلی گهواره‌ای (راکینگ چیر)", price: "2,200,000 تومان", rating: 4.9, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1015, title: "تاب ریلکسی", price: "3,800,000 تومان", rating: 4.7, image: "/ProductBazzar.png", category: "صنایع چوبی" },
    { id: 1016, title: "تخت سنتی باغی", price: "4,200,000 تومان", rating: 4.5, image: "/ProductBazzar.png", category: "صنایع چوبی" },

    // =========================================================================
    // Category: پوشاک (Clothing)
    // Subcategories: Shirt, Pants, Shoes, Suit, Bag, Hat, Socks, Underwear
    // =========================================================================
    { id: 2001, title: "پیراهن مردانه نخی", price: "350,000 تومان", rating: 4.3, image: "/ProductBazzar.png", category: "پوشاک", isSpecialSale: true },
    { id: 2002, title: "پیراهن چهارخانه فلانل", price: "420,000 تومان", rating: 4.5, image: "/ProductBazzar.png", category: "پوشاک", isNewCollection: true },
    { id: 2003, title: "شلوار جین راسته", price: "650,000 تومان", rating: 4.4, image: "/ProductBazzar.png", category: "پوشاک", isBestSeller: true },
    { id: 2004, title: "شلوار کتان کرم", price: "580,000 تومان", rating: 4.2, image: "/ProductBazzar.png", category: "پوشاک" },
    { id: 2005, title: "کفش چرم طبیعی تبریز", price: "1,200,000 تومان", rating: 4.8, image: "/ProductBazzar.png", category: "پوشاک", isSuggested: true, isPopular: true },
    { id: 2006, title: "کتونی اسپرت پیاده‌روی", price: "950,000 تومان", rating: 4.6, image: "/ProductBazzar.png", category: "پوشاک", isPopular: true },
    { id: 2007, title: "کت و شلوار مجلسی", price: "3,500,000 تومان", rating: 4.9, image: "/ProductBazzar.png", category: "پوشاک", isSpecialSale: true },
    { id: 2008, title: "کیف دوشی چرم", price: "850,000 تومان", rating: 4.7, image: "/ProductBazzar.png", category: "پوشاک", isNewCollection: true },
    { id: 2009, title: "کوله پشتی دانشجویی", price: "450,000 تومان", rating: 4.5, image: "/ProductBazzar.png", category: "پوشاک" },
    { id: 2010, title: "کلاه بافتنی زمستانی", price: "120,000 تومان", rating: 4.3, image: "/ProductBazzar.png", category: "پوشاک" },
    { id: 2011, title: "کلاه کپ", price: "150,000 تومان", rating: 4.4, image: "/ProductBazzar.png", category: "پوشاک" },
    { id: 2012, title: "جوراب نانو (بسته 3 تایی)", price: "90,000 تومان", rating: 4.6, image: "/ProductBazzar.png", category: "پوشاک" },

    // =========================================================================
    // Category: خوراکی (Food)
    // Subcategories: Fruit, Veg, Bread, Drink, Snacks, Spices, Sweets
    // =========================================================================
    { id: 3001, title: "سیب قرمز دماوند (1 کیلو)", price: "45,000 تومان", rating: 4.8, image: "/ProductBazzar.png", category: "خوراکی", isSpecialSale: true },
    { id: 3002, title: "بسته سبزیجات تازه", price: "35,000 تومان", rating: 4.5, image: "/ProductBazzar.png", category: "خوراکی", isNewCollection: true },
    { id: 3003, title: "نان جو رژیمی", price: "20,000 تومان", rating: 4.6, image: "/ProductBazzar.png", category: "خوراکی" },
    { id: 3004, title: "قهوه عربیکا 100%", price: "450,000 تومان", rating: 4.9, image: "/ProductBazzar.png", category: "خوراکی", isPopular: true, isBestSeller: true },
    { id: 3005, title: "چای سیاه لاهیجان", price: "180,000 تومان", rating: 4.7, image: "/ProductBazzar.png", category: "خوراکی", isSuggested: true },
    { id: 3006, title: "پسته اکبری (500 گرم)", price: "600,000 تومان", rating: 4.8, image: "/ProductBazzar.png", category: "خوراکی", isSuggested: true, isSpecialSale: true },
    { id: 3007, title: "چیپس میوه", price: "120,000 تومان", rating: 4.4, image: "/ProductBazzar.png", category: "خوراکی" },
    { id: 3008, title: "زعفران قائنات (1 مثقال)", price: "550,000 تومان", rating: 5.0, image: "/ProductBazzar.png", category: "خوراکی", isBestSeller: true, isPopular: true },
    { id: 3009, title: "زردچوبه هندی", price: "80,000 تومان", rating: 4.5, image: "/ProductBazzar.png", category: "خوراکی" },
    { id: 3010, title: "باقلوا یزدی", price: "220,000 تومان", rating: 4.7, image: "/ProductBazzar.png", category: "خوراکی", isNewCollection: true },
    { id: 3011, title: "عسل طبیعی سبلان", price: "400,000 تومان", rating: 4.9, image: "/ProductBazzar.png", category: "خوراکی", isPopular: true, isSuggested: true },

    // =========================================================================
    // Category: صنایع هنری (Art)
    // Subcategories: Painting, Calligraphy, Pottery, Carpet, Enamel, Inlay
    // =========================================================================
    { id: 4001, title: "تابلو نقاشی رنگ روغن", price: "3,500,000 تومان", rating: 4.8, image: "/ProductBazzar.png", category: "صنایع هنری", isSuggested: true, isNewCollection: true },
    { id: 4002, title: "تابلو خطاطی نستعلیق", price: "1,800,000 تومان", rating: 4.9, image: "/ProductBazzar.png", category: "صنایع هنری", isSpecialSale: true },
    { id: 4003, title: "گلدان سفالی لعاب‌دار", price: "250,000 تومان", rating: 4.5, image: "/ProductBazzar.png", category: "صنایع هنری", isPopular: true },
    { id: 4004, title: "لیوان سفالی دست‌ساز", price: "80,000 تومان", rating: 4.3, image: "/ProductBazzar.png", category: "صنایع هنری" },
    { id: 4005, title: "فرش دستباف 6 متری کاشان", price: "25,000,000 تومان", rating: 5.0, image: "/ProductBazzar.png", category: "صنایع هنری", isBestSeller: true, isPopular: true },
    { id: 4006, title: "گلیم عشایری", price: "2,500,000 تومان", rating: 4.7, image: "/ProductBazzar.png", category: "صنایع هنری", isSuggested: true },
    { id: 4007, title: "بشقاب میناکاری", price: "950,000 تومان", rating: 4.8, image: "/ProductBazzar.png", category: "صنایع هنری", isNewCollection: true },
    { id: 4008, title: "جعبه خاتم کاری", price: "650,000 تومان", rating: 4.6, image: "/ProductBazzar.png", category: "صنایع هنری", isSpecialSale: true },

    // =========================================================================
    // Category: طلا و جواهر (Jewelry)
    // Subcategories: Necklace, Pendant, Earring, Bracelet, Ring, Watch
    // =========================================================================
    { id: 5001, title: "گردنبند طلا طرح قلب", price: "12,000,000 تومان", rating: 4.9, image: "/ProductBazzar.png", category: "طلا و جواهر", isBestSeller: true },
    { id: 5002, title: "آویز طلا انار", price: "4,500,000 تومان", rating: 4.7, image: "/ProductBazzar.png", category: "طلا و جواهر", isSpecialSale: true },
    { id: 5003, title: "گوشواره مروارید", price: "3,200,000 تومان", rating: 4.6, image: "/ProductBazzar.png", category: "طلا و جواهر", isSuggested: true },
    { id: 5004, title: "دستبند چرم و طلا", price: "2,800,000 تومان", rating: 4.8, image: "/ProductBazzar.png", category: "طلا و جواهر", isPopular: true },
    { id: 5005, title: "انگشتر نقره عقیق", price: "1,200,000 تومان", rating: 4.5, image: "/ProductBazzar.png", category: "طلا و جواهر" },
    { id: 5006, title: "حلقه نامزدی برلیان", price: "45,000,000 تومان", rating: 5.0, image: "/ProductBazzar.png", category: "طلا و جواهر", isNewCollection: true, isBestSeller: true },
    { id: 5007, title: "ساعت مچی کلاسیک", price: "5,500,000 تومان", rating: 4.7, image: "/ProductBazzar.png", category: "طلا و جواهر", isSuggested: true },
    { id: 5008, title: "ساعت هوشمند", price: "8,000,000 تومان", rating: 4.6, image: "/ProductBazzar.png", category: "طلا و جواهر", isSpecialSale: true }
];

export const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category);
}

export const searchProducts = (query: string) => {
    if (!query) return products;
    return products.filter(p => p.title.includes(query) || p.category.includes(query));
}

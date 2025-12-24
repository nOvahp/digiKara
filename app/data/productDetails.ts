
export interface Review {
    user: string;
    date: string;
    rating: number;
    comment: string;
}

export interface ProductDetail {
    id: number;
    title: string;
    rating: number;
    price: string;
    description: string;
    images: string[];
    colors:Array<{ name: string; hex: string; id: string }>;
    sizes: string[];
    specs?: Record<string, string>;
    // New Fields
    category: string;
    reviews: Review[];
    ratingDistribution: { 5: number; 4: number; 3: number; 2: number; 1: number };
    reviewsCount: number;
}

const generateMockReviews = (count: number, baseRating: number): Review[] => {
    return Array.from({ length: count }).map((_, i) => ({
        user: `کاربر ${i + 1}`,
        date: `${i + 1} هفته پیش`,
        rating: baseRating,
        comment: "محصول بسیار با کیفیتی است و از خریدم راضی هستم. پیشنهاد میکنم حتما امتحان کنید."
    }));
};

const defaultDistribution = { 5: 70, 4: 20, 3: 5, 2: 3, 1: 2 };

export const productDetails: Record<number, ProductDetail> = {
    // =========================================================================
    // Category: صنایع چوبی (Wood Industries)
    // =========================================================================
    101: {
        id: 101, title: "میز غذاخوری", rating: 5.0, price: "500,000 تومان",
        description: "این میز غذاخوری با طراحی مدرن و چوب بلوط با کیفیت بالا ساخته شده است. پایه های محکم و سطح صیقلی آن زیبایی خاصی به اتاق ناهارخوری شما می بخشد. مناسب برای 6 نفر.",
        images: ["/12.png"],
        colors: [{ name: "قهوه ای تیره", hex: "#5D4037", id: "brown" }, { name: "گردویی", hex: "#8D6E63", id: "walnut" }],
        sizes: ["6 نفره", "8 نفره"],
        specs: { "جنس": "چوب بلوط", "ابعاد": "150x90 سانتی متر", "گارانتی": "24 ماه" },
        category: "صنایع چوبی",
        reviews: [
            { user: "محمد تقی پور", date: "2 هفته پیش", rating: 5, comment: "بسیار عالی و با کیفیت." },
            { user: "سارا حسینی", date: "3 هفته پیش", rating: 5, comment: "طراحی خیلی شیکی داره." }
        ],
        ratingDistribution: { 5: 80, 4: 10, 3: 5, 2: 2, 1: 3 },
        reviewsCount: 45
    },
    1011: {
        id: 1011, title: "میز غذاخوری", rating: 5.0, price: "500,000 تومان",
        description: "میز غذاخوری چوبی با طراحی مدرن و کیفیت ساخت بالا. مناسب برای آشپزخانه های کوچک و بزرگ.",
        images: ["/12.png"],
        colors: [{ name: "قهوه ای تیره", hex: "#3E2723", id: "dark_brown" }, { name: "فندقی", hex: "#795548", id: "hazel" }],
        sizes: ["4 نفره", "6 نفره"],
        specs: { "جنس صفحه": "MDF درجه یک", "جنس پایه": "چوب روس" },
        category: "صنایع چوبی",
        reviews: generateMockReviews(6, 5),
        ratingDistribution: defaultDistribution,
        reviewsCount: 15
    },
    102: {
        id: 102, title: "صندلی ناهارخوری", rating: 4.2, price: "180,000 تومان",
        description: "صندلی ناهارخوری راحت و شیک، ساخته شده از چوب راش گرجستان با روکش پارچه ای قابل شستشو.",
        images: ["/12.png"],
        colors: [{ name: "طوسی", hex: "#808080", id: "gray" }, { name: "کرم", hex: "#F5F5DC", id: "cream" }],
        sizes: ["استاندارد"],
        specs: { "جنس پایه": "چوب راش", "ارتفاع": "90 سانتی متر" },
        category: "صنایع چوبی",
        reviews: generateMockReviews(3, 4),
        ratingDistribution: defaultDistribution,
        reviewsCount: 12
    },
    103: {
        id: 103, title: "کمد لباس MDF", rating: 4.8, price: "700,000 تومان",
        description: "کمد لباس جادار با روکش MDF ضد خش. دارای کشوهای متعدد و رگال لباس استیل.",
        images: ["/5v7w8315WyxejSIP.jpg"],
        colors: [{ name: "سفید", hex: "#FFFFFF", id: "white" }, { name: "قهوه ای", hex: "#5D4037", id: "brown" }],
        sizes: ["120x200", "140x220"],
        specs: { "جنس بدنه": "MDF", "تعداد درب": "2 عدد" },
        category: "صنایع چوبی",
        reviews: generateMockReviews(5, 5),
        ratingDistribution: defaultDistribution,
        reviewsCount: 20
    },
    201: {
        id: 201, title: "صندلی دسته دار کلاسیک", rating: 4.9, price: "180,000 تومان",
        description: "صندلی دسته دار با طراحی ارگونومیک و پارچه مخمل درجه یک. نشیمنگاه بسیار راحت و پشتی استاندارد برای استفاده طولانی مدت.",
        images: ["/12.png"],
        colors: [{ name: "طوسی", hex: "#808080", id: "gray" }, { name: "آبی نفتی", hex: "#000080", id: "navy" }],
        sizes: ["استاندارد"],
        specs: { "جنس پایه": "فلز", "جنس پارچه": "مخمل نانو" },
        category: "صنایع چوبی",
        reviews: generateMockReviews(8, 5),
        ratingDistribution: defaultDistribution,
        reviewsCount: 40
    },
    202: {
        id: 202, title: "صندلی راحتی مدرن", rating: 4.5, price: "250,000 تومان",
        description: "مبلی تک نفره با فوم سرد تزریقی که در طول زمان نشست نمی کند. طراحی مینیمال مناسب خانه های امروزی.",
        images: ["/10.png"],
        colors: [{ name: "زرد", hex: "#FFEB3B", id: "yellow" }, { name: "خاکستری", hex: "#9E9E9E", id: "grey" }],
        sizes: ["تک نفره"],
        specs: { "نوع فوم": "سرد", "گارانتی": "18 ماه" },
        category: "صنایع چوبی",
        reviews: generateMockReviews(4, 4),
        ratingDistribution: defaultDistribution,
        reviewsCount: 15
    },
    203: {
        id: 203, title: "میز تحریر مینیمال", rating: 4.7, price: "300,000 تومان",
        description: "میز تحریر کم جا و کاربردی، دارای کشو مخفی برای لوازم التحریر. مناسب برای اتاق های کوچک.",
        images: ["/12.png"],
        colors: [{ name: "چوب روشن", hex: "#D7CCC8", id: "light_wood" }, { name: "مشکی", hex: "#212121", id: "black" }],
        sizes: ["100x60", "120x60"],
        specs: { "جنس": "MDF", "مونتاژ": "آسان" },
        category: "صنایع چوبی",
        reviews: generateMockReviews(6, 5),
        ratingDistribution: defaultDistribution,
        reviewsCount: 22
    },
    1001: {
        id: 1001, title: "مبل راحتی سه نفره", rating: 4.6, price: "4,500,000 تومان",
        description: "مبل راحتی سه نفره با پارچه نانو ضد لک. کلاف داخلی از چوب روس خشک شده.",
        images: ["/sofa87.webp"],
        colors: [{ name: "فیلی", hex: "#78909C", id: "elephant" }, { name: "نسکافه ای", hex: "#A1887F", id: "nescafe" }],
        sizes: ["3 نفره"],
        specs: { "جنس کلاف": "چوب روس", "تراکم اسفنج": "35 کیلویی" },
        category: "صنایع چوبی",
        reviews: generateMockReviews(10, 5),
        ratingDistribution: defaultDistribution,
        reviewsCount: 50
    },
    1002: { id: 1002, title: "مبل ال کلاسیک", rating: 4.8, category: "صنایع چوبی", price: "8,200,000 تومان", description: "مبل ال شیک و جادار مناسب برای سالن های پذیرایی بزرگ.", images: ["/10.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 0 },
    1003: { id: 1003, title: "صندلی لهستانی", rating: 4.3, category: "صنایع چوبی", price: "350,000 تومان", description: "صندلی چوبی طرح لهستانی با خم چوب طبیعی.", images: ["/12.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 5 },
    1004: { id: 1004, title: "آباژور ایستاده چوبی", rating: 4.5, category: "صنایع چوبی", price: "950,000 تومان", description: "آباژور کنار سالنی با پایه چوبی خراطی شده و شید پارچه ای.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 8 },
    1005: { id: 1005, title: " لوستر چوبی مدرن", rating: 4.7, category: "صنایع چوبی", price: "1,200,000 تومان", description: "لوستر چوبی 3 شاخه با طراحی مدرن و نوردهی عالی.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 15 },
    1006: { id: 1006, title: "کمد ریلی دو درب", rating: 4.4, category: "صنایع چوبی", price: "3,500,000 تومان", description: "کمد لباس ریلی با آینه قدی و طبقه بندی کاربردی.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 10 },
    1007: { id: 1007, title: "میز جلو مبلی راش", rating: 4.6, category: "صنایع چوبی", price: "1,800,000 تومان", description: "میز جلو مبلی تمام چوب راش با پایه های خراطی.", images: ["/12.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 20 },
    1008: { id: 1008, title: "تخت خواب دو نفره کینگ", rating: 4.9, category: "صنایع چوبی", price: "6,000,000 تومان", description: "تخت خواب سایز کینگ با لمسه دوزی مخمل در قسمت تاج.", images: ["/10.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 35 },
    1009: { id: 1009, title: "تخت خواب یک نفره اسپرت", rating: 4.5, category: "صنایع چوبی", price: "3,200,000 تومان", description: "تخت خواب اسپرت مناسب اتاق نوجوان.", images: ["/10.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 18 },
    1010: { id: 1010, title: "کتابخانه دیواری", rating: 4.3, category: "صنایع چوبی", price: "850,000 تومان", description: "کتابخانه دیواری مدرن و سبک.", images: ["/12.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 9 },

    1012: { id: 1012, title: "صندلی اداری طبی", rating: 4.8, category: "صنایع چوبی", price: "2,500,000 تومان", description: "صندلی اداری با رعایت اصول ارگونومی برای جلوگیری از کمردرد.", images: ["/12.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 28 },
    1013: { id: 1013, title: "میز مدیریت", rating: 4.7, category: "صنایع چوبی", price: "5,500,000 تومان", description: "میز مدیریت با پنل چرمی و طراحی لاکچری.", images: ["/12.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 22 },
    1014: { id: 1014, title: "صندلی گهواره‌ای", rating: 4.9, category: "صنایع چوبی", price: "2,200,000 تومان", description: "صندلی راکینگ چیر چوبی، آرامش بخش.", images: ["/12.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 30 },
    1015: { id: 1015, title: "تاب ریلکسی", rating: 4.7, category: "صنایع چوبی", price: "3,800,000 تومان", description: "تاب ریلکسی تک نفره با تحمل وزن بالا.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 25 },
    1016: { id: 1016, title: "تخت سنتی باغی", rating: 4.5, category: "صنایع چوبی", price: "4,200,000 تومان", description: "تخت سنتی چوبی مناسب فضای باز و رستوران های سنتی.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 16 },

    // =========================================================================
    // Category: پوشاک (Clothing)
    // =========================================================================
    2001: {
        id: 2001, title: "پیراهن مردانه نخی", rating: 4.3, price: "350,000 تومان",
        description: "پیراهن مردانه 100% نخی، خنک و مناسب فصل تابستان. بدون آبرفت و رنگ دهی.",
        images: ["/13.jpg"],
        colors: [{ name: "سفید", hex: "#FFFFFF", id: "white" }, { name: "آبی آسمانی", hex: "#87CEEB", id: "sky" }],
        sizes: ["M", "L", "XL", "XXL"],
        specs: { "جنس": "نخ پنبه", "یقه": "دیپلمات" },
        category: "پوشاک",
        reviews: generateMockReviews(5, 4),
        ratingDistribution: defaultDistribution,
        reviewsCount: 18
    },
    2002: {
        id: 2002, title: "پیراهن چهارخانه فلانل", rating: 4.5, price: "420,000 تومان",
        description: "پیراهن ضخیم پاییزه با طرح چهارخانه کلاسیک.",
        images: ["/9.jpg"],
        colors: [{ name: "قرمز مشکی", hex: "#B71C1C", id: "red_black" }],
        sizes: ["L", "XL"],
        specs: { "جنس": "فلانل", "آستین": "بلند" },
        category: "پوشاک",
        reviews: generateMockReviews(3, 4),
        ratingDistribution: defaultDistribution,
        reviewsCount: 10
    },
    2003: { id: 2003, title: "شلوار جین راسته", rating: 4.4, category: "پوشاک", price: "650,000 تومان", description: "شلوار جین با دوخت صنعتی و رنگ ثابت.", images: ["/11.jpg"], colors: [{name:"آبی", hex:"#0D47A1", id:"blue"}], sizes: ["30", "32", "34", "36"], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 12 },
    2004: { id: 2004, title: "شلوار کتان کرم", rating: 4.2, category: "پوشاک", price: "580,000 تومان", description: "شلوار کتان با کشسانی مناسب و تن خور عالی.", images: ["/11.jpg"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 8 },
    2005: { id: 2005, title: "کفش چرم طبیعی ", rating: 4.8, category: "پوشاک", price: "1,200,000 تومان", description: "کفش دست دوز چرم گاوی با کفی طبی.", images: ["/img_52445245242.jpg"], colors: [], sizes: ["40", "41", "42", "43"], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 22 },
    2006: { id: 2006, title: "کتونی اسپرت پیاده‌روی", rating: 4.6, category: "پوشاک", price: "950,000 تومان", description: "کتونی سبک و راحت مخصوص پیاده روی طولانی.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 15 },
    2007: { id: 2007, title: "کت و شلوار مجلسی", rating: 4.9, category: "پوشاک", price: "3,500,000 تومان", description: "ست کت و شلوار دامادی با دوخت مزونی.", images: ["/13.jpg"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 30 },
    2008: { id: 2008, title: "کیف دوشی چرم", rating: 4.7, category: "پوشاک", price: "850,000 تومان", description: "کیف دوشی زنانه چرم مصنوعی درجه یک.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 18 },
    2009: { id: 2009, title: "کوله پشتی دانشجویی", rating: 4.5, category: "پوشاک", price: "450,000 تومان", description: "کوله پشتی جادار با جای لپ تاپ.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 14 },
    2010: { id: 2010, title: "کلاه بافتنی زمستانه", rating: 4.5, category: "پوشاک", price: "420,000 تومان", description: "کلاه بافت گرم و نرم.", images: ["/knitted-hat-gray-g199.jpg"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 6 },
    2011: { id: 2011, title: "کلاه کپ", rating: 4.4, category: "پوشاک", price: "150,000 تومان", description: "کلاه کپ اسپرت.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 9 },
    2012: { id: 2012, title: "جوراب نانو", rating: 4.6, category: "پوشاک", price: "90,000 تومان", description: "بسته 3 عددی جوراب نانو ضد بو.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 11 },

    // =========================================================================
    // Category: خوراکی (Food)
    // =========================================================================
    3001: {
        id: 3001, title: "سیب قرمز دماوند (1 کیلو)", rating: 4.8, price: "45,000 تومان",
        description: "سیب قرمز دستچین دماوند، آبدار و شیرین.",
        images: ["/ProductDetails.png"],
        colors: [], sizes: ["1 کیلو", "3 کیلو", "جعبه"],
        specs: { "محصول": "ایران - دماوند", "ارگانیک": "بله" },
        category: "خوراکی",
        reviews: generateMockReviews(2, 5),
        ratingDistribution: defaultDistribution,
        reviewsCount: 8
    },
    3002: { id: 3002, title: "بسته سبزیجات تازه", rating: 4.5, category: "خوراکی", price: "35,000 تومان", description: "سبزی خوردن پاک شده و شسته شده آماده مصرف.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 5 },
    3003: { id: 3003, title: "نان جو رژیمی", rating: 4.6, category: "خوراکی", price: "20,000 تومان", description: "نان جو خالص مناسب افراد دیابتی.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 7 },
    3004: { id: 3004, title: "قهوه عربیکا 100%", rating: 4.9, category: "خوراکی", price: "450,000 تومان", description: "دانه قهوه عربیکا رست مدیوم با عطر شکلاتی.", images: ["/ProductDetails.png"], colors: [], sizes: ["250 گرم", "1 کیلو"], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 30 },
    3005: { id: 3005, title: "چای سیاه لاهیجان", rating: 4.7, category: "خوراکی", price: "180,000 تومان", description: "چای بهاره لاهیجان، خوش رنگ و خوش عطر.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 15 },
    3006: { id: 3006, title: "پسته اکبری", rating: 4.8, category: "خوراکی", price: "600,000 تومان", description: "پسته اکبری اعلا، شور و زعفرانی.", images: ["/ProductDetails.png"], colors: [], sizes: ["500 گرم", "1 کیلو"], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 22 },
    3007: { id: 3007, title: "چیپس میوه", rating: 4.4, category: "خوراکی", price: "120,000 تومان", description: "مخلوط چیپس میوه خشک سالم و مقوی.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 12 },
    3008: { id: 3008, title: "زعفران قائنات", rating: 5.0, category: "خوراکی", price: "550,000 تومان", description: "زعفران نگین قائنات با عطر و قدرت رنگ دهی فوق العاده.", images: ["/ProductDetails.png"], colors: [], sizes: ["1 مثقال"], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 40 },
    3009: { id: 3009, title: "زردچوبه هندی", rating: 4.5, category: "خوراکی", price: "80,000 تومان", description: "زردچوبه خالص هندی.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 10 },
    3010: { id: 3010, title: "باقلوا یزدی", rating: 4.7, category: "خوراکی", price: "220,000 تومان", description: "باقلوا سنتی یزد با مغز پسته و بادام.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 14 },
    3011: { id: 3011, title: "عسل طبیعی سبلان", rating: 4.9, category: "خوراکی", price: "400,000 تومان", description: "عسل طبیعی با ساکارز زیر 3 درصد.", images: ["/ProductDetails.png"], colors: [], sizes: ["1 کیلو"], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 25 },

    // =========================================================================
    // Category: صنایع هنری (Art)
    // =========================================================================
    4001: {
        id: 4001, title: "تابلو نقاشی رنگ روغن", rating: 4.8, price: "3,500,000 تومان",
        description: "تابلو نقاشی کار دست هنرمند ایرانی، تکنیک رنگ روغن روی بوم.",
        images: ["/6.jpg"],
        colors: [], sizes: ["50x70", "100x70"],
        specs: { "تکنیک": "رنگ روغن", "قاب": "دارد" },
        category: "صنایع هنری",
        reviews: generateMockReviews(2, 5),
        ratingDistribution: defaultDistribution,
        reviewsCount: 6
    },
    4002: { id: 4002, title: "تابلو خطاطی نستعلیق", rating: 4.9, category: "صنایع هنری", price: "1,800,000 تومان", description: "تابلو خوشنویسی شعر حافظ به خط نستعلیق.", images: ["/7.jpg"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 8 },
    4003: { id: 4003, title: "گلدان سفالی لعاب‌دار", rating: 4.5, category: "صنایع هنری", price: "250,000 تومان", description: "گلدان سفالی دست ساز با لعاب فیروزه ای.", images: ["/4.jpg"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 5 },
    4004: { id: 4004, title: "لیوان سفالی دست‌ساز", rating: 4.3, category: "صنایع هنری", price: "80,000 تومان", description: "ماگ سفالی طرح انار.", images: ["/4.jpg"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 3 },
    4005: { id: 4005, title: "فرش دستباف 6 متری", rating: 5.0, category: "صنایع هنری", price: "25,000,000 تومان", description: "فرش دستباف تمام ابریشم قم.", images: ["/ProductDetails.png"], colors: [], sizes: ["6 متری"], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 12 },
    4006: { id: 4006, title: "گلیم عشایری", rating: 4.7, category: "صنایع هنری", price: "2,500,000 تومان", description: "گلیم پشمی با طرح های اصیل عشایری.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 7 },
    4007: { id: 4007, title: "بشقاب میناکاری", rating: 4.8, category: "صنایع هنری", price: "950,000 تومان", description: "بشقاب میناکاری شده اثر استادکاران اصفهان.", images: ["/4.jpg"], colors: [], sizes: ["30 سانتی"], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 9 },
    4008: { id: 4008, title: "جعبه خاتم کاری", rating: 4.6, category: "صنایع هنری", price: "650,000 تومان", description: "جعبه جواهرات خاتم کاری نفیس.", images: ["/6.jpg"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 5 },

    // =========================================================================
    // Category: طلا و جواهر (Jewelry)
    // =========================================================================
    5001: {
        id: 5001, title: "گردنبند نقره", rating: 4.9, price: "12,000,000 تومان",
        description: "گردنبند نقره 925 عیار با طرح قلب ظریف و نگین های اتمی درخشان.",
        images: ["/4d8684722be1311ccadcc2ba6a89cb70b6556d98_1648467883.jpg"],
        colors: [{ name: "نقره ای", hex: "#C0C0C0", id: "silver" }],
        sizes: ["40cm", "45cm"],
        specs: { "عیار": "925", "وزن": "4 گرم" },
        category: "طلا و جواهر",
        reviews: generateMockReviews(3, 5),
        ratingDistribution: defaultDistribution,
        reviewsCount: 20
    },
    5002: { id: 5002, title: "انگشتر نقره", rating: 4.7, category: "طلا و جواهر", price: "4,500,000 تومان", description: "انگشتر نقره 925 عیار زنانه با طراحی مدرن.", images: ["/9d7f7c48-dabc-4e0c-859a-f50eab97f54a.jfif"], colors: [{ name: "نقره ای", hex: "#C0C0C0", id: "silver" }], sizes: ["52", "54"], specs: { "عیار": "925" }, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 8 },
    5003: { id: 5003, title: "انگشتر نقره فیروزه", rating: 4.6, category: "طلا و جواهر", price: "3,200,000 تومان", description: "انگشتر نقره با سنگ فیروزه نیشابور اصل.", images: ["/9d7f7c48-dabc-4e0c-859a-f50eab97f54a.png"], colors: [{ name: "نقره ای", hex: "#C0C0C0", id: "silver" }], sizes: ["58", "60"], specs: { "عیار": "925", "سنگ": "فیروزه" }, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 6 },
    5004: { id: 5004, title: "دستبند چرم و طلا", rating: 4.8, category: "طلا و جواهر", price: "2,800,000 تومان", description: "دستبند اسپرت چرم طبیعی با پلاک طلا.", images: ["/2.jpg"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 12 },
    5005: { id: 5005, title: "انگشتر نقره عقیق", rating: 4.5, category: "طلا و جواهر", price: "1,200,000 تومان", description: "انگشتر نقره مردانه با سنگ عقیق یمنی.", images: ["/2.jpg"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 9 },
    5006: { id: 5006, title: "حلقه نامزدی برلیان", rating: 5.0, category: "طلا و جواهر", price: "45,000,000 تومان", description: "رینگ ازدواج طلا سفید با نگین برلیان اصل.", images: ["/2.jpg"], colors: [], sizes: ["52", "54", "56"], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 45 },
    5007: { id: 5007, title: "ساعت مچی کلاسیک", rating: 4.7, category: "طلا و جواهر", price: "5,500,000 تومان", description: "ساعت مچی عقربه ای با بند چرم و موتور سوئیسی.", images: ["/ProductDetails.png"], colors: [], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 18 },
    5008: { id: 5008, title: "ساعت هوشمند", rating: 4.6, category: "طلا و جواهر", price: "8,000,000 تومان", description: "ساعت هوشمند با قابلیت مکالمه و پایش سلامت.", images: ["/ProductDetails.png"], colors: [{name:"مشکی", hex:"#000000", id:"black"}], sizes: [], specs: {}, reviews: [], ratingDistribution: defaultDistribution, reviewsCount: 22 }
};

export const getProductDetail = (id: number): ProductDetail | undefined => {
    return productDetails[id];
};

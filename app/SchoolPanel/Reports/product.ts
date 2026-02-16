export interface Product {
  id: number;
  productName: string;
  weight: string;
  count: number;
  deliveryTime: string;
  price: string; // formatted string like "۴,۵۰۰,۰۰۰"
  rawPrice: number; // For sorting/calcs if needed
  statusLabel: string;
  team: string; // e.g. "آرش یوسفی, محمد کریمی"
  description: string;
  image: string;
}

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const statuses = ['ارسال نشده', 'تحویل به مدرسه ', 'ارسال شده', 'در حال پردازش', 'لغو شده'];

  // Expanded list of names to avoid repetition every page (10 items)
  // Using 13 items (prime-ish relative to 10) to create rotation
  const productNames = [
    'عسل آویشن ارگانیک | ویژه',
    'طراحی بسته بندی محصول | خلاقانه',
    'طراحی ست اداری | کامل',
    'کیف چرمی دست دوز | قهوه‌ای',
    'ست هدیه دانش آموزی | آبی',
    'ماگ سرامیکی دست‌ساز',
    'تابلو نقاشی خطاطی',
    'عروسک بافتنی | خرس',
    'شمع معطر دست‌ساز | لاوندر',
    'جعبه چوبی جواهرات',
    'گلیم دست‌بافت | طرح سنتی',
    'صابون گیاهی | زردچوبه',
    'دفترچه یادداشت نمدی',
  ];

  const teams = [
    'آرش یوسفی, محمد کریمی',
    'زهرا حسینی, مریم اکبری',
    'علی رضایی, امیر محمدی',
    'تیم گرافیک مدرسه ',
    'گروه هنری آفتاب',
    'سارا نوری, مینا کاظمی',
    'رضا عزیزی, حسین داوودی',
  ];

  for (let i = 1; i <= 150; i++) {
    // Use different modulos to create "randomness"
    const nameIndex = (i - 1) % productNames.length;
    const statusIndex = (i - 1) % statuses.length;
    const teamIndex = (i - 1) % teams.length;

    // Vary price based on item index
    const basePrice = 4500000 + nameIndex * 500000;
    const formattedPrice = basePrice.toLocaleString('fa-IR');

    products.push({
      id: i,
      productName: productNames[nameIndex],
      weight: i % 3 === 0 ? '1 کیلوگرم' : '500 گرم',
      count: (i % 5) + 1, // Counts 1 to 5
      deliveryTime: `${(i % 3) + 1} روز تا تحویل`,
      price: formattedPrice,
      rawPrice: basePrice,
      statusLabel: statuses[statusIndex],
      team: teams[teamIndex],
      description: `این محصول (${productNames[nameIndex]}) با دقت و ظرافت توسط تیم ${teams[teamIndex]} تولید شده است.`,
      image: '/Product.png',
    });
  }
  return products;
};

export const products = generateProducts();

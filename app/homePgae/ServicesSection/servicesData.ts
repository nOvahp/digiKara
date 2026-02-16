export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: 'برنامه‌نویسی',
    description:
      'طراحی وب‌سایت‌های مدرن و کاربرپسند\nتوسعه اپلیکیشن‌های موبایل با رابط کاربری جذاب\nارائه نرم‌افزارهای سفارشی برای کسب و کارها',
    image: '/services2.png',
  },
  {
    id: 2,
    title: 'عکاسی',
    description:
      'عکاسی\nتصویربرداری حرفه‌ای مراسم، رویدادها و تبلیغات\nثبت لحظات ماندگار با تجهیزات پیشرفته',
    image: '/services1.png',
  },
  {
    id: 3,
    title: 'تعمیرات فنی',
    description:
      'تعمیرات فنی\nتعمیر و نگهداری تجهیزات الکترونیکی\nنصب و راه‌اندازی سیستم‌های الکترونیکی و کنترلی',
    image: '/services3.png',
  },
  {
    id: 4,
    title: 'طراحی گرافیک',
    description:
      'طراحی لوگوهای حرفه‌ای و جذاب\nساخت بنرهای تبلیغاتی مؤثر و خلاقانه\nطراحی کارت‌های ویزیت منحصربه‌فرد و به‌یادماندنی',
    image: '/services4.png',
  },
];

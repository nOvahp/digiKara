'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, User, ShoppingCart, Heart, 
  MapPin, Clock, ChevronRight, ChevronLeft,
  Gem, Palette, Hammer, Shirt, Armchair, Briefcase, Footprints, Grid,
  Facebook, Instagram, Twitter
} from 'lucide-react';
import { UserIcon, Search02Icon, ShoppingCart01Icon, FavouriteIcon } from 'hugeicons-react';
import { bazzarService, BazzarHomeData, BazzarProduct } from '../../services/bazzarService';
import { products } from '../../data/product';
import FooterWeb from './FooterWeb';

// UI Helpers
const CategoryItemWeb = ({ title, icon }: { title: string; icon?: string | null }) => {
  const icons: Record<string, React.ElementType> = {
    'لوازم جانبی': Briefcase,
    'عطر و ادکلن': Heart,
    'صنایع دستی': Hammer,
    'پوشاک': Shirt,
    'کفش': Footprints,
    'اکسسوری': Gem,
    'کیف': Briefcase,
    'صنایع چوبی': Armchair,
    'طلا و جواهر': Gem,
    'صنایع هنری': Palette,
  };
  const Icon = icons[title] || Grid;

  return (
    <div className="flex flex-col items-center gap-3 w-32 shrink-0 cursor-pointer group">
      <div className="w-[128px] h-[128px] rounded-3xl border-2 border-gray-200 flex items-center justify-center transition-all group-hover:border-[#FDD00A] group-hover:bg-[#FDD00A]/10 overflow-hidden relative">
        {icon ? (
          <Image src={icon} alt={title} fill sizes="60px" className="object-cover p-3" unoptimized />
        ) : (
          <Icon className="w-12 h-12 text-[#1F2029]" strokeWidth={1.5} />
        )}
      </div>
      <span className="text-[#1F2029] text-xl font-['PeydaWeb'] font-semibold text-center mt-2">
        {title}
      </span>
    </div>
  );
};

const ProductCardWeb = ({ product }: { product: any }) => (
  <Link href={`/Bazzar/ProductDetails?id=${product.id || 1}`} className="flex flex-col items-center bg-white rounded-xl overflow-hidden w-full max-w-[183px] mx-auto group shadow-sm hover:shadow-md transition-all duration-300 border border-gray-50">
    <div className="w-full aspect-[183/238] relative overflow-hidden bg-gray-100">
      <Image src={product.image || product.image_path || "https://placehold.co/183x238"} alt={product.title} fill sizes="(max-width: 768px) 100vw, 183px" className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
    </div>
    <div className="p-6 flex flex-col items-center gap-2.5 w-full">
      <h3 className="text-[#252B42] text-base font-['PeydaWeb'] font-semibold text-center whitespace-nowrap overflow-hidden text-ellipsis w-full">
        {product.title}
      </h3>
      <p className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold">بخش ویژه</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-[#23856D] text-base font-num-bold">
          {typeof product.price === 'number' ? `${product.price.toLocaleString()} تومان` : product.price || "600,000 تومان"}
        </span>
      </div>
    </div>
  </Link>
);

const ProductCardHorizontal = ({ title, category, price }: { title: string, category: string, price: string }) => (
  <div className="flex flex-col bg-white rounded-xl overflow-hidden w-full max-w-[183px] mx-auto group border border-gray-100">
    <div className="w-full aspect-[183/162] relative overflow-hidden bg-gray-100">
      <Image src="https://placehold.co/183x162" alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
    </div>
    <div className="p-6 flex flex-col items-center gap-2.5 w-full">
      <h3 className="text-[#252B42] text-base font-['PeydaWeb'] font-semibold text-center">{title}</h3>
      <p className="text-[#737373] text-sm font-['PeydaWeb'] font-semibold">{category}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-[#23856D] text-base font-num-bold">{price}</span>
      </div>
    </div>
  </div>
);

export default function HomePageWeb() {
  const [homeData, setHomeData] = useState<BazzarHomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await bazzarService.getHomePageData();
        setHomeData(data);
      } catch (error) {
        console.error('Failed to fetch home data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const specialSaleProducts = products.filter((p) => p.isSpecialSale);
  const newCollectionProducts = products.filter((p) => p.isNewCollection);
  const bestSellerProducts = homeData?.most_sell || [];
  const popularProducts = homeData?.most_view || [];
  const popularSchools = homeData?.popular_schools || [];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center overflow-x-hidden font-medium" dir="rtl">
      {/* 1. Navbar */}
      <header className="w-full max-w-[1440px] px-4 sm:px-8 xl:px-[92px] py-4 lg:py-6 flex flex-col md:flex-row justify-between items-center bg-white z-50 gap-4 md:gap-8 h-auto lg:h-[106px] min-h-[80px]">
        {/* Right Side (First in RTL): Logo */}
        <div className="flex items-center shrink-0 w-full md:w-auto justify-center md:justify-start">
            <Link href="/" className="relative w-[85px] h-[85px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px]">
                <Image src="/navbar-brand.svg" alt="Digikara Logo" fill className="object-contain" unoptimized />
            </Link>
        </div>

        {/* Left Side (Second in RTL): Search and Icons */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-4 lg:gap-6 xl:gap-10 w-full md:flex-1 md:justify-end">
          
          {/* Search Bar */}
          <Link href="/Bazzar/Search" className="flex w-full md:max-w-[350px] lg:max-w-[450px] xl:max-w-[649px] h-11 lg:h-12 px-3 py-3 rounded-lg border border-[#D7D8DA] items-center justify-between bg-gray-50/50 hover:bg-white hover:border-blue-400 transition-colors cursor-text group shrink-1">
              <span className="w-full bg-transparent text-[#707F81] text-[14px] font-light leading-normal pr-2 text-right select-none truncate">جستجو</span>
              <button className="w-8 h-8 shrink-0 flex justify-center items-center rounded-md group-hover:bg-gray-100 transition-colors">
                 <Search02Icon className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] text-[#FDD00A]" strokeWidth={2.5} />
              </button>
          </Link>

          {/* Icons Context */}
          <div className="flex items-center justify-between w-full md:w-auto gap-2 sm:gap-4 lg:gap-[5px] xl:gap-[10px] px-2 md:px-0 shrink-0">
             {/* Icon 1: User */}
             <Link href="/Bazzar/UserProfile" className="p-2 sm:p-3 lg:p-[10px] xl:p-[15px] rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#605F5F]" strokeWidth={1.5} />
             </Link>
             {/* Icon 2: Search (Mobile only, hidden on Desktop if needed) */}
             <Link href="/Bazzar/Search" className="md:hidden p-2 sm:p-3 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <Search02Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#605F5F]" strokeWidth={1.5} />
             </Link>
             {/* Icon 3: Shopping Cart (Blue) */}
             <Link href="/Bazzar/DigiKaraCart" className="p-2 sm:p-3 lg:p-[10px] xl:p-[15px] rounded-full hover:bg-blue-50 flex items-center justify-center transition-colors">
                <ShoppingCart01Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#294CFF]" strokeWidth={1.5} />
             </Link>
             {/* Icon 4: Heart */}
             <Link href="/Bazzar/Favorites" className="p-2 sm:p-3 lg:p-[10px] xl:p-[15px] rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                <FavouriteIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#605F5F]" strokeWidth={1.5} />
             </Link>
          </div>

        </div>
      </header>

      {/* 2. Hero Banner */}
      <section className="w-[calc(100%-2rem)] lg:w-[calc(100%-6rem)] max-w-[1292px] min-h-[622px] mx-auto mt-10 rounded-[20px] bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] relative flex flex-col md:flex-row-reverse justify-between px-6 lg:pl-[100px] lg:pr-0 pt-10 md:pt-0 overflow-hidden shadow-sm items-center md:items-stretch">
        
        {/* Left Side (Text) */}
        <div className="flex flex-col items-center sm:items-end justify-center gap-[30px] z-10 w-full md:w-1/2 text-center sm:text-left pb-10 md:pb-0" dir="ltr">
            <span className="text-[#2A7CC7] text-[16px] font-semibold font-['PeydaFaNum'] leading-[24px] tracking-[0.10px] w-full text-left">بهار 1405</span>
            <h1 className="text-[#252B42] text-[40px] lg:text-[58px] font-black font-['PeydaWeb'] leading-[50px] lg:leading-[80px] tracking-[0.20px] w-full text-left" dir="rtl">مجموعه جدید</h1>
            <p className="text-[#737373] text-[18px] lg:text-[20px] font-semibold font-['PeydaWeb'] leading-[30px] tracking-[0.20px] w-full text-left" dir="rtl">۵۰٪ تخفیف برای اولین معامله</p>
            
            <div className="flex flex-col xl:flex-row gap-[20px] mt-2 w-full sm:w-auto self-start mr-auto">
                <button className="bg-[#FDD00A] text-[#393E46] px-[30px] py-[12px] lg:py-[15px] rounded-[17px] text-[18px] lg:text-[25.81px] font-semibold font-['PeydaWeb'] hover:bg-[#ebd152] transition-colors flex justify-center items-center">
                    همین حالا خرید کنید
                </button>
               
            </div>
        </div>

        {/* Right Side (Image) - Locked to top and bottom */}
        <div className="relative w-full md:w-1/2 h-[400px] md:h-auto min-h-[400px] md:min-h-full flex justify-center items-end md:items-center self-stretch">
             <Image src="/col-md-6.png" alt="Hero Promo" fill className="object-cover md:object-contain object-bottom md:object-center" unoptimized />
        </div>
      </section>

      {/* 3. Categories */}
      <section className="w-full max-w-[1292px] mx-auto mt-16 flex flex-col gap-10 px-4 lg:px-8 xl:px-0">
        <div className="w-full flex justify-between items-center">
            <h2 className="text-black text-2xl font-bold">دسته بندی</h2>
            <button className="text-gray-500 font-light hover:text-black">مشاهده همه</button>
        </div>
        <div className="flex justify-between items-center w-full overflow-x-auto no-scrollbar pb-4 gap-4">
              {loading ? (
                <div className="w-full text-center text-gray-500 py-10">در حال بارگذاری دسته‌بندی‌ها...</div>
             ) : homeData?.categories && homeData.categories.length > 0 ? (
                homeData.categories.slice(0, 8).map((cat) => (
                    <CategoryItemWeb key={cat.id} title={cat.title} icon={cat.icon_path} />
                ))
             ) : (
                <div className="w-full text-center text-gray-500 py-10">دسته‌بندی یافت نشد</div>
             )}
        </div>
      </section>

      {/* 4. Special Sale Background Wrapper */}
      <div className="w-full bg-white mt-20 pt-10 pb-16 border-t border-gray-100 px-4 lg:px-8 xl:px-0">
          <section className="w-full max-w-[1292px] mx-auto flex flex-col items-center gap-10">
              <div className="w-full flex justify-between items-center">
                  <h2 className="text-black text-2xl font-bold">فروش ویژه</h2>
                  <div className="flex items-center gap-4">
                      <span className="text-gray-500 text-2xl font-light">بسته شدن در:</span>
                      <div className="flex items-center gap-2" dir="ltr">
                          <div className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center text-[#21A2FF] text-xl font-num-bold shadow-sm">
                            02
                          </div>
                          <span className="text-black text-lg font-num-bold">:</span>
                          <div className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center text-[#21A2FF] text-xl font-num-bold shadow-sm">
                            12
                          </div>
                          <span className="text-black text-lg font-num-bold">:</span>
                          <div className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center text-[#21A2FF] text-xl font-num-bold shadow-sm">
                            56
                          </div>
                      </div>
                  </div>
              </div>
              <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {(specialSaleProducts.length > 0 ? specialSaleProducts : Array(6).fill({ title: "طراحی گرافیک", price: "600,000 تومان" })).slice(0, 6).map((product, idx) => (
                    <ProductCardWeb key={idx} product={product} />
                ))}
              </div>
              <div className="flex gap-6 mt-8">
                  <button className="bg-[#FDD00A] text-white px-8 py-3 rounded-2xl shadow-[0_15px_30px_rgba(253,208,10,0.4)] text-xl font-medium hover:scale-105 transition-transform">
                      همین حالا خرید کنید
                  </button>
                  <button className="bg-[#FDD00A] text-[#393E46] px-8 py-3 rounded-2xl text-xl font-semibold hover:bg-[#ebd152] transition-colors">
                      محصولات بیشتر
                  </button>
              </div>
          </section>
      </div>

      {/* 5. Shops Grid */}
      <section className="w-full max-w-[1290px] mx-auto mt-16 flex flex-col xl:flex-row-reverse justify-between gap-8 mb-20 px-4 lg:px-8 xl:px-0">
          <div className="w-full xl:w-[389px] h-[400px] xl:h-[796px] shrink-0 relative rounded-[25px] overflow-hidden group cursor-pointer shadow-sm">
              <Image src="https://placehold.co/389x796" alt="Shops Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
                  <h2 className="text-white text-4xl font-black mb-4">حجره ها</h2>
                  <span className="text-yellow-400 text-xl font-num-bold">8 مورد</span>
              </div>
          </div>
          <div className="flex-1 flex flex-col gap-6">
              <div className="flex justify-between items-center border-b-2 border-gray-100 pb-4">
                  <h2 className="text-[#252B42] text-2xl font-bold rtl:text-right">پرفروش ترین ها</h2>
                  <div className="flex items-center gap-2 lg:gap-4 overflow-x-auto no-scrollbar whitespace-nowrap pb-2 ltr:flex-row rtl:flex-row-reverse">
                      <div className="hidden lg:flex ml-4 gap-2 mr-4" dir="ltr">
                           <button className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400">
                               <ChevronLeft className="w-5 h-5" />
                           </button>
                           <button className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400">
                               <ChevronRight className="w-5 h-5" />
                           </button>
                      </div>
                      <button className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg bg-transparent text-[#23A6F0] border border-[#23A6F0] font-semibold text-sm hover:bg-blue-50 transition-colors">حجره ها</button>
                      <button className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-full bg-transparent text-gray-500 font-semibold text-sm hover:bg-gray-100 transition-colors">تیمچه ها</button>
                      <button className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-full bg-transparent text-gray-500 font-semibold text-sm hover:bg-gray-100 transition-colors">مدارس</button>
                  </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                  {loading ? (
                       <div className="col-span-2 lg:col-span-4 text-center text-gray-500 py-4">در حال بارگذاری...</div>
                  ) : bestSellerProducts.length > 0 ? (
                      bestSellerProducts.slice(0, 8).map((p) => (
                          <ProductCardHorizontal key={p.id} title={p.title} category={"حجره"} price={typeof p.price === 'number' ? `${p.price.toLocaleString()} تومان` : p.price ? p.price.toString() : "0 تومان"} />
                      ))
                  ) : (
                      <div className="col-span-2 lg:col-span-4 text-center text-gray-500 py-4">محصولی یافت نشد</div>
                  )}
              </div>
          </div>
      </section>

      {/* 6. Popular Products Blocks */}
      <section className="w-[calc(100%-2rem)] lg:w-[calc(100%-6rem)] max-w-[1295px] mx-auto bg-[#FAFAFA] rounded-[25px] overflow-hidden flex flex-col xl:flex-row shadow-sm mb-20 h-auto xl:h-[784px]">
          <div className="w-full xl:w-[469px] relative order-1 xl:order-1 shrink-0 h-[300px] md:h-[400px] xl:h-[784px]">
               <Image src="https://placehold.co/469x784" alt="Popular Block" fill className="object-cover" unoptimized />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center py-10 xl:py-16 px-4 xl:px-10 gap-10 xl:gap-16 order-2 xl:order-2">
              <div className="flex flex-col md:flex-row gap-10 w-full">
                   {loading ? (
                       <div className="w-full text-center text-gray-500 py-10">در حال بارگذاری...</div>
                   ) : popularProducts.length > 0 ? (
                       popularProducts.slice(0, 2).map((p) => (
                           <div key={p.id} className="w-full max-w-[348px] flex flex-col items-center gap-5 text-center mx-auto">
                               <h3 className="text-[#252B42] text-2xl font-black">{p.title || "محصول محبوب"}</h3>
                               <p className="text-[#737373] text-sm font-light leading-relaxed truncate w-full">
                                   بخش ویژه
                               </p>
                               <div className="w-full h-[226px] relative mt-4">
                                   <Image src={p.image || p.image_path || "https://placehold.co/348x226"} alt={p.title || "Popular"} fill className="object-cover rounded-xl" unoptimized />
                               </div>
                               <p className="text-[#252B42] text-sm font-semibold mt-2">حجره</p>
                               <span className="text-[#737373] text-sm font-num-bold">{p.rating || 0} امتیاز</span>
                               <span className="text-[#23856D] text-base font-num-bold">{typeof p.price === 'number' ? `${p.price.toLocaleString()} تومان` : p.price ? p.price.toString() : "0 تومان"}</span>
                               <div className="flex gap-2">
                                   <div className="w-4 h-4 rounded-full bg-[#23A6F0]"></div>
                                   <div className="w-4 h-4 rounded-full bg-[#23856D]"></div>
                                   <div className="w-4 h-4 rounded-full bg-[#E77C40]"></div>
                                   <div className="w-4 h-4 rounded-full bg-[#252B42]"></div>
                               </div>
                           </div>
                       ))
                   ) : (
                       <div className="w-full text-center text-gray-500 py-10">محصولی یافت نشد</div>
                   )}
              </div>
              {/* Pagination Dots */}
              <div className="flex gap-2 mt-4 items-center h-2">
                  <div className="w-2 h-2 rounded-full bg-[#8F8C86]/20"></div>
                  <div className="w-2 h-2 rounded-full bg-[#8F8C86]/20"></div>
                  <div className="w-5 h-2 rounded-full bg-[#FDD00A]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#8F8C86]/20"></div>
                  <div className="w-2 h-2 rounded-full bg-[#8F8C86]/20"></div>
              </div>
          </div>
      </section>

      {/* 7. Popular Schools */}
      <section className="w-full bg-[#FAFAFA] py-16 px-4 lg:px-8 xl:px-0">
          <div className="w-full max-w-[1297px] mx-auto flex flex-col gap-6">
              <div className="flex justify-between items-center">
                  <h2 className="text-[#0C1415] text-2xl font-bold">مدارس محبوب</h2>
                  <button className="text-[#8E95A2] text-2xl font-medium hover:text-black transition-colors">دیدن همه</button>
              </div>
              <div className="w-full h-0.5 bg-gray-200"></div>
              <div className="flex overflow-x-auto no-scrollbar items-center gap-4 mt-6 pb-4">
                  {loading ? (
                       <div className="w-full text-center text-gray-500 py-4">در حال بارگذاری...</div>
                  ) : popularSchools.length > 0 ? (
                      popularSchools.map((school) => (
                          <div key={school.id} className="flex flex-col items-center gap-4 shrink-0">
                              <div className="w-[189px] h-[176px] relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                  {school.image_path ? (
                                      <Image src={school.image_path} alt={school.name} fill className="object-cover" unoptimized />
                                  ) : (
                                       <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">بدون تصویر</div>
                                  )}
                              </div>
                              <p className="text-[#1F2029] text-xl font-light mt-2">{school.name}</p>
                          </div>
                      ))
                  ) : (
                      !loading && <div className="w-full text-center text-gray-500 py-4">مدرسه‌ای یافت نشد</div>
                  )}
              </div>
          </div>
      </section>

      {/* 8. We love what we do */}
      <section className="w-full max-w-[1289px] mx-auto py-20 flex flex-col lg:flex-row justify-between items-center px-4 lg:px-8 xl:px-0 gap-10">
          <div className="hidden lg:block w-full lg:w-[280px] xl:w-[366px] h-[498px] relative rounded-[25px] overflow-hidden shadow-md shrink-0">
              <Image src="https://placehold.co/366x498" alt="Feature left" fill className="object-cover" unoptimized />
          </div>
          <div className="flex-1 flex flex-col items-center text-center px-4 lg:px-10 gap-4">
              <span className="text-[#FFC938] text-base font-num-bold tracking-wide">محصولات ویژه</span>
              <h2 className="text-[#252B42] text-3xl lg:text-[40px] font-semibold lg:leading-[50px] max-w-sm">ما عاشق کاری هستیم که انجام می دهیم</h2>
              <p className="text-[#737373] text-sm font-light mt-2 max-w-md leading-relaxed">
                  مشکلات در تلاش برای حل تعارض بین دو قلمرو اصلی فیزیک کلاسیک: مکانیک نیوتنی.
              </p>
          </div>
          <div className="hidden lg:block w-full lg:w-[280px] xl:w-[366px] h-[498px] relative rounded-[25px] overflow-hidden shadow-md shrink-0">
              <Image src="https://placehold.co/366x498" alt="Feature right" fill className="object-cover" unoptimized />
          </div>
      </section>

      {/* Footer */}
      <FooterWeb />
    </div>
  );
}

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
import { bazzarService, BazzarHomeData, BazzarProduct } from '../../services/bazzarService';
import { products } from '../../data/product';

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
  const popularSchools = homeData?.popular_schools || [];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center overflow-x-hidden font-['PeydaWeb']" dir="rtl">
      {/* 1. Navbar */}
      <header className="w-full max-w-[1440px] px-8 lg:px-24 py-6 flex flex-col lg:flex-row justify-between items-center bg-white z-50 gap-6 lg:gap-0">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-6 w-full lg:w-auto">
          <div className="flex gap-4">
             <button className="p-3 border-2 border-gray-600 rounded-full hover:bg-gray-50 transition-colors">
                <User className="w-5 h-5 text-gray-700" />
             </button>
             <button className="p-3 border-2 border-gray-600 rounded-full hover:bg-gray-50 transition-colors">
                <Search className="w-5 h-5 text-gray-700" />
             </button>
             <button className="p-3 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
             </button>
             <button className="p-3 border-2 border-gray-600 rounded-full hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5 text-gray-700" />
             </button>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-[400px] xl:w-[650px] max-w-full">
             <div className="w-full h-12 px-4 rounded-xl border border-gray-300 flex items-center justify-between">
                <span className="text-gray-500 font-light text-sm">جستجو</span>
                <Search className="w-5 h-5 text-yellow-500" />
             </div>
          </div>
        </div>
        <div className="flex flex-col items-center shrink-0">
            <span className="text-[#0A33FF] font-black text-3xl tracking-tight">دیجی کارا</span>
            <div className="flex mt-1 opacity-80">
                <div className="w-2 h-2 bg-yellow-400 mx-0.5"></div>
                <div className="w-2 h-2 bg-blue-600 mx-0.5"></div>
            </div>
        </div>
      </header>

      {/* 2. Hero Banner */}
      <section className="w-[calc(100%-2rem)] lg:w-[calc(100%-6rem)] max-w-[1292px] min-h-[622px] mx-auto mt-10 rounded-[20px] bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] relative flex flex-col md:flex-row justify-center md:items-center px-8 lg:px-16 xl:px-32 py-10 lg:py-0 overflow-hidden shadow-sm">
        <div className="flex flex-col items-start gap-6 z-10 w-full md:w-1/2">
          <span className="text-[#2A7CC7] text-lg font-num-bold tracking-wide">بهار 1405</span>
          <h1 className="text-[#252B42] text-4xl lg:text-[58px] font-black lg:leading-[80px]">مجموعه جدید</h1>
          <p className="text-[#737373] text-lg lg:text-xl font-semibold mb-2">۵۰٪ تخفیف برای اولین معامله</p>
          <div className="flex flex-col xl:flex-row gap-4">
             <button className="bg-[#FDD00A] text-white px-6 xl:px-8 py-3 xl:py-4 rounded-2xl shadow-[0_15px_30px_rgba(253,208,10,0.4)] text-lg xl:text-2xl font-medium hover:scale-105 transition-transform whitespace-nowrap">
               همین حالا خرید کنید
             </button>
             <button className="bg-[#FDD00A] text-[#393E46] px-6 xl:px-8 py-3 xl:py-4 rounded-2xl text-lg xl:text-2xl font-semibold hover:bg-[#ebd152] transition-colors whitespace-nowrap">
               همین حالا خرید کنید
             </button>
          </div>
        </div>
        <div className="absolute left-0 top-0 w-1/2 h-full hidden md:flex justify-center items-center">
             <div className="relative w-[300px] h-[300px] xl:w-[500px] xl:h-[500px] bg-white/40 rounded-full flex justify-center items-center">
                 <Image src="https://placehold.co/696x699" alt="Hero Promo" fill className="absolute object-contain -left-10 z-10 scale-125" sizes="(max-width: 1280px) 300px, 500px" unoptimized />
                 <div className="absolute w-20 h-20 bg-white rounded-full -top-10 left-10"></div>
                 <div className="absolute w-4 h-4 bg-purple-400 rounded-full bottom-10 right-20"></div>
             </div>
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
             ) : (
                homeData?.categories?.slice(0, 8).map((cat) => (
                    <CategoryItemWeb key={cat.id} title={cat.title} icon={cat.icon_path} />
                )) || (
                    <>
                      {['لوازم جانبی', 'عطر و ادکلن', 'صنایع دستی', 'پوشاک', 'کفش', 'اکسسوری', 'کیف', 'صنایع چوبی'].map(title => (
                          <CategoryItemWeb key={title} title={title} />
                      ))}
                    </>
                )
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
      <section className="w-full max-w-[1290px] mx-auto mt-16 flex flex-col xl:flex-row justify-between gap-8 mb-20 px-4 lg:px-8 xl:px-0">
          <div className="w-full xl:w-[389px] h-[400px] xl:h-[796px] shrink-0 relative rounded-[25px] overflow-hidden group cursor-pointer shadow-sm">
              <Image src="https://placehold.co/389x796" alt="Shops Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
                  <h2 className="text-white text-4xl font-black mb-4">حجره ها</h2>
                  <span className="text-yellow-400 text-xl font-num-bold">8 مورد</span>
              </div>
          </div>
          <div className="flex-1 flex flex-col gap-6">
              <div className="flex justify-between items-center border-b-2 border-gray-100 pb-4">
                  <h2 className="text-[#252B42] text-2xl font-bold">پرفروش ترین ها</h2>
                  <div className="flex items-center gap-2 lg:gap-4 overflow-x-auto no-scrollbar whitespace-nowrap pb-2">
                      <button className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg bg-transparent text-[#23A6F0] border border-[#23A6F0] font-semibold text-sm hover:bg-blue-50 transition-colors">حجره ها</button>
                      <button className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-full bg-transparent text-gray-500 font-semibold text-sm hover:bg-gray-100 transition-colors">تیمچه ها</button>
                      <button className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-full bg-transparent text-gray-500 font-semibold text-sm hover:bg-gray-100 transition-colors">مدارس</button>
                      <div className="hidden lg:flex ml-4 gap-2" dir="ltr">
                           <button className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400">
                               <ChevronLeft className="w-5 h-5" />
                           </button>
                           <button className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400">
                               <ChevronRight className="w-5 h-5" />
                           </button>
                      </div>
                  </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                  {[
                      { title: "طراحی وب", cat: "بخش فارسی" },
                      { title: "مدیریت پروژه", cat: "بخش عربی" },
                      { title: "تحلیل داده", cat: "بخش فرانسوی" },
                      { title: "تحلیل داده", cat: "بخش فرانسوی" },
                      { title: "طراحی گرافیک", cat: "بخش انگلیسی" },
                      { title: "طراحی گرافیک", cat: "بخش انگلیسی" },
                      { title: "طراحی گرافیک", cat: "بخش انگلیسی" },
                      { title: "طراحی گرافیک", cat: "بخش انگلیسی" },
                  ].map((p, i) => (
                      <ProductCardHorizontal key={i} title={p.title} category={p.cat} price="600,000 تومان" />
                  ))}
              </div>
          </div>
      </section>

      {/* 6. Popular Products Blocks */}
      <section className="w-[calc(100%-2rem)] lg:w-[calc(100%-6rem)] max-w-[1295px] mx-auto bg-[#FAFAFA] rounded-[25px] overflow-hidden flex flex-col xl:flex-row shadow-sm mb-20 h-auto xl:h-[784px]">
          <div className="flex-1 flex flex-col justify-center items-center py-10 xl:py-16 px-4 xl:px-10 gap-10 xl:gap-16 order-2 xl:order-1">
              <div className="flex flex-col md:flex-row gap-10 w-full">
                   {/* Card 1 */}
                   <div className="w-full max-w-[348px] flex flex-col items-center gap-5 text-center mx-auto">
                       <h3 className="text-[#252B42] text-2xl font-black">محصول محبوب</h3>
                       <p className="text-[#737373] text-sm font-light leading-relaxed">
                           ما بر ارگونومی تمرکز می کنیم و شما را در محل کارتان ملاقات می کنیم. این فقط یک ضربه کلید است.
                       </p>
                       <div className="w-full h-[226px] relative mt-4">
                           <Image src="https://placehold.co/348x226" alt="Popular" fill className="object-cover rounded-xl" unoptimized />
                       </div>
                       <p className="text-[#252B42] text-sm font-semibold mt-2">بخش انگلیسی</p>
                       <span className="text-[#737373] text-sm font-num-bold">15 فروش</span>
                       <span className="text-[#23856D] text-base font-num-bold">600,000 تومان</span>
                       <div className="flex gap-2">
                           <div className="w-4 h-4 rounded-full bg-[#23A6F0]"></div>
                           <div className="w-4 h-4 rounded-full bg-[#23856D]"></div>
                           <div className="w-4 h-4 rounded-full bg-[#E77C40]"></div>
                           <div className="w-4 h-4 rounded-full bg-[#252B42]"></div>
                       </div>
                   </div>
                   {/* Card 2 */}
                   <div className="w-full max-w-[348px] flex flex-col items-center gap-5 text-center mx-auto">
                       <h3 className="text-[#252B42] text-2xl font-black">محصول محبوب</h3>
                       <p className="text-[#737373] text-sm font-light leading-relaxed">
                           ما بر ارگونومی تمرکز می کنیم و شما را در محل کارتان ملاقات می کنیم. این فقط یک ضربه کلید است.
                       </p>
                       <div className="w-full h-[226px] relative mt-4">
                           <Image src="https://placehold.co/348x226" alt="Popular" fill className="object-cover rounded-xl" unoptimized />
                       </div>
                       <p className="text-[#252B42] text-sm font-semibold mt-2">بخش انگلیسی</p>
                       <span className="text-[#737373] text-sm font-num-bold">15 فروش</span>
                       <span className="text-[#23856D] text-base font-num-bold">600,000 تومان</span>
                       <div className="flex gap-2">
                           <div className="w-4 h-4 rounded-full bg-[#23A6F0]"></div>
                           <div className="w-4 h-4 rounded-full bg-[#23856D]"></div>
                           <div className="w-4 h-4 rounded-full bg-[#E77C40]"></div>
                           <div className="w-4 h-4 rounded-full bg-[#252B42]"></div>
                       </div>
                   </div>
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
          <div className="w-full xl:w-[469px] relative order-1 xl:order-2 shrink-0 h-[300px] md:h-[400px] xl:h-full">
               <Image src="https://placehold.co/469x784" alt="Popular Block" fill className="object-cover" unoptimized />
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
                  {(popularSchools.length > 0 ? popularSchools : Array(6).fill({ name: "هنرستان دخترانه", tag: "فلسفه هنر" })).slice(0, 6).map((school, i) => (
                      <div key={i} className="flex flex-col items-center gap-4 shrink-0">
                          <div className="w-[189px] h-[176px] relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                              <Image src={school.image_path || "https://placehold.co/189x177"} alt={school.name} fill className="object-cover" unoptimized />
                          </div>
                          <p className="text-[#1F2029] text-xl font-light mt-2">{school.name}</p>
                          <p className="text-[#1F2029] text-xl font-bold">{school.tag || "هنرستان آزاد"}</p>
                      </div>
                  ))}
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

      {/* 9. Footer */}
      <footer className="w-full bg-[#FAFAFA] flex flex-col items-center relative overflow-hidden">
          <div className="w-full h-[142px] bg-[#FAFAFA] border-b border-gray-200">
             <div className="w-full max-w-[1290px] mx-auto h-full flex justify-between items-center">
                 <div className="flex flex-col items-center relative gap-2 mt-4">
                    <span className="text-[#0A33FF] font-black text-3xl tracking-tight z-10 w-full text-center">دیجی کارا</span>
                    <div className="flex items-center gap-1 opacity-80 z-10 mx-auto justify-center">
                        <div className="w-2 h-2 bg-yellow-400"></div>
                        <div className="w-2 h-2 bg-blue-600"></div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="text-gray-400 hover:text-[#0A33FF] transition-colors"><Facebook className="w-6 h-6" /></button>
                    <button className="text-gray-400 hover:text-[#0A33FF] transition-colors"><Instagram className="w-6 h-6" /></button>
                    <button className="text-gray-400 hover:text-[#0A33FF] transition-colors"><Twitter className="w-6 h-6" /></button>
                </div>
             </div>
          </div>
          <div className="w-full bg-white flex justify-center py-20 px-8">
              <div className="w-full max-w-[1440px] flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-10">
                  <div className="flex flex-col w-full lg:w-[300px] gap-4 shrink-0 mt-2">
                       <h3 className="text-[#252B42] text-lg font-bold">در تماس باشید</h3>
                       <div className="flex w-full mt-2 shadow-sm rounded-lg overflow-hidden border border-gray-200">
                           <input type="email" placeholder="ایمیل شما" className="w-full px-4 py-4 bg-gray-50 text-gray-700 text-sm font-light focus:outline-none" />
                           <button className="bg-[#FFC938] text-black px-6 font-black whitespace-nowrap text-sm hover:bg-[#e6b532] transition-colors">مشترک شوید</button>
                       </div>
                       <p className="text-[#737373] text-sm font-light leading-snug mt-1">لورم ایپسوم متن ساختگی با تولید سادگی</p>
                  </div>
                  <div className="flex flex-wrap justify-between flex-1 max-w-[800px] gap-10 lg:gap-4 w-full">
                      <div className="flex flex-col gap-4 text-left mr-auto min-w-[100px]">
                          <h3 className="text-[#252B42] text-lg font-bold">قانونی</h3>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">درباره ما</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">حامل</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">ما استخدام می کنیم</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">وبلاگ</Link>
                      </div>
                      <div className="flex flex-col gap-4 text-left mr-auto">
                          <h3 className="text-[#252B42] text-lg font-bold">منابع</h3>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">IOS و Android</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">دمو تماشا کنید</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">مشتریان</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">API</Link>
                      </div>
                      <div className="flex flex-col gap-4 text-left mr-auto">
                          <h3 className="text-[#252B42] text-lg font-bold">امکانات</h3>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">بازاریابی کسب و کار</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">تحلیل کاربر</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">چت زنده</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">پشتیبانی نامحدود</Link>
                      </div>
                      <div className="flex flex-col gap-4 text-left mr-auto">
                          <h3 className="text-[#252B42] text-lg font-bold">اطلاعات شرکت</h3>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">درباره ما</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">حامل</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">ما استخدام می کنیم</Link>
                          <Link href="#" className="text-[#737373] text-base font-semibold hover:text-black">وبلاگ</Link>
                      </div>
                  </div>
              </div>
          </div>
          <div className="w-full bg-[#FAFAFA] py-6 flex justify-center border-t border-gray-100">
               <p className="text-[#737373] text-base font-semibold text-center w-full">ساخته شده با عشق توسط نوید تمام حقوق محفوظ است</p>
          </div>
      </footer>
    </div>
  );
}

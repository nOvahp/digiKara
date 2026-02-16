'use client';

import React, { useState } from 'react';
import { Search, MapPin, X, TrendingUp, Zap, Sparkles, Star, ThumbsUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, Product } from '@/app/data/product';

const CITIES = [
  'تهران',
  'مشهد',
  'اصفهان',
  'شیراز',
  'تبریز',
  'کرج',
  'اهواز',
  'قم',
  'رشت',
  'کرمانشاه',
];

const ProductSection = ({
  title,
  icon: Icon,
  items,
  color = '#E9B443',
}: {
  title: string;
  icon: React.ElementType;
  items: Product[];
  color?: string;
}) => {
  if (items.length === 0) return null;
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4" style={{ color: color }}>
        <Icon size={20} />
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((product) => (
          <Link
            key={product.id}
            href={`/Bazzar/ProductDetails?id=${product.id}`}
            className="flex flex-col gap-3 group bg-white rounded-2xl border border-gray-100 p-3 hover:shadow-lg transition-all hover:-translate-y-1 block"
          >
            <div className="relative aspect-square w-full bg-gray-50 rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-gray-800 text-sm line-clamp-2 min-h-[40px]">
                {product.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-start">
                  {product.isSpecialSale && (
                    <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold mb-1">
                      فروش ویژه
                    </span>
                  )}
                  <span className="text-sm font-bold text-[#E9B443]">{product.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function SearchStartPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('تهران');
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  // Derived state for different categories
  const popularProducts = products.filter((p) => p.isPopular).slice(0, 4);
  const specialSaleProducts = products.filter((p) => p.isSpecialSale).slice(0, 4);
  const newCollectionProducts = products.filter((p) => p.isNewCollection).slice(0, 4);
  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 4);
  const suggestedProducts = products.filter((p) => p.isSuggested).slice(0, 4);

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      router.push(
        `/Bazzar/Search?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`,
      );
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Header / Search Bar Section */}
      <div className="w-full bg-white shadow-sm p-4 z-10 sticky top-0">
        <div className="max-w-3xl mx-auto flex flex-col gap-3" dir="rtl">
          {/* Title & Close Row */}
          <div className="flex items-center justify-between px-1">
            <h1 className="font-bold text-lg text-gray-800">محصول مورد نظرت رو پیدا کن</h1>
            <button
              onClick={handleClose}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Search Input Container */}
          <div className="w-full relative h-12 sm:h-14 bg-gray-50 rounded-xl flex items-center px-2 border border-gray-200 focus-within:border-[#E9B443] transition-all">
            {/* Search Button */}
            <button
              onClick={() => handleSearch()}
              className="p-2 text-gray-400 hover:text-[#E9B443] transition-colors"
            >
              <Search size={22} />
            </button>

            <Input
              className="flex-1 h-full border-none shadow-none focus-visible:ring-0 text-right bg-transparent placeholder:text-gray-400 font-medium text-[10px] sm:text-base"
              placeholder="جستجو در محصولات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              autoFocus
            />

            <div className="w-px h-6 bg-gray-300 mx-2"></div>

            {/* Location */}
            <div className="relative">
              <div
                className="flex items-center gap-1 cursor-pointer text-gray-600 hover:text-gray-900 px-2"
                onClick={() => setShowLocationMenu(!showLocationMenu)}
              >
                <span className="text-sm font-bold w-12 text-center truncate">{location}</span>
                <MapPin size={18} className="text-gray-500" />
              </div>

              {/* Dropdown */}
              {showLocationMenu && (
                <div className="absolute top-12 left-0 w-32 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 z-50 flex flex-col gap-1 max-h-64 overflow-y-auto">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      className={`w-full text-right px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${location === city ? 'text-[#E9B443] font-bold' : 'text-gray-600'}`}
                      onClick={() => {
                        setLocation(city);
                        setShowLocationMenu(false);
                      }}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-y-auto w-full" dir="rtl">
        <div className="max-w-3xl mx-auto p-4 sm:p-6 pb-20">
          <ProductSection title="محصولات پرطرفدار" icon={TrendingUp} items={popularProducts} />

          <ProductSection
            title="فروش ویژه"
            icon={Zap}
            items={specialSaleProducts}
            color="#EF4444"
          />

          <ProductSection
            title="جدیدترین‌ها"
            icon={Sparkles}
            items={newCollectionProducts}
            color="#8B5CF6"
          />

          <ProductSection
            title="پرفروش‌ترین‌ها"
            icon={Star}
            items={bestSellerProducts}
            color="#F59E0B"
          />

          <ProductSection
            title="پیشنهاد ما"
            icon={ThumbsUp}
            items={suggestedProducts}
            color="#10B981"
          />
        </div>
      </div>
    </div>
  );
}

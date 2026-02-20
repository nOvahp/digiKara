'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useFavorites } from '../FavoritesContext';
import { useCart } from '../CartContext';
import { toast } from 'sonner';

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();

  const handleAddToCart = (favorite: any) => {
    addItem({
      id: favorite.id,
      name: favorite.title,
      shopName: 'فروشگاه دیجی کارا',
      price: favorite.price,
      image: favorite.image,
    });
  };

  return (
    <div
      className="w-full min-h-screen  flex flex-col items-center relative"
      dir="rtl"
    >
      {/* Header */}
      <div className="w-full max-w-[440px] sticky top-0 z-50 flex justify-between items-center px-4 py-4 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-[#0C1415] text-[18px]  font-bold">علاقه‌مندی‌ها</h1>
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-transparent hover:bg-gray-100 border border-transparent hover:border-gray-200 flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-[440px] flex-1 px-4 pb-32 pt-6">
        {favorites.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-300" strokeWidth={1.5} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-[#0C1415] text-lg  font-bold">
                لیست علاقه‌مندی‌ها خالی است
              </h3>
              <p className="text-[#707F81] text-sm  leading-relaxed px-8">
                محصولات مورد علاقه خود را با کلیک بر روی آیکون قلب در صفحه محصول به لیست اضافه کنید.
              </p>
            </div>
            <button
              onClick={() => router.push('/Bazzar')}
              className="mt-4 px-8 py-3 bg-[#FDD00A] text-[#1A1C1E] rounded-xl text-sm  font-bold shadow-md active:scale-95 transition-all hover:bg-[#e5bc09]"
            >
              مشاهده محصولات
            </button>
          </div>
        ) : (
          // Products List - Horizontal Cards
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#707F81] text-sm font-medium">
                {favorites.length} محصول
              </p>
            </div>

            <div className="flex flex-col bg-white">
              {favorites.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative ${index !== favorites.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="flex items-stretch min-h-[150px] py-4">
                    {/* Image - Right Side */}
                    <Link href={`/Bazzar/ProductDetails?id=${item.id}`} className="relative w-[140px] shrink-0 pl-4">
                      <div className="relative w-full h-full bg-gray-100 rounded-xl overflow-hidden">
                        <Image
                          src={item.image || '/ProductBazzar.png'}
                          alt={item.title}
                          fill
                          sizes="140px"
                          className="object-cover"
                          unoptimized
                        />
                        {/* Discount Badge */}
                        {item.discount && item.discount !== '0' && item.discount !== '0.00' && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-lg font-num-medium">
                            {item.discount}%
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Product Info - Left Side */}
                    <div className="flex-1 pr-4 flex flex-col justify-between">
                      <Link href={`/Bazzar/ProductDetails?id=${item.id}`} className="flex-1">
                        <div className="flex flex-col gap-2 h-full">
                          {/* Title */}
                          <h3 className="text-[#0C1415] text-sm font-bold line-clamp-2">
                            {item.title}
                          </h3>

                          {/* Stock Status */}
                          <div className="flex flex-col gap-1">
                            {item.inventory !== undefined && item.inventory < 5 && item.inventory > 0 && (
                              <span className="text-red-500 text-[10px] font-medium">
                                تنها {item.inventory} عدد باقیست
                              </span>
                            )}
                            {item.inventory === 0 && (
                              <span className="text-red-500 text-xs font-medium">
                                ناموجود
                              </span>
                            )}
                          </div>

                          {/* Price */}
                          <div className="mt-auto">
                            <span className="text-[#0C1415] text-lg font-num-bold">
                              {item.price?.toLocaleString()} ریال
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={item.inventory === 0}
                          className={`flex-1 h-9 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition-all active:scale-95 ${
                            item.inventory === 0
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-[#FDD00A] text-[#1A1C1E] hover:bg-[#e5bc09]'
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>افزودن به سبد</span>
                        </button>
                        <button
                          onClick={() => {
                            removeFavorite(item.id);
                            toast.success('محصول از علاقه‌مندی‌ها حذف شد', { duration: 2000 });
                          }}
                          className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-all active:scale-95"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Bookmark, Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { useCart } from './CartContext';
import {
  bazzarService,
  BazzarProductDetail,
  BazzarProduct,
  BazzarPriceVariant,
} from '../services/bazzarService';

const PRODUCT_IMAGE_PLACEHOLDER = '/ProductDetails.png';

const Skeleton = ({ className }: { className: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

export default function ProductDetails() {
  const { addItem } = useCart();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [product, setProduct] = useState<BazzarProductDetail | null>(null);
  const [similarProducts, setSimilarProducts] = useState<BazzarProduct[]>([]);
  const [selectedPriceId, setSelectedPriceId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await bazzarService.getProductDetails(parseInt(id));

        setProduct(data.product);
        setSimilarProducts(data.similar_products || []);

        // Set default selected price variant
        if (data.product.prices && data.product.prices.length > 0) {
          setSelectedPriceId(data.product.prices[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch product details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    document.body.classList.add('full-width');
    return () => {
      document.body.classList.remove('full-width');
    };
  }, []);

  const showPlaceholder = loading || !product;

  // Derived state for current price/variant
  const selectedVariant = product?.prices?.find((p) => p.id === selectedPriceId);

  // Fallback logic for display values
  const currencyFormatter = (val: number | string | undefined) => {
    if (val === undefined || val === null) return '-';
    if (typeof val === 'number') return `${val.toLocaleString()} ریال`;
    return val.toString(); // API might send string formatted
  };

  const currentPrice = selectedVariant ? selectedVariant.amount : product?.price;
  const currentInventory = selectedVariant ? selectedVariant.inventory : product?.inventory;
  const currentDiscount = selectedVariant ? selectedVariant.discount_percent : product?.discount; // Assuming product level discount if exists (not in interface currently but safe to fallback)

  const productImage = product?.image_path || PRODUCT_IMAGE_PLACEHOLDER;

  return (
    <div className="w-full flex justify-center min-h-screen">
      <div className="w-full max-w-[440px] relative flex flex-col overflow-hidden pb-[100px]">
        {/* Header Image Area */}
        <div className="relative w-full h-[443px] bg-gray-100">
          {!showPlaceholder && productImage ? (
            <Image
              src={productImage}
              alt={product?.title || 'Product'}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 animate-pulse">
              <div className="text-gray-400">تصویر محصول</div>
            </div>
          )}

          {/* Header Controls (Overlay) */}
          <div className="absolute top-0 left-0 w-full p-0 flex justify-between items-center z-10 pt-4 px-6">
            <Link href="/Bazzar">
              <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-white transition-colors">
                <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={2} />
              </div>
            </Link>

            <span className="text-white text-lg font-['PeydaWeb'] font-bold drop-shadow-md">
              جزئیات محصول
            </span>

            <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-white transition-colors">
              <Bookmark className="w-5 h-5 text-[#0C1415]" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col px-[8%] pt-6 gap-6" dir="rtl">
          {/* Title & Rating */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              {showPlaceholder ? (
                <Skeleton className="h-4 w-24" />
              ) : (
                <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">
                  {product?.code ? `کد: ${product.code}` : 'محصول باکیفیت'}
                </span>
              )}

              <div className="flex items-center gap-1">
                {showPlaceholder ? (
                  <Skeleton className="h-4 w-8" />
                ) : (
                  <span className="text-[#707F81] text-sm font-num-medium">
                    {product?.rating || 0}
                  </span>
                )}
                <Star className="w-4 h-4 text-[#FDD00A] fill-[#FDD00A]" />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {showPlaceholder ? (
                <Skeleton className="h-8 w-3/4" />
              ) : (
                <h1 className="text-[#0C1415] text-lg font-['PeydaWeb'] font-bold leading-relaxed">
                  {product?.title}
                </h1>
              )}

              {/* Tags or inventory status can go here */}
              {!showPlaceholder &&
                currentInventory !== undefined &&
                currentInventory < 5 &&
                currentInventory > 0 && (
                  <div className="bg-red-50 px-2 py-0.5 rounded-md">
                    <span className="text-red-500 text-[10px] font-medium">
                      تنها {currentInventory} عدد باقیست
                    </span>
                  </div>
                )}
            </div>
          </div>

          {/* Stats & Identifiers */}
          <div className="flex items-center justify-between w-full mt-2">
            {/* Price Display in Body */}
            <div className="flex flex-col">
              {!showPlaceholder && (
                <div className="flex items-center gap-2">
                  <span className="text-[#0C1415] text-xl font-num-medium font-bold">
                    {currencyFormatter(currentPrice)}
                  </span>
                  {currentDiscount && currentDiscount !== '0' && currentDiscount !== '0.00' && (
                    <div className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-num-medium">
                      {currentDiscount}%
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Social Stats */}
            <div className="flex items-center gap-4 text-xs text-[#707F81]">
              <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="font-num-medium text-[#0C1415]">{product?.view_count || 0}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                <Heart className="w-4 h-4 text-gray-400" />
                <span className="font-num-medium text-[#0C1415]">{product?.like_count || 0}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold ">
              جزییات محصول
            </h3>
            {showPlaceholder ? (
              <>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </>
            ) : (
              <p className="text-[#707F81] text-sm font-['PeydaWeb'] font-light leading-6 text-justify break-words">
                {product?.description || 'توضیحاتی برای این محصول ثبت نشده است.'}
              </p>
            )}
          </div>

          <div className="w-full h-px bg-gray-100" />

          {/* Variants Selection (Prices) */}
          {!showPlaceholder && product?.prices && product.prices.length > 0 && (
            <>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-base font-['PeydaWeb'] font-semibold">
                    <span className="text-[#0C1415]">انتخاب گزینه: </span>
                    <span className="text-[#2F51FF] text-sm">{selectedVariant?.title || '-'}</span>
                  </div>
                  {selectedVariant && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        تخفیف: {selectedVariant.discount_percent}%
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full ${selectedVariant.inventory > 0 ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}
                      >
                        موجودی: {selectedVariant.inventory}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.prices.map((variant) => (
                    <div
                      key={variant.id}
                      onClick={() => setSelectedPriceId(variant.id)}
                      className={`
                                                px-4 py-2 rounded-xl border flex flex-col items-center cursor-pointer transition-all relative
                                                ${
                                                  selectedPriceId === variant.id
                                                    ? 'border-[#0C1415] bg-[#F8F9FA]'
                                                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                                                }
                                            `}
                    >
                      <span className="text-xs font-['PeydaWeb'] font-medium">{variant.title}</span>
                      {variant.discount_percent && variant.discount_percent !== '0.00' && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                          %
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-px bg-gray-100" />
            </>
          )}

          {/* Reviews - Placeholder for now as API doesn't return them in detail yet */}
          {product?.reviews && product.reviews.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">
                نظرات خریداران
              </h3>
              {/* ... Review UI logic if needed ... */}
              <p className="text-sm text-gray-500 text-center font-['PeydaWeb']">
                هنوز نظری ثبت نشده است.
              </p>
            </div>
          )}

          {/* Similar Products */}
          <div className="flex flex-col gap-4 pb-6" dir="rtl">
            <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">
              محصولات مشابه
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mr-[8%] pr-[8%]">
              {loading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-start gap-2 w-[140px] shrink-0">
                    <Skeleton className="w-[140px] h-[120px] rounded-lg" />
                    <Skeleton className="w-2/3 h-4" />
                    <Skeleton className="w-1/2 h-3" />
                  </div>
                ))
              ) : similarProducts.length > 0 ? (
                similarProducts.map((simProduct) => (
                  <Link
                    href={`/Bazzar/ProductDetails?id=${simProduct.id}`}
                    key={simProduct.id}
                    className="flex flex-col items-start gap-2 w-[140px] shrink-0 cursor-pointer"
                  >
                    <div className="relative w-[140px] h-[120px] bg-[#F6F6F6] rounded-lg overflow-hidden">
                      <Image
                        src={simProduct.image_path || simProduct.image || '/ProductBazzar.png'}
                        alt={simProduct.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="w-full flex flex-col items-start gap-1">
                      <h3 className="text-[#1F2029] text-xs font-['PeydaWeb'] font-light text-right">
                        {simProduct.title}
                      </h3>
                      <span className="text-[#1F2029] text-xs font-num-medium">
                        {currencyFormatter(simProduct.price)}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <span className="text-gray-400 text-sm">محصول مشابهی یافت نشد.</span>
              )}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 w-full max-w-[440px] bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-2xl z-50">
          <div className="flex items-center justify-between gap-4">
            {/* Price */}
            <div className="flex flex-col items-end">
              <span className="text-[#707F81] text-xs font-['PeydaFaNum']">هزینه نهایی</span>
              {showPlaceholder ? (
                <Skeleton className="h-5 w-24" />
              ) : (
                <div className="flex flex-col items-end">
                  <span className="text-[#0C1415] text-base font-num-medium">
                    {currencyFormatter(currentPrice)}
                  </span>
                  {currentDiscount && currentDiscount !== '0' && currentDiscount !== '0.00' && (
                    <span className="text-red-500 text-xs font-num-medium line-through">
                      {/* Calculate original price if needed or just show discount percent */}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              disabled={
                showPlaceholder ||
                (currentInventory !== undefined && currentInventory <= 0) ||
                loading
              }
              onClick={async () => {
                if (!product) return;

                try {
                  setLoading(true);
                  // Step 1: Call API
                  await bazzarService.addToCart(product.id, selectedPriceId || undefined);

                  // Step 2: Update Local Cart (Optional/Visual)
                  const priceVal = currentPrice || 0;

                  addItem({
                    id: product.id,
                    name: product.title + (selectedVariant ? ` - ${selectedVariant.title}` : ''),
                    shopName: 'فروشنده نمونه',
                    price: priceVal,
                    image: productImage,
                  });

                  // Feedback
                  alert('محصول با موفقیت به سبد خرید اضافه شد'); // Using alert for now, should use toast in real app
                } catch (error) {
                  console.error('Add to cart failed', error);
                  alert('خطا در افزودن به سبد خرید');
                } finally {
                  setLoading(false);
                }
              }}
              className={`flex-1 bg-[#FDD00A] h-12 rounded-xl flex items-center justify-center gap-2 transition-colors ${showPlaceholder || (currentInventory !== undefined && currentInventory <= 0) || loading ? 'opacity-50 cursor-not-allowed bg-gray-300' : 'hover:bg-[#EAC009]'}`}
            >
              <span className="text-[#1A1C1E] text-base font-['PeydaWeb'] font-semibold">
                {loading
                  ? 'در حال انجام...'
                  : currentInventory !== undefined && currentInventory <= 0
                    ? 'ناموجود'
                    : 'افزودن به سبد خرید'}
              </span>
              {!loading && <ShoppingBag className="w-5 h-5 text-[#0A0A0A]" />}
            </button>
          </div>

          {/* iOS Indicator */}
          <div className="w-full flex justify-center mt-3">
            <div className="w-[134px] h-[5px] bg-black rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

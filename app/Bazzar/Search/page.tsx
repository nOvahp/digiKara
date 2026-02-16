'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Search as SearchIcon, MapPin, Filter, X } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import FilterModal from '../../components/FilterModal';
import ActiveFilters from '../../components/ActiveFilters';
import { bazzarService, BazzarProduct, BazzarCategory } from '../../services/bazzarService';

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

// Skeleton Component
const ProductSkeleton = () => (
  <div className="flex flex-col gap-2 w-full animate-pulse">
    <div className="relative w-full aspect-[170/150] bg-gray-200 rounded-lg"></div>
    <div className="flex flex-col gap-1 w-full">
      <div className="h-3 bg-gray-200 rounded w-20 self-end mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-16 self-start"></div>
    </div>
  </div>
);

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';

  // State
  const [products, setProducts] = useState<BazzarProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState<BazzarCategory[]>([]);

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: searchParams.get('min_price') || '',
    maxPrice: searchParams.get('max_price') || '',
    categoryId: searchParams.get('category_id') ? Number(searchParams.get('category_id')) : null,
  });
  const [perPage, setPerPage] = useState<number | null>(
    searchParams.get('perPage') ? Number(searchParams.get('perPage')) : null,
  );

  // Sync filters with URL params (e.g. on back button or initial load)
  useEffect(() => {
    setFilters({
      minPrice: searchParams.get('min_price') || '',
      maxPrice: searchParams.get('max_price') || '',
      categoryId: searchParams.get('category_id') ? Number(searchParams.get('category_id')) : null,
    });
    setPerPage(searchParams.get('perPage') ? Number(searchParams.get('perPage')) : null);
  }, [searchParams]);

  // Fetch Categories on Mount for Filter
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await bazzarService.getHomePageData();
        if (data && data.categories) {
          setCategories(data.categories);
        }
      } catch (e) {
        console.error('Failed to fetch categories', e);
      }
    };
    fetchCats();
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Determine category ID: from filters or fallback to URL param if we added that support
        // For now relying on local filter state + query param

        const response = await bazzarService.getProducts({
          page: page,
          search: query,
          category_id: filters.categoryId,
          min_price: filters.minPrice ? Number(filters.minPrice) : null,
          max_price: filters.maxPrice ? Number(filters.maxPrice) : null,
          perPage: perPage,
        });

        if (response && response.data) {
          if (page === 1) {
            setProducts(response.data);
          } else {
            setProducts((prev) => [...prev, ...response.data]);
          }

          // Simple check for "has more" - if we got less than requested, no more pages
          // Defaulting to 10 if perPage not set
          const limit = perPage || 10;
          if (response.data.length < limit) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        } else {
          if (page === 1) setProducts([]);
          setHasMore(false);
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
        if (page === 1) setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce if needed, but for now simple fetch
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [query, page, filters, perPage]); // Re-fetch on query, page, or filter change

  // Reset page when query/filters/perPage change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [query, filters, perPage]);

  const updateUrl = (newFilters: typeof filters, newPerPage: number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newFilters.categoryId) params.set('category_id', newFilters.categoryId.toString());
    else params.delete('category_id');

    if (newFilters.minPrice) params.set('min_price', newFilters.minPrice);
    else params.delete('min_price');

    if (newFilters.maxPrice) params.set('max_price', newFilters.maxPrice);
    else params.delete('max_price');

    if (newPerPage) params.set('perPage', newPerPage.toString());
    else params.delete('perPage');

    router.push(`/Bazzar/Search?${params.toString()}`);
  };

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setShowFilters(false);
    updateUrl(newFilters, perPage);
  };

  const handlePerPageChange = (val: number | null) => {
    setPerPage(val);
    updateUrl(filters, val);
  };

  // Location State
  const [location, setLocation] = useState('تهران');
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  // Local Search Query specific to Input (to allow typing without immediate URL change/fetch if desired, though we can sync)
  const [localQuery, setLocalQuery] = useState(query);

  // Sync local query if URL changes
  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSearch = () => {
    if (localQuery.trim()) {
      // Push to URL. Existing logic will pick it up.
      router.push(
        `/Bazzar/Search?q=${encodeURIComponent(localQuery)}&location=${encodeURIComponent(location)}`,
      );
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center pb-[50px] relative bg-white"
      dir="rtl"
    >
      {/* Header Fixed Area */}
      <div className="w-full bg-white shadow-sm p-4 z-10 sticky top-0">
        <div className="max-w-[440px] mx-auto flex flex-col gap-3">
          {/* Title & Close Row */}
          <div className="flex items-center justify-between px-1">
            <h1 className="font-bold text-lg text-gray-800">
              {query ? `نتایج جستجو “${query}”` : 'جستجو در بازار'}
            </h1>
            <button
              onClick={() => router.push('/Bazzar')}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Search Row */}
          <div className="w-full flex gap-3">
            {/* Professional Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="shrink-0 w-12 sm:w-14 h-12 sm:h-14 bg-[#FDD00A] rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all active:scale-95 border border-[#E9B443]"
            >
              <Filter size={24} className="text-[#0C1415]" strokeWidth={2} />
            </button>

            {/* Search Input Container */}
            <div className="flex-1 relative h-12 sm:h-14 bg-gray-50 rounded-xl flex items-center px-2 border border-gray-200 focus-within:border-[#E9B443] transition-all">
              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="p-2 text-gray-400 hover:text-[#E9B443] transition-colors"
              >
                <SearchIcon size={22} />
              </button>

              <Input
                className="flex-1 h-full border-none shadow-none focus-visible:ring-0 text-right bg-transparent placeholder:text-gray-400 font-medium text-[10px] sm:text-base px-2"
                placeholder="جستجو در محصولات..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                autoFocus={false}
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

          {/* Active Filters */}
          <div className="w-full">
            <ActiveFilters
              filters={filters}
              categories={categories}
              onRemove={(key) => {
                let newFilters = { ...filters };
                if (key === 'categoryId') newFilters.categoryId = null;
                else newFilters[key] = '';

                handleApplyFilters(newFilters);
              }}
              onClearAll={() => {
                const newFilters = {
                  ...filters,
                  categoryId: null,
                  minPrice: '',
                  maxPrice: '',
                };
                handleApplyFilters(newFilters);
              }}
            />
          </div>

          {/* Results Meta Bar */}
          <div className="w-full mt-0 pt-0 border-t border-gray-50 flex justify-between items-center px-1">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 h-[32px]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FDD00A]"></div>
              <span className="text-[#0C1415] text-xs font-['PeydaFaNum'] font-medium pt-0.5">
                {products.length}{' '}
                <span className="text-[#707F81] font-['PeydaWeb'] font-light">کالا</span>
              </span>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5 h-[32px]">
              <span className="text-[#707F81] text-[10px] font-light">تعداد در صفحه:</span>
              <select
                value={perPage || ''}
                onChange={(e) =>
                  handlePerPageChange(e.target.value ? Number(e.target.value) : null)
                }
                className="bg-transparent text-[#0C1415] text-xs font-medium outline-none cursor-pointer"
                dir="ltr"
              >
                <option value="">پیش‌فرض</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="w-full max-w-[440px] px-4 grid grid-cols-2 gap-x-6 gap-y-8 mt-4">
        {loading && page === 1 ? (
          // Initial Loading Skeletons
          [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <Link
              href={`/Bazzar/ProductDetails?id=${product.id}`}
              key={product.id}
              className="flex flex-col gap-2 w-full cursor-pointer group"
            >
              <div className="relative w-full aspect-[170/150] bg-[#F6F6F6] rounded-lg overflow-hidden">
                {/* Image */}
                <Image
                  src={product.image_path || product.image || '/ProductBazzar.png'}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {/* Shadow decoration from design */}
                <div className="absolute w-[40%] h-[3px] left-[30%] bottom-[20%] rotate-1 bg-black/80 blur-[8px] opacity-40" />

                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {product.discount}%
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-start">
                  <h3 className="text-[#1F2029] text-sm font-['PeydaWeb'] font-light text-right overflow-hidden whitespace-nowrap text-ellipsis max-w-[100px]">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 opacity-90">
                    <span className="text-[#797979] text-xs font-num-medium pt-0.5">
                      {product.rating || 0}
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#FDD00A"
                      stroke="none"
                      className="mb-0.5"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </div>
                <div className="text-[#1F2029] text-sm font-num-medium text-left w-full">
                  {typeof product.price === 'number'
                    ? `${product.price.toLocaleString()} ریال`
                    : product.price}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-20 gap-4 opacity-60">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <SearchIcon size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium text-sm">هیچ محصولی با این نام یافت نشد</p>
          </div>
        )}

        {/* Secondary Loading (Pagination) */}
        {loading && page > 1 && (
          <div className="col-span-2 flex justify-center py-4">
            <div className="w-6 h-6 border-2 border-[#FDD00A] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Load More Button or Infinite Scroll Trigger */}
      {hasMore && !loading && products.length > 0 && (
        <div className="w-full max-w-[440px] px-4 mt-6">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="w-full py-3 bg-gray-50 text-[#393E46] text-sm font-['PeydaWeb'] rounded-xl hover:bg-gray-100 transition-colors"
          >
            مشاهده بیشتر
          </button>
        </div>
      )}

      {/* Filter Modal Sheet */}
      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        categories={categories}
        initialFilters={filters}
        onApply={handleApplyFilters}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={<div className="w-full h-screen flex justify-center items-center">Loading...</div>}
    >
      <SearchContent />
    </Suspense>
  );
}

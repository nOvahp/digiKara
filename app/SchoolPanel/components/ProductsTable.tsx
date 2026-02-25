'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { managerService, FlatProduct } from '@/app/services/manager/managerService';
import Image from 'next/image';
import ProductDetailsPopup from './ProductDetailsPopup';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const formatPrice = (price: number | string | undefined) => {
  if (!price) return '۰';
  return toFarsiNumber(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
};

const getImageSrc = (path: string | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `https://digikara.back.adiaweb.dev/storage/${path.replace(/^\//, '')}`;
};

const ProductsTable = () => {
  const [products, setProducts] = useState<FlatProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<FlatProduct | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = React.useRef<HTMLDivElement>(null);
  const itemsPerPage = 7;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await managerService.getManagerProducts();
      if (response.success && response.data) {
        setProducts(response.data as FlatProduct[]);
      }
    } catch (error) {
      console.error('Failed to load products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.code || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'approved'
        ? p.approved === true
        : p.approved === false;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, filterStatus]);

  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage((p) => p - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage((p) => p + 1); };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isListEmpty = !loading && filteredProducts.length === 0;

  if (loading)
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-500 font-medium">
        در حال بارگذاری...
      </div>
    );

  return (
    <div
      className={`w-full ${!isListEmpty ? 'bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] overflow-hidden' : ''} flex flex-col justify-start items-stretch`}
    >
      {/* Header / Filters */}
      <div className={`w-full h-16 px-5 py-2 ${!isListEmpty ? 'border-b border-[#DFE1E7] bg-white' : ''} flex justify-end items-center mb-4`} dir="rtl">
        <div className="flex justify-start items-center gap-2 w-full max-w-md">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="جستجو بر اساس نام یا کد محصول..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pr-9 pl-4 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] text-sm text-[#0D0D12] focus:outline-blue-500 transition-colors font-medium"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#818898]" />
          </div>
          <div className="flex items-center gap-2" ref={filterRef}>
            <div className="relative">
              <div
                className={`h-10 px-4 rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer transition-colors ${isFilterOpen ? 'bg-gray-100 ring-2 ring-blue-100' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className={`w-4 h-4 ${filterStatus !== 'all' ? 'text-[#F7C61A]' : 'text-[#818898]'}`} />
                <span className="text-xs font-semibold text-[#666D80]">
                  {filterStatus === 'all' ? 'همه' : filterStatus === 'approved' ? 'تایید شده' : 'در انتظار'}
                </span>
              </div>
              {isFilterOpen && (
                <div
                  className="absolute top-12 left-0 z-50 w-48 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-[#EFF0F2] p-2 flex flex-col gap-1"
                  dir="rtl"
                >
                  <div className="text-[#666D80] text-xs font-medium px-2 py-1 mb-1 border-b border-gray-100 text-right">
                    فیلتر بر اساس وضعیت
                  </div>
                  {[
                    { label: 'همه', value: 'all' },
                    { label: 'تایید شده', value: 'approved' },
                    { label: 'در انتظار تایید', value: 'pending' },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => { setFilterStatus(option.value); setIsFilterOpen(false); }}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filterStatus === option.value ? 'bg-[#F7C61A] border-[#F7C61A]' : 'border-[#DFE1E7] bg-white'}`}>
                        {filterStatus === option.value && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${filterStatus === option.value ? 'text-[#0D0D12] font-semibold' : 'text-[#666D80] font-medium'}`}>
                        {option.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {isListEmpty ? (
        <div className="w-full flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-xl border border-[#DCE4E8] border-dashed">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <div className="text-[#0D0D12] font-semibold">محصولی یافت نشد</div>
          <div className="text-[#666D80] text-sm font-medium">نتیجه‌ای با این مشخصات پیدا نشد.</div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="min-w-[900px] flex flex-col">
            {/* Table Header */}
            <div className="w-full bg-[#F6F8FA] border-b border-[#DFE1E7] flex justify-start items-center px-2" dir="rtl">
              {[
                { label: '#', w: 'w-14' },
                { label: 'تصویر', w: 'w-[80px]' },
                { label: 'نام محصول', w: 'w-[200px]' },
                { label: 'کد', w: 'w-[100px]' },
                { label: 'موجودی', w: 'w-[100px]' },
                { label: 'قیمت (ریال)', w: 'w-[140px]' },
                { label: 'وضعیت', w: 'w-[120px]' },
              ].map((col) => (
                <div key={col.label} className={`${col.w} h-10 px-3 flex justify-center items-center`}>
                  <span className="text-center text-[#666D80] text-xs font-semibold">{col.label}</span>
                </div>
              ))}
            </div>

            {/* Table Body */}
            {currentItems.map((product, idx) => {
              const itemIndex = indexOfFirstItem + idx + 1;
              const imgSrc = getImageSrc(product.image_path);
              const isApproved = product.approved;
              const statusBg = isApproved ? '#ECF9F7' : '#FFF4E5';
              const statusColor = isApproved ? '#267666' : '#B98900';
              const statusText = isApproved ? 'تایید شده' : 'در انتظار';

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="w-full h-16 border-b border-[#DFE1E7] flex justify-start items-center px-2 hover:bg-gray-50 transition-colors cursor-pointer"
                  dir="rtl"
                >
                  <div className="w-14 h-16 px-3 flex justify-center items-center">
                    <span className="text-[#C0C4CC] text-xs font-num-medium">{toFarsiNumber(itemIndex)}</span>
                  </div>
                  <div className="w-[80px] h-16 px-3 flex justify-center items-center">
                    {imgSrc ? (
                      <div className="w-10 h-10 relative flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                        <Image src={imgSrc} alt={product.title} fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0" />
                    )}
                  </div>
                  <div className="w-[200px] h-16 px-3 flex justify-center items-center">
                    <span className="text-center text-[#0D0D12] text-sm font-semibold truncate w-full" dir="auto">
                      {product.title}
                    </span>
                  </div>
                  <div className="w-[100px] h-16 px-3 flex justify-center items-center">
                    <span className="text-center text-[#666D80] text-sm font-num-medium">{product.code || '—'}</span>
                  </div>
                  <div className="w-[100px] h-16 px-3 flex justify-center items-center">
                    <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold">{toFarsiNumber(product.inventory)}</span>
                  </div>
                  <div className="w-[140px] h-16 px-3 flex justify-center items-center">
                    <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold">{formatPrice(product.price)}</span>
                  </div>
                  <div className="w-[120px] h-16 px-3 flex justify-center items-center">
                    <div className="px-2 py-0.5 rounded-2xl" style={{ backgroundColor: statusBg }}>
                      <span className="text-[12px] font-num-medium whitespace-nowrap" style={{ color: statusColor }}>{statusText}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="w-full px-5 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              onClick={handleNextPage}
              className={`w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#DFE1E7] cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              <ChevronRight className="w-5 h-5 text-[#0D0D12]" />
            </div>
            <div className="w-[55px] h-8 rounded-lg border border-[#DFE1E7] flex justify-center items-center">
              <span className="text-[#0D0D12] text-xs font-num-medium">{toFarsiNumber(currentPage)}/{toFarsiNumber(totalPages)}</span>
            </div>
            <div
              onClick={handlePrevPage}
              className={`w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#DFE1E7] cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              <ChevronLeft className="w-5 h-5 text-[#0D0D12]" />
            </div>
          </div>
          <span className="text-[#0D0D12] text-sm font-num-medium">
            صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}
          </span>
        </div>
      )}

      {selectedProduct && (
        <ProductDetailsPopup product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ProductsTable;

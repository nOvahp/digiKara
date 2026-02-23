'use client';

import React from 'react';
import {
  Wallet,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
} from 'lucide-react';
import { Product } from './product';
import { managerService, Order as ApiOrder } from '@/app/services/manager/managerService';
import ProductPopUp from './ProductPopUp';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const mapApiStatus = (status: string): string => {
  if (!status) return 'نامشخص';
  const s = status.toLowerCase();
  if (s === 'delivered' || s.includes('تحویل')) return 'تحویل به مدرسه';
  if (s === 'sent' || s === 'ارسال شده') return 'ارسال شده';
  if (s === 'pending' || s === 'not_sent' || s.includes('انتظار')) return 'در انتظار ارسال';
  if (s === 'canceled' || s === 'cancelled' || s.includes('لغو')) return 'لغو شده';
  return status;
};

const mapOrderToProduct = (order: ApiOrder): Product => ({
  id: order.id,
  productName: order.product?.title || 'محصول نامشخص',
  weight: '-',
  count: order.quantity || 0,
  deliveryTime: '-',
  price: (order.price || 0).toLocaleString('fa-IR'),
  rawPrice: order.price || 0,
  statusLabel: mapApiStatus(order.status || ''),
  team: '-',
  description: order.product?.description || '',
  image: order.product?.image_path || '',
});

const ReportsPage = () => {
  const [allOrders, setAllOrders] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isProductPopUpOpen, setIsProductPopUpOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const filterRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Fetch real orders from backend
  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      const result = await managerService.getManagerOrders();
      if (result.success && Array.isArray(result.data)) {
        setAllOrders(result.data.map(mapOrderToProduct));
      } else {
        setError(result.message || 'خطا در دریافت سفارشات');
        setAllOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  // Close filter when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Default scroll to right
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, []);

  const handleFilterChange = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value],
    );
    setCurrentPage(1);
  };

  const getFilterOptions = () => [
    { label: 'ارسال شده', value: 'ارسال شده' },
    { label: 'تحویل به مدرسه', value: 'تحویل به مدرسه' },
    { label: 'در انتظار ارسال', value: 'در انتظار ارسال' },
    { label: 'لغو شده', value: 'لغو شده' },
  ];

  const filteredProductsList = allOrders.filter((o) => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(o.statusLabel);
  });

  const totalPages = Math.max(1, Math.ceil(filteredProductsList.length / itemsPerPage));
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProductsList.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductPopUpOpen(true);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Stats computed from real API orders
  const totalSalesAmount = allOrders.reduce((sum, o) => sum + o.rawPrice, 0);
  const sentCount = allOrders.filter((o) => o.statusLabel === 'ارسال شده').length;
  const deliveredCount = allOrders.filter((o) => o.statusLabel === 'تحویل به مدرسه').length;
  const cancelledCount = allOrders.filter((o) => o.statusLabel === 'لغو شده').length;

  return (
    <div
      className="w-full h-auto pt-4 pb-8 px-0 flex flex-col justify-start items-center gap-6"
      dir="rtl"
      style={{ direction: 'rtl' }}
    >
      {/* Header Profile Section */}

      {/* Dashboard Title */}
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <h1 className="w-full text-right text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
          داشبــــــورد
        </h1>
      </div>

      {/* Stats Section */}
      <div className="w-full flex flex-col justify-center items-start gap-3">
        {/* Total Sales Card (Big) */}
        <div className="w-full p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5">
          <div className="w-full flex flex-col justify-start items-start gap-0.5">
            <div className="w-full flex justify-between items-center gap-2.5">
              <div className="w-9 h-9 relative bg-[#FFD369] rounded-lg shadow-[inset_0px_-4px_6px_rgba(255,255,255,0.5)] overflow-hidden">
                <div className="absolute left-2 top-2">
                  <Wallet className="w-5 h-5 text-[#393E46]" strokeWidth={2} />
                </div>
              </div>
              <div className="flex-1 text-right text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                کل فروش
              </div>
            </div>
            <div className="w-full flex justify-end items-center gap-2">
              <div className="text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px]">
                {loading ? '...' : toFarsiNumber(totalSalesAmount.toLocaleString('fa-IR'))}{' '}
                <span className="text-sm">ریال</span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-1">
            <div className="text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide">
              {loading ? 'در حال بارگذاری...' : `مجموع درآمد از ${toFarsiNumber(allOrders.length)} سفارش`}
            </div>
          </div>
        </div>

        {/* Bottom Row: 3 Status Cards */}
        <div className="w-full flex gap-3">
          {/* Sent */}
          <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5">
            <div className="w-full flex flex-col justify-start items-start gap-0.5">
              <div className="flex-1 w-full text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                ارسال شده
              </div>
              <div className="w-full flex justify-center items-center gap-2">
                <div className="text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px]">
                  {loading ? '...' : toFarsiNumber(sentCount)}
                </div>
              </div>
            </div>
            <div className="w-full text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide">
              سفارش
            </div>
          </div>

          {/* Delivered */}
          <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5">
            <div className="w-full flex flex-col justify-start items-start gap-0.5">
              <div className="flex-1 w-full text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                تحویل‌داده‌شده
              </div>
              <div className="w-full flex justify-center items-center gap-2">
                <div className="text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px]">
                  {loading ? '...' : toFarsiNumber(deliveredCount)}
                </div>
              </div>
            </div>
            <div className="w-full text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide">
              سفارش
            </div>
          </div>

          {/* Cancelled */}
          <div className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5">
            <div className="w-full flex flex-col justify-start items-start gap-0.5">
              <div className="flex-1 w-full text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                لغو شده
              </div>
              <div className="w-full flex justify-center items-center gap-2">
                <div className="text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px]">
                  {loading ? '...' : toFarsiNumber(cancelledCount)}
                </div>
              </div>
            </div>
            <div className="w-full text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide">
              سفارش
            </div>
          </div>
        </div>
      </div>



      {/* Projects Section */}
      <div className="flex flex-col gap-4 w-full mt-4">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-[#222831] text-lg font-num-medium font-extrabold leading-[25.2px] text-right">
            
          </h2>
        </div>

        {/* Active Orders List */}
        <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-stretch">
          {/* Header */}
          <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white rounded-t-xl">
            <div className="text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold leading-24 tracking-wide text-right">
            سفارش های مدرسه
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2" ref={filterRef}>
                <div className="relative">
                  <div
                    className={`w-8 h-8 flex items-center justify-center bg-white border border-[#DFE1E7] rounded-lg shadow-sm cursor-pointer transition-colors ${isFilterOpen ? 'bg-gray-100 ring-2 ring-blue-100' : 'hover:bg-gray-50'}`}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter
                      className={`w-4 h-4 ${selectedFilters.length > 0 ? 'text-[#F7C61A]' : 'text-[#818898]'}`}
                    />
                  </div>

                  {/* Filter Dropdown */}
                  {isFilterOpen && (
                    <div
                      className="absolute top-9 left-0 z-50 w-48 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-[#EFF0F2] p-2 flex flex-col gap-1 anim-fade-in"
                      dir="rtl"
                    >
                      <div className="text-[#666D80] text-xs font-medium px-2 py-1 mb-1 border-b border-gray-100 text-right">
                        فیلتر بر اساس وضعیت
                      </div>
                      {getFilterOptions().map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer"
                          onClick={() => handleFilterChange(option.value)}
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedFilters.includes(option.value) ? 'bg-[#F7C61A] border-[#F7C61A]' : 'border-[#DFE1E7] bg-white'}`}
                          >
                            {selectedFilters.includes(option.value) && (
                              <svg
                                width="10"
                                height="8"
                                viewBox="0 0 10 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 4L3.5 6.5L9 1"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`text-sm ${selectedFilters.includes(option.value) ? 'text-[#0D0D12] font-semibold' : 'text-[#666D80] font-medium'}`}
                          >
                            {option.label}
                          </span>
                        </div>
                      ))}
                      {selectedFilters.length > 0 && (
                        <div
                          className="text-center text-[#B21634] text-xs font-medium py-1.5 mt-1 border-t border-gray-100 cursor-pointer hover:bg-red-50 rounded-b-lg"
                          onClick={() => setSelectedFilters([])}
                        >
                          حذف فیلترها
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-white border border-[#DFE1E7] rounded-lg shadow-sm">
                <Search className="w-4 h-4 text-[#818898]" />
              </div>
            </div>
          </div>

          {/* Loading / Error States */}
          {loading && (
            <div className="w-full py-16 flex justify-center items-center">
              <span className="text-[#818898] text-sm font-['PeydaWeb']">در حال بارگذاری...</span>
            </div>
          )}
          {!loading && error && (
            <div className="w-full py-16 flex justify-center items-center">
              <span className="text-[#B21634] text-sm font-['PeydaWeb']">{error}</span>
            </div>
          )}
          {!loading && !error && allOrders.length === 0 && (
            <div className="w-full py-16 flex justify-center items-center">
              <span className="text-[#818898] text-sm font-medium">سفارشی یافت نشد</span>
            </div>
          )}

          {/* Table */}
          {!loading && !error && allOrders.length > 0 && (
          <div ref={scrollContainerRef} className="w-full overflow-x-auto no-scrollbar">
            <div className="min-w-[1000px] flex flex-col">
              {/* Table Header */}
              <div className="w-full h-10 bg-[#F6F8FA] border-b border-[#DFE1E7] flex justify-start items-center px-2">
                <div className="w-11 h-10 px-3 bg-[#F6F8FA]" />
                <div className="w-20 h-10 px-3 flex justify-center items-center">
                  <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
                </div>
                <div className="w-[272px] h-10 px-3 flex justify-start items-center">
                  <div className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide w-full">
                    محصول
                  </div>
                </div>
                <div className="w-[73px] h-10 px-3 flex justify-center items-center">
                  <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                    تعداد
                  </div>
                </div>
                <div className="w-[127px] h-10 px-3 flex justify-center items-center">
                  <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                    موعد تحویل
                  </div>
                </div>
                <div className="w-[140px] h-10 px-3 flex justify-center items-center">
                  <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                    درآمد شما از فروش
                  </div>
                </div>
                <div className="w-[104px] h-10 px-3 flex justify-center items-center">
                  <div className="text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                    وضعیت
                  </div>
                </div>
                <div className="w-[272px] h-10 px-3 flex justify-end items-center">
                  <div className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                    تیم اجرایی
                  </div>
                </div>
              </div>

              {/* Table Body - Rows */}
              {currentProducts.map((product, idx) => {
                const itemIndex = indexOfFirstProduct + idx + 1;
                const statusBg =
                  product.statusLabel === 'ارسال شده' || product.statusLabel === 'تحویل به مدرسه '
                    ? '#ECF9F7'
                    : '#FCE8EC';
                const statusColor =
                  product.statusLabel === 'ارسال شده' || product.statusLabel === 'تحویل به مدرسه '
                    ? '#267666'
                    : '#B21634';

                return (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="w-full h-16 border-b border-[#DFE1E7] flex justify-start items-center px-2 hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <div className="w-11 h-16 px-3 flex justify-center items-center gap-2">
                      <MoreHorizontal className="w-5 h-5 text-[#666D80]" />
                    </div>
                    <div className="w-20 h-16 px-3 flex justify-center items-center gap-2.5">
                      <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7] cursor-pointer" />
                      <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold flex-1">
                        {toFarsiNumber(itemIndex)}
                      </span>
                    </div>
                    <div className="w-[272px] h-16 px-3 flex justify-start items-center gap-2.5">
                      <span className="text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide truncate w-full">
                        {product.productName}
                      </span>
                    </div>
                    <div className="w-[73px] h-16 px-3 flex justify-center items-center gap-2.5">
                      <span className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium font-semibold">
                        {toFarsiNumber(product.count)}
                      </span>
                    </div>
                    <div className="w-[127px] h-16 px-3 flex justify-center items-center gap-2.5">
                      <span className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium font-semibold">
                        {toFarsiNumber(product.deliveryTime)}
                      </span>
                    </div>
                    <div className="w-[140px] h-16 px-3 flex justify-center items-center gap-2.5">
                      <span className="flex-1 text-center text-[#0D0D12] text-sm font-num-medium font-semibold">
                        {toFarsiNumber(product.price)}{' '}
                        <span className="font-['PeydaWeb']">ریال</span>
                      </span>
                    </div>
                    <div className="w-[104px] h-16 px-3 flex justify-center items-center gap-2.5">
                      <div
                        className="px-2 py-0.5 rounded-2xl flex justify-center items-center"
                        style={{ backgroundColor: statusBg }}
                      >
                        <span
                          className="text-[12px] font-num-medium"
                          style={{ color: statusColor }}
                        >
                          {product.statusLabel}
                        </span>
                      </div>
                    </div>
                    <div className="w-[272px] h-16 px-3 flex justify-end items-center gap-2.5">
                      <span className="text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold truncate">
                        {product.team}
                      </span>
                    </div>
                  </div>
                );
              })}  
            </div>
          </div>
          )}

          {/* Footer */}
          {!loading && !error && filteredProductsList.length > 0 && (
          <div className="w-full px-5 py-4 flex justify-between items-center rounded-b-xl">
            <div className="flex items-center gap-2">
              <div
                onClick={handleNextPage}
                className={`w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#DFE1E7] cursor-pointer hover:bg-gray-50 transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ChevronRight className="w-5 h-5 text-[#0D0D12]" />
              </div>
              <div className="w-[55px] h-8 rounded-lg border border-[#DFE1E7] flex justify-center items-center">
                <span className="text-[#0D0D12] text-xs font-num-medium font-medium">
                  {toFarsiNumber(currentPage)}/{toFarsiNumber(totalPages)}
                </span>
              </div>
              <div
                onClick={handlePrevPage}
                className={`w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#DFE1E7] cursor-pointer hover:bg-gray-50 transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="w-5 h-5 flex justify-center items-center">
                  <ChevronLeft className="w-5 h-5 text-[#0D0D12]" />
                </div>
              </div>
            </div>
            <span className="text-center text-[#0D0D12] text-sm font-num-medium font-medium">
              صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}
            </span>
          </div>
          )}
        </div>
      </div>

      {/* Product PopUp */}
      {/* Product PopUp */}
      {isProductPopUpOpen && selectedProduct && (
        <ProductPopUp
          product={selectedProduct}
          onClose={() => {
            setIsProductPopUpOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ReportsPage;

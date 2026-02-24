'use client';

import React from 'react';
import {
  Wallet,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
} from 'lucide-react';
import Image from 'next/image';
import { managerService, Order } from '@/app/services/manager/managerService';
import ManagerOrderPopup from '../components/ManagerOrderPopup';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const formatPrice = (price: string | number | undefined) => {
  if (!price) return '۰';
  return toFarsiNumber(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
};

// Used only for stats counting
const mapApiStatus = (status: string): string => {
  if (!status) return 'نامشخص';
  const s = status.toLowerCase();
  if (s === 'delivered' || s.includes('تحویل')) return 'تحویل به مدرسه';
  if (s === 'sent' || s === 'ارسال شده') return 'ارسال شده';
  if (s === 'pending' || s === 'not_sent' || s.includes('انتظار')) return 'در انتظار ارسال';
  if (s === 'canceled' || s === 'cancelled' || s.includes('لغو')) return 'لغو شده';
  return status;
};

const statusConfig: Record<string, { bg: string; color: string }> = {
  'ارسال شده':       { bg: '#EEF2FF', color: '#3730A3' },
  'تحویل به مدرسه':  { bg: '#ECFDF5', color: '#065F46' },
  'در انتظار ارسال': { bg: '#FFFBEB', color: '#92400E' },
  'لغو شده':         { bg: '#FEF2F2', color: '#991B1B' },
};

const getImageSrc = (path: string | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `https://digikara.back.adiaweb.dev/storage/${path.replace(/^\//, '')}`;
};

const ReportsPage = () => {
  const [allOrders, setAllOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const filterRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Fetch orders from backend
  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      const result = await managerService.getManagerOrders();
      if (result.success && Array.isArray(result.data)) {
        setAllOrders(result.data);
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const filteredOrders = allOrders.filter((o) => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(mapApiStatus(o.status || ''));
  });

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Stats
  const totalSalesAmount = allOrders.reduce((sum, o) => sum + (o.price || 0), 0);
  const sentCount = allOrders.filter((o) => mapApiStatus(o.status || '') === 'ارسال شده').length;
  const deliveredCount = allOrders.filter((o) => mapApiStatus(o.status || '') === 'تحویل به مدرسه').length;
  const cancelledCount = allOrders.filter((o) => mapApiStatus(o.status || '') === 'لغو شده').length;

  return (
    <div
      className="w-full h-auto pt-4 pb-8 px-0 flex flex-col justify-start items-center gap-6"
      dir="rtl"
      style={{ direction: 'rtl' }}
    >
      {/* Dashboard Title */}
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <h1 className="w-full text-right text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
          داشبــــــورد
        </h1>
      </div>

      {/* Stats Section */}
      <div className="w-full flex flex-col justify-center items-start gap-3">
        {/* Total Sales Card */}
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
                {loading ? '...' : formatPrice(totalSalesAmount)}{' '}
                <span className="text-sm font-['PeydaWeb']">ریال</span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-1">
            <div className="text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide">
              {loading ? 'در حال بارگذاری...' : `مجموع درآمد از ${toFarsiNumber(allOrders.length)} سفارش`}
            </div>
          </div>
        </div>

        {/* 3 Status Cards */}
        <div className="w-full flex gap-3">
          {[
            { label: 'ارسال شده', count: sentCount },
            { label: 'تحویل‌داده‌شده', count: deliveredCount },
            { label: 'لغو شده', count: cancelledCount },
          ].map(({ label, count }) => (
            <div key={label} className="flex-1 p-4 bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-start gap-2.5">
              <div className="w-full flex flex-col justify-start items-start gap-0.5">
                <div className="flex-1 w-full text-center text-[#818898] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                  {label}
                </div>
                <div className="w-full flex justify-center items-center gap-2">
                  <div className="text-[#0D0D12] text-2xl font-num-medium font-semibold leading-[31.2px]">
                    {loading ? '...' : toFarsiNumber(count)}
                  </div>
                </div>
              </div>
              <div className="w-full text-center text-[#818898] text-xs font-['PeydaWeb'] font-light leading-[18px] tracking-wide">
                سفارش
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Table Section */}
      <div className="flex flex-col gap-4 w-full mt-4">
        <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex flex-col justify-start items-stretch">
          {/* Table Card Header */}
          <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white rounded-t-xl">
            <div className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold">
              سفارش های مدرسه
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2" ref={filterRef}>
                <div className="relative">
                  <div
                    className={`w-8 h-8 flex items-center justify-center bg-white border border-[#DFE1E7] rounded-lg shadow-sm cursor-pointer transition-colors ${isFilterOpen ? 'bg-gray-100 ring-2 ring-blue-100' : 'hover:bg-gray-50'}`}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className={`w-4 h-4 ${selectedFilters.length > 0 ? 'text-[#F7C61A]' : 'text-[#818898]'}`} />
                  </div>

                  {isFilterOpen && (
                    <div
                      className="absolute top-9 left-0 z-50 w-48 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-[#EFF0F2] p-2 flex flex-col gap-1"
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
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedFilters.includes(option.value) ? 'bg-[#F7C61A] border-[#F7C61A]' : 'border-[#DFE1E7] bg-white'}`}>
                            {selectedFilters.includes(option.value) && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-sm ${selectedFilters.includes(option.value) ? 'text-[#0D0D12] font-semibold' : 'text-[#666D80] font-medium'}`}>
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

          {/* Loading / Error / Empty States */}
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
              <div className="min-w-[680px] flex flex-col">
                {/* Table Header */}
                <div className="w-full h-10 bg-[#F6F8FA] border-b border-[#DFE1E7] flex items-center px-4 gap-2">
                  <div className="w-8 flex-shrink-0 text-center text-[#666D80] text-xs font-semibold font-['PeydaWeb']">
                    #
                  </div>
                  <div className="w-10 flex-shrink-0" />
                  <div className="flex-1 min-w-[140px] text-right text-[#666D80] text-xs font-semibold font-['PeydaWeb'] pr-1">
                    نام محصول
                  </div>
                  <div className="w-16 flex-shrink-0 text-center text-[#666D80] text-xs font-semibold font-['PeydaWeb']">
                    تعداد
                  </div>
                  <div className="w-32 flex-shrink-0 text-center text-[#666D80] text-xs font-semibold font-['PeydaWeb']">
                    قیمت (ریال)
                  </div>
                  <div className="w-16 flex-shrink-0 text-center text-[#666D80] text-xs font-semibold font-['PeydaWeb']">
                    تخفیف
                  </div>
                  <div className="w-[124px] flex-shrink-0 text-center text-[#666D80] text-xs font-semibold font-['PeydaWeb']">
                    وضعیت
                  </div>
                </div>

                {/* Table Rows */}
                {currentItems.map((order, idx) => {
                  const itemIndex = indexOfFirstItem + idx + 1;
                  const mappedStatus = mapApiStatus(order.status || '');
                  const { bg: statusBg, color: statusColor } =
                    statusConfig[mappedStatus] ?? { bg: '#F3F4F6', color: '#374151' };
                  const imgSrc = getImageSrc(order.product?.image_path);

                  return (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="w-full h-[62px] border-b border-[#DFE1E7] flex items-center px-4 gap-2 hover:bg-[#FAFBFC] transition-colors cursor-pointer"
                    >
                      {/* Row number */}
                      <div className="w-8 flex-shrink-0 text-center text-[#C0C4CC] text-xs font-num-medium">
                        {toFarsiNumber(itemIndex)}
                      </div>

                      {/* Image */}
                      <div className="w-10 flex-shrink-0 flex justify-center items-center">
                        {imgSrc ? (
                          <div className="w-9 h-9 relative rounded-lg overflow-hidden border border-[#DFE1E7] flex-shrink-0">
                            <Image src={imgSrc} alt="product" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 bg-gray-100 rounded-lg flex-shrink-0" />
                        )}
                      </div>

                      {/* Product name */}
                      <div className="flex-1 min-w-[140px] overflow-hidden pr-1">
                        <span className="text-[#0D0D12] text-sm font-medium font-['PeydaWeb'] truncate block leading-snug">
                          {order.product?.title || 'محصول نامشخص'}
                        </span>
                      </div>

                      {/* Count */}
                      <div className="w-16 flex-shrink-0 flex justify-center items-baseline gap-1">
                        <span className="text-[#0D0D12] text-sm font-num-medium font-medium">
                          {toFarsiNumber(order.quantity)}
                        </span>
                        <span className="text-[#818898] text-[10px] font-['PeydaWeb']">عدد</span>
                      </div>

                      {/* Price */}
                      <div className="w-32 flex-shrink-0 text-center">
                        <span className="text-[#0D0D12] text-sm font-num-medium font-medium">
                          {formatPrice(order.price)}
                        </span>
                      </div>

                      {/* Discount */}
                      <div className="w-16 flex-shrink-0 text-center">
                        <span className="text-[#0D0D12] text-sm font-num-medium font-medium">
                          {toFarsiNumber(order.discount)}٪
                        </span>
                      </div>

                      {/* Status badge */}
                      <div className="w-[124px] flex-shrink-0 flex justify-center items-center">
                        <span
                          className="px-3 py-1 rounded-full text-[11px] font-medium font-['PeydaWeb'] whitespace-nowrap"
                          style={{ backgroundColor: statusBg, color: statusColor }}
                        >
                          {mappedStatus}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer / Pagination */}
          {!loading && !error && filteredOrders.length > 0 && (
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
                  <ChevronLeft className="w-5 h-5 text-[#0D0D12]" />
                </div>
              </div>
              <span className="text-center text-[#0D0D12] text-sm font-num-medium font-medium">
                صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Popup */}
      {selectedOrder && (
        <ManagerOrderPopup
          orderId={selectedOrder.id}
          onClose={() => setSelectedOrder(null)}
          onUpdate={() => {
            managerService.getManagerOrders().then((result) => {
              if (result.success && Array.isArray(result.data)) setAllOrders(result.data);
            });
          }}
        />
      )}
    </div>
  );
};

export default ReportsPage;

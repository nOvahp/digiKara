'use client';

import React, { useEffect, useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { managerService, Order } from '@/app/services/manager/managerService';
import ManagerOrderPopup from './ManagerOrderPopup';
import Image from 'next/image';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const formatPrice = (price: string | number | undefined) => {
  if (!price) return '۰';
  return toFarsiNumber(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
};

const ManagerOrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = React.useRef<HTMLDivElement>(null);
  const itemsPerPage = 7;

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await managerService.getManagerOrders();
      if (response.success && response.data) {
        setOrders(response.data);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.product?.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery) ||
      order.order_id.toString().includes(searchQuery);

    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'completed'
          ? order.status === 'تکمیل شده' || order.status === 'sent'
          : filterStatus === 'pending'
            ? order.status === 'در حال انتظار' || order.status === 'pending'
            : true;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  // Pagination Handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  // Close filter when clicking outside
  useEffect(() => {
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

  const isListEmpty = !loading && filteredOrders.length === 0;

  if (loading)
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-500">
        در حال بارگذاری...
      </div>
    );

  return (
    <div
      className={`w-full ${!isListEmpty ? 'bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] overflow-hidden' : ''} flex flex-col justify-start items-end`}
    >
      {/* Header / Filters */}
      <div
        className={`w-full h-16 px-5 py-2 ${!isListEmpty ? 'border-b border-[#DFE1E7] bg-white' : ''} flex justify-between items-center mb-4`}
      >
        <div className="text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold leading-24 tracking-wide">
          {!isListEmpty}
        </div>
        <div className="flex justify-start items-center gap-2 w-full max-w-md">
          {/* Search Box */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="جستجو در سفارشات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pr-9 pl-4 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] text-sm text-[#0D0D12] focus:outline-blue-500 transition-colors font-medium"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#818898]" />
          </div>

          {/* Filter Button */}
          <div className="flex items-center gap-2" ref={filterRef}>
            <div className="relative">
              <div
                className={`h-10 px-4 rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer transition-colors ${isFilterOpen ? 'bg-gray-100 ring-2 ring-blue-100' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter
                  className={`w-4 h-4 ${filterStatus !== 'all' ? 'text-[#F7C61A]' : 'text-[#818898]'}`}
                />
                <span className="text-xs font-semibold font-['PeydaWeb'] text-[#666D80]">
                  {filterStatus === 'all'
                    ? 'همه'
                    : filterStatus === 'completed'
                      ? 'تکمیل شده'
                      : 'در انتظار'}
                </span>
              </div>

              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div
                  className="absolute top-12 left-0 z-50 w-48 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-[#EFF0F2] p-2 flex flex-col gap-1 anim-fade-in"
                  dir="rtl"
                >
                  <div className="text-[#666D80] text-xs font-medium px-2 py-1 mb-1 border-b border-gray-100 text-right">
                    فیلتر بر اساس وضعیت
                  </div>
                  {[
                    { label: 'همه', value: 'all' },
                    { label: 'تکمیل شده', value: 'completed' },
                    { label: 'در انتظار', value: 'pending' },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => {
                        setFilterStatus(option.value);
                        setIsFilterOpen(false);
                      }}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filterStatus === option.value ? 'bg-[#F7C61A] border-[#F7C61A]' : 'border-[#DFE1E7] bg-white'}`}
                      >
                        {filterStatus === option.value && (
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
                        className={`text-sm ${filterStatus === option.value ? 'text-[#0D0D12] font-semibold' : 'text-[#666D80] font-medium'}`}
                      >
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

      {isListEmpty ? (
        <div className="w-full flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-xl border border-[#DCE4E8] border-dashed">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <div className="text-[#0D0D12] font-semibold">سفارشی یافت نشد</div>
          <div className="text-[#666D80] text-sm">نتیجه‌ای با این مشخصات پیدا نشد.</div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="min-w-[1000px] flex flex-col">
            {/* Table Header */}
            <div className="w-full bg-[#F6F8FA] border-b border-[#DFE1E7] flex justify-end items-center px-2">
              <div className="w-16 h-10 px-3 flex justify-end items-center">
                <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7]" />
              </div>
              <div className="w-[80px] h-10 px-3 flex justify-center items-center">
                <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                  تصویر
                </div>
              </div>
              <div className="w-[200px] h-10 px-3 flex justify-center items-center">
                <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                  نام محصول
                </div>
              </div>
              <div className="w-[100px] h-10 px-3 flex justify-center items-center">
                <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                  تعداد
                </div>
              </div>
              <div className="w-[120px] h-10 px-3 flex justify-center items-center">
                <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                  قیمت (ریال)
                </div>
              </div>
              <div className="w-[120px] h-10 px-3 flex justify-center items-center">
                <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                  تخفیف
                </div>
              </div>
              <div className="w-[150px] h-10 px-3 flex justify-center items-center">
                <div className="text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                  وضعیت
                </div>
              </div>
              <div className="w-[120px] h-10 px-3 flex justify-center items-center">
                <div className="text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                  عملیات
                </div>
              </div>
            </div>

            {/* Table Body - Rows */}
            {currentItems.length > 0 ? (
              currentItems.map((order, idx) => {
                const itemIndex = indexOfFirstItem + idx + 1;
                const statusBg =
                  order.status === 'تکمیل شده' || order.status === 'sent'
                    ? '#ECF9F7'
                    : '#FFF4E5';
                const statusColor =
                  order.status === 'تکمیل شده' || order.status === 'sent'
                    ? '#267666'
                    : '#B98900';
                
                // Use backend status string or map it
                const statusText = order.status || 'نامشخص';

                return (
                  <div
                    key={order.id}
                    onClick={() => handleOrderClick(order)}
                    className="w-full h-16 border-b border-[#DFE1E7] flex justify-end items-center px-2 hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <div className="w-16 h-16 px-3 flex justify-start items-center gap-2.5">
                      <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold flex-1">
                        {toFarsiNumber(itemIndex)}
                      </span>
                      <div className="w-4 h-4 bg-white rounded border border-[#DFE1E7] cursor-pointer" />
                    </div>
                    <div className="w-[80px] h-16 px-3 flex justify-center items-center">
                      {order.product?.image_path ? (
                        <div className="w-10 h-10 relative flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={
                              order.product.image_path.startsWith('http')
                                ? order.product.image_path
                                : `https://digikara.back.adiaweb.dev/storage/${order.product.image_path.replace(/^\//, '')}`
                            }
                            alt="product"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                      )}
                    </div>
                    <div className="w-[200px] h-16 px-3 flex justify-center items-center">
                      <span
                        className="text-center text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold truncate w-full"
                        dir="auto"
                      >
                        {order.product?.title || 'نامشخص'}
                      </span>
                    </div>
                    <div className="w-[100px] h-16 px-3 flex justify-center items-center">
                      <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold">
                        {toFarsiNumber(order.quantity)}
                      </span>
                    </div>
                    <div className="w-[120px] h-16 px-3 flex justify-center items-center">
                      <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold">
                        {formatPrice(order.price)}
                      </span>
                    </div>
                    <div className="w-[120px] h-16 px-3 flex justify-center items-center">
                      <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold">
                        {toFarsiNumber(order.discount)}٪
                      </span>
                    </div>
                    <div className="w-[150px] h-16 px-3 flex justify-center items-center">
                      <div
                        className="px-2 py-0.5 rounded-2xl flex justify-center items-center"
                        style={{ backgroundColor: statusBg }}
                      >
                        <span
                          className="text-[12px] font-num-medium whitespace-nowrap"
                          style={{ color: statusColor }}
                        >
                          {statusText}
                        </span>
                      </div>
                    </div>
                    <div className="w-[120px] h-16 px-3 flex justify-center items-center">
                      <div className="flex justify-center items-center">
                         <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                           <Eye className="w-5 h-5 text-[#666D80]" />
                         </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full h-20 flex items-center justify-center text-gray-500">
                موردی یافت نشد
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
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
              <span className="text-[#0D0D12] text-xs font-num-medium font-medium">
                {toFarsiNumber(currentPage)}/{toFarsiNumber(totalPages)}
              </span>
            </div>
            <div
              onClick={handlePrevPage}
              className={`w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#DFE1E7] cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
            >
              <ChevronLeft className="w-5 h-5 text-[#0D0D12]" />
            </div>
          </div>
          <span className="text-center text-[#0D0D12] text-sm font-num-medium font-medium">
            صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}
          </span>
        </div>
      )}

      {/* Popup */}
      {selectedOrder && (
        <ManagerOrderPopup
          orderId={selectedOrder.id}
          onClose={() => setSelectedOrder(null)}
          onUpdate={() => {
            fetchOrders();
          }}
        />
      )}
    </div>
  );
};

export default ManagerOrdersTable;

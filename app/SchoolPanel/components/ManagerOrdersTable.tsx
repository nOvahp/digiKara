'use client';

import React, { useEffect, useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Eye } from 'lucide-react';
import { managerService } from '@/app/services/manager/managerService';
import ManagerOrderPopup from './ManagerOrderPopup';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const formatPrice = (price: string | number) => {
  if (!price) return '۰';
  return toFarsiNumber(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
};

const ManagerOrdersTable = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = React.useRef<HTMLDivElement>(null);
  const itemsPerPage = 7;

  const fetchOrders = async () => {
    setLoading(true);
    const response = await managerService.getManagerOrders();
    if (response.success && response.data) {
      setOrders(response.data);
    } else {
      console.error(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.product?.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.user?.firstname || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.user?.lastname || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery);

    // Normalize status check
    const status = order.status;
    // Assuming status might be 'sent', 'pending', 'completed', etc.
    // Let's check what the API returns or what we displayed before.
    // Before: order.status === 'sent' || order.status === 'تکمیل شده' -> completed

    const isCompleted = status === 'sent' || status === 'completed' || status === 'تکمیل شده';

    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'completed'
          ? isCompleted
          : filterStatus === 'pending'
            ? !isCompleted
            : true;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

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
          {!isListEmpty && 'سفارشات'}
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
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-[#F0F3F7] h-[48px]">
                <tr>
                  <th className="px-6 text-right text-[#666D80] text-xs font-semibold ">#</th>
                  <th className="px-6 text-right text-[#666D80] text-xs font-semibold ">
                    کد سفارش
                  </th>
                  <th className="px-6 text-right text-[#666D80] text-xs font-semibold ">
                    نام محصول
                  </th>
                  <th className="px-6 text-right text-[#666D80] text-xs font-semibold ">مشتری</th>
                  <th className="px-6 text-right text-[#666D80] text-xs font-semibold ">
                    مبلغ کل (ریال)
                  </th>
                  <th className="px-6 text-right text-[#666D80] text-xs font-semibold ">تاریخ</th>
                  <th className="px-6 text-right text-[#666D80] text-xs font-semibold ">وضعیت</th>
                  <th className="px-6 text-center text-[#666D80] text-xs font-semibold ">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F4F7]">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      در حال بارگذاری...
                    </td>
                  </tr>
                ) : currentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      سفارشی یافت نشد
                    </td>
                  </tr>
                ) : (
                  currentOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-6 py-4 text-[#0D0D12] text-sm font-num-medium font-normal">
                        {toFarsiNumber(startIndex + index + 1)}
                      </td>
                      <td className="px-6 py-4 text-[#0D0D12] text-sm font-num-medium font-normal">
                        {toFarsiNumber(order.id)}
                      </td>
                      <td className="px-6 py-4 text-[#0D0D12] text-sm font-medium ">
                        <div className="flex items-center gap-2">
                          {order.product?.image_path && (
                            <img
                              src={`https://digikara.back.adiaweb.dev/storage/${order.product.image_path}`}
                              alt=""
                              className="w-8 h-8 rounded object-cover"
                            />
                          )}
                          <span className="line-clamp-1 max-w-[150px]">
                            {order.product?.title || 'نامشخص'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#666D80] text-sm font-normal ">
                        {order.user?.firstname} {order.user?.lastname}
                      </td>
                      <td className="px-6 py-4 text-[#0D0D12] text-sm font-num-medium font-normal">
                        {formatPrice(order.total_price)}
                      </td>
                      <td className="px-6 py-4 text-[#666D80] text-sm font-num-medium font-normal">
                        {toFarsiNumber(order.jalali_date || '۱۴۰۲/۰۱/۰۱')}
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                                ${
                                                  order.status === 'sent' ||
                                                  order.status === 'تکمیل شده'
                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                                }`}
                        >
                          {order.status === 'sent' ? 'تکمیل شده' : 'در انتظار'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center">
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="w-full h-[52px] px-6 py-3 bg-white border-t border-[#DCE4E8] flex justify-between items-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex justify-center items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-[#DCE4E8] text-[#818898] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
              <span className="text-xs font-semibold font-['PeydaWeb']">قبلی</span>
            </button>

            <div className="flex justify-center items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-num-medium flex justify-center items-center transition-colors
                                    ${
                                      currentPage === page
                                        ? 'bg-[#F9FAFB] text-[#0D0D12] border border-[#DFE1E7]'
                                        : 'text-[#666D80] hover:bg-gray-50'
                                    }`}
                >
                  {toFarsiNumber(page)}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex justify-center items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-[#DCE4E8] text-[#818898] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-xs font-semibold font-['PeydaWeb']">بعدی</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Popup */}
      {selectedOrder && (
        <ManagerOrderPopup
          orderId={selectedOrder.id}
          onClose={() => setSelectedOrder(null)}
          onUpdate={() => {
            fetchOrders();
            // Optional: Keep popup open or close it? usually nice to keep open to see change or close.
            // For now let's keep it open or just refresh data.
            // Actually, better to just refresh table when popup closes or if we want real-time update.
            // But fetchOrders will update the list background.
          }}
        />
      )}
    </div>
  );
};

export default ManagerOrdersTable;

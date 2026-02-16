'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Search, Filter, ArrowUpDown, Eye } from 'lucide-react';
import { Order } from '@/app/services/studentService';
import { toFarsiNumber } from '@/app/services/common/utils';
import { Skeleton } from '@/app/components/Skeleton';
import Image from 'next/image';

export interface OrderTableProps {
  orders: Order[];
  loading?: boolean;
  onRowClick?: (order: Order) => void;
  showCheckboxes?: boolean;
  onSelectRow?: (id: string | number) => void;
  onSelectAll?: () => void;
  selectedOrderIds?: (string | number)[];
}

export const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Completed':
      return {
        bg: 'bg-[#ECFDF3]',
        text: 'text-[#027A48]',
        dot: 'bg-[#12B76A]',
      };
    case 'Pending':
      return {
        bg: 'bg-[#FFFAEB]',
        text: 'text-[#B54708]',
        dot: 'bg-[#F79009]',
      };
    case 'Cancelled':
      return {
        bg: 'bg-[#FEF3F2]',
        text: 'text-[#B42318]',
        dot: 'bg-[#F04438]',
      };
    default:
      return {
        bg: 'bg-[#F2F4F7]',
        text: 'text-[#344054]',
        dot: 'bg-[#667085]',
      };
  }
};

export function OrderTable({
  orders,
  loading = false,
  onRowClick,
  showCheckboxes = false,
  onSelectRow,
  onSelectAll,
  selectedOrderIds = [],
}: OrderTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('newest');

  const itemsPerPage = 8;

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.id && order.id.toString().includes(searchQuery)) ||
      (order.productName && order.productName.includes(searchQuery));

    const matchesStatus = statusFilter === 'all' ? true : order.statusText === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sorting Logic
  const filteredAndSortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortOption) {
      case 'amount-asc':
        return Number(a.amount || 0) - Number(b.amount || 0);
      case 'amount-desc':
        return Number(b.amount || 0) - Number(a.amount || 0);
      case 'oldest':
        return Number(a.id) - Number(b.id);
      case 'newest':
      default:
        return Number(b.id) - Number(a.id);
    }
  });



  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);

  // Slice for current page
  const currentOrders = filteredAndSortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const isAllSelected =
    currentOrders.length > 0 && currentOrders.every((item) => selectedOrderIds.includes(item.id));

  if (loading) {
    return (
      <div className="w-full bg-white rounded-xl border border-[#DFE1E7] overflow-hidden">
        <div className="p-4 border-b border-[#DFE1E7] bg-gray-50/50">
          <Skeleton className="h-6 w-32" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center p-4 border-b border-[#DFE1E7] gap-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return null;
  }

  return (
    <div className="w-full space-y-4" dir="rtl">
      {/* Search and Filters */}
      <div className="w-full flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-[#DFE1E7] shadow-sm">
        <div className="relative w-full lg:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="جستجو در سفارشات..."
            className="w-full pr-10 pl-4 py-2.5 rounded-lg border border-[#DFE1E7] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 text-sm font-['PeydaWeb'] font-medium transition-all"
          />
        </div>
        <div className="flex flex-row items-center gap-3 w-full lg:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#DFE1E7] bg-white hover:bg-gray-50 transition-colors flex-1 sm:flex-none sm:w-[180px] relative">
            <Filter className="w-4 h-4 text-gray-500 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border-none outline-none text-sm font-['PeydaWeb'] font-medium text-[#0D0D12] cursor-pointer w-full appearance-none py-0.5 z-10"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="تحویل به مدرسه ">تحویل به مدرسه</option>
              <option value="ارسال نشده">ارسال نشده</option>
              <option value="ارسال شده">ارسال شده</option>
              <option value="در انتظار ارسال">در انتظار ارسال</option>
              <option value="سفارش جدید">سفارش جدید</option>
            </select>
            <ChevronLeft className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#DFE1E7] bg-white hover:bg-gray-50 transition-colors flex-1 sm:flex-none sm:w-[180px] relative">
            <ArrowUpDown className="w-4 h-4 text-gray-500 shrink-0" />
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border-none outline-none text-sm font-['PeydaWeb'] font-medium text-[#0D0D12] cursor-pointer w-full appearance-none py-0.5 z-10"
            >
              <option value="newest">جدیدترین</option>
              <option value="oldest">قدیمی‌ترین</option>
              <option value="amount-asc">کم‌ترین مبلغ</option>
              <option value="amount-desc">بیشترین مبلغ</option>
            </select>
            <ChevronLeft className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full bg-white shadow-sm rounded-xl border border-[#DFE1E7] flex flex-col overflow-hidden mb-8">
        {/* Scrollable Table Container */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] w-[50px] text-center">
                  #
                </th>
                <th className="px-6 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] min-w-[100px]">
                  <div className="flex items-center gap-2.5">
                    {showCheckboxes && (
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${isAllSelected ? 'bg-[#F7C61A] border-[#F7C61A]' : 'bg-white border-[#DFE1E7]'}`}
                        onClick={onSelectAll}
                      >
                        {isAllSelected && (
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
                    )}
                    <span>شناسه</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] min-w-[280px]">
                  محصول
                </th>
                <th className="px-6 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] text-center whitespace-nowrap">
                  تعداد
                </th>
                <th className="px-6 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] text-center whitespace-nowrap">
                  مبلغ (ریال)
                </th>
                <th className="px-6 py-4 text-[#666D80] font-medium text-sm font-['PeydaWeb'] text-center whitespace-nowrap">
                  وضعیت
                </th>
                <th className="px-6 py-4 w-[60px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredAndSortedOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-500 font-['PeydaWeb']"
                  >
                    هیچ سفارشی با این مشخصات یافت نشد.
                  </td>
                </tr>
              ) : (
                currentOrders.map((order, index) => {
                  const styles = getStatusStyles(order.status);
                  const isSelected = selectedOrderIds.includes(order.id);

                  return (
                    <tr
                      key={order.id}
                      className={cn(
                        'hover:bg-gray-50/80 transition-colors group cursor-pointer',
                        isSelected && 'bg-amber-50',
                      )}
                      onClick={() => onRowClick && onRowClick(order)}
                    >
                      {/* Number */}
                      <td className="px-4 py-4 text-center text-[#666D80] font-['PeydaFaNum'] font-medium">
                        {toFarsiNumber((currentPage - 1) * itemsPerPage + index + 1)}
                      </td>

                      {/* ID */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          {showCheckboxes && (
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${isSelected ? 'bg-[#F7C61A] border-[#F7C61A]' : 'bg-white border-[#DFE1E7]'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectRow?.(order.id);
                              }}
                            >
                              {isSelected && (
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
                          )}
                          <span className="text-[#0D0D12] font-['PeydaFaNum'] font-semibold text-sm">
                            {toFarsiNumber(order.id)}
                          </span>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg border border-gray-100 overflow-hidden flex-shrink-0 bg-gray-50">
                            {order.productImage ? (
                              <Image
                                src={order.productImage}
                                alt={order.productName || 'محصول'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 min-w-0">
                            <span
                              className="text-[#0D0D12] font-semibold font-['PeydaWeb'] truncate"
                              title={order.productName}
                            >
                              {order.productName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Count */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-[#0D0D12] font-['PeydaFaNum'] text-sm">
                          {toFarsiNumber(order.count || 0)}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-[#0D0D12] font-bold font-['PeydaFaNum'] text-sm">
                          {toFarsiNumber(
                            order.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0',
                          )}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center">
                          <div
                            className={`h-5 px-2 py-0.5 rounded-2xl flex items-center gap-1 max-w-full ${styles.bg}`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${styles.dot}`}
                            />
                            <span
                              className={`text-xs font-['PeydaFaNum'] font-normal truncate ${styles.text}`}
                            >
                              {order.statusText}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-left">
                        <div className="flex justify-end">
                          <div
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onRowClick) onRowClick(order);
                            }}
                          >
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {orders.length > 0 && (
          <div className="w-full px-5 py-4 flex justify-between items-center border-t border-[#E5E7EB] bg-gray-50/30">
            <div className="text-center text-[#666D80] text-sm font-num-medium leading-[21px] tracking-wide">
              صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}
            </div>
            <div className="flex justify-start items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={cn(
                  'w-9 h-9 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center transition-all',
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed bg-gray-50'
                    : 'hover:bg-white hover:shadow-sm hover:border-gray-300',
                )}
              >
                <ChevronRight className="w-5 h-5 text-[#666D80]" />
              </button>

              <div className="h-9 min-w-[36px] px-3 bg-white rounded-lg border border-[#DFE1E7] flex items-center justify-center text-[#0D0D12] text-sm font-['PeydaFaNum'] font-medium">
                {toFarsiNumber(currentPage)}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={cn(
                  'w-9 h-9 bg-white rounded-lg border border-[#DFE1E7] flex justify-center items-center transition-all',
                  currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed bg-gray-50'
                    : 'hover:bg-white hover:shadow-sm hover:border-gray-300',
                )}
              >
                <ChevronLeft className="w-5 h-5 text-[#666D80]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

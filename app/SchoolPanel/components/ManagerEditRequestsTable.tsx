'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { managerService, EditRequest } from '@/app/services/manager/managerService';
import ManagerEditRequestPopup from './ManagerEditRequestPopup';
import Image from 'next/image';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const getImageSrc = (path: string | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `https://digikara.back.adiaweb.dev/storage/${path.replace(/^\//, '')}`;
};

const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
  'تایید شده':      { bg: '#ECFDF5', color: '#065F46', label: 'تایید شده' },
  'رد شده':         { bg: '#FEF2F2', color: '#991B1B', label: 'رد شده' },
  'در انتظار تایید':{ bg: '#FFFBEB', color: '#92400E', label: 'در انتظار تایید' },
};

const getStatus = (status: string | undefined) =>
  statusConfig[status || ''] ?? { bg: '#F3F4F6', color: '#374151', label: status || 'در انتظار تایید' };

const ManagerEditRequestsTable = () => {
  const [requests, setRequests] = useState<EditRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<EditRequest | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = React.useRef<HTMLDivElement>(null);
  const itemsPerPage = 7;

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await managerService.getProductEditRequests();
      if (response.success && response.data) {
        setRequests(response.data);
      }
    } catch (error) {
      console.error('Failed to load edit requests', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Filter Logic
  const filteredRequests = requests.filter((req) => {
    const title = req.newProduct?.model_data?.title || req.oldProduct?.model_data?.title || '';
    const name = `${req.firstname || ''} ${req.lastname || ''}`;
    const school = req.school_name || '';

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.toLowerCase().includes(searchQuery.toLowerCase());

    const mappedStatus = req.status || 'در انتظار تایید';
    const matchesFilter =
      filterStatus === 'all'
        ? true
        : filterStatus === 'approved'
          ? mappedStatus === 'تایید شده'
          : filterStatus === 'pending'
            ? mappedStatus !== 'تایید شده' && mappedStatus !== 'رد شده'
            : true;

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage((p) => p - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage((p) => p + 1); };

  // Close filter when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isListEmpty = !loading && filteredRequests.length === 0;

  if (loading)
    return (
      <div className="w-full h-40 flex items-center justify-center text-gray-500 font-['PeydaWeb']">
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
        <div />
        <div className="flex justify-start items-center gap-2 w-full max-w-md">
          {/* Search Box */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="جستجو در درخواست‌های ویرایش..."
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
          <div className="text-[#0D0D12] font-semibold font-['PeydaWeb']">درخواست ویرایشی یافت نشد</div>
          <div className="text-[#666D80] text-sm font-['PeydaWeb']">نتیجه‌ای با این مشخصات پیدا نشد.</div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="min-w-[900px] flex flex-col">
            {/* Table Header */}
            <div className="w-full bg-[#F6F8FA] border-b border-[#DFE1E7] flex justify-end items-center px-2">
              <div className="w-14 h-10 px-3 flex justify-center items-center">
                <div className="text-center text-[#666D80] text-xs font-semibold font-['PeydaWeb']">#</div>
              </div>
              <div className="w-[80px] h-10 px-3 flex justify-center items-center">
                <div className="text-center text-[#666D80] text-xs font-semibold font-['PeydaWeb']">تصویر جدید</div>
              </div>
              <div className="w-[200px] h-10 px-3 flex justify-center items-center">
                <div className="text-center text-[#666D80] text-xs font-semibold font-['PeydaWeb']">نام محصول (جدید)</div>
              </div>
              <div className="w-[160px] h-10 px-3 flex justify-center items-center">
                <div className="text-center text-[#666D80] text-xs font-semibold font-['PeydaWeb']">نام محصول (قدیم)</div>
              </div>
              <div className="w-[160px] h-10 px-3 flex justify-center items-center">
                <div className="text-center text-[#666D80] text-xs font-semibold font-['PeydaWeb']">نام دانش آموز</div>
              </div>
              <div className="w-[140px] h-10 px-3 flex justify-center items-center">
                <div className="text-center text-[#666D80] text-xs font-semibold font-['PeydaWeb']">وضعیت</div>
              </div>
              <div className="w-[120px] h-10 px-3 flex justify-center items-center">
                <div className="text-[#666D80] text-xs font-semibold font-['PeydaWeb']">عملیات</div>
              </div>
            </div>

            {/* Table Body */}
            {currentItems.map((req, idx) => {
              const itemIndex = indexOfFirstItem + idx + 1;
              const newTitle = req.newProduct?.model_data?.title || req.newProduct?.title || '—';
              const oldTitle = req.oldProduct?.model_data?.title || req.oldProduct?.title || '—';
              const imgPath = req.newProduct?.model_data?.image_path || req.newProduct?.image_path;
              const imgSrc = getImageSrc(imgPath);
              const { bg, color, label } = getStatus(req.status);
              const isPending = req.status !== 'تایید شده' && req.status !== 'رد شده';

              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className="w-full h-16 border-b border-[#DFE1E7] flex justify-end items-center px-2 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {/* Row number */}
                  <div className="w-14 h-16 px-3 flex justify-center items-center">
                    <span className="text-[#C0C4CC] text-xs font-num-medium">{toFarsiNumber(itemIndex)}</span>
                  </div>

                  {/* New product image */}
                  <div className="w-[80px] h-16 px-3 flex justify-center items-center">
                    {imgSrc ? (
                      <div className="w-10 h-10 relative flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                        <Image src={imgSrc} alt="product" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0" />
                    )}
                  </div>

                  {/* New product name */}
                  <div className="w-[200px] h-16 px-3 flex justify-center items-center">
                    <span className="text-[#0D0D12] text-sm font-medium font-['PeydaWeb'] truncate w-full text-center" dir="auto">
                      {newTitle}
                    </span>
                  </div>

                  {/* Old product name */}
                  <div className="w-[160px] h-16 px-3 flex justify-center items-center">
                    <span className="text-[#818898] text-sm font-medium font-['PeydaWeb'] truncate w-full text-center line-through" dir="auto">
                      {oldTitle}
                    </span>
                  </div>

                  {/* Student name */}
                  <div className="w-[160px] h-16 px-3 flex justify-center items-center">
                    <span className="text-[#0D0D12] text-sm font-medium font-['PeydaWeb'] truncate w-full text-center">
                      {req.firstname} {req.lastname}
                    </span>
                  </div>

                  {/* Status badge */}
                  <div className="w-[140px] h-16 px-3 flex justify-center items-center">
                    <span
                      className="px-2 py-0.5 rounded-2xl text-[11px] font-medium font-['PeydaWeb'] whitespace-nowrap"
                      style={{ backgroundColor: bg, color }}
                    >
                      {label}
                    </span>
                  </div>

                  {/* Action */}
                  <div className="w-[120px] h-16 px-3 flex justify-center items-center">
                    {isPending ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedRequest(req); }}
                        className="h-8 px-4 bg-[#0A33FF] hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap font-['PeydaWeb']"
                      >
                        بررسی درخواست
                      </button>
                    ) : (
                      <span className="text-[#C0C4CC] text-xs font-['PeydaWeb']">بررسی شده</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer / Pagination */}
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
          <span className="text-[#0D0D12] text-sm font-num-medium font-medium">
            صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}
          </span>
        </div>
      )}

      {/* Popup */}
      {selectedRequest && (
        <ManagerEditRequestPopup
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdate={fetchRequests}
        />
      )}
    </div>
  );
};

export default ManagerEditRequestsTable;

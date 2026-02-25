'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { managerService, StudentRequest } from '@/app/services/manager/managerService';
import Image from 'next/image';
import StudentRequestDetailsPopup from './StudentRequestDetailsPopup';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const getImageSrc = (path: string | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `https://digikara.back.adiaweb.dev/storage/${path.replace(/^\//, '')}`;
};

const formatDate = (iso: string | undefined): string => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const STATUS_CONFIG: Record<string, { bg: string; color: string }> = {
  'تایید شده':     { bg: '#ECFDF5', color: '#065F46' },
  'رد شده':        { bg: '#FEF2F2', color: '#991B1B' },
  'در حال بررسی': { bg: '#FFFBEB', color: '#92400E' },
};

const getStatusStyle = (status: string | undefined) =>
  STATUS_CONFIG[status || ''] ?? { bg: '#F3F4F6', color: '#374151' };

const TYPE_CONFIG: Record<string, { bg: string; color: string; short: string }> = {
  'درخواست ایجاد محصول':  { bg: '#EFF6FF', color: '#1D4ED8', short: 'ایجاد' },
  'درخواست ویرایش محصول': { bg: '#FFF7ED', color: '#C2410C', short: 'ویرایش' },
};

const getTypeStyle = (type: string) =>
  TYPE_CONFIG[type] ?? { bg: '#F3F4F6', color: '#374151', short: type };

const StudentRequestsTable = () => {
  const [requests, setRequests] = useState<StudentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<StudentRequest | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = React.useRef<HTMLDivElement>(null);
  const itemsPerPage = 7;

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await managerService.getProductEditRequests();
      if (response.success && response.data) {
        setRequests(response.data as StudentRequest[]);
      }
    } catch (error) {
      console.error('Failed to load student requests', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const filteredRequests = requests.filter((req) => {
    const title = req.model_data?.title || '';
    const name = `${req.firstname || ''} ${req.lastname || ''}`;
    const school = req.school_name || '';

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all'    ? true :
      filterStatus === 'approved' ? req.status === 'تایید شده' :
      filterStatus === 'rejected' ? req.status === 'رد شده' :
      req.status === 'در حال بررسی';

    const matchesType =
      filterType === 'all'    ? true :
      filterType === 'create' ? req.model_type === 'درخواست ایجاد محصول' :
      req.model_type === 'درخواست ویرایش محصول';

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, filterStatus, filterType]);

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

  const isListEmpty = !loading && filteredRequests.length === 0;

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
        className={`w-full min-h-16 px-5 py-2 ${!isListEmpty ? 'border-b border-[#DFE1E7] bg-white' : ''} flex flex-wrap justify-between items-center gap-2 mb-4`}
      >
        {/* Type pills */}
        <div className="flex items-center gap-2">
          {(['all', 'create', 'edit'] as const).map((t) => {
            const labels: Record<string, string> = { all: 'همه', create: 'ایجاد', edit: 'ویرایش' };
            const active = filterType === t;
            return (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`h-7 px-3 rounded-full text-xs font-semibold transition-all border ${active ? 'bg-[#0A33FF] text-white border-[#0A33FF]' : 'bg-white text-[#666D80] border-[#DFE1E7] hover:bg-gray-50'}`}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>

        {/* Search + Status filter */}
        <div className="flex justify-start items-center gap-2 max-w-sm w-full">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="جستجو در درخواست‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pr-9 pl-4 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] text-sm text-[#0D0D12] focus:outline-blue-500 transition-colors"
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
                  {filterStatus === 'all' ? 'وضعیت' :
                   filterStatus === 'approved' ? 'تایید شده' :
                   filterStatus === 'rejected' ? 'رد شده' : 'در بررسی'}
                </span>
              </div>
              {isFilterOpen && (
                <div
                  className="absolute top-12 left-0 z-50 w-48 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-[#EFF0F2] p-2 flex flex-col gap-1"
                  dir="rtl"
                >
                  <div className="text-[#666D80] text-xs font-medium px-2 py-1 mb-1 border-b border-gray-100 text-right">
                    فیلتر وضعیت
                  </div>
                  {[
                    { label: 'همه',          value: 'all' },
                    { label: 'در حال بررسی', value: 'pending' },
                    { label: 'تایید شده',    value: 'approved' },
                    { label: 'رد شده',       value: 'rejected' },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => { setFilterStatus(option.value); setIsFilterOpen(false); }}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${filterStatus === option.value ? 'bg-[#F7C61A] border-[#F7C61A]' : 'border-[#DFE1E7] bg-white'}`}>
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

      {/* Empty state */}
      {isListEmpty ? (
        <div className="w-full flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-xl border border-[#DCE4E8] border-dashed">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <div className="text-[#0D0D12] font-semibold">درخواستی یافت نشد</div>
          <div className="text-[#666D80] text-sm">نتیجه‌ای با این مشخصات پیدا نشد.</div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="min-w-[1000px] flex flex-col">
            {/* Table Header */}
            <div className="w-full bg-[#F6F8FA] border-b border-[#DFE1E7] flex justify-end items-center px-2">
              {[
                { label: '#',         w: 'w-14' },
                { label: 'نوع',       w: 'w-[110px]' },
                { label: 'تصویر',     w: 'w-[70px]' },
                { label: 'نام محصول', w: 'w-[180px]' },
                { label: 'دانش آموز', w: 'w-[160px]' },
                { label: 'مدرسه',     w: 'w-[150px]' },
                { label: 'تاریخ',     w: 'w-[110px]' },
                { label: 'وضعیت',     w: 'w-[130px]' },
                { label: 'عملیات',    w: 'w-[100px]' },
              ].map((col) => (
                <div key={col.label} className={`${col.w} h-10 px-2 flex justify-center items-center`}>
                  <span className="text-center text-[#666D80] text-xs font-semibold">{col.label}</span>
                </div>
              ))}
            </div>

            {/* Table Body */}
            {currentItems.map((req, idx) => {
              const itemIndex = indexOfFirstItem + idx + 1;
              const imgSrc = getImageSrc(req.model_data?.image_path);
              const typeStyle = getTypeStyle(req.model_type);
              const statusStyle = getStatusStyle(req.status);
              const isPending = req.status === 'در حال بررسی';

              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className="w-full h-16 border-b border-[#DFE1E7] flex justify-end items-center px-2 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-14 h-16 px-2 flex justify-center items-center">
                    <span className="text-[#C0C4CC] text-xs font-num-medium">{toFarsiNumber(itemIndex)}</span>
                  </div>
                  <div className="w-[110px] h-16 px-2 flex justify-center items-center">
                    <span
                      className="px-2 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap"
                      style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}
                    >
                      {typeStyle.short}
                    </span>
                  </div>
                  <div className="w-[70px] h-16 px-2 flex justify-center items-center">
                    {imgSrc ? (
                      <div className="w-9 h-9 relative flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                        <Image src={imgSrc} alt="product" fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <div className="w-9 h-9 bg-gray-100 rounded-lg flex-shrink-0" />
                    )}
                  </div>
                  <div className="w-[180px] h-16 px-2 flex justify-center items-center">
                    <span className="text-center text-[#0D0D12] text-sm font-semibold truncate w-full" dir="auto">
                      {req.model_data?.title || '—'}
                    </span>
                  </div>
                  <div className="w-[160px] h-16 px-2 flex justify-center items-center">
                    <span className="text-center text-[#0D0D12] text-sm truncate w-full">
                      {req.firstname} {req.lastname}
                    </span>
                  </div>
                  <div className="w-[150px] h-16 px-2 flex justify-center items-center">
                    <span className="text-center text-[#666D80] text-xs truncate w-full">
                      {req.school_name}
                    </span>
                  </div>
                  <div className="w-[110px] h-16 px-2 flex justify-center items-center">
                    <span className="text-center text-[#818898] text-xs font-num-medium">
                      {formatDate(req.created_at)}
                    </span>
                  </div>
                  <div className="w-[130px] h-16 px-2 flex justify-center items-center">
                    <span
                      className="px-2 py-0.5 rounded-2xl text-[11px] font-medium whitespace-nowrap"
                      style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                    >
                      {req.status}
                    </span>
                  </div>
                  <div className="w-[100px] h-16 px-2 flex justify-center items-center">
                    {isPending ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedRequest(req); }}
                        className="h-8 px-3 bg-[#0A33FF] hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        بررسی
                      </button>
                    ) : (
                      <span className="text-[#C0C4CC] text-xs">بررسی شده</span>
                    )}
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
              <span className="text-[#0D0D12] text-xs font-num-medium">
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
          <span className="text-[#0D0D12] text-sm font-num-medium">
            صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}
          </span>
        </div>
      )}

      {selectedRequest && (
        <StudentRequestDetailsPopup
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdate={fetchRequests}
        />
      )}
    </div>
  );
};

export default StudentRequestsTable;

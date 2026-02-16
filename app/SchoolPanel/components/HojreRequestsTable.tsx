'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Search, Filter, ChevronRight, ChevronLeft } from 'lucide-react';
import { managerService } from '@/app/services/manager/managerService';
import HojreRequestPopup from './HojreRequestPopup';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

interface StudentRequest {
  id: number;
  user_id: number;
  school_id: number;
  model_type: string;
  model_data: {
    logo?: string;
    name: string;
    image: unknown[];
    skill: string;
    user_id: number;
    school_id: number;
    experience: string;
    description: string;
  };
  created_at: string;
  approved: boolean;
  firstname: string;
  lastname: string;
  school_name: string;
  field: string;
  grade: string;
}

const HojreRequestsTable = () => {
  const [requests, setRequests] = useState<StudentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);

  // Filter & Pagination State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filterRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 7;

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await managerService.getStudentRequests();
      if (response.success && response.data) {
        setRequests(response.data as StudentRequest[]);
      }
    } catch (error) {
      console.error('Failed to fetch requests', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Filter Logic
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      (req.model_data.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.firstname || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.lastname || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.school_name || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'approved'
          ? req.approved
          : filterStatus === 'pending'
            ? !req.approved
            : true;

    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  // Close filter onclick outside
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

  const handleApprove = async (e: React.MouseEvent, req: StudentRequest) => {
    e.stopPropagation(); // Prevent row click
    if (req.approved) return;

    try {
      const response = await managerService.approveStudentRequest(req.id);
      if (response.success) {
        // Refresh list
        fetchRequests();
      }
    } catch (error) {
      console.error('Failed to approve request', error);
    }
  };

  const isListEmpty = !loading && filteredRequests.length === 0;

  if (loading)
    return (
      <div className="w-full h-20 flex justify-center items-center text-sm text-[#666D80]">
        در حال بارگذاری...
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-1 mb-0" dir="rtl">
      {/* Title */}
      {!isListEmpty && (
        <div className="w-full text-[#0D0D12] text-18 font-semibold leading-tight tracking-wide text-right mb-4">
          درخواست‌های ایجاد حجره
        </div>
      )}

      <div
        className={`w-full ${!isListEmpty ? 'bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] overflow-hidden' : ''} flex flex-col justify-start items-end`}
      >
        {/* Search & Filter */}
        <div
          className={`w-full px-5 py-4 ${!isListEmpty ? 'border-b border-[#DFE1E7] bg-white' : ''} flex flex-col gap-4`}
        >
          <div className="flex justify-start items-center gap-2 w-full">
            {/* Search Box */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="جستجو..."
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
                  <span className="text-xs font-semibold text-[#666D80]">
                    {filterStatus === 'all'
                      ? 'همه'
                      : filterStatus === 'approved'
                        ? 'تایید شده'
                        : 'در انتظار'}
                  </span>
                </div>

                {/* Filter Dropdown */}
                {isFilterOpen && (
                  <div className="absolute top-12 left-0 z-50 w-48 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-[#EFF0F2] p-2 flex flex-col gap-1 anim-fade-in">
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
            <div className="text-[#0D0D12] font-semibold">درخواستی یافت نشد</div>
            <div className="text-[#666D80] text-sm">نتیجه‌ای با این مشخصات پیدا نشد.</div>
          </div>
        ) : (
          /* Table */
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="min-w-[1000px] flex flex-col">
              {/* Table Header */}
              <div className="w-full bg-[#F6F8FA] border-b border-[#DFE1E7] flex justify-start items-center px-2">
                <div className="w-14 h-10 px-3 flex justify-center items-center">
                  <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                    #
                  </div>
                </div>
                <div className="flex-[2] min-w-[200px] h-10 px-3 flex justify-start items-center">
                  <div className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                    اطلاعات حجره
                  </div>
                </div>
                <div className="flex-1 min-w-[150px] h-10 px-3 flex justify-start items-center">
                  <div className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                    مدرسه / پایه
                  </div>
                </div>
                <div className="w-[130px] h-10 px-3 flex justify-center items-center">
                  <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                    تاریخ درخواست
                  </div>
                </div>
                <div className="w-[110px] h-10 px-3 flex justify-center items-center">
                  <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                    وضعیت
                  </div>
                </div>
                <div className="w-[140px] h-10 px-3 flex justify-center items-center">
                  <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                    عملیات
                  </div>
                </div>
              </div>

              {/* Table Body */}
              {currentItems.map((req, idx) => {
                const itemIndex = indexOfFirstItem + idx + 1;
                // Status logic
                const isApproved = req.approved;
                const statusBg = isApproved ? '#ECF9F7' : '#FFF4E5'; // Greenish for approved, Orangeish for pending
                const statusColor = isApproved ? '#267666' : '#B98900';
                const statusLabel = isApproved ? 'تایید شده' : 'در انتظار تایید';

                return (
                  <div
                    key={req.id}
                    onClick={() => setSelectedRequestId(req.id)}
                    className="w-full h-16 border-b border-[#DFE1E7] flex justify-start items-center px-2 hover:bg-gray-50 transition-colors group cursor-pointer"
                  >
                    {/* Index */}
                    <div className="w-14 h-16 px-3 flex justify-center items-center">
                      <span className="text-center text-[#0D0D12] text-sm font-num-medium font-medium">
                        {toFarsiNumber(itemIndex)}
                      </span>
                    </div>

                    {/* Hojre Info */}
                    <div className="flex-[2] min-w-[200px] h-16 px-3 flex justify-start items-center gap-3">
                      <div className="w-10 h-10 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {req.model_data.logo ? (
                          <Image
                            src={`https://digikara.back.adiaweb.dev/storage/${req.model_data.logo}`}
                            alt={req.model_data.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            Logo
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5 max-w-[calc(100%-3rem)]">
                        <span className="text-[#0D0D12] text-sm font-medium font-semibold truncate">
                          {req.model_data.name}
                        </span>
                        <span className="text-[#666D80] text-xs font-medium truncate">
                          {req.firstname} {req.lastname}
                        </span>
                      </div>
                    </div>

                    {/* School Info */}
                    <div className="flex-1 min-w-[150px] h-16 px-3 flex flex-col justify-center items-start gap-0.5">
                      <span className="text-[#0D0D12] text-sm font-medium font-semibold truncate max-w-full">
                        {req.school_name}
                      </span>
                      <span className="text-[#666D80] text-xs font-medium truncate max-w-full">
                        {req.grade} - {req.field}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="w-[130px] h-16 px-3 flex justify-center items-center">
                      <span
                        className="text-[#0D0D12] text-sm font-num-medium font-semibold"
                        dir="ltr"
                      >
                        {toFarsiNumber(new Date(req.created_at).toLocaleDateString('fa-IR'))}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="w-[110px] h-16 px-3 flex justify-center items-center">
                      <div
                        className="px-2 py-0.5 rounded-2xl flex justify-center items-center"
                        style={{ backgroundColor: statusBg }}
                      >
                        <span
                          className="text-[12px] font-num-medium whitespace-nowrap"
                          style={{ color: statusColor }}
                        >
                          {statusLabel}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="w-[140px] h-16 px-3 flex justify-center items-center gap-2">
                      {!isApproved ? (
                        <button
                          onClick={(e) => handleApprove(e, req)}
                          className="h-8 px-4 bg-[#0A33FF] hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors"
                        >
                          تایید درخواست
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">---</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pagination Footer */}
        {!isListEmpty && totalPages > 1 && (
          <div className="w-full px-5 py-4 flex justify-between items-center bg-white border-t border-[#DFE1E7]">
            <div className="flex items-center gap-2">
              <div
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
        {selectedRequestId && (
          <HojreRequestPopup
            requestId={selectedRequestId}
            onClose={() => setSelectedRequestId(null)}
            onApprove={() => {
              fetchRequests();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HojreRequestsTable;

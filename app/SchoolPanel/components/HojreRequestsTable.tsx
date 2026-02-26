'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Search, Filter, ChevronRight, ChevronLeft } from 'lucide-react';
import { managerService } from '@/app/services/manager/managerService';
import HojreRequestPopup from './HojreRequestPopup';
import ConfirmationModal from './ConfirmationModal';

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
  status: string;
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
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<StudentRequest | null>(null);
  const [isApproving, setIsApproving] = useState(false);

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
          ? req.status === 'تایید شده'
          : filterStatus === 'pending'
            ? req.status !== 'تایید شده'
            : true;

    return matchesSearch && matchesStatus;
  });

  // Sort newest first
  const sortedRequests = [...filteredRequests].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Pagination Logic
  const totalPages = Math.ceil(sortedRequests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedRequests.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleApprove = (e: React.MouseEvent, req: StudentRequest) => {
    e.stopPropagation(); // Prevent row click
    if (req.status === 'تایید شده') return;
    
    setSelectedRequest(req);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmation = async (status: 2 | 1 | 0, description?: string | null) => {
    if (!selectedRequest) return;

    setIsApproving(true);
    try {
      const response = await managerService.approveStudentRequest(selectedRequest.id, status, description);
      if (response.success) {
        // Refresh list
        fetchRequests();
        setIsConfirmationModalOpen(false);
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error('Failed to approve request', error);
    } finally {
      setIsApproving(false);
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
      <div className="w-full text-[#0D0D12] text-28 font-semibold leading-tight tracking-wide text-right mt-4 mb-2">
        درخواست‌های ایجاد حجره
      </div>

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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F6F8FA] border-b border-[#DFE1E7]">
                  <th className="h-10 px-4 text-center text-[#666D80] text-sm font-semibold whitespace-nowrap">#</th>
                  <th className="h-10 px-4 text-right text-[#666D80] text-sm font-semibold whitespace-nowrap">اطلاعات حجره</th>
                  <th className="h-10 px-4 text-center text-[#666D80] text-sm font-semibold whitespace-nowrap">وضعیت</th>
                  <th className="h-10 px-4 text-center text-[#666D80] text-sm font-semibold whitespace-nowrap">عملیات</th>
                  <th className="h-10 px-4 text-right text-[#666D80] text-sm font-semibold whitespace-nowrap">مدرسه / پایه</th>
                  <th className="h-10 px-4 text-center text-[#666D80] text-sm font-semibold whitespace-nowrap">تاریخ درخواست</th>
                </tr>
              </thead>

              <tbody>
              {currentItems.map((req, idx) => {
                const itemIndex = indexOfFirstItem + idx + 1;
                const isApproved = req.status === 'تایید شده';
                const isRejected = req.status === 'رد شده';
                let statusBg = '#FFF4E5';
                let statusColor = '#B98900';
                if (isApproved) { statusBg = '#ECF9F7'; statusColor = '#267666'; }
                else if (isRejected) { statusBg = '#FEE2E2'; statusColor = '#DC2626'; }
                const statusLabel = req.status || 'در انتظار تایید';

                return (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedRequestId(req.id)}
                    className="border-b border-[#DFE1E7] hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {/* Index */}
                    <td className="h-16 px-4 text-center whitespace-nowrap">
                      <span className="text-[#0D0D12] text-sm font-num-medium">{toFarsiNumber(itemIndex)}</span>
                    </td>

                    {/* Hojre Info */}
                    <td className="h-16 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
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
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Logo</div>
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[#0D0D12] text-sm font-semibold whitespace-nowrap">{req.model_data.name}</span>
                          <span className="text-[#666D80] text-xs font-medium whitespace-nowrap">{req.firstname} {req.lastname}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="h-16 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex px-2 py-0.5 rounded-2xl" style={{ backgroundColor: statusBg }}>
                        <span className="text-[12px] font-num-medium whitespace-nowrap" style={{ color: statusColor }}>{statusLabel}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="h-16 px-4 text-center whitespace-nowrap">
                      {!isApproved ? (
                        <button
                          onClick={(e) => handleApprove(e, req)}
                          className="h-8 px-4 bg-[#0A33FF] hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                        >
                          بررسی درخواست
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">---</span>
                      )}
                    </td>

                    {/* School Info */}
                    <td className="h-16 px-4 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[#0D0D12] text-sm font-semibold whitespace-nowrap">{req.school_name}</span>
                        <span className="text-[#666D80] text-xs font-medium whitespace-nowrap">{req.grade} - {req.field}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="h-16 px-4 text-center whitespace-nowrap">
                      <span className="text-[#0D0D12] text-sm font-num-medium font-semibold" dir="ltr">
                        {toFarsiNumber(new Date(req.created_at).toLocaleDateString('fa-IR'))}
                      </span>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
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

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => {
            setIsConfirmationModalOpen(false);
            setSelectedRequest(null);
          }}
          onConfirm={handleConfirmation}
          loading={isApproving}
          title="تایید درخواست حجره"
          itemLabel="نام حجره"
          itemName={selectedRequest?.model_data?.name || 'حجره'}
        />
      </div>
    </div>
  );
};

export default HojreRequestsTable;

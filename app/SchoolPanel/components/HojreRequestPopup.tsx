'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  X,
  User,
  School,
  GraduationCap,
  Briefcase,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react';
import Image from 'next/image';
import { managerService } from '@/app/services/manager/managerService';
import ConfirmationModal from './ConfirmationModal';
import { toast } from 'sonner';

interface HojreRequestPopupProps {
  requestId: number;
  onClose: () => void;
  onApprove?: () => void;
}

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const HojreRequestPopup = ({ requestId, onClose, onApprove }: HojreRequestPopupProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await managerService.getStudentRequestById(requestId);
        if (response.success && response.data) {
          setData(response.data as Record<string, unknown>);
        }
      } catch (error) {
        console.error('Failed to fetch request details', error);
      } finally {
        setLoading(false);
      }
    };

    if (requestId) {
      fetchData();
    }
  }, [requestId]);

  const handleConfirmation = async (status: 2 | 1 | 0, description?: string | null) => {
    if (!data) return;

    setIsApproving(true);
    try {
      const response = await managerService.approveStudentRequest(requestId, status, description);
      if (response.success) {
        // Update local state to reflect change immediately
        setData((prev) => prev ? { ...prev, approved: true } : prev);
        setIsConfirmationModalOpen(false);
        toast.success('وضعیت با موفقیت ثبت شد');
        if (onApprove) onApprove();
        onClose();
      }
    } catch (error) {
      console.error('Failed to approve request', error);
    } finally {
      setIsApproving(false);
    }
  };

  if (!requestId) return null;

  const modelData = data?.model_data as { logo?: string; name?: string; skill?: string; experience?: string | number; description?: string } | undefined;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      dir="rtl"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[440px] h-[96vh] bg-white rounded-3xl overflow-hidden flex flex-col relative shadow-2xl animate-in fade-in zoom-in duration-200"
      >
        {/* Header Image Area */}
        <div className="relative w-full h-[200px] bg-[linear-gradient(180deg,#F7C309_0%,#FFF8D6_100%)] shrink-0 flex items-center justify-center">
          
          <div className="absolute top-0 left-0 w-full p-0 flex justify-between items-center z-20 pt-4 px-4">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-[#0C1415]" strokeWidth={2} />
            </button>
            <div className="px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm">
              <span className="text-[#0D0D12] text-xs font-semibold ">
                پروفایل دانش‌آموز
              </span>
            </div>
          </div>

          {loading ? (
            <div className="w-8 h-8 rounded-full border-2 border-t-[#0A33FF] animate-spin" />
          ) : data ? (
            <div className="relative z-10 w-32 h-32 bg-white rounded-full shadow-xl border-4 border-white overflow-hidden mt-4">
               {modelData?.logo ? (
                  <Image
                    src={`https://digikara.back.adiaweb.dev/storage/${modelData.logo}`}
                    alt={modelData.name || ''}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                    <School className="w-12 h-12 text-[#F7C309]" />
                  </div>
                )}
            </div>
          ) : (
            <div className="text-red-500 font-bold">خطا در دریافت اطلاعات</div>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-[100px] bg-white">
          {data && (
            <div className="flex flex-col px-5 pt-4 gap-6">
              
              {/* Title & Status */}
              <div className="flex flex-col items-center gap-2 -mt-2">
                 <h1 className="text-center text-[#0D0D12] text-2xl font-black leading-relaxed tracking-tight">
                    {modelData?.name || 'نامشخص'}
                 </h1>
                 <span className="text-[#6D7280] text-sm font-semibold tracking-wide bg-gray-100 px-3 py-1 rounded-full">
                    {String(data.model_type)}
                 </span>

                 {/* Status Badge */}
                  <div
                    className={`mt-2 h-7 px-3.5 rounded-full flex items-center justify-center border ${
                      data.approved 
                        ? 'bg-[#ECF9F7] border-[#8CD3C5]' 
                        : 'bg-[#FFF4E5] border-[#FDE3B3]'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-1.5 text-xs font-bold ${
                        data.approved ? 'text-[#267666]' : 'text-[#B98900]'
                      }`}
                    >
                      {data.approved ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                      <span>{data.approved ? 'تایید شده' : 'در انتظار تایید'}</span>
                    </div>
                  </div>
              </div>

              <div className="w-full h-[1px] bg-gray-100 mt-2" />
              
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                 <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-1.5 text-[#666D80] text-xs font-medium mb-1">
                        <User className="w-4 h-4 text-gray-400" /> دانش‌آموز
                    </div>
                    <span className="text-[#0D0D12] text-sm font-bold truncate">
                        {String(data.firstname || '')} {String(data.lastname || '')}
                    </span>
                 </div>

                 <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-1.5 text-[#666D80] text-xs font-medium mb-1">
                        <School className="w-4 h-4 text-gray-400" /> مدرسه
                    </div>
                    <span className="text-[#0D0D12] text-sm font-bold truncate">
                        {data.school_name ? String(data.school_name) : '---'}
                    </span>
                 </div>

                 <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-1.5 text-[#666D80] text-xs font-medium mb-1">
                        <GraduationCap className="w-4 h-4 text-gray-400" /> پایه / رشته
                    </div>
                    <span className="text-[#0D0D12] text-sm font-bold truncate">
                       {String(data.grade || '')} - {String(data.field || '')}
                    </span>
                 </div>

                 <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-1.5 text-[#666D80] text-xs font-medium mb-1">
                        <Briefcase className="w-4 h-4 text-gray-400" /> مهارت
                    </div>
                    <span className="text-[#0D0D12] text-sm font-bold truncate">
                       {modelData?.skill || '---'}
                    </span>
                 </div>
              </div>

              {/* Experience */}
              {modelData?.experience && (
                <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-[#0A33FF]" />
                        </div>
                        <span className="text-[#0D0D12] text-sm font-semibold">تجريه کاری ثبت شده</span>
                    </div>
                    <span className="text-[#0047AB] text-sm font-bold font-['PeydaFaNum']">
                        {toFarsiNumber(modelData.experience)} ماه
                    </span>
                </div>
              )}

              <div className="w-full h-[1px] bg-gray-100" />

              {/* Description */}
              <div className="flex flex-col gap-2">
                <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#F7C309]" />
                    توضیحات تکمیلی
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[#6D7280] text-sm font-light leading-relaxed whitespace-pre-wrap break-words">
                        {modelData?.description || 'توضیحات اضافی ثبت نشده است.'}
                    </p>
                </div>
              </div>
              
            </div>
          )}
        </div>

        {/* Bottom Fixed Button Area */}
        {data && (
            <div className="absolute bottom-0 left-0 w-full p-5 bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.02)] z-30">
            {!data.approved ? (
                <button
                onClick={() => setIsConfirmationModalOpen(true)}
                disabled={isApproving}
                className={`w-full h-12 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg ${
                    isApproving
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                    : 'bg-[#F7C309] hover:bg-[#e5b300] text-[#1A1C1E] shadow-[#F7C309]/30'
                }`}
                >
                <span className="text-base font-bold">
                    {isApproving ? 'کمی صبر کنید...' : 'بررسی و تغییر وضعیت'}
                </span>
                </button>
            ) : (
                <div className="w-full h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-sm">
                    این درخواست قبلاً تعیین وضعیت شده است
                </div>
            )}
            </div>
        )}

        {/* Confirmation Modal */}
        {data && (
            <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onClose={() => setIsConfirmationModalOpen(false)}
            onConfirm={handleConfirmation}
            loading={isApproving}
            title="بررسی نهایی حجره"
            itemName={modelData?.name || 'حجره'}
            />
        )}
      </div>
    </div>
  );
};

export default HojreRequestPopup;

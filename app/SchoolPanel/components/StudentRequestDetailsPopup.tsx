'use client';

import React, { useRef, useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Clock, Info, ArrowLeft, ImageIcon } from 'lucide-react';
import {
  managerService,
  StudentRequest,
  StudentRequestDetail,
  FlatProduct,
} from '@/app/services/manager/managerService';
import ConfirmationModal from './ConfirmationModal';
import Image from 'next/image';
import { toast } from 'sonner';

interface Props {
  request: StudentRequest;
  onClose: () => void;
  onUpdate?: () => void;
}

const PRICE_TYPE_LABELS: Record<number, string> = {
  1: 'رنگ',
  2: 'سایز',
  3: 'جنس',
  4: 'گارانتی',
  5: 'متفرقه',
  6: 'وزن',
};

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const formatPrice = (price: number | string | undefined) => {
  if (price === undefined || price === null || price === '') return '—';
  return toFarsiNumber(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) + ' ریال';
};

const normalize = (v: string | number | null | undefined) =>
  v === undefined || v === null ? '' : String(v).trim();

const getImageSrc = (path: string | undefined): string | null => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `https://digikara.back.adiaweb.dev/storage/${path.replace(/^\//, '')}`;
};

const formatDate = (iso: string | undefined): string => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// ─── Field diff row ───────────────────────────────────────────────────────────
const DiffRow = ({
  label,
  oldVal,
  newVal,
  format,
  isTextarea,
}: {
  label: string;
  oldVal: string | number | undefined;
  newVal: string | number | undefined;
  format?: (v: string | number | undefined) => string;
  isTextarea?: boolean;
}) => {
  const displayOld = format ? format(oldVal) : normalize(oldVal) || '—';
  const displayNew = format ? format(newVal) : normalize(newVal) || '—';
  const changed = normalize(oldVal) !== normalize(newVal);

  return (
    <div
      className={`w-full flex flex-col gap-1 px-3 py-2.5 rounded-lg transition-colors ${
        changed ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50 border border-transparent'
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`text-[11px] font-semibold ${
            changed ? 'text-amber-600' : 'text-[#818898]'
          }`}
        >
          {label}
        </span>
        {changed && (
          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
            تغییر
          </span>
        )}
      </div>

      {isTextarea ? (
        <div className="flex flex-col gap-1.5">
          {changed && (
            <p className="text-[#9CA3AF] text-xs leading-relaxed line-through text-right" dir="rtl">
              {displayOld}
            </p>
          )}
          <p
            className={`text-xs leading-relaxed text-right ${
              changed ? 'text-blue-700 font-semibold' : 'text-[#0D0D12]'
            }`}
            dir="rtl"
          >
            {displayNew}
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-wrap" dir="rtl">
          {changed ? (
            <>
              <span className="text-[#9CA3AF] text-xs font-num-medium line-through">{displayOld}</span>
              <ArrowLeft className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="text-blue-700 text-xs font-num-medium font-bold">{displayNew}</span>
            </>
          ) : (
            <span className="text-[#0D0D12] text-xs font-num-medium">{displayNew}</span>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Image comparison ─────────────────────────────────────────────────────────
const ImageCompare = ({
  oldSrc,
  newSrc,
}: {
  oldSrc: string | null;
  newSrc: string | null;
}) => {
  const changed = oldSrc !== newSrc;

  const Thumb = ({ src, label, highlight }: { src: string | null; label: string; highlight?: boolean }) => (
    <div className="flex-1 flex flex-col gap-1.5">
      <span
        className={`text-[11px] font-semibold text-center ${
          highlight ? 'text-blue-600' : 'text-[#818898]'
        }`}
      >
        {label}
      </span>
      <div
        className={`w-full h-[90px] relative rounded-xl overflow-hidden border ${
          highlight && changed ? 'border-blue-300 ring-2 ring-blue-200' : 'border-[#DFE1E7]'
        } bg-gray-100`}
      >
        {src ? (
          <Image src={src} alt={label} fill className="object-cover" unoptimized />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-1">
            <ImageIcon className="w-5 h-5" />
            <span className="text-[10px]">بدون تصویر</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`flex gap-3 p-3 rounded-xl ${
        changed ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50 border border-transparent'
      }`}
    >
      <Thumb src={oldSrc} label="تصویر فعلی" />
      {changed && (
        <div className="flex items-center self-center shrink-0">
          <ArrowLeft className="w-4 h-4 text-amber-400" />
        </div>
      )}
      <Thumb src={newSrc} label="تصویر جدید" highlight />
    </div>
  );
};

// ─── Main popup ───────────────────────────────────────────────────────────────
const StudentRequestDetailsPopup = ({ request, onClose, onUpdate }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [detail, setDetail] = useState<StudentRequestDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(request.status);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const response = await managerService.getStudentRequestDetailById(request.id);
        if (response.success && response.data) {
          setDetail(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch student request detail', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [request.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleConfirm = async (status: 2 | 1 | 0, description?: string | null) => {
    setIsApproving(true);
    try {
      const response = await managerService.approveProductEditRequest(request.id, status, description);
      if (response.success) {
        const label = status === 2 ? 'تایید شده' : status === 1 ? 'رد شده' : 'در حال بررسی';
        setCurrentStatus(label);
        setIsConfirmOpen(false);
        toast.success('وضعیت درخواست با موفقیت ثبت شد');
        if (onUpdate) onUpdate();
        onClose();
      } else {
        toast.error(response.message || 'خطا در ثبت وضعیت');
      }
    } catch (error) {
      console.error('Failed to approve student request', error);
      toast.error('خطای شبکه');
    } finally {
      setIsApproving(false);
    }
  };

  const newProduct = detail?.newProduct;
  const oldProduct = detail?.oldProduct as FlatProduct | null | undefined;
  const isEditRequest = request.model_type === 'درخواست ویرایش محصول';
  const isPending = currentStatus === 'در حال بررسی';

  // Status badge helpers
  const statusColors: Record<string, { bg: string; color: string; Icon: React.ElementType }> = {
    'تایید شده':     { bg: '#ECF9F7', color: '#267666', Icon: CheckCircle },
    'رد شده':        { bg: '#FEE2E2', color: '#DC2626', Icon: AlertCircle },
    'در حال بررسی': { bg: '#FFF4E5', color: '#B98900', Icon: Clock },
  };
  const statusStyle = statusColors[currentStatus] ?? statusColors['در حال بررسی'];
  const StatusIcon = statusStyle.Icon;

  const md = newProduct?.model_data ?? request.model_data;

  // Prices from either detail or original request
  const prices = md?.prices;

  // Count changed fields (for edit requests)
  const changedCount = isEditRequest && oldProduct
    ? [
        normalize(oldProduct.title) !== normalize(md?.title),
        normalize(oldProduct.price) !== normalize(md?.price),
        normalize(oldProduct.inventory) !== normalize(md?.inventory),
        normalize(oldProduct.warn_inventory) !== normalize(md?.warn_inventory),
        normalize(oldProduct.max_order) !== normalize(md?.max_order),
        normalize(oldProduct.description) !== normalize(md?.description),
        getImageSrc(oldProduct.image_path) !== getImageSrc(md?.image_path),
      ].filter(Boolean).length
    : 0;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      dir="rtl"
    >
      <div
        ref={modalRef}
        className="w-full max-w-[480px] max-h-[92vh] bg-white rounded-3xl overflow-hidden flex flex-col relative shadow-2xl"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#DFE1E7] shrink-0">
          <div className="flex flex-col items-start gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[#0D0D12] text-base font-semibold">
                {request.model_type}
              </span>
              {isEditRequest && changedCount > 0 && (
                <span className="text-[11px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                  {toFarsiNumber(changedCount)} تغییر
                </span>
              )}
            </div>
            <span className="text-[#818898] text-xs">
              {formatDate(request.created_at)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-[#0C1415]" strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="flex flex-col px-5 pt-5 pb-8 gap-5">

            {/* Student info card */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              {/* First child → RIGHT in RTL: name + status (primary) */}
              <div className="flex flex-col items-start gap-1">
                <span className="text-[#0D0D12] text-sm font-bold">
                  {request.firstname} {request.lastname}
                </span>
                <div
                  className="flex items-center gap-1.5 h-6 px-2.5 rounded-full"
                  style={{ backgroundColor: statusStyle.bg }}
                >
                  <StatusIcon className="w-3 h-3" style={{ color: statusStyle.color }} />
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: statusStyle.color }}
                  >
                    {currentStatus}
                  </span>
                </div>
              </div>
              {/* Second child → LEFT in RTL: field/grade/school (secondary) */}
              <div className="flex flex-col items-end gap-1">
                <span className="text-[#818898] text-xs">
                  {request.field} — {request.grade}
                </span>
                <span className="text-[#666D80] text-xs">{request.school_name}</span>
              </div>
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="w-full h-40 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-t-[#0A33FF] animate-spin" />
              </div>
            ) : (
              <>
                {/* ── Edit request: field-by-field diff ─────────────────── */}
                {isEditRequest && oldProduct ? (
                  <div className="flex flex-col gap-3">
                    {/* Legend */}
                    <div className="flex items-center gap-3 justify-end">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                        <span className="text-[11px] text-amber-700">فیلد تغییر یافته</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                        <span className="text-[11px] text-gray-500">بدون تغییر</span>
                      </div>
                    </div>

                    {/* Image comparison */}
                    <ImageCompare
                      oldSrc={getImageSrc(oldProduct.image_path)}
                      newSrc={getImageSrc(md?.image_path)}
                    />

                    {/* Field diff rows */}
                    <div className="flex flex-col gap-2">
                      <DiffRow label="نام محصول" oldVal={oldProduct.title} newVal={md?.title} />
                      <DiffRow
                        label="قیمت"
                        oldVal={oldProduct.price}
                        newVal={md?.price}
                        format={formatPrice}
                      />
                      <DiffRow
                        label="موجودی"
                        oldVal={oldProduct.inventory}
                        newVal={md?.inventory}
                        format={(v) => v !== undefined && v !== null && v !== '' ? toFarsiNumber(v) + ' عدد' : '—'}
                      />
                      <DiffRow
                        label="هشدار موجودی"
                        oldVal={oldProduct.warn_inventory}
                        newVal={md?.warn_inventory}
                        format={(v) => v !== undefined && v !== null && v !== '' ? toFarsiNumber(v) + ' عدد' : '—'}
                      />
                      <DiffRow
                        label="حداکثر سفارش"
                        oldVal={oldProduct.max_order}
                        newVal={md?.max_order}
                        format={(v) => v !== undefined && v !== null && v !== '' ? toFarsiNumber(v) + ' عدد' : '—'}
                      />
                      <DiffRow
                        label="دسته‌بندی"
                        oldVal={oldProduct.category_id}
                        newVal={md?.category_id}
                        format={(v) => v ? toFarsiNumber(v) : '—'}
                      />
                      {(oldProduct.description || md?.description) && (
                        <DiffRow
                          label="توضیحات"
                          oldVal={oldProduct.description}
                          newVal={md?.description}
                          isTextarea
                        />
                      )}
                    </div>

                    {/* New prices/variants if present */}
                    {prices && prices.length > 0 && (
                      <div className="flex flex-col gap-2 mt-1">
                        <span className="text-[#0D0D12] text-sm font-semibold">
                          قیمت‌گذاری ویژگی‌ها (پیشنهادی)
                        </span>
                        <div className="flex flex-col gap-2">
                          {prices.map((p, i) => (
                            <div key={i} className="w-full rounded-xl border border-[#DFE1E7] overflow-hidden" dir="rtl">
                              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F6F8FA] border-b border-[#DFE1E7]">
                                <div className="flex items-center gap-2">
                                  <span className="text-[#0D0D12] text-sm font-bold">{p.title}</span>
                                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F0F4FF] text-[#3B5BDB]">
                                    {PRICE_TYPE_LABELS[Number(p.type)] || String(p.type)}
                                  </span>
                                </div>
                                <span className="text-[#818898] text-xs font-num-medium">ویژگی {toFarsiNumber(i + 1)}</span>
                              </div>
                              <div className="flex flex-col divide-y divide-[#F3F4F6]">
                                {[
                                  { label: 'قیمت', value: <span className="text-[#0047AB] font-bold font-num-medium text-sm">{formatPrice(p.amount)} ریال</span> },
                                  { label: 'تخفیف', value: Number(p.discount_percent) > 0 ? <span className="text-white text-xs font-bold font-num-medium bg-[#E03131] px-2 py-0.5 rounded-full">{toFarsiNumber(p.discount_percent)}٪</span> : <span className="text-[#C0C4CC] text-sm">ندارد</span> },
                                  { label: 'موجودی', value: <span className="text-[#0D0D12] font-semibold font-num-medium text-sm">{toFarsiNumber(p.inventory)} عدد</span> },
                                ].map(({ label, value }) => (
                                  <div key={label} className="flex items-center justify-between px-4 py-2.5">
                                    <span className="text-[#666D80] text-sm">{label}</span>
                                    {value}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ── Create request: single product card ──────────────── */
                  <div className="flex flex-col gap-4">
                    {/* Image */}
                    {(() => {
                      const src = getImageSrc(md?.image_path);
                      return src ? (
                        <div className="w-full h-[180px] relative rounded-xl overflow-hidden border border-[#DFE1E7]">
                          <Image
                            src={src}
                            alt={md?.title || 'محصول'}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-full h-[100px] flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-400 gap-2">
                          <Info className="w-7 h-7" />
                          <span className="text-xs">تصویر ندارد</span>
                        </div>
                      );
                    })()}

                    {/* Product fields */}
                    <div className="flex flex-col gap-0">
                      {[
                        { label: 'نام محصول', value: md?.title || '—' },
                        { label: 'قیمت', value: formatPrice(md?.price) },
                        { label: 'موجودی', value: md?.inventory !== undefined ? `${toFarsiNumber(md.inventory)} عدد` : '—' },
                        { label: 'حداکثر سفارش', value: md?.max_order !== undefined ? `${toFarsiNumber(md.max_order)} عدد` : '—' },
                        { label: 'هشدار موجودی', value: md?.warn_inventory !== undefined ? `${toFarsiNumber(md.warn_inventory)} عدد` : '—' },
                        { label: 'دسته‌بندی', value: md?.category_id ? toFarsiNumber(md.category_id) : '—' },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0"
                        >
                          <span className="text-[#666D80] text-sm">{label}</span>
                          <span className="text-[#0D0D12] text-sm font-semibold font-num-medium">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    {md?.description && (
                      <div className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-[#666D80] text-xs font-semibold text-right">توضیحات</span>
                        <p className="text-[#0D0D12] text-sm leading-relaxed whitespace-pre-wrap text-right" dir="rtl">
                          {md.description}
                        </p>
                      </div>
                    )}

                    {/* Prices / variants */}
                    {prices && prices.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-[#0D0D12] text-sm font-semibold">
                          قیمت‌گذاری ویژگی‌ها
                        </span>
                        <div className="flex flex-col gap-2">
                          {prices.map((p, i) => (
                            <div key={i} className="w-full rounded-xl border border-[#DFE1E7] overflow-hidden" dir="rtl">
                              <div className="flex items-center justify-between px-4 py-2.5 bg-[#F6F8FA] border-b border-[#DFE1E7]">
                                <div className="flex items-center gap-2">
                                  <span className="text-[#0D0D12] text-sm font-bold">{p.title}</span>
                                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F0F4FF] text-[#3B5BDB]">
                                    {PRICE_TYPE_LABELS[Number(p.type)] || String(p.type)}
                                  </span>
                                </div>
                                <span className="text-[#818898] text-xs font-num-medium">ویژگی {toFarsiNumber(i + 1)}</span>
                              </div>
                              <div className="flex flex-col divide-y divide-[#F3F4F6]">
                                {[
                                  { label: 'قیمت', value: <span className="text-[#0047AB] font-bold font-num-medium text-sm">{formatPrice(p.amount)} ریال</span> },
                                  { label: 'تخفیف', value: Number(p.discount_percent) > 0 ? <span className="text-white text-xs font-bold font-num-medium bg-[#E03131] px-2 py-0.5 rounded-full">{toFarsiNumber(p.discount_percent)}٪</span> : <span className="text-[#C0C4CC] text-sm">ندارد</span> },
                                  { label: 'موجودی', value: <span className="text-[#0D0D12] font-semibold font-num-medium text-sm">{toFarsiNumber(p.inventory)} عدد</span> },
                                ].map(({ label, value }) => (
                                  <div key={label} className="flex items-center justify-between px-4 py-2.5">
                                    <span className="text-[#666D80] text-sm">{label}</span>
                                    {value}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Fixed bottom action */}
        <div className="w-full p-4 bg-white border-t border-gray-100 shrink-0">
          {isPending ? (
            <button
              onClick={() => setIsConfirmOpen(true)}
              disabled={isApproving}
              className="w-full h-12 rounded-xl bg-[#0A33FF] hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApproving && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              بررسی و ثبت وضعیت
            </button>
          ) : (
            <div className="w-full h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-sm">
              این درخواست قبلاً بررسی شده است
            </div>
          )}
        </div>

        <ConfirmationModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirm}
          loading={isApproving}
          title="بررسی درخواست دانش آموز"
          itemName={md?.title || 'درخواست'}
          itemLabel="نام محصول"
        />
      </div>
    </div>
  );
};

export default StudentRequestDetailsPopup;

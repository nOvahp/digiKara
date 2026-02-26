'use client';

import React from 'react';
import {
  ChevronRight, ChevronLeft, ClipboardList,
  Store, Package, Pencil, X, Calendar, Hash,
  ShoppingBag, Boxes, AlertCircle, Tag, AlignLeft,
} from 'lucide-react';
import { DashboardNavBar } from '../../layout/DashboardNavBar';
import { Navigation } from '../../layout/Navigation';
import { studentService, StudentRequest } from '@/app/services/student/studentService';

// ── Helpers ──────────────────────────────────────────────────────────────────

function toFarsi(n: number | string | undefined): string {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

const jalaliFormatter = new Intl.DateTimeFormat('fa-IR', {
  calendar: 'persian',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  numberingSystem: 'latn',
});

function formatJalali(iso: string): string {
  if (!iso) return '—';
  try {
    const date = new Date(iso);
    if (isNaN(date.getTime())) return '—';
    return toFarsi(jalaliFormatter.format(date));
  } catch {
    return '—';
  }
}

function toPersianPrice(val: unknown): string {
  if (val === undefined || val === null) return '—';
  const num = Number(val);
  if (isNaN(num)) return '—';
  return toFarsi(num.toLocaleString('en-US')) + ' ریال';
}

function str(val: unknown): string {
  if (val === undefined || val === null || val === '') return '—';
  return String(val);
}

// ── Status badge (table) ──────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; dot: string }> = {
    'تایید شده':        { bg: 'bg-[#ECFDF3]', text: 'text-[#027A48]', dot: 'bg-[#12B76A]' },
    'در انتظار بررسی': { bg: 'bg-[#FFFAEB]', text: 'text-[#B54708]', dot: 'bg-[#F79009]' },
    'رد شده':          { bg: 'bg-[#FEF3F2]', text: 'text-[#B42318]', dot: 'bg-[#F04438]' },
  };
  const style = map[status] ?? { bg: 'bg-[#F2F4F7]', text: 'text-[#344054]', dot: 'bg-[#667085]' };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${style.bg} ${style.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
      {status}
    </span>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonRows({ cols }: { cols: number }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse" style={{ minWidth: 420 }}>
        <tbody>
          {Array.from({ length: 4 }).map((_, i) => (
            <tr key={i} className="border-b border-[#F3F4F6] animate-pulse">
              {Array.from({ length: cols }).map((__, j) => (
                <td key={j} className="px-3 py-3">
                  <div className="h-3 bg-gray-200 rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Tab config ────────────────────────────────────────────────────────────────

const TABS = [
  { label: 'ایجاد حجره',   value: 'درخواست ایجاد حجره',   Icon: Store   },
  { label: 'ایجاد محصول',  value: 'درخواست ایجاد محصول',  Icon: Package },
  { label: 'ویرایش محصول', value: 'درخواست ویرایش محصول', Icon: Pencil  },
] as const;

const ITEMS_PER_PAGE = 8;

// ── Modal building blocks ─────────────────────────────────────────────────────

type IconFC = React.FC<{ className?: string; strokeWidth?: number }>;

function ModalInfoRow({ icon: Icon, label, value }: { icon: IconFC; label: string; value: string }) {
  return (
    <div className="px-3 py-3 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#F9FAFB] border border-[#DFE1E7] flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-[#9CA3AF]" strokeWidth={1.7} />
        </div>
        <span className="text-[#666D80] text-xs font-semibold">{label}</span>
      </div>
      <span className="text-[#0D0D12] text-sm font-semibold text-left break-all">{value}</span>
    </div>
  );
}

function ModalSectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="h-px flex-1 bg-[#F3F4F6]" />
      <span className="text-[10px] font-bold text-[#9CA3AF] tracking-widest">{title}</span>
      <div className="h-px flex-1 bg-[#F3F4F6]" />
    </div>
  );
}

function DescriptionBox({ text }: { text: string }) {
  return (
    <div className="px-4 py-3 bg-[#F9FAFB] rounded-xl outline outline-1 outline-[#DFE1E7] text-sm font-medium text-[#0D0D12] leading-7 text-right">
      {text}
    </div>
  );
}

// ── Modal content per type ────────────────────────────────────────────────────

function HojreDetail({ d }: { d: Record<string, unknown> }) {
  return (
    <>
      <ModalInfoRow icon={Store}    label="نام حجره" value={str(d.name)} />
      <ModalInfoRow icon={Tag}      label="تخصص"     value={str(d.skill)} />
      <ModalInfoRow icon={Calendar} label="سابقه"    value={d.experience ? toFarsi(str(d.experience)) + ' سال' : '—'} />
      {d.description && str(d.description) !== '—' && (
        <>
          <ModalSectionDivider title="توضیحات" />
          <DescriptionBox text={str(d.description)} />
        </>
      )}
    </>
  );
}

function ProductDetail({ d }: { d: Record<string, unknown> }) {
  const prices = Array.isArray(d.prices) ? (d.prices as Array<Record<string, unknown>>) : [];
  return (
    <>
      <ModalInfoRow icon={Package}     label="نام محصول"      value={str(d.title)} />
      <ModalInfoRow icon={Hash}        label="کد محصول"       value={str(d.code)} />
      <ModalInfoRow icon={ShoppingBag} label="قیمت پایه"      value={toPersianPrice(d.price)} />
      <ModalInfoRow icon={Boxes}       label="موجودی کل"      value={d.inventory ? toFarsi(str(d.inventory)) + ' عدد' : '—'} />
      <ModalInfoRow icon={AlertCircle} label="حداکثر سفارش"   value={d.max_order ? toFarsi(str(d.max_order)) + ' عدد' : '—'} />

      {prices.length > 0 && (
        <>
          <ModalSectionDivider title="تنوع قیمت‌گذاری" />
          <div className="flex flex-col gap-2">
            {prices.map((p, i) => (
              <div
                key={i}
                className="px-3 py-2.5 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#0D0D12] font-semibold">{str(p.title)}</span>
                  <span className="text-xs font-bold text-[#B45309] bg-[#FFFBEB] border border-[#FDE68A] px-2.5 py-0.5 rounded-full">
                    {toPersianPrice(p.amount)}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#9CA3AF] font-medium">
                  <span>موجودی: {toFarsi(str(p.inventory))} عدد</span>
                  <span className="w-px h-3 bg-[#E5E7EB]" />
                  <span>تخفیف: {toFarsi(str(p.discount_percent))}٪</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {d.description && str(d.description) !== '—' && (
        <>
          <ModalSectionDivider title="توضیحات" />
          <DescriptionBox text={str(d.description)} />
        </>
      )}
    </>
  );
}

function EditProductDetail({ d }: { d: Record<string, unknown> }) {
  return (
    <>
      <ModalInfoRow icon={Package}     label="نام محصول"     value={str(d.title)} />
      <ModalInfoRow icon={ShoppingBag} label="قیمت جدید"     value={toPersianPrice(d.price)} />
      <ModalInfoRow icon={Boxes}       label="موجودی"        value={d.inventory ? toFarsi(str(d.inventory)) + ' عدد' : '—'} />
      <ModalInfoRow icon={AlertCircle} label="حداکثر سفارش"  value={d.max_order ? toFarsi(str(d.max_order)) + ' عدد' : '—'} />
      <ModalInfoRow icon={AlertCircle} label="هشدار موجودی"  value={d.warn_inventory ? toFarsi(str(d.warn_inventory)) + ' عدد' : '—'} />
      {d.description && str(d.description) !== '—' && (
        <>
          <ModalSectionDivider title="توضیحات" />
          <DescriptionBox text={str(d.description)} />
        </>
      )}
    </>
  );
}

// ── Request detail bottom sheet ───────────────────────────────────────────────

const TYPE_META: Record<string, { Icon: IconFC; color: string }> = {
  'درخواست ایجاد حجره':   { Icon: Store,   color: 'text-[#0284C7]' },
  'درخواست ایجاد محصول':  { Icon: Package, color: 'text-[#7C3AED]' },
  'درخواست ویرایش محصول': { Icon: Pencil,  color: 'text-[#059669]' },
};

const STATUS_MODAL: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'تایید شده':        { bg: 'bg-[#ECFDF3]', text: 'text-[#027A48]', border: 'border-[#A7F3D0]', dot: 'bg-[#12B76A]' },
  'در انتظار بررسی': { bg: 'bg-[#FFFAEB]', text: 'text-[#B54708]', border: 'border-[#FDE68A]', dot: 'bg-[#F79009]' },
  'رد شده':          { bg: 'bg-[#FEF3F2]', text: 'text-[#B42318]', border: 'border-[#FECDC8]', dot: 'bg-[#F04438]' },
};

function RequestDetailModal({ req, onClose }: { req: StudentRequest; onClose: () => void }) {
  const d    = req.model_data as Record<string, unknown>;
  const meta = TYPE_META[req.model_type] ?? { Icon: ClipboardList, color: 'text-[#6B7280]' };
  const ss   = STATUS_MODAL[req.status]  ?? { bg: 'bg-[#F2F4F7]', text: 'text-[#344054]', border: 'border-[#DFE1E7]', dot: 'bg-[#667085]' };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <style>{`
        @keyframes modalSlideUp {
          from { transform: translateY(100%); opacity: 0.5; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .modal-slide-up { animation: modalSlideUp 0.28s cubic-bezier(0.32,0.72,0,1) forwards; }
      `}</style>

      <div
        className="fixed inset-0 z-[60] flex items-end justify-center font-['PeydaWeb']"
        dir="rtl"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#0D0D12]/50 backdrop-blur-[3px]" />

        {/* Bottom sheet */}
        <div
          className="modal-slide-up relative w-full max-w-[440px] max-h-[88vh] bg-white rounded-t-2xl shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-0 flex-shrink-0">
            <div className="w-10 h-[5px] bg-[#DFE1E7] rounded-full" />
          </div>

          {/* Header */}
          <div className="px-5 pt-3 pb-4 border-b border-[#DFE1E7] flex items-center justify-between flex-shrink-0">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-[#DFE1E7] bg-white flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
            >
              <X className="w-4 h-4 text-[#0D0D12]" />
            </button>
            <div className="flex items-center gap-2">
              <meta.Icon className={`w-4 h-4 ${meta.color}`} strokeWidth={1.8} />
              <span className="text-[#0D0D12] text-sm font-bold">{req.model_type}</span>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">

            {/* Status + date */}
            <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${ss.border} ${ss.bg}`}>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${ss.dot}`} />
                <span className={`text-sm font-bold ${ss.text}`}>{req.status}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#6B7280]">
                <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="text-xs font-medium">{formatJalali(req.created_at)}</span>
              </div>
            </div>

            {/* Type-specific content */}
            {req.model_type === 'درخواست ایجاد حجره'   && <HojreDetail       d={d} />}
            {req.model_type === 'درخواست ایجاد محصول'  && <ProductDetail     d={d} />}
            {req.model_type === 'درخواست ویرایش محصول' && <EditProductDetail d={d} />}

            <div className="h-6" />
          </div>
        </div>
      </div>
    </>
  );
}

// ── Per-tab table components ──────────────────────────────────────────────────

type RowClickFn = (req: StudentRequest) => void;

function HojreTable({ rows, page, onRowClick }: { rows: StudentRequest[]; page: number; onRowClick: RowClickFn }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse" style={{ minWidth: 420 }}>
        <thead>
          <tr className="bg-[#F9FAFB] border-b border-[#DFE1E7]">
            <th className="text-[10px] font-bold text-[#9CA3AF] text-right px-3 py-2 whitespace-nowrap w-7">#</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-right px-3 py-2 whitespace-nowrap">نام حجره</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-right px-3 py-2 whitespace-nowrap">تخصص</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-center px-3 py-2 whitespace-nowrap w-24">تاریخ</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-center px-3 py-2 whitespace-nowrap w-24">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((req, idx) => {
            const d = req.model_data as Record<string, unknown>;
            return (
              <tr
                key={req.id}
                onClick={() => onRowClick(req)}
                className="border-b border-[#F3F4F6] last:border-b-0 hover:bg-amber-50/50 active:bg-amber-50 cursor-pointer transition-colors"
              >
                <td className="text-xs text-[#9CA3AF] px-3 py-3 whitespace-nowrap w-7">{toFarsi((page - 1) * ITEMS_PER_PAGE + idx + 1)}</td>
                <td className="text-xs text-[#0D0D12] font-medium px-3 py-3 max-w-[120px] truncate">{str(d.name)}</td>
                <td className="text-xs text-[#6B7280] font-medium px-3 py-3 max-w-[100px] truncate">{str(d.skill)}</td>
                <td className="text-[10px] text-[#6B7280] font-medium text-center px-3 py-3 whitespace-nowrap w-24">{formatJalali(req.created_at)}</td>
                <td className="px-3 py-3 text-center w-24"><StatusBadge status={req.status} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ProductTable({ rows, page, onRowClick }: { rows: StudentRequest[]; page: number; onRowClick: RowClickFn }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse" style={{ minWidth: 420 }}>
        <thead>
          <tr className="bg-[#F9FAFB] border-b border-[#DFE1E7]">
            <th className="text-[10px] font-bold text-[#9CA3AF] text-right px-3 py-2 whitespace-nowrap w-7">#</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-right px-3 py-2 whitespace-nowrap">نام محصول</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-center px-3 py-2 whitespace-nowrap w-28">قیمت</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-center px-3 py-2 whitespace-nowrap w-24">تاریخ</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-center px-3 py-2 whitespace-nowrap w-24">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((req, idx) => {
            const d = req.model_data as Record<string, unknown>;
            return (
              <tr
                key={req.id}
                onClick={() => onRowClick(req)}
                className="border-b border-[#F3F4F6] last:border-b-0 hover:bg-amber-50/50 active:bg-amber-50 cursor-pointer transition-colors"
              >
                <td className="text-xs text-[#9CA3AF] px-3 py-3 whitespace-nowrap w-7">{toFarsi((page - 1) * ITEMS_PER_PAGE + idx + 1)}</td>
                <td className="text-xs text-[#0D0D12] font-medium px-3 py-3 max-w-[140px] truncate">{str(d.title)}</td>
                <td className="text-[10px] text-[#6B7280] font-medium text-center px-3 py-3 whitespace-nowrap w-28">{toPersianPrice(d.price)}</td>
                <td className="text-[10px] text-[#6B7280] font-medium text-center px-3 py-3 whitespace-nowrap w-24">{formatJalali(req.created_at)}</td>
                <td className="px-3 py-3 text-center w-24"><StatusBadge status={req.status} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function EditProductTable({ rows, page, onRowClick }: { rows: StudentRequest[]; page: number; onRowClick: RowClickFn }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse" style={{ minWidth: 420 }}>
        <thead>
          <tr className="bg-[#F9FAFB] border-b border-[#DFE1E7]">
            <th className="text-[10px] font-bold text-[#9CA3AF] text-right px-3 py-2 whitespace-nowrap w-7">#</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-right px-3 py-2 whitespace-nowrap">نام محصول</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-center px-3 py-2 whitespace-nowrap w-28">قیمت جدید</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-center px-3 py-2 whitespace-nowrap w-24">تاریخ</th>
            <th className="text-[10px] font-bold text-[#9CA3AF] text-center px-3 py-2 whitespace-nowrap w-24">وضعیت</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((req, idx) => {
            const d = req.model_data as Record<string, unknown>;
            return (
              <tr
                key={req.id}
                onClick={() => onRowClick(req)}
                className="border-b border-[#F3F4F6] last:border-b-0 hover:bg-amber-50/50 active:bg-amber-50 cursor-pointer transition-colors"
              >
                <td className="text-xs text-[#9CA3AF] px-3 py-3 whitespace-nowrap w-7">{toFarsi((page - 1) * ITEMS_PER_PAGE + idx + 1)}</td>
                <td className="text-xs text-[#0D0D12] font-medium px-3 py-3 max-w-[140px] truncate">{str(d.title)}</td>
                <td className="text-[10px] text-[#6B7280] font-medium text-center px-3 py-3 whitespace-nowrap w-28">{toPersianPrice(d.price)}</td>
                <td className="text-[10px] text-[#6B7280] font-medium text-center px-3 py-3 whitespace-nowrap w-24">{formatJalali(req.created_at)}</td>
                <td className="px-3 py-3 text-center w-24"><StatusBadge status={req.status} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function StudentRequests() {
  const [allRequests, setAllRequests] = React.useState<StudentRequest[]>([]);
  const [isLoading, setIsLoading]     = React.useState(true);
  const [activeTab, setActiveTab]     = React.useState<string>(TABS[0].value);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selected, setSelected]       = React.useState<StudentRequest | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await studentService.getStudentRequests();
      if (res.success && res.data) setAllRequests(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  React.useEffect(() => { setCurrentPage(1); }, [activeTab]);

  const filtered   = allRequests.filter((r) => r.model_type === activeTab);
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const countOf    = (type: string) => allRequests.filter((r) => r.model_type === type).length;

  return (
    <div className="max-w-[440px] mx-auto min-h-screen flex flex-col items-center relative font-['PeydaWeb']" dir="rtl">

      {/* Sticky top bar */}
      <div className="sticky top-0 z-40 w-full bg-white" dir="ltr">
        <DashboardNavBar />
      </div>

      <div className="w-full flex flex-col gap-5 px-4 pt-6 pb-32">

        {/* Page header */}
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-[#F7C61A]" />
          <h1 className="text-[#0D0D12] text-xl font-bold"> سفارشات</h1>
        </div>

        {/* Horizontal tab bar */}
        <div className="w-full bg-white rounded-xl border border-[#DFE1E7] shadow-sm">
          <div className="flex border-b border-[#DFE1E7]">
            {TABS.map(({ label, value, Icon }) => {
              const isActive = activeTab === value;
              const count    = countOf(value);
              return (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 px-1 text-center transition-all border-b-2 ${
                    isActive
                      ? 'border-[#F7C61A] text-[#0D0D12]'
                      : 'border-transparent text-[#9CA3AF] hover:text-[#6B7280]'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F7C61A]' : 'text-[#9CA3AF]'}`} strokeWidth={1.8} />
                    <span className="text-[11px] font-semibold leading-tight">{label}</span>
                    {count > 0 && (
                      <span className={`text-[9px] font-bold px-1.5 py-px rounded-full ${
                        isActive ? 'bg-[#F7C61A] text-[#393E46]' : 'bg-[#F3F4F6] text-[#9CA3AF]'
                      }`}>
                        {toFarsi(count)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sub-header */}
          <div className="px-4 py-2.5 border-b border-[#F3F4F6] flex items-center justify-between">
            <span className="text-xs text-[#0D0D12] font-semibold">{activeTab}</span>
            <span className="text-[10px] text-[#9CA3AF] font-medium">{toFarsi(filtered.length)} درخواست</span>
          </div>

          {/* Hint */}
          {!isLoading && filtered.length > 0 && (
            <div className="px-4 py-1.5 bg-[#FFFBEB] border-b border-[#FEF3C7] flex items-center gap-1.5">
              <AlignLeft className="w-3 h-3 text-[#B45309]" strokeWidth={1.5} />
              <span className="text-[10px] text-[#B45309] font-medium">برای مشاهده جزئیات روی هر ردیف کلیک کنید</span>
            </div>
          )}

          {/* Loading */}
          {isLoading && <SkeletonRows cols={5} />}

          {/* Empty */}
          {!isLoading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 gap-3 text-[#9CA3AF]">
              <ClipboardList className="w-10 h-10 opacity-30" />
              <p className="text-sm">درخواستی در این دسته وجود ندارد</p>
            </div>
          )}

          {/* Tables */}
          {!isLoading && paginated.length > 0 && (
            <>
              {activeTab === 'درخواست ایجاد حجره'   && <HojreTable       rows={paginated} page={currentPage} onRowClick={setSelected} />}
              {activeTab === 'درخواست ایجاد محصول'  && <ProductTable     rows={paginated} page={currentPage} onRowClick={setSelected} />}
              {activeTab === 'درخواست ویرایش محصول' && <EditProductTable rows={paginated} page={currentPage} onRowClick={setSelected} />}
            </>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#DFE1E7] bg-white">
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} className="text-[#0D0D12]" />
              </button>
              <span className="text-xs text-[#6B7280]">
                صفحه {toFarsi(currentPage)} از {toFarsi(totalPages)}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} className="text-[#0D0D12]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <Navigation />

      {/* Detail modal */}
      {selected && (
        <RequestDetailModal req={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

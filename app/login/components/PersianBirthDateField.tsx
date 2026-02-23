'use client';

/**
 * PersianBirthDateField
 * ---------------------
 * A "Date of Birth" field that renders a Persian (Jalali / Solar Hijri) calendar
 * using `react-multi-date-picker` + `react-date-object`.
 *
 * Usage example:
 * ──────────────
 *   const [birthday, setBirthday] = useState('');
 *
 *   <PersianBirthDateField
 *     label="تاریخ تولد"
 *     name="birthday"
 *     value={birthday}
 *     onChange={setBirthday}
 *     maxYear={1403}      // today-ish
 *     minYear={1320}
 *     required
 *     error={errors.birthday?.message}
 *   />
 *
 * `value` / `onChange` both use the Jalali "YYYY/MM/DD" format string.
 * A hidden <input name={name}> is included for native-form / FormData use.
 */

import React, { useRef, useState, useEffect } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PersianBirthDateFieldProps {
  /** Current value in Jalali "YYYY/MM/DD" format */
  value?: string;
  /** Called with the new Jalali "YYYY/MM/DD" string on selection */
  onChange: (value: string) => void;
  label?: string;
  /** Name attribute for the hidden native <input> */
  name?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  /** Earliest selectable Jalali year (e.g. 1300) */
  minYear?: number;
  /** Latest selectable Jalali year (e.g. 1403) */
  maxYear?: number;
  /** Error message rendered below the field */
  error?: string;
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Parse a "YYYY/MM/DD" Jalali string into a DateObject, or return undefined. */
function parseJalali(value?: string): DateObject | undefined {
  if (!value || !/^\d{4}\/\d{2}\/\d{2}$/.test(value)) return undefined;
  return new DateObject({ date: value, calendar: persian, locale: persian_fa, format: 'YYYY/MM/DD' });
}

/** Build a DateObject at the first day of a Jalali year. */
function jalaliYearStart(year: number): DateObject {
  return new DateObject({ calendar: persian, locale: persian_fa }).set({ year, month: 1, day: 1 });
}

/** Build a DateObject at the last day of a Jalali year (Esfand 29). */
function jalaliYearEnd(year: number): DateObject {
  return new DateObject({ calendar: persian, locale: persian_fa }).set({ year, month: 12, day: 29 });
}

// ─── Custom navigation arrows (passed to react-multi-date-picker) ─────────────

// In RTL the library physically swaps button positions:
// 'left'  renders on the RIGHT → should be ← (go back)
// 'right' renders on the LEFT  → should be → (go forward)
function NavIcon({ direction }: { direction: 'right' | 'left' }) {
  return direction === 'left' ? (
    <ChevronRight size={20} className="text-[#666D80]" />
  ) : (
    <ChevronLeft size={20} className="text-[#666D80]" />
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PersianBirthDateField({
  value,
  onChange,
  label = 'تاریخ تولد',
  name = 'birthday',
  placeholder = 'انتخاب تاریخ تولد',
  required = false,
  disabled = false,
  minYear,
  maxYear,
  error,
  className = '',
}: PersianBirthDateFieldProps) {
  const dateValue = parseJalali(value);
  const minDate = minYear ? jalaliYearStart(minYear) : undefined;
  const maxDate = maxYear ? jalaliYearEnd(maxYear) : undefined;

  // Measure container so popup matches input width exactly
  const containerRef = useRef<HTMLDivElement>(null);
  const [popupWidth, setPopupWidth] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setPopupWidth(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const handleChange = (date: DateObject | DateObject[] | null) => {
    if (!date || Array.isArray(date)) return;
    onChange(date.format('YYYY/MM/DD'));
  };

  const pw = popupWidth > 0 ? `${popupWidth}px` : '100%';

  return (
    <div ref={containerRef} className={`flex flex-col gap-1 w-full ${className}`} dir="rtl">
      {/* ── Calendar CSS overrides ── */}
      <style>{`
        /* Wrapper & calendar panel */
        .rmdp-wrapper { box-shadow: 0 8px 32px rgba(0,0,0,0.13) !important; border-radius: 16px !important; border: 1px solid #DFE1E7 !important; overflow: hidden !important; }
        .rmdp-calendar { padding: 18px !important; box-sizing: border-box !important; overflow: hidden !important; }

        /* Header chips */
        .rmdp-header { margin-bottom: 14px !important; }
        .rmdp-header-values { gap: 8px !important; }
        .rmdp-header-values span {
          display: inline-flex !important; align-items: center !important; justify-content: center !important;
          background: #F3F4F6 !important; color: #1A1C1E !important;
          font-size: 15px !important; font-weight: 700 !important;
          padding: 5px 16px !important; border-radius: 8px !important;
          cursor: pointer !important; transition: background 0.15s !important;
        }
        .rmdp-header-values span:hover { background: #E5E7EB !important; }

        /* Weekday row */
        .rmdp-week-day { font-size: 13px !important; font-weight: 600 !important; color: #9CA3AF !important; padding: 6px 0 !important; }

        /* Day cells */
        .rmdp-day { width: 40px !important; height: 40px !important; }
        .rmdp-day span {
          font-size: 14px !important; width: 36px !important; height: 36px !important;
          line-height: 36px !important; border-radius: 8px !important;
          font-weight: 500 !important; color: #374151 !important;
          transition: background 0.12s, color 0.12s !important;
        }
        .rmdp-day.rmdp-selected span { background: #1A1C1E !important; color: #fff !important; font-weight: 700 !important; box-shadow: none !important; }
        .rmdp-day.rmdp-today span { font-weight: 700 !important; color: #1A1C1E !important; border: none !important; background: transparent !important; position: relative !important; }
        .rmdp-day.rmdp-today span::after { content: '' !important; position: absolute !important; bottom: 3px !important; left: 50% !important; transform: translateX(-50%) !important; width: 4px !important; height: 4px !important; border-radius: 50% !important; background: #FDD00A !important; }
        .rmdp-day.rmdp-today.rmdp-selected span { background: #1A1C1E !important; color: #fff !important; }
        .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden):not(.rmdp-selected) span:hover { background: #F3F4F6 !important; color: #1A1C1E !important; }

        /* Month & year picker — constrain rows and cells via flex */
        .rmdp-month-picker,
        .rmdp-year-picker { width: 100% !important; box-sizing: border-box !important; }
        .rmdp-month-picker .rmdp-day-picker,
        .rmdp-year-picker  .rmdp-day-picker { width: 100% !important; box-sizing: border-box !important; }
        .rmdp-month-picker .rmdp-week,
        .rmdp-year-picker  .rmdp-week {
          display: flex !important;
          width: 100% !important;
          gap: 6px !important;
          margin-bottom: 6px !important;
          box-sizing: border-box !important;
        }
        .rmdp-month-picker .rmdp-day,
        .rmdp-year-picker  .rmdp-day {
          flex: 1 1 0 !important;
          width: 0 !important;
          min-width: 0 !important;
          height: 42px !important;
          box-sizing: border-box !important;
        }
        .rmdp-month-picker .rmdp-day span,
        .rmdp-year-picker  .rmdp-day span {
          display: block !important;
          width: 100% !important;
          height: 38px !important;
          line-height: 38px !important;
          font-size: 13px !important;
          border-radius: 8px !important;
          font-weight: 500 !important;
          color: #374151 !important;
          text-align: center !important;
          box-sizing: border-box !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          padding: 0 4px !important;
        }
        .rmdp-month-picker .rmdp-day.rmdp-selected span,
        .rmdp-year-picker  .rmdp-day.rmdp-selected span { background: #1A1C1E !important; color: #fff !important; font-weight: 700 !important; }
        .rmdp-month-picker .rmdp-day:not(.rmdp-selected) span:hover,
        .rmdp-year-picker  .rmdp-day:not(.rmdp-selected) span:hover { background: #F3F4F6 !important; }

        /* Nav buttons */
        .rmdp-arrow-container { background: transparent !important; border: none !important; box-shadow: none !important; }
        .rmdp-arrow-container:hover { background: #F3F4F6 !important; border-radius: 50% !important; }
      `}</style>

      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-[#393E46] mb-0.5">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}

      {/* DatePicker */}
      <DatePicker
        value={dateValue ?? null}
        onChange={handleChange}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD"
        editable={false}
        disabled={disabled}
        {...(minDate ? { minDate } : {})}
        {...(maxDate ? { maxDate } : {})}
        /* ── Arrow icons ── */
        renderButton={(direction: 'right' | 'left', handleClick: () => void) => (
          <button
            type="button"
            onClick={handleClick}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <NavIcon direction={direction} />
          </button>
        )}
        /* ── Custom input trigger ── */
        render={(displayValue: string, openCalendar: () => void) => (
          <button
            type="button"
            onClick={disabled ? undefined : openCalendar}
            disabled={disabled}
            className={[
              'w-full h-[52px] flex items-center justify-between gap-2',
              'bg-white rounded-xl border px-4',
              'text-right text-sm font-num-medium transition-colors',
              'focus:outline-none',
              error
                ? 'border-red-400 focus:border-red-500'
                : 'border-[#DCE4E8] hover:border-[#FDD00A] focus:border-[#FDD00A]',
              disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer',
            ].join(' ')}
          >
            <span className={displayValue ? 'text-[#0D0D12]' : 'text-[#A0A9B4]'}>
              {displayValue || placeholder}
            </span>
            <CalendarDays size={18} className="text-[#A0A9B4] shrink-0" />
          </button>
        )}
        containerStyle={{ width: '100%' }}
        style={{ width: pw }}
        calendarPosition="bottom-center"
        onlyMonthPicker={false}
        showOtherDays={false}
      />

      {/* Hidden native input for FormData / server actions */}
      {name && <input type="hidden" name={name} value={value ?? ''} readOnly />}

      {/* Error message */}
      {error && (
        <span className="text-xs text-red-500 mt-0.5" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

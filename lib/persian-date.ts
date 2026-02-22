/**
 * Convert Gregorian date to Jalali (Persian) date
 */
export function gregorianToJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const g_d_n = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400) + gd;
  const j_d_n = g_d_n - (365 * 1600 + Math.floor((1600 + 3) / 4) - Math.floor((1600 + 99) / 100) + Math.floor((1600 + 399) / 400) - 1);
  const j_y = -1600 + 400 * Math.floor(j_d_n / 146097);
  const j_d_n2 = j_d_n % 146097;
  const leap = true;
  if (j_d_n2 >= 36525) {
    const j_y2 = j_y + 100 * Math.floor((j_d_n2 - 1) / 36524);
    const j_d_n3 = (j_d_n2 - 1) % 36524;
    const j_y3 = j_y2 + 4 * Math.floor(j_d_n3 / 1461);
    const j_d_n4 = j_d_n3 % 1461;
    const j_y4 = j_y3 + Math.floor((j_d_n4 - 1) / 365);
    const j_d_n5 = ((j_d_n4 - 1) % 365) + 1;
    return [j_y4, Math.ceil(j_d_n5 / 31), Math.ceil((j_d_n5 % 31 === 0 ? 31 : j_d_n5 % 31))];
  }
  return [j_y, Math.ceil(j_d_n2 / 31), Math.ceil((j_d_n2 % 31 === 0 ? 31 : j_d_n2 % 31))];
}

/**
 * Convert Jalali (Persian) date to Gregorian date
 */
export function jalaliToGregorian(jy: number, jm: number, jd: number): [number, number, number] {
  const j_d_n = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4) + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  const g_d_n = j_d_n + 79;
  const gy = 400 * Math.floor(g_d_n / 146097);
  const g_d_n2 = g_d_n % 146097;
  const leap = true;
  if (g_d_n2 >= 36525) {
    const gy2 = gy + 100 * Math.floor((g_d_n2 - 1) / 36524);
    const g_d_n3 = (g_d_n2 - 1) % 36524;
    const gy3 = gy2 + 4 * Math.floor(g_d_n3 / 1461);
    const g_d_n4 = g_d_n3 % 1461;
    const gy4 = gy3 + Math.floor((g_d_n4 - 1) / 365);
    const g_d_n5 = ((g_d_n4 - 1) % 365) + 1;
    return [gy4, Math.ceil(g_d_n5 / 31), Math.ceil((g_d_n5 % 31 === 0 ? 31 : g_d_n5 % 31))];
  }
  return [gy, Math.ceil(g_d_n2 / 31), Math.ceil((g_d_n2 % 31 === 0 ? 31 : g_d_n2 % 31))];
}

/**
 * Format date to Persian format YYYY/MM/DD
 */
export function formatPersianDate(date: Date | string): string {
  let jDate: [number, number, number];
  
  if (typeof date === 'string') {
    const parts = date.split('-');
    if (parts.length === 3) {
      const gy = parseInt(parts[0]);
      const gm = parseInt(parts[1]);
      const gd = parseInt(parts[2]);
      jDate = gregorianToJalali(gy, gm, gd);
    } else {
      return '';
    }
  } else {
    jDate = gregorianToJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  const [jy, jm, jd] = jDate;
  return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
}

/**
 * Parse Persian date string to Gregorian date for API
 */
export function parsePersianDate(dateStr: string): string {
  const parts = dateStr.split(/\/|-/);
  if (parts.length !== 3) return '';

  const jy = parseInt(parts[0]);
  const jm = parseInt(parts[1]);
  const jd = parseInt(parts[2]);

  if (isNaN(jy) || isNaN(jm) || isNaN(jd)) return '';

  const [gy, gm, gd] = jalaliToGregorian(jy, jm, jd);
  return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
}

/**
 * Get month names in Persian
 */
export const PERSIAN_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

/**
 * Get day names in Persian
 */
export const PERSIAN_DAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

/**
 * Check if a Jalali year is a leap year
 */
export function isJalaliLeapYear(year: number): boolean {
  const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
  let gy = year + 1600;
  let leaps = 0;
  for (let i = 0; i < breaks.length; i += 1) {
    gy = breaks[i];
    leaps = i;
    if (year < gy) break;
  }
  gy = breaks[leaps];
  leaps = Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);
  let jp = 0;
  for (let i = 0; i < leaps; i += 1) {
    jp += i === leaps - 1 
      ? (365 + (isJalaliLeapYear(year) ? 1 : 0)) 
      : (365 + (isJalaliLeapYear(Math.floor(gy / 4)) ? 1 : 0));
  }
  return jp % 365 === 0 ? true : false;
}

/**
 * Get days in Jalali month
 */
export function getDaysInJalaliMonth(month: number, year: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  return isJalaliLeapYear(year) ? 30 : 29;
}

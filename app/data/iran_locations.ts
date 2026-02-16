export const provinces = [
  { id: 1, name: 'تهران' },
  { id: 2, name: 'تبریز' },
  { id: 3, name: 'اصفهان' },
  { id: 4, name: 'شیراز' },
  { id: 5, name: 'مشهد' },
  { id: 6, name: 'کرج' },
];

export const cities: Record<number, { id: number; name: string }[]> = {
  1: [
    { id: 101, name: 'تهران' },
    { id: 102, name: 'اسلامشهر' },
    { id: 103, name: 'شهریار' },
  ],
  2: [
    { id: 201, name: 'تبریز' },
    { id: 202, name: 'مراغه' },
    { id: 203, name: 'مرند' },
  ],
  3: [
    { id: 301, name: 'اصفهان' },
    { id: 302, name: 'کاشان' },
    { id: 303, name: 'خمینی‌شهر' },
  ],
  4: [
    { id: 401, name: 'شیراز' },
    { id: 402, name: 'مرودشت' },
    { id: 403, name: 'جهرم' },
  ],
  5: [
    { id: 501, name: 'مشهد' },
    { id: 502, name: 'نیشابور' },
    { id: 503, name: 'سبزوار' },
  ],
  6: [
    { id: 601, name: 'کرج' },
    { id: 602, name: 'فردیس' },
    { id: 603, name: 'کمال‌شهر' },
  ],
};

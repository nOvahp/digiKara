export interface TimcheItem {
  id: number;
  title: string;
  boothCount: string;
  manager: string;
  lastUpdate: string;
  performance: string;
  totalSales: string;
  status: 'active' | 'pending';
  image: string;
}

const DEFAULT_TIMCHES: TimcheItem[] = [
  {
    id: 1,
    title: 'تیمچه صنایع دستی',
    boothCount: '12',
    manager: 'لیلی رضایی',
    lastUpdate: '3 روز قبل',
    performance: 'عالی',
    totalSales: '۵۰,۰۰۰,۰۰۰ ریال',
    status: 'active',
    image: '/sanayedasti.png',
  },
  {
    id: 2,
    title: 'محصولات کشاورزی',
    boothCount: '14',
    manager: 'مهتاب کریمی',
    lastUpdate: 'امروز',
    performance: 'عالی',
    totalSales: '۱۲۰,۰۰۰,۰۰۰ ریال',
    status: 'active',
    image: '/apple.png',
  },
  {
    id: 3,
    title: 'تیمچه رباتیک و الکترونیک',
    boothCount: '۵ حجره',
    manager: 'زهرا محمدی',
    lastUpdate: 'ثبت نشده',
    performance: 'برآورد نشده',
    totalSales: 'هنوز فروشی ثبت نشده است',
    status: 'pending',
    image: '/robotic.png',
  },
];

const STORAGE_KEY = 'timche_list_data_v2';

// ... existing code ...

export interface User {
  id: number;
  name: string;
  role: string;
  type: 'manager' | 'student';
  color: string;
}

export const MOCK_USERS: User[] = [
  {
    id: 101,
    name: 'رضا محمدی',
    role: 'دانش آموز',
    type: 'student',
    color: 'bg-[#FF5252]',
  },
  {
    id: 102,
    name: 'زهرا کریمی',
    role: 'دانش آموز',
    type: 'student',
    color: 'bg-[#448AFF]',
  },
  {
    id: 103,
    name: 'محمد حسینی',
    role: 'دانش آموز',
    type: 'student',
    color: 'bg-[#69F0AE]',
  },
  {
    id: 104,
    name: 'فاطمه رحیمی',
    role: 'دانش آموز',
    type: 'student',
    color: 'bg-[#E040FB]',
  },
  {
    id: 105,
    name: 'علی اکبری',
    role: 'دانش آموز',
    type: 'student',
    color: 'bg-[#FFAB40]',
  },
  {
    id: 106,
    name: 'مریم صادقی',
    role: 'دانش آموز',
    type: 'student',
    color: 'bg-[#536DFE]',
  },
  {
    id: 107,
    name: 'حسین باقری',
    role: 'دانش آموز',
    type: 'student',
    color: 'bg-[#00BFA5]',
  },
  {
    id: 108,
    name: 'Nima Ahmadi',
    role: 'Manager',
    type: 'manager',
    color: 'bg-[#FF5252]',
  },
];

export const getAvailableUsers = () => MOCK_USERS;

export const getTimches = (): TimcheItem[] => {
  if (typeof window === 'undefined') return DEFAULT_TIMCHES;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with defaults if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TIMCHES));
    return DEFAULT_TIMCHES;
  }
  return JSON.parse(stored);
};

export const addTimche = (timche: TimcheItem) => {
  const current = getTimches();
  const updated = [timche, ...current]; // Add to top
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

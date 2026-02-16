'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ChevronDown,
  FileText,
  Users,
  Edit2,
  MoreVertical,
  MoreHorizontal,
  Plus,
  MapPin,
  Phone,
  LayoutGrid,
  FileCheck,
  Briefcase,
  Shield,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../../lib/utils';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

interface Student {
  id: number;
  name: string;
  nationalId: string;
  grade: string;
  major: string;
  status: 'active' | 'inactive';
}

const studentsData: Student[] = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  name:
    [
      'امیرعلی محمدی',
      'پیمان فرهادی',
      'محمدحسین احمدی',
      'علیرضا حسینی',
      'رضا کریمی',
      'مهدی عباسی',
      'حامد باقری',
    ][i % 7] + ` ${toFarsiNumber(i + 1)}`,
  nationalId: '0023456789',
  grade: 'یازدهم',
  major: 'شبکه و نرم افزار',
  status: i % 4 === 0 ? 'inactive' : 'active',
}));

export default function SchoolProfile() {
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    majors: false,
    licenses: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Table State & Logic
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const filterRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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

  // Default scroll to right
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, []);

  const handleFilterChange = (value: string) => {
    setSelectedFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((f) => f !== value);
      } else {
        return [...prev, value];
      }
    });
    setCurrentPage(1);
  };

  const getFilterOptions = () => [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
  ];

  const filteredStudents = studentsData.filter((student) => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(student.status);
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="w-full min-h-screen  pb-24 flex flex-col items-center" dir="rtl">
      {/* Header / Profile Summary */}
      <div className="w-full flex flex-col items-center gap-4 pt-6 px-0">
        <div className="w-full flex justify-between items-center mb-2">
          <div className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold">
            پروفایل مدارس
          </div>
          {/* Placeholder for top left menu or notification if needed, usually empty in this design or back button */}
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-[120px] h-[120px] relative rounded-full overflow-hidden border border-[#DFE1E7]">
            <Image src="/SchoolProfile.png" alt="School Profile" fill className="object-cover" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-[#222831] text-base font-num-medium font-extrabold">
              مدرسه هنرهای زیبا
            </h1>
            <div className="flex items-center gap-2 text-[#61656B] text-xs font-num-medium font-extrabold">
              <span>شناسه: {toFarsiNumber(123456)}</span>
              <span className="w-1 h-1 rounded-full bg-[#61656B]"></span>
              <span>ابهر، زنجان</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="w-full px-0 mt-6 flex flex-col gap-2">
        <div className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold text-right">
          دسترسی سریع
        </div>
        <div className="flex items-center gap-2">
          {/* Reports */}
          <button className="flex-1 bg-[#FDD00A] rounded-lg p-2 pr-4 flex items-center justify-between hover:bg-[#e5bc09] transition-colors">
            <span className="text-[#0F172A] text-sm font-['PeydaWeb'] font-semibold">گزارش ها</span>
            <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
            </div>
          </button>
          {/* Students */}
          <button className="flex-1 bg-[#FDD00A] rounded-lg p-2 pr-4 flex items-center justify-between hover:bg-[#e5bc09] transition-colors">
            <span className="text-[#0F172A] text-sm font-['PeydaWeb'] font-semibold">
              دانش آموزان
            </span>
            <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center">
              <Users className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
            </div>
          </button>
          {/* Edit */}
          <button className="flex-1 bg-[#FDD00A] rounded-lg p-2 pr-4 flex items-center justify-between hover:bg-[#e5bc09] transition-colors">
            <span className="text-[#0F172A] text-sm font-['PeydaWeb'] font-semibold">ویرایش</span>
            <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center">
              <Edit2 className="w-5 h-5 text-[#0A0A0A]" strokeWidth={1.5} />
            </div>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="w-full px-0 mt-8 flex flex-col gap-3">
        <div className="flex gap-3">
          {/* Staff */}
          <div className="flex-1 bg-white border border-[#DFE1E7] rounded-xl p-4 shadow-sm flex flex-col items-center gap-2">
            <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">
              کادر آموزشی
            </span>
            <span className="text-[#0D0D12] text-2xl font-num-medium font-semibold">
              {toFarsiNumber(32)}
            </span>
            <span className="text-[#818898] text-xs font-['PeydaWeb'] font-light">
              فعال در ترم جاری
            </span>
          </div>
          {/* Students */}
          <div className="flex-1 bg-white border border-[#DFE1E7] rounded-xl p-4 shadow-sm flex flex-col items-center gap-2">
            <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">
              کل دانش‌آموزان
            </span>
            <span className="text-[#0D0D12] text-2xl font-num-medium font-semibold">
              {toFarsiNumber(450)}
            </span>
            <div className="text-xs">
              <span className="text-[#818898] font-num-medium mx-1">{toFarsiNumber(15)}+</span>
              <span className="text-[#818898] font-['PeydaWeb'] font-light">در ماه گذشته</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          {/* Orders */}
          <div className="flex-1 bg-white border border-[#DFE1E7] rounded-xl p-4 shadow-sm flex flex-col items-center gap-2">
            <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">سفارشات</span>
            <span className="text-[#0D0D12] text-2xl font-num-medium font-semibold">
              {toFarsiNumber(340)}
            </span>
            <span className="text-[#818898] text-xs font-['PeydaWeb'] font-light">
              در ماه گذشته
            </span>
          </div>
          {/* Active Timches */}
          <div className="flex-1 bg-white border border-[#DFE1E7] rounded-xl p-4 shadow-sm flex flex-col items-center gap-2">
            <span className="text-[#818898] text-sm font-['PeydaWeb'] font-semibold">
              تیمچه های فعال
            </span>
            <span className="text-[#0D0D12] text-2xl font-num-medium font-semibold">
              {toFarsiNumber(8)}
            </span>
            <div className="text-xs">
              <span className="text-[#818898] font-num-medium mx-1">{toFarsiNumber(1)}+</span>
              <span className="text-[#818898] font-['PeydaWeb'] font-light">حمایت در ترم جاری</span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Details */}
      <div className="w-full px-0 mt-8 flex flex-col gap-3">
        <div className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold text-right mb-1">
          جزئیات اطلاعات
        </div>

        <div className="w-full bg-white border border-[#DFE1E7] rounded-xl p-3 flex flex-col gap-2">
          {/* Basic Info Header */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSection('basic')}
          >
            <ChevronDown
              className={cn(
                'w-5 h-5 text-[#666D80] transition-transform',
                expandedSections.basic ? 'rotate-180' : '',
              )}
            />
            <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">
              اطلاعات پایه و تماس
            </span>
          </div>

          {expandedSections.basic && (
            <div className="flex flex-col gap-2 mt-2">
              {/* Official Name */}
              <div className="w-full bg-[#fcfcfc] border border-[#DCE4E8] rounded-xl p-3 flex items-center justify-between">
                <div className="bg-[#F8CB2E] w-[46px] h-[46px] rounded-lg flex items-center justify-center shrink-0">
                  <Briefcase className="w-6 h-6 text-[#0D0D12]" />
                </div>
                <div className="flex-1 flex flex-col items-start pr-3">
                  <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">
                    نام رسمی
                  </span>
                  <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold mt-1">
                    مدرسه فنی حرفه‌ای آینده‌سازان (دوره دوم)
                  </span>
                </div>
                <div className="border border-[#DFE1E7] bg-white rounded-lg p-2 shadow-sm">
                  <Edit2 className="w-4 h-4 text-[#818898]" />
                </div>
              </div>

              {/* Address */}
              <div className="w-full bg-[#fcfcfc] border border-[#DCE4E8] rounded-xl p-3 flex items-center justify-between">
                <div className="bg-[#F8CB2E] w-[46px] h-[46px] rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#0D0D12]" />
                </div>
                <div className="flex-1 flex flex-col items-start pr-3">
                  <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">
                    آدرس
                  </span>
                  <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold mt-1 text-right leading-tight">
                    تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲
                  </span>
                </div>
                <div className="border border-[#DFE1E7] bg-white rounded-lg p-2 shadow-sm">
                  <Edit2 className="w-4 h-4 text-[#818898]" />
                </div>
              </div>

              {/* Phone */}
              <div className="w-full bg-[#fcfcfc] border border-[#DCE4E8] rounded-xl p-3 flex items-center justify-between">
                <div className="bg-[#F8CB2E] w-[46px] h-[46px] rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#0D0D12]" />
                </div>
                <div className="flex-1 flex flex-col items-start pr-3">
                  <span className="text-[#0D0D12] text-xs font-['PeydaWeb'] font-black">تلفن</span>
                  <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold mt-1">
                    {toFarsiNumber('021-88881234')}
                  </span>
                </div>
                <div className="border border-[#DFE1E7] bg-white rounded-lg p-2 shadow-sm">
                  <Edit2 className="w-4 h-4 text-[#818898]" />
                </div>
              </div>

              {/* Postal Code */}
              <div className="w-full bg-[#fcfcfc] border border-[#DCE4E8] rounded-xl p-3 flex items-center justify-between">
                <div className="bg-[#F8CB2E] w-[46px] h-[46px] rounded-lg flex items-center justify-center shrink-0">
                  <LayoutGrid className="w-6 h-6 text-[#0D0D12]" />
                </div>
                <div className="flex-1 flex flex-col items-start pr-3">
                  <span className="text-[#0D0D12] text-xs font-['PeydaWeb'] font-black">
                    کد پستی
                  </span>
                  <span className="text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold mt-1">
                    {toFarsiNumber(1991645893)}
                  </span>
                </div>
                <div className="border border-[#DFE1E7] bg-white rounded-lg p-2 shadow-sm">
                  <Edit2 className="w-4 h-4 text-[#818898]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Majors */}
        <div
          className="w-full bg-white border border-[#DFE1E7] rounded-xl py-3 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('majors')}
        >
          <div className="flex items-center gap-2">
            <ChevronDown
              className={cn(
                'w-5 h-5 text-[#666D80] transition-transform',
                expandedSections.majors ? 'rotate-180' : 'rotate-0',
              )}
            />
            <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">
              رشته ها و کارگاه های فعال
            </span>
          </div>
        </div>

        {/* Licenses */}
        <div
          className="w-full bg-white border border-[#DFE1E7] rounded-xl py-3 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('licenses')}
        >
          <div className="flex items-center gap-2">
            <ChevronDown
              className={cn(
                'w-5 h-5 text-[#666D80] transition-transform',
                expandedSections.licenses ? 'rotate-180' : 'rotate-0',
              )}
            />
            <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold">
              اطلاعات مجوز ها و اسناد
            </span>
          </div>
        </div>
      </div>

      {/* Active Users */}
      <div className="w-full px-0 mt-8 flex flex-col gap-4">
        <div className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold text-right">
          کاربران فعال
        </div>

        {/* Tabs */}
        <div className="w-full bg-[#F6F6F6] border border-[#D7D8DA] rounded-lg p-1 flex">
          <button className="flex-1 py-1 rounded-md text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold">
            کادر آموزشی
          </button>
          <button className="flex-1 py-1 bg-[#F7C61A] rounded-md text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold shadow-sm">
            دانش آموزان
          </button>
        </div>

        {/* Table */}
        <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] flex flex-col justify-start items-end overflow-hidden">
          {/* Header with Filter */}
          <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
            <span className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold">
              دانش آموزان فعال
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2" ref={filterRef}>
                <div className="relative">
                  <div
                    className={`w-8 h-8 px-0 py-0 rounded-lg outline outline-1 outline-[#DFE1E7] flex justify-center items-center gap-2 cursor-pointer transition-colors ${isFilterOpen ? 'bg-gray-100 ring-2 ring-blue-100' : 'bg-white hover:bg-gray-50'}`}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter
                      className={`w-4 h-4 ${selectedFilters.length > 0 ? 'text-[#F7C61A]' : 'text-[#818898]'}`}
                    />
                  </div>

                  {/* Filter Dropdown */}
                  {isFilterOpen && (
                    <div
                      className="absolute top-9 left-0 z-50 w-48 bg-white rounded-xl shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-[#EFF0F2] p-2 flex flex-col gap-1 anim-fade-in"
                      dir="rtl"
                    >
                      <div className="text-[#666D80] text-xs font-medium px-2 py-1 mb-1 border-b border-gray-100 text-right">
                        فیلتر بر اساس وضعیت
                      </div>
                      {getFilterOptions().map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer"
                          onClick={() => handleFilterChange(option.value)}
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedFilters.includes(option.value) ? 'bg-[#F7C61A] border-[#F7C61A]' : 'border-[#DFE1E7] bg-white'}`}
                          >
                            {selectedFilters.includes(option.value) && (
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
                            className={`text-sm ${selectedFilters.includes(option.value) ? 'text-[#0D0D12] font-semibold' : 'text-[#666D80] font-medium'}`}
                          >
                            {option.label}
                          </span>
                        </div>
                      ))}
                      {selectedFilters.length > 0 && (
                        <div
                          className="text-center text-[#B21634] text-xs font-medium py-1.5 mt-1 border-t border-gray-100 cursor-pointer hover:bg-red-50 rounded-b-lg"
                          onClick={() => setSelectedFilters([])}
                        >
                          حذف فیلترها
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50">
                <Search className="w-4 h-4 text-[#818898]" />
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div ref={scrollContainerRef} className="w-full overflow-x-auto no-scrollbar">
            <div className="min-w-[600px] flex flex-col">
              {/* Header Row */}
              <div className="flex bg-[#F6F8FA] border-b border-[#DFE1E7] py-2 px-3 text-[#666D80] text-sm font-medium font-semibold">
                <div className="w-[80px] text-center">شناسه</div>
                <div className="flex-1 text-right pr-4">دانش آموز</div>
                <div className="w-[120px] text-center">مقطع</div>
                <div className="w-[150px] text-center">رشته</div>
                <div className="w-[78px] text-center">وضعیت</div>
                <div className="w-[44px]"></div>
              </div>

              {/* Body Rows */}
              {currentStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center py-3 px-3 border-b border-[#DFE1E7] last:border-0 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-[80px] flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border border-[#DFE1E7] rounded bg-white cursor-pointer"></div>
                    <span className="text-[#0D0D12] font-num-medium font-semibold">
                      {toFarsiNumber(student.id)}
                    </span>
                  </div>
                  <div className="flex-1 text-right pr-4 text-[#0D0D12] text-sm font-medium">
                    {student.name}
                  </div>
                  <div className="w-[120px] text-center text-[#0D0D12] text-sm font-medium">
                    {student.grade}
                  </div>
                  <div className="w-[150px] text-center text-[#0D0D12] text-sm font-medium">
                    {student.major}
                  </div>
                  <div className="w-[78px] flex justify-center">
                    <div
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-num-medium',
                        student.status === 'active'
                          ? 'bg-[#ECF9F7] text-[#267666]'
                          : 'bg-[#FCE8EC] text-[#B21634]',
                      )}
                    >
                      {student.status === 'active' ? 'فعال' : 'غیرفعال'}
                    </div>
                  </div>
                  <div className="w-[44px] flex justify-center">
                    <MoreHorizontal className="w-5 h-5 text-[#818898]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Footer */}
          <div className="w-full px-5 py-4 flex justify-between items-center border-t border-[#DFE1E7]">
            <div className="flex items-center gap-2">
              <div
                onClick={handleNextPage}
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
                onClick={handlePrevPage}
                className={`w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-[#DFE1E7] cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
              >
                <ChevronLeft className="w-5 h-5 text-[#0D0D12]" />
              </div>
            </div>
            <span className="text-center text-[#0D0D12] text-sm font-num-medium font-medium">
              صفحه {toFarsiNumber(currentPage)} از {toFarsiNumber(totalPages)}
            </span>
          </div>
        </div>
      </div>

      {/* Update Button */}
      <div className="w-full px-0 mt-8 pb-8">
        <button className="w-full bg-[#FDD00A] rounded-xl py-3 text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold hover:bg-[#e5bc09] transition-colors">
          بروز رسانی اطلاعات مدارس
        </button>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAvailableUsers, User as StorageUser } from '../TimcheStorage';
import { useNewTimche } from './NewTimcheContext';
import { ChevronLeft, Check, Plus, User, Wallet, ShoppingBag, Shield, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NewTimche3 = () => {
  const router = useRouter();
  const { step3Data, saveStep3 } = useNewTimche();

  // Hardcoded step 3
  const step = 3;

  const steps = [
    { id: 1, title: 'اطلاعات پایه' },
    { id: 2, title: 'پروژه‌ها' },
    { id: 3, title: 'اعضا' },
    { id: 4, title: 'معیارها' },
  ];

  const [members, setMembers] = useState(
    step3Data?.members || [
      {
        id: 1,
        name: 'علی رضایی',
        role: 'مسئول تیمچه',
        type: 'manager' as const,
        color: 'bg-[#0A33FF]',
      },
      {
        id: 2,
        name: 'امیرحسین محمدی',
        role: 'دانش آموز',
        type: 'student' as const,
        color: 'bg-[#F8CB2E]',
      },
      {
        id: 3,
        name: 'بهروز حسینی',
        role: 'دانش آموز',
        type: 'student' as const,
        color: 'bg-[#F8CB2E]',
      },
    ],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const availableUsers = getAvailableUsers();

  // ... matrix state ...
  const [matrix, setMatrix] = useState({
    manager: { content: true, price: true, order: true },
    student: { content: false, price: false, order: true },
  });

  const togglePermission = (
    role: 'manager' | 'student',
    permission: 'content' | 'price' | 'order',
  ) => {
    setMatrix((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: !prev[role][permission],
      },
    }));
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleSelectUser = (user: StorageUser) => {
    if (members.find((m) => m.id === user.id)) {
      // Already added
      return;
    }
    setMembers([...members, user]);
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    saveStep3({ members });
    router.push('/SchoolPanel/Timche/New/Step4');
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pb-30 relative" dir="rtl">
      {/* Header */}
      {/* ... (keep header & stepper identical) ... */}
      <div className="w-full max-w-[440px] pt-4 flex flex-col gap-5">
        <div className="w-full px-4 flex justify-between items-center">
          <h1 className="text-center text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
            افزودن تیمچه
          </h1>
          <div
            onClick={() => router.back()}
            className="w-10 h-10 bg-white rounded-full border border-[rgba(8,11,17,0.10)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Stepper */}
        <div className="w-full px-0 py-5 border-b border-[#DFE1E7] flex justify-between items-center overflow-x-auto no-scrollbar gap-4">
          {steps.map((s) => (
            <div
              key={s.id}
              className={cn('flex items-center gap-2.5', step !== s.id && 'opacity-50')}
            >
              <span
                className={cn(
                  "text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide whitespace-nowrap",
                  step === s.id ? 'text-[#0D0D12]' : 'text-[#818898]',
                )}
              >
                {s.title}
              </span>
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center shadow-sm',
                  step === s.id ? 'bg-[#FDD00A]' : 'bg-[#DFE1E7]',
                )}
              >
                <span className="text-white text-sm font-num-bold font-bold leading-[21px]">
                  {s.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3 Content: Members */}
      <div className="w-full max-w-[440px] px-0 py-6 flex flex-col gap-6">
        {/* Add Member Button */}
        <div
          onClick={handleAddClick}
          className="w-full h-[57px] rounded-xl border border-dashed border-[#DFE1E7] flex items-center justify-center gap-2.5 cursor-pointer hover:bg-gray-50"
        >
          <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold leading-6">
            افزودن افراد یا حجره
          </span>
          <div className="w-6 h-6 border-2 border-[#1A1C1E] rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-[#1A1C1E]" strokeWidth={2.5} />
          </div>
        </div>

        {/* Members List - Scrollable */}
        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto px-1 custom-scrollbar">
          {members.map((member) => (
            <div
              key={member.id}
              className="w-full h-[61px] p-2 pr-[14px] bg-white rounded-xl border border-[#DCE4E8] flex items-center justify-between shrink-0"
            >
              {/* Right Side: Avatar & Text */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={cn(
                    'w-[46px] h-[46px] rounded-lg flex items-center justify-center relative overflow-hidden',
                    member.color,
                  )}
                >
                  {member.type === 'manager' ? (
                    <Shield className="text-white w-6 h-6" />
                  ) : (
                    <User className="text-[#0D0D12] w-6 h-6" />
                  )}
                </div>

                {/* Text */}
                <div className="flex flex-col items-start gap-1">
                  <span className="text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold leading-[21px]">
                    {member.name}
                  </span>
                  <span className="text-center text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Left Side: Small Icon */}
              <div className="w-8 h-8 bg-white rounded-lg border border-[#DFE1E7] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] flex items-center justify-center">
                <User className="w-4 h-4 text-[#818898]" />
              </div>
            </div>
          ))}
        </div>

        {/* Access Matrix Section */}
        <div className="w-full flex flex-col gap-3 pt-3">
          <div className="w-full flex justify-between items-center">
            <span className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold leading-[21.6px]">
              ماتریس دسترسی
            </span>
            <span className="text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold">ویرایش</span>
          </div>

          <div className="w-full bg-white rounded-xl border border-[#DFE1E7] overflow-hidden shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)]">
            {/* Header Row */}
            <div className="w-full h-10 bg-[#F6F8FA] border-b border-[#DFE1E7] flex">
              <div className="w-[97px] flex items-center justify-start px-3 text-[#666D80] text-sm font-['PeydaWeb'] font-semibold border-l-[1px] border-[#DFE1E7] border-opacity-50">
                نقش
              </div>
              <div className="flex-1 flex items-center justify-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold border-l-[1px] border-[#DFE1E7] border-opacity-50">
                سفارش
              </div>
              <div className="flex-1 flex items-center justify-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold border-l-[1px] border-[#DFE1E7] border-opacity-50">
                قیمت
              </div>
              <div className="flex-1 flex items-center justify-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold">
                محتوا
              </div>
            </div>

            {/* Manager Row */}
            <div className="w-full h-16 border-b border-[#DFE1E7] flex">
              <div className="w-[97px] flex items-center justify-start px-3 text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold border-l-[1px] border-[#DFE1E7] border-opacity-50">
                مسئول
              </div>
              <div
                onClick={() => togglePermission('manager', 'order')}
                className="flex-1 flex items-center justify-center border-l-[1px] border-[#DFE1E7] border-opacity-50 cursor-pointer"
              >
                {matrix.manager.order ? (
                  <div className="w-5 h-5 relative">
                    <div className="absolute inset-0 border-[1.25px] border-[#0A0A0A] rounded-[5px]" />
                    <Check
                      className="w-4 h-4 text-[#0A0A0A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]"
                      strokeWidth={3}
                    />
                  </div>
                ) : (
                  <div className="text-sm">-</div>
                )}
              </div>
              <div
                onClick={() => togglePermission('manager', 'price')}
                className="flex-1 flex items-center justify-center border-l-[1px] border-[#DFE1E7] border-opacity-50 cursor-pointer"
              >
                {matrix.manager.price ? (
                  <div className="w-5 h-5 relative">
                    <div className="absolute inset-0 border-[1.25px] border-[#0A0A0A] rounded-[5px]" />
                    <Check
                      className="w-4 h-4 text-[#0A0A0A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]"
                      strokeWidth={3}
                    />
                  </div>
                ) : (
                  <div className="text-sm">-</div>
                )}
              </div>
              <div
                onClick={() => togglePermission('manager', 'content')}
                className="flex-1 flex items-center justify-center cursor-pointer"
              >
                {matrix.manager.content ? (
                  <div className="w-5 h-5 relative">
                    <div className="absolute inset-0 border-[1.25px] border-[#0A0A0A] rounded-[5px]" />
                    <Check
                      className="w-4 h-4 text-[#0A0A0A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]"
                      strokeWidth={3}
                    />
                  </div>
                ) : (
                  <div className="text-sm">-</div>
                )}
              </div>
            </div>

            {/* Student Row */}
            <div className="w-full h-16 flex">
              <div className="w-[97px] flex items-center justify-start px-3 text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold border-l-[1px] border-[#DFE1E7] border-opacity-50">
                دانش آموز
              </div>
              <div
                onClick={() => togglePermission('student', 'order')}
                className="flex-1 flex items-center justify-center border-l-[1px] border-[#DFE1E7] border-opacity-50 cursor-pointer"
              >
                {matrix.student.order ? (
                  <div className="w-5 h-5 relative">
                    <div className="absolute inset-0 border-[1.25px] border-[#0A0A0A] rounded-[5px]" />
                    <Check
                      className="w-4 h-4 text-[#0A0A0A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]"
                      strokeWidth={3}
                    />
                  </div>
                ) : (
                  <div className="text-sm">-</div>
                )}
              </div>
              <div
                onClick={() => togglePermission('student', 'price')}
                className="flex-1 flex items-center justify-center border-l-[1px] border-[#DFE1E7] border-opacity-50 cursor-pointer"
              >
                {matrix.student.price ? (
                  <div className="w-5 h-5 relative">
                    <div className="absolute inset-0 border-[1.25px] border-[#0A0A0A] rounded-[5px]" />
                    <Check
                      className="w-4 h-4 text-[#0A0A0A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]"
                      strokeWidth={3}
                    />
                  </div>
                ) : (
                  <div className="text-sm">-</div>
                )}
              </div>
              <div
                onClick={() => togglePermission('student', 'content')}
                className="flex-1 flex items-center justify-center cursor-pointer"
              >
                {matrix.student.content ? (
                  <div className="w-5 h-5 relative">
                    <div className="absolute inset-0 border-[1.25px] border-[#0A0A0A] rounded-[5px]" />
                    <Check
                      className="w-4 h-4 text-[#0A0A0A] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%]"
                      strokeWidth={3}
                    />
                  </div>
                ) : (
                  <div className="text-sm">-</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="fixed bottom-0 w-full max-w-[440px] p-4 bg-white/80 backdrop-blur-sm border-t border-[#F0F0F0] mb-25 z-10 transition-all">
        <div className="w-full flex gap-3.5">
          <div
            onClick={handleContinue}
            className="w-[279px] h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#e5c109] transition-colors shadow-sm"
          >
            <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold">ادامه</span>
          </div>
          <div
            onClick={() => router.back()}
            className="flex-1 h-[57px] rounded-xl border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold">قبلی</span>
          </div>
        </div>
      </div>

      {/* Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start pt-[5vh] justify-center bg-black/50 backdrop-blur-sm px-0">
          <div className="bg-white w-full max-w-[400px] rounded-2xl p-4 flex flex-col gap-4 max-h-[80vh]">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-[#0D0D12] text-lg font-['PeydaWeb'] font-semibold">
                انتخاب کاربر
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar">
              {availableUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className="p-3 rounded-xl border border-[#DFE1E7] hover:border-[#FDD00A] cursor-pointer flex items-center justify-between transition-colors bg-gray-50 hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center text-white',
                        user.color,
                      )}
                    >
                      <span className="text-xs font-bold">{user.name.charAt(0)}</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[#0D0D12] text-sm font-semibold">{user.name}</span>
                      <span className="text-[#818898] text-xs">{user.role}</span>
                    </div>
                  </div>
                  {members.find((m) => m.id === user.id) && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTimche3;

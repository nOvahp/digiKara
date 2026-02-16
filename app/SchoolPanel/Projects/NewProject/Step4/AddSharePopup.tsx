'use client';

import React, { useState } from 'react';
import { Plus, Minus, X, User, Store, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

interface ShareMember {
  id: number;
  name: string;
  code: string;
  share: number;
  avatar: string;
  type: string;
}

interface AddSharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: ShareMember) => void;
}

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

// Mock Users for Search
const MOCK_USERS = [
  {
    id: 101,
    name: 'علی محمدی',
    wallet: 'ZA-AB-9443-1245',
    type: 'student',
    avatar: '/Avatar.png',
  },
  {
    id: 102,
    name: 'رضا کریمی',
    wallet: 'ZA-CD-1122-3344',
    type: 'student',
    avatar: '/Avatar.png',
  },
  {
    id: 103,
    name: 'حجره لوازم التحریر',
    wallet: 'ST-AB-9988-7766',
    type: 'booth',
    avatar: '/Avatar.png',
  },
];

const popupSchema = z.object({
  userType: z.enum(['student', 'booth']),
  selectedUser: z.object({
    id: z.number(),
    name: z.string(),
    wallet: z.string(),
    avatar: z.string(),
  }),
  sharePercent: z.number().min(1, 'حداقل ۱٪ سهم الزامی است').max(100, 'حداکثر ۱۰۰٪'),
});

type PopupFormValues = z.infer<typeof popupSchema>;

const AddSharePopup = ({ isOpen, onClose, onAdd }: AddSharePopupProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof MOCK_USERS>([]);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    resetField,
  } = useForm<PopupFormValues>({
    resolver: zodResolver(popupSchema),
    defaultValues: {
      userType: 'student',
      sharePercent: 20,
    },
  });

  /* eslint-disable react-hooks/incompatible-library */
  const userType = watch('userType');
  const selectedUser = watch('selectedUser');
  const sharePercent = watch('sharePercent');
  /* eslint-enable react-hooks/incompatible-library */

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = MOCK_USERS.filter((u) => u.name.includes(query) && u.type === userType);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectUser = (user: (typeof MOCK_USERS)[0]) => {
    setValue('selectedUser', user);
    setSearchQuery(user.name);
    setSearchResults([]);
  };

  const onSubmit = (data: PopupFormValues) => {
    onAdd({
      id: data.selectedUser.id,
      name: data.selectedUser.name,
      code: data.selectedUser.wallet, // Using wallet as code
      share: data.sharePercent,
      avatar: data.selectedUser.avatar,
      type: data.userType,
    });
    reset();
    setSearchQuery('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[380px] bg-white rounded-2xl flex flex-col overflow-hidden max-h-[90vh]"
      >
        {/* Header */}
        <div className="w-full h-16 px-5 flex justify-between items-center border-b border-[#DFE1E7]">
          <div
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            <X className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
          </div>
          <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb']">
            افزودن افراد یا حجره
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 overflow-y-auto" dir="rtl">
          {/* User Type */}
          <div className="flex flex-col gap-2">
            <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
              نوع کاربر
            </div>
            <div className="w-full h-8 bg-white border border-[#E5E5E5] rounded-lg flex items-center p-1">
              <div
                onClick={() => {
                  setValue('userType', 'booth');
                  resetField('selectedUser');
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className={cn(
                  'flex-1 h-full rounded flex items-center justify-center gap-2 cursor-pointer transition-colors',
                  userType === 'booth'
                    ? 'bg-[#FDD00A] text-[#0D0D12]'
                    : 'bg-transparent text-[#666D80]',
                )}
              >
                <span className="text-sm font-semibold font-['PeydaWeb']">حجره</span>
                <Store className="w-4 h-4" />
              </div>
              <div className="w-[1px] h-4 bg-[#E5E5E5] mx-1"></div>
              <div
                onClick={() => {
                  setValue('userType', 'student');
                  resetField('selectedUser');
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className={cn(
                  'flex-1 h-full rounded flex items-center justify-center gap-2 cursor-pointer transition-colors',
                  userType === 'student'
                    ? 'bg-[#FDD00A] text-[#0D0D12]'
                    : 'bg-transparent text-[#666D80]',
                )}
              >
                <span className="text-sm font-semibold font-['PeydaWeb']">دانش آموز</span>
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* User Selection */}
          <div className="flex flex-col gap-2 relative">
            <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
              انتخاب کاربر
            </div>
            <div
              className={cn(
                'w-full h-[52px] px-3 bg-white rounded-xl border flex items-center gap-2',
                errors.selectedUser ? 'border-red-500' : 'border-[#DFE1E7]',
              )}
            >
              <Search className="w-5 h-5 text-[#666D80]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 h-full border-none outline-none text-[#0D0D12] text-sm font-['PeydaWeb'] text-right placeholder-[#666D80]"
                placeholder="نام کاربر را وارد کنید ..."
              />
            </div>
            {errors.selectedUser && (
              <span className="text-xs text-red-500">{errors.selectedUser.message}</span>
            )}

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-[80px] left-0 right-0 bg-white border border-[#DFE1E7] rounded-xl shadow-lg z-10 max-h-[150px] overflow-y-auto">
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
                  >
                    <div className="w-8 h-8 relative rounded-full overflow-hidden bg-gray-200">
                      <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-[#0D0D12]">{user.name}</span>
                      <span className="text-[10px] text-[#666D80]">{user.wallet}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wallet Number */}
          {selectedUser && (
            <div className="flex flex-col gap-2">
              <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
                شماره کیف پول
              </div>
              <div className="w-full h-[52px] px-4 bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-center">
                <span className="text-[#666D80] text-sm font-light font-['PeydaWeb'] tracking-wider">
                  {selectedUser.wallet}
                </span>
              </div>
            </div>
          )}

          {/* User Share Counter */}
          <div className="flex flex-col gap-2">
            <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
              سهم کاربر
            </div>
            <div className="w-full h-[60px] p-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-between">
              {/* Counter */}
              <div className="h-9 flex items-center border border-[#E5E5E5] rounded-lg">
                <button
                  type="button"
                  onClick={() => setValue('sharePercent', Math.min(100, sharePercent + 5))}
                  className="w-10 flex items-center justify-center text-[#0D0D12] h-full hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <div className="w-10 h-full flex items-center justify-center border-x border-[#E5E5E5] text-[#0D0D12] text-sm font-semibold font-num-medium bg-[#F6F8FA]">
                  {toFarsiNumber(sharePercent)}
                </div>
                <button
                  type="button"
                  onClick={() => setValue('sharePercent', Math.max(0, sharePercent - 5))}
                  className="w-10 flex items-center justify-center text-[#0D0D12] h-full hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
                سهم کاربر
              </span>
            </div>
          </div>

          {/* Add Button */}
          <button
            type="submit"
            className="w-full h-[57px] mt-4 bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5c109] transition-colors"
          >
            <span className="text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">افزودن</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSharePopup;

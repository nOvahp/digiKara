'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserData } from '@/app/services/common/schemas';
import { toFarsiNumber } from '@/app/services/common/utils';
import { shopService } from '@/app/services/student/shopService';

interface PopUpStudentProps {
  onClose: () => void;
}

interface HojreData {
  id?: number;
  name?: string;
  description?: string;
  skill?: string;
  experience?: number;
  image?: string;
  logo?: string;
  [key: string]: unknown;
}

export function PopUpStudent({ onClose }: PopUpStudentProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [hojreData, setHojreData] = useState<HojreData | null>(null);

  useEffect(() => {
    // Fetch user data from localStorage using async pattern to avoid synchronous setState
    let cancelled = false;
    (async () => {
      await Promise.resolve(); // Make state update asynchronous
      
      if (cancelled) return;
      
      if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem('user_data');
        if (storedData) {
          try {
            const parsed = JSON.parse(storedData) as UserData;
            setUserData(parsed);
            
            // Extract hojre data from cell
            if (parsed.cell && typeof parsed.cell === 'object') {
              setHojreData(parsed.cell as HojreData);
            } else {
              // Try fetching directly if cell is not in localStorage
              const shopRes = await shopService.getShop();
              if (shopRes.success && shopRes.hasShop && shopRes.data) {
                // The API might return an array if it's multiple cells, or an object
                const shopData = Array.isArray(shopRes.data) ? shopRes.data[0] : shopRes.data;
                setHojreData(shopData as HojreData);
              }
            }
          } catch (e) {
            console.error('Failed to parse user data or fetch shop:', e);
          }
        }
      }
    })();
    
    return () => {
      cancelled = true;
    };
  }, []);

  // Prevent click propagation to parent (which might close the modal)
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!userData) return null;

  const renderDataRow = (label: string, value: string | number | undefined, isMultiline: boolean = false) => {
    if (!value && value !== 0) return null;
    
    if (isMultiline) {
      return (
        <div className="w-full min-h-[52px] h-auto px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex flex-col justify-center items-start gap-1.5">
          <div className="text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide">
            {label}
          </div>
          <div className="text-[#0D0D12] text-sm font-medium leading-relaxed tracking-wide text-right break-words w-full">
            {typeof value === 'number' ? toFarsiNumber(value.toString()) : value}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full min-h-[52px] h-auto px-3 py-2 bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex justify-between items-center gap-4">
        <div className="text-right text-[#666D80] text-sm font-semibold leading-tight tracking-wide whitespace-nowrap">
          {label}
        </div>
        <div className="text-[#0D0D12] text-sm font-medium leading-relaxed tracking-wide text-left break-words">
          {typeof value === 'number' ? toFarsiNumber(value.toString()) : value}
        </div>
      </div>
    );
  };

  // Use hojre image if available, otherwise student profile image
  const displayImage = hojreData?.image || hojreData?.logo || userData.profile_image;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] h-auto max-h-[90vh] bg-white rounded-xl outline outline-1 outline-[#DFE1E7] flex flex-col relative shadow-lg overflow-hidden"
        onClick={handleContentClick}
        dir="rtl"
      >
        {/* Close Button - Left Side */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="بستن"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Scrollable Content - Including Header */}
        <div className="flex-1 overflow-y-auto">
          {/* Header Section with Gradient */}
          <div className="w-full px-5 pt-5 pb-6 flex flex-col items-center gap-4 bg-[linear-gradient(180deg,#F7C309_0%,white_100%)]">
            {/* Hojre/Profile Image */}
            {displayImage ? (
              <div className="w-28 h-28 relative rounded-full overflow-hidden border-2 border-white shadow-lg">
                <Image 
                  src={displayImage} 
                  alt="تصویر" 
                  fill 
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-28 h-28 relative rounded-full bg-white border-2 border-white shadow-lg flex items-center justify-center">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#666D80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            )}
            
            {/* Name */}
            {(userData.firstname || userData.lastname) && (
              <div className="text-[#1A1C1E] text-lg font-bold leading-relaxed tracking-wide text-center">
                {`${userData.firstname || ''} ${userData.lastname || ''}`.trim()}
              </div>
            )}
          </div>

          {/* Data Content */}
          <div className="px-5 py-4 bg-white">
            <div className="flex flex-col gap-4">
              
              {/* Hojre Section */}
              {hojreData && (
                <div className="flex flex-col gap-2">
                  <div className="text-right text-[#0D0D12] text-base font-semibold leading-tight tracking-wide pb-1">
                    اطلاعات حجره
                  </div>
                  {renderDataRow('نام حجره', hojreData.name)}
                  {renderDataRow('توضیحات', hojreData.description, true)}
                  {renderDataRow('مهارت‌ها', hojreData.skill, true)}
                  {renderDataRow('سابقه کاری (سال)', hojreData.experience)}
                </div>
              )}

              {/* Student Section */}
              <div className="flex flex-col gap-2">
                <div className="text-right text-[#0D0D12] text-base font-semibold leading-tight tracking-wide pb-1">
                  اطلاعات دانش‌آموز
                </div>
                {renderDataRow('شماره تلفن', userData.phone)}
                {renderDataRow('کد ملی', userData.national_code)}
                {renderDataRow('مدرسه/دستگاه', userData.school)}
                {renderDataRow('پایه تحصیلی', userData.grade)}
                {renderDataRow('رشته', userData.field)}
                {renderDataRow('استان', userData.province)}
                {renderDataRow('شهر', userData.city)}
                {renderDataRow('منطقه', userData.district)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUpStudent;

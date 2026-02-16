'use client';

import * as React from 'react';
import { Bell, Mail, Wallet } from 'lucide-react';
import Image from 'next/image';

import { PopUpStudent } from '../features/products/PopUpStudent';
import Notifications from '../features/notifications/Notifications';

export function DashboardNavBar() {
  const [user, setUser] = React.useState<any>(null);
  const [showStudentPopup, setShowStudentPopup] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  React.useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user_data') || localStorage.getItem('user');
      console.log('DashboardNavBar: storedUser from localStorage:', storedUser);
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        console.log('DashboardNavBar: parsed user:', parsed);
        setUser(parsed);
      } else {
        console.warn('DashboardNavBar: No user data found in localStorage');
      }
    } catch (e) {
      console.error('Error parsing user data in navbar', e);
    }
  }, []);

  // Helpers to safely get display names
  const getFullName = () => {
    if (user?.firstname && user?.lastname) return `${user.firstname} ${user.lastname}`;
    return 'کاربر ناشناس'; // Unknown User
  };

  const getRoleSchool = () => {
    // Assuming 'field' maps to role/major and 'school' is school name
    const field = user?.field || 'دانش آموز';
    const school = user?.school || 'بدون مدرسه';
    return `${field} - ${school}`;
  };

  return (
    <>
      <div className="w-full max-w-md px-4 pt-6 flex justify-between items-center" dir="rtl">
        {/* Right Side: Profile (in RTL it appears on Right) */}
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer" onClick={() => setShowStudentPopup(true)}>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 relative">
              {/* User Image */}
              <Image
                src={user?.profile_image || 'https://placehold.co/40x40'}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            {/* Status Dot */}
            <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 bg-[#64B327] rounded-full border-2 border-white shadow-sm flex items-center justify-center">
              {/* Tick or similar if needed */}
            </div>
          </div>

          <div className="flex flex-col items-start gap-1">
            <div className="text-[#222831] text-base font-extrabold font-['PeydaFaNum'] leading-snug">
              {getFullName()}
            </div>
            <div className="text-[#61656B] text-xs font-extrabold font-['PeydaFaNum']">
              {getRoleSchool()}
            </div>
          </div>
        </div>

        {/* Left Side: Actions (Notification/Mail) */}
        <div className="flex items-center gap-3" dir="ltr">
          {/* Mail Icon */}
          <div className="w-[33px] h-[33px] relative bg-transparent rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <Mail className="w-6 h-6 text-[#393E46]" />
          </div>
          {/* Bell Icon */}
          <div
            className="w-[33px] h-[33px] relative bg-transparent rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setShowNotifications(true)}
          >
            <Bell className="w-6 h-6 text-[#393E46]" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          </div>
        </div>
      </div>
      {showStudentPopup && <PopUpStudent onClose={() => setShowStudentPopup(false)} />}
      {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
    </>
  );
}

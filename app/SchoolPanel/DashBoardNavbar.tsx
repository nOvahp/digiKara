'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Bell, Wallet } from 'lucide-react';
import profileImg from '../../public/SchoolAvatar.png';
import Notifications from './Reports/Notifications';

const DashBoardNavbar = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [schoolInfo, setSchoolInfo] = useState<{
    school: string;
    city: string;
    province: string;
  } | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const storedInfo = localStorage.getItem('managerSchoolInfo');
    if (storedInfo) {
      try {
        setSchoolInfo(JSON.parse(storedInfo));
      } catch (e) {
        console.error('Failed to parse school info', e);
      }
    }
  }, []);

  return (
    <div
      className="w-full flex flex-col justify-start items-center inline-flex bg-white pb-3 pt-0"
      dir="ltr"
    >
      {/* Navbar Content */}
      <div className="w-[380px] pt-0 flex justify-between items-center inline-flex">
        {/* Left: Icons */}
        <div className="w-[70px] flex justify-between items-center">
          {/* Notification Icon (Bell) */}
          <div
            onClick={() => setIsNotificationsOpen(true)}
            className="w-[33px] h-[33px] flex justify-center items-center cursor-pointer hover:bg-gray-50 rounded-full transition-colors"
          >
            <Bell className="w-6 h-6 text-[#393E46]" />
          </div>

          {/* Notifications Modal */}
          {isNotificationsOpen && <Notifications onClose={() => setIsNotificationsOpen(false)} />}

          {/* Wallet Icon */}
          <div
            onClick={() => router.push('/SchoolPanel/Wallet')} // Navigate to Wallet Page
            className="w-[33px] h-[33px] flex justify-center items-center cursor-pointer hover:bg-gray-50 rounded-full transition-colors"
          >
            <Wallet className="w-6 h-6 text-[#393E46]" />
          </div>
        </div>

        {/* Right: School Info & Profile */}
        <div className="flex justify-start items-center gap-3">
          <div className="flex flex-col justify-start items-end gap-1 inline-flex">
            <div className="text-right text-[#222831] text-base font-num-medium font-extrabold leading-snug break-word">
              {schoolInfo?.school || 'مدرسه هنرهای زیبا'}
            </div>
            <div className="text-right text-[#61656B] text-xs font-num-medium font-extrabold break-word">
              {schoolInfo ? `${schoolInfo.city}، ${schoolInfo.province}` : 'ابهر، زنجان'}
            </div>
          </div>
          <div className="relative flex justify-start items-end">
            <div className="w-10 h-10 relative">
              <Image
                src={profileImg}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full absolute left-0 top-0 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardNavbar;

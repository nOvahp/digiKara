'use client';

import React, { useState } from 'react';
// import { User, GraduationCap, School, Building2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import headerImg from '../../public/OtpHeader.png';
import Image from 'next/image';
import { LoginHeader } from './login-header';

interface LoginViewProps {
  onNext?: () => void;
}

export function LoginView4({ onNext }: LoginViewProps) {
  const [selectedType, setSelectedType] = useState<string | null>('student'); // Default to first option
  const router = useRouter();

  const accountTypes = [
    {
      id: 'student',
      title: 'دانش آموز',
      subtitle: 'مدارسی های سراسر ایران',
      icon: (
        <Image
          src="/loginAvatar1.png"
          alt="student"
          width={52}
          height={52}
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      id: 'customer',
      title: 'مشتری',
      subtitle: 'ورود به بازارچه و خرید محصولات',
      icon: (
        <Image
          src="/loginAvatar2.png"
          alt="customer"
          width={52}
          height={52}
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      id: 'manager',
      title: 'مدیر مدرسه ',
      subtitle: 'مدیران مدارس و کاربران ارشد',
      icon: (
        <Image
          src="/loginAvatar3.png"
          alt="manager"
          width={52}
          height={52}
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      id: 'supervisor',
      title: 'نهاد ناظر',
      subtitle: 'نهاد های نظارتی و حمایتی',
      icon: (
        <Image
          src="/loginAvatar4.png"
          alt="supervisor"
          width={52}
          height={52}
          className="w-full h-full object-cover"
        />
      ),
    },
  ];

  const handleSelect = () => {
    console.log('Selected Account Type:', selectedType);

    if (selectedType === 'student') {
      router.push('/StudentDashboard');
    } else if (selectedType === 'manager') {
      router.push('/SchoolPanel');
    } else if (selectedType === 'customer') {
      router.push('/Bazzar');
    } else if (selectedType === 'supervisor') {
      alert('در دست ساخت');
    }

    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#F8FAFC]">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Text */}
      <div className="absolute top-[100px] left-0 right-0 px-8 z-10 text-right">
        <h1 className="text-3xl font-black text-[#393E46] mb-2">نوع حساب</h1>
        <p className="text-[#393E46] text-sm font-bold opacity-80 leading-relaxed">
          لطفا نوع کاربری خود را انتخاب کنید
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 px-6 w-full max-w-[440px] mx-auto -mt-20 z-20 pb-28">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/5 p-6 sm:p-8 animate-in slide-in-from-bottom-5 fade-in duration-500 relative pt-8">
          <div className="flex flex-col gap-4">
            {accountTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex justify-between items-center cursor-pointer group p-3 rounded-2xl border transition-all ${
                  selectedType === type.id
                    ? 'bg-[#F3F6FC] border-[#FDD00A] shadow-sm'
                    : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-100'
                }`}
              >
                {/* Radio */}
                <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border-[1.5px] transition-colors ${selectedType === type.id ? 'border-[#FDD00A]' : 'border-[#D1D1D6]'}`}
                  ></div>
                  {selectedType === type.id && (
                    <div className="absolute w-2.5 h-2.5 bg-[#FDD00A] rounded-full"></div>
                  )}
                </div>

                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div className="flex flex-col gap-0.5 text-right">
                    <span className="text-[#393E46] text-sm font-bold">{type.title}</span>
                    <span className="text-[#9CA3AF] text-xs font-medium">{type.subtitle}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {type.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[440px] mx-auto p-6 bg-transparent z-50">
        <button
          onClick={handleSelect}
          className="w-full h-[57px] bg-[#FDD00A] rounded-2xl flex items-center justify-center gap-2 hover:bg-[#e5bc09] transition-colors text-[#1A1C1E] text-lg font-bold shadow-lg shadow-[#FDD00A]/20"
        >
          شروع کنید
        </button>
      </div>
    </div>
  );
}

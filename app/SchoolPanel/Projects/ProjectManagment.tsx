'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus } from 'lucide-react';
import ManagerProductsTable from '../components/ManagerProductsTable';
import ManagerOrdersTable from '../components/ManagerOrdersTable';

const ProjectManagment = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

  return (
    <div
      className="w-full min-h-screen pb-12 pt-5 px-0 flex flex-col justify-start items-center gap-6"
      dir="rtl"
    >
      {/* Hero / Header */}
      <div className="w-full max-w-[1200px] px-4 flex justify-between items-center">
        <h1 className="text-center text-[#0D0D12] text-xl font-semibold leading-[27px]">
          مدیریت حجره ها
        </h1>
        <div
          onClick={() => router.back()}
          className="w-10 h-10 bg-white rounded-full border border-[rgba(8,11,17,0.10)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
        </div>
      </div>
      {/* Add Timche Button */}
      <div
        onClick={() => router.push('/SchoolPanel/Projects/NewProject/Step1')}
        className="w-full px-6 py-2 bg-[#FDD00A] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#e5c109] transition-colors"
      >
        <div className="text-center text-[#1A1C1E] text-[17.58px]  font-semibold leading-[24.61px]">
          افزودن حجره جدید
        </div>
        <Plus className="w-6 h-6 text-[#0A0A0A]" strokeWidth={1.5} />
      </div>

      {/* Main Content Area */}
      <div className="w-full flex flex-col justify-start items-start gap-4">
        {/* Tabs for Table */}
        <div className="w-full h-9 p-[3px] bg-[#F6F6F6] rounded-lg outline outline-1 outline-[#D7D8DA] -outline-offset-1 flex justify-center items-center">
          <div
            onClick={() => setActiveTab('products')}
            className={`flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer transition-all ${activeTab === 'products' ? 'bg-[#F7C61A] shadow-sm outline outline-1 outline-[#D7D8DA] -outline-offset-1 text-[#0A0A0A]' : 'text-[#0A0A0A] hover:bg-white/50'}`}
          >
            <div className="text-center text-sm font-['PeydaWeb'] font-semibold leading-5 break-words">
              محصولات
            </div>
          </div>
          <div
            onClick={() => setActiveTab('orders')}
            className={`flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer transition-all ${activeTab === 'orders' ? 'bg-[#F7C61A] shadow-sm outline outline-1 outline-[#D7D8DA] -outline-offset-1 text-[#0A0A0A]' : 'text-[#0A0A0A] hover:bg-white/50'}`}
          >
            <div className="text-center text-sm font-['PeydaWeb'] font-semibold leading-5 break-words">
              سفارشات
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full">
           {activeTab === 'products' ? <ManagerProductsTable /> : <ManagerOrdersTable />}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagment;

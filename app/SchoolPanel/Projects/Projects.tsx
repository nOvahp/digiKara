'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Briefcase, List } from 'lucide-react';
import ManagerProductsTable from '../components/ManagerProductsTable';
import ManagerOrdersTable from '../components/ManagerOrdersTable';

const toFarsiNumber = (n: number | string | undefined): string => {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

const Projects = () => {
  // Tab State
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

  return (
    <div
      className="w-full min-h-screen  pb-12 pt-5 px-0 flex flex-col justify-start items-center gap-6"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="self-stretch flex flex-col justify-start items-end gap-4">
        <div className="w-full text-right text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-7">
          داشبــــــورد مدیریت پروژه ها
        </div>

        {/* Tabs / Controls */}
        {/* <div className="self-stretch flex flex-col justify-start items-center gap-3">
                     <div onClick={() => router.push('/SchoolPanel/Timche')} className="w-full py-2 px-6 bg-[#FDD00A] rounded-xl flex justify-center items-center gap-2 cursor-pointer shadow-sm">
                        <div className="text-center text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold leading-6">
                            مدیریت تیمچه ها
                        </div>
                    </div>
                    <div onClick={() => router.push('/SchoolPanel/Projects/ProjectManagment')} className="w-full py-2.5 px-6 rounded-xl outline outline-1 outline-[#DFE1E7] -outline-offset-1 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="text-center text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold leading-6">
                            مدیریت حجره ها
                        </div>
                    </div>
                </div> */}
      </div>

      {/* Main Content Area */}
      <div className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
        {/* Cooperation Section */}
        <div className="flex flex-col gap-4 w-full mt-2">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-[#0D0D12] text-md font-semibold">مشارکت فعال با تیمچه های دیگر</h2>
            <span className="text-[#6C7278] text-xs font-semibold cursor-pointer">مشاهده همه</span>
          </div>

          <div className="w-full p-3.5 rounded-xl border border-[#DCE4E8] flex flex-col justify-start items-center gap-3">
            <div className="w-full flex justify-start items-start gap-2.5">
              <Image
                src="/tform.png"
                alt="Project"
                width={96}
                height={96}
                className="p-2.5 rounded-xl"
              />
              <div className="flex-1 flex flex-col justify-start items-start gap-4">
                <div className="w-full flex flex-col justify-start items-start">
                  <div className="w-full text-right flex flex-col justify-center">
                    <div className="text-[#0F172A] text-base font-['PeydaWeb'] font-semibold leading-relaxed tracking-wide break-word">
                      دوخت لباس فرم -{' '}
                      <span className="font-num-medium">{toFarsiNumber(10254)}</span>
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-2.5">
                    <div className="flex-1 rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] flex justify-start items-start gap-2.5">
                      <div className="flex-1 text-right text-[#0F172A] text-xs font-['PeydaWeb'] font-semibold leading-tight tracking-wide break-word">
                        پروژه استانی - استان زنجان
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-start items-center gap-2.5">
                  <div className="flex justify-center items-center gap-1.5">
                    <div className="text-[#0F172A] text-sm font-num-bold  leading-snug tracking-wide break-word">
                      {toFarsiNumber(6)}
                    </div>
                  </div>
                  <div className="rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] flex justify-end items-center gap-2.5">
                    <div className="text-right text-[#0F172A] text-sm font-['PeydaWeb'] font-semibold leading-snug tracking-wide break-word">
                      تعداد مدارس همکار
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full  px-6 py-2 bg-[#F7C61A] rounded-xl flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#e5b818]">
              <div className="text-center text-[#393E46] text-base font-num-medium font-extrabold leading-snug break-word">
                برو به صفحه همکاری
              </div>
            </div>
          </div>
        </div>

        {/* Requests Section */}
        <div className="flex flex-col gap-4 w-full mt-2 relative">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold">
              درخواست همکاری
            </h2>
            <span className="text-[#6C7278] text-xs font-['PeydaWeb'] font-semibold cursor-pointer">
              مشاهده همه
            </span>
          </div>

          {/* Request Item 1 */}
          <div className="w-full h-[61px] py-2 pl-[14px] pr-4 rounded-xl border border-[#DCE4E8] flex justify-start items-center gap-3">
            <div className="relative flex justify-start items-center gap-3">
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-[46.13px] h-[46.13px] bg-[#F8CB2E] rounded-lg" />
              </div>
              <div className="w-6 h-6 left-[11.07px] top-[11.07px] absolute flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex-1 pl-4 flex flex-col justify-center items-end gap-1">
              <div className="w-full text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold break-word">
                درخواست همکاری در دوخت
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="flex justify-start items-center">
                  <div className="text-center text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold break-word">
                    مدرسه فن کاران هیدج
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="w-8 h-8 px-4 py-2 bg-white shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2">
                <div className="w-4 h-4 relative flex items-center justify-center">
                  <List className="w-4 h-4 text-[#818898]" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Request Item 2 */}
          <div className="w-full h-[61px] py-2 pl-[14px] pr-4 rounded-xl border border-[#DCE4E8] flex justify-start items-center gap-3">
            <div className="relative flex justify-start items-center gap-3">
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-[46.13px] h-[46.13px] bg-[#F8CB2E] rounded-lg" />
              </div>
              <div className="w-6 h-6 left-[11.07px] top-[11.07px] absolute flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex-1 pl-4 flex flex-col justify-center items-end gap-1">
              <div className="w-full text-right text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold break-word">
                درخواست همکاری در تولید محتوا
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="flex justify-start items-center">
                  <div className="text-center text-[#818898] text-[10px] font-['PeydaWeb'] font-semibold break-word">
                    مدرسه کارآفرینان ابهر
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="w-8 h-8 px-4 py-2 bg-white shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#DFE1E7] flex justify-center items-center gap-2">
                <div className="w-4 h-4 relative flex items-center justify-center">
                  <List className="w-4 h-4 text-[#818898]" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-[14.39px] top-[35.18px] w-[71px] py-[1px] px-2 bg-[#DDF3EF] rounded-[36px] flex justify-center items-center gap-0.5">
            <div className="text-[#28806F] text-[10px] font-num-medium font-semibold leading-[15px] tracking-wide break-word">
              همکاری فعال
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="self-stretch flex flex-col justify-start items-end gap-3 w-full">
        <div className="self-stretch flex justify-start items-center mb-2">
          <div className="text-center text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
            پروژه ها
          </div>
        </div>

        {/* Tabs for Table */}
        <div className="self-stretch h-9 p-[3px] bg-[#F6F6F6] rounded-lg outline outline-1 outline-[#D7D8DA] -outline-offset-1 flex justify-center items-center">
          <div
            onClick={() => setActiveTab('products')}
            className={`flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer transition-all ${activeTab === 'products' ? 'bg-[#FDD00A] shadow-sm outline outline-1 outline-[#D7D8DA] -outline-offset-1' : 'hover:bg-white/50'}`}
          >
            <div className="text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold leading-5">
              مدیریت محصولات
            </div>
          </div>
          <div
            onClick={() => setActiveTab('orders')}
            className={`flex-1 h-[29px] px-3 py-1 rounded-md flex justify-center items-center gap-2.5 cursor-pointer transition-all ${activeTab === 'orders' ? 'bg-[#FDD00A] shadow-sm outline outline-1 outline-[#D7D8DA] -outline-offset-1' : 'hover:bg-white/50'}`}
          >
            <div className="text-[#0A0A0A] text-sm font-['PeydaWeb'] font-semibold leading-5">
              سفارشات
            </div>
          </div>
        </div>

        {/* Table Container - Manager Products Table */}
        <div className="w-full">
          {activeTab === 'products' ? <ManagerProductsTable /> : <ManagerOrdersTable />}
        </div>
      </div>
    </div>
  );
};

export default Projects;

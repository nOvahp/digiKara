"use client";

import React from 'react';
import { DashboardNavBar } from "../DashboardNavBar";
import { Navigation } from "../Navigation";
import { BasicInfoForm } from "../Sells/components/shared/BasicInfoForm";
import { PricingForm } from "../Sells/components/shared/PricingForm";
import { CategoryTagsForm } from "../Sells/components/shared/CategoryTagsForm";
import { ProductPreviewCard } from "../Sells/components/shared/ProductPreviewCard";

export function EditeProducts() {
    return (
        <div className="w-full min-h-screen bg-transparent flex flex-col relative pb-28" dir="ltr">
             {/* Sticky Navbar */}
             <div className="sticky top-0 z-50 w-full bg-white">
                <DashboardNavBar />
             </div>

             {/* Main Content */}
             <div className="flex-1 w-full flex flex-col items-center gap-6 px-0 py-0" dir="rtl">
                
                {/* Header Section */}
                <div className="w-full flex flex-col gap-4">
                     <div className="w-full text-right text-[#0D0D12] text-xl font-semibold font-['PeydaWeb'] leading-[27px]">
                         ویرایش محصول
                     </div>
                     
                     <div className="w-full flex flex-col gap-3">
                         {/* Save Button (Primary) */}
                         <button className="w-full h-10 bg-[#0A33FF] rounded-lg shadow-sm border border-[#FFD369] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity">
                             <span className="text-white text-sm font-semibold font-['PeydaWeb']">ذخیره محصول</span>
                         </button>
                         {/* Preview Button (Secondary) */}
                         <button className="w-full h-10 bg-white rounded-lg shadow-sm border border-[#DFE1E7] flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors">
                             <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">پیش نمایش محصول</span>
                         </button>
                     </div>
                </div>

                {/* Status Card */}
                <div className="w-full p-5 bg-white rounded-xl border border-[#DFE1E7] flex flex-col gap-5 shadow-[0px_1px_2px_rgba(13,13,18,0.06)]">
                    <div className="w-full flex justify-between items-center">
                        <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] tracking-wide">
                            وضعیت انتشار
                        </div>
                        <div className="bg-[#ECF9F7] px-3 py-1 rounded-2xl flex items-center">
                             <span className="text-[#267666] text-sm font-semibold font-['PeydaWeb']">انتشار عمومی</span>
                        </div>
                    </div>
                </div>

                {/* Shared Forms */}
                <BasicInfoForm />
                <PricingForm />
                <CategoryTagsForm />
                <ProductPreviewCard />

                {/* Final Save Button */}
                <button className="w-full h-10 bg-[#FFD369] rounded-lg shadow-sm border border-[#FFD369] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity">
                     <span className="text-[#393E46] text-sm font-semibold font-['PeydaWeb']">ذخیره محصول</span>
                </button>

             </div>

             {/* Bottom Navigation */}
             <div className="fixed bottom-0 w-full z-40">
                 <Navigation />
             </div>
        </div>
    );
}

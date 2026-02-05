"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/app/StudentDashboard/layout/Navigation';
import { DashboardNavBar } from '@/app/StudentDashboard/layout/DashboardNavBar';
import { Button } from "@/components/ui/button"; 
import { ArrowUpRight } from 'lucide-react';

// We can use string path directly since it is in public
const illustrationPath = "/man bought a lot of gifts at the store.png";

export default function DashboardEmptyPage() {
    const router = useRouter();

    return (
         <div className="w-full min-h-screen bg-white flex flex-col items-center overflow-hidden font-sans pb-20">
             
            {/* Header (Now utilizing the shared component) */}
            <DashboardNavBar />

            {/* Main Content */}
            <div className="flex-1 w-full max-w-md px-4 mt-0 flex flex-col items-center justify-center gap-6">
                
                {/* Illustration Image */}
                <div className="my-4 relative w-[280px] h-[280px]">
                    <Image 
                        src={illustrationPath}
                        alt="Empty State Illustration"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Text */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <h2 className="text-[#0A0A0A] text-lg font-semibold font-['PeydaWeb'] leading-7">
                        شما هنوز حجره ای نساخته اید.
                    </h2>
                    <p className="text-[#737373] text-sm font-light font-['PeydaWeb'] leading-tight max-w-[300px]">
                        برای شروع، یک حجره ایجاد کنید و محصولات خود را برای نمایش به دیگران اضافه کنید.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-4 w-full justify-center">
                     {/* Education Button */}
                    <Button 
                        variant="outline" 
                        className="h-8 px-4 bg-white border-gray-200 text-[#666D80] text-sm font-semibold hover:bg-gray-50 flex items-center gap-2"
                    >
                         <span>آموزش</span>
                          <ArrowUpRight className="w-4 h-4 text-[#737373]" />
                    </Button>

                    {/* Create Shop Button */}
                    <Button 
                        onClick={() => router.push('/StudentDashboard/hojreCreation/step2')}
                        className="h-8 px-4 bg-[#FDD00A] hover:bg-[#eac009] text-[#0A0A0A] text-xs font-semibold shadow-sm border-none"
                    >
                        ساخت حجره جدید
                    </Button>
                </div>
            </div>

            {/* Navigation */}
            <Navigation />
         </div>
    );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Trash2, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AddSharePopup from "./AddSharePopup";
import { toast } from "sonner"; // Assuming sonner is available for toasts

// Mock Initial Data
const initialStaff = [
    { id: 1, name: "فرید سلیمی", code: "0012345678", share: 40, avatar: "/Avatar.png", type: "student" },
    { id: 2, name: "سهند حسینی", code: "0012345678", share: 15, avatar: "/Avatar.png", type: "student" },
    { id: 3, name: "سعید محمدی", code: "0012345678", share: 15, avatar: "/Avatar.png", type: "student" },
];

import { useNewProject } from "../NewProjectContext";

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

const NewProject4Content = () => {
    const router = useRouter();
    const { updateProjectData, projectData, saveProject, resetProjectData } = useNewProject();

    // Initialize state from context if available, else default
    const [schoolShare, setSchoolShare] = useState(projectData.schoolShare || 20);
    const [staffShares, setStaffShares] = useState<any[]>(projectData.staffShares || initialStaff);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Sync local state back to context when changed (optional, but good for backbtn)
    // Minimizing re-renders: only update context on next/finish or major actions?
    // Let's update on Finish mainly, or use useEffect.

    const handleSchoolShareChange = (delta: number) => {
        setSchoolShare(prev => Math.max(0, Math.min(100, prev + delta)));
    };

    const handleStaffShareChange = (id: number, delta: number) => {
        setStaffShares(prev => prev.map(staff =>
            staff.id === id ? { ...staff, share: Math.max(0, Math.min(100, staff.share + delta)) } : staff
        ));
    };

    const handleDeleteStaff = (id: number) => {
        setStaffShares(prev => prev.filter(staff => staff.id !== id));
    };

    const handleAddShare = (data: any) => {
        setStaffShares(prev => {
            const exists = prev.find(s => s.id === data.id);
            if (exists) {
                toast.error("این کاربر قبلاً اضافه شده است.");
                return prev;
            }
            return [...prev, data];
        });
    };

    const handleFinish = () => {
        const totalShare = schoolShare + staffShares.reduce((acc, curr) => acc + curr.share, 0);
        if (totalShare !== 100) {
            toast.error(`مجموع سهام باید ۱۰۰٪ باشد. مجموع فعلی: ${toFarsiNumber(totalShare)}٪`);
            return;
        }

        // Update context with final step data
        updateProjectData({
            schoolShare,
            staffShares
        });

        // Save everything
        // Note: updateProjectData is likely async in React state terms, so better to pass data to saveProject or wait.
        // But our context saveProject uses current projectData. 
        // We should temporarily update context then save.
        // Actually, let's pass the final partial data to saveProject or handle it there.
        // Since `setProjectData` is async, we can't rely on it being updated immediately before `saveProject`.
        // Modification: Let's assume `saveProject` takes optional extra data or we rely on the user having clicked 'Finish' which implies we can pass the final piece.
        // For now, I'll assume we can trigger the save with a slight delay or pass the missing data to saveProject if I modify it.
        // Let's Modify `NewProjectContext.tsx` to accept data in `saveProject`?
        // Or just `setTimeout`? Dirty.
        // Better: Pass the final object to `saveProject`.

        // However, I can't modify Context interface easily in this tool call without viewing it again.
        // I will trust that I can just call updateProjectData, and hope React batches in a way or I will just manually save here using the same logic as Context if needed.
        // Wait, I CAN just implement the save logic right here since I have access to `localStorage` and `projectData`.

        const finalData = { ...projectData, schoolShare, staffShares };
        const existingProjects = JSON.parse(localStorage.getItem("digikara_projects") || "[]");
        const newProject = {
            id: Date.now(),
            productName: finalData.title || "عنوان نامشخص",
            count: finalData.staffCount || 0, // Using staff count as a proxy for "count" or just 0
            deliveryTime: finalData.schedule || "نامشخص",
            price: finalData.estimatedRevenue || "0",
            statusLabel: "در انتظار",
            team: finalData.timche || "نامشخص",
        };
        localStorage.setItem("digikara_projects", JSON.stringify([newProject, ...existingProjects]));

        resetProjectData();
        toast.success("پروژه با موفقیت ایجاد شد");
        router.push('/SchoolPanel/Projects');
    };

    return (
        <div className="w-full min-h-screen pb-24" dir="rtl">
            <AddSharePopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onAdd={handleAddShare}
            />

            {/* Header */}
            <div className="w-full h-16 px-0 flex justify-between items-center bg-white border-b border-[#DFE1E7]">
                <div className="w-10"></div>
                <div className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
                    افزودن پروژه
                </div>
                <div
                    onClick={() => router.back()}
                    className="w-10 h-10 bg-white rounded-full border border-[rgba(8,11,17,0.10)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
                </div>
            </div>

            <div className="w-full max-w-md mx-auto p-0 flex flex-col gap-6">
                {/* Stepper */}
                <div className="w-full py-5 flex items-center gap-4 overflow-x-auto border-b border-[#DFE1E7] no-scrollbar">
                    {/* Step 1: Basic Info (Inactive) */}
                    <div className="flex items-center gap-2.5 flex-shrink-0 opacity-50">
                        <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(1)}</span>
                        </div>
                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">اطلاعات پایه</span>
                    </div>

                    <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                    {/* Step 2: Resources (Inactive) */}
                    <div className="flex items-center gap-2.5 flex-shrink-0 opacity-50">
                        <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(2)}</span>
                        </div>
                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">منابع</span>
                    </div>

                    <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                    {/* Step 3: Financial (Inactive) */}
                    <div className="flex items-center gap-2.5 opacity-50 flex-shrink-0">
                        <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(3)}</span>
                        </div>
                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">مالی</span>
                    </div>

                    <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                    {/* Step 4: Sharing (Active) */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                        <div className="w-6 h-6 bg-[#FDD00A] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(4)}</span>
                        </div>
                        <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">تسهیم</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6 px-0">
                    <div className="w-full text-right text-[#0D0D12] text-base font-semibold font-['PeydaWeb']">
                        جدول تسهیم درآمد
                    </div>

                    {/* School Share */}
                    <div className="w-full h-[60px] p-3.5 bg-white rounded-xl border border-[#DCE4E8] flex justify-between items-center">
                        <div className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
                            سهم مدرسه 
                        </div>

                        {/* Counter */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleSchoolShareChange(5)}
                                className="w-8 h-8 flex items-center justify-center bg-white border border-[#E5E5E5] rounded-lg text-[#0D0D12] hover:bg-gray-50"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                            <div className="w-10 text-center text-[#0D0D12] text-sm font-semibold font-num-medium">
                                {toFarsiNumber(schoolShare)}
                            </div>
                            <button
                                onClick={() => handleSchoolShareChange(-5)}
                                className="w-8 h-8 flex items-center justify-center bg-white border border-[#E5E5E5] rounded-lg text-[#0D0D12] hover:bg-gray-50"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Educational Staff Share Content */}
                    <div className="flex flex-col gap-4">
                        <div className="w-full text-right text-[#0D0D12] text-base font-semibold font-['PeydaWeb']">
                            سهم نیروهای آموزشی
                        </div>

                        {/* List of Staff */}
                        {staffShares.map((staff) => (
                            <div key={staff.id} className="w-full p-2.5 bg-white rounded-xl border border-[#DCE4E8] flex justify-between items-center">
                                {/* Left: Actions (Counter + Delete) */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleDeleteStaff(staff.id)}
                                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#E5E5E5] text-[#FF3B30] hover:bg-red-50"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>

                                    <div className="h-9 flex items-center border border-[#E5E5E5] rounded-lg">
                                        <button
                                            onClick={() => handleStaffShareChange(staff.id, 5)}
                                            className="w-8 flex items-center justify-center text-[#0D0D12] h-full"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                        <div className="w-8 h-full flex items-center justify-center border-x border-[#E5E5E5] text-[#0D0D12] text-sm font-semibold font-num-medium bg-[#F6F8FA]">
                                            {toFarsiNumber(staff.share)}
                                        </div>
                                        <button
                                            onClick={() => handleStaffShareChange(staff.id, -5)}
                                            className="w-8 flex items-center justify-center text-[#0D0D12] h-full"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Right: Info (Avatar + Name) */}
                                <div className="flex items-center gap-3 text-right">
                                    <div className="flex flex-col">
                                        <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">
                                            {staff.name}
                                        </div>
                                        <div className="text-[#818898] text-[10px] font-semibold font-num-medium">
                                            {toFarsiNumber(staff.code)}
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 relative">
                                        <Image
                                            src={staff.avatar}
                                            alt={staff.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="w-full h-[57px] rounded-xl border border-dashed border-[#0D0D12] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                        <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">
                            افزودن افراد یا حجره
                        </span>
                        <div className="w-6 h-6 border-[1.5px] border-[#1A1C1E] rounded-full flex items-center justify-center">
                            <Plus className="w-4 h-4 text-[#1A1C1E]" />
                        </div>
                    </button>

                </div>

                {/* Continue/Finish Button */}
                <div className="w-full pb-5 px-0 flex justify-end items-center gap-3.5 mt-4">
                    <button
                        onClick={handleFinish}
                        className="flex-1 h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2.5 hover:bg-[#e5c109] transition-colors"
                    >
                        <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">پایان</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProject4Content;

"use client";

import React, { useRef, useEffect, useState } from "react";
import { X, User, School, GraduationCap, Briefcase, Clock, FileText, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";
import { managerService } from "@/app/services/manager/managerService";

interface HojreRequestPopupProps {
    requestId: number;
    onClose: () => void;
    onApprove?: () => void;
}

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

// Reusable Info Field Component
const InfoField = ({ label, value, icon: Icon, className }: { label: string, value?: string, icon: any, className?: string }) => (
  <div className={`w-full ${className}`}>
    {/* Label with line connector */}
    <div className="flex justify-start items-center mb-[-12px] pr-4 relative z-10">
      <span className="bg-white px-2 text-[#ACB5BB] text-xs font-bold font-peyda">{label}</span>
    </div>
    
    {/* Value Container */}
    <div className="w-full min-h-[3.5rem] h-auto py-2 border border-[#DCE4E8] rounded-3xl flex items-center justify-start gap-3 px-4 bg-white relative">
      <Icon className="w-5 h-5 text-[#DCE4E8] stroke-[1.5] shrink-0" />
      <span className="text-[#393E46] text-sm font-bold flex-1 text-right break-words leading-relaxed" dir="auto">
        {value || "---"}
      </span>
    </div>
  </div>
);

const HojreRequestPopup = ({ requestId, onClose, onApprove }: HojreRequestPopupProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isApproving, setIsApproving] = useState(false);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
             document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await managerService.getStudentRequestById(requestId);
                if (response.success && response.data) {
                    setData(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch request details", error);
            } finally {
                setLoading(false);
            }
        };

        if (requestId) {
            fetchData();
        }
    }, [requestId]);

    const handleApprove = async () => {
        if (!data || data.approved) return;
        
        setIsApproving(true);
        try {
            const response = await managerService.approveStudentRequest(requestId);
            if (response.success) {
                // Update local state to reflect change immediately
                setData((prev: any) => ({ ...prev, approved: true }));
                if (onApprove) onApprove();
            }
        } catch (error) {
            console.error("Failed to approve request", error);
        } finally {
            setIsApproving(false);
        }
    };

    if (!requestId) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" dir="rtl">
            <div 
                ref={modalRef}
                className="w-full max-w-[440px] h-[90vh] bg-white rounded-3xl overflow-hidden flex flex-col relative shadow-xl animate-in fade-in zoom-in duration-200"
            >
                {/* Top Background Gradient */}
                <div className="absolute top-0 left-0 right-0 h-[180px] bg-[linear-gradient(180deg,#F7C309_0%,white_100%)] z-0 pointer-events-none" />

                {/* Header */}
                <div className="relative z-10 w-full px-6 pt-4 pb-2 shrink-0">
                     <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white/80 transition-all text-[#393E46] z-20"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {loading ? (
                         <div className="h-20 flex items-center justify-center text-gray-500 font-bold">در حال بارگذاری...</div>
                    ) : data ? (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 relative bg-white rounded-2xl shadow-lg border-2 border-white overflow-hidden shrink-0">
                                {data.model_data.logo ? (
                                    <Image src={`https://digikara.back.adiaweb.dev/storage/${data.model_data.logo}`} alt={data.model_data.name} fill className="object-cover" unoptimized />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <School className="w-8 h-8" />
                                    </div>
                                )}
                            </div>
                            <div className="text-center space-y-1">
                                <h2 className="text-[#393E46] text-xl font-black">{data.model_data.name}</h2>
                                <p className="text-[#393E46] text-sm font-semibold opacity-70">{data.model_type}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-20 flex items-center justify-center text-red-500">خطا در دریافت اطلاعات</div>
                    )}
                </div>

                {/* Scrollable Content */}
                <div className="relative z-10 flex-1 w-full overflow-y-auto px-6 py-4 no-scrollbar">
                     {data && (
                        <div className="space-y-6 pt-2 pb-20">
                            <InfoField 
                                label="نام دانش‌آموز" 
                                value={`${data.firstname} ${data.lastname}`}
                                icon={User} 
                            />
                            <InfoField 
                                label="مدرسه" 
                                value={data.school_name}
                                icon={School} 
                            />
                            <InfoField 
                                label="پایه / رشته" 
                                value={`${data.grade} - ${data.field}`}
                                icon={GraduationCap} 
                            />
                            <InfoField 
                                label="مهارت" 
                                value={data.model_data.skill}
                                icon={Briefcase} 
                            />
                            <InfoField 
                                label="تجربه (ماه/سال)" 
                                value={toFarsiNumber(data.model_data.experience)}
                                icon={Clock} 
                            />
                            
                            {/* Description - Custom multiline */}
                            <div className="w-full">
                                <div className="flex justify-start items-center mb-[-12px] pr-4 relative z-10">
                                <span className="bg-white px-2 text-[#ACB5BB] text-xs font-bold font-peyda">توضیحات</span>
                                </div>
                                <div className="w-full min-h-[100px] border border-[#DCE4E8] rounded-3xl p-4 bg-white relative flex gap-3">
                                <FileText className="w-5 h-5 text-[#DCE4E8] stroke-[1.5] shrink-0 mt-1" />
                                <p className="text-[#393E46] text-sm font-medium leading-relaxed text-right flex-1 whitespace-pre-wrap break-all">
                                    {data.model_data.description}
                                </p>
                                </div>
                            </div>

                             {/* Status */}
                             <div className="w-full">
                                <div className="flex justify-start items-center mb-[-12px] pr-4 relative z-10">
                                <span className="bg-white px-2 text-[#ACB5BB] text-xs font-bold font-peyda">وضعیت</span>
                                </div>
                                <div className={`w-full h-14 border border-[#DCE4E8] rounded-full flex items-center justify-between px-5 bg-white relative ${data.approved ? "bg-[#ECF9F7]/30" : "bg-[#FFF4E5]/30"}`}>
                                    {data.approved ? (
                                        <CheckCircle className="w-5 h-5 text-[#267666] stroke-[1.5]" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-[#B98900] stroke-[1.5]" />
                                    )}
                                    <span className={`text-sm font-bold truncate flex-1 text-right ${data.approved ? "text-[#267666]" : "text-[#B98900]"}`}>
                                        {data.approved ? "تایید شده" : "در انتظار تایید"}
                                    </span>
                                </div>
                            </div>

                        </div>
                     )}
                </div>

                {/* Bottom Fixed Button */}
                {data && !data.approved && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-sm z-50 border-t border-gray-100/50">
                        <button
                            onClick={handleApprove}
                            disabled={isApproving}
                            className={`w-full bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] font-bold h-14 rounded-2xl text-lg shadow-lg shadow-[#FDD00A]/20 transition-all flex items-center justify-center gap-2 ${isApproving ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {isApproving ? "در حال تایید..." : "تایید درخواست"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HojreRequestPopup;



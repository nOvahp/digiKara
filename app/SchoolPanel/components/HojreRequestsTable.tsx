"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { managerService } from "@/app/services/manager/managerService";
import HojreRequestPopup from "./HojreRequestPopup";

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
};

interface StudentRequest {
    id: number;
    user_id: number;
    school_id: number;
    model_type: string;
    model_data: {
        logo?: string;
        name: string;
        image: any[];
        skill: string;
        user_id: number;
        school_id: number;
        experience: string;
        description: string;
    };
    created_at: string;
    approved: boolean;
    firstname: string;
    lastname: string;
    school_name: string;
    field: string;
    grade: string;
}

const HojreRequestsTable = () => {
    const [requests, setRequests] = useState<StudentRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await managerService.getStudentRequests();
            if (response.success && response.data) {
                setRequests(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleApprove = async (e: React.MouseEvent, req: StudentRequest) => {
        e.stopPropagation(); // Prevent row click
        if (req.approved) return;

        try {
            const response = await managerService.approveStudentRequest(req.id);
            if (response.success) {
                // Refresh list
                fetchRequests();
            }
        } catch (error) {
            console.error("Failed to approve request", error);
        }
    };

    if (loading) return <div className="w-full h-20 flex justify-center items-center text-sm text-[#666D80]">در حال بارگذاری...</div>;

    if (requests.length === 0) return <div className="w-full h-20 flex justify-center items-center text-sm text-[#666D80]">موردی یافت نشد.</div>;

    return (
        <div className="w-full bg-white shadow-[0px_2px_4px_-1px_rgba(13,13,18,0.06)] rounded-xl outline outline-1 outline-[#DFE1E7] flex flex-col justify-start items-end overflow-hidden mb-6" dir="rtl">
             {/* Header */}
             <div className="w-full h-16 px-5 py-2 border-b border-[#DFE1E7] flex justify-between items-center bg-white">
                 <div className="text-[#0D0D12] text-16 font-['PeydaWeb'] font-semibold leading-24 tracking-wide">درخواست‌های ایجاد حجره</div>
             </div>

             {/* Table */}
             <div className="w-full overflow-x-auto no-scrollbar">
                 <div className="min-w-[1000px] flex flex-col">
                     
                     {/* Table Header */}
                     <div className="w-full bg-[#F6F8FA] border-b border-[#DFE1E7] flex justify-start items-center px-2">
                        <div className="w-14 h-10 px-3 flex justify-center items-center">
                            <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">#</div>
                        </div>
                        <div className="flex-[2] min-w-[200px] h-10 px-3 flex justify-start items-center">
                            <div className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">اطلاعات حجره</div>
                        </div>
                        <div className="flex-1 min-w-[150px] h-10 px-3 flex justify-start items-center">
                            <div className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">مدرسه / پایه</div>
                        </div>
                        <div className="w-[130px] h-10 px-3 flex justify-center items-center">
                            <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">تاریخ درخواست</div>
                        </div>
                        <div className="w-[110px] h-10 px-3 flex justify-center items-center">
                            <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">وضعیت</div>
                        </div>
                        <div className="w-[140px] h-10 px-3 flex justify-center items-center">
                            <div className="text-center text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">عملیات</div>
                        </div>
                     </div>

                     {/* Table Body */}
                     {requests.map((req, idx) => {
                        const itemIndex = idx + 1;
                        // Status logic
                        const isApproved = req.approved;
                        const statusBg = isApproved ? "#ECF9F7" : "#FFF4E5"; // Greenish for approved, Orangeish for pending
                        const statusColor = isApproved ? "#267666" : "#B98900"; 
                        const statusLabel = isApproved ? "تایید شده" : "در انتظار تایید";

                        return (
                         <div 
                            key={req.id} 
                            onClick={() => setSelectedRequestId(req.id)}
                            className="w-full h-16 border-b border-[#DFE1E7] flex justify-start items-center px-2 hover:bg-gray-50 transition-colors group cursor-pointer"
                         >
                            
                            {/* Index */}
                            <div className="w-14 h-16 px-3 flex justify-center items-center">
                                <span className="text-center text-[#0D0D12] text-sm font-num-medium font-semibold">{toFarsiNumber(itemIndex)}</span>
                            </div>

                            {/* Hojre Info */}
                            <div className="flex-[2] min-w-[200px] h-16 px-3 flex justify-start items-center gap-3">
                                <div className="w-10 h-10 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {req.model_data.logo ? (
                                        <Image src={`https://digikara.back.adiaweb.dev/storage/${req.model_data.logo}`} alt={req.model_data.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Logo</div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-0.5 max-w-[calc(100%-3rem)]">
                                    <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold truncate">
                                        {req.model_data.name}
                                    </span>
                                    <span className="text-[#666D80] text-xs font-['PeydaWeb'] truncate">
                                        {req.firstname} {req.lastname}
                                    </span>
                                </div>
                            </div>

                            {/* School Info */}
                            <div className="flex-1 min-w-[150px] h-16 px-3 flex flex-col justify-center items-start gap-0.5">
                                <span className="text-[#0D0D12] text-sm font-['PeydaWeb'] font-semibold truncate max-w-full">
                                    {req.school_name}
                                </span>
                                <span className="text-[#666D80] text-xs font-['PeydaWeb'] truncate max-w-full">
                                    {req.grade} - {req.field}
                                </span>
                            </div>

                            {/* Date */}
                            <div className="w-[130px] h-16 px-3 flex justify-center items-center">
                                <span className="text-[#0D0D12] text-sm font-num-medium font-semibold" dir="ltr">
                                    {toFarsiNumber(new Date(req.created_at).toLocaleDateString('fa-IR'))}
                                </span>
                            </div>

                            {/* Status */}
                            <div className="w-[110px] h-16 px-3 flex justify-center items-center">
                                <div className="px-2 py-0.5 rounded-2xl flex justify-center items-center" style={{ backgroundColor: statusBg }}>
                                    <span className="text-[12px] font-num-medium whitespace-nowrap" style={{ color: statusColor }}>{statusLabel}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="w-[140px] h-16 px-3 flex justify-center items-center gap-2">
                                {!isApproved ? (
                                    <button 
                                        onClick={(e) => handleApprove(e, req)}
                                        className="h-8 px-4 bg-[#0A33FF] hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-colors"
                                    >
                                        تایید درخواست
                                    </button>
                                ) : (
                                    <span className="text-gray-400 text-xs">---</span>
                                )}
                            </div>
                         </div>
                        );
                     })}
                 </div>
             </div>


             {/* Popup */}
             {selectedRequestId && (
                 <HojreRequestPopup 
                    requestId={selectedRequestId} 
                    onClose={() => setSelectedRequestId(null)} 
                    onApprove={() => {
                        fetchRequests();
                    }}
                 />
             )}
        </div>
    );
};

export default HojreRequestsTable;

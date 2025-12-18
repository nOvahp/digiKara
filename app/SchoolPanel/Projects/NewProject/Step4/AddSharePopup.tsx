"use client";

import React, { useState } from "react";
import { Plus, Minus, X, User, Users, Store } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddSharePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: any) => void;
}

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

const AddSharePopup = ({ isOpen, onClose, onAdd }: AddSharePopupProps) => {
    const [userType, setUserType] = useState<"student" | "booth">("student");
    const [sharePercent, setSharePercent] = useState(20);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-[380px] bg-white rounded-2xl flex flex-col overflow-hidden max-h-[90vh]">
                
                 {/* Header */}
                <div className="w-full h-16 px-5 flex justify-between items-center border-b border-[#DFE1E7]">
                    <div 
                        onClick={onClose}
                        className="w-10 h-10 rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    >
                        <X className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
                    </div>
                    <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb']">
                        افزودن افراد یا حجره
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-4 overflow-y-auto">
                    
                    {/* User Type */}
                    <div className="flex flex-col gap-2">
                         <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
                             نوع کاربر
                         </div>
                         <div className="w-full h-8 bg-white border border-[#E5E5E5] rounded-lg flex items-center p-1">
                             <div 
                                onClick={() => setUserType("booth")}
                                className={cn(
                                    "flex-1 h-full rounded flex items-center justify-center gap-2 cursor-pointer transition-colors",
                                    userType === "booth" ? "bg-[#FDD00A] text-[#0D0D12]" : "bg-transparent text-[#666D80]"
                                )}
                             >
                                 <span className="text-sm font-semibold font-['PeydaWeb']">حجره</span>
                                 <Store className="w-4 h-4" />
                             </div>
                             <div className="w-[1px] h-4 bg-[#E5E5E5] mx-1"></div>
                             <div 
                                onClick={() => setUserType("student")}
                                className={cn(
                                    "flex-1 h-full rounded flex items-center justify-center gap-2 cursor-pointer transition-colors",
                                    userType === "student" ? "bg-[#FDD00A] text-[#0D0D12]" : "bg-transparent text-[#666D80]"
                                )}
                             >
                                 <span className="text-sm font-semibold font-['PeydaWeb']">هنرجو</span>
                                 <User className="w-4 h-4" />
                             </div>
                         </div>
                    </div>

                    {/* User Selection */}
                    <div className="flex flex-col gap-2">
                        <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
                            انتخاب کاربر
                        </div>
                        <div className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center gap-2">
                            {/* Search Icon */}
                             <div className="w-5 h-5 relative">
                                 <div className="absolute inset-0 border border-[#666D80] rounded-full opacity-50 transform scale-75"></div>
                                 <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#666D80] rounded-full opacity-50 transform translate-x-0.5 translate-y-0.5"></div>
                                 {/* Simple search icon check */}
                                 <svg className="w-5 h-5 text-[#666D80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                     <circle cx="11" cy="11" r="8" />
                                     <path d="M21 21l-4.35-4.35" />
                                 </svg>
                             </div>
                             <input 
                                type="text"
                                className="flex-1 h-full border-none outline-none text-[#0D0D12] text-sm font-['PeydaWeb'] text-right placeholder-[#666D80]"
                                placeholder="نام کاربر را وارد کنید ..."
                             />
                        </div>
                    </div>

                    {/* Wallet Number */}
                    <div className="flex flex-col gap-2">
                        <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
                            شماره کیف پول
                        </div>
                        <div className="w-full h-[52px] px-4 bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-center">
                             <span className="text-[#666D80] text-sm font-light font-['PeydaWeb'] tracking-wider">
                                 ZA-AB-9443-1245
                             </span>
                        </div>
                    </div>

                    {/* User Share Counter */}
                    <div className="flex flex-col gap-2">
                        <div className="text-right text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
                            سهم کاربر
                        </div>
                        <div className="w-full h-[60px] p-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-between">
                             {/* Counter */}
                             <div className="h-9 flex items-center border border-[#E5E5E5] rounded-lg">
                                <button 
                                    onClick={() => setSharePercent(p => Math.min(100, p + 5))}
                                    className="w-10 flex items-center justify-center text-[#0D0D12] h-full hover:bg-gray-50"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <div className="w-10 h-full flex items-center justify-center border-x border-[#E5E5E5] text-[#0D0D12] text-sm font-semibold font-num-medium bg-[#F6F8FA]">
                                    {toFarsiNumber(sharePercent)}
                                </div>
                                <button 
                                     onClick={() => setSharePercent(p => Math.max(0, p - 5))}
                                    className="w-10 flex items-center justify-center text-[#0D0D12] h-full hover:bg-gray-50"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                            </div>
                            
                             <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">
                                 سهم کاربر
                             </span>
                        </div>
                    </div>

                    {/* Add Button */}
                    <button 
                        onClick={() => {
                            onAdd({ type: userType, share: sharePercent });
                            onClose();
                        }}
                        className="w-full h-[57px] mt-4 bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5c109] transition-colors"
                    >
                         <span className="text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">
                             افزودن
                         </span>
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default AddSharePopup;

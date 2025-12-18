"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wallet, CreditCard, ChevronDown, ChevronUp, Circle, CheckCircle2, Landmark } from "lucide-react";
import { useCart } from "@/app/Bazzar/CartContext";

export default function PaymentMethodPage() {
    const router = useRouter();
    const { finalPrice } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<"spot" | "online">("online");
    const [selectedBank, setSelectedBank] = useState<string>("saman");

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center relative" dir="rtl">
            
            {/* Header */}
            <div className="w-full max-w-[440px] flex justify-between items-center px-0 py-4 shrink-0">
                 <div className="flex items-center justify-between w-full relative">
                     <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">روش های پرداخت</span>
                     <button 
                        onClick={() => router.back()}
                        className="absolute left-0 w-10 h-10 rounded-full border border-[rgba(0,0,0,0.10)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                     >
                         <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
                     </button>
                 </div>
            </div>

            <div className="w-full max-w-[440px] flex flex-col gap-6 px-0 pb-24 flex-1 overflow-y-auto no-scrollbar">
                
                {/* Cost Summary */}
                <div className="w-full bg-white rounded-lg border border-[#DFE1E7] p-5 flex flex-col gap-5 mt-4">
                    <div className="flex justify-between items-center w-full">
                         <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-light">هزینه نهایی</span>
                         <span className="text-[#0C1415] text-sm font-num-medium ">
                             {finalPrice.toLocaleString()} ریال
                         </span>
                        
                    </div>
                </div>

                {/* Payment Options */}
                <div className="w-full flex flex-col gap-4">
                    
                    {/* Pay on Spot */}
                    <div 
                        onClick={() => setPaymentMethod("spot")}
                        className={`w-full p-3 bg-white rounded-lg border cursor-pointer transition-all ${
                            paymentMethod === "spot" 
                                ? "border-[#0C1415] shadow-sm" 
                                : "border-[#E5E7EB] hover:border-gray-300"
                        }`}
                    >
                         <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Wallet className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                                <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">پرداخت در محل</span>
                            </div>
                            <div className="shrink-0">
                                {paymentMethod === "spot" ? (
                                    <div className="relative">
                                        <Circle className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-[#0C1415] rounded-full" />
                                        </div>
                                    </div>
                                ) : (
                                    <Circle className="w-6 h-6 text-[#D1D1D6]" strokeWidth={1.5} />
                                )}
                            </div>
                         </div>
                    </div>

                    {/* Online Payment */}
                    <div 
                        onClick={() => setPaymentMethod("online")}
                        className={`w-full p-3 bg-white rounded-lg border cursor-pointer transition-all ${
                            paymentMethod === "online" 
                                ? "border-[#0C1415] shadow-sm" 
                                : "border-[#E5E7EB] hover:border-gray-300"
                        }`}
                    >
                         <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                                <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">پرداخت آنلاین (کارت اعتباری)</span>
                            </div>
                            <div className="shrink-0">
                                {paymentMethod === "online" ? (
                                    <div className="relative">
                                        <Circle className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-[#0C1415] rounded-full" />
                                        </div>
                                    </div>
                                ) : (
                                    <Circle className="w-6 h-6 text-[#D1D1D6]" strokeWidth={1.5} />
                                )}
                            </div>
                         </div>
                    </div>

                </div>

                {/* Bank Gateways (Only if online selected) */}
                {paymentMethod === "online" && (
                     <div className="w-full flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                         <h3 className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold mb-2">درگاه های پرداخت</h3>
                         
                         <div className="w-full bg-white rounded-lg border border-[#E5E7EB] p-3 flex flex-col shadow-[0px_3px_24px_rgba(0,0,0,0.03)]">
                             
                             {/* Saman */}
                             <div 
                                onClick={() => setSelectedBank("saman")}
                                className="w-full flex justify-between items-center py-4 cursor-pointer border-b border-[#E5E7EB] last:border-0"
                             >
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                                         <Landmark className="w-4 h-4 text-blue-600" />
                                     </div>
                                     <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">درگاه بانک سامان</span>
                                 </div>
                                 <div className="shrink-0">
                                     {selectedBank === "saman" ? (
                                        <div className="relative">
                                            <Circle className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-3 h-3 bg-[#0C1415] rounded-full" />
                                            </div>
                                        </div>
                                     ) : (
                                         <Circle className="w-6 h-6 text-[#D1D1D6]" strokeWidth={1.5} />
                                     )}
                                 </div>
                             </div>

                             {/* Mellat */}
                             <div 
                                onClick={() => setSelectedBank("mellat")}
                                className="w-full flex justify-between items-center py-4 cursor-pointer border-b border-[#E5E7EB] last:border-0"
                             >
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                                         <Landmark className="w-4 h-4 text-red-600" />
                                     </div>
                                     <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">درگاه بانک ملت</span>
                                 </div>
                                 <div className="shrink-0">
                                     {selectedBank === "mellat" ? (
                                        <div className="relative">
                                            <Circle className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-3 h-3 bg-[#0C1415] rounded-full" />
                                            </div>
                                        </div>
                                     ) : (
                                         <Circle className="w-6 h-6 text-[#D1D1D6]" strokeWidth={1.5} />
                                     )}
                                 </div>
                             </div>

                             {/* Pasargad */}
                             <div 
                                onClick={() => setSelectedBank("pasargad")}
                                className="w-full flex justify-between items-center py-4 cursor-pointer"
                             >
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center">
                                         <Landmark className="w-4 h-4 text-yellow-600" />
                                     </div>
                                     <span className="text-[#707F81] text-sm font-['PeydaWeb'] font-semibold">درگاه بانک پاسارگاد</span>
                                 </div>
                                 <div className="shrink-0">
                                     {selectedBank === "pasargad" ? (
                                        <div className="relative">
                                            <Circle className="w-6 h-6 text-[#0C1415]" strokeWidth={1.5} />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-3 h-3 bg-[#0C1415] rounded-full" />
                                            </div>
                                        </div>
                                     ) : (
                                         <Circle className="w-6 h-6 text-[#D1D1D6]" strokeWidth={1.5} />
                                     )}
                                 </div>
                             </div>

                         </div>
                     </div>
                )}


            </div>

            {/* Bottom Bar */}
             <div className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-[440px] mx-auto p-6 bg-transparent">
                 <div className="w-full  rounded-2xl  p-3">
                    <button 
                        onClick={() => router.push('/Bazzar/DigiKaraCart/Transition')}
                        className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#e5bc09] transition-colors shadow-sm"
                    >
                        <span className="text-[#1A1C1E] text-[17px] font-['PeydaWeb'] font-semibold">
                            پرداخت
                        </span>
                    </button>
                 </div>
             </div>

        </div>
    );
}

"use client";

import React, { useRef, useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info, Clock, User, Phone, MapPin } from "lucide-react";
import { managerService } from "@/app/services/manager/managerService";

interface ManagerOrderPopupProps {
    onClose: () => void;
    orderId: number | string;
    onUpdate?: () => void;
}

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

const formatPrice = (price: string | number) => {
    if (!price) return '۰';
    return toFarsiNumber(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

const ManagerOrderPopup = ({ onClose, orderId, onUpdate }: ManagerOrderPopupProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch order details
    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) return;
            setIsLoading(true);
            try {
                const response = await managerService.getManagerOrderById(orderId);
                if (response.success && response.data) {
                    setOrder(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch order details", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

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

    const handleStatusUpdate = async (newStatus: string) => {
        if (!order) return;
        
        setIsUpdating(true);
        try {
            // Adjust payload based on actual API requirement. Assuming simple status object for now.
            const response = await managerService.updateManagerOrder(orderId, { status: newStatus });
            if (response.success) {
                setOrder((prev: any) => ({ ...prev, status: newStatus }));
                if (onUpdate) onUpdate();
            }
        } catch (error) {
            console.error("Failed to update order status", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (!order && !isLoading) return null;

    const { 
        product, 
        user, 
        address,
        status,
        quantity,
        total_price,
        created_at 
    } = order || {};

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" dir="rtl">
            <div 
                ref={modalRef}
                className="w-full max-w-[480px] h-[90vh] bg-white rounded-xl border border-[#DFE1E7] overflow-y-auto flex flex-col justify-start items-start gap-5 p-5 relative shadow-lg animate-in fade-in zoom-in duration-200"
            >
                {/* Close Button */}
                 <button 
                    onClick={onClose}
                    className="absolute top-4 left-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-20"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Title */}
                <div className="self-stretch text-right mt-2 flex flex-col items-start gap-1">
                    <span className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
                        جزئیات سفارش
                    </span>
                    <span className="text-[#666D80] text-sm font-num-medium">
                        کد سفارش: {toFarsiNumber(orderId)}
                    </span>
                </div>

                {isLoading ? (
                    <div className="flex-1 w-full flex items-center justify-center">
                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A33FF]"></div>
                    </div>
                ) : (
                <div className="self-stretch flex-col justify-start items-end gap-4 flex w-full flex-1 overflow-y-auto no-scrollbar pb-20">
                    
                    {/* Product Info */}
                    <div className="w-full p-4 rounded-xl border border-[#DFE1E7] flex justify-start items-start gap-4">
                        {product?.image_path ? (
                             <img 
                                src={`https://digikara.back.adiaweb.dev/storage/${product.image_path}`} 
                                alt={product.title} 
                                className="w-20 h-20 rounded-lg object-cover border border-[#DFE1E7]"
                            />
                        ) : (
                             <div className="w-20 h-20 rounded-lg bg-gray-50 border border-[#DFE1E7] flex items-center justify-center">
                                <Info className="w-6 h-6 text-gray-300" />
                             </div>
                        )}
                        <div className="flex-1 flex flex-col gap-2">
                             <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] line-clamp-2">
                                {product?.title || 'محصول نامشخص'}
                             </div>
                             <div className="flex items-center gap-3 text-xs text-[#666D80]">
                                 <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                    تعداد: {toFarsiNumber(quantity)}
                                 </span>
                                 <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                    قیمت کل: {formatPrice(total_price)} ریال
                                 </span>
                             </div>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="self-stretch flex-col gap-3 flex w-full">
                        <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-600" />
                            اطلاعات مشتری
                        </div>
                        <div className="w-full p-4 rounded-xl bg-[#F9FAFB] border border-[#DFE1E7] flex flex-col gap-3">
                             <div className="flex justify-between items-center text-sm">
                                <span className="text-[#666D80]">نام مشتری:</span>
                                <span className="text-[#0D0D12] font-medium">{user?.firstname} {user?.lastname}</span>
                             </div>
                             <div className="flex justify-between items-center text-sm">
                                <span className="text-[#666D80]">شماره تماس:</span>
                                <span className="text-[#0D0D12] font-num-medium">{toFarsiNumber(user?.phone)}</span>
                             </div>
                             {address && (
                                <div className="flex flex-col gap-1 text-sm border-t border-gray-200 pt-2 mt-1">
                                    <span className="text-[#666D80] flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> آدرس:
                                    </span>
                                    <span className="text-[#0D0D12] leading-relaxed">{address}</span>
                                </div>
                             )}
                        </div>
                    </div>

                    {/* Order Status */}
                    <div className="self-stretch flex-col gap-3 flex w-full">
                         <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-500" />
                            وضعیت سفارش
                        </div>
                         
                         {/* Status Selector */}
                         <div className="w-full grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleStatusUpdate('pending')}
                                disabled={isUpdating}
                                className={`h-10 rounded-lg text-sm font-medium transition-all ${
                                    status === 'pending' || status === 'در انتظار ارسال'
                                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                در انتظار
                            </button>
                            <button
                                onClick={() => handleStatusUpdate('sent')}
                                disabled={isUpdating}
                                className={`h-10 rounded-lg text-sm font-medium transition-all ${
                                    status === 'sent' || status === 'ارسال شده' || status === 'delivered'
                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                تکمیل شده
                            </button>
                         </div>
                    </div>

                </div>
                )}
            </div>
        </div>
    );
};

export default ManagerOrderPopup;

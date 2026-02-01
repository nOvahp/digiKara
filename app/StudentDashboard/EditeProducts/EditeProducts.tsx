"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardNavBar } from "../DashboardNavBar";
import { Navigation } from "../Navigation";
import { BasicInfoForm } from "../Sells/components/shared/BasicInfoForm";
import { PricingForm } from "../Sells/components/shared/PricingForm";
import { CategoryTagsForm } from "../Sells/components/shared/CategoryTagsForm";
import { ProductPreviewCard } from "../Sells/components/shared/ProductPreviewCard";
import { NewProductPage6 } from "../Sells/components/NewProductPage6";
import { studentProductService } from '@/app/services/studentProductService';
import { Skeleton } from "@/app/components/Skeleton";
import { ConfirmModal } from '@/app/components/ConfirmModal';
import { SuccessModal } from '@/app/components/SuccessModal';
import { PriceListEditor } from './components/PriceListEditor';

export function EditeProducts() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    
    // Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const [fetchedCategories, setFetchedCategories] = useState<{id: number | string, name: string}[]>([]); 

    const fetchProduct = async () => {
        if (!productId) return;
        const { success, data } = await studentProductService.getProductById(productId as string);
        if (success && data) {
            setFormData(data);
        }
        setIsLoading(false);
    };

    const fetchCategories = async () => {
        const { success, data } = await studentProductService.getCategories();
        if (success && data) {
           setFetchedCategories(data);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProduct();
            fetchCategories();
        } else {
             setIsLoading(false);
        }
    }, [productId]);

    const handleUpdateChange = (updates: any) => {
        setFormData((prev: any) => ({ ...prev, ...updates }));
    };

    const handleSave = async () => {
        if (!productId) return;

        // Prepare payload according to spec
        const payload = {
            category_id: formData.category ? String(formData.category) : '1', 
            
            inventory: parseInt(String(formData.stock || '0').replace(/\D/g, ''), 10) || 0,
            price: parseInt(String(formData.price || '0').replace(/\D/g, ''), 10) || 0,
            title: formData.name,
            type_inventory: 1,
            warn_inventory: parseInt(String(formData.reminder || '0').replace(/\D/g, ''), 10),
            description: formData.description || null,
            // Image: Endpoint requires file (multipart) or null. 
            // We cannot send File via application/json. 
            // Sending URL string fails "must be file" validation.
            // sending null allows text-only updates without validation error.
            image: null,
            tag_id: null
        };
        
        console.log("🚀 Update Payload:", payload);

        // Basic validation
        if (!payload.title || !payload.category_id ) {
            alert('لطفا فیلدهای اجباری (عنوان، دسته بندی، کد محصول) را پر کنید.');
            return;
        }

        setIsLoading(true);
        const { success, message } = await studentProductService.updateProduct(productId as string, payload);
        setIsLoading(false);

        if (success) {
            // Optional: Show success toast
            router.push('/StudentDashboard/Sells');
        } else {
            alert(message || 'خطا در ویرایش محصول');
        }
    };

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        console.log("Handling delete click...");
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!productId) return;
        
        setIsDeleting(true);
        const { success, message } = await studentProductService.deleteProduct(productId as string);
        setIsDeleting(false);
        setShowDeleteModal(false);

        if (success) {
            setModalMessage(message || 'محصول با موفقیت حذف شد');
            setShowSuccessModal(true);
        } else {
            alert(message || 'خطا در حذف محصول');
        }
    };

    const handleSuccessClose = () => {
        setShowSuccessModal(false);
        router.push('/StudentDashboard/Sells');
    };

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
                         <button 
                            onClick={handleSave}
                            className="w-full h-10 bg-[#0A33FF] rounded-lg shadow-sm border border-[#FFD369] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
                         >
                             <span className="text-white text-sm font-semibold font-['PeydaWeb']">ذخیره محصول</span>
                         </button>
                         {/* Preview Button (Secondary) */}
                         <button 
                            onClick={() => setShowPreview(true)}
                            className="w-full h-10 bg-white rounded-lg shadow-sm border border-[#DFE1E7] flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
                         >
                             <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">پیش نمایش محصول</span>
                         </button>
                         {/* Delete Button */}
                         <button 
                            onClick={handleDelete}
                            className="w-full h-10 bg-white rounded-lg shadow-sm border border-red-200 flex justify-center items-center gap-2 hover:bg-red-50 transition-colors"
                         >
                             <span className="text-red-500 text-sm font-semibold font-['PeydaWeb']">حذف محصول</span>
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
                {/* Shared Forms */}
                {isLoading ? (
                    <div className="w-full flex flex-col gap-6">
                        <Skeleton className="w-full h-[320px] rounded-xl" />
                        <Skeleton className="w-full h-[200px] rounded-xl" />
                        <Skeleton className="w-full h-[250px] rounded-xl" />
                    </div>
                ) : (
                    <>
                        <BasicInfoForm values={formData} onChange={handleUpdateChange} />
                        <PricingForm values={formData} onChange={handleUpdateChange} />
                        <PriceListEditor prices={formData.prices || []} onRefresh={fetchProduct} />
                        <CategoryTagsForm values={formData} onChange={handleUpdateChange} categories={fetchedCategories} />
                        <ProductPreviewCard product={formData} />
                    </>
                )}

                {/* Final Save Button */}
                <button 
                    onClick={handleSave}
                    className="w-full h-10 bg-[#FFD369] rounded-lg shadow-sm border border-[#FFD369] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
                >
                     <span className="text-[#393E46] text-sm font-semibold font-['PeydaWeb']">ذخیره محصول</span>
                </button>

             </div>

             {/* Bottom Navigation */}
             <div className="fixed bottom-0 w-full z-40">
                 <Navigation />
             </div>

             {/* Preview Popup */}
             {showPreview && (
                <NewProductPage6 
                    onClose={() => setShowPreview(false)}
                    onNext={() => setShowPreview(false)}
                    onStepClick={() => {}} 
                    formData={formData} // Passing actual form data to preview
                />
             )}
             <ConfirmModal 
                isOpen={showDeleteModal} 
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="حذف محصول"
                message="آیا از حذف این محصول اطمینان دارید؟ این عملیات غیرقابل بازگشت است."
                isLoading={isDeleting}
             />
             
             <SuccessModal 
                isOpen={showSuccessModal}
                onClose={handleSuccessClose}
                title="عملیات موفق"
                message={modalMessage}
             />
        </div>
    );
}

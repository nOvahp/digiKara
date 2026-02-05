"use client"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ClipboardList, Plus, Package, Layers, PackageX, AlertTriangle } from 'lucide-react';
import { DashboardNavBar } from "../../../layout/DashboardNavBar";
import { Navigation } from "../../../layout/Navigation";
import { ProductTable, ProductData } from "./components/ProductTable";
import { StatCard } from "./components/StatCard";
import { AddProductFlow } from "./components/AddProductFlow";
import { ConfirmModal } from '@/app/components/ConfirmModal';
import { SuccessModal } from '@/app/components/SuccessModal'; 
// Data
import { Product } from "@/app/StudentDashboard/data/products";
import { studentProductService } from "@/app/services/studentProductService";

// ...

export default function SellsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Simplified state, we only trigger 'step1' to open the flow
    const [activePopup, setActivePopup] = useState<'none' | 'step1'>('none');

    useEffect(() => {
        if (searchParams.get('new') === 'true') {
            setActivePopup('step1');
        }
    }, [searchParams]);

    const [productsList, setProductsList] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // categoriesList removed as it was unused in logic/passed empty
    
    // Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [deleteId, setDeleteId] = useState<string | number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchProducts = async () => {
        setIsLoading(true);
        const { success, data } = await studentProductService.getProducts();
        if (success && data) {
            setProductsList(data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    
    // Triggered by Table
    const handleDeleteProduct = (id: number | string) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    // Actual API Call
    const handleConfirmDelete = async () => {
        if (!deleteId) return;
        
        setIsDeleting(true);
        const { success, message } = await studentProductService.deleteProduct(deleteId);
        setIsDeleting(false);
        setShowDeleteModal(false);

        if (success) {
             fetchProducts();
             setModalMessage(message || 'محصول با موفقیت حذف شد');
             setShowSuccessModal(true);
        } else {
             alert(message || 'خطا در حذف محصول');
        }
    };

    // Form logic removed (handled in AddProductFlow)

    return (
        <div className="w-full min-h-screen bg-transparent flex flex-col relative" dir="ltr">
            <div className="sticky top-0 z-50">
                <DashboardNavBar />
            </div>

            <div className="flex-1 w-full flex flex-col items-center gap-6 px-0 py-0 pb-24">
                {/* Page Header and Stats - No Change */}
                <div className="w-full flex flex-col items-end gap-4">
                    <div className="text-center text-[#0D0D12] text-[20px] font-semibold leading-[27px]">
                        همه محصولات
                    </div>

                    {/* Order Management Button */}
                    <div onClick={() => router.push('/StudentDashboard/ManageOrders')} className="w-full h-[57px] px-[26px] py-[14px] bg-[#FDD00A] rounded-xl flex justify-center items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
                        <div className="text-center text-[#1A1C1E] text-[17.58px] font-semibold leading-6">
                            مدیریت سفارشات
                        </div>
                        <ClipboardList className="w-6 h-6 text-[#1A1C1E]" strokeWidth={1.5} />
                    </div>

                    {/* Add Product Button */}
                    <button
                        onClick={() => setActivePopup('step1')}
                        className="w-full h-[57px] px-[26px] py-[14px] bg-white rounded-xl border border-[#DFE1E7] flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                        <div className="text-center text-[#1A1C1E] text-[17.58px] font-semibold leading-6">
                            اضافه کردن محصول
                        </div>
                        <Plus className="w-6 h-6 text-[#1A1C1E]" strokeWidth={1.5} />
                    </button>
                </div>

                <div className="w-full flex flex-col gap-3 px-0">
                    <div className="w-full flex gap-3">
                        <StatCard title="کل محصولات" value={productsList.length.toLocaleString('fa-IR')} trend="+۱۲.۴٪" trendType="positive" trendLabel="از ماه گذشته" icon={<Package className="w-5 h-5 text-[#393E46]" strokeWidth={1.5} />} />
                        <StatCard title="موجودی ها" value="۹۸۰" trend="+۴۱۲ مورد" trendType="positive" trendLabel="از ماه گذشته" icon={<Layers className="w-5 h-5 text-[#393E46]" strokeWidth={1.5} />} />
                    </div>
                    <div className="w-full flex gap-3">
                        <StatCard title="ناموجود ها" value="۱۸۰" trend="+۷.۳٪" trendType="negative" trendLabel="از ماه گذشته" icon={<PackageX className="w-5 h-5 text-[#393E46]" strokeWidth={1.5} />} />
                        <StatCard title="موجودی کم" value="۸۰" trend="+۱۲.۴٪" trendType="positive" trendLabel="از ماه گذشته" icon={<AlertTriangle className="w-5 h-5 text-[#393E46]" strokeWidth={1.5} />} />
                    </div>
                </div>

                <ProductTable products={productsList} loading={isLoading} onDelete={handleDeleteProduct} />
            </div>

            <div className="fixed bottom-0 w-full z-50">
                <Navigation />
            </div>

            {/* Popup Layer */}
            <AddProductFlow 
                isOpen={activePopup === 'step1'} 
                onClose={() => setActivePopup('none')}
                onSuccess={() => {
                   fetchProducts();
                   // Do not close immediately if we want to show Step 7, but AddProductFlow handles Step 7 internally.
                   // The flow closes when user clicks "Finish" or X in Step 7.
                   // Wait, AddProductFlow keeps step 7 open. We only need to refresh list.
                }}
            />
            
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
                onClose={() => setShowSuccessModal(false)}
                title="عملیات موفق"
                message={modalMessage}
            />
        </div>
    );
}

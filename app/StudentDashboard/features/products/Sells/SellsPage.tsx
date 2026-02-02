"use client"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { ClipboardList, Plus, Package, Layers, PackageX, AlertTriangle } from 'lucide-react';
import { DashboardNavBar } from "../../../layout/DashboardNavBar";
import { Navigation } from "../../../layout/Navigation";
import { ProductTable, ProductData } from "./components/ProductTable";
import { StatCard } from "./components/StatCard";
import { NewProduct } from "./components/NewProduct";
import { NewProductPage2 } from "./components/NewProductPage2";
import { NewProductPage3 } from "./components/NewProductPage3";
import { NewProductPage4 } from "./components/NewProductPage4";
import { NewProductPage5 } from "./components/NewProductPage5";
import { NewProductPage6 } from "./components/NewProductPage6";
import { NewProductPage7 } from "./components/NewProductPage7";
import { ConfirmModal } from '@/app/components/ConfirmModal';
import { SuccessModal } from '@/app/components/SuccessModal';

// Initial Mock Data
import { Product } from "@/app/StudentDashboard/data/products";
import { studentProductService } from "@/app/services/studentProductService";

// Initial Mock Data (Moved to data/products.ts)


export default function SellsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activePopup, setActivePopup] = useState<'none' | 'step1' | 'step3' | 'step4' | 'step6' | 'step7'>('none');

    useEffect(() => {
        if (searchParams.get('new') === 'true') {
            setActivePopup('step1');
        }
    }, [searchParams]);
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoriesList, setCategoriesList] = useState<{id: number | string, name: string}[]>([]); 
    
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

    const generateProductCode = () => {
        return `NK-PRD-${Math.floor(100000 + Math.random() * 900000)}`;
    };

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        images: [] as string[],
        category: '',
        tags: [] as string[],
        id: generateProductCode(),
        price: '',
        fee: '',
        receive: '',
        discount: '',
        code: '',
        percent: '',
        stock: '',
        reminder: '',
        imageFiles: [] as File[],
        extraPrices: [] as any[], 
        isMultiPrice: false,
    });

    const updateFormData = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleSubmitProduct = async () => {
        const data = new FormData();
        
        // Required fields
        // Since we are now using real category IDs from the dropdown, we send formData.category directly.
        // If empty, we default to '1' (or whatever logic) but ideally user must select one.
        const categoryId = formData.category ? String(formData.category) : '1';
        data.append('category_id', categoryId); 
        data.append('code', formData.id); 
        data.append('inventory', (formData.stock || '').replace(/\D/g, '') || '0');
        data.append('price', (formData.price || '').replace(/\D/g, '') || '0'); // Remove non-digits
        data.append('title', formData.name);
        data.append('type_inventory', '1'); // Assuming 1 is default/physical
        data.append('warn_inventory', (formData.reminder || '').replace(/\D/g, '') || '0');
        
        // Optional fields
        if (formData.description) data.append('description', formData.description);
        
        // Image(s) handling
        // We append all files to 'images[]' to support multiple uploads.
        if (formData.imageFiles && formData.imageFiles.length > 0) {
           formData.imageFiles.forEach((file: File) => {
               data.append('images[]', file);
           });
        }
        
        // Also handling 'image' singular for backward compatibility or main image if backend needs it.
        // If the backend strictly needs 'image' as a single file, this might need adjustment.
        // But usually 'images[]' is the standard for multiple.
        if (formData.imageFiles && formData.imageFiles.length > 0) {
            data.append('image', formData.imageFiles[0]);
        }

        // Handle Extra Prices (Multi-Price)
        if (formData.isMultiPrice && formData.extraPrices && formData.extraPrices.length > 0) {
             formData.extraPrices.forEach((price: any, index: number) => {
                  data.append(`prices[${index}][amount]`, String(price.amount).replace(/\D/g, ''));
                  data.append(`prices[${index}][title]`, price.title);
                  data.append(`prices[${index}][type]`, String(price.type));
                  
                  if (price.discount_percent) data.append(`prices[${index}][discount_percent]`, String(price.discount_percent));
                  if (price.inventory) data.append(`prices[${index}][inventory]`, String(price.inventory));
                  
                  data.append(`prices[${index}][type_inventory]`, '1'); 
                  
                  if (price.warn_inventory) data.append(`prices[${index}][warn_inventory]`, String(price.warn_inventory));
             });
        }

        // Debug: Log FormData entries
        console.group('🚀 Submitting Product Data');
        for (const [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }
        console.groupEnd();

        const response = await studentProductService.addProduct(data);
        const { success, message, data: createdProduct } = response;
        
        if (success) {
            toast.success(message || 'محصول با موفقیت اضافه شد');
            setActivePopup('step7');
            // Refresh list
            const { success: refreshSuccess, data: products } = await studentProductService.getProducts();
            if (refreshSuccess && products) {
                setProductsList(products);
            }
        } else {
            toast.error(message || 'خطا در ثبت محصول');
        }
    };

    const handleAddProduct = () => {
        // Reset and close
        setActivePopup('none');
        setFormData({
            name: '', description: '', images: [], category: '', tags: [], id: generateProductCode(),
            price: '', fee: '', receive: '', discount: '', code: '', percent: '', stock: '', reminder: '',
            imageFiles: [], extraPrices: [], isMultiPrice: false
        });
    };

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
            {activePopup === 'step1' && (
                <NewProduct
                    onClose={() => setActivePopup('none')}
                    onNext={() => setActivePopup('step3')} // Skipping step2
                    onStepClick={(step) => setActivePopup(step as any)}
                    formData={formData}
                    updateFormData={updateFormData}
                    categories={categoriesList}
                />
            )}
            {/* Step 2 removed */}
            {activePopup === 'step3' && (
                <NewProductPage3
                    onClose={() => setActivePopup('none')}
                    onNext={() => setActivePopup('step4')}
                    onStepClick={(step) => setActivePopup(step as any)}
                    formData={formData}
                    updateFormData={updateFormData}
                />
            )}
            {activePopup === 'step4' && (
                <NewProductPage4
                    onClose={() => setActivePopup('none')}
                    onNext={() => setActivePopup('step6')} // Skipping step5
                    onStepClick={(step) => setActivePopup(step as any)}
                    formData={formData}
                    updateFormData={updateFormData}
                />
            )}
            {/* Step 5 removed */}
            {activePopup === 'step6' && (
                <NewProductPage6
                    onClose={() => setActivePopup('none')}
                    onNext={handleSubmitProduct} // Trigger submission
                    onStepClick={(step) => setActivePopup(step as any)}
                    formData={formData}
                />
            )}
            {activePopup === 'step7' && (
                <NewProductPage7
                    onClose={() => setActivePopup('none')}
                    onReset={handleAddProduct}
                    onStepClick={(step) => setActivePopup(step as any)}
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
                onClose={() => setShowSuccessModal(false)}
                title="عملیات موفق"
                message={modalMessage}
            />
        </div>
    );
}

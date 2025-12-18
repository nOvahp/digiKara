"use client"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ClipboardList, Plus, Package, Layers, PackageX, AlertTriangle } from 'lucide-react';
import { DashboardNavBar } from "../DashboardNavBar";
import { Navigation } from "../Navigation";
import { ProductTable, ProductData } from "./components/ProductTable";
import { StatCard } from "./components/StatCard";
import { NewProduct } from "./components/NewProduct";
import { NewProductPage2 } from "./components/NewProductPage2";
import { NewProductPage3 } from "./components/NewProductPage3";
import { NewProductPage4 } from "./components/NewProductPage4";
import { NewProductPage5 } from "./components/NewProductPage5";
import { NewProductPage6 } from "./components/NewProductPage6";
import { NewProductPage7 } from "./components/NewProductPage7";

// Initial Mock Data
import { productService, Product } from "@/app/StudentDashboard/data/products";

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
    const [productsList, setProductsList] = useState<Product[]>(productService.getAll());
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        images: [] as string[],
        category: '',
        tags: [] as string[],
        id: 'NK-PEG40-GRY-001',
        price: '',
        fee: '',
        receive: '',
        discount: '',
        code: '',
        percent: '',
        stock: '',
        reminder: ''
    });

    const updateFormData = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleAddProduct = () => {
        // Create new ProductData object
        const newProduct: Product = {
            id: Math.floor(Math.random() * 100000), // Better temporary ID
            name: formData.name,
            soldCount: 0, // Starts at 0
            revenue: "۰ ریال", // Starts at 0
            inventoryCount: parseInt(formData.stock || '0', 10),
            trendPercentage: "+0.0%", // Initial trend
            trendType: "positive",
            description: formData.description,
            category: formData.category,
            tags: formData.tags,
            price: formData.price,
            images: formData.images
        };

        productService.add(newProduct);
        setProductsList([...productService.getAll()]); // Refresh list

        // Reset and close
        setActivePopup('none');
        setFormData({
            name: '', description: '', images: [], category: '', tags: [], id: 'NK-PEG40-GRY-001',
            price: '', fee: '', receive: '', discount: '', code: '', percent: '', stock: '', reminder: ''
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
                    <div className="text-center text-[#0D0D12] text-[20px] font-semibold font-['PeydaWeb'] leading-[27px]">
                        همه محصولات
                    </div>

                    {/* Order Management Button */}
                    <div onClick={() => router.push('/StudentDashboard/ManageOrders')} className="w-full h-[57px] px-[26px] py-[14px] bg-[#FDD00A] rounded-xl flex justify-center items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
                        <div className="text-center text-[#1A1C1E] text-[17.58px] font-semibold font-['PeydaWeb'] leading-6">
                            مدیریت سفارشات
                        </div>
                        <ClipboardList className="w-6 h-6 text-[#1A1C1E]" strokeWidth={1.5} />
                    </div>

                    {/* Add Product Button */}
                    <button
                        onClick={() => setActivePopup('step1')}
                        className="w-full h-[57px] px-[26px] py-[14px] bg-white rounded-xl border border-[#DFE1E7] flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                        <div className="text-center text-[#1A1C1E] text-[17.58px] font-semibold font-['PeydaWeb'] leading-6">
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

                <ProductTable products={productsList} />
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
                    onNext={() => setActivePopup('step7')} // Transition to Success Page
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
        </div>
    );
}

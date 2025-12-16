"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    const [activePopup, setActivePopup] = useState<'none' | 'step1' | 'step3' | 'step4' | 'step6' | 'step7'>('none');
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
                        <div className="w-6 h-6 relative overflow-hidden">
                            <div className="w-[10px] h-[15px] left-[10px] top-[7px] absolute border-[1.5px] border-[#0A0A0A] rounded-[1px]" />
                            <div className="w-[10px] h-[14px] left-[4px] top-[6px] absolute border-[1.5px] border-[#0A0A0A] rounded-[1px]" />
                            <div className="w-[7px] h-[8px] left-[10px] top-[2px] absolute border-[1.5px] border-[#0A0A0A] rounded-[1px]" />
                        </div>
                    </div>

                    {/* Add Product Button */}
                    <button 
                        onClick={() => setActivePopup('step1')}
                        className="w-full h-[57px] px-[26px] py-[14px] bg-white rounded-xl border border-[#DFE1E7] flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                        <div className="text-center text-[#1A1C1E] text-[17.58px] font-semibold font-['PeydaWeb'] leading-6">
                            اضافه کردن محصول
                        </div>
                        <div className="w-6 h-6 relative overflow-hidden">
                            <div className="w-[10px] h-[10px] left-[7px] top-[7px] absolute border-2 border-[#1A1C1E]" />
                            <div className="w-[2px] h-[10px] left-[11px] top-[7px] absolute bg-[#1A1C1E]" />
                            <div className="w-[10px] h-[2px] left-[7px] top-[11px] absolute bg-[#1A1C1E]" />
                        </div>
                    </button>
                </div>

                 <div className="w-full flex flex-col gap-3 px-0">
                     <div className="w-full flex gap-3">
                         <StatCard title="کل محصولات" value={productsList.length.toLocaleString('fa-IR')} trend="+۱۲.۴٪" trendType="positive" trendLabel="از ماه گذشته" icon={<div className="w-5 h-5 relative overflow-hidden"><div className="absolute left-[2.50px] top-[2.50px] w-[15px] h-[15px] border-[1.67px] border-[#393E46]" /></div>} />
                         <StatCard title="موجودی ها" value="980" trend="+412 مورد" trendType="positive" trendLabel="از ماه گذشته" icon={<div className="w-5 h-5 relative overflow-hidden"><div className="absolute left-[2.50px] top-[2.50px] w-[15px] h-[15px] border-[1.67px] border-[#393E46]" /></div>} />
                     </div>
                     <div className="w-full flex gap-3">
                         <StatCard title="ناموجود ها" value="180" trend="+۷.۳٪" trendType="negative" trendLabel="از ماه گذشته" icon={<div />} />
                         <StatCard title="موجودی کم" value="80" trend="+۱۲.۴٪" trendType="positive" trendLabel="از ماه گذشته" icon={<div className="w-5 h-5 relative overflow-hidden"><div className="absolute left-[2.50px] top-[2.50px] w-[15px] h-[15px] border-[1.67px] border-[#393E46]" /></div>} />
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

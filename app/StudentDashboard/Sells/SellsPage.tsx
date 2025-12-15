"use client"

import { useState } from 'react';
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
const initialProducts: ProductData[] = [
    { id: 1, name: "عسل آویشن ارگانیک", soldCount: 300, revenue: "۴,۵۰۰,۰۰۰ ریال", inventoryCount: 100, trendPercentage: "+5.0%", trendType: "positive" },
    { id: 2, name: "عسل چهل گیاه ارگانیک", soldCount: 400, revenue: "۶,۰۰۰,۰۰۰ ریال", inventoryCount: 150, trendPercentage: "+7.5%", trendType: "negative" },
    { id: 3, name: "عسل زعفران ارگانیک", soldCount: 500, revenue: "۷,۵۰۰,۰۰۰ ریال", inventoryCount: 120, trendPercentage: "+6.0%", trendType: "positive" },
    { id: 4, name: "موم عسل طبیعی", soldCount: 250, revenue: "۳,۰۰۰,۰۰۰ ریال", inventoryCount: 80, trendPercentage: "+3.5%", trendType: "negative" },
    { id: 5, name: "شهد گلهای وحشی ارگانیک", soldCount: 320, revenue: "۵,۲۰۰,۰۰۰ ریال", inventoryCount: 90, trendPercentage: "+5.5%", trendType: "positive" },
    { id: 6, name: "گرده گل ارگانیک", soldCount: 150, revenue: "۲,۰۰۰,۰۰۰ ریال", inventoryCount: 50, trendPercentage: "+4.1%", trendType: "positive" },
    { id: 7, name: "سیب زمینی ارگانیک", soldCount: 600, revenue: "۱,۵۰۰,۰۰۰ ریال", inventoryCount: 300, trendPercentage: "+2.0%", trendType: "negative" },
    { id: 8, name: "گوجه فرنگی ارگانیک", soldCount: 550, revenue: "۱,۲۰۰,۰۰۰ ریال", inventoryCount: 250, trendPercentage: "+3.0%", trendType: "positive" },
    { id: 9, name: "شیرینی عسل ارگانیک", soldCount: 200, revenue: "۳,۵۰۰,۰۰۰ ریال", inventoryCount: 60, trendPercentage: "+5.2%", trendType: "positive" },
    { id: 10, name: "عسل گلابی ارگانیک", soldCount: 280, revenue: "۴,۰۰۰,۰۰۰ ریال", inventoryCount: 110, trendPercentage: "+6.5%", trendType: "negative" },
    { id: 11, name: "عسل نعنا ارگانیک", soldCount: 430, revenue: "۶,۰۰۰,۰۰۰ ریال", inventoryCount: 130, trendPercentage: "+4.5%", trendType: "positive" },
    { id: 12, name: "سیب ارگانیک", soldCount: 350, revenue: "۳,۰۰۰,۰۰۰ ریال", inventoryCount: 150, trendPercentage: "+3.5%", trendType: "positive" },
    { id: 13, name: "روغن حیوانی", soldCount: 80, revenue: "۸,۰۰۰,۰۰۰ ریال", inventoryCount: 20, trendPercentage: "+10.0%", trendType: "positive" },
    { id: 14, name: "کشک محلی", soldCount: 120, revenue: "۱,۰۰۰,۰۰۰ ریال", inventoryCount: 40, trendPercentage: "+1.5%", trendType: "negative" },
    { id: 15, name: "قره قروت", soldCount: 500, revenue: "۵۰۰,۰۰۰ ریال", inventoryCount: 200, trendPercentage: "+8.0%", trendType: "positive" },
    { id: 16, name: "لواشک خانگی", soldCount: 600, revenue: "۹۰۰,۰۰۰ ریال", inventoryCount: 100, trendPercentage: "+12.0%", trendType: "positive" },
    { id: 17, name: "سرکه سیب", soldCount: 90, revenue: "۱,۱۰۰,۰۰۰ ریال", inventoryCount: 30, trendPercentage: "+2.5%", trendType: "negative" },
    { id: 18, name: "آبغوره", soldCount: 110, revenue: "۱,۳۰۰,۰۰۰ ریال", inventoryCount: 45, trendPercentage: "+3.0%", trendType: "positive" },
    { id: 19, name: "رب انار", soldCount: 130, revenue: "۲,۵۰۰,۰۰۰ ریال", inventoryCount: 55, trendPercentage: "+4.0%", trendType: "positive" },
    { id: 20, name: "زعفران مثقالی", soldCount: 40, revenue: "۵,۰۰۰,۰۰۰ ریال", inventoryCount: 15, trendPercentage: "+9.0%", trendType: "negative" },
    { id: 21, name: "هل سبز", soldCount: 60, revenue: "۳,۲۰۰,۰۰۰ ریال", inventoryCount: 25, trendPercentage: "+5.0%", trendType: "positive" },
    { id: 22, name: "دارچین قلم", soldCount: 100, revenue: "۸۰۰,۰۰۰ ریال", inventoryCount: 70, trendPercentage: "+2.2%", trendType: "positive" },
    { id: 23, name: "زردچوبه", soldCount: 200, revenue: "۶۰۰,۰۰۰ ریال", inventoryCount: 80, trendPercentage: "+1.0%", trendType: "negative" },
    { id: 24, name: "فلفل سیاه", soldCount: 150, revenue: "۹۰۰,۰۰۰ ریال", inventoryCount: 60, trendPercentage: "+3.8%", trendType: "positive" },
    { id: 25, name: "آویشن کوهی", soldCount: 85, revenue: "۱,۵۰۰,۰۰۰ ریال", inventoryCount: 35, trendPercentage: "+6.1%", trendType: "positive" },
];

export default function SellsPage() {
    const [activePopup, setActivePopup] = useState<'none' | 'step1' | 'step3' | 'step4' | 'step6' | 'step7'>('none');
    const [productsList, setProductsList] = useState<ProductData[]>(initialProducts);
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
        const newProduct: ProductData = {
            id: productsList.length + 1,
            name: formData.name,
            soldCount: 0, // Starts at 0
            revenue: "۰ ریال", // Starts at 0
            inventoryCount: parseInt(formData.stock || '0', 10),
            trendPercentage: "+0.0%", // Initial trend
            trendType: "positive"
        };

        setProductsList(prev => [newProduct, ...prev]);
        
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
                 <div className="w-full flex flex-col items-end gap-4 px-0 py-0">
                     <div className="text-center text-[#0D0D12] text-xl font-semibold font-['PeydaWeb'] leading-[27px]">
                         همه محصولات
                     </div>
                     <button 
                        onClick={() => setActivePopup('step1')}
                        className="w-full h-10 px-0 py-0 bg-gradient-to-t from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.15)] bg-[#FFD369] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-lg border border-[#FFD369] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
                     >
                         <div className="w-4 h-4 relative overflow-hidden">
                             <div className="absolute left-[4.67px] top-[4.67px] w-[6.67px] h-[6.67px] border-2 border-[#393E46]" />
                             <div className="absolute left-[8px] top-[4px] w-[0px] h-[8px] border-l-2 border-[#393E46]" />
                             <div className="absolute left-[4px] top-[8px] w-[8px] h-[0px] border-t-2 border-[#393E46]" />
                         </div>
                         <div className="text-center text-[#393E46] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
                             اضافه کردن محصول
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

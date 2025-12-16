"use client"

import React, { useState } from "react"
import { 
    Gem, 
    Palette, 
    Utensils, 
    Shirt, 
    Armchair, 
    Sofa, 
    Lamp, 
    DoorClosed, // Closet
    Table, // Desk/Table
    BedDouble, // Bed
    Library, // Bookshelf
    Briefcase, // Office (Chair)
    RockingChair, // Rocking Chair - lucide might not have it, use generic
    Flower2, // Vase/Plant
    Layers, // Mattress
    ArrowRight,
    Apple,
    Coffee,
    Pencil,
    Watch
} from "lucide-react"
import Link from "next/link"
import NavBar from "./NavBar";

// Category Interface
interface CategoryType {
    id: number;
    title: string;
    icon: React.ElementType;
    active?: boolean;
}

interface SubCategoryType {
    id: number;
    title: string;
    icon: React.ElementType; // Using icons for sub-items too for cleaner look
}

export default function Category() {
    const [activeCategory, setActiveCategory] = useState<string>("صنایع چوبی");

    const categories: CategoryType[] = [
        { id: 5, title: "صنایع چوبی", icon: Armchair, active: true },
        { id: 4, title: "پوشاک", icon: Shirt },
        { id: 3, title: "خوراکی", icon: Utensils },
        { id: 2, title: "صنایع هنری", icon: Palette },
        { id: 1, title: "طلا و جواهر", icon: Gem },
    ];

    // Data for all categories
    const allSubCategories: Record<string, SubCategoryType[]> = {
        "صنایع چوبی": [
            { id: 1, title: "مبل", icon: Sofa },
            { id: 2, title: "صندلی", icon: Armchair },
            { id: 3, title: "لامپ", icon: Lamp },
            { id: 4, title: "کمد", icon: DoorClosed },
            { id: 5, title: "میز", icon: Table },
            { id: 6, title: "تخت", icon: BedDouble },
            { id: 7, title: "قفسه کتاب", icon: Library },
            { id: 8, title: "صندلی اداری", icon: Briefcase },
            { id: 9, title: "میز تحریر", icon: Table },
            { id: 10, title: "میز ناهار خوری", icon: Utensils },
            { id: 11, title: "لباس", icon: Shirt },
            { id: 12, title: "صندلی گهواره", icon: Armchair },
            { id: 13, title: "تاب زولا", icon: Armchair },
            { id: 14, title: "گلدان", icon: Flower2 },
            { id: 15, title: "تشک", icon: Layers },
            { id: 16, title: "میز", icon: Table },
        ],
        "پوشاک": [
            { id: 1, title: "پیراهن", icon: Shirt },
            { id: 2, title: "شلوار", icon: Layers }, // Placeholder icon
            { id: 3, title: "کفش", icon: Layers }, // Placeholder
            { id: 4, title: "کت و شلوار", icon: Briefcase },
            { id: 5, title: "کیف", icon: Briefcase },
            { id: 6, title: "کلاه", icon: Lamp }, // Placeholder shape
            { id: 7, title: "جوراب", icon: Layers },
            { id: 8, title: "لباس زیر", icon: Shirt },
        ],
        "خوراکی": [
            { id: 1, title: "میوه", icon: Apple }, // Need to import Apple if avail, or generic
            { id: 2, title: "سبزیجات", icon: Flower2 },
            { id: 3, title: "نان", icon: Layers },
            { id: 4, title: "نوشیدنی", icon: Coffee }, // Need import
            { id: 5, title: "تنقلات", icon: Utensils },
            { id: 6, title: "ادویه", icon: Utensils },
            { id: 7, title: "شیرینی", icon: Utensils },
        ],
        "صنایع هنری": [
            { id: 1, title: "نقاشی", icon: Palette },
            { id: 2, title: "خطاطی", icon: Pencil }, // Need import
            { id: 3, title: "سفالگری", icon: Flower2 },
            { id: 4, title: "فرش", icon: Layers },
            { id: 5, title: "میناکاری", icon: Gem },
            { id: 6, title: "خاتم کاری", icon: Gem },
        ],
        "طلا و جواهر": [
            { id: 1, title: "گردنبند", icon: Gem },
            { id: 2, title: "آویز", icon: Gem },
            { id: 3, title: "گوشواره", icon: Gem },
            { id: 4, title: "دستبند", icon: Watch }, // Need import
            { id: 5, title: "انگشتر", icon: Gem },
            { id: 6, title: "ساعت", icon: Watch },
        ]
    };

    const subCategories = allSubCategories[activeCategory] || [];

    return (
        <div className="w-full flex flex-col items-center pt-4 px-4" dir="rtl">
            
            {/* Header */}
            <div className="w-full max-w-[440px] flex justify-between items-center mb-8">
                 <span className="text-[#0C1415] text-lg font-['PeydaWeb'] font-bold">دسته بندی</span>
                 
                 {/* Back Button */}
                 <Link href="/Bazzar">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100">
                        <ArrowRight className="w-5 h-5 text-gray-700 rotate-180" /> 
                    </button>
                 </Link>
            </div>

            {/* Main Categories (Horizontal Scroll) */}
            <div className="w-full max-w-[440px] overflow-x-auto no-scrollbar pb-2 mb-6">
                <div className="flex gap-4 px-1 min-w-max">
                    {categories.map((cat) => (
                        <div 
                            key={cat.id} 
                            onClick={() => setActiveCategory(cat.title)}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                        >
                            <div className={`
                                w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
                                ${activeCategory === cat.title ? 'bg-[#F7C309]' : 'bg-[#EEEEEE] group-hover:bg-gray-200'}
                            `}>
                                <cat.icon className={`w-8 h-8 ${activeCategory === cat.title ? 'text-[#393E46]' : 'text-[#393E46]'}`} strokeWidth={1.5} />
                            </div>
                            <span className="text-[#1F2029] text-xs font-['PeydaWeb'] font-semibold">{cat.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="w-full max-w-[440px] h-px bg-gray-200 mb-6" />

            {/* Sub Categories Grid */}
            <div className="w-full max-w-[440px] grid grid-cols-4 gap-y-6 gap-x-4">
                {subCategories.map((sub, index) => (
                    <div key={`${sub.id}-${index}`} className="flex flex-col items-center gap-2 cursor-pointer group">
                        <div className="w-16 h-16 bg-[#F6F6F6] rounded-full flex items-center justify-center group-hover:bg-[#FDD00A]/20 transition-colors">
                             <sub.icon className="w-7 h-7 text-[#393E46]" strokeWidth={1.5} />
                        </div>
                         <span className="text-[#0C1415] text-[11px] font-['PeydaWeb'] font-medium text-center">{sub.title}</span>
                    </div>
                ))}
            </div>
            
            {/* Added Padding for Fixed Navbar */}
            <div className="h-24 w-full" />
            <NavBar />
        </div>
    )
}

"use client"

import * as React from "react"
import { Sparkles, TrendingUp, BookOpen, Lightbulb, Package } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel"
import { Card, CardContent } from "../../components/ui/card"

const suggestions = [
  {
    id: 1,
    title: "دوره آموزشی مناسب",
    description: "دوره «عکاسی از محصول با موبایل» می‌تواند به فروش شما کمک کند.",
    icon: <BookOpen className="w-5 h-5 text-[#F7C61A]" />,
    color: "bg-[#FFF9E6]", // Light yellow bg for icon
  },
  {
    id: 2,
    title: "این محصول پرفروش است",
    description: "«کارهای دستی چوبی» در منطقه شما محبوبیت زیادی پیدا کرده است.",
    icon: <TrendingUp className="w-5 h-5 text-[#64B327]" />,
    color: "bg-[#E6F9E9]", // Light green
  },
  {
    id: 3,
    title: "نکته فروش",
    description: "توضیحات محصول را کامل‌تر کنید تا اعتماد مشتریان بیشتر شود.",
    icon: <Lightbulb className="w-5 h-5 text-[#21A2FF]" />,
    color: "bg-[#E6F4FF]", // Light blue
  },
  {
    id: 4,
    title: "محصول جدید",
    description: "محصولات «لوازم تحریر فانتزی» در حال حاضر ترند هستند.",
    icon: <Package className="w-5 h-5 text-[#D54141]" />,
    color: "bg-[#FFE6E6]", // Light red
  },
  {
    id: 5,
    title: "ارتقای سطح",
    description: "فقط ۵ فروش دیگر تا رسیدن به سطح «فروشنده حرفه‌ای» باقی مانده است.",
    icon: <Sparkles className="w-5 h-5 text-[#AD58F4]" />,
    color: "bg-[#F3E6FF]", // Light purple
  },
]

export function SmartSuggestions() {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4" dir="rtl">
        
        {/* Header */}
        <div className="w-full flex justify-start items-center px-6">
            <div className="text-[#222831] text-[18px] font-num-medium leading-[25.20px]">
                پیشنهادات هوشمند
            </div>
        </div>

        {/* Carousel */}
        <div className="w-full" dir="ltr"> {/* Carousel needs LTR structure internally usually, but we render content RTL */}
             <Carousel
                opts={{
                    align: "start",
                    direction: "rtl", // Shadcn/Embla supports RTL
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4 px-6"> {/* Negative margin to offset padding for first item alignment */}
                    {suggestions.map((item) => (
                        <CarouselItem key={item.id} className="pl-4 basis-[85%] sm:basis-[300px]">
                             <div className="h-full">
                                <Card className="border-none shadow-sm h-full rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                                    <CardContent className="p-4 flex flex-col gap-3 h-full justify-between bg-white text-right" dir="rtl">
                                        <div className="flex flex-col gap-3 items-start">
                                            {/* Icon */}
                                            <div className={`w-10 h-10 rounded-full flex justify-center items-center ${item.color}`}>
                                                {item.icon}
                                            </div>
                                            
                                            {/* Text */}
                                            <div className="flex flex-col gap-1 w-full">
                                                <h3 className="text-[#0F172A] text-sm font-['Meem'] font-bold leading-tight">
                                                    {item.title}
                                                </h3>
                                                <p className="text-[#61656B] text-xs font-num-medium leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                             </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* Optional: Add CarouselPrevious/Next if desired, but user is on mobile/dashboard often implies swipe */}
            </Carousel>
        </div>
    </div>
  )
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useNewTimche } from "./New/NewTimcheContext";
import { 
    ChevronRight,
    User,
    Box,
    LayoutGrid,
    Check,
    ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    name: z.string().min(1, "لطفا نام تیمچه را وارد کنید"),
    category: z.enum(["project", "product"]),
    description: z.string().min(1, "لطفا توضیحات را وارد کنید").max(200, "توضیحات نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد"),
    manager: z.string().min(1, "لطفا سرپرست تیمچه را انتخاب کنید"),
});

type FormValues = z.infer<typeof formSchema>;

const NewTimche = () => {
    const router = useRouter();
    const { saveStep1, step1Data } = useNewTimche();
    
    // Hardcoded step 1 for this page
    const step = 1;

    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch,
        control,
        trigger,
        formState: { errors } 
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: step1Data || {
            name: "",
            category: "product",
            description: "",
            manager: ""
        }
    });

    const category = watch("category");
    const description = watch("description");

    const onContinue = async () => {
        const isValid = await trigger();
        if (isValid) {
            const data = watch();
            saveStep1(data);
            router.push('/SchoolPanel/Timche/New/Step2');
        }
    };

    const steps = [
        { id: 1, title: "اطلاعات پایه" },
        { id: 2, title: "پروژه‌ها" },
        { id: 3, title: "اعضا" },
        { id: 4, title: "معیارها" },
    ];

    return (
        <div className="w-full min-h-screen flex flex-col items-center pb-10" dir="rtl">
            
            {/* Header */}
            <div className="w-full max-w-[440px] pt-4 flex flex-col gap-5">
                <div className="w-full px-4 flex justify-between items-center">
                    <h1 className="text-center text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
                        افزودن تیمچه
                    </h1>
                     <div onClick={() => router.back()} className="w-10 h-10 bg-white rounded-full border border-[rgba(8,11,17,0.10)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Stepper */}
                <div className="w-full px-0 py-5 border-b border-[#DFE1E7] flex justify-between items-center overflow-x-auto no-scrollbar gap-4">
                    {steps.map((s) => (
                        <div key={s.id} className={cn("flex items-center gap-2.5", s.id !== 1 && "opacity-50")}>
                            <span className={cn(
                                "text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide whitespace-nowrap",
                                s.id === 1 ? "text-[#0D0D12]" : "text-[#818898]"
                            )}>
                                {s.title}
                            </span>
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center shadow-sm",
                                s.id === 1 ? "bg-[#FDD00A]" : "bg-[#DFE1E7]"
                            )}>
                                 <span className="text-white text-sm font-num-bold font-bold leading-[21px]">{s.id}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="w-full max-w-[440px] px-0 py-6 flex flex-col gap-6">
                
                {/* Timche Name */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                        نام تیمچه
                    </label>
                    <input 
                        type="text"
                        {...register("name")}
                        className={cn(
                            "w-full h-[52px] px-3 bg-white rounded-xl border focus:outline-none text-right text-[#0D0D12] font-['PeydaWeb']",
                            errors.name ? "border-red-500 focus:border-red-500" : "border-[#DFE1E7] focus:border-[#FDD00A]"
                        )}
                    />
                    {errors.name && <span className="text-red-500 text-xs font-['PeydaWeb']">{errors.name.message}</span>}
                </div>

                {/* Use Case / Category */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                        دسته‌بندی فعالیت
                    </label>
                    <div className="w-full h-12 p-1 bg-white rounded-xl border border-[#E5E5E5] shadow-sm flex items-center">
                        <div 
                             onClick={() => setValue("category", "product")}
                             className={cn(
                                "flex-1 h-full rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all",
                                category === "product" ? "bg-[#FDD00A]/10 border border-[#FDD00A]" : "text-[#666D80]"
                            )}
                        >
                             <span className={cn(
                                "text-sm font-['PeydaWeb'] font-semibold leading-[21px]",
                                category === "product" ? "text-[#0D0D12]" : "text-[#666D80]"
                            )}>
                                محصول محور
                            </span>
                             <Box className={cn("w-5 h-5", category === "product" ? "text-[#0D0D12]" : "text-[#666D80]")} />
                        </div>
                        <div className="w-[1px] h-6 bg-[#E5E5E5] mx-1" />
                        <div 
                            onClick={() => setValue("category", "project")}
                            className={cn(
                                "flex-1 h-full rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all",
                                category === "project" ? "bg-[#FDD00A]/10 border border-[#FDD00A]" : "text-[#666D80]"
                            )}
                        >
                            <span className={cn(
                                "text-sm font-['PeydaWeb'] font-semibold leading-[21px]",
                                category === "project" ? "text-[#0D0D12]" : "text-[#666D80]"
                            )}>
                                پروژه محور
                            </span>
                            <LayoutGrid className={cn("w-5 h-5", category === "project" ? "text-[#0D0D12]" : "text-[#666D80]")} />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                        توضیحات
                    </label>
                    <div className={cn(
                        "w-full px-3 py-2.5 bg-white rounded-xl border flex flex-col gap-2",
                        errors.description ? "border-red-500" : "border-[#DFE1E7] focus-within:border-[#FDD00A]"
                    )}>
                        <textarea 
                            {...register("description")}
                            className="w-full min-h-[80px] text-right text-[#0D0D12] font-['PeydaWeb'] text-sm focus:outline-none resize-none"
                        />
                        <div className="text-left text-[#A4ACB9] text-xs font-num-light leading-[18px]">
                            {description?.length || 0}/200
                        </div>
                    </div>
                    {errors.description && <span className="text-red-500 text-xs font-['PeydaWeb']">{errors.description.message}</span>}
                </div>

                {/* Manager */}
                <div className="w-full flex flex-col gap-2 relative">
                    <label className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                        سرپرست تیمچه
                    </label>
                    <div className="relative w-full">
                        <Controller
                            control={control}
                            name="manager"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange} dir="rtl">
                                    <SelectTrigger className={cn(
                                        "w-full h-[52px] bg-white rounded-xl border focus:ring-0 text-right text-[#0D0D12] font-['PeydaWeb'] shadow-none",
                                        errors.manager ? "border-red-500 focus:border-red-500" : "border-[#DFE1E7] focus:border-[#FDD00A]"
                                    )}>
                                        <div className="flex items-center gap-2 font-medium">
                                             <User className="w-5 h-5 text-[#666D80]" />
                                             <SelectValue placeholder="انتخاب کنید" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent 
                                        className="text-right font-medium" 
                                        dir="rtl"
                                        style={{ width: "var(--radix-select-trigger-width)" }}
                                    >
                                        <SelectGroup>
                                            <SelectItem value="مهندس رضایی">مهندس رضایی</SelectItem>
                                            <SelectItem value="مهندس کریمی">مهندس کریمی</SelectItem>
                                            <SelectItem value="خانم محمدی">خانم محمدی</SelectItem>
                                            <SelectItem value="دکتر حسینی">دکتر حسینی</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    {errors.manager && <span className="text-red-500 text-xs font-['PeydaWeb']">{errors.manager.message}</span>}
                </div>
            </div>

            {/* Footer / Continue Button */}
            <div className="fixed bottom-0 w-full max-w-[440px] p-4 bg-white/80 backdrop-blur-sm border-t border-[#F0F0F0] mb-25">
                <button 
                    onClick={onContinue}
                    type="button"
                    className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#e5c109] transition-colors shadow-sm border-none outline-none"
                >
                    <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold leading-6">
                        ادامه
                    </span>
                </button>
            </div>

        </div>
    );
};

export default NewTimche;

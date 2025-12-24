"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown, Calendar, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useNewProject } from "../NewProjectContext";

const toFarsiNumber = (n: number | string | undefined): string => {
    if (n === undefined || n === null) return '';
    return n.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
}

// Validation Schema
const step1Schema = z.object({
    title: z.string().min(1, "عنوان پروژه الزامی است"),
    projectType: z.enum(["product", "project"]),
    timche: z.string().min(1, "انتخاب تیمچه/کارگاه الزامی است"),
    mentor: z.string().min(1, "انتخاب معلم مسئول الزامی است"),
    schedule: z.string().min(1, "زمان‌بندی تقریبی الزامی است"),
    needsSupport: z.boolean(),
    supportType: z.string().optional(),
}).refine((data) => {
    if (data.needsSupport && !data.supportType) return false;
    return true;
}, {
    message: "انتخاب نوع حمایت الزامی است",
    path: ["supportType"],
});

type Step1FormValues = z.infer<typeof step1Schema>;

const NewProject1 = () => {
    const router = useRouter();
    const { updateProjectData, projectData } = useNewProject();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<Step1FormValues>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            title: projectData.title || "",
            projectType: projectData.projectType || "product",
            timche: projectData.timche || "",
            mentor: projectData.mentor || "",
            schedule: projectData.schedule || "",
            needsSupport: projectData.needsSupport || false,
            supportType: projectData.supportType || "",
        },
    });

    const needsSupport = watch("needsSupport");
    const selectedProjectType = watch("projectType");

    const onSubmit = (data: Step1FormValues) => {
        updateProjectData(data);
        console.log("Step 1 Data:", data);
        router.push('/SchoolPanel/Projects/NewProject/step2');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full min-h-screen pb-24" dir="rtl">
            {/* Header */}
            <div className="w-full h-16 px-0 flex justify-between items-center bg-white border-b border-[#DFE1E7]">

                <div className="text-[#0D0D12] text-xl font-['PeydaWeb'] font-semibold leading-[27px]">
                    افزودن پروژه
                </div>
                <div
                    onClick={() => router.back()}
                    className="w-10 h-10 bg-white rounded-full border border-[rgba(8,11,17,0.10)] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-[#0D0D12]" strokeWidth={1.5} />
                </div>
            </div>

            <div className="w-full max-w-md mx-auto p-0 flex flex-col gap-6">
                {/* Stepper */}
                <div className="w-full py-5 flex items-center gap-4 overflow-x-auto border-b border-[#DFE1E7] no-scrollbar">

                    {/* Step 1: Basic Info (Active) */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                        <div className="w-6 h-6 bg-[#FDD00A] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(1)}</span>
                        </div>
                        <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">اطلاعات پایه</span>
                    </div>

                    <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                    {/* Step 2: Resources */}
                    <div className="flex items-center gap-2.5 opacity-50 flex-shrink-0">
                        <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(2)}</span>
                        </div>
                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">منابع</span>
                    </div>

                    <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                    {/* Step 3: Financial */}
                    <div className="flex items-center gap-2.5 opacity-50 flex-shrink-0">
                        <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(3)}</span>
                        </div>
                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">مالی</span>
                    </div>

                    <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                    {/* Step 4: Sharing */}
                    <div className="flex items-center gap-2.5 opacity-50 flex-shrink-0">
                        <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(4)}</span>
                        </div>
                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">تسهیم</span>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-6">

                    {/* Project Title */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">عنوان پروژه</label>
                        <input
                            {...register("title")}
                            type="text"
                            className={cn(
                                "w-full h-[52px] bg-white rounded-xl border px-3 text-[#0D0D12] text-right focus:outline-none focus:border-[#FDD00A]",
                                errors.title ? "border-red-500" : "border-[#DFE1E7]"
                            )}
                        />
                        {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
                    </div>

                    {/* Project Type */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] text-right">نوع پروژه</label>

                        <div className="w-full h-[52px] flex bg-white rounded-xl border border-[#E5E5E5] p-1 shadow-sm items-center">
                            <div
                                onClick={() => setValue("projectType", "project")}
                                className={cn(
                                    "flex-1 h-full rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all",
                                    selectedProjectType === "project" ? "bg-[#FDD00A] shadow-sm" : "bg-transparent hover:bg-gray-50"
                                )}
                            >
                                <span className={cn(
                                    "text-sm font-semibold font-['PeydaWeb'] transition-colors",
                                    selectedProjectType === "project" ? "text-[#0D0D12]" : "text-[#666D80]"
                                )}> پروژه محور </span>
                            </div>

                            <div className="w-[1px] h-5 bg-[#DFE1E7] mx-1"></div>

                            {/* Product Option */}
                            <div
                                onClick={() => setValue("projectType", "product")}
                                className={cn(
                                    "flex-1 h-full rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all",
                                    selectedProjectType === "product" ? "bg-[#FDD00A] shadow-sm" : "bg-transparent hover:bg-gray-50"
                                )}
                            >
                                <span className={cn(
                                    "text-sm font-semibold font-['PeydaWeb'] transition-colors",
                                    selectedProjectType === "product" ? "text-[#0D0D12]" : "text-[#666D80]"
                                )}>محصول محور </span>
                            </div>
                        </div>
                    </div>

                    {/* Timche/Workshop */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">تیمچه/کارگاه مرتبط</label>
                        <Controller
                            control={control}
                            name="timche"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                    <SelectTrigger className={cn("w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] shadow-none focus:ring-0 focus:border-[#FDD00A] text-right", errors.timche && "border-red-500")}>
                                        <SelectValue placeholder="انتخاب کنید" />
                                    </SelectTrigger>
                                    <SelectContent dir="rtl">
                                        <SelectItem value="تیمچه هوش مصنوعی">تیمچه هوش مصنوعی</SelectItem>
                                        <SelectItem value="تیمچه رباتیک">تیمچه رباتیک</SelectItem>
                                        <SelectItem value="تیمچه برنامه نویسی">تیمچه برنامه نویسی</SelectItem>
                                        <SelectItem value="تیمچه هنر">تیمچه هنر</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.timche && <span className="text-xs text-red-500">{errors.timche.message}</span>}
                    </div>

                    {/* Responsible Mentor */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">معلم مسئول</label>
                        <Controller
                            control={control}
                            name="mentor"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                    <SelectTrigger className={cn("w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] shadow-none focus:ring-0 focus:border-[#FDD00A] text-right", errors.mentor && "border-red-500")}>
                                        <SelectValue placeholder="انتخاب کنید" />
                                    </SelectTrigger>
                                    <SelectContent dir="rtl">
                                        <SelectItem value="علی رضایی">علی رضایی</SelectItem>
                                        <SelectItem value="بهروز حسینی">بهروز حسینی</SelectItem>
                                        <SelectItem value="زهرا محمدی">زهرا محمدی</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.mentor && <span className="text-xs text-red-500">{errors.mentor.message}</span>}
                    </div>

                    {/* Schedule */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">زمان بندی تقریبی</label>
                        <Controller
                            control={control}
                            name="schedule"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                    <SelectTrigger className={cn("w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] shadow-none focus:ring-0 focus:border-[#FDD00A] text-right", errors.schedule && "border-red-500")}>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-[#666D80]" />
                                            <SelectValue placeholder="انتخاب کنید" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent dir="rtl">
                                        <SelectItem value="۳ ماهه">۳ ماهه</SelectItem>
                                        <SelectItem value="۶ ماهه">۶ ماهه</SelectItem>
                                        <SelectItem value="۹ ماهه">۹ ماهه</SelectItem>
                                        <SelectItem value="۱ ساله">۱ ساله</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.schedule && <span className="text-xs text-red-500">{errors.schedule.message}</span>}
                    </div>

                    {/* Support Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">این پروژه نیاز به حمایت دارد.</span>
                        <div
                            className={cn(
                                "w-12 h-6 rounded-full relative cursor-pointer transition-colors",
                                needsSupport ? "bg-[#FDD00A]" : "bg-[#605F5F]"
                            )}
                            onClick={() => {
                                const newVal = !needsSupport;
                                setValue("needsSupport", newVal);
                                if (!newVal) setValue("supportType", "");
                            }}
                        >
                            <div className={cn(
                                "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all text-[#605F5F]",
                                needsSupport ? "left-[26px]" : "left-0.5"
                            )}></div>
                        </div>
                    </div>

                    {/* Desired Supports (Conditional) */}
                    {needsSupport && (
                        <div className="flex flex-col gap-2">
                            <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">حمایت های مدنظر</label>
                            <Controller
                                control={control}
                                name="supportType"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                        <SelectTrigger className={cn("w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] shadow-none focus:ring-0 focus:border-[#FDD00A] text-right", errors.supportType && "border-red-500")}>
                                            <SelectValue placeholder="انتخاب کنید" />
                                        </SelectTrigger>
                                        <SelectContent dir="rtl">
                                            <SelectItem value="حمایت مالی">حمایت مالی</SelectItem>
                                            <SelectItem value="تجهیزات فنی">تجهیزات فنی</SelectItem>
                                            <SelectItem value="فضای کار اختصاصی">فضای کار اختصاصی</SelectItem>
                                            <SelectItem value="منتورینگ تخصصی">منتورینگ تخصصی</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.supportType && <span className="text-xs text-red-500">{errors.supportType.message}</span>}
                        </div>
                    )}

                </div>

                {/* Next Button */}
                <div className="w-full pb-5 flex justify-end items-center gap-3.5 mt-4">
                    <button
                        type="submit"
                        className="flex-1 h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-2.5 hover:bg-[#e5c109] transition-colors"
                    >
                        <span className="text-center text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">ادامه</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default NewProject1;

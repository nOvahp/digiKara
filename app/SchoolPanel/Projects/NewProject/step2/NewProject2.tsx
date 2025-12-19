"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown, Sparkles } from "lucide-react";
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
const step2Schema = z.object({
    staffCount: z.string().min(1, "انتخاب تعداد نیروی انسانی الزامی است"),
    equipment: z.string().optional(), // Text areas can be optional or required. I'll make them optional but validate length if present.
    consumables: z.string().optional(),
});

type Step2FormValues = z.infer<typeof step2Schema>;

const NewProject2 = () => {
    const router = useRouter();
    const { updateProjectData, projectData } = useNewProject();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch
    } = useForm<Step2FormValues>({
        resolver: zodResolver(step2Schema),
        defaultValues: {
            staffCount: projectData.staffCount || "",
            equipment: projectData.equipment || "",
            consumables: projectData.consumables || "",
        },
    });

    const equipmentValue = watch("equipment");
    const consumablesValue = watch("consumables");

    const onSubmit = (data: Step2FormValues) => {
        updateProjectData(data);
        console.log("Step 2 Data:", data);
        router.push('/SchoolPanel/Projects/NewProject/step3');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full min-h-screen pb-24" dir="rtl">
            {/* Header */}
            <div className="w-full h-16 px-0 flex justify-between items-center bg-white border-b border-[#DFE1E7]">
                <div className="w-10"></div>
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

                    {/* Step 1: Basic Info (Done) */}
                    <div className="flex items-center gap-2.5 flex-shrink-0 opacity-50">
                        <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(1)}</span>
                        </div>
                        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">اطلاعات پایه</span>
                    </div>

                    <div className="w-8 h-[1px] bg-[#DFE1E7] flex-shrink-0"></div>

                    {/* Step 2: Resources (Active) */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                        <div className="w-6 h-6 bg-[#FDD00A] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold font-num-medium">{toFarsiNumber(2)}</span>
                        </div>
                        <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">منابع</span>
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
                <div className="flex flex-col gap-6 px-0">

                    {/* Human Resources */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb'] text-right">
                            تعداد نیروی انسانی مورد نیاز (پیش‌بینی اولیه)
                        </label>
                        <Controller
                            control={control}
                            name="staffCount"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                    <SelectTrigger className={cn("w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] shadow-none focus:ring-0 focus:border-[#FDD00A]", errors.staffCount && "border-red-500")}>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-2 border border-[#818898] rounded-sm"></div>
                                                <span className="text-[#818898] text-base font-semibold font-['PeydaWeb']">نفر</span>
                                            </div>
                                            <SelectValue placeholder="انتخاب کنید" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent dir="rtl">
                                        <SelectItem value="1">۱ نفر</SelectItem>
                                        <SelectItem value="2">۲ نفر</SelectItem>
                                        <SelectItem value="3">۳ نفر</SelectItem>
                                        <SelectItem value="4">۴ نفر</SelectItem>
                                        <SelectItem value="5">۵ نفر</SelectItem>
                                        <SelectItem value="more">بیشتر از ۵ نفر</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.staffCount && <span className="text-xs text-red-500">{errors.staffCount.message}</span>}
                    </div>

                    {/* Equipment Needed */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">تجهیزات مورد نیاز</label>

                            <div className="flex items-center gap-2">
                                <button type="button" className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-full hover:opacity-90 transition-opacity group shadow-[0px_2px_4px_rgba(59,130,246,0.2)]">
                                    <Sparkles className="w-3 h-3 text-white" />
                                    <span className="text-white text-[9px] font-bold font-['PeydaWeb']">تولید با هوش مصنوعی</span>
                                </button>
                                <span className="text-[#666D80] text-[10px] font-semibold font-['PeydaWeb']">هر مورد در یک خط</span>
                            </div>
                        </div>
                        <div className={cn("w-full h-[200px] bg-white rounded-xl border flex flex-col p-3", errors.equipment ? "border-red-500" : "border-[#DFE1E7]")}>
                            <textarea
                                {...register("equipment")}
                                className="w-full flex-1 resize-none outline-none text-[#0D0D12] text-sm font-['PeydaWeb'] placeholder-[#A4ACB9]"
                                dir="rtl"
                                placeholder="تجهیزات را وارد کنید..."
                            ></textarea>
                            <div className="w-full flex justify-end">
                                <span className="text-[#A4ACB9] text-xs font-light font-num-medium">{toFarsiNumber(equipmentValue?.length || 0)}/{toFarsiNumber(200)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Consumables */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-end">
                            <label className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">مواد مصرفی</label>

                            <div className="flex items-center gap-2">
                                <button type="button" className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] rounded-full hover:opacity-90 transition-opacity group shadow-[0px_2px_4px_rgba(59,130,246,0.2)]">
                                    <Sparkles className="w-3 h-3 text-white" />
                                    <span className="text-white text-[9px] font-bold font-['PeydaWeb']">تولید با هوش مصنوعی</span>
                                </button>
                                <span className="text-[#666D80] text-[10px] font-semibold font-['PeydaWeb']">هر مورد در یک خط</span>
                            </div>
                        </div>
                        <div className={cn("w-full h-[200px] bg-white rounded-xl border flex flex-col p-3", errors.consumables ? "border-red-500" : "border-[#DFE1E7]")}>
                            <textarea
                                {...register("consumables")}
                                className="w-full flex-1 resize-none outline-none text-[#0D0D12] text-sm font-['PeydaWeb'] placeholder-[#A4ACB9]"
                                dir="rtl"
                                placeholder="مواد مصرفی را وارد کنید..."
                            ></textarea>
                            <div className="w-full flex justify-end">
                                <span className="text-[#A4ACB9] text-xs font-light font-num-medium">{toFarsiNumber(consumablesValue?.length || 0)}/{toFarsiNumber(200)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Button */}
                <div className="w-full pb-0 px-0 flex justify-end items-center gap-3.5 mt-4">
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

export default NewProject2;

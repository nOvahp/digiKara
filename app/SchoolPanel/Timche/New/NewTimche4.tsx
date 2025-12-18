"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useNewTimche } from "./NewTimcheContext";
import { 
    ChevronLeft,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    studyField: z.string().min(1, "لطفا رشته تحصیلی را انتخاب کنید"),
    grade: z.string().min(1, "لطفا پایه تحصیلی را انتخاب کنید"),
    skill: z.string().min(1, "لطفا سطح مهارت را انتخاب کنید"),
});

type FormValues = z.infer<typeof formSchema>;

const NewTimche4 = () => {
    const router = useRouter();
    const { saveStep4, completeCreation } = useNewTimche();
    
    // Hardcoded step 4
    const step = 4;

    const steps = [
        { id: 1, title: "اطلاعات پایه" },
        { id: 2, title: "پروژه‌ها" },
        { id: 3, title: "اعضا" },
        { id: 4, title: "معیارها" },
    ];

    const { 
        control, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            studyField: "",
            grade: "",
            skill: ""
        }
    });

    const onCreateTimche = (data: FormValues) => {
        // Handle final submission logic here
        console.log("Creating Timche with data:", data);
        saveStep4(data);
        completeCreation();
        router.push('/SchoolPanel/Timche/New/Step5'); 
    };

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
                        <div key={s.id} className={cn("flex items-center gap-2.5", step !== s.id && "opacity-50")}>
                            <span className={cn(
                                "text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide whitespace-nowrap",
                                step === s.id ? "text-[#0D0D12]" : "text-[#818898]"
                            )}>
                                {s.title}
                            </span>
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center shadow-sm",
                                step === s.id ? "bg-[#FDD00A]" : "bg-[#DFE1E7]"
                            )}>
                                 <span className="text-white text-sm font-num-bold font-bold leading-[21px]">{s.id}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step 4 Content: Criteria */}
            <div className="w-full max-w-[440px] px-0 py-6 flex flex-col gap-6">
                
                {/* Description */}
                <p className="text-center text-[#0D0D12] text-base font-['PeydaWeb'] font-semibold leading-[21.6px]">
                    شرایط عضویت خودکار هنرجویان جدید را تعیین کنید.
                </p>

                {/* Form Fields */}
                <div className="flex flex-col gap-6">
                    
                    {/* Allowed Field of Study */}
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                            رشته تحصیلی مجاز
                        </label>
                        <Controller
                            control={control}
                            name="studyField"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                    <SelectTrigger className={cn(
                                        "w-full h-[52px] bg-white rounded-xl border focus:ring-0 text-right text-[#0D0D12] font-['PeydaWeb'] shadow-none px-3",
                                        errors.studyField ? "border-red-500 focus:border-red-500" : "border-[#DFE1E7] focus:border-[#FDD00A]"
                                    )}>
                                        <SelectValue placeholder="انتخاب کنید" />
                                    </SelectTrigger>
                                    <SelectContent className="text-right font-medium" dir="rtl">
                                        <SelectGroup>
                                            <SelectItem value="computer">شبکه و نرم‌افزار</SelectItem>
                                            <SelectItem value="graphics">گرافیک</SelectItem>
                                            <SelectItem value="accounting">حسابداری</SelectItem>
                                            <SelectItem value="architecture">معماری</SelectItem>
                                            <SelectItem value="electronics">الکترونیک</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.studyField && <span className="text-red-500 text-xs font-['PeydaWeb']">{errors.studyField.message}</span>}
                    </div>

                    {/* Grade Level */}
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                            پایه تحصیلی
                        </label>
                         <Controller
                            control={control}
                            name="grade"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                    <SelectTrigger className={cn(
                                        "w-full h-[52px] bg-white rounded-xl border focus:ring-0 text-right text-[#0D0D12] font-['PeydaWeb'] shadow-none px-3",
                                        errors.grade ? "border-red-500 focus:border-red-500" : "border-[#DFE1E7] focus:border-[#FDD00A]"
                                    )}>
                                        <SelectValue placeholder="انتخاب کنید" />
                                    </SelectTrigger>
                                    <SelectContent className="text-right font-medium" dir="rtl">
                                        <SelectGroup>
                                            <SelectItem value="10">دهم</SelectItem>
                                            <SelectItem value="11">یازدهم</SelectItem>
                                            <SelectItem value="12">دوازدهم</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.grade && <span className="text-red-500 text-xs font-['PeydaWeb']">{errors.grade.message}</span>}
                    </div>

                    {/* Minimum Skill Level */}
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-right text-[#666D80] text-sm font-['PeydaWeb'] font-semibold leading-[21px] tracking-wide">
                            حداقل سطح مهارت
                        </label>
                        <Controller
                            control={control}
                            name="skill"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                    <SelectTrigger className={cn(
                                        "w-full h-[52px] bg-white rounded-xl border focus:ring-0 text-right text-[#0D0D12] font-['PeydaWeb'] shadow-none px-3",
                                        errors.skill ? "border-red-500 focus:border-red-500" : "border-[#DFE1E7] focus:border-[#FDD00A]"
                                    )}>
                                        <SelectValue placeholder="انتخاب کنید" />
                                    </SelectTrigger>
                                    <SelectContent className="text-right font-medium" dir="rtl">
                                        <SelectGroup>
                                            <SelectItem value="beginner">مبتدی</SelectItem>
                                            <SelectItem value="intermediate">متوسط</SelectItem>
                                            <SelectItem value="advanced">پیشرفته</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.skill && <span className="text-red-500 text-xs font-['PeydaWeb']">{errors.skill.message}</span>}
                    </div>

                </div>

            </div>

            {/* Footer Buttons */}
             <div className="fixed bottom-0 w-full max-w-[440px] p-4 bg-white/80 backdrop-blur-sm border-t border-[#F0F0F0] mb-25 z-10">
                <div className="w-full flex gap-3.5">
                    <div 
                        onClick={handleSubmit(onCreateTimche)}
                        className="w-[279px] h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#e5c109] transition-colors shadow-sm"
                    >
                        <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold">ایجاد تیمچه</span>
                    </div>
                     <div 
                        onClick={() => router.back()}
                        className="flex-1 h-[57px] rounded-xl border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                         <span className="text-[#1A1C1E] text-lg font-['PeydaWeb'] font-semibold">قبلی</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NewTimche4;

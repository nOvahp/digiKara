
"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/app/StudentDashboard/layout/Navigation';

export default function CreateShopCharterPage() {
    const router = useRouter();

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center font-sans pb-24">
            
            {/* Header */}
            <div className="w-full max-w-md px-4 pt-4 flex flex-col items-center gap-4">
                {/* Top Bar with Back functionality */}
                <div className="w-full flex justify-between items-center relative h-11">
                    {/* Back Icon on Left */}
                    <Link href="/StudentDashboard/hojreCreation" className="p-1">
                        <ChevronRight className="w-6 h-6 text-[#222831] rotate-180" />
                    </Link>
                    
                    {/* Title on Right */}
                    <div className="text-[#0D0D12] text-xl font-semibold font-['PeydaWeb'] leading-snug">
                        ساخت حجره
                    </div>
                </div>

                {/* Steps Indicator */}
                <div className="w-full border-b border-[#DFE1E7] py-5 flex justify-end items-center gap-3 overflow-x-auto no-scrollbar">
                    
                    {/* Step 3 */}
                    <div className="flex justify-start items-center gap-2 shrinks-0 whitespace-nowrap">
                        <div className="text-[#818898] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
                            دسته بندی و محصول اولیه
                        </div>
                        <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center text-white text-sm font-bold font-['PeydaFaNum']">
                            3
                        </div>
                    </div>

                    {/* Dotted Line */}
                    <div className="w-8 border-t-2 border-dashed border-[#DFE1E7] mx-1 shrink-0" />

                    {/* Step 2 */}
                    <div className="flex justify-start items-center gap-2 shrink-0 whitespace-nowrap">
                        <div className="text-[#818898] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
                            هویت بصری و عمومی
                        </div>
                         <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center text-white text-sm font-bold font-['PeydaFaNum']">
                            2
                        </div>
                    </div>

                     {/* Dotted Line */}
                     <div className="w-8 border-t-2 border-dashed border-[#E0E0E0] mx-1 shrink-0" />

                     {/* Step 1 (Active) */}
                     <div className="flex justify-start items-center gap-2 shrink-0 whitespace-nowrap">
                        <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
                            منشور کارآفرینی
                        </div>
                        <div className="w-6 h-6 bg-[#FDD00A] rounded-full flex items-center justify-center text-white text-sm font-bold font-['PeydaFaNum']">
                            1
                        </div>
                    </div>

                </div>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 w-full max-w-md px-4 mt-6 flex flex-col gap-8 overflow-y-auto">
                
                {/* Intro */}
                <div className="flex flex-col items-end gap-2 text-right">
                    <h3 className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">مقدمه: هدف ما</h3>
                    <p className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
                        هدف این پلتفرم تنها کسب درآمد نیست؛ بلکه تمرینِ مسئولیت‌پذیری، مدیریت مالی و مهارت‌های کسب‌وکار در محیطی امن است. تمام کاربران ملزم به رعایت اصول اخلاقی و قانونی زیر هستند.
                    </p>
                </div>

                {/* Conditions */}
                <div className="flex flex-col items-end gap-2 text-right">
                    <h3 className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">شرایط عضویت و احراز هویت</h3>
                    <div className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
                        با توجه به اینکه اکثر کاربران زیر سن قانونی (۱۸ سال) هستند، رعایت موارد زیر الزامی است:
                        <br/>
                        <span className="font-semibold text-[#707F81]">احراز دانش‌آموزی: </span>
                        کاربر باید تصویر کارت دانش‌آموزی یا گواهی اشتغال به تحصیل معتبر سال جاری را بارگذاری کند.
                        <br/>
                        <span className="font-semibold text-[#707F81]">رضایت ولی قانونی: </span>
                        برای دانش‌آموزان زیر ۱۸ سال، فعالیت فروشگاه منوط به تایید الکترونیکی (OTP) یا بارگذاری فرم رضایت‌نامه توسط ولی قانونی (پدر یا جد پدری) است.
                        <br/>
                        <span className="font-semibold text-[#707F81]">حساب بانکی: </span>
                        تسویه حساب‌های مالی تنها به حساب بانکی به نام دانش‌آموز (در صورت داشتن کارت بانکی مستقل) یا حساب تایید شده ولی قانونی او واریز می‌شود.
                    </div>
                </div>

                 {/* Products Rules */}
                 <div className="flex flex-col items-end gap-2 text-right">
                    <h3 className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">قوانین محصولات و خدمات</h3>
                    <div className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
                        فروشگاه‌ها باید نماد خلاقیت و تلاش دانش‌آموز باشند.
                        <br/>
                        <span className="font-semibold text-[#707F81]">کالاهای مجاز: </span>
                        صنایع دستی، محصولات هنری، لوازم تحریر، جزوات آموزشی (تألیف خود دانش‌آموز)، خدمات فریلنسری (طراحی لوگو، تایپ)، و کالاهای بازرگانی.
                        <br/>
                        <span className="font-semibold text-[#707F81]">کالاهای ممنوعه: </span>
                        هرگونه کالا مغایر با قوانین جمهوری اسلامی ایران (مشروبات، سلاح، تصاویر نامناسب و...). فروش تقلب، حل‌المسائلِ تکالیف مدرسه یا هر خدمتی که به فرآیند آموزش آسیب بزند. کالاهای دیجیتال ناقض کپی‌رایت (فروش فیلم و نرم‌افزار کرک شده). مواد خوراکی بدون بسته‌بندی بهداشتی یا مجوز (مگر خوراکی‌های خانگی خشک با رعایت شیوه‌نامه بهداشتی پلتفرم).
                    </div>
                </div>

                {/* Content Framework */}
                <div className="flex flex-col items-end gap-2 text-right">
                    <h3 className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">چارچوب تولید محتوا و اخلاق حرفه‌ای</h3>
                    <div className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
                        اینجا مدرسه کسب‌وکار است؛ ادبیات و تصاویر باید فاخر و مناسب باشند.
                         <br/>
                        <span className="font-semibold text-[#707F81]">پوشش و تصاویر: </span>
                        تمام تصاویر محصول یا مدل‌ها باید با شئونات اسلامی و قوانین کشور مطابقت داشته باشد. استفاده از تصاویر ابزاری یا نامتعارف ممنوع است.
                        <br/>
                        <span className="font-semibold text-[#707F81]">ادبیات گفتاری: </span>
                        هرگونه توهین، تمسخر، یا استفاده از کلمات رکیک در بخش نظرات، چت با مشتری و توضیحات محصول منجر به مسدود شدن فروشگاه می‌شود.
                        <br/>
                        <span className="font-semibold text-[#707F81]">صداقت در تبلیغ: </span>
                        طبق قانون حمایت از حقوق مصرف‌کننده، توضیحات محصول باید دقیقاً مطابق با واقعیت باشد. اغراقِ دروغین (مثلاً: "ضد ضربه بودن" برای کالایی که نیست) تخلف محسوب می‌شود.
                    </div>
                </div>

                {/* Financial Rules */}
                <div className="flex flex-col items-end gap-2 text-right">
                    <h3 className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">قوانین مالی و تعهدات فروش</h3>
                    <div className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
                         <span className="font-semibold text-[#707F81]">کارمزد پلتفرم: </span>
                         درصدی از هر تراکنش (مثلاً ۵٪) به عنوان هزینه زیرساخت و آموزش کسر می‌شود. (این مورد باید شفاف به کاربر نمایش داده شود).
                        <br/>
                        <span className="font-semibold text-[#707F81]">تسویه حساب: </span>
                        مبلغ فروش تا زمان رسیدن کالا به دست مشتری و تایید او، نزد پلتفرم به امانت می‌ماند (پرداخت امن).
                        <br/>
                        <span className="font-semibold text-[#707F81]">قوانین مرجوعی: </span>
                        دانش‌آموز موظف است طبق قانون تجارت الکترونیک، تا ۷ روز کالای معیوب یا مغایر با توضیحات را پس بگیرد.
                    </div>
                </div>

                 {/* Responsibility & Education */}
                 <div className="flex flex-col items-end gap-2 text-right">
                    <h3 className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">مسئولیت‌پذیری و آموزش</h3>
                    <div className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
                         برای پر کردن گپ بین آموزش و بازار، این بخش مختص پلتفرم شماست:
                        <br/>
                        <span className="font-semibold text-[#707F81]">پاسخگویی: </span>
                        فروشنده موظف است حداکثر طی ۲۴ ساعت به سوالات خریداران پاسخ دهد.
                        <br/>
                        <span className="font-semibold text-[#707F81]">نظم در ارسال: </span>
                        تاخیر در ارسال کالا بیش از زمان تعیین شده، باعث کسر "امتیاز اعتبار" فروشگاه می‌شود.
                        <br/>
                        <span className="font-semibold text-[#707F81]">شرکت در دوره‌ها: </span>
                        برای ارتقای سطح فروشگاه (مثلاً گرفتن تیک آبی یا ویترین اول)، دانش‌آموز باید ویدئوهای آموزشی کوتاه پلتفرم (مثل نحوه قیمت‌گذاری، نحوه بسته‌بندی) را تماشا کند.
                    </div>
                </div>

                 {/* Privacy */}
                 <div className="flex flex-col items-end gap-2 text-right">
                    <h3 className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">حریم خصوصی و امنیت</h3>
                    <div className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
                        <span className="font-semibold text-[#707F81]">اطلاعات شخصی: </span>
                        دانش‌آموزان حق ندارند شماره تماس، آدرس یا اطلاعات شخصی خریداران را در جایی غیر از فرآیند ارسال کالا ذخیره یا منتشر کنند.
                        <br/>
                        <span className="font-semibold text-[#707F81]">ممنوعیت معامله خارج از پلتفرم: </span>
                        هرگونه هدایت مشتری به دایرکت اینستاگرام یا کارت‌به‌کارت برای فرار از کارمزد، منجر به بسته شدن فروشگاه می‌شود (چون امنیت خرید را از بین می‌برد).
                    </div>
                </div>

                {/* Continue Button */}
                <div className="w-full pb-4">
                    <button 
                        onClick={() => {
                            // Logic for next step would go here
                            console.log("Proceed to step 2");
                            // router.push('/StudentDashboard/create-shop/step2'); // Example
                            router.push('/StudentDashboard/hojreCreation/step3');
                        }}
                        className="w-full h-14 bg-[#FDD00A] active:bg-[#eac009] rounded-xl text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb'] flex items-center justify-center transition-colors"
                    >
                        ادامه
                    </button>
                </div>
            </div>

            <Navigation />
        </div>
    );
}

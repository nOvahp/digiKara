'use client';

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
          {/* Back Icon on Left - REMOVED per user request */}
          <div className="w-6 h-6" />

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
            <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center text-white text-sm font-num-medium">
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
            <div className="w-6 h-6 bg-[#DFE1E7] rounded-full flex items-center justify-center text-white text-sm font-num-medium">
              2
            </div>
          </div>

          {/* Dotted Line */}
          <div className="w-8 border-t-2 border-dashed border-[#E0E0E0] mx-1 shrink-0" />

          {/* Step 1 (Active) */}
          <div className="flex justify-start items-center gap-2 shrink-0 whitespace-nowrap">
            <div className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb'] leading-[21px] tracking-wide">
            قول و قرار ما
            </div>
            <div className="w-6 h-6 bg-[#FDD00A] rounded-full flex items-center justify-center text-white text-sm font-num-medium">
              1
            </div>
          </div>
        </div>
      </div>

      {/* Content Scroll Area */}
      <div className="flex-1 w-full max-w-md px-4 mt-6 flex flex-col gap-8 overflow-y-auto">
        {/* Greeting */}
        <div className="flex flex-col items-end gap-2 text-right">
          <p dir="rtl" className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
            <span className="font-semibold text-[#3C5A5D]">با درود به شما نوجوان آینده‌ساز؛</span>
            <br />
            ورود شما را به «دیجی‌کارا»، زیست‌بوم هوشمند کارآفرینی دانش‌آموزان ایران، تبریک می‌گوییم. این سکو نه‌تنها فضایی برای کسب درآمد، بلکه مدرسه‌ای واقعی برای تمرین مسئولیت‌پذیری، سواد مالی و مدیریت کسب‌وکارهای دیجیتال است.
            <br />
            در ادامه، «منشور اخلاق و تعهدات کارآفرین نوجوان» آورده شده است. مطالعه و تایید این منشور، گام اول شما برای تبدیل شدن به یک قطب تولیدی و کمک به شکوفایی اقتصاد ملی کشورمان است.
          </p>
        </div>

        {/* Intro */}
        <div className="flex flex-col items-end gap-2 text-right">
          <h3 className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">
            مقدمه: هدف ما و نقش شما
          </h3>
          <p dir="rtl" className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
            هدف اصلی این پلتفرم، ایجاد فرصتی درخشان برای آموزش مهارت‌های کاربردی و فراهم‌سازی بستری امن جهت عرضه دست‌ساخته‌ها و تولیدات خلاقانه شماست. ما باور داریم که شما دانش‌آموزان توانمند، با شناسایی نیازهای واقعی کشور و پیوند دادن مهارتهای خود به چرخه تولید، ستون‌های اصلی اقتصاد مولد و آینده روشن ایران اسلامی خواهید بود. اینجا بستری امن برای تمرینِ عزت‌نفس، انضباط مالی و تجربه‌ی لذت‌بخش «رزق حلال» در بستر فناوری‌های نوین است.
          </p>
        </div>

        {/* Conditions */}
        <div className="flex flex-col items-end gap-2 text-right">
          <h3 dir="rtl" className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">
            ۱. شرایط عضویت و احراز هویت (امنیت در زیست‌بوم)
          </h3>
          <div dir="rtl" className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
            با توجه به اهمیت امنیت شما در این فضای آموزشی، رعایت موارد زیر الزامی است:
            <br />
            <span className="font-semibold text-[#707F81]">احراز هویت هوشمند: </span>
            ورود شما از درگاه‌های رسمی آموزش و پرورش برای تایید هویت حرفه‌ای شما و ثبت در «پرونده الکترونیکی رشد» الزامی است.
            <br />
            <span className="font-semibold text-[#707F81]">همراهی والدین: </span>
            فعالیت شما به عنوان نوجوان کارآفرین، منوط به تایید الکترونیکی یا بارگذاری رضایت‌نامه ولی قانونی است تا پیوند میان‌نسلی و حمایت خانواده همواره پشتیبان رشد شما باشد.
            <br />
            <span className="font-semibold text-[#707F81]">شفافیت مالی: </span>
            تمام واریزی‌ها مطابق با قوانین بانکی و آموزشی کشور، به حساب تایید شده دانش‌آموز یا ولی قانونی وی انجام می‌پذیرد تا انضباط مالی از نخستین قدم تمرین شود.
          </div>
        </div>

        {/* Products Rules */}
        <div className="flex flex-col items-end gap-2 text-right">
          <h3 dir="rtl" className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">
            ۲. قوانین محصولات و خدمات (نماد خلاقیت شما)
          </h3>
          <div dir="rtl" className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
            فروشگاه شما باید آینه تلاش و نوآوری‌تان باشد:
            <br />
            <span className="font-semibold text-[#707F81]">کالاهای افتخارآفرین: </span>
            صنایع دستی، محصولات هنری، تولیدات کشاورزی، خدمات فنی و مهارتی، و دست‌سازه‌های خلاقانه که حاصل مهارت شما یا خانواده‌تان است، مورد حمایت ویژه هستند.
            <br />
            <span className="font-semibold text-[#707F81]">خط قرمزهای اخلاقی: </span>
            فروش هرگونه کالا یا خدماتی که به فرآیند آموزش آسیب بزند، کالاهای فاقد استاندارد بهداشتی، و محصولات ناقض قوانین کپی‌رایت یا شئونات اسلامی اکیداً ممنوع است.{' '}
            <span className="text-[#3C5A5D] underline cursor-pointer">مشاهده لیست ممنوعات</span>
          </div>
        </div>

        {/* Content Framework */}
        <div className="flex flex-col items-end gap-2 text-right">
          <h3 dir="rtl" className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">
            ۳. چارچوب تولید محتوا و اخلاق حرفه‌ای (محیط کسب‌وکار)
          </h3>
          <div dir="rtl" className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
            در دیجی‌کارا، ما حرفه‌ای‌گری را تمرین می‌کنیم:
            <br />
            <span className="font-semibold text-[#707F81]">فرهنگ و پوشش: </span>
            تصاویر محصولات و محتوای تبلیغاتی باید کاملاً با شئونات اسلامی و استانداردهای فاخر نظام تعلیم و تربیت مطابقت داشته باشد.
            <br />
            <span className="font-semibold text-[#707F81]">ادبیات گفتاری: </span>
            احترام به مشتری و استفاده از واژگان شایسته در چت و نظرات، نشانه شخصیت کارآفرین ایرانی است؛ هرگونه توهین منجر به محدودیت فعالیت خواهد شد.
            <br />
            <span className="font-semibold text-[#707F81]">صداقت، شرط برکت: </span>
            طبق اخلاق کسب‌وکارهای پیشرو، توضیحات محصول باید دقیق و صادقانه باشد. هرگونه اغراق ناصحیح، آسیب به اعتماد مشتری و هویت حرفه‌ای شماست.
          </div>
        </div>

        {/* Financial Rules */}
        <div className="flex flex-col items-end gap-2 text-right">
          <h3 dir="rtl" className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">
            ۴. قوانین مالی و تعهدات فروش (انصاف و مسئولیت)
          </h3>
          <div dir="rtl" className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
            <span className="font-semibold text-[#707F81]">تسهیم عادلانه: </span>
            درصدی از تراکنش‌ها طبق جدول مصوب (مثلاً ۵٪) جهت توسعه زیرساخت‌های آموزشی و حمایتی سامانه کسر می‌گردد.
            <br />
            <span className="font-semibold text-[#707F81]">امانت‌داری مالی: </span>
            مبلغ فروش تا زمان تایید نهایی خریدار نزد پلتفرم باقی می‌ماند تا امنیتِ معامله برای هر دو طرف تضمین شود.
            <br />
            <span className="font-semibold text-[#707F81]">حقوق مصرف‌کننده: </span>
            ما متعهد به قانون تجارت الکترونیک هستیم؛ لذا پذیرش مرجوعی کالای مغایر با توضیحات، بخشی از مسئولیت‌پذیری شماست.
          </div>
        </div>

        {/* Responsibility & Education */}
        <div className="flex flex-col items-end gap-2 text-right">
          <h3 dir="rtl" className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">
            ۵. مسئولیت‌پذیری و آموزش مستمر (مسیر حرفه‌ای شدن)
          </h3>
          <div dir="rtl" className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
            <span className="font-semibold text-[#707F81]">نظم و پاسخگویی: </span>
            پاسخ به سوالات مشتریان در کمتر از ۲۴ ساعت و ارسال به‌موقع کالا، امتیاز «اعتبار حرفه‌ای» شما را در سطح ملی ارتقا می‌دهد.
            <br />
            <span className="font-semibold text-[#707F81]">یادگیری مادام‌العمر: </span>
            برای ارتقای سطح حجره و دریافت «نشان‌های افتخار»، تماشای ویدئوهای میکرولرنینگ (بسته‌بندی، بازاریابی و...) بخشی از برنامه رشد شماست.
          </div>
        </div>

        {/* Privacy */}
        <div className="flex flex-col items-end gap-2 text-right">
          <h3 dir="rtl" className="text-[#3C5A5D] text-[15px] font-semibold font-['PeydaWeb'] text-right w-full">
            ۶. حریم خصوصی و امنیت داده‌ها
          </h3>
          <div dir="rtl" className="text-[#707F81] text-xs font-light font-['PeydaWeb'] leading-relaxed w-full">
            <span className="font-semibold text-[#707F81]">امانت‌داری اطلاعات: </span>
            اطلاعات خریداران نزد شما امانت است و استفاده از آن خارج از فرآیند ارسال کالا، تخلف محسوب می‌شود.
            <br />
            <span className="font-semibold text-[#707F81]">امنیت پلتفرمی: </span>
            انجام معامله خارج از درگاه امن سامانه، علاوه بر سلب امنیت خرید، موجب مسدود شدن همیشگی فروشگاه دانش‌آموزی خواهد شد.
          </div>
        </div>

        {/* Commitment Statement */}
        <div className="flex flex-col items-end gap-2 text-right bg-[#F5F7F7] rounded-xl p-4">
          <p dir="rtl" className="text-[#3C5A5D] text-xs font-semibold font-['PeydaWeb'] leading-relaxed w-full">
            با تایید این منشور، من متعهد می‌شوم که با تلاش، صداقت و نوآوری، در مسیر کارآفرینی گام بردارم و سهمی در شکوفایی ایران عزیزمان داشته باشم.
          </p>
        </div>

        {/* Continue Button */}
        <div className="w-full pb-4">
          <button
            onClick={() => {
              // Logic for next step would go here
              console.log('Proceed to step 2');
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

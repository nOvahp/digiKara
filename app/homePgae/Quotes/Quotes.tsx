import React from "react";
import QuotesCard from "./QuotesCard";

import QuotesIllustration from "./QuotesIllustration";

const Quotes = () => {
  return (
    <div className="w-[119.05%] -ml-[9.53%] py-10 px-5 lg:py-[60px] lg:pl-[325px] lg:pr-[80px] bg-[#E7E7E7] flex flex-col lg:flex-row relative gap-6 lg:gap-[68px]">
      <QuotesCard
        quote="به کمک دیجی‌کارا، هنرستان فارابی توانست با حذف فرایندهای پیچیده ، فروش محصولات خود را افزایش دهد و پرداخت‌های هنرجویان را به موقع انجام دهد."
        name="المیرا  محمدی"
        role=" هنرستان فارابی  - زنجان"
        imageSrc="/quoteAvatar1.jpg"
      />
      <QuotesCard
        quote="با دیجی‌کارا توانستیم بدون درگیر شدن با کاغذبازی، پروژه‌های تولیدی را شفاف مدیریت کنیم و درآمد هنرجویان را در زمان کوتاه‌تری تسویه کنیم."
        name="دکتر بهروز حسینی"
        role="مدیر هنرستان فنی «البرز» - تهران"
        imageSrc="/quoteAvatar2.jpg"
      />
      <QuotesIllustration />
    </div>
  );
};

export default Quotes;

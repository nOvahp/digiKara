import React from 'react';
import QuotesCard from './QuotesCard';
import QuotesIllustration from './QuotesIllustration';
import { quotesData } from './quotesData';

const Quotes = () => {
  return (
    <div className="w-screen relative left-[50%] right-[50%] -mx-[50vw] py-10 px-4 lg:py-[60px] lg:pl-[325px] lg:pr-[80px] bg-[#E7E7E7] flex flex-col lg:flex-row gap-6 lg:gap-[68px]">
      {quotesData.map((item, index) => (
        <QuotesCard
          key={index}
          quote={item.quote}
          name={item.name}
          role={item.role}
          imageSrc={item.imageSrc}
        />
      ))}
      <QuotesIllustration />
    </div>
  );
};

export default Quotes;

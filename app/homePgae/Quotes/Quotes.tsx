import React from "react";
import QuotesCard from "./QuotesCard";
import QuotesIllustration from "./QuotesIllustration";
import { quotesData } from "./quotesData";

const Quotes = () => {
  return (
    <div className="w-[110.05%] -ml-[4.53%] py-10 px-0 lg:py-[60px] lg:pl-[325px] lg:pr-[80px] bg-[#E7E7E7] flex flex-col lg:flex-row relative gap-6 lg:gap-[68px]">
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

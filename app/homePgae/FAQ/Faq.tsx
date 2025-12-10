"use client";
import React, { useState } from "react";
import FaqCard from "./faqCard";
import { faqData } from "./faqData";

const Faq = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full h-full py-20 px-5 md:px-20 flex flex-col justify-start items-center gap-20">
      <div className="text-right text-[#222325] text-4xl md:text-6xl  font-black leading-[72px] ">
        سوالات متداول
      </div>
      <div className="w-full max-w-5xl flex flex-col justify-start items-start gap-10">
        {faqData.map((item, index) => (
          <React.Fragment key={index}>
            <FaqCard
              question={item.question}
              answer={item.answer}
              isOpen={openIndices.includes(index)}
              onClick={() => toggleFaq(index)}
            />
            {index < faqData.length - 1 && (
              <div className="self-stretch h-px bg-[#222325]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Faq;

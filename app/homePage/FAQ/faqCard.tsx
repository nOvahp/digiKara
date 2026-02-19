import React from 'react';

interface FaqCardProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      <div
        className="self-stretch flex justify-end items-start gap-4 cursor-pointer"
        onClick={onClick}
      >
        <div className="text-[#222325] text-lg md:text-2xl  font-black leading-7 md:leading-[28.80px] text-right flex-1 pt-1.5">
          {question}
        </div>
        <div
          className={`w-10 h-10 relative shrink-0 border-2 border-[#5e6b7e] rounded-[2px] flex items-center justify-center transition-colors ${
            isOpen ? 'bg-transparent' : 'bg-transparent'
          }`}
        >
          {!isOpen ? (
            <>
              <div className="w-4 h-1 absolute bg-[#222325] rounded-md transition-transform duration-300" />
              <div className="w-4 h-1 absolute bg-[#222325] rounded-md rotate-90 transition-transform duration-300" />
            </>
          ) : (
            <>
              <div className="w-4 h-1 absolute bg-[#808080] rounded-md transition-transform duration-300" />
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="self-stretch pr-0 md:pr-16 flex justify-start items-start gap-2">
          <div className="flex-1 text-right text-[#808080] text-base md:text-lg font-medium leading-[27px] ">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqCard;

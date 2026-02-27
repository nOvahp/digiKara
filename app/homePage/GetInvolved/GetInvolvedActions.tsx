import React from 'react';

const GetInvolvedActions = () => {
  return (
    <div className="flex flex-wrap justify-center w-full items-center gap-4">
      <button
        type="button"
        className="bg-[#FBCE09] text-[#4A4A4A] h-11 px-6 rounded-xl shadow-sm ring-1 ring-[#E5E5E5] font-extrabold text-sm xl:text-base cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        مشاهده دمو
      </button>

      <button
        type="button"
        className="bg-[#0A33FF] text-white h-11 px-6 rounded-xl shadow-sm ring-1 ring-[#E5E5E5] font-extrabold text-sm xl:text-base cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        ثبتنام رایگان مدارس
      </button>
    </div>
  );
};

export default GetInvolvedActions;

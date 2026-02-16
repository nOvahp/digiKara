import React from 'react';
import GetInvolvedContent from './GetInvolvedContent';
import GetInvolvedActions from './GetInvolvedActions';
import GetInvolvedImage from './GetInvolvedImage';

const GetInvolved = () => {
  return (
    <div className="mb-[6%] w-full h-auto lg:h-[500px] 2xl:h-[650px] relative flex flex-col lg:flex-row items-center gap-10 py-5 px-5 overflow-hidden">
      <div className="flex flex-col justify-center items-start gap-16 z-10 lg:w-[70%] lg:max-w-4xl 2xl:max-w-5xl">
        <GetInvolvedContent />
        <GetInvolvedActions />
      </div>

      <GetInvolvedImage />
    </div>
  );
};

export default GetInvolved;

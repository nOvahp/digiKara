import React from 'react';

export function FormLabel({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div
      className={`w-full text-right text-[#666D80] text-sm font-semibold leading-[21px] tracking-wide ${className}`}
    >
      {text}
    </div>
  );
}

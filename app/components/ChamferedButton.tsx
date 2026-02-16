'use client';

import React, { useState } from 'react';

interface ChamferedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  borderColor?: string;
  backgroundColor?: string;
  hoverColor?: string;
  cutSide?: 'left' | 'right';
}

const ChamferedButton: React.FC<ChamferedButtonProps> = ({
  children,
  className = '',
  onClick,
  borderColor = '#5E6B7E',
  backgroundColor = 'white',
  hoverColor = '#e2e3e3',
  cutSide = 'right',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const maskGradient =
    cutSide === 'left'
      ? 'linear-gradient(135deg, transparent 10px, black 10px)'
      : 'linear-gradient(225deg, transparent 10px, black 10px)';

  const borderRadius = cutSide === 'left' ? '0px 6px 6px 6px' : '6px 0px 6px 6px';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-block p-[2px] cursor-pointer group ${className}`}
      style={{
        borderRadius: borderRadius,
        background: borderColor,
        WebkitMask: maskGradient,
        mask: maskGradient,
      }}
    >
      <div
        className="w-full h-full flex items-center justify-center transition-colors duration-200"
        style={{
          borderRadius: '4px',
          background: isHovered ? hoverColor : backgroundColor,
          WebkitMask: maskGradient,
          mask: maskGradient,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ChamferedButton;

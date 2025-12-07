"use client";

import React, { useState } from "react";

interface ChamferedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  borderColor?: string;
  backgroundColor?: string;
  hoverColor?: string;
  cutSide?: "left" | "right";
}

const ChamferedButton: React.FC<ChamferedButtonProps> = ({
  children,
  className = "",
  onClick,
  borderColor = "#5E6B7E",
  backgroundColor = "white",
  hoverColor = "#e2e3e3",
  cutSide = "right",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine styles based on cutSide
  const maskGradient =
    cutSide === "left"
      ? "linear-gradient(135deg, transparent 10px, black 10px)" // Cut Top-Left
      : "linear-gradient(225deg, transparent 10px, black 10px)"; // Cut Top-Right

  const borderRadius =
    cutSide === "left"
      ? "0px 6px 6px 6px" // Top-Left is 0/flat
      : "6px 0px 6px 6px"; // Top-Right is 0/flat usually?
  // Wait, standard order: TL TR BR BL
  // My previous code: "6px" was global.
  // If I want smooth corners elsewhere:
  // Right Cut (Default): TL=6, TR=0 (cut), BR=6, BL=6. -> "6px 0px 6px 6px"
  // Left Cut: TL=0 (cut), TR=6, BR=6, BL=6. -> "0px 6px 6px 6px"

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
          borderRadius: "4px", // Inner matches generally, or we can fine tune. leaving generic 4px or matching logic?
          // If we mask the inner div too, the inner radius at the cut doesn't matter as much (it gets cut),
          // but keeping it small prevents bleeding.
          // Let's use similar logic for inner slightly separate if specific perfection needed,
          // but "4px" generic is usually fine as mask handles the cut.
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

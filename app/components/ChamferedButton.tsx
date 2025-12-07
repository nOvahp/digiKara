import React from "react";

interface ChamferedButtonProps {
  children: React.ReactNode;
  className?: string; // For margin/positioning of the container
  onClick?: () => void;
}

const ChamferedButton: React.FC<ChamferedButtonProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block p-[2px] cursor-pointer group ${className}`}
      style={{
        // Define the outer shape (Border)
        borderRadius: "6px",
        background: "#5E6B7E",
        // Mask cuts the TR corner
        WebkitMask: "linear-gradient(225deg, transparent 10px, black 10px)",
        mask: "linear-gradient(225deg, transparent 10px, black 10px)",
      }}
    >
      <div
        className="w-full h-full flex items-center justify-center bg-white group-hover:bg-[#e2e3e3] transition-colors"
        style={{
          // Define the inner shape (Content)
          borderRadius: "4px",
          // Inner mask slightly smaller cutoff to match border thickness logic if desired,
          // but same angle usually looks cleanest layout-wise with constant padding.
          // Actually, if we use the same mask, the border width at the cut is determined by the padding amount (2px)
          // and the fact that we mask both.
          WebkitMask: "linear-gradient(225deg, transparent 10px, black 10px)",
          mask: "linear-gradient(225deg, transparent 10px, black 10px)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ChamferedButton;

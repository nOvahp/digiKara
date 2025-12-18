import React from "react";
import Image from "next/image";

interface SolutionsImageProps {
  className?: string;
}

const SolutionsImage = ({ className }: SolutionsImageProps) => {
  return (
    <div className={`relative ${className} w-full h-full`}>
      <Image
        src="/man works behind holographic displays.png"
        alt="Solutions Graphic"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};

export default SolutionsImage;

import Image, { StaticImageData } from 'next/image';
import headerImg from '../../public/logInNew1.png';
import { ChevronLeft } from 'lucide-react';

interface LoginHeaderProps {
  imageSrc: string | StaticImageData;
  overlayImageSrc?: string;
  onBack?: () => void;
}

export function LoginHeader({ imageSrc, overlayImageSrc, onBack }: LoginHeaderProps) {
  return (
    <div className="relative w-full h-auto z-0 mb-16">
      <Image src={imageSrc} alt="Login Header" className="w-full h-auto object-cover" priority />
      {/* Overlay Image */}
      {overlayImageSrc && (
        <div className="absolute bottom-[-12%] left-[17%] h-[280px] w-[280px]">
          <Image src={overlayImageSrc} alt="Overlay Image" fill className="object-contain" />
        </div>
      )}

      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-24 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100/20 transition-all text-[#393E46] z-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

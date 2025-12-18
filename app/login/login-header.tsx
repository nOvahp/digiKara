import Image, { StaticImageData } from "next/image"
import headerImg from "../../public/logInNew1.png"



interface LoginHeaderProps {
  imageSrc: string | StaticImageData;
  overlayImageSrc?: string;
  imageClassName?: string;
}

export function LoginHeader({ 
  imageSrc,
  overlayImageSrc,
  imageClassName
}: LoginHeaderProps) {
  return (
    <div className="relative w-screen h-auto ml-[calc(50%-50vw)] -mt-20 z-0 mb-16">
      <Image
        src={imageSrc}
        alt="Login Header"
        className={`w-full h-auto object-contain ${imageClassName || ""}`}
        priority
      />
      {/* Overlay Image */}
      {overlayImageSrc && (
        <div className="absolute bottom-[-12%] left-[17%] h-[280px] w-[280px]">
          <Image
            src={overlayImageSrc}
            alt="Overlay Image"
            fill
            className="object-contain"
          />
        </div>
      )}
    </div>
  )
}

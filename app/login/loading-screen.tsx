import Image from "next/image"

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-4 animate-pulse">
        {/* Logo */}
        <div className="relative h-24 w-24">
          <Image
            src="/Logo.svg"
            alt="Digikala Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* Text */}
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
          دیجی کارا
        </h1>
      </div>
    </div>
  )
}

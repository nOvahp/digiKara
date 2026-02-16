import Image from 'next/image';

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-4 animate-pulse">
        {/* Logo */}
        <div className="relative h-44 w-44">
          <Image src="/Logo.svg" alt="Digikala Logo" fill className="object-contain" priority />
        </div>
      </div>
    </div>
  );
}

"use client"

import Image from "next/image"
import headerImg from "../../public/Header2.png"
import { LoginHeader } from "./login-header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Logo from "../../public/Logo11.svg"
import AmuzeshLogo from "../../public/amuzeshLogo.svg"
import Asset1 from "../../public/Asset 1 1.png"

export function Login({ onNext }: { onNext?: () => void }) {
  return (
    <div className="flex h-full w-full flex-col">
      <LoginHeader imageSrc={headerImg} />
      <div className="flex flex-col items-center justify-start bg-background rounded-t-3xl z-10 p-6 pt-0 gap-4">

        <Button onClick={onNext} className="w-full bg-[#F3F6FC] hover:bg-zinc-800 text-[#393E46] font-bold py-6 text-lg rounded-xl">
          ورود با شماره تماس
        </Button>

        <div className="flex items-center w-full gap-2">
          <div className="h-[1px] bg-gray-200 flex-1"></div>
          <span className="text-gray-400 text-sm">یا</span>
          <div className="h-[1px] bg-gray-200 flex-1"></div>
        </div>

        <Button onClick={onNext} variant="outline" className="w-full border-2 border-[#DCE4E8] text-[#393E46] font-bold py-6 text-lg rounded-xl hover:bg-gray-50">
          ورود با حساب دانش آموزی
        </Button>



        <div className="flex items-center gap-4 mb-2">

          <Image src={AmuzeshLogo} alt="Amuzesh Logo" width={80} height={80} />
          <Image src={Asset1} alt="Amuzesh Logo" width={60} height={60} />
          <Image src={Logo} alt="Logo" width={60} height={60} />
        </div>

        <div className="flex items-center gap-1 mb-0">
          <Link href="#" onClick={onNext} className="text-[#393E46] font-bold">
            ورود با شماره تماس
          </Link>
          <span className="text-[#6C7278]">حساب کاربری دارید؟</span>

        </div>

      </div>
    </div>
  )
}

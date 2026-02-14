"use client"

import Image from "next/image"
import headerImg from "../../public/Header2.png"
import { LoginHeader } from "./login-header"
import { useAuth } from "@/app/providers/AuthProvider"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Logo from "../../public/Logo11.svg"
import AmuzeshLogo from "../../public/amuzeshLogo.svg"
import Asset1 from "../../public/Asset 1 1.png"

export function Login({ onNext, onBack }: { onNext?: () => void; onBack?: () => void }) {
  const router = useRouter();
  const { setRole } = useAuth();

  const handleRoleSelect = (role: 'student' | 'manager' | 'customer') => {
      setRole(role);
      if (onNext) onNext();
  }

  return (
    <div className="flex h-full w-full flex-col p-4">
      <LoginHeader imageSrc={headerImg} onBack={onBack} />
      <div className="flex flex-col items-center justify-start bg-background rounded-t-3xl z-10 p-0 pt-0 gap-4">
        
        <div className="w-full text-right mb-2">
            <h2 className="text-xl font-black text-[#393E46]">خوش آمدید</h2>
            <p className="text-[#6C7278] text-sm mt-1">لطفا نقش خود را انتخاب کنید</p>
        </div>
        <Button onClick={() => handleRoleSelect('customer')} variant="outline"  className="w-full border-2 border-[#DCE4E8] text-[#393E46] font-bold py-8 text-lg rounded-2xl hover:bg-gray-50 hover:border-gray-300">
          ورود به بازارچه
        </Button>
        <Button onClick={() => handleRoleSelect('student')} className="w-full bg-[#F3F6FC] hover:bg-[#FDD00A] hover:text-[#1A1C1E] text-[#393E46] font-bold py-8 text-lg rounded-2xl transition-all shadow-sm border border-transparent hover:border-[#FDD00A]">
          ورود دانش آموز
        </Button>

        <Button onClick={() => handleRoleSelect('manager')} variant="outline" className="w-full border-2 border-[#DCE4E8] text-[#393E46] font-bold py-8 text-lg rounded-2xl hover:bg-gray-50 hover:border-gray-300">
          ورود مدیر مدرسه
        </Button>

        
        
        {/*
        <Button onClick={onNext}  className="w-full bg-[#F3F6FC] border-2 border-[#DCE4E8] text-[#393E46] font-bold py-6 text-lg rounded-xl hover:bg-gray-50 mb-4">
          ورود با حساب شاد
        </Button>
        */}

        <div className="flex items-center gap-7 mt-8 mb-2 opacity-80  hover:grayscale-0 transition-all duration-500">
          <Image src={Logo} alt="Logo" width={50} height={50} />
          <Image src={Asset1} alt="Amuzesh Logo" width={50} height={50} />
          <Image src={AmuzeshLogo} alt="Amuzesh Logo" width={80} height={80} />
        </div>

      </div>
    </div>
  )
}

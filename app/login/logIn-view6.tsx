"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import headerImg from "../../public/OtpHeader.png";
// import Image from "next/image";
import { LoginHeader } from "./login-header";
import {
  BookOpen,
  Package,
  ShoppingCart,
  Code2,
  Zap,
  Palette,
  Music,
} from "lucide-react";

interface LoginViewProps {
  onNext?: () => void;
}

export function LoginView6({ onNext }: LoginViewProps) {
  // const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    {
      id: "skill-training",
      title: "آموزش مهارت",
      subtitle: "یادگیری مهارات جدید",
      icon: BookOpen,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "product-production",
      title: "تولید محصول",
      subtitle: "ایجاد و طراحی محصولات",
      icon: Package,
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "product-sales",
      title: "فروش محصول",
      subtitle: "فروش و بازاریابی",
      icon: ShoppingCart,
      color: "from-orange-400 to-orange-600",
    },
    {
      id: "computer-web",
      title: "کامپیوتر / وبسایت",
      subtitle: "برنامه‌نویسی و توسعه وب",
      icon: Code2,
      color: "from-green-400 to-green-600",
    },
    {
      id: "ai",
      title: "هوش مصنوعی",
      subtitle: "یادگیری ماشین و هوش مصنوعی",
      icon: Zap,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: "art",
      title: "هنری",
      subtitle: "هنرهای تجسمی و گرافیکی",
      icon: Palette,
      color: "from-pink-400 to-pink-600",
    },
    {
      id: "music",
      title: "موسیقی",
      subtitle: "آموزش و تولید موسیقی",
      icon: Music,
      color: "from-indigo-400 to-indigo-600",
    },
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleContinue = () => {
    if (selectedInterests.length >= 2) {
      console.log("Selected Interests:", selectedInterests);
      if (onNext) {
        onNext();
      }
    }
  };

  const isValid = selectedInterests.length >= 2;

  return (
    <div className="flex h-full w-full flex-col">
      <LoginHeader imageSrc={headerImg} />

      {/* Header Content */}
      <div className="absolute top-0 left-0 right-0 mx-auto w-full max-w-[440px] px-10 pt-15 z-10 flex flex-col gap-8">
        <div className="w-full flex justify-end items-center">
          <span className="text-[#393E46] text-lg font-black">دیجی کارا</span>
        </div>

        {/* Title Section */}
        <div className="flex flex-col gap-4 text-right">
          <h1 className="text-[#393E46] text-4xl font-black leading-tight">
            علاقه مندی های شما
          </h1>
          <p className="text-[#393E46] text-sm font-semibold">
            حداقل 2 مورد را انتخاب کنید
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[440px] mx-auto px-6 mt-12 z-10 flex flex-col gap-4 flex-1 pb-24">
        {/* Interests Grid */}
        <div className="grid grid-cols-1 gap-4">
          {interests.map((interest) => {
            const IconComponent = interest.icon;
            const isSelected = selectedInterests.includes(interest.id);

            return (
              <div
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                  isSelected
                    ? "border-[#FDD00A] bg-[#FFFBEB] shadow-md"
                    : "border-[#DCE4E8] bg-white hover:border-[#B8C5CC]"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Left: Checkbox */}
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                    <div
                      className={`w-6 h-6 rounded-lg border-2 transition-colors ${
                        isSelected
                          ? "border-[#FDD00A] bg-[#FDD00A]"
                          : "border-[#D1D1D6]"
                      }`}
                    ></div>
                    {isSelected && (
                      <div className="absolute w-2 h-2.5 border-r-2 border-b-2 border-white rotate-45 translate-x-0.5 -translate-y-0.5"></div>
                    )}
                  </div>

                  {/* Center: Text */}
                  <div className="flex-1 text-right">
                    <p className="text-[#393E46] text-base font-bold">
                      {interest.title}
                    </p>
                    <p className="text-[#6C7278] text-xs font-medium">
                      {interest.subtitle}
                    </p>
                  </div>

                  {/* Right: Icon */}
                  <div
                    className={`w-12 h-12 rounded-full bg-linear-to-br ${interest.color} flex items-center justify-center shrink-0 text-white`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Count */}
        <div className="mt-4 p-3 bg-[#F3F6FC] rounded-lg border border-[#DCE4E8]">
          <p className="text-[#6C7278] text-sm font-semibold text-center">
            {selectedInterests.length} مورد انتخاب شده
            {selectedInterests.length < 2 && (
              <span className="text-red-500"> - حداقل 2 مورد لازم است</span>
            )}
          </p>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[440px] mx-auto p-6 bg-transparent z-50">
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full h-[57px] rounded-xl flex items-center justify-center gap-2 transition-colors text-lg font-semibold shadow-sm ${
            isValid
              ? "bg-[#FDD00A] hover:bg-[#e5bc09] text-[#1A1C1E] cursor-pointer"
              : "bg-[#E0E0E0] text-[#999999] cursor-not-allowed"
          }`}
        >
          ادامه
        </button>
        {!isValid && (
          <p className="text-center text-red-500 text-xs font-medium mt-2">
            لطفا حداقل 2 مورد را انتخاب کنید
          </p>
        )}
      </div>
    </div>
  );
}

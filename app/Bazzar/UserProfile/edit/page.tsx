'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  User,
  Phone,
  FileText,
  Lock,
  Save,
  Loader2,
  MapPin,
  School,
  GraduationCap
} from 'lucide-react';
import { bazzarService, UserProfile } from '@/app/services/bazzarService';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { toast } from 'sonner';

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'password'>('info');

  // Profile State
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  // Password State
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await bazzarService.getUserProfile();
        if (response && response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        toast.error('خطا در دریافت اطلاعات کاربری');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await bazzarService.updateProfile(formData);
      if (response && (response.status === 'success' || response.data)) {
        toast.success('اطلاعات با موفقیت بروزرسانی شد');
        router.refresh();
        router.back();
      } else {
        toast.error(response?.message || 'خطا در بروزرسانی اطلاعات');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('خطا در ارتباط با سرور');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.password_confirmation) {
      toast.error('تکرار رمز عبور مطابقت ندارد');
      return;
    }
    setSaving(true);
    try {
      const response = await bazzarService.updatePassword(passwordData);
      if (response && response.status === 'success') {
        toast.success('رمز عبور با موفقیت تغییر کرد');
        setPasswordData({
          current_password: '',
          password: '',
          password_confirmation: '',
        });
      } else {
        toast.error(response?.message || 'خطا در تغییر رمز عبور');
      }
    } catch (error) {
      console.error('Update password error:', error);
      toast.error('خطا در ارتباط با سرور');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[100dvh] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#FDD00A]" />
          <span className="text-gray-500 text-sm font-['PeydaWeb']">در حال دریافت اطلاعات...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100dvh] bg-white flex flex-col items-center relative" dir="rtl">
      {/* Header */}
      <div className="w-full max-w-[480px] sticky top-0 z-50 flex justify-between items-center px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <span className="text-[#0C1415] text-[17px] font-['PeydaWeb'] font-bold">ویرایش پروفایل</span>
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
        </button>
      </div>

      <div className="w-full max-w-[480px] p-5 pb-32 flex flex-col gap-6">
        {/* Avatar Section (Read-only for now or add upload logic later) */}
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#FDD00A] to-[#ffeaa7]">
            <div className="w-full h-full rounded-full bg-white p-0.5 overflow-hidden relative">
              {formData.image ? (
                <Image
                  src={formData.image}
                  alt="Profile"
                  fill
                  className="object-cover rounded-full"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-300" />
                </div>
              )}
            </div>
            {/* Camera Icon for upload could go here */}
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-['PeydaWeb'] font-bold text-[#0D0D12]">
              {formData.firstname} {formData.lastname}
            </h2>
            <span className="text-sm text-gray-500 font-num-medium">{formData.phone}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full p-1 bg-gray-100 rounded-xl flex items-center">
          <button
            onClick={() => setActiveTab('info')}
            className={cn(
              "flex-1 h-9 rounded-lg text-sm font-['PeydaWeb'] font-medium transition-all duration-200",
              activeTab === 'info' ? "bg-white shadow-sm text-[#0D0D12]" : "text-[#666D80] hover:bg-gray-200/50"
            )}
          >
            اطلاعات کاربری
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={cn(
              "flex-1 h-9 rounded-lg text-sm font-['PeydaWeb'] font-medium transition-all duration-200",
              activeTab === 'password' ? "bg-white shadow-sm text-[#0D0D12]" : "text-[#666D80] hover:bg-gray-200/50"
            )}
          >
            تغییر رمز عبور
          </button>
        </div>

        {/* Info Form */}
        {activeTab === 'info' && (
          <form onSubmit={handleProfileUpdate} className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="نام"
                icon={User}
                value={formData.firstname}
                onChange={(val) => setFormData({ ...formData, firstname: val })}
              />
              <InputField
                label="نام خانوادگی"
                icon={User}
                value={formData.lastname}
                onChange={(val) => setFormData({ ...formData, lastname: val })}
              />
            </div>

            <InputField
              label="شماره موبایل"
              icon={Phone}
              value={formData.phone}
              disabled
              dir="ltr"
            />
             <InputField
              label="کد ملی"
              icon={FileText}
              value={formData.national_code}
              onChange={(val) => setFormData({ ...formData, national_code: val })}
              dir="ltr"
            />

            <div className="w-full h-px bg-gray-100 my-1" />
            <h3 className="text-sm font-bold text-[#0D0D12] mb-2 px-1">اطلاعات تکمیلی</h3>

            <InputField
              label="نام مدرسه"
              icon={School}
              value={formData.school}
              onChange={(val) => setFormData({ ...formData, school: val })}
            />
             <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="پایه تحصیلی"
                  icon={GraduationCap}
                  value={formData.grade}
                  onChange={(val) => setFormData({ ...formData, grade: val })}
                />
                 <InputField
                  label="رشته تحصیلی"
                  icon={GraduationCap}
                  value={formData.field}
                  onChange={(val) => setFormData({ ...formData, field: val })}
                />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <InputField
                    label="استان"
                    icon={MapPin}
                    value={formData.province}
                    onChange={(val) => setFormData({ ...formData, province: val })}
                />
                <InputField
                    label="شهر"
                    icon={MapPin}
                    value={formData.city}
                    onChange={(val) => setFormData({ ...formData, city: val })}
                />
             </div>
             
             <InputField
                  label="منطقه"
                  icon={MapPin}
                  value={formData.district}
                  onChange={(val) => setFormData({ ...formData, district: val })}
              />

            <button
              type="submit"
              disabled={saving}
              className="w-full h-12 mt-4 bg-[#FDD00A] hover:bg-[#eaca0a] text-[#1A1C1E] rounded-xl font-['PeydaWeb'] font-bold text-sm shadow-lg shadow-[#FDD00A]/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  در حال ذخیره...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  ذخیره تغییرات
                </>
              )}
            </button>
          </form>
        )}

        {/* Password Form */}
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordUpdate} className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 mb-2">
              <p className="text-xs text-amber-800 font-['PeydaWeb'] leading-relaxed">
                لطفاً برای تغییر رمز عبور، ابتدا رمز عبور فعلی خود را وارد کنید. رمز عبور جدید باید حداقل ۸ کاراکتر باشد.
              </p>
            </div>

            <InputField
              label="رمز عبور فعلی"
              icon={Lock}
              type="password"
              value={passwordData.current_password}
              onChange={(val) => setPasswordData({ ...passwordData, current_password: val })}
              dir="ltr"
            />

            <div className="w-full h-px bg-gray-100 my-1" />

            <InputField
              label="رمز عبور جدید"
              icon={Lock}
              type="password"
              value={passwordData.password}
              onChange={(val) => setPasswordData({ ...passwordData, password: val })}
              dir="ltr"
            />

            <InputField
              label="تکرار رمز عبور جدید"
              icon={Lock}
              type="password"
              value={passwordData.password_confirmation}
              onChange={(val) => setPasswordData({ ...passwordData, password_confirmation: val })}
              dir="ltr"
            />

            <button
              type="submit"
              disabled={saving}
              className="w-full h-12 mt-4 bg-[#0D0D12] hover:bg-[#2C2C2E] text-white rounded-xl font-['PeydaWeb'] font-bold text-sm shadow-lg shadow-black/10 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  در حال پردازش...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  تغییر رمز عبور
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const InputField = ({
  label,
  value,
  onChange,
  icon: Icon,
  type = 'text',
  disabled = false,
  placeholder = '',
  dir = 'rtl',
}: {
  label: string;
  value?: string | number;
  onChange?: (val: string) => void;
  icon: any;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  dir?: 'rtl' | 'ltr';
}) => (
  <div className="w-full space-y-2">
    <label className="text-sm font-['PeydaWeb'] text-[#666D80] font-medium flex items-center gap-1.5">
      <Icon className="w-4 h-4 text-gray-400" />
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        dir={dir}
        className={cn(
          "w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm text-[#0D0D12] font-medium focus:bg-white focus:border-[#FDD00A] focus:ring-1 focus:ring-[#FDD00A] transition-all outline-none",
          disabled && "opacity-60 cursor-not-allowed bg-gray-100",
          dir === 'ltr' ? 'text-left font-sans' : "text-right font-['PeydaWeb']"
        )}
      />
    </div>
  </div>
);

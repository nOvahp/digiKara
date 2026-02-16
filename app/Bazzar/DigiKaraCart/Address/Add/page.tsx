'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { bazzarService, Province, City } from '@/app/services/bazzarService';
import { toast } from 'sonner';

export default function AddAddressPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  interface AddressFormData {
    title: string;
    address: string;
    postal_code: string;
    province_id: number | '';
    city_id: number | '';
  }

  const [formData, setFormData] = useState<AddressFormData>({
    title: '',
    address: '',
    postal_code: '',
    province_id: '',
    city_id: '',
  });

  useEffect(() => {
    let isMounted = true;
    const fetchProvinces = async () => {
      try {
        const response = await bazzarService.getProvinces();
        if (isMounted && response && response.data) {
          setProvinces(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch provinces:', error);
      }
    };
    fetchProvinces();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Paranoid validation for province_id
    const rawId = formData.province_id;

    if (Array.isArray(rawId)) {
      console.error('Province ID is an array, which is invalid:', rawId);
      setCities([]);
      return;
    }

    const pId = typeof rawId === 'string' ? parseInt(rawId, 10) : Number(rawId);

    // Check if pId is a valid positive integer
    if (!rawId || isNaN(pId) || pId <= 0) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const response = await bazzarService.getCities(pId);
        if (isMounted) {
          if (response && response.data) {
            setCities(response.data);
          } else {
            setCities([]);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to fetch cities:', error);
          setCities([]);
        }
      }
    };
    fetchCities();
    return () => {
      isMounted = false;
    };
  }, [formData.province_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'province_id' || name === 'city_id' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.address ||
      !formData.postal_code ||
      !formData.province_id ||
      !formData.city_id
    ) {
      toast.error('لطفا تمام فیلدها را پر کنید');
      return;
    }

    setIsLoading(true);
    try {
      const response = await bazzarService.createAddress(formData as unknown as Parameters<typeof bazzarService.createAddress>[0]);
      if (response) {
        // Add stricter check if needed based on API response structure
        toast.success('آدرس با موفقیت ثبت شد');
        router.back();
      }
    } catch (error) {
      toast.error('خطا در ثبت آدرس');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center relative" dir="rtl">
      {/* Header */}
      <div className="w-full max-w-[440px] flex justify-between items-center px-0 py-4 shrink-0">
        <div className="flex items-center justify-between w-full relative">
          <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">
            افزودن آدرس جدید
          </span>
          <button
            onClick={() => router.back()}
            className="absolute left-0 w-10 h-10 rounded-full border border-[rgba(0,0,0,0.10)] flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#0C1415]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="w-full max-w-[440px] flex flex-col gap-4 p-6 overflow-y-auto pb-48">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">عنوان آدرس</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="مثال: خانه، محل کار"
            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#FDD00A] outline-none transition-colors"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">استان</label>
            <select
              name="province_id"
              value={formData.province_id}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#FDD00A] outline-none transition-colors appearance-none"
            >
              <option value="">انتخاب کنید</option>
              {provinces.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">شهر</label>
            <select
              name="city_id"
              value={formData.city_id}
              onChange={handleChange}
              disabled={!formData.province_id}
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#FDD00A] outline-none transition-colors appearance-none disabled:opacity-50"
            >
              <option value="">انتخاب کنید</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">کد پستی</label>
          <input
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#FDD00A] outline-none transition-colors text-left"
            dir="ltr"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">آدرس دقیق</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[#FDD00A] outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-[85px] left-0 right-0 z-40 w-full max-w-[440px] mx-auto p-6 pointer-events-none">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full h-[57px] bg-[#FDD00A] rounded-xl flex items-center justify-center gap-3 hover:bg-[#e5bc09] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed pointer-events-auto"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-[#1A1C1E]" />
          ) : (
            <span className="text-[#1A1C1E] text-[17px] font-['PeydaWeb'] font-semibold">
              ثبت آدرس
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

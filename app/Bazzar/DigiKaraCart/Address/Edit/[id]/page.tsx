'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import { bazzarService } from '@/app/services/bazzarService';
import { toast } from 'sonner';

export default function EditAddressPage() {
  const router = useRouter();
  const params = useParams();
  const addressId = Number(params.id);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [provinces, setProvinces] = useState<Record<string, unknown>[]>([]);
  const [cities, setCities] = useState<Record<string, unknown>[]>([]);

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

  // Initial Data Load
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // 1. Fetch Provinces
        const provincesRes = await bazzarService.getProvinces();
        if (!isMounted) return;

        if (provincesRes && provincesRes.data) {
          setProvinces(provincesRes.data);
        }

        // 2. Fetch specific address (via list)
        const addressesRes = await bazzarService.getAddresses();
        if (!isMounted) return;

        if (addressesRes && addressesRes.data) {
          const targetAddress = addressesRes.data.find((a) => Number(a.id) === addressId);

          if (targetAddress) {
            // Cast to unknown first to access properties not in Address interface
            const apiAddress = targetAddress as unknown as {
              id: number;
              title?: string;
              address?: string;
              postal_code?: string;
              province_id?: number;
              city_id?: number;
            };

            // 3. Set basic form data
            setFormData({
              title: apiAddress.title || '',
              address: apiAddress.address || '',
              postal_code: apiAddress.postal_code || '',
              province_id: Number(apiAddress.province_id) || '',
              city_id: Number(apiAddress.city_id) || '', // We'll set this, but might need to wait for cities
            });

            // 4. Fetch cities for this province immediately if present
            if (apiAddress.province_id) {
              const citiesRes = await bazzarService.getCities(Number(apiAddress.province_id));
              if (isMounted && citiesRes && citiesRes.data) {
                setCities(citiesRes.data);
              }
            }
          } else {
            toast.error('آدرس مورد نظر یافت نشد');
            router.back();
          }
        }
      } catch (error) {
        console.error('Failed to load initial data:', error);
        toast.error('خطا در بارگذاری اطلاعات');
      } finally {
        if (isMounted) setIsFetching(false);
      }
    };

    if (addressId) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [addressId, router]);

  // Handle Province Change (Separate from initial load to avoid overwriting)
  const handleProvinceChange = async (newProvinceId: number) => {
    // Clear city when province changes manually
    setFormData((prev) => ({
      ...prev,
      province_id: newProvinceId,
      city_id: '',
    }));
    setCities([]);

    if (newProvinceId && newProvinceId > 0) {
      try {
        const response = await bazzarService.getCities(newProvinceId);
        if (response && response.data) {
          setCities(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'province_id') {
      handleProvinceChange(Number(value));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'city_id' ? (value === '' ? '' : Number(value)) : value,
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
      const response = await bazzarService.updateAddress(addressId, formData as unknown as Parameters<typeof bazzarService.updateAddress>[1]);
      if (response) {
        toast.success('آدرس با موفقیت ویرایش شد');
        router.back();
      }
    } catch (error) {
      toast.error('خطا در ویرایش آدرس');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FDD00A]" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center relative" dir="rtl">
      {/* Header */}
      <div className="w-full max-w-[440px] flex justify-between items-center px-0 py-4 shrink-0">
        <div className="flex items-center justify-between w-full relative">
          <span className="text-[#0C1415] text-base font-['PeydaWeb'] font-semibold">
            ویرایش آدرس
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
              ویرایش آدرس
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

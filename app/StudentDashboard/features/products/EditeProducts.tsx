'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardNavBar } from '../../layout/DashboardNavBar';
import { BasicInfoForm } from './Sells/components/shared/BasicInfoForm';
import { PricingForm } from './Sells/components/shared/PricingForm';
import { CategoryTagsForm } from './Sells/components/shared/CategoryTagsForm';
import { Product } from '@/app/services/products/productsService';
import { studentProductService } from '@/app/services/studentProductService';
import { Skeleton } from '@/app/components/Skeleton';
import { ConfirmModal } from '@/app/components/ConfirmModal';
import { SuccessModal } from '@/app/components/SuccessModal';
import { PriceListEditor } from './components/PriceListEditor';
import { ProductPreviewModal } from './components/ProductPreviewModal';
import { Price } from '@/app/StudentDashboard/data/products';

interface ProductFormState extends Partial<Omit<Product, 'prices'>> {
  prices?: Price[];
  imageFile?: File | null;
  image?: string | null;
}

export function EditeProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<ProductFormState>({});
  const [isLoading, setIsLoading] = useState(!!productId);

  // Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [fetchedCategories, setFetchedCategories] = useState<
    { id: number | string; name: string }[]
  >([]);

  const fetchProduct = async () => {
    if (!productId) return;
    const { success, data } = await studentProductService.getProductById(productId as string);
    if (success && data) {
      setFormData({ ...data, prices: (data.prices as Price[]) || [] });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
        if (!productId) return;
        
        try {
            // Parallel fetch
            const [prodRes, catRes] = await Promise.all([
                studentProductService.getProductById(productId as string),
                studentProductService.getCategories()
            ]);

            if (!cancelled) {
                if (prodRes.success && prodRes.data) {
                    setFormData({ ...prodRes.data, prices: (prodRes.data.prices as Price[]) || [] });
                }
                if (catRes.success && catRes.data) {
                    setFetchedCategories(catRes.data);
                }
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            if (!cancelled) setIsLoading(false);
        }
    };

    if (productId) {
        loadData();
    }
    
    return () => { cancelled = true; };
  }, [productId]);

  const handleUpdateChange = (updates: Partial<Product>) => {
    setFormData((prev: ProductFormState) => ({
      ...prev,
      ...updates,
      prices: updates.prices ? (updates.prices as Price[]) : prev.prices,
    }));
  };

  // Wrapper for BasicInfoForm which expects id as string
  const handleBasicInfoChange = (updates: Partial<{ name: string; description: string; id: string; images?: string[]; image?: string | null; imageFile?: File | null }>) => {
    const { id, ...rest } = updates;
    const productUpdates: Partial<Product> = { ...rest };
    // Convert id from string to number if present
    if (id !== undefined) {
      productUpdates.id = Number(id);
    }
    handleUpdateChange(productUpdates);
  };

  const handleSave = async () => {
    if (!productId) return;

    // Basic validation
    if (!formData.name || !formData.category) {
      alert('لطفا فیلدهای اجباری (عنوان، دسته بندی) را پر کنید.');
      return;
    }

    setIsLoading(true);

    const payload: Record<string, unknown> = {
      category_id: formData.category ? String(formData.category) : '1',
      inventory: parseInt(String(formData.stock || '0').replace(/\D/g, ''), 10) || 0,
      price: parseInt(String(formData.price || '0').replace(/\D/g, ''), 10) || 0,
      title: formData.name,
      type_inventory: 1,
      warn_inventory: parseInt(String(formData.reminder || '0').replace(/\D/g, ''), 10),
      description: formData.description || null,
      tag_id: null,
    };

    let success, message;

    // Check if we have a file to upload or explicit nulling
    if (formData.imageFile) {
      // Use FormData for file upload
      const data = new FormData();

      // Append regular fields
      Object.keys(payload).forEach((key) => {
        const value = payload[key];
        if (value !== null && value !== undefined) {
          data.append(key, String(value));
        }
      });

      // Append Image
      data.append('image', formData.imageFile);

      // Note: If using Laravel/PHP which often doesn't parse Multipart PUT correctly,
      // we might need _method: PUT and send as POST.
      // Trying standard PUT first, as studentProductService.updateProduct uses PUT.
      // If that fails, we might need to change service.

      const res = await studentProductService.updateProduct(productId as string, data);
      success = res.success;
      message = res.message;
    } else {
      // No new file. If user deleted image (image === null), distinct from just not changing it?
      // If formData.image is null and we had one before... we should probably send null?
      // But API says "must be file". Sending null might be rejected.
      // If no change, sending just JSON data without image key is safest.

      // If user explicitly removed image:
      if (formData.image === null) {
        // How to clear image? API says "must be file".
        // Sending null usually works in Laravel for nullable file fields if JSON.
        // But validation "must be file" is strict.
        // We will skip sending 'image' key if no file change, to preserve existing.
        // If user wants to DELETE image, that might require a separate logic or ignore for now due to API strictness.
        // Current logic: Only send image if new file.
      }

      const res = await studentProductService.updateProduct(productId as string, payload);
      success = res.success;
      message = res.message;
    }

    setIsLoading(false);

    if (success) {
      // Optional: Show success toast
      router.push('/StudentDashboard/Sells');
    } else {
      alert(message || 'خطا در ویرایش محصول');
    }
  };
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    console.log('Handling delete click...');
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productId) return;

    setIsDeleting(true);
    const { success, message } = await studentProductService.deleteProduct(productId as string);
    setIsDeleting(false);
    setShowDeleteModal(false);

    if (success) {
      setModalMessage(message || 'محصول با موفقیت حذف شد');
      setShowSuccessModal(true);
    } else {
      alert(message || 'خطا در حذف محصول');
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/StudentDashboard/Sells');
  };

  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col relative pb-32" dir="ltr">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <DashboardNavBar />
      </div>

      {/* Main Content */}
      <div
        className="flex-1 w-full max-w-[800px] mx-auto flex flex-col items-center gap-6 px-4 py-8"
        dir="rtl"
      >
        {/* Header Section */}
        <div className="w-full flex flex-col gap-5">
          <div className="text-[#0D0D12] text-2xl font-medium font-['PeydaWeb'] leading-relaxed text-right w-full">
            ویرایش محصول
          </div>

          <div className="w-full flex items-center gap-3">
            {/* Preview Button */}
            <button
              onClick={() => setShowPreview(true)}
              className="flex-1 h-[48px] bg-[#F0F3F7] rounded-xl border border-[#DCE4E8] flex justify-center items-center gap-2 hover:bg-[#E2E8F0] transition-all shadow-sm group"
            >
              <span className="text-[#0D0D12] text-base font-medium font-['PeydaWeb'] group-hover:scale-105 transition-transform">
                پیش نمایش
              </span>
            </button>
            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="flex-1 h-[48px] bg-[#FFF5F5] rounded-xl border border-red-200 flex justify-center items-center gap-2 hover:bg-[#FFE0E0] transition-all shadow-sm group"
            >
              <span className="text-red-500 text-base font-medium font-['PeydaWeb'] group-hover:scale-105 transition-transform">
                حذف محصول
              </span>
            </button>
          </div>
        </div>

        {/* Status Card */}
        <div className="w-full p-5 bg-white rounded-2xl border border-[#DFE1E7] flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
          <div className="text-[#0D0D12] text-lg font-medium font-['PeydaWeb'] tracking-wide">
            وضعیت انتشار
          </div>
          <div
            className={
              formData.approved
                ? 'bg-[#ECF9F7] px-4 py-2 rounded-xl flex items-center gap-2'
                : 'bg-amber-50 px-4 py-2 rounded-xl flex items-center gap-2'
            }
          >
            <span
              className={
                formData.approved
                  ? 'w-2.5 h-2.5 rounded-full bg-[#267666]'
                  : 'w-2.5 h-2.5 rounded-full bg-amber-500'
              }
            />
            <span
              className={
                formData.approved
                  ? "text-[#267666] text-sm font-medium font-['PeydaWeb']"
                  : "text-amber-600 text-sm font-medium font-['PeydaWeb']"
              }
            >
              {formData.approved ? 'انتشار عمومی' : 'در انتظار تایید'}
            </span>
          </div>
        </div>

        {/* Forms Area */}
        {isLoading ? (
          <div className="w-full flex flex-col gap-6">
            <Skeleton className="w-full h-[320px] rounded-2xl" />
            <Skeleton className="w-full h-[200px] rounded-2xl" />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6">
            <BasicInfoForm
              values={{
                name: formData.name || '',
                description: formData.description || '',
                id: String(formData.id || ''),
                images: formData.images,
                image: formData.image,
                imageFile: formData.imageFile,
              }}
              onChange={handleBasicInfoChange}
            />
            <PricingForm
              values={{
                price: formData.price || '',
                fee: formData.fee || '',
                receive: formData.receive || '',
                discount: formData.discount || '',
                code: formData.code || '',
                percent: formData.percent || '',
              }}
              onChange={handleUpdateChange}
            />
            <PriceListEditor
              prices={formData.prices || []}
              onRefresh={fetchProduct}
              basePrice={formData.price}
            />
            <CategoryTagsForm
              values={{
                category: formData.category || '',
                tags: formData.tags || [],
                metadata: formData.metadata || '',
              }}
              onChange={handleUpdateChange}
              categories={fetchedCategories}
            />
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions Bar */}
      <div
        className="fixed bottom-0 w-full p-5 bg-white border-t border-[#DFE1E7] z-40 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.03)]"
        dir="rtl"
      >
        <div className="w-full flex items-center gap-4">
          <button
            onClick={() => router.push('/StudentDashboard/Sells')}
            className="flex-1 h-[52px] px-4 rounded-xl border border-[#DCE4E8] flex justify-center items-center hover:bg-gray-50 transition-colors text-[#0D0D12] font-semibold font-['PeydaWeb']"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            className="flex-1 h-[52px] px-12 bg-[#FDD00A] rounded-xl shadow-sm flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="text-[#1A1C1E] text-lg font-semibold font-['PeydaWeb']">
              ذخیره تغییرات
            </span>
          </button>
        </div>
      </div>

      {/* Preview Popup */}
      <ProductPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        product={formData as Product}
      />
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="حذف محصول"
        message="آیا از حذف این محصول اطمینان دارید؟ این عملیات غیرقابل بازگشت است."
        isLoading={isDeleting}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="عملیات موفق"
        message={modalMessage}
      />
    </div>
  );
}

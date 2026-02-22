import React, { useState } from 'react';
import { FormLabel } from './FormLabel';
import { Input } from '@/components/ui/input';

interface InventoryFormProps {
  values?: {
    stock: string;
    maxOrderQuantity: string;
    lowStockWarning: string;
  };
  onChange?: (updates: Partial<{
    stock: string;
    maxOrderQuantity: string;
    lowStockWarning: string;
  }>) => void;
}

export function InventoryForm({ values = { stock: '', maxOrderQuantity: '', lowStockWarning: '' }, onChange }: InventoryFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleUpdate = (field: string, value: string) => {
    // Only allow digits
    const cleanValue = value.replace(/\D/g, '');
    
    // Clear error for field
    if (errors[field]) {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr[field];
        return newErr;
      });
    }

    if (onChange) {
      onChange({ [field]: cleanValue });
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#DFE1E7] p-5 flex flex-col gap-5 shadow-sm">
      <div className="text-[#0D0D12] text-lg font-medium font-['PeydaWeb'] text-right">
        موجودی و محدودیت‌ها
      </div>

      <div className="flex flex-col gap-4">
        {/* Inventory */}
        <div className="flex flex-col gap-2">
          <FormLabel text="موجودی" />
          <div
            className={`w-full h-[52px] px-3 bg-white rounded-xl border ${errors.stock ? 'border-red-500' : 'border-[#DFE1E7]'} flex items-center gap-2 focus-within:border-[#FDD00A] transition-colors`}
          >
            <div className="w-11 text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb']">
              عدد
            </div>
            <div className="w-[1px] h-full bg-[#DFE1E7]"></div>
            <Input
              type="text"
              className="flex-1 h-full border-none outline-none text-right dir-rtl text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] placeholder:text-[#DFE1E7] bg-transparent shadow-none focus-visible:ring-0 px-0"
              placeholder="۲۰۰"
              value={values.stock || ''}
              onChange={(e) => handleUpdate('stock', e.target.value)}
            />
          </div>
          {errors.stock && (
            <span className="text-right text-red-500 text-xs font-medium font-['PeydaWeb'] mt-1">
              {errors.stock}
            </span>
          )}
        </div>

        {/* Max Order Quantity */}
        <div className="flex flex-col gap-2">
          <FormLabel text="حداکثر تعداد مجاز در هر سفارش" />
          <div
            className={`w-full h-[52px] px-3 bg-white rounded-xl border ${errors.maxOrderQuantity ? 'border-red-500' : 'border-[#DFE1E7]'} flex items-center gap-2 focus-within:border-[#FDD00A] transition-colors`}
          >
            <div className="w-11 text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb']">
              عدد
            </div>
            <div className="w-[1px] h-full bg-[#DFE1E7]"></div>
            <Input
              type="text"
              className="flex-1 h-full border-none outline-none text-right dir-rtl text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] placeholder:text-[#DFE1E7] bg-transparent shadow-none focus-visible:ring-0 px-0"
              placeholder="۱۰"
              value={values.maxOrderQuantity || ''}
              onChange={(e) => handleUpdate('maxOrderQuantity', e.target.value)}
            />
          </div>
          {errors.maxOrderQuantity && (
            <span className="text-right text-red-500 text-xs font-medium font-['PeydaWeb'] mt-1">
              {errors.maxOrderQuantity}
            </span>
          )}
        </div>

        {/* Low Stock Warning */}
        <div className="flex flex-col gap-2">
          <FormLabel text="ایجاد یادآوری در موجودی" />
          <div
            className={`w-full h-[52px] px-3 bg-white rounded-xl border ${errors.lowStockWarning ? 'border-red-500' : 'border-[#DFE1E7]'} flex items-center gap-2 focus-within:border-[#FDD00A] transition-colors`}
          >
            <div className="w-11 text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb']">
              عدد
            </div>
            <div className="w-[1px] h-full bg-[#DFE1E7]"></div>
            <Input
              type="text"
              className="flex-1 h-full border-none outline-none text-right dir-rtl text-[#0D0D12] text-base font-semibold font-['PeydaFaNum'] placeholder:text-[#DFE1E7] bg-transparent shadow-none focus-visible:ring-0 px-0"
              placeholder="۱۰"
              value={values.lowStockWarning || ''}
              onChange={(e) => handleUpdate('lowStockWarning', e.target.value)}
            />
          </div>
          {errors.lowStockWarning && (
            <span className="text-right text-red-500 text-xs font-medium font-['PeydaWeb'] mt-1">
              {errors.lowStockWarning}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

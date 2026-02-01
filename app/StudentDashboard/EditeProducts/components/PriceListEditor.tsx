import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { studentProductService } from '@/app/services/studentProductService';
import { Price } from '@/app/StudentDashboard/data/products';

const PRICE_TYPES = [
    { id: 1, label: 'رنگ' },
    { id: 2, label: 'سایز' },
    { id: 3, label: 'جنس' },
    { id: 4, label: 'گارانتی' },
    { id: 5, label: 'متفرقه' },
];

interface PriceListEditorProps {
    prices: Price[];
    onRefresh: () => void;
}

export function PriceListEditor({ prices, onRefresh }: PriceListEditorProps) {
    const [editedPrices, setEditedPrices] = useState<Record<string, any>>({});

    // When props change, clear edits? Or keep them? 
    // Usually keep unless saved.

    const handleChange = (id: string | number, field: string, value: any) => {
        setEditedPrices(prev => {
            const currentEdit = prev[id] || prices.find(p => p.id === id) || {};
            return {
                ...prev,
                [id]: { ...currentEdit, [field]: value }
            };
        });
    };

    const handleSave = async (id: string | number) => {
        const changes = editedPrices[id];
        if (!changes) return;

        const original = prices.find(p => p.id === id);
        if (!original) return;
        
        // Construct payload
        // Ensure numbers are numbers
        const payload = {
            amount: parseInt(String(changes.amount || original.amount || '0').replace(/\D/g, '')),
            title: changes.title || original.title,
            type: parseInt(changes.type || original.type || 1),
            discount_percent: changes.discount_percent ? parseInt(changes.discount_percent) : (original.discount_percent || null),
            inventory: changes.inventory ? parseInt(changes.inventory) : (original.inventory || null),
            type_inventory: 1,
            warn_inventory: changes.warn_inventory ? parseInt(changes.warn_inventory) : (original.warn_inventory || null),
        };

        const { success, message } = await studentProductService.updateProductPrice(id, payload);
        if (success) {
            toast.success(message);
            // removing from edited state
            setEditedPrices(prev => {
                const newState = { ...prev };
                delete newState[id];
                return newState;
            });
            onRefresh();
        } else {
            toast.error(message);
        }
    };

    const handleCancel = (id: string | number) => {
        setEditedPrices(prev => {
            const newState = { ...prev };
            delete newState[id];
            return newState;
        });
    };

    return (
        <div className="w-full flex flex-col gap-4 p-4 bg-gray-50 rounded-xl border border-[#DFE1E7]">
            <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb']">
                لیست قیمت ها و تنوع محصول
            </div>
            
            {(!prices || prices.length === 0) ? (
                <div className="text-gray-500 text-sm font-['PeydaWeb'] text-center py-4">
                    هیچ تنوع قیمتی برای این محصول ثبت نشده است.
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                {prices.map((price) => {
                    const isEdited = !!editedPrices[price.id];
                    const current = editedPrices[price.id] || price;
                    
                    return (
                        <div key={price.id} className="bg-white p-4 rounded-xl border border-[#DFE1E7] flex flex-col gap-4">
                            {/* Header: Title and Type */}
                            <div className="flex gap-2 items-center">
                                {/* Type Selector */}
                                <div className="relative w-1/4 min-w-[100px]">
                                    <select 
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-['PeydaWeb'] text-sm bg-white outline-none focus:border-[#0A33FF] appearance-none cursor-pointer"
                                        value={current.type || 1}
                                        onChange={e => handleChange(price.id, 'type', e.target.value)}
                                    >
                                        {PRICE_TYPES.map(t => (
                                            <option key={t.id} value={t.id}>{t.label}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Title Input */}
                                <input 
                                    className="flex-1 h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-['PeydaWeb'] text-sm outline-none focus:border-[#0A33FF]"
                                    value={current.title || ''}
                                    placeholder="عنوان"
                                    onChange={e => handleChange(price.id, 'title', e.target.value)}
                                />
                                
                                {/* Actions */}
                                {isEdited && (
                                    <div className="flex items-center gap-1 mr-auto">
                                        <button 
                                            onClick={() => handleSave(price.id)}
                                            className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors"
                                            title="ذخیره تغییرات"
                                        >
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => handleCancel(price.id)}
                                            className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                                            title="لغو تغییرات"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Row 2: Price and Discount */}
                            <div className="flex gap-2">
                                <div className="flex-1 flex flex-col gap-1">
                                    <label className="text-xs text-gray-500 font-['PeydaWeb']">قیمت (تومان)</label>
                                    <input 
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-['PeydaWeb'] text-sm outline-none focus:border-[#0A33FF]"
                                        value={current.amount ? parseInt(current.amount).toLocaleString() : ''}
                                        onChange={e => handleChange(price.id, 'amount', e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                                <div className="w-1/4 flex flex-col gap-1">
                                    <label className="text-xs text-gray-500 font-['PeydaWeb']">تخفیف %</label>
                                    <input 
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-center font-['PeydaWeb'] text-sm outline-none focus:border-[#0A33FF]"
                                        value={current.discount_percent || ''}
                                        onChange={e => handleChange(price.id, 'discount_percent', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Row 3: Inventory */}
                            <div className="flex gap-2">
                                <div className="flex-1 flex flex-col gap-1">
                                    <label className="text-xs text-gray-500 font-['PeydaWeb']">موجودی</label>
                                    <input 
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-['PeydaWeb'] text-sm outline-none focus:border-[#0A33FF]"
                                        value={current.inventory || ''}
                                        onChange={e => handleChange(price.id, 'inventory', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <label className="text-xs text-gray-500 font-['PeydaWeb']">هشدار موجودی</label>
                                    <input 
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-['PeydaWeb'] text-sm outline-none focus:border-[#0A33FF]"
                                        value={current.warn_inventory || ''}
                                        onChange={e => handleChange(price.id, 'warn_inventory', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            )}
        </div>
    );
}

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, X, Trash2, Plus } from 'lucide-react';
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
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    const [editedPrices, setEditedPrices] = useState<Record<string, any>>({});
    const [isAdding, setIsAdding] = useState(false);
    const [newPrice, setNewPrice] = useState({
        title: '', 
        amount: '', 
        type: '1', 
        discount_percent: '', 
        inventory: '', 
        warn_inventory: ''
    });

    const handleAddPrice = async () => {
        if (!productId) return;
        if (!newPrice.title || !newPrice.amount) {
            toast.error("عنوان و قیمت الزامی است");
            return;
        }

        const payload = {
            title: newPrice.title,
            amount: parseInt(newPrice.amount.replace(/\D/g, '') || '0'),
            type: parseInt(newPrice.type || '1'),
            discount_percent: newPrice.discount_percent ? parseInt(newPrice.discount_percent) : null,
            inventory: newPrice.inventory ? parseInt(newPrice.inventory) : null,
            type_inventory: 1, 
            warn_inventory: newPrice.warn_inventory ? parseInt(newPrice.warn_inventory) : null,
        };

        const { success, message } = await studentProductService.addProductPrice(productId, payload);
        if (success) {
            toast.success(message);
            setIsAdding(false);
            setNewPrice({ title: '', amount: '', type: '1', discount_percent: '', inventory: '', warn_inventory: '' });
            onRefresh();
        } else {
            toast.error(message);
        }
    };

    const handleDelete = async (id: string | number) => {
        if (!confirm('آیا از حذف این قیمت مطمئن هستید؟')) return;

        const { success, message } = await studentProductService.deleteProductPrice(id);
        if (success) {
            toast.success(message);
            onRefresh();
        } else {
            toast.error(message);
        }
    };

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
            <div className="w-full flex justify-between items-center">
                <div className="text-[#0D0D12] text-lg font-semibold">
                    لیست قیمت ها و تنوع محصول
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-1 text-[#0A33FF] text-sm font-semibold hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>افزودن تنوع جدید</span>
                </button>
            </div>
            
            {isAdding && (
                 <div className="bg-white p-4 rounded-xl border border-[#0A33FF] flex flex-col gap-4 shadow-sm relative">
                     <div className="absolute top-2 left-2 cursor-pointer p-1 hover:bg-gray-100 rounded-full" onClick={() => setIsAdding(false)}>
                         <X className="w-4 h-4 text-gray-500" />
                     </div>
                     <div className="text-sm font-bold text-[#0A33FF]">افزودن قیمت جدید</div>
                     
                     <div className="flex gap-2">
                        <div className="relative w-1/4 min-w-[100px]">
                            <select 
                                className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-regular text-sm bg-white outline-none focus:border-[#0A33FF] appearance-none cursor-pointer"
                                value={newPrice.type}
                                onChange={e => setNewPrice({...newPrice, type: e.target.value})}
                            >
                                {PRICE_TYPES.map(t => (
                                    <option key={t.id} value={t.id}>{t.label}</option>
                                ))}
                            </select>
                        </div>
                        <input 
                            placeholder="عنوان (مثلا: قرمز)"
                            className="flex-1 h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-regular text-sm outline-none focus:border-[#0A33FF]"
                            value={newPrice.title}
                            onChange={e => setNewPrice({...newPrice, title: e.target.value})}
                        />
                     </div>

                     <div className="flex gap-2">
                         <div className="flex-1 flex flex-col gap-1">
                            <input 
                                placeholder="قیمت (تومان)"
                                className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-num-medium text-sm outline-none focus:border-[#0A33FF]"
                                value={newPrice.amount ? parseInt(newPrice.amount).toLocaleString() : ''}
                                onChange={e => setNewPrice({...newPrice, amount: e.target.value.replace(/\D/g, '')})}
                            />
                         </div>
                         <div className="w-1/4 flex flex-col gap-1">
                            <input 
                                placeholder="تخفیف %"
                                className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-center font-num-medium text-sm outline-none focus:border-[#0A33FF]"
                                value={newPrice.discount_percent}
                                onChange={e => setNewPrice({...newPrice, discount_percent: e.target.value})}
                            />
                         </div>
                     </div>

                     <div className="flex gap-2 flex-wrap">
                         <input 
                            placeholder="موجودی"
                            className="flex-1 min-w-[120px] h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-num-medium text-sm outline-none focus:border-[#0A33FF]"
                            value={newPrice.inventory}
                            onChange={e => setNewPrice({...newPrice, inventory: e.target.value})}
                        />
                         <input 
                            placeholder="هشدار موجودی"
                            className="flex-1 min-w-[120px] h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-num-medium text-sm outline-none focus:border-[#0A33FF]"
                            value={newPrice.warn_inventory}
                            onChange={e => setNewPrice({...newPrice, warn_inventory: e.target.value})}
                        />
                     </div>

                     <button 
                        onClick={handleAddPrice}
                        className="w-full h-9 bg-[#0A33FF] text-white rounded-lg text-sm font-bold flex justify-center items-center gap-2 hover:opacity-90"
                     >
                         <Plus className="w-4 h-4" />
                         <span>افزودن قیمت</span>
                     </button>
                 </div>
            )}
            
            {(!prices || prices.length === 0) ? (
                <div className="text-gray-500 text-sm font-regular text-center py-4">
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
                            <div className="flex gap-2 items-center flex-wrap">
                                {/* Type Selector */}
                                <div className="relative w-1/4 min-w-[100px]">
                                    <select 
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-regular text-sm bg-white outline-none focus:border-[#0A33FF] appearance-none cursor-pointer"
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
                                    className="flex-1 h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-regular text-sm outline-none focus:border-[#0A33FF]"
                                    value={current.title || ''}
                                    placeholder="عنوان"
                                    onChange={e => handleChange(price.id, 'title', e.target.value)}
                                />
                                
                            </div>

                            {/* Row 2: Price and Discount */}
                            <div className="flex gap-2">
                                <div className="flex-1 flex flex-col gap-1">
                                    <label className="text-xs text-gray-500 font-regular">قیمت (تومان)</label>
                                    <input 
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-num-medium text-sm outline-none focus:border-[#0A33FF]"
                                        value={current.amount ? parseInt(current.amount).toLocaleString() : ''}
                                        onChange={e => handleChange(price.id, 'amount', e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                                <div className="w-1/4 flex flex-col gap-1">
                                    <label className="text-xs text-gray-500 font-regular">تخفیف %</label>
                                    <input 
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-center font-num-medium text-sm outline-none focus:border-[#0A33FF]"
                                        value={current.discount_percent || ''}
                                        onChange={e => handleChange(price.id, 'discount_percent', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Row 3: Inventory */}
                            <div className="flex gap-2">
                                <div className="flex-1 flex flex-col gap-1">
                                    <label className="text-xs text-gray-500 font-regular">موجودی</label>
                                    <input 
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-num-medium text-sm outline-none focus:border-[#0A33FF]"
                                        value={current.inventory || ''}
                                        onChange={e => handleChange(price.id, 'inventory', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <label className="text-xs text-gray-500 font-regular">هشدار موجودی</label>
                                    <input 
                                        className="w-full h-10 px-3 rounded-lg border border-[#DFE1E7] text-right font-num-medium text-sm outline-none focus:border-[#0A33FF]"
                                        value={current.warn_inventory || ''}
                                        onChange={e => handleChange(price.id, 'warn_inventory', e.target.value)}
                                    />
                                </div>
                            </div>

                            
                            {/* Footer Actions */}
                            <div className="flex justify-end items-center mt-3 border-t border-gray-100 pt-3">
                                {isEdited ? (
                                    <div className="flex items-center gap-2 w-full">
                                        <button 
                                            onClick={() => handleSave(price.id)}
                                            className="flex-1 h-9 rounded-lg bg-[#0A33FF] text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                                        >
                                            ذخیره تغییرات
                                        </button>
                                         <button 
                                            onClick={() => handleCancel(price.id)}
                                            className="flex-1 h-9 rounded-lg border border-red-100 text-red-500 bg-red-50 text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center"
                                        >
                                            لغو
                                        </button>
                                        
                                    </div>
                                ) : (
                                    <div className="flex w-full justify-between items-center">
                                         <div className="text-xs text-gray-400 font-regular">
                                             {/* Optional: Add timestamp or extra info here if needed */}
                                         </div>
                                         <button 
                                            onClick={() => handleDelete(price.id)}
                                            className="px-3 py-1.5 rounded-lg text-red-500 bg-red-50 text-xs font-medium hover:bg-red-100 transition-colors flex items-center gap-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span>حذف</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            )}
        </div>
    );
}

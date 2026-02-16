import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { X, Trash2, Plus, ChevronDown, Minus } from 'lucide-react';
import { toast } from 'sonner';
import { studentProductService } from '@/app/services/studentProductService';
import { Price } from '@/app/StudentDashboard/data/products';

const PRICE_TYPES = [
  { id: 1, label: 'رنگ' },
  { id: 2, label: 'سایز' },
  { id: 3, label: 'جنس' },
  { id: 4, label: 'گارانتی' },
  { id: 5, label: 'متفرقه' },
  { id: 6, label: 'وزن' },
];

interface PriceListEditorProps {
  prices: Price[];
  onRefresh: () => void;
  basePrice?: string | number;
}

export function PriceListEditor({ prices, onRefresh, basePrice }: PriceListEditorProps) {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const [editedPrices, setEditedPrices] = useState<Record<string, Partial<Price>>>({});

  // Add New Price State
  const [isAdding, setIsAdding] = useState(false);
  const [isAddition, setIsAddition] = useState(true);
  const [priceDifference, setPriceDifference] = useState('');
  const [newPrice, setNewPrice] = useState({
    title: '',
    amount: '',
    type: '1',
    discount_percent: '',
    inventory: '',
    warn_inventory: '',
  });

  // Calculate final price as a derived value instead of storing in state
  const calculatedAmount = useMemo(() => {
    if (!basePrice) return '0';
    const base = parseInt(String(basePrice).replace(/\D/g, '') || '0');
    const diff = parseInt(priceDifference.replace(/\D/g, '') || '0');
    const final = isAddition ? base + diff : base - diff;
    return String(Math.max(0, final));
  }, [priceDifference, isAddition, basePrice]);

  const handleAddPrice = async () => {
    if (!productId) return;
    if (!newPrice.title || !calculatedAmount) {
      toast.error('عنوان و قیمت الزامی است');
      return;
    }

    const payload = {
      title: newPrice.title,
      amount: parseInt(calculatedAmount.replace(/\D/g, '') || '0'),
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
      // Reset Form properly
      setNewPrice({
        title: '',
        amount: '',
        type: '1',
        discount_percent: '',
        inventory: '',
        warn_inventory: '',
      });
      setPriceDifference('');
      setIsAddition(true);
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

  const handleChange = (id: string | number, field: string, value: unknown) => {
    setEditedPrices((prev) => {
      const currentEdit = prev[id] || prices.find((p) => p.id === id) || {};
      return {
        ...prev,
        [id]: { ...currentEdit, [field]: value },
      };
    });
  };

  const inferType = (title: string, currentType: number) => {
    if (title && (title.trim().startsWith('وزن:') || title.trim().startsWith('وزن :'))) return 6;
    return currentType;
  };

  const handleSave = async (id: string | number) => {
    const changes = editedPrices[id];
    if (!changes) return;

    const original = prices.find((p) => p.id === id);
    if (!original) return;

    // Construct payload
    const finalTitle = changes.title || original.title || '';
    const rawType = parseInt(String(changes.type || original.type || 1));
    const finalType = inferType(finalTitle, rawType);

    const payload = {
      amount: parseInt(String(changes.amount || original.amount || '0').replace(/\D/g, '')),
      title: finalTitle,
      type: finalType,
      discount_percent: changes.discount_percent
        ? parseInt(String(changes.discount_percent))
        : original.discount_percent || null,
      inventory: changes.inventory ? parseInt(String(changes.inventory)) : original.inventory || null,
      type_inventory: 1,
      warn_inventory: changes.warn_inventory
        ? parseInt(String(changes.warn_inventory))
        : original.warn_inventory || null,
    };

    const { success, message } = await studentProductService.updateProductPrice(id, payload);
    if (success) {
      toast.success(message);
      // removing from edited state
      setEditedPrices((prev) => {
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
    setEditedPrices((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 p-5 bg-white rounded-2xl border border-[#DFE1E7] shadow-sm">
      <div className="w-full flex flex-col gap-4">
        <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] text-right">
          لیست قیمت ها و تنوع محصول
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="w-full h-[48px] flex justify-center items-center gap-2 text-[#0D0D12] text-sm font-medium bg-[#FDD00A] hover:bg-[#eac009] rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>افزودن تنوع جدید</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-4 rounded-xl border border-[#FDD00A] flex flex-col gap-4 shadow-sm relative">
          <div
            className="absolute top-2 left-2 cursor-pointer p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setIsAdding(false)}
          >
            <X className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-sm font-medium text-[#0D0D12] font-['PeydaWeb'] text-right">
            افزودن قیمت جدید
          </div>

          {/* Title & Type */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-1/4">
              <div className="text-right text-[#666D80] text-sm font-medium font-['PeydaWeb'] mb-2">
                ویژگی
              </div>
              <div className="relative">
                <select
                  className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-right font-medium font-['PeydaWeb'] text-sm bg-white outline-none focus:border-[#FDD00A] appearance-none cursor-pointer"
                  value={newPrice.type}
                  onChange={(e) => setNewPrice({ ...newPrice, type: e.target.value })}
                >
                  {PRICE_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#818898] pointer-events-none" />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-right text-[#666D80] text-sm font-medium font-['PeydaWeb']">
                عنوان
              </div>
              <input
                placeholder="عنوان (مثلا: قرمز)"
                className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-right font-medium font-['PeydaWeb'] text-sm outline-none focus:border-[#FDD00A]"
                value={newPrice.title}
                onChange={(e) => setNewPrice({ ...newPrice, title: e.target.value })}
              />
            </div>
          </div>

          {/* Price Difference (Full Width) */}
          <div className="flex flex-col gap-2 w-full">
            <div className="text-right text-[#666D80] text-sm font-medium font-['PeydaWeb']">
              تفاوت قیمت (نسبت به پایه)
            </div>

            {/* Input First */}
            <div className="w-full h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center gap-2 focus-within:border-[#FDD00A] transition-colors">
              <input
                type="text"
                className="flex-1 h-full outline-none text-left text-[#0D0D12] text-sm font-medium font-['PeydaFaNum'] placeholder:text-[#DFE1E7]"
                placeholder="0"
                value={priceDifference ? parseInt(priceDifference).toLocaleString() : ''}
                onChange={(e) => setPriceDifference(e.target.value.replace(/\D/g, ''))}
              />
              <div className="w-[1px] h-[30px] bg-[#DFE1E7]"></div>
              <div className="text-[#0D0D12] text-sm font-medium font-['PeydaWeb']">ریال</div>
            </div>

            {/* Buttons Below */}
            <div className="w-full flex items-center gap-2">
              <button
                onClick={() => setIsAddition(true)}
                className={`flex-1 h-[52px] rounded-xl border border-[#DFE1E7] flex items-center justify-center transition-colors ${isAddition ? 'bg-[#35685A] border-[#35685A]' : 'bg-white hover:bg-gray-50'}`}
              >
                <Plus className={`w-5 h-5 ${isAddition ? 'text-white' : 'text-[#666D80]'}`} />
              </button>
              <button
                onClick={() => setIsAddition(false)}
                className={`flex-1 h-[52px] rounded-xl border border-[#DFE1E7] flex items-center justify-center transition-colors ${!isAddition ? 'bg-[#D54141] border-[#D54141]' : 'bg-white hover:bg-gray-50'}`}
              >
                <Minus className={`w-5 h-5 ${!isAddition ? 'text-white' : 'text-[#666D80]'}`} />
              </button>
            </div>

            <div className="text-right text-xs text-[#666D80] font-medium font-['PeydaFaNum'] mt-1">
              قیمت نهایی: {calculatedAmount ? parseInt(calculatedAmount).toLocaleString() : '0'} ریال
            </div>
          </div>

          {/* Discount & Inventory Rows */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-right text-[#666D80] text-sm font-medium font-['PeydaWeb']">
                تخفیف %
              </div>
              <input
                className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-center font-num-medium font-['PeydaFaNum'] text-sm outline-none focus:border-[#FDD00A]"
                value={newPrice.discount_percent}
                placeholder="0"
                onChange={(e) => setNewPrice({ ...newPrice, discount_percent: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-right text-[#666D80] text-sm font-medium font-['PeydaWeb']">
                موجودی
              </div>
              <input
                className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-right font-num-medium font-['PeydaFaNum'] text-sm outline-none focus:border-[#FDD00A]"
                value={newPrice.inventory}
                placeholder="0"
                onChange={(e) => setNewPrice({ ...newPrice, inventory: e.target.value })}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <div className="text-right text-[#666D80] text-sm font-medium font-['PeydaWeb']">
                هشدار موجودی
              </div>
              <input
                className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-right font-num-medium font-['PeydaFaNum'] text-sm outline-none focus:border-[#FDD00A]"
                value={newPrice.warn_inventory}
                placeholder="0"
                onChange={(e) => setNewPrice({ ...newPrice, warn_inventory: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={handleAddPrice}
            className="w-full h-[57px] rounded-xl border border-[#DFE1E7] flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors mt-2"
          >
            <span className="text-[#666D80] text-sm font-medium font-['PeydaWeb']">
              افزودن ویژگی ها
            </span>
            <Plus className="w-5 h-5 text-[#666D80]" />
          </button>
        </div>
      )}

      {!prices || prices.length === 0 ? (
        <div className="text-gray-500 text-sm font-medium font-['PeydaWeb'] text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          هیچ تنوع قیمتی برای این محصول ثبت نشده است.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {prices.map((price) => {
            const isEdited = !!editedPrices[price.id];
            const current = editedPrices[price.id] || price;

            return (
              <div
                key={price.id}
                className="bg-white p-4 rounded-xl border border-[#DFE1E7] flex flex-col gap-4"
              >
                {/* Header: Title and Type */}
                <div className="flex gap-2 items-center flex-wrap">
                  {/* Type Selector */}
                  <div className="relative w-1/4 min-w-[100px]">
                    <select
                      className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-right font-medium font-['PeydaWeb'] text-sm bg-white outline-none focus:border-[#FDD00A] appearance-none cursor-pointer"
                      value={inferType(current.title || '', current.type || 1)}
                      onChange={(e) => handleChange(price.id, 'type', e.target.value)}
                    >
                      {PRICE_TYPES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Title Input */}
                  <input
                    className="flex-1 h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-right font-medium font-['PeydaWeb'] text-sm outline-none focus:border-[#FDD00A]"
                    value={current.title || ''}
                    placeholder="عنوان"
                    onChange={(e) => handleChange(price.id, 'title', e.target.value)}
                  />
                </div>

                {/* Row 2: Price and Discount */}
                <div className="flex gap-2">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium font-['PeydaWeb']">
                      قیمت (ریال)
                    </label>
                    <input
                      className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-right font-num-medium font-['PeydaFaNum'] text-sm outline-none focus:border-[#FDD00A]"
                      value={current.amount ? parseInt(String(current.amount)).toLocaleString() : ''}
                      onChange={(e) =>
                        handleChange(price.id, 'amount', e.target.value.replace(/\D/g, ''))
                      }
                    />
                  </div>
                  <div className="w-1/3 flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium font-['PeydaWeb']">
                      تخفیف %
                    </label>
                    <input
                      className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-center font-num-medium font-['PeydaFaNum'] text-sm outline-none focus:border-[#FDD00A]"
                      value={current.discount_percent || ''}
                      onChange={(e) => handleChange(price.id, 'discount_percent', e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 3: Inventory */}
                <div className="flex gap-2">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium font-['PeydaWeb']">
                      موجودی
                    </label>
                    <input
                      className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-right font-num-medium font-['PeydaFaNum'] text-sm outline-none focus:border-[#FDD00A]"
                      value={current.inventory || ''}
                      onChange={(e) => handleChange(price.id, 'inventory', e.target.value)}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-xs text-gray-500 font-medium font-['PeydaWeb']">
                      هشدار موجودی
                    </label>
                    <input
                      className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-right font-num-medium font-['PeydaFaNum'] text-sm outline-none focus:border-[#FDD00A]"
                      value={current.warn_inventory || ''}
                      onChange={(e) => handleChange(price.id, 'warn_inventory', e.target.value)}
                    />
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end items-center mt-3 border-t border-gray-100 pt-3">
                  {isEdited ? (
                    <div className="flex items-center gap-2 w-full">
                      <button
                        onClick={() => handleSave(price.id)}
                        className="flex-1 h-10 rounded-xl bg-[#FDD00A] text-[#1A1C1E] text-sm font-bold font-['PeydaWeb'] hover:opacity-90 transition-opacity flex items-center justify-center"
                      >
                        ذخیره تغییرات
                      </button>
                      <button
                        onClick={() => handleCancel(price.id)}
                        className="flex-1 h-10 rounded-xl border border-red-100 text-red-500 bg-red-50 text-sm font-bold font-['PeydaWeb'] hover:bg-red-100 transition-colors flex items-center justify-center"
                      >
                        لغو
                      </button>
                    </div>
                  ) : (
                    <div className="flex w-full justify-between items-center">
                      <div className="text-xs text-gray-400 font-normal font-['PeydaWeb']">
                        {/* Optional: Add timestamp or extra info here if needed */}
                      </div>
                      <button
                        onClick={() => handleDelete(price.id)}
                        className="px-4 py-2 rounded-xl text-red-500 bg-red-50 text-xs font-bold font-['PeydaWeb'] hover:bg-red-100 transition-colors flex items-center gap-1"
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

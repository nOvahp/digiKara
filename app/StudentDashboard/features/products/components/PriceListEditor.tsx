import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { X, Trash2, Plus, ChevronDown, Minus, Check } from 'lucide-react';
import { toast } from 'sonner';
import { studentProductService } from '@/app/services/studentProductService';
import { Price } from '@/app/StudentDashboard/data/products';

const VARIANT_OPTIONS = [
  { id: 1, label: 'رنگ', icon: '🎨' },
  { id: 2, label: 'سایز', icon: '📏' },
  { id: 6, label: 'وزن', icon: '⚖️' },
  { id: 7, label: 'حجم', icon: '🧊' },
];

const COLORS = [
  { bg: '#FF3B30', name: 'قرمز' },
  { bg: '#FFCC00', name: 'زرد' },
  { bg: '#34C759', name: 'سبز' },
  { bg: '#32ADE6', name: 'آبی آسمانی' },
  { bg: '#007AFF', name: 'آبی' },
  { bg: '#AF52DE', name: 'بنفش' },
  { bg: '#FF2D55', name: 'صورتی' },
  { bg: 'linear-gradient(180deg, #007AFF 0%, #F5234B 100%)', name: 'چند رنگ' },
];

// Helper functions for color conversion
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 4) {
    r = parseInt('0x' + hex[1] + hex[1]);
    g = parseInt('0x' + hex[2] + hex[2]);
    b = parseInt('0x' + hex[3] + hex[3]);
  } else if (hex.length === 7) {
    r = parseInt('0x' + hex[1] + hex[2]);
    g = parseInt('0x' + hex[3] + hex[4]);
    b = parseInt('0x' + hex[5] + hex[6]);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
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

    const label = getTypeLabel(parseInt(newPrice.type || '1'));
    const finalTitle = `${label}: ${newPrice.title}`;

    const payload = {
      title: finalTitle,
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

  const inferType = (title: string, currentType: number) => {
    if (!title) return currentType;
    const t = title.trim();
    if (t.startsWith('وزن:') || t.startsWith('وزن :')) return 6;
    if (t.startsWith('حجم:') || t.startsWith('حجم :')) return 7;
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

  const getTypeLabel = (id: number) => {
    return VARIANT_OPTIONS.find(o => o.id === id)?.label || 'متفرقه';
  };

  return (
    <div className="w-full flex flex-col gap-4 p-5 bg-white rounded-2xl border border-[#DFE1E7] shadow-sm">
      <div className="w-full flex flex-col gap-4">
        <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] text-right">
          لیست ویژگی ها و تنوع محصول
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
        <div className="bg-white p-4 rounded-xl border border-[#FDD00A] flex flex-col gap-4 shadow-sm relative transition-all animate-in fade-in zoom-in-95 duration-200">
          <div
            className="absolute top-2 left-2 cursor-pointer p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setIsAdding(false)}
          >
            <X className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-sm font-medium text-[#0D0D12] font-['PeydaWeb'] text-right">
            افزودن ویژگی جدید
          </div>

          {/* Type Selector (Custom Dropdown) */}
          <div className="relative w-full z-20">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-between px-3 hover:border-[#FDD00A] transition-colors"
                title="انتخاب ویژگی"
              >
                <div className="flex justify-start items-center gap-2">
                  <span className="text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] leading-6 tracking-wide">
                   {getTypeLabel(parseInt(newPrice.type))}
                  </span>
                </div>
                 <ChevronDown className={`w-5 h-5 text-[#818898] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-[60px] left-0 right-0 bg-white rounded-xl shadow-lg border border-[#E4E2E4] overflow-hidden flex flex-col z-30 animate-in fade-in zoom-in-95 duration-200">
                  {VARIANT_OPTIONS.map((opt) => {
                    const isSelected = parseInt(newPrice.type) === opt.id;
                    const isSingleType = opt.id === 2 || opt.id === 6 || opt.id === 7;
                    const alreadyExists = prices?.some((p) => p.type === opt.id) || false;
                    const isDisabled = isSingleType && alreadyExists;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => {
                            if (isDisabled) return;
                            setNewPrice({ ...newPrice, type: opt.id.toString(), title: '' }); // Reset title when type changes
                            setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 flex justify-between items-center border-b border-gray-100 last:border-0 ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50 cursor-pointer'}`}
                      >
                        <div className="flex items-center gap-2">
                           <span className="text-lg">{opt.icon}</span>
                          <span className="text-[#262527] font-semibold font-['PeydaWeb']">
                            {opt.label}
                            {isDisabled && <span className="text-xs text-red-500 mr-2">(فقط یکی مجاز است)</span>}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded border ${isSelected ? 'bg-[#FDD00A] border-[#FDD00A]' : 'border-[#DFE1E7]'} flex items-center justify-center`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          {/* Feature Inputs (Based on Type) */}
          <div className="flex flex-col gap-2">
             {parseInt(newPrice.type) === 1 ? (
                 // Color Picker UI
                 <div className="flex items-center gap-2 overflow-x-auto no-scrollbar h-[60px] pl-2 w-full">
                     {/* Add Color Button */}
                    <div
                        onClick={() => setShowColorPicker(true)}
                        className={`w-[48px] h-[48px] rounded-xl cursor-pointer flex-shrink-0 flex items-center justify-center transition-all bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 relative overflow-hidden ring-1 ring-[#DFE1E7] hover:ring-[#FDD00A] hover:scale-105 shadow-sm text-white`}
                        title="افزودن رنگ جدید"
                    >
                        <Plus className="w-5 h-5 drop-shadow-md" />
                    </div>

                     {/* Selected Color (Title) */}
                     {newPrice.title && (
                         <div
                            className="w-12 h-12 rounded-xl cursor-pointer flex-shrink-0 flex items-center justify-center ring-1 relative group transition-all shadow-sm ring-[#FDD00A]"
                            style={{ background: newPrice.title.startsWith('#') ? newPrice.title : COLORS.find(c => c.name === newPrice.title)?.bg || newPrice.title }}
                            title={newPrice.title}
                         >
                            <div 
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setNewPrice({ ...newPrice, title: '' });
                                }}
                            >
                                <X className="w-3 h-3" />
                            </div>
                         </div>
                     )}
                 </div>
             ) : parseInt(newPrice.type) === 2 ? (
                 // Size Input (L x W x H)
                 <div className="flex flex-col gap-2 w-full py-1">
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full pb-1">
                        {/* Dimension Inputs Group */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-1.5 flex items-center gap-2 flex-shrink-0 h-[48px]">
                            <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 px-2 h-full shadow-sm">
                                <input
                                type="text"
                                className="w-[45px] h-full bg-transparent border-none text-center text-sm font-num-medium outline-none focus:placeholder-transparent placeholder:text-gray-400"
                                placeholder="طول"
                                id="size_l"
                                />
                                <span className="text-gray-300">|</span>
                                <input
                                type="text"
                                className="w-[45px] h-full bg-transparent border-none text-center text-sm font-num-medium outline-none focus:placeholder-transparent placeholder:text-gray-400"
                                placeholder="عرض"
                                id="size_w"
                                />
                                <span className="text-gray-300">|</span>
                                <input
                                type="text"
                                className="w-[45px] h-full bg-transparent border-none text-center text-sm font-num-medium outline-none focus:placeholder-transparent placeholder:text-gray-400"
                                placeholder="ارتفاع"
                                id="size_h"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    const l = (document.getElementById('size_l') as HTMLInputElement).value;
                                    const w = (document.getElementById('size_w') as HTMLInputElement).value;
                                    const h = (document.getElementById('size_h') as HTMLInputElement).value;
                                    
                                    if (l && w && h) {
                                        const val = `${l}x${w}x${h}`;
                                        setNewPrice({ ...newPrice, title: val });
                                        // Clear inputs
                                        (document.getElementById('size_l') as HTMLInputElement).value = '';
                                        (document.getElementById('size_w') as HTMLInputElement).value = '';
                                        (document.getElementById('size_h') as HTMLInputElement).value = '';
                                    }
                                }}
                                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-[#FDD00A] hover:text-[#FDD00A] transition-all shadow-sm"
                            >
                                <Plus className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                         {/* Selected Size Chip */}
                         {newPrice.title && (
                            <div className="bg-white rounded-xl px-3 py-1.5 flex items-center gap-2 border border-gray-200 shadow-sm flex-shrink-0 min-h-[36px]">
                                <span className="text-sm font-num-medium text-[#0D0D12]">{newPrice.title}</span>
                                <div 
                                    className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors"
                                    onClick={() => setNewPrice({ ...newPrice, title: '' })}
                                >
                                    <X className="w-3 h-3" />
                                </div>
                            </div>
                         )}
                    </div>
                 </div> 
             ) : parseInt(newPrice.type) === 6 || parseInt(newPrice.type) === 7 ? (
                 // Weight/Volume (Generic Input Group)
                  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar h-full pl-2 w-full py-1">
                    {/* Input Group */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-2 py-1.5 flex items-center gap-1 flex-shrink-0 h-[42px]">
                        <input
                            type="text"
                            className="w-[100px] h-full bg-transparent border-none outline-none text-right text-sm font-num-medium placeholder:text-gray-400 px-1"
                            placeholder="افزودن..."
                            id="generic_input"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const val = (e.target as HTMLInputElement).value.trim();
                                    if (val) {
                                        setNewPrice({ ...newPrice, title: val });
                                        (e.target as HTMLInputElement).value = '';
                                    }
                                }
                            }}
                        />
                        <button
                            onClick={() => {
                                const val = (document.getElementById('generic_input') as HTMLInputElement).value.trim();
                                if (val) {
                                    setNewPrice({ ...newPrice, title: val });
                                    (document.getElementById('generic_input') as HTMLInputElement).value = '';
                                }
                            }}
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-[#FDD00A] hover:text-[#FDD00A] transition-all shadow-sm"
                        >
                            <Plus className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>

                    {/* Selected Chip */}
                     {newPrice.title && (
                        <div className="bg-white rounded-xl px-3 py-1.5 flex items-center gap-2 border border-gray-200 shadow-sm flex-shrink-0 min-h-[36px]">
                            <span className="text-sm font-num-medium text-[#0D0D12]">{newPrice.title}</span>
                            <div 
                                className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors"
                                onClick={() => setNewPrice({ ...newPrice, title: '' })}
                            >
                                <X className="w-3 h-3" />
                            </div>
                        </div>
                     )}
                  </div>
             ) : (
                 // Fallback for other types (Misc, Material, Warranty) - Standard Input
                 <div className="flex flex-col gap-2">
                    <div className="text-right text-[#666D80] text-sm font-medium font-['PeydaWeb']">
                        عنوان ویژگی
                    </div>
                    <input
                        placeholder="مقدار را وارد کنید..."
                        className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-right font-medium font-['PeydaWeb'] text-sm outline-none focus:border-[#FDD00A] transition-colors"
                        value={newPrice.title}
                        onChange={(e) => setNewPrice({ ...newPrice, title: e.target.value })}
                        dir="rtl"
                    />
                 </div>
             )}
          </div>

          {/* Price Difference (Full Width) */}
          {/* 
          <div className="flex flex-col gap-2 w-full mt-2">
            <div className="text-right text-[#666D80] text-sm font-medium font-['PeydaWeb']">
              تفاوت قیمت (نسبت به پایه)
            </div>

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
          */}

          {/* Discount & Inventory Rows */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-right text-[#666D80] text-sm font-medium font-['PeydaWeb']">
                تخفیف %
              </div>
              <input
                type="number"
                className="w-full h-[52px] px-3 rounded-xl border border-[#DFE1E7] text-center font-num-medium font-['PeydaFaNum'] text-sm outline-none focus:border-[#FDD00A]"
                value={newPrice.discount_percent}
                placeholder="0"
                onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    if (val >= 0 && val <= 100) {
                         setNewPrice({ ...newPrice, discount_percent: e.target.value })
                    } else if (e.target.value === '') {
                         setNewPrice({ ...newPrice, discount_percent: '' })
                    }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-right text-[#666D80] text-sm font-medium font-['PeydaWeb']">
                موجودی
              </div>
              <input
                type="number"
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
                 type="number"
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
          هیچ تنوع ویژگی‌ برای این محصول ثبت نشده است.
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
                {/* Header: Title and Type (Read-only view mainly, edit view below) */}
                 <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                        <span className="text-sm font-bold text-[#0D0D12]">{current.title}</span>
                         <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                             {getTypeLabel(current.type || 1)}
                         </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {/* <div className="flex flex-col gap-1">
                             <span className="text-gray-500 text-xs">قیمت</span>
                             <span className="font-num-medium">{parseInt(String(current.amount)).toLocaleString()} ریال</span>
                        </div> */}
                        <div className="flex flex-col gap-1">
                             <span className="text-gray-500 text-xs">تخفیف</span>
                             <span className="font-num-medium">{current.discount_percent || 0}%</span>
                        </div>
                         <div className="flex flex-col gap-1">
                             <span className="text-gray-500 text-xs">موجودی</span>
                             <span className="font-num-medium">{current.inventory || 0}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                             <span className="text-gray-500 text-xs">هشدار</span>
                             <span className="font-num-medium">{current.warn_inventory || 0}</span>
                        </div>
                    </div>
                </div>


                {/* Action Buttons */}
                <div className="flex justify-end items-center mt-2 pt-2 gap-2">
                     <button
                        onClick={() => handleDelete(price.id)}
                        className="p-2 rounded-lg text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Color Picker Modal */}
      {showColorPicker && (
        <ColorPickerModal
            startColor={COLORS[0].bg}
            onClose={() => setShowColorPicker(false)}
            onConfirm={(color) => {
                setNewPrice({ ...newPrice, title: color }); // We save hex/color string as title
                setShowColorPicker(false);
            }}
        />
       )}
    </div>
  );
}

// Color Picker Modal Component
interface ColorPickerModalProps {
  startColor: string;
  onClose: () => void;
  onConfirm: (color: string) => void;
}

function ColorPickerModal({ startColor, onClose, onConfirm }: ColorPickerModalProps) {
  const [hex, setHex] = useState(startColor);
  const [hue, setHue] = useState(() => hexToHsl(startColor).h);

  useEffect(() => {
     // initial sync
  }, []);

  const handleHueChange = (newHue: number) => {
    setHue(newHue);
    const newHex = hslToHex(newHue, 100, 50);
    setHex(newHex);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[320px] bg-white rounded-2xl shadow-2xl p-5 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <span className="text-lg font-semibold text-[#0D0D12]">
            انتخاب رنگ
          </span>
        </div>

        <div
          className="w-full h-24 rounded-xl border border-gray-200 shadow-inner transition-colors duration-200"
          style={{ background: hex }}
        />

        <div className="flex flex-col gap-2">
          <label className="text-right text-sm font-medium text-gray-600 font-['PeydaWeb']">
            طیف رنگ
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => handleHueChange(Number(e.target.value))}
            className="w-full h-4 rounded-lg appearance-none cursor-pointer"
            style={{
              background:
                'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-right text-sm font-medium text-gray-600 font-['PeydaWeb']">
            کد رنگ (Hex)
          </label>
          <div className="flex items-center border border-gray-200 rounded-xl px-3 h-10 focus-within:border-[#FDD00A] transition-colors">
            <span className="text-gray-400 mr-2">#</span>
            <input
              type="text"
              value={hex.replace('#', '')}
              onChange={(e) => {
                const val = '#' + e.target.value;
                setHex(val);
                if (/^#[0-9A-F]{6}$/i.test(val)) {
                  const { h } = hexToHsl(val);
                  setHue(h);
                }
              }}
              className="flex-1 outline-none text-left font-mono text-sm uppercase text-[#0D0D12]"
              maxLength={6}
            />
          </div>
        </div>

         <div className="flex flex-col gap-2">
          <label className="text-right text-sm font-medium text-gray-600 font-['PeydaWeb']">
            پیش‌فرض‌ها
          </label>
          <div className="grid grid-cols-6 gap-2">
            {[
              '#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#00C7BE', '#32ADE6',
              '#007AFF', '#5856D6', '#AF52DE', '#FF2D55', '#A2845E', '#000000',
            ].map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setHex(preset);
                  const { h } = hexToHsl(preset);
                  setHue(h);
                }}
                className="w-8 h-8 rounded-full border border-gray-100 hover:scale-110 transition-transform shadow-sm"
                style={{ background: preset }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-2">
            <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
            انصراف
            </button>
            <button
            onClick={() => onConfirm(hex)}
            className="flex-1 h-10 rounded-xl bg-[#FDD00A] text-[#1A1C1E] text-sm font-semibold hover:bg-[#eac009] transition-colors shadow-sm"
            >
            تایید
            </button>
        </div>
      </div>
    </div>
  );
}

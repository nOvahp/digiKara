// ... imports
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Info, X, Plus, Trash2, Check } from 'lucide-react';

// ... interfaces

const VARIANT_OPTIONS = [
  { id: 'color', label: 'رنگ', icon: '🎨' },
  { id: 'weight', label: 'وزن', icon: '⚖️' },
  { id: 'size', label: 'اندازه', icon: '📏' },
  { id: 'volume', label: 'حجم', icon: '🧊' },
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

interface FeatureItem {
  key: string;
  value: string;
}

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

import { AddProductFormState } from '../types';
import { Input } from '@/components/ui/input';
import { ProductStepper } from './shared/ProductStepper';

interface NewProductPage2Props {
  onClose: () => void;
  onNext: () => void;
  onStepClick: (step: string) => void;
  formData: AddProductFormState;
  updateFormData: (data: Partial<AddProductFormState>) => void;
  maxStep: number;
}

export function NewProductPage2({
  onClose,
  onNext,
  onStepClick,
  formData,
  updateFormData,
  maxStep,
}: NewProductPage2Props) {
  const [openSection, setOpenSection] = useState<string | null>('id');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [featureInputs, setFeatureInputs] = useState<Record<string, string>>({});
  const [pendingColor, setPendingColor] = useState<string | null>(null);

  // Initialize variant features if not present
  useEffect(() => {
    if (!formData.variantFeatures) {
      updateFormData({ variantFeatures: [] });
    }
  }, [formData.variantFeatures, updateFormData]);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const updateStaticFeatures = (
    section: 'id' | 'visual' | 'production' | 'packaging',
    items: FeatureItem[],
  ) => {
    const currentFeatures = formData.features || {
      id: [],
      visual: [],
      production: [],
      packaging: [],
    };
    updateFormData({
      features: {
        ...currentFeatures,
        [section]: items,
      },
    });
  };

  const toggleVariantFeature = (type: string) => {
    const currentVariants = formData.variantFeatures || [];
    const exists = currentVariants.find((v) => v.id === type);

    if (exists) {
      // Remove
      updateFormData({
        variantFeatures: currentVariants.filter((v) => v.id !== type),
      });
    } else {
      // Add
      updateFormData({
        variantFeatures: [
          ...currentVariants,
          {
            id: type,
            title: VARIANT_OPTIONS.find((o) => o.id === type)?.label || '',
            values: [],
          },
        ],
      });
    }
  };

  const updateVariantValues = (id: string, values: string[]) => {
    const currentVariants = formData.variantFeatures || [];
    updateFormData({
      variantFeatures: currentVariants.map((v) => (v.id === id ? { ...v, values } : v)),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0D0D12] opacity-40 backdrop-blur-[1px]"
        onClick={onClose}
      />
      <div className="relative w-[375px] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="w-full px-5 py-5 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
          <div
            className="w-10 h-10 relative overflow-hidden rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-[#0D0D12]" />
          </div>
          <div className="text-[#0D0D12] text-lg font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
            افزودن محصول جدید
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto w-full no-scrollbar">
          {/* Progress Bar */}
          <ProductStepper currentStep="step2" onStepClick={onStepClick} maxStep={maxStep} />

          <div className="p-5 flex flex-col gap-4" dir="rtl">
            {/* Variant Feature Selector */}
            <div className="relative w-full z-20">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-[52px] bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-between px-3 hover:border-[#FDD00A] transition-colors"
              >
                <div className="flex justify-start items-center gap-2">
                  <span className="text-center text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] leading-6 tracking-wide">
                    ویژگی
                  </span>
                </div>
                <div className="w-[1px] h-[40px] bg-[#DFE1E7] mx-2 "></div>
                <div className="flex-1 text-right text-[#DFE1E7] text-base font-semibold font-['PeydaFaNum'] leading-6 tracking-wide">
                  توضیحات
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-[60px] left-0 right-0 bg-white rounded-xl shadow-lg border border-[#E4E2E4] overflow-hidden flex flex-col z-30 animate-in fade-in zoom-in-95 duration-200">
                  {VARIANT_OPTIONS.map((opt) => {
                    const isSelected = formData.variantFeatures?.some((v) => v.id === opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleVariantFeature(opt.id)}
                        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[#262527] font-semibold font-['PeydaWeb']">
                            {opt.label}
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
                  <div className="p-2">
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full py-2 text-[#4365DE] text-sm font-semibold font-['PeydaWeb'] hover:bg-blue-50 rounded-lg"
                    >
                      تائید
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Variant Inputs */}
            <div className="flex flex-col gap-3">
              {formData.variantFeatures?.map((feature) => (
                <div
                  key={feature.id}
                  className="w-full bg-white rounded-xl border border-[#DFE1E7] p-1 flex items-center h-[52px]"
                >
                  {/* Label Section */}
                  <div className="w-[80px] h-full flex items-center justify-center border-l border-[#DFE1E7]">
                    <span className="text-[#262527] font-semibold font-['PeydaWeb']">
                      {feature.title}
                    </span>
                  </div>

                  {/* Input Section */}
                  <div className="flex-1 px-3 h-full flex items-center min-w-0">
                    {feature.id === 'color' ? (
                      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar h-full pl-2 w-full">
                        {/* Add Color Button (Opens Modal) - Moved to Start for Right Alignment in RTL */}
                        <div
                          onClick={() => setShowColorPicker(true)}
                          className={`w-[24px] h-[24px] rounded-md cursor-pointer flex-shrink-0 flex items-center justify-center transition-all bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 relative overflow-hidden ring-1 ring-[#DFE1E7] hover:ring-[#FDD00A]`}
                          title="افزودن رنگ جدید"
                        >
                          <Plus className="w-3 h-3 text-white drop-shadow-md" />
                        </div>
                        {/* Selected Colors List */}
                        {(feature.values || []).map((val, idx) => {
                          // Try to find if it's a predefined color to get its special bg (e.g. gradient)
                          const predefined = COLORS.find((c) => c.name === val);
                          const background = predefined ? predefined.bg : val;

                          return (
                            <div
                              key={`${val}-${idx}`}
                              onClick={() => {
                                const current = feature.values || [];
                                updateVariantValues(
                                  'color',
                                  current.filter((c) => c !== val),
                                );
                              }}
                              className="w-[24px] h-[24px] rounded-md cursor-pointer flex-shrink-0 flex items-center justify-center ring-1 ring-[#DFE1E7] relative group"
                              style={{ background: val.startsWith('#') || val.startsWith('rgb') ? val : COLORS.find((c) => c.name === val)?.bg || val }}
                              title={val}
                            >
                              <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/20 flex items-center justify-center rounded-md transition-opacity">
                                <X className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : feature.id === 'weight' || feature.id === 'volume' ? (
                      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar h-full pl-2 w-full py-1">
                        {/* Input Group */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl px-2 py-1.5 flex items-center gap-1 flex-shrink-0 h-[42px]">
                          <input
                            type="text"
                            className="w-[100px] h-full bg-transparent border-none outline-none text-right text-sm font-num-medium placeholder:text-gray-400 px-1"
                            placeholder="افزودن..."
                            value={featureInputs[feature.id] || ''}
                            onChange={(e) =>
                              setFeatureInputs({ ...featureInputs, [feature.id]: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const val = featureInputs[feature.id]?.trim();
                                if (val) {
                                  const current = feature.values || [];
                                  if (!current.includes(val)) {
                                    updateVariantValues(feature.id, [...current, val]);
                                  }
                                  setFeatureInputs({ ...featureInputs, [feature.id]: '' });
                                }
                              }
                            }}
                          />
                          <button
                            onClick={() => {
                              const val = featureInputs[feature.id]?.trim();
                              if (val) {
                                const current = feature.values || [];
                                if (!current.includes(val)) {
                                  updateVariantValues(feature.id, [...current, val]);
                                }
                                setFeatureInputs({ ...featureInputs, [feature.id]: '' });
                              }
                            }}
                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-[#FDD00A] hover:text-[#FDD00A] transition-all shadow-sm"
                          >
                            <Plus className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                        
                        {/* Selected Items Chips */}
                        <div className="flex items-center gap-2">
                          {(feature.values || []).map((val, idx) => (
                            <div
                              key={idx}
                              className="bg-white rounded-xl px-3 py-1.5 flex items-center gap-2 border border-gray-200 shadow-sm flex-shrink-0 min-h-[36px]"
                            >
                              <span className="text-sm font-num-medium text-[#0D0D12]">{val}</span>
                              <div 
                                className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors"
                                onClick={() => {
                                  const current = feature.values || [];
                                  updateVariantValues(
                                    feature.id,
                                    current.filter((v) => v !== val),
                                  );
                                }}
                              >
                                <X className="w-3 h-3" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : feature.id === 'size' ? (
                      <div className="flex flex-col gap-2 w-full py-1">
                        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full pb-1">
                          {/* Dimension Inputs Group */}
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-1.5 flex items-center gap-2 flex-shrink-0 h-[48px]">
                            <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 px-2 h-full shadow-sm">
                              <input
                                type="text"
                                className="w-[45px] h-full bg-transparent border-none text-center text-sm font-num-medium outline-none focus:placeholder-transparent placeholder:text-gray-400"
                                placeholder="طول"
                                value={featureInputs['size_l'] || ''}
                                onChange={(e) =>
                                  setFeatureInputs({ ...featureInputs, size_l: e.target.value })
                                }
                              />
                              <span className="text-gray-300">|</span>
                              <input
                                type="text"
                                className="w-[45px] h-full bg-transparent border-none text-center text-sm font-num-medium outline-none focus:placeholder-transparent placeholder:text-gray-400"
                                placeholder="عرض"
                                value={featureInputs['size_w'] || ''}
                                onChange={(e) =>
                                  setFeatureInputs({ ...featureInputs, size_w: e.target.value })
                                }
                              />
                              <span className="text-gray-300">|</span>
                              <input
                                type="text"
                                className="w-[45px] h-full bg-transparent border-none text-center text-sm font-num-medium outline-none focus:placeholder-transparent placeholder:text-gray-400"
                                placeholder="ارتفاع"
                                value={featureInputs['size_h'] || ''}
                                onChange={(e) =>
                                  setFeatureInputs({ ...featureInputs, size_h: e.target.value })
                                }
                              />
                            </div>
                            <button
                              onClick={() => {
                                const l = featureInputs['size_l']?.trim();
                                const w = featureInputs['size_w']?.trim();
                                const h = featureInputs['size_h']?.trim();
                                if (l && w && h) {
                                  const val = `${l}x${w}x${h}`;
                                  const current = feature.values || [];
                                  if (!current.includes(val)) {
                                    updateVariantValues(feature.id, [...current, val]);
                                  }
                                  setFeatureInputs({ ...featureInputs, size_l: '', size_w: '', size_h: '' });
                                }
                              }}
                              className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-[#FDD00A] hover:text-[#FDD00A] transition-all shadow-sm"
                            >
                              <Plus className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>

                          {/* Selected Sizes Chips */}
                          <div className="flex items-center gap-2">
                            {(feature.values || []).map((val, idx) => (
                              <div
                                key={idx}
                                className="bg-white rounded-xl px-3 py-1.5 flex items-center gap-2 border border-gray-200 shadow-sm flex-shrink-0 min-h-[36px]"
                              >
                                <span className="text-sm font-num-medium text-[#0D0D12]">{val}</span>
                                <div
                                  className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors"
                                  onClick={() => {
                                    const current = feature.values || [];
                                    updateVariantValues(
                                      feature.id,
                                      current.filter((v) => v !== val),
                                    );
                                  }}
                                >
                                  <X className="w-3 h-3" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Input
                        type="text"
                        className="w-full h-full outline-none text-right text-sm font-['PeydaWeb'] font-medium placeholder:text-[#DFE1E7] placeholder:font-num-medium border-none shadow-none focus-visible:ring-0 px-0"
                        placeholder={`با ، ${feature.title} های مختلف را از هم جدا کنید`}
                        value={feature.values?.join('، ') || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const vals = val.split(/,|،/).map((s: string) => s.trim());
                          updateVariantValues(feature.id, vals);
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Info Alert */}
            <div className="w-full flex justify-start items-start gap-2">
              <Info className="w-5 h-5 text-[#666D80] mt-0.5 shrink-0" />
              <p className="flex-1 text-right text-[#666D80] text-[13px] font-light font-['PeydaWeb'] leading-tight">
                اگر محصول شما دارای تنوع در ویژگی‌ها و قیمت‌ها است، ویژگی‌های اصلی قابل انتخاب توسط
                مشتری را تعیین کنید.
              </p>
            </div>

            {/* Accordions (Static Features) */}
            <div className="w-full flex flex-col gap-2">
              <AccordionItem
                label="مشخصات شناسنامه‌ای محصول"
                isOpen={openSection === 'id'}
                onClick={() => toggleSection('id')}
              >
                <FeatureSection
                  items={formData.features?.id || []}
                  onChange={(items) => updateStaticFeatures('id', items)}
                  placeholderKey="عنوان (مثلا: برند)"
                  placeholderValue="مقدار (مثلا: ایرانپوش)"
                />
              </AccordionItem>
              {/* ... other accordions ... */}
              <AccordionItem
                label="مشخصات ظاهری و حسی"
                isOpen={openSection === 'visual'}
                onClick={() => toggleSection('visual')}
              >
                <FeatureSection
                  items={formData.features?.visual || []}
                  onChange={(items) => updateStaticFeatures('visual', items)}
                  placeholderKey="عنوان (مثلا: رنگ)"
                  placeholderValue="مقدار (مثلا: قرمز)"
                />
              </AccordionItem>

              <AccordionItem
                label="نحوه تولید و فرآوری"
                isOpen={openSection === 'production'}
                onClick={() => toggleSection('production')}
              >
                <FeatureSection
                  items={formData.features?.production || []}
                  onChange={(items) => updateStaticFeatures('production', items)}
                  placeholderKey="عنوان (مثلا: روش تولید)"
                  placeholderValue="مقدار (مثلا: دست‌ساز)"
                />
              </AccordionItem>

              <AccordionItem
                label="بسته‌بندی و عرضه"
                isOpen={openSection === 'packaging'}
                onClick={() => toggleSection('packaging')}
              >
                <FeatureSection
                  items={formData.features?.packaging || []}
                  onChange={(items) => updateStaticFeatures('packaging', items)}
                  placeholderKey="عنوان (مثلا: نوع بسته)"
                  placeholderValue="مقدار (مثلا: جعبه مقوایی)"
                />
              </AccordionItem>
            </div>

            {/* Bottom Info */}
            <div className="w-full flex justify-end items-start gap-2 mt-2">
              <Info className="w-5 h-5 text-[#666D80] mt-0.5 transform rotate-180" />
              <p className="flex-1 text-right text-[#666D80] text-[13px] font-light font-['PeydaWeb'] leading-tight">
                تکمیل جزئیات فنی محصول، علاوه بر افزایش اعتماد مشتری، باعث بهبود رتبه محصول در نتایج
                جستجو می‌شود. توصیه می‌کنیم برای تمایز از رقبا، این بخش را تکمیل فرمایید.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full p-5 border-t border-[#DFE1E7] bg-white flex justify-end items-center gap-3.5 z-10 mt-auto">
          <button
            className="w-[57px] h-[57px] rounded-xl border border-[#DCE4E8] flex justify-center items-center hover:bg-gray-50"
            onClick={() => onStepClick('step1')}
          >
            <ChevronRight className="w-6 h-6 text-[#1A1C1E] rotate-180" />
          </button>

          <button
            onClick={onNext}
            className="flex-1 h-10 px-4 py-3.5 bg-gradient-to-t from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.15)] bg-[#FDD00A] shadow-[0px_1px_2px_rgba(13,13,18,0.06)] rounded-xl border border-[#FDD00A] flex justify-center items-center gap-2 hover:opacity-90 transition-opacity h-[57px]"
          >
            <span className="text-center text-[#1A1C1E] text-[17.58px] font-semibold font-['PeydaWeb'] leading-[24.61px]">
              ادامه
            </span>
          </button>
        </div>
      </div>

      {/* Color Picker Modal */}
      {showColorPicker && (
        <ColorPickerModal
          startColor={COLORS[0].bg} // Default start
          onClose={() => setShowColorPicker(false)}
          onConfirm={(color) => {
            const current = formData.variantFeatures?.find((f) => f.id === 'color')?.values || [];
            if (!current.includes(color)) {
              updateVariantValues('color', [...current, color]);
            }
            setShowColorPicker(false);
          }}
        />
      )}
    </div>
  );
}

interface ColorPickerModalProps {
  startColor: string;
  onClose: () => void;
  onConfirm: (color: string) => void;
}

function ColorPickerModal({ startColor, onClose, onConfirm }: ColorPickerModalProps) {
  const [hex, setHex] = useState(startColor);
  const [hue, setHue] = useState(() => hexToHsl(startColor).h);

  // Sync state if startColor prop changes
  useEffect(() => {
    const { h } = hexToHsl(startColor);
    setHue(h);
    setHex(startColor);
  }, [startColor]);

  // When hue changes, update hex (keep saturation/lightness 100/50 for vibrancy)
  const handleHueChange = (newHue: number) => {
    setHue(newHue);
    const newHex = hslToHex(newHue, 100, 50);
    setHex(newHex);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[320px] bg-white rounded-2xl shadow-2xl p-5 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <span className="text-lg font-semibold font-['PeydaWeb'] text-[#0D0D12]">
            انتخاب رنگ
          </span>
        </div>

        {/* Preview */}
        <div
          className="w-full h-24 rounded-xl border border-gray-200 shadow-inner transition-colors duration-200"
          style={{ background: hex }}
        />

        {/* Hue Slider */}
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

        {/* Hex Input */}
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
                // Try to update hue if valid hex
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

        {/* Presets */}
        <div className="flex flex-col gap-2">
          <label className="text-right text-sm font-medium text-gray-600 font-['PeydaWeb']">
            پیش‌فرض‌ها
          </label>
          <div className="grid grid-cols-6 gap-2">
            {[
              '#FF3B30',
              '#FF9500',
              '#FFCC00',
              '#34C759',
              '#00C7BE',
              '#32ADE6',
              '#007AFF',
              '#5856D6',
              '#AF52DE',
              '#FF2D55',
              '#A2845E',
              '#000000',
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

        {/* Actions */}
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

// Helper Components


function AccordionItem({
  label,
  isOpen,
  onClick,
  children,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col items-end border-b border-[#F0F0F0] last:border-0 pb-2">
      <div
        className="w-full flex justify-between items-center cursor-pointer py-3 hover:bg-gray-50 rounded-lg px-2"
        onClick={onClick}
      >
        <span className="text-[#666D80] text-sm font-semibold font-['PeydaWeb']">{label}</span>
        <ChevronLeft
          className={`w-5 h-5 text-[#666D80] transition-transform duration-200 ${isOpen ? '-rotate-90' : ''}`}
        />
      </div>
      <div
        className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-2 pt-0 w-full" dir="rtl">
          {children}
        </div>
      </div>
    </div>
  );
}

function FeatureSection({
  items,
  onChange,
  placeholderKey,
  placeholderValue,
}: {
  items: FeatureItem[];
  onChange: (items: FeatureItem[]) => void;
  placeholderKey: string;
  placeholderValue: string;
}) {
  const addRow = () => onChange([...items, { key: '', value: '' }]);
  const removeRow = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const updateRow = (idx: number, field: 'key' | 'value', val: string) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], [field]: val };
    onChange(newItems);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {items.length === 0 && (
        <div className="text-xs text-gray-400 text-center py-2">ویژگی‌ای افزوده نشده است.</div>
      )}

      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-center w-full">
          <Input
            value={item.key}
            onChange={(e) => updateRow(idx, 'key', e.target.value)}
            placeholder={placeholderKey}
            className="flex-1 h-10 px-3 rounded-lg border border-[#DFE1E7] text-right text-sm outline-none focus:border-[#FDD00A] focus:ring-1 focus:ring-[#FDD00A]"
          />
          <div className="text-gray-400">:</div>
          <Input
            value={item.value}
            onChange={(e) => updateRow(idx, 'value', e.target.value)}
            placeholder={placeholderValue}
            className="flex-1 h-10 px-3 rounded-lg border border-[#DFE1E7] text-right text-sm outline-none focus:border-[#FDD00A] focus:ring-1 focus:ring-[#FDD00A]"
          />
          <button
            onClick={() => removeRow(idx)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}

      <button
        onClick={addRow}
        className="w-full h-9 mt-1 border border-dashed border-[#FDD00A] text-[#FDD00A] bg-[#FEFCE8] hover:bg-[#FEF9C3] rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>افزودن ویژگی جدید</span>
      </button>
    </div>
  );
}

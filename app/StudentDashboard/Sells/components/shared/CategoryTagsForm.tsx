import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { FormLabel } from './FormLabel';

interface CategoryTagsFormProps {
    defaultValues?: any;
    values?: { category: string; tags: string[]; metadata: string };
    onChange?: (updates: { category?: string; tags?: string[]; metadata?: string }) => void;
}

export function CategoryTagsForm({ defaultValues = {}, values, onChange }: CategoryTagsFormProps) {
    const [localTags, setLocalTags] = useState<string[]>( defaultValues.tags || ["ارگانیک", "عسل طبیعی"] );

    const currentTags = values?.tags || localTags;
    const currentCategory = values ? values.category : (defaultValues.category || "agricultural");
    const currentMetadata = values ? values.metadata : (defaultValues.metadata || "");

    // Mock available tags
    const availableTags = [
        "ارگانیک",
        "عسل طبیعی",
        "ویژه",
        "محلی",
        "بدون قند",
        "تخفیفی",
        "کوهی",
        "دست‌ساز"
    ];

    const handleAddTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val && !currentTags.includes(val)) {
            const newTags = [...currentTags, val];
            if (onChange) onChange({ tags: newTags });
            else setLocalTags(newTags);
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const newTags = currentTags.filter(t => t !== tagToRemove);
        if (onChange) onChange({ tags: newTags });
        else setLocalTags(newTags);
    };

    return (
        <div className="w-full bg-white rounded-xl border border-[#DFE1E7] p-5 flex flex-col gap-5 shadow-[0px_1px_2px_rgba(13,13,18,0.06)]">
            <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] tracking-wide text-right">
                دسته بندی و برچسب ها
            </div>

             {/* Category Dropdown */}
             <div className="flex flex-col gap-2">
                  <FormLabel text="دسته بندی" />
                  <div className="h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center justify-between relative">
                      <select 
                          className="w-full h-full appearance-none bg-transparent border-none outline-none text-[#0D0D12] text-base font-light font-['PeydaWeb'] leading-normal cursor-pointer text-right dir-rtl pr-2 z-10" 
                          dir="rtl"
                          value={currentCategory}
                          onChange={(e) => onChange ? onChange({ category: e.target.value }) : null}
                      >
                          <option value="agricultural">محصولات کشاورزی</option>
                          <option value="electronic">کالای دیجیتال</option>
                          <option value="fashion">مد و پوشاک</option>
                          <option value="home">خانه و آشپزخانه</option>
                          <option value="other">سایر</option>
                      </select>
                      <div className="absolute left-3 w-5 h-5 pointer-events-none">
                         <ChevronDown className="w-5 h-5 text-[#818898]" />
                      </div>
                  </div>
             </div>

             {/* Tags Dropdown/Multiselect */}
             <div className="flex flex-col gap-2">
                  <FormLabel text="برچسب ها" />
                  <div className="min-h-[52px] px-3 bg-white rounded-xl border border-[#DFE1E7] flex items-center relative flex-wrap py-2 gap-2" dir="rtl">
                      
                      {/* Rendered Chips (z-20 to be clickable over the select) */}
                      <div className="flex gap-2 flex-wrap z-20 pointer-events-none">
                          {currentTags.map(tag => (
                              <div key={tag} className="flex items-center gap-1 px-2 py-0.5 border border-[#DFE1E7] rounded bg-white pointer-events-auto">
                                  <span className="text-[#0D0D12] text-sm font-semibold font-['PeydaWeb']">{tag}</span>
                                  <X 
                                     className="w-3 h-3 text-[#818898] cursor-pointer hover:text-red-500" 
                                     onClick={(e) => {
                                         e.stopPropagation(); // Prevent select opening
                                         handleRemoveTag(tag);
                                     }}
                                  />
                              </div>
                          ))}
                      </div>

                      {/* Hidden Select for Triggering Dropdown (z-10) */}
                      <select 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          onChange={handleAddTag}
                          value="" 
                          dir="rtl"
                      >
                         <option value="" disabled>افزودن برچسب...</option>
                         {availableTags.filter(t => !currentTags.includes(t)).map(t => (
                             <option key={t} value={t}>{t}</option>
                         ))}
                      </select>

                      {/* Chevron Icon */}
                      <div className="absolute left-3 w-5 h-5 pointer-events-none z-0">
                         <ChevronDown className="w-5 h-5 text-[#818898]" />
                      </div>
                  </div>
             </div>

             {/* Metadata */}
              <div className="flex flex-col gap-2">
                  <FormLabel text="متا دیتا" />
                  <textarea 
                     className="h-[100px] w-full p-3 bg-white rounded-xl border border-[#DFE1E7] resize-none outline-none text-right font-['PeydaWeb']"
                     value={currentMetadata}
                     onChange={(e) => onChange ? onChange({ metadata: e.target.value }) : null}
                     dir="rtl"
                  />
                 <div className="text-[#818898] text-sm font-light font-['PeydaWeb'] text-right">برای بهبود رتبه بندی در موتورهای جستجو، توضیحات متا را اضافه کنید.</div>
            </div>
        </div>
    );
}

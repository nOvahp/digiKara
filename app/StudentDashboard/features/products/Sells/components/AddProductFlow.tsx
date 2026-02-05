import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { studentProductService } from "@/app/services/studentProductService";

// Wizard Steps
import { NewProduct } from "./NewProduct";
import { NewProductPage2 } from "./NewProductPage2";
import { NewProductPage3 } from "./NewProductPage3";
import { NewProductPage4 } from "./NewProductPage4";
import { NewProductPage5 } from "./NewProductPage5";
import { NewProductPage6 } from "./NewProductPage6";
import { NewProductPage7 } from "./NewProductPage7";

interface AddProductFlowProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    initialStep?: 'step1';
}

export function AddProductFlow({ isOpen, onClose, onSuccess, initialStep = 'step1' }: AddProductFlowProps) {
    const [activePopup, setActivePopup] = useState<'none' | 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'step6' | 'step7'>('none');
    
    // Sync with external open state
    useEffect(() => {
        if (isOpen) {
            setActivePopup(initialStep);
        } else {
            setActivePopup('none');
        }
    }, [isOpen, initialStep]);

    // Handle internal closing
    const handleClose = () => {
        setActivePopup('none');
        onClose();
    };

    const generateProductCode = () => {
        return `NK-PRD-${Math.floor(100000 + Math.random() * 900000)}`;
    };

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        images: [] as string[],
        category: '',
        tags: [] as string[],
        id: generateProductCode(),
        price: '',
        fee: '',
        receive: '',
        discount: '',
        code: '',
        percent: '',
        stock: '',
        reminder: '',
        imageFiles: [] as File[],
        extraPrices: [] as any[], 
        isMultiPrice: false,
        features: {
            id: [] as { key: string, value: string }[],
            visual: [] as { key: string, value: string }[],
            production: [] as { key: string, value: string }[],
            packaging: [] as { key: string, value: string }[]
        },
        variantFeatures: [] as { id: string, title: string, values: string[] }[]
    });

    // Reset form when flow opens
    useEffect(() => {
        if (isOpen) {
             setFormData(prev => ({...prev, id: generateProductCode()}));
        }
    }, [isOpen]);

    const updateFormData = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleSubmitProduct = async () => {
        const data = new FormData();
        
        // --- Required Fields per User Spec ---
        
        // category_id
        const categoryId = formData.category ? String(formData.category) : '1';
        data.append('category_id', categoryId); 
        
        // code (max 100 chars)
        data.append('code', formData.id || generateProductCode()); 

        // image (Required, Must be an image)
        // We use the first uploaded file as the main image
        if (formData.imageFiles && formData.imageFiles.length > 0) {
            data.append('image', formData.imageFiles[0]);
             // Also append generic images[] if backend supports multiple via this key, but 'image' is strictly required
            formData.imageFiles.forEach((file: File) => {
                data.append('images[]', file);
            });
        }

        // inventory (integer, >= 0)
        data.append('inventory', (formData.stock || '').replace(/\D/g, '') || '0');

        // price (integer, >= 0)
        data.append('price', (formData.price || '').replace(/\D/g, '') || '0'); 

        // title (string, max 255)
        data.append('title', formData.name);

        // type_inventory (number/integer)
        data.append('type_inventory', '1'); 

        // warn_inventory (integer, >= 0)
        data.append('warn_inventory', (formData.reminder || '').replace(/\D/g, '') || '0');
        
        // description (string | null)
        if (formData.description) {
            data.append('description', formData.description);
        }

        // tag_id (string | null) - sending null if no tags, or first tag if we had IDs (currently just strings)
        // Since we only have strings, we'll skip or send null if empty. 
        // If we had a tag mapping, we would use it here.
        if (formData.tags && formData.tags.length > 0) {
             // Placeholder: sending the first tag as string, though API likely wants ID. 
             // If this fails, we might need to fetch real tag IDs.
             // data.append('tag_id', formData.tags[0]); 
        }

        // prices (array object | null[])
        // Structure: amount, title, type, discount_percent, inventory, type_inventory, warn_inventory
        if (formData.isMultiPrice && formData.extraPrices && formData.extraPrices.length > 0) {
             formData.extraPrices.forEach((price: any, index: number) => {
                  // amount (integer, required)
                  data.append(`prices[${index}][amount]`, String(price.amount).replace(/\D/g, ''));
                  
                  // title (string, required)
                  data.append(`prices[${index}][title]`, price.title || `Variant ${index + 1}`);
                  
                  // type (integer, required)
                  data.append(`prices[${index}][type]`, String(price.type || '1'));
                  
                  // discount_percent (string | null)
                  if (price.discount_percent) {
                      data.append(`prices[${index}][discount_percent]`, String(price.discount_percent));
                  }

                  // inventory (string | null per spec, but logically a count)
                  if (price.inventory) {
                      data.append(`prices[${index}][inventory]`, String(price.inventory));
                  }
                  
                  // type_inventory (string | null)
                  data.append(`prices[${index}][type_inventory]`, '1'); 

                  // warn_inventory (string | null)
                  if (price.warn_inventory) {
                      data.append(`prices[${index}][warn_inventory]`, String(price.warn_inventory));
                  }
             });
        }

        // Optional: Metadata for extra features
        if (formData.features) {
            data.append('metadata', JSON.stringify(formData.features));
        }
        
        // Sending
        const response = await studentProductService.addProduct(data);
        const { success, message } = response;
        
        if (success) {
            toast.success(message || 'محصول با موفقیت اضافه شد');
            setActivePopup('step7');
            if (onSuccess) onSuccess();
        } else {
            toast.error(message || 'خطا در ثبت محصول');
        }
    };

    const handleReset = () => {
        setFormData({
            name: '', description: '', images: [], category: '', tags: [], id: generateProductCode(),
            price: '', fee: '', receive: '', discount: '', code: '', percent: '', stock: '', reminder: '',
            imageFiles: [], extraPrices: [], isMultiPrice: false,
            features: { id: [], visual: [], production: [], packaging: [] },
            variantFeatures: []
        });
        handleClose();
    };

    if (!isOpen && activePopup === 'none') return null;

    return (
        <>
            {activePopup === 'step1' && (
                <NewProduct
                    onClose={handleClose}
                    onNext={() => setActivePopup('step2')}
                    onStepClick={(step) => setActivePopup(step as any)}
                    formData={formData}
                    updateFormData={updateFormData}
                    // categories handled internally by NewProduct or passed if we had them
                />
            )}
            {activePopup === 'step2' && (
                <NewProductPage2
                    onClose={handleClose}
                    onNext={() => setActivePopup('step3')}
                    onStepClick={(step) => setActivePopup(step as any)}
                    formData={formData}
                    updateFormData={updateFormData}
                />
            )}
            {activePopup === 'step3' && (
                <NewProductPage3
                    onClose={handleClose}
                    onNext={() => setActivePopup('step4')}
                    onStepClick={(step) => setActivePopup(step as any)}
                    formData={formData}
                    updateFormData={updateFormData}
                />
            )}
            {activePopup === 'step4' && (
                <NewProductPage4
                    onClose={handleClose}
                    onNext={() => setActivePopup('step5')}
                    onStepClick={(step) => setActivePopup(step as any)}
                    formData={formData}
                    updateFormData={updateFormData}
                />
            )}
            {activePopup === 'step5' && (
                <NewProductPage5
                    onClose={handleClose}
                    onNext={() => setActivePopup('step6')}
                    onStepClick={(step) => setActivePopup(step as any)}
                    formData={formData}
                    updateFormData={updateFormData}
                />
            )}
            {activePopup === 'step6' && (
                <NewProductPage6
                    onClose={handleClose}
                    onNext={handleSubmitProduct} // Trigger submission
                    onStepClick={(step) => setActivePopup(step as any)}
                    formData={formData}
                />
            )}
            {activePopup === 'step7' && (
                <NewProductPage7
                    onClose={handleClose}
                    onReset={handleReset}
                    onStepClick={(step) => setActivePopup(step as any)}
                />
            )}
        </>
    );
}

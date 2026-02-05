import { X } from 'lucide-react';
import { ProductPreviewCard } from '../Sells/components/shared/ProductPreviewCard';

interface ProductPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: any;
}

export function ProductPreviewModal({ isOpen, onClose, product }: ProductPreviewModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Background Overlay */}
            <div 
                className="absolute inset-0 bg-[#0D0D12]/40 backdrop-blur-[1px]" 
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-[375px] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="w-full px-5 py-4 border-b border-[#DFE1E7] flex justify-between items-center bg-white z-10">
                    <div 
                        className="w-9 h-9 relative overflow-hidden rounded-full border border-[#DFE1E7] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors" 
                        onClick={onClose}
                    >
                        <X className="w-5 h-5 text-[#0D0D12]" />
                    </div>
                    <div className="text-[#0D0D12] text-base font-semibold font-['PeydaWeb'] leading-relaxed tracking-wide">
                        پیش نمایش محصول
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto w-full px-5 py-5 flex flex-col gap-4">
                     <ProductPreviewCard product={product} />
                </div>
            </div>
        </div>
    );
}

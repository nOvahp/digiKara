import { Product } from '@/app/services/studentProductService';

export interface FeatureItem {
  key: string;
  value: string;
}

export interface VariantFeature {
  id: string;
  title: string;
  values: string[];
}

export interface VariantPrice {
  variantLabel: string;
  amount: number;
  title: string;
  type: number;
  discount_percent: number | null;
  inventory: number | null;
  type_inventory: number | null;
  warn_inventory: number | null;
}

export interface AddProductFormState extends Omit<Partial<Product>, 'id'> {
  id?: string | number;
  imageFiles?: File[];
  variantPrices?: VariantPrice[];
  isMultiPrice?: boolean;
  maxOrderQuantity?: string;
  lowStockWarning?: string;
  features?: {
    id: FeatureItem[];
    visual: FeatureItem[];
    production: FeatureItem[];
    packaging: FeatureItem[];
  };
  variantFeatures?: VariantFeature[];
}

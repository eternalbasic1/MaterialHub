export interface Category {
  id: string;
  slug: string;
  name: string;
  originalName: string;
  image: string;
  color: string;
  description: string;
}
export interface ProductVariant {
  id: string;
  attributes: Record<string, string>;
  price: number;
  mrp: number;
  unit: string;
}
export interface Product {
  id: string;
  slug: string;
  category: string;
  subCategory: string;
  name: string;
  brand: string;
  image: string;
  images: string[];
  price: number;
  mrp: number;
  discount: number;
  unit: string;
  specifications: Record<string, string>;
  description: string;
  variants: ProductVariant[];
  fastDelivery: boolean;
  gstRate: number;
  featured: boolean;
}
export interface CartItem {
  productId: string;
  variantId: string | null;
  quantity: number;
}
export interface CartTotals {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  count: number;
}

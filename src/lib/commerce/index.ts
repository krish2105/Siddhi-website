export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  availableForSale: boolean;
  headsCount?: number;
}

export interface CommerceProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  variants: ProductVariant[];
}

export interface CartLineItem {
  id: string;
  variantId: string;
  title: string;
  price: number;
  quantity: number;
  headsCount?: number;
  image?: string;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: CartLineItem[];
  subtotal: number;
  taxIncluded: boolean;
  currency: string;
}

export interface Commerce {
  getProduct(handle: string): Promise<CommerceProduct | null>;
  getProducts(): Promise<CommerceProduct[]>;
  createCart(): Promise<Cart>;
  addToCart(cartId: string, lines: { variantId: string; quantity: number }[]): Promise<Cart>;
  updateCart(cartId: string, lines: { id: string; quantity: number }[]): Promise<Cart>;
  getCart(cartId: string): Promise<Cart | null>;
}

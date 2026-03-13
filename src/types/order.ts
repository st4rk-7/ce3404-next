import type { CartItem } from '../stores/cart';

export const LAST_ORDER_STORAGE_KEY = 'starz-last-order';

export interface StoredOrder {
  orderNumber: string;
  placedAt: string;
  email: string;
  customerName: string;
  items: CartItem[];
  subtotal: number;
  discountCode: string | null;
  discountAmount: number;
  returnsProtection: number;
  total: number;
}

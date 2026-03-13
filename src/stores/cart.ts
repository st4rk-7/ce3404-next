import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { Product } from '../types/product';
import { lockBodyScroll, unlockBodyScroll } from '../utils/bodyScrollLock';

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

const CART_STORAGE_KEY = 'starz-cart-items';

function loadCartFromStorage(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];

      return parsed.flatMap((item): CartItem[] => {
        if (!item || typeof item !== 'object') return [];
        const candidate = item as Partial<CartItem>;
        if (
          !candidate.product ||
          typeof candidate.product.id !== 'number' ||
          typeof candidate.size !== 'string' ||
          typeof candidate.quantity !== 'number' ||
          !Number.isFinite(candidate.quantity) ||
          candidate.quantity <= 0
        ) return [];

        const color = typeof candidate.color === 'string'
          ? candidate.color
          : candidate.product.colors?.[0] || 'Default';

        return [{
          id: `${candidate.product.id}-${candidate.size}-${color}`,
          product: candidate.product,
          size: candidate.size,
          color,
          quantity: Math.floor(candidate.quantity),
        }];
      });
    }
  } catch {
    // Ignore parse errors
  }
  return [];
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadCartFromStorage());
  const isDrawerOpen = ref(false);

  // Persist cart to localStorage on every change
  watch(items, (newItems) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
  }, { deep: true });

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  });
  
  const subtotal = computed(() => totalPrice.value);

  const addToCart = (product: Product, size: string, quantity: number = 1, color?: string) => {
    const selectedColor = color || product.colors?.[0] || 'Default';
    const existingItem = items.value.find(item => 
      item.product.id === product.id && item.size === size && item.color === selectedColor
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({
        id: `${product.id}-${size}-${selectedColor}`,
        product,
        size,
        color: selectedColor,
        quantity
      });
    }
    
    // Auto-open drawer when adding to cart
    openDrawer();
  };

  const removeFromCart = (itemId: string) => {
    const index = items.value.findIndex(item => item.id === itemId);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const item = items.value.find(item => item.id === itemId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(itemId);
      } else {
        item.quantity = quantity;
      }
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  const openDrawer = () => {
    isDrawerOpen.value = true;
    lockBodyScroll('cart');
  };

  const closeDrawer = () => {
    isDrawerOpen.value = false;
    unlockBodyScroll('cart');
  };
  
  const toggleDrawer = () => {
    if (isDrawerOpen.value) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  return {
    items,
    totalItems,
    totalPrice,
    subtotal,
    isDrawerOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openDrawer,
    closeDrawer,
    toggleDrawer
  };
});

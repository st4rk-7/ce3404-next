import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from '../types/product';

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const isDrawerOpen = ref(false);

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  });
  
  const subtotal = computed(() => totalPrice.value);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    const existingItem = items.value.find(item => 
      item.product.id === product.id && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({
        id: `${product.id}-${size}`,
        product,
        size,
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
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    isDrawerOpen.value = false;
    document.body.style.overflow = '';
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

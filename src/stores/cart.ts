import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { Product } from '../types/product';

export interface CartItem extends Product {
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  // Load from localStorage
  const storedCart = localStorage.getItem('cart-items');
  if (storedCart) {
    try {
      items.value = JSON.parse(storedCart);
    } catch (e) {
      console.error('Failed to parse cart items from localStorage', e);
    }
  }

  // Watch for changes and save to localStorage
  watch(items, (newItems) => {
    localStorage.setItem('cart-items', JSON.stringify(newItems));
  }, { deep: true });

  const cartCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  function addToCart(product: Product) {
    const existingItem = items.value.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  }

  function removeFromCart(productId: number) {
    const index = items.value.findIndex(item => item.id === productId);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  }
  
  function clearCart() {
    items.value = [];
  }

  return {
    items,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart
  };
});

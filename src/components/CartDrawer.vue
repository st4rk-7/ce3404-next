<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useCurrency } from '../composables/useCurrency';

const cartStore = useCartStore();
const { formatPrice } = useCurrency();

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=200&q=80';
};
</script>

<template>
  <!-- Cart Drawer -->
  <Teleport to="body">
    <Transition name="cart-drawer">
      <div v-if="isOpen" class="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Shopping Cart">
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/40 transition-opacity" @click="emit('close')"></div>

        <!-- Drawer Panel (slides from right) -->
        <div class="fixed inset-y-0 right-0 w-full max-w-[380px] bg-white dark:bg-gray-900 shadow-2xl flex flex-col transform transition-transform duration-300 font-mono">
          
          <!-- Drawer Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
            <h3 class="text-sm font-bold uppercase tracking-[0.2em] text-black dark:text-white flex items-center gap-2">
              Cart
              <span v-if="cartStore.cartCount > 0" class="text-gray-400 font-normal">{{ cartStore.cartCount }}</span>
            </h3>
            <button 
              @click="emit('close')" 
              class="p-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Close Cart"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path>
              </svg>
            </button>
          </div>

          <!-- Cart Items (Scrollable Body) -->
          <div v-if="cartStore.items.length > 0" class="flex-grow overflow-y-auto custom-scrollbar">
            <div class="px-6 py-4">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-4">Products</p>
              
              <!-- Cart Item -->
              <div 
                v-for="item in cartStore.items" 
                :key="item.id"
                class="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
              >
                <!-- Item Image -->
                <RouterLink 
                  :to="`/product/${item.id}`" 
                  @click="emit('close')"
                  class="shrink-0 w-[90px] h-[70px] bg-gray-100 dark:bg-gray-800 overflow-hidden"
                >
                  <img 
                    :src="item.thumbnail" 
                    :alt="item.title"
                    @error="handleImageError"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </RouterLink>

                <!-- Item Content -->
                <div class="flex-grow min-w-0">
                  <h4 class="text-xs font-bold text-black dark:text-white leading-snug mb-1 line-clamp-2">
                    <RouterLink :to="`/product/${item.id}`" @click="emit('close')" class="hover:underline">
                      {{ item.title }}
                    </RouterLink>
                  </h4>

                  <!-- Price -->
                  <p class="text-xs mb-3">
                    <span class="font-bold text-black dark:text-white">{{ formatPrice(item.price) }}</span>
                  </p>

                  <!-- Quantity Counter -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center border border-gray-200 dark:border-gray-700">
                      <button 
                        @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                        class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                        :title="`Decrease quantity - ${item.title}`"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M6 12h12" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                        </svg>
                      </button>
                      <span class="w-8 h-8 flex items-center justify-center text-xs font-bold text-black dark:text-white border-x border-gray-200 dark:border-gray-700">
                        {{ item.quantity }}
                      </span>
                      <button 
                        @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                        class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                        :title="`Increase quantity - ${item.title}`"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M6 12h6m6 0h-6m0 0V6m0 6v6" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                        </svg>
                      </button>
                    </div>

                    <!-- Remove -->
                    <button 
                      @click="cartStore.removeFromCart(item.id)"
                      class="text-[10px] text-gray-400 hover:text-black dark:hover:text-white underline underline-offset-4 uppercase tracking-widest transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="flex-grow flex flex-col items-center justify-center px-6">
            <p class="text-sm text-gray-400 mb-8 text-center">Your Cart is Empty</p>
            <div class="w-full space-y-3">
              <RouterLink 
                to="/?gender=men" 
                @click="emit('close')"
                class="block w-full text-center border border-black dark:border-white text-black dark:text-white text-xs font-bold uppercase tracking-widest py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >MEN'S</RouterLink>
              <RouterLink 
                to="/?gender=women" 
                @click="emit('close')"
                class="block w-full text-center border border-black dark:border-white text-black dark:text-white text-xs font-bold uppercase tracking-widest py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >WOMEN'S</RouterLink>
              <RouterLink 
                to="/" 
                @click="emit('close')"
                class="block w-full text-center border border-black dark:border-white text-black dark:text-white text-xs font-bold uppercase tracking-widest py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >ABOUT</RouterLink>
            </div>
          </div>

          <!-- Footer (Checkout) -->
          <div v-if="cartStore.items.length > 0" class="border-t border-gray-100 dark:border-gray-800 px-6 py-5 bg-white dark:bg-gray-900">
            <!-- Subtotal -->
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Subtotal</span>
              <span class="text-sm font-bold text-black dark:text-white">{{ formatPrice(cartStore.cartTotal) }}</span>
            </div>

            <!-- Checkout Button -->
            <button 
              class="w-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs py-4 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Check Out
            </button>

            <p class="text-[10px] text-gray-400 text-center mt-3 italic">
              Shipping, taxes, and discount codes are calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}

/* Cart drawer transitions */
.cart-drawer-enter-active,
.cart-drawer-leave-active {
  transition: opacity 0.3s ease;
}
.cart-drawer-enter-from,
.cart-drawer-leave-to {
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

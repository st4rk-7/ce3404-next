<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useCurrency } from '../composables/useCurrency';

const cartStore = useCartStore();
const { formatPrice } = useCurrency();

const returnsAdded = ref(false);
const isRecommendationsOpen = ref(true);
const addedRecommendation = ref<number | null>(null);

const toggleReturnsProtection = () => {
  returnsAdded.value = !returnsAdded.value;
};

const handleRecommendationAdd = (index: number) => {
  addedRecommendation.value = index;
  setTimeout(() => {
    addedRecommendation.value = null;
  }, 1500);
};
</script>

<template>
  <div>
    <!-- Backdrop Overlay -->
    <Transition name="fade">
      <div 
        v-if="cartStore.isDrawerOpen" 
        @click="cartStore.closeDrawer"
        class="fixed inset-0 bg-black/40 z-[100] transition-opacity"
        aria-hidden="true"
      ></div>
    </Transition>

    <!-- Drawer Panel -->
    <Transition name="slide-right">
      <div 
        v-if="cartStore.isDrawerOpen"
        class="fixed inset-y-0 right-0 z-[110] flex w-full max-w-[420px] flex-col bg-white dark:bg-[#1a1a1a] shadow-2xl transition-transform font-sans"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <!-- Header -->
        <header class="flex items-center justify-between px-6 py-5 border-b-[3px] border-black dark:border-white">
          <div class="flex items-center text-[10px] font-bold tracking-widest uppercase text-black dark:text-white">
            Cart ({{ cartStore.totalItems }})
          </div>
          <p class="text-[11px] font-medium text-black dark:text-gray-300">
            You've earned free shipping!
          </p>
          <button @click="cartStore.closeDrawer" class="text-black dark:text-white hover:opacity-70 transition flex items-center justify-center p-1">
            <span class="sr-only">Close cart</span>
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <!-- Cart Items Scrollable Area -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          <p v-if="cartStore.items.length === 0" class="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
            Your cart is empty.
          </p>

          <!-- Cart Item List -->
          <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4">
            <!-- Product Image -->
            <div class="w-24 h-24 bg-[#f5f4f0] dark:bg-[#2c2c2c] rounded-sm shrink-0 flex items-center justify-center overflow-hidden mix-blend-multiply dark:mix-blend-normal">
              <img :src="item.product.images[0]" :alt="item.product.title" class="w-full h-auto object-contain">
            </div>

            <!-- Product Details -->
            <div class="flex flex-col flex-1 pl-1 text-black dark:text-white">
              <div class="flex justify-between items-start">
                <h3 class="text-[11px] font-bold tracking-widest uppercase text-gray-900 dark:text-gray-100 pr-4 leading-tight">
                  {{ item.product.title }}
                </h3>
                <span class="text-[13px] font-medium">{{ formatPrice(item.product.price) }}</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-1.5">{{ item.product.colors?.[0] || 'Auburn (Auburn Sole)' }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Size: {{ item.size }}</p>

              <!-- Actions/Quantity -->
              <div class="mt-auto pt-4 flex justify-between items-center">
                <button @click="cartStore.removeFromCart(item.id)" class="text-[11px] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white underline decoration-gray-400 underline-offset-4">
                  Remove
                </button>

                <!-- Quantity Pill -->
                <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-full h-8 overflow-hidden select-none">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="px-2.5 h-full text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center justify-center group">
                    <svg v-if="item.quantity === 1" class="w-[11px] h-[11px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span v-else class="text-xs leading-none mt-[1px]">-</span>
                  </button>
                  <span class="text-[11px] font-medium w-6 text-center tabular-nums">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="px-2.5 h-full text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center justify-center text-xs">
                    <span class="leading-none mt-[1px]">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Returns Protection block -->
          <div v-if="cartStore.items.length > 0" class="mt-6 bg-[#f5f4f0] dark:bg-[#2c2c2c] p-4 rounded-md flex justify-between items-center border transition-colors" :class="returnsAdded ? 'border-green-400 dark:border-green-600' : 'border-transparent'">
            <div class="pr-2">
              <h4 class="text-[11px] font-bold text-black dark:text-white mb-0.5">Returns Protection</h4>
              <p class="text-[10px] text-gray-600 dark:text-gray-400 leading-snug">Buy returns protection to qualify for free returns. Does not apply to Final Sale items.</p>
            </div>
            <button 
              @click="toggleReturnsProtection"
              :class="returnsAdded ? 'bg-green-600 dark:bg-green-500 hover:bg-green-700 text-white' : 'bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'"
              class="text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full uppercase shrink-0 transition-all"
            >
              {{ returnsAdded ? '✓ ADDED' : 'ADD - Rs 990' }}
            </button>
          </div>
        </div>

        <!-- Recommendations Accordion Mock -->
        <div v-if="cartStore.items.length > 0" class="border-t border-gray-200 dark:border-gray-800 bg-[#f5f4f0] dark:bg-charcoal">
            <button @click="isRecommendationsOpen = !isRecommendationsOpen" class="w-full px-6 py-4 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase text-black dark:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition">
                RECOMMENDED FOR YOU
                <svg :class="isRecommendationsOpen ? 'rotate-180' : ''" class="w-4 h-4 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div v-show="isRecommendationsOpen" class="px-6 pb-4 flex gap-4 overflow-x-auto snap-x">
                <!-- Mock item 1 -->
                <div class="bg-white dark:bg-[#2c2c2c] p-3 rounded-md min-w-[200px] shrink-0 snap-start flex flex-col justify-between shadow-sm">
                    <div class="flex justify-between items-start mb-2">
                        <img src="https://cdn.shopify.com/s/files/1/1104/4168/products/Mens_Anytime_No_Show_Sock_-_True_Black_e417cd9c-c0c1-4bcf-a87f-a636eb01389c.png?v=1676991599" alt="Sock" class="w-12 h-12 object-contain mix-blend-multiply dark:mix-blend-normal" />
                        <div class="text-right">
                           <p class="text-[11px] font-bold text-black dark:text-white">Anytime No Show Sock</p>
                           <p class="text-[11px] font-medium"><span class="text-red-600 dark:text-red-400">Rs 1,650</span> <span class="line-through text-gray-400 dark:text-gray-500">Rs 4,620</span></p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1 mb-3">
                        <span class="w-3 h-3 rounded-full bg-black border border-gray-300 dark:border-gray-600"></span>
                        <span class="w-3 h-3 rounded-full bg-gray-200 border border-gray-300 dark:border-gray-600"></span>
                        <span class="w-3 h-3 rounded-full bg-blue-900 border border-gray-300 dark:border-gray-600"></span>
                        <span class="w-3 h-3 rounded-full bg-green-900 border border-gray-300 dark:border-gray-600"></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <!-- Dropdown mock -->
                        <div class="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1 flex justify-between items-center text-[10px] text-black dark:text-white">
                            <span>Size: S (M5-7)</span>
                            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                        <button @click="handleRecommendationAdd(0)" class="text-[11px] font-bold text-black dark:text-white hover:opacity-70 transition-opacity">
                            <template v-if="addedRecommendation === 0">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </template>
                            <template v-else>Add+</template>
                        </button>
                    </div>
                </div>
                 <!-- Mock item 2 -->
                 <div class="bg-white dark:bg-[#2c2c2c] p-3 rounded-md min-w-[200px] shrink-0 snap-start flex flex-col justify-between shadow-sm">
                    <div class="flex justify-between items-start mb-2">
                        <img src="https://cdn.shopify.com/s/files/1/1104/4168/products/Mens_Anytime_No_Show_Sock_-_White_eb30e7cc-8b83-4903-b0fc-fb41bfecb53a.png?v=1676991605" alt="Sock" class="w-12 h-12 object-contain mix-blend-multiply dark:mix-blend-normal" />
                        <div class="text-right">
                           <p class="text-[11px] font-bold text-black dark:text-white">Anytime No Show Sock</p>
                           <p class="text-[11px] font-medium"><span class="text-red-600 dark:text-red-400">Rs 1,650</span> <span class="line-through text-gray-400 dark:text-gray-500">Rs 4,620</span></p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1 mb-3">
                        <span class="w-3 h-3 rounded-full bg-white border border-gray-300 dark:border-gray-600"></span>
                        <span class="w-3 h-3 rounded-full bg-black border border-gray-300 dark:border-gray-600"></span>
                        <span class="w-3 h-3 rounded-full bg-gray-200 border border-gray-300 dark:border-gray-600"></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <!-- Dropdown mock -->
                        <div class="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1 flex justify-between items-center text-[10px] text-black dark:text-white">
                            <span>Size: S (M5-7)</span>
                            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                        <button @click="handleRecommendationAdd(1)" class="text-[11px] font-bold text-black dark:text-white hover:opacity-70 transition-opacity">
                            <template v-if="addedRecommendation === 1">
                                <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </template>
                            <template v-else>Add+</template>
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Footer / Checkout Area -->
        <div class="border-t border-gray-200 dark:border-gray-800 bg-[#f5f4f0] dark:bg-charcoal p-6 pb-8">
          <div class="flex justify-between text-[13px] font-bold text-black dark:text-white mb-1">
            <span>Subtotal</span>
            <span>{{ formatPrice(cartStore.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-[13px] font-bold text-black dark:text-white mb-4">
            <span>Shipping</span>
            <span class="flex items-center gap-1">
              <span class="line-through text-gray-400 dark:text-gray-500 font-normal">Rs 1,650</span> FREE
            </span>
          </div>
          
          <button @click="$router.push('/checkout'); cartStore.closeDrawer()" class="w-full bg-black text-white dark:bg-white dark:text-black font-bold tracking-widest uppercase text-xs rounded-full py-4 transition hover:bg-gray-800 dark:hover:bg-gray-200 flex justify-center items-center h-12 shadow-md">
            CHECKOUT
          </button>
          
          <!-- Payment buttons -->
          <div class="grid grid-cols-3 gap-2 mt-3">
            <button @click="$router.push('/checkout'); cartStore.closeDrawer()" class="bg-[#fad676] rounded-full py-2 flex items-center justify-center hover:opacity-90 transition h-10 shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" alt="Amazon Pay" class="h-[14px] opacity-80" /> <span class="text-[10px] font-bold ml-1 text-black opacity-80 mt-0.5">pay</span>
            </button>
            <button @click="$router.push('/checkout'); cartStore.closeDrawer()" class="bg-[#ffc439] rounded-full py-2 flex items-center justify-center hover:opacity-90 transition h-10 shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" class="h-4" />
            </button>
            <button @click="$router.push('/checkout'); cartStore.closeDrawer()" class="bg-[#5a31f4] rounded-full py-2 flex items-center justify-center hover:opacity-90 transition h-10 shadow-sm">
              <span class="text-white font-bold text-[13px] tracking-wide mt-0.5">shop <span class="bg-white text-[#5a31f4] text-[9px] px-1 rounded-sm ml-0.5 pb-[2px] align-middle inline-block">Pay</span></span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
</style>

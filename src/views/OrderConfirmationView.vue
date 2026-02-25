<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { useCurrency } from '../composables/useCurrency';

const cartStore = useCartStore();
const { formatPrice } = useCurrency();

const orderNumber = ref('');
const orderItems = ref<typeof cartStore.items>([]);
const orderTotal = ref(0);

onMounted(() => {
  // Capture cart state before clearing
  orderItems.value = [...cartStore.items];
  orderTotal.value = cartStore.totalPrice;
  orderNumber.value = `NXT-${Date.now().toString(36).toUpperCase().slice(-6)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  
  // Clear the cart
  cartStore.clearCart();
});
</script>

<template>
  <div class="min-h-screen bg-[#f5f4f0] dark:bg-charcoal font-sans transition-colors duration-200 flex flex-col">
    <!-- Header -->
    <header class="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 py-4 px-6">
      <div class="max-w-3xl mx-auto flex items-center justify-center">
        <RouterLink to="/" class="text-2xl font-black tracking-tight text-black dark:text-white" style="font-family: 'Outfit', sans-serif;">NEXT</RouterLink>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center px-6 py-16">
      <div class="w-full max-w-lg text-center">
        
        <!-- Checkmark Animation -->
        <div class="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-8 animate-bounce shadow-lg shadow-green-200 dark:shadow-green-900/30">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <!-- Confirmation Text -->
        <h1 class="font-serif text-3xl md:text-4xl text-black dark:text-white mb-3">Order Confirmed!</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">Thank you for your purchase</p>
        <p class="text-gray-400 dark:text-gray-500 text-xs mb-10">
          Order number: <span class="font-mono text-black dark:text-white font-medium">{{ orderNumber }}</span>
        </p>

        <!-- Order Summary Card -->
        <div v-if="orderItems.length > 0" class="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-8 text-left">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 class="text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">Order Summary</h2>
          </div>
          
          <div class="divide-y divide-gray-50 dark:divide-gray-800">
            <div v-for="item in orderItems" :key="item.id" class="flex items-center gap-4 px-6 py-4">
              <div class="w-14 h-14 bg-[#edede8] dark:bg-[#2A2A2A] rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                <img :src="item.product.images[0]" :alt="item.product.title" class="w-full h-full object-contain" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-black dark:text-white truncate">{{ item.product.title }}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500">Size: {{ item.size }} &middot; Qty: {{ item.quantity }}</p>
              </div>
              <span class="text-sm font-medium text-black dark:text-white shrink-0">{{ formatPrice(item.product.price * item.quantity) }}</span>
            </div>
          </div>

          <div class="px-6 py-4 bg-[#faf9f6] dark:bg-[#111111] border-t border-gray-100 dark:border-gray-800">
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Shipping</span>
              <span class="text-green-600 dark:text-green-400 font-medium">FREE</span>
            </div>
            <div class="flex justify-between text-sm font-bold text-black dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
              <span>Total Paid</span>
              <span>{{ formatPrice(orderTotal) }}</span>
            </div>
          </div>
        </div>

        <!-- Confirmation message -->
        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 px-6 py-5 mb-8">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <p class="text-xs text-gray-500 dark:text-gray-400 text-left leading-relaxed">
              A confirmation email has been sent to your email address. You'll receive a shipping notification once your order is on its way.
            </p>
          </div>
        </div>

        <!-- CTA -->
        <RouterLink 
          to="/" 
          class="inline-block bg-charcoal dark:bg-white text-white dark:text-black font-bold tracking-widest uppercase text-xs px-10 py-4 rounded-full hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-md"
        >
          CONTINUE SHOPPING
        </RouterLink>
      </div>
    </main>

    <!-- Footer -->
    <footer class="py-6 text-center">
      <p class="text-[10px] text-gray-400 dark:text-gray-500">© 2026 NEXT. All rights reserved.</p>
    </footer>
  </div>
</template>

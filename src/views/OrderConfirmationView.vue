<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCurrency } from '../composables/useCurrency';
import { LAST_ORDER_STORAGE_KEY, type StoredOrder } from '../types/order';

const router = useRouter();
const { formatPrice } = useCurrency();
const order = ref<StoredOrder | null>(null);

onMounted(async () => {
  try {
    const saved = sessionStorage.getItem(LAST_ORDER_STORAGE_KEY);
    if (!saved) throw new Error('Missing order');
    const parsed = JSON.parse(saved) as Partial<StoredOrder>;
    if (!parsed.orderNumber || !Array.isArray(parsed.items) || !parsed.items.length || typeof parsed.total !== 'number') {
      throw new Error('Invalid order');
    }
    order.value = parsed as StoredOrder;
  } catch {
    sessionStorage.removeItem(LAST_ORDER_STORAGE_KEY);
    await router.replace('/checkout');
  }
});
</script>

<template>
  <div class="min-h-screen bg-[#f5f4f0] dark:bg-charcoal font-sans transition-colors duration-200 flex flex-col">
    <header class="bg-white dark:bg-[#1f1f1f] border-b border-gray-200 dark:border-gray-800 py-4 px-6">
      <div class="max-w-3xl mx-auto flex items-center justify-center">
        <RouterLink to="/" aria-label="Starz home">
          <img src="/logo-light.jpg" alt="Starz" class="h-7 object-contain dark:hidden" />
          <img src="/logo-dark.jpg" alt="Starz" class="h-7 object-contain hidden dark:block mix-blend-screen" />
        </RouterLink>
      </div>
    </header>

    <main v-if="order" class="flex-1 flex items-center justify-center px-6 py-16">
      <div class="w-full max-w-lg text-center">
        <div class="mx-auto size-20 bg-green-600 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-green-200 dark:shadow-green-900/30">
          <svg class="size-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 class="font-serif text-3xl md:text-4xl text-black dark:text-white mb-3 text-balance">Order confirmed</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">Thanks, {{ order.customerName }}. This demo order is complete.</p>
        <p class="text-gray-500 dark:text-gray-400 text-xs mb-10">Order <span class="font-mono text-black dark:text-white font-medium">{{ order.orderNumber }}</span></p>

        <section class="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-8 text-left" aria-labelledby="order-summary-title">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <h2 id="order-summary-title" class="text-xs font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">Order summary</h2>
          </div>
          <div class="divide-y divide-gray-100 dark:divide-gray-800">
            <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4 px-6 py-4">
              <div class="size-14 bg-[#edede8] dark:bg-[#2A2A2A] rounded-lg overflow-hidden shrink-0">
                <img :src="item.product.images[0]" :alt="item.product.title" class="size-full object-contain" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">{{ item.product.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Size {{ item.size }} · {{ item.color }} · Qty {{ item.quantity }}</p>
              </div>
              <span class="text-sm font-medium shrink-0 tabular-nums">{{ formatPrice(item.product.price * item.quantity) }}</span>
            </div>
          </div>
          <dl class="px-6 py-4 bg-[#faf9f6] dark:bg-[#111111] border-t border-gray-100 dark:border-gray-800 text-xs space-y-2">
            <div class="flex justify-between"><dt>Subtotal</dt><dd>{{ formatPrice(order.subtotal) }}</dd></div>
            <div v-if="order.discountAmount" class="flex justify-between text-green-700 dark:text-green-400"><dt>Discount ({{ order.discountCode }})</dt><dd>−{{ formatPrice(order.discountAmount) }}</dd></div>
            <div v-if="order.returnsProtection" class="flex justify-between"><dt>Returns protection</dt><dd>Rs 990</dd></div>
            <div class="flex justify-between text-sm font-bold pt-3 border-t border-gray-200 dark:border-gray-700"><dt>Total paid</dt><dd class="tabular-nums">{{ formatPrice(order.total) }}</dd></div>
          </dl>
        </section>

        <p class="text-xs text-gray-500 dark:text-gray-400 mb-8 text-pretty">A demo confirmation has been stored for this browser session. No payment or email was sent.</p>
        <RouterLink to="/shop" class="inline-flex min-h-12 items-center bg-charcoal dark:bg-white text-white dark:text-black font-bold tracking-widest uppercase text-xs px-10 rounded-full hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-md">Continue shopping</RouterLink>
      </div>
    </main>
  </div>
</template>

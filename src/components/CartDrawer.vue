<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useCurrency } from '../composables/useCurrency';

const cartStore = useCartStore();
const router = useRouter();
const { formatPrice } = useCurrency();
const closeButton = ref<HTMLButtonElement | null>(null);
const drawerPanel = ref<HTMLElement | null>(null);
let previouslyFocused: HTMLElement | null = null;

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && cartStore.isDrawerOpen) cartStore.closeDrawer();
  if (event.key !== 'Tab' || !cartStore.isDrawerOpen || !drawerPanel.value) return;

  const focusable = [...drawerPanel.value.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter((element) => !element.hasAttribute('disabled'));
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) return;

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const goToCheckout = async () => {
  cartStore.closeDrawer();
  await router.push('/checkout');
};

watch(() => cartStore.isDrawerOpen, async (isOpen) => {
  if (isOpen) {
    previouslyFocused = document.activeElement as HTMLElement | null;
    await nextTick();
    closeButton.value?.focus();
  } else {
    previouslyFocused?.focus();
    previouslyFocused = null;
  }
});

onMounted(() => document.addEventListener('keydown', handleKeydown));
onUnmounted(() => document.removeEventListener('keydown', handleKeydown));
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="cartStore.isDrawerOpen" class="fixed inset-0 bg-black/45 z-[100]" aria-hidden="true" @click="cartStore.closeDrawer" />
    </Transition>

    <Transition name="slide-right">
      <aside
        v-if="cartStore.isDrawerOpen"
        ref="drawerPanel"
        class="fixed inset-y-0 right-0 z-[110] flex w-full max-w-[420px] flex-col bg-white dark:bg-[#1a1a1a] shadow-2xl font-sans"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <header class="flex items-center justify-between px-6 py-4 border-b-[3px] border-black dark:border-white">
          <h2 id="cart-drawer-title" class="text-xs font-bold tracking-widest uppercase">Cart ({{ cartStore.totalItems }})</h2>
          <button ref="closeButton" type="button" class="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Close cart" @click="cartStore.closeDrawer">
            <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div v-if="!cartStore.items.length" class="h-full min-h-64 flex flex-col items-center justify-center text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">Your cart is empty.</p>
            <button type="button" class="min-h-11 rounded-full border border-black dark:border-white px-7 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-[background-color,color]" @click="cartStore.closeDrawer(); router.push('/shop')">Continue shopping</button>
          </div>

          <article v-for="item in cartStore.items" :key="item.id" class="flex gap-4">
            <div class="size-24 bg-[#f5f4f0] dark:bg-[#2c2c2c] rounded-sm shrink-0 overflow-hidden">
              <img :src="item.product.images[0]" :alt="item.product.title" class="size-full object-contain" />
            </div>
            <div class="flex flex-col flex-1 min-w-0">
              <div class="flex justify-between items-start gap-3">
                <h3 class="text-[11px] font-bold tracking-widest uppercase leading-tight line-clamp-2">{{ item.product.title }}</h3>
                <span class="text-[13px] font-medium shrink-0 tabular-nums">{{ formatPrice(item.product.price * item.quantity) }}</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Color: {{ item.color }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Size: {{ item.size }}</p>
              <div class="mt-auto pt-3 flex justify-between items-center">
                <button type="button" class="min-h-10 px-1 text-[11px] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white underline underline-offset-4 transition-colors" @click="cartStore.removeFromCart(item.id)">Remove</button>
                <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-full h-10 select-none">
                  <button type="button" class="size-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-full transition-colors" :aria-label="`Decrease ${item.product.title} quantity`" @click="cartStore.updateQuantity(item.id, item.quantity - 1)">−</button>
                  <span class="text-xs font-medium w-6 text-center tabular-nums" :aria-label="`Quantity ${item.quantity}`">{{ item.quantity }}</span>
                  <button type="button" class="size-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-full transition-colors" :aria-label="`Increase ${item.product.title} quantity`" @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
                </div>
              </div>
            </div>
          </article>
        </div>

        <footer v-if="cartStore.items.length" class="border-t border-gray-200 dark:border-gray-800 bg-[#f5f4f0] dark:bg-charcoal p-6 pb-8">
          <div class="flex justify-between text-sm font-bold mb-1"><span>Subtotal</span><span class="tabular-nums">{{ formatPrice(cartStore.subtotal) }}</span></div>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-5">Shipping and discounts are calculated at checkout.</p>
          <button type="button" class="w-full min-h-12 bg-black text-white dark:bg-white dark:text-black font-bold tracking-widest uppercase text-xs rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md" @click="goToCheckout">Checkout</button>
        </footer>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active { transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-right-enter-from,
.slide-right-leave-to { transform: translateX(100%); }
.fade-enter-active,
.fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .slide-right-enter-active,
  .slide-right-leave-active,
  .fade-enter-active,
  .fade-leave-active { transition-duration: 0.01ms; }
}
</style>

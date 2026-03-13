<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useCurrency } from '../composables/useCurrency';
import { LAST_ORDER_STORAGE_KEY, type StoredOrder } from '../types/order';

const router = useRouter();
const cartStore = useCartStore();
const { formatPrice, EXCHANGE_RATE } = useCurrency();

const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  cardNumber: '',
  expiry: '',
  securityCode: '',
  nameOnCard: '',
});
const discountCode = ref('');
const appliedCode = ref<string | null>(null);
const discountStatus = ref<'idle' | 'applied' | 'invalid'>('idle');
const returnsProtectionEnabled = ref(false);
const checkoutError = ref('');

const discountRates: Record<string, number> = {
  STARZ10: 0.1,
  WELCOME: 0.1,
  SAVE20: 0.2,
};
const subtotal = computed(() => cartStore.subtotal);
const itemCount = computed(() => cartStore.totalItems);
const discountAmount = computed(() => subtotal.value * (appliedCode.value ? discountRates[appliedCode.value] || 0 : 0));
const returnsProtection = computed(() => returnsProtectionEnabled.value ? 990 / EXCHANGE_RATE : 0);
const total = computed(() => Math.max(0, subtotal.value - discountAmount.value + returnsProtection.value));

const applyDiscount = () => {
  const normalized = discountCode.value.trim().toUpperCase();
  if (discountRates[normalized]) {
    discountCode.value = normalized;
    appliedCode.value = normalized;
    discountStatus.value = 'applied';
    return;
  }
  appliedCode.value = null;
  discountStatus.value = 'invalid';
};

const placeOrder = async () => {
  checkoutError.value = '';
  if (!cartStore.items.length) {
    checkoutError.value = 'Your cart is empty. Add an item before checking out.';
    return;
  }

  const order: StoredOrder = {
    orderNumber: `STZ-${Date.now().toString(36).toUpperCase().slice(-7)}`,
    placedAt: new Date().toISOString(),
    email: form.email,
    customerName: `${form.firstName} ${form.lastName}`.trim(),
    items: structuredClone(cartStore.items),
    subtotal: subtotal.value,
    discountCode: appliedCode.value,
    discountAmount: discountAmount.value,
    returnsProtection: returnsProtection.value,
    total: total.value,
  };

  sessionStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order));
  cartStore.clearCart();
  await router.push('/order-confirmation');
};

const inputClass = 'w-full min-h-11 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/30 dark:focus:ring-white/40';
</script>

<template>
  <div class="min-h-screen bg-[#f5f4f0] dark:bg-charcoal font-sans transition-colors duration-200">
    <header class="bg-white dark:bg-[#1f1f1f] border-b border-gray-200 dark:border-gray-800 py-4 px-6">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <RouterLink to="/" aria-label="Starz home">
          <img src="/logo-light.jpg" alt="Starz" class="h-7 object-contain dark:hidden" />
          <img src="/logo-dark.jpg" alt="Starz" class="h-7 object-contain hidden dark:block mix-blend-screen" />
        </RouterLink>
        <span class="text-xs text-gray-500 dark:text-gray-400">Secure demo checkout</span>
      </div>
    </header>

    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-65px)]">
      <form class="flex-1 bg-white dark:bg-[#1a1a1a] px-6 md:px-12 lg:px-16 py-10 order-2 lg:order-1" @submit.prevent="placeOrder">
        <div class="mb-8 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 text-xs text-amber-900 dark:text-amber-100 text-pretty">
          Portfolio demo: no payment is processed and no data is sent to a payment provider.
        </div>

        <section class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-xl font-medium text-black dark:text-white">Contact</h1>
            <RouterLink to="/login" class="text-xs text-blue-700 dark:text-blue-400 hover:underline">Sign in</RouterLink>
          </div>
          <label class="block text-xs font-medium mb-1" for="checkout-email">Email</label>
          <input id="checkout-email" v-model.trim="form.email" required type="email" autocomplete="email" :class="inputClass" />
        </section>

        <section class="mb-8">
          <h2 class="text-lg font-medium text-black dark:text-white mb-4">Delivery</h2>
          <div class="space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium mb-1" for="first-name">First name</label>
                <input id="first-name" v-model.trim="form.firstName" required autocomplete="given-name" :class="inputClass" />
              </div>
              <div>
                <label class="block text-xs font-medium mb-1" for="last-name">Last name</label>
                <input id="last-name" v-model.trim="form.lastName" required autocomplete="family-name" :class="inputClass" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium mb-1" for="address">Address</label>
              <input id="address" v-model.trim="form.address" required autocomplete="street-address" :class="inputClass" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-medium mb-1" for="city">City</label>
                <input id="city" v-model.trim="form.city" required autocomplete="address-level2" :class="inputClass" />
              </div>
              <div>
                <label class="block text-xs font-medium mb-1" for="province">Province</label>
                <select id="province" v-model="form.province" required autocomplete="address-level1" :class="inputClass">
                  <option value="" disabled>Select</option>
                  <option>Western</option><option>Central</option><option>Southern</option><option>Northern</option><option>Eastern</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium mb-1" for="postal-code">Postal code</label>
                <input id="postal-code" v-model.trim="form.postalCode" required inputmode="numeric" pattern="[0-9]{5}" autocomplete="postal-code" :class="inputClass" />
              </div>
            </div>
          </div>
        </section>

        <section class="mb-8">
          <h2 class="text-lg font-medium text-black dark:text-white mb-1">Payment details</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Use any correctly formatted demo values.</p>
          <div class="space-y-3 border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <div>
              <label class="block text-xs font-medium mb-1" for="card-number">Card number</label>
              <input id="card-number" v-model.trim="form.cardNumber" required inputmode="numeric" autocomplete="cc-number" pattern="[0-9 ]{12,19}" placeholder="4242 4242 4242 4242" :class="inputClass" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium mb-1" for="expiry">Expiry</label>
                <input id="expiry" v-model.trim="form.expiry" required autocomplete="cc-exp" pattern="(0[1-9]|1[0-2])\s?\/\s?[0-9]{2}" placeholder="MM / YY" :class="inputClass" />
              </div>
              <div>
                <label class="block text-xs font-medium mb-1" for="security-code">Security code</label>
                <input id="security-code" v-model.trim="form.securityCode" required inputmode="numeric" autocomplete="cc-csc" pattern="[0-9]{3,4}" placeholder="123" :class="inputClass" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium mb-1" for="card-name">Name on card</label>
              <input id="card-name" v-model.trim="form.nameOnCard" required autocomplete="cc-name" :class="inputClass" />
            </div>
          </div>
        </section>

        <label class="mb-7 flex items-start gap-3 border border-gray-200 dark:border-gray-700 rounded-md p-4 cursor-pointer">
          <input v-model="returnsProtectionEnabled" type="checkbox" class="mt-1 size-4" />
          <span class="flex-1 text-sm">Returns protection <span class="block text-xs text-gray-500 dark:text-gray-400">Adds Rs 990 to this demo order.</span></span>
          <span class="text-sm font-medium">Rs 990</span>
        </label>

        <p v-if="checkoutError" role="alert" class="mb-4 text-sm text-red-600 dark:text-red-400">{{ checkoutError }}</p>
        <button type="submit" :disabled="!cartStore.items.length" class="w-full min-h-12 bg-charcoal dark:bg-white text-white dark:text-black font-bold tracking-widest uppercase text-sm px-5 rounded-md hover:bg-black dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          Place demo order · {{ formatPrice(total) }}
        </button>
      </form>

      <aside class="lg:w-[420px] bg-[#faf9f6] dark:bg-[#111111] border-l border-gray-200 dark:border-gray-800 px-6 md:px-10 py-10 order-1 lg:order-2" aria-label="Order summary">
        <div v-if="cartStore.items.length" class="space-y-5">
          <div v-for="item in cartStore.items" :key="item.id" class="flex items-start gap-3">
            <div class="relative size-16 bg-[#edede8] dark:bg-[#2A2A2A] rounded-md overflow-hidden shrink-0">
              <img :src="item.product.images[0]" :alt="item.product.title" class="size-full object-contain" />
              <span class="absolute top-0 right-0 bg-gray-700 text-white text-[9px] size-5 rounded-full flex items-center justify-center font-bold">{{ item.quantity }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-medium truncate">{{ item.product.title }}</p>
              <p class="text-[10px] text-gray-500 dark:text-gray-400">Size {{ item.size }} · {{ item.color }}</p>
            </div>
            <span class="text-xs font-medium shrink-0 tabular-nums">{{ formatPrice(item.product.price * item.quantity) }}</span>
          </div>
        </div>
        <p v-else class="text-center text-sm text-gray-500 dark:text-gray-400 py-8">Your cart is empty. <RouterLink to="/shop" class="underline">Continue shopping</RouterLink></p>

        <div class="flex gap-2 mt-8">
          <div class="flex-1">
            <label class="sr-only" for="discount-code">Discount code</label>
            <input id="discount-code" v-model="discountCode" type="text" placeholder="Discount code" class="w-full min-h-11 border rounded-md px-4 text-sm bg-white dark:bg-[#2A2A2A]" :class="discountStatus === 'applied' ? 'border-green-500' : discountStatus === 'invalid' ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'" @keyup.enter.prevent="applyDiscount" />
            <p aria-live="polite" class="text-[10px] mt-1" :class="discountStatus === 'invalid' ? 'text-red-600' : 'text-green-600 dark:text-green-400'">
              {{ discountStatus === 'applied' ? `${appliedCode} applied` : discountStatus === 'invalid' ? 'Invalid discount code' : '' }}
            </p>
          </div>
          <button type="button" class="min-h-11 border border-gray-400 rounded-md px-5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" @click="applyDiscount">Apply</button>
        </div>

        <dl class="mt-7 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4 text-sm">
          <div class="flex justify-between"><dt>Subtotal · {{ itemCount }} items</dt><dd>{{ formatPrice(subtotal) }}</dd></div>
          <div v-if="discountAmount" class="flex justify-between text-green-700 dark:text-green-400"><dt>Discount ({{ appliedCode }})</dt><dd>−{{ formatPrice(discountAmount) }}</dd></div>
          <div v-if="returnsProtection" class="flex justify-between"><dt>Returns protection</dt><dd>Rs 990</dd></div>
          <div class="flex justify-between text-lg font-bold pt-4 mt-4 border-t border-gray-200 dark:border-gray-700"><dt>Total</dt><dd class="tabular-nums">{{ formatPrice(total) }}</dd></div>
        </dl>
      </aside>
    </div>
  </div>
</template>

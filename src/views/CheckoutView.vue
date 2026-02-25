<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useCurrency } from '../composables/useCurrency';

const router = useRouter();
const cartStore = useCartStore();
const { formatPrice } = useCurrency();

const subtotal = computed(() => cartStore.subtotal);
const itemCount = computed(() => cartStore.totalItems);

const handlePayNow = () => {
  router.push('/order-confirmation');
};
</script>

<template>
  <div class="min-h-screen bg-[#f5f4f0] dark:bg-charcoal font-sans transition-colors duration-200">
    <!-- Checkout Header -->
    <header class="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 py-4 px-6">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <RouterLink to="/" class="text-2xl font-black tracking-tight text-black dark:text-white" style="font-family: 'Outfit', sans-serif;">NEXT</RouterLink>
        <div class="text-xs text-gray-500 dark:text-gray-400">Secure Checkout 🔒</div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 min-h-[calc(100vh-65px)]">

      <!-- LEFT COLUMN: Checkout Form -->
      <div class="flex-1 bg-white dark:bg-[#1a1a1a] px-6 md:px-12 lg:px-16 py-10 order-2 lg:order-1">
        
        <!-- Express Checkout -->
        <div class="mb-8">
          <p class="text-center text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium tracking-wider uppercase">Express checkout</p>
          <div class="grid grid-cols-2 gap-3">
            <button class="bg-[#5a31f4] rounded-full py-3 flex items-center justify-center hover:opacity-90 transition h-11 shadow-sm">
              <span class="text-white font-bold text-[13px] tracking-wide">shop <span class="bg-white text-[#5a31f4] text-[9px] px-1 rounded-sm ml-0.5 pb-[2px] align-middle inline-block">Pay</span></span>
            </button>
            <button class="bg-[#ffc439] rounded-full py-3 flex items-center justify-center hover:opacity-90 transition h-11 shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" class="h-4" />
            </button>
          </div>
          <div class="flex items-center gap-4 mt-6">
            <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span class="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">OR</span>
            <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>

        <!-- Contact -->
        <section class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium text-black dark:text-white">Contact</h2>
            <RouterLink to="/login" class="text-xs text-blue-600 dark:text-blue-400 hover:underline">Sign in</RouterLink>
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition"
          />
          <label class="flex items-center gap-2 mt-3 text-xs text-gray-600 dark:text-gray-400">
            <input type="checkbox" checked class="rounded border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-black" />
            Email me with news and offers
          </label>
        </section>

        <!-- Delivery -->
        <section class="mb-8">
          <h2 class="text-lg font-medium text-black dark:text-white mb-4">Delivery</h2>
          <div class="space-y-3">
            <select class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white">
              <option>Sri Lanka</option>
            </select>
            <div class="grid grid-cols-2 gap-3">
              <input type="text" placeholder="First name" class="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
              <input type="text" placeholder="Last name" class="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
            </div>
            <input type="text" placeholder="Company (optional)" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
            <input type="text" placeholder="Address" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
            <div class="grid grid-cols-3 gap-3">
              <input type="text" placeholder="City" class="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
              <select class="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-gray-400 dark:text-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white">
                <option>Province</option>
                <option>Western</option>
                <option>Central</option>
                <option>Southern</option>
              </select>
              <input type="text" placeholder="Postal code" class="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
            </div>
            <input type="tel" placeholder="Phone (optional)" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
          </div>
          <label class="flex items-center gap-2 mt-3 text-xs text-gray-600 dark:text-gray-400">
            <input type="checkbox" class="rounded border-gray-300 dark:border-gray-600 text-black focus:ring-black" />
            Text me with news and offers
          </label>
        </section>

        <!-- Shipping Method -->
        <section class="mb-8">
          <h2 class="text-lg font-medium text-black dark:text-white mb-4">Shipping method</h2>
          <div class="bg-[#f0f5ff] dark:bg-[#2A2A2A] border border-blue-200 dark:border-gray-600 rounded-md px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
            Enter your shipping address to view available shipping methods.
          </div>
        </section>

        <!-- Returns Protection -->
        <section class="mb-8">
          <h2 class="text-lg font-medium text-black dark:text-white mb-4">Returns</h2>
          <div class="flex items-start gap-4 border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <input type="checkbox" class="mt-1 rounded border-gray-300 dark:border-gray-600 text-black focus:ring-black" />
            <div class="flex-1">
              <div class="flex justify-between">
                <div>
                  <p class="text-sm font-medium text-black dark:text-white">Returns Protection</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Buy returns protection now, and you'll qualify for free returns.</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Does not apply to Final Sale items.</p>
                </div>
                <span class="text-sm font-medium text-black dark:text-white shrink-0 ml-4">Rs 990</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Payment -->
        <section class="mb-8">
          <h2 class="text-lg font-medium text-black dark:text-white mb-1">Payment</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">All transactions are secure and encrypted.</p>
          
          <div class="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
            <!-- Credit Card Header -->
            <div class="flex items-center justify-between bg-[#f0f5ff] dark:bg-[#2A2A2A] border-b border-gray-200 dark:border-gray-700 px-4 py-3">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded-full border-2 border-blue-600 dark:border-blue-400 flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                </div>
                <span class="text-sm text-black dark:text-white font-medium">Credit card</span>
              </div>
              <div class="flex gap-1">
                <div class="w-8 h-5 bg-[#1a1f71] rounded flex items-center justify-center text-[7px] text-white font-bold">VISA</div>
                <div class="w-8 h-5 bg-[#eb001b] rounded flex items-center justify-center text-[7px] text-white font-bold">MC</div>
                <div class="w-8 h-5 bg-[#006fcf] rounded flex items-center justify-center text-[7px] text-white font-bold">AMEX</div>
                <div class="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-[8px] text-gray-500 dark:text-gray-300">+4</div>
              </div>
            </div>
            <!-- Card Fields -->
            <div class="p-4 space-y-3 bg-white dark:bg-[#1a1a1a]">
              <div class="relative">
                <input type="text" placeholder="Card number" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white pr-10" />
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Expiration date (MM / YY)" class="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
                <input type="text" placeholder="Security code" class="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
              </div>
              <input type="text" placeholder="Name on card" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
              <label class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <input type="checkbox" checked class="rounded border-gray-300 dark:border-gray-600 text-black focus:ring-black" />
                Use shipping address as billing address
              </label>
            </div>
          </div>

          <!-- Other payment options -->
          <div class="mt-3 space-y-0 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a]">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                <span class="text-sm text-black dark:text-white">Shop Pay</span>
                <span class="text-xs text-gray-400 dark:text-gray-500">· Pay in full or in installments</span>
              </div>
              <span class="text-[#5a31f4] font-bold text-sm">shop</span>
            </div>
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a]">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                <span class="text-sm text-black dark:text-white">PayPal</span>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" class="h-4" />
            </div>
            <div class="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1a1a1a]">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                <span class="text-sm text-black dark:text-white">Afterpay</span>
              </div>
              <div class="bg-[#b2fce4] text-black text-[10px] font-bold px-2 py-0.5 rounded">A</div>
            </div>
          </div>
        </section>

        <!-- Save my information -->
        <section class="mb-8">
          <h2 class="text-sm font-medium text-black dark:text-white mb-3">Save my information for a <span class="underline">faster checkout</span></h2>
          <div class="flex items-center gap-3 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-3 bg-white dark:bg-[#1a1a1a]">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Mobile phone (optional)</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">+94</p>
            </div>
          </div>
        </section>

        <!-- Pay Now -->
        <button 
          @click="handlePayNow"
          class="w-full bg-charcoal dark:bg-white text-white dark:text-black font-bold tracking-widest uppercase text-sm py-4 rounded-md hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-lg"
        >
          PAY NOW
        </button>

        <!-- Footer links -->
        <div class="flex justify-center gap-4 mt-6 text-[11px] text-blue-600 dark:text-blue-400">
          <a href="#" class="underline">Refund policy</a>
          <a href="#" class="underline">Privacy policy</a>
          <a href="#" class="underline">Terms of service</a>
        </div>
        <p class="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-3">
          By placing this order, you agree to our terms of service and understand our privacy policy.
        </p>
      </div>

      <!-- RIGHT COLUMN: Order Summary -->
      <div class="lg:w-[420px] bg-[#faf9f6] dark:bg-[#111111] border-l border-gray-200 dark:border-gray-800 px-6 md:px-10 py-10 order-1 lg:order-2">
        
        <!-- Cart Items -->
        <div class="space-y-5">
          <div v-for="item in cartStore.items" :key="item.id" class="flex items-start gap-3">
            <div class="relative w-16 h-16 bg-[#edede8] dark:bg-[#2A2A2A] rounded-md overflow-hidden shrink-0 flex items-center justify-center">
              <img :src="item.product.images[0]" :alt="item.product.title" class="w-full h-full object-contain" />
              <span class="absolute -top-1 -right-1 bg-gray-500 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{{ item.quantity }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-medium text-black dark:text-white truncate">{{ item.product.title }}</p>
              <p class="text-[10px] text-gray-500 dark:text-gray-400">Size: {{ item.size }}</p>
            </div>
            <span class="text-xs font-medium text-black dark:text-white shrink-0">{{ formatPrice(item.product.price * item.quantity) }}</span>
          </div>
        </div>

        <!-- Empty State -->
        <p v-if="cartStore.items.length === 0" class="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
          Your cart is empty. <RouterLink to="/shop" class="underline text-blue-600">Continue shopping</RouterLink>
        </p>

        <!-- Discount Code -->
        <div class="flex gap-2 mt-8">
          <input type="text" placeholder="Discount code or gift card" class="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2.5 text-sm bg-white dark:bg-[#2A2A2A] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
          <button class="border border-gray-300 dark:border-gray-600 rounded-md px-5 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition font-medium">Apply</button>
        </div>

        <!-- Totals -->
        <div class="mt-8 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div class="flex justify-between text-sm text-black dark:text-white">
            <span>Subtotal · {{ itemCount }} items</span>
            <span class="font-medium">{{ formatPrice(subtotal) }}</span>
          </div>
          <div class="flex justify-between text-sm text-black dark:text-white">
            <span>Shipping</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">Enter shipping address</span>
          </div>
        </div>

        <div class="flex justify-between items-baseline mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span class="text-lg font-bold text-black dark:text-white">Total</span>
          <div class="text-right">
            <span class="text-xs text-gray-400 dark:text-gray-500 mr-2">LKR</span>
            <span class="text-lg font-bold text-black dark:text-white">{{ formatPrice(subtotal) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from '../types/product';

import { useCurrency } from '../composables/useCurrency';

const { formatPrice } = useCurrency();

const props = defineProps<{
  product: Product;
}>();

const selectedSize = ref<string | null>(null);
const btnState = ref<'idle' | 'loading' | 'done'>('idle');
const activeAccordion = ref<string | null>(null);

const emit = defineEmits<{
  (e: 'add-to-cart', payload: { product: Product; size: string; quantity: number }): void;
}>();

const addToCart = () => {
  if (!selectedSize.value) {
    alert('Please select a size');
    return;
  }
  if (btnState.value !== 'idle') return;
  
  // Phase 1: Loading spinner
  btnState.value = 'loading';
  
  setTimeout(() => {
    // Phase 2: Tick mark
    emit('add-to-cart', { product: props.product, size: selectedSize.value!, quantity: 1 });
    btnState.value = 'done';
    
    setTimeout(() => {
      btnState.value = 'idle';
    }, 1000);
  }, 600);
};

const toggleAccordion = (tab: string) => {
  activeAccordion.value = activeAccordion.value === tab ? null : tab;
};
</script>

<template>
  <div class="product-info bg-white rounded-md shadow-sm p-6 md:p-8 flex flex-col space-y-6 sticky top-24 font-sans text-black">
    <!-- Title / Brand / Rating -->
    <div class="space-y-1 pb-2">
      <h1 class="text-[28px] font-medium tracking-tight text-gray-900 leading-tight" style="font-family: Georgia, serif;">
        {{ product.title }}
      </h1>
      <div class="text-[10px] tracking-widest font-bold uppercase text-gray-500 mt-2 mb-2">
        Also Available In: <a href="#" class="underline hover:text-black">Women's Sizes</a>
      </div>
      <div class="text-xl font-medium mt-1">
        <span>{{ formatPrice(product.price) }}</span>
      </div>
      <div class="flex items-center gap-1 text-xs mt-1">
        <span class="text-black text-[10px]">★★★★★</span>
        <span class="text-black font-bold">(50)</span>
      </div>
    </div>

    <!-- Color Selector -->
    <div class="space-y-3 pb-2 pt-2 border-t border-gray-100">
      <div class="text-xs font-bold tracking-widest uppercase flex gap-4 text-gray-400">
        <span class="text-black border-b border-black pb-0.5">ALL</span>
        <span>LIMITED</span>
        <span>CLASSIC</span>
        <span>SALE</span>
      </div>
      <div class="text-sm mt-3">
        Burnt Olive
      </div>
      <div class="flex flex-wrap gap-2.5 mt-2">
        <!-- Mock swatches matching the image -->
        <button v-for="color in ['#8c8474', '#9e3b33', '#e3dccf', '#1c4d3b', '#60645c', '#d2b988', '#b5b6b8', '#111827', '#172747', '#1b1b1b', '#e6eade', '#d9d9d9', '#636544', '#bfa175', '#a19c96']" :key="color" 
                class="w-6 h-6 rounded-full border border-gray-300 hover:border-black transition-all relative flex items-center justify-center"
                :style="{ backgroundColor: color }">
            <span v-if="color === '#8c8474'" class="absolute -inset-[3px] border border-black rounded-full pointer-events-none"></span>
        </button>
      </div>
    </div>

    <!-- Size Selector -->
    <div class="space-y-4 pt-4">
      <div class="flex text-xs font-bold tracking-widest uppercase gap-4 text-gray-400">
        <button class="text-black border-b border-black pb-0.5">Men's Sizes</button>
        <button class="hover:text-black transition-colors">Women's Sizes</button>
      </div>
      <div class="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-3">
        <button 
          v-for="size in ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '15']" 
          :key="size"
          @click="size !== '15' ? selectedSize = size : null"
          class="h-10 border flex items-center justify-center text-sm transition-colors rounded-sm bg-white relative overflow-hidden"
          :class="[
            size === '15' ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' : 
            selectedSize === size 
              ? 'border-black border-[1.5px] font-bold text-black' 
              : 'border-gray-300 text-black hover:border-black'
          ]"
        >
          <span v-if="size === '15'" class="absolute w-[150%] h-[1px] bg-gray-200 transform rotate-[25deg] top-1/2 left-[-25%]"></span>
          {{ size }}
        </button>
      </div>
      <div class="text-[11px] text-gray-600 mt-3">
        <p>The Tree Runner NZ fits true-to-size for most customers.</p>
        <p class="underline cursor-pointer hover:text-black mt-0.5">Fit Guide</p>
      </div>
    </div>

    <!-- Add to Cart -->
    <div class="pt-4 pb-6 border-b border-gray-200">
      <button 
        @click="addToCart"
        class="w-full font-bold uppercase tracking-widest text-sm py-4 transition-colors flex items-center justify-center gap-2 rounded-sm"
        :class="selectedSize ? 'bg-black text-white hover:bg-gray-800' : 'bg-[#e5e7eb] text-gray-400 cursor-not-allowed'"
      >
        <Transition name="btn-content" mode="out-in">
          <!-- Loading spinner -->
          <span v-if="btnState === 'loading'" key="loading" class="flex items-center justify-center">
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2.5"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          </span>
          <!-- Tick mark -->
          <span v-else-if="btnState === 'done'" key="tick" class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
          </span>
          <!-- Default text -->
          <span v-else key="add" class="flex items-center gap-2">
            <span>{{ selectedSize ? 'ADD TO CART' : 'SELECT A SIZE' }}</span>
          </span>
        </Transition>
      </button>
      
      <p class="text-[11px] text-center text-black font-medium mt-4">
        Free Shipping on Orders over $75 <br>
        <span class="text-gray-500 font-normal">Easy Returns</span>
      </p>
    </div>

    <!-- Accordion Details -->
    <div class="pt-0">
      <div class="border-b border-gray-200">
        <button @click="toggleAccordion('details')" class="w-full py-4 flex justify-between items-center group">
          <span class="text-xs font-bold tracking-widest uppercase text-gray-900 group-hover:text-black">Details</span>
          <span class="text-gray-400 group-hover:text-black transition-transform duration-200 text-lg leading-none" :class="activeAccordion === 'details' ? 'rotate-180' : ''">↓</span>
        </button>
        <div v-show="activeAccordion === 'details'" class="pb-4 text-[13px] text-gray-600 space-y-2 leading-relaxed">
          <p>{{ product.description }}</p>
          <ul class="list-none space-y-1 mt-2">
            <li>+ Handmade in Italy</li>
            <li>+ Premium leather upper</li>
            <li>+ Rubber sole</li>
            <li>+ Vintage finish</li>
          </ul>
        </div>
      </div>

      <div class="border-b border-gray-200">
        <button @click="toggleAccordion('shipping')" class="w-full py-4 flex justify-between items-center group">
          <span class="text-xs font-bold tracking-widest uppercase text-gray-900 group-hover:text-black">Shipping & Returns</span>
          <span class="text-gray-400 group-hover:text-black transition-transform duration-200 text-lg leading-none" :class="activeAccordion === 'shipping' ? 'rotate-180' : ''">↓</span>
        </button>
        <div v-show="activeAccordion === 'shipping'" class="pb-4 text-[13px] text-gray-600 leading-relaxed">
          <p>Standard shipping is free on all orders. Returns are accepted within 30 days.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-content-enter-active,
.btn-content-leave-active {
  transition: all 0.2s ease;
}
.btn-content-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.btn-content-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

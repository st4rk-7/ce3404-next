<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Product } from '../types/product';

import { useCurrency } from '../composables/useCurrency';

const { formatPrice } = useCurrency();

const props = defineProps<{
  product: Product;
}>();

const selectedSize = ref<string | null>(null);
const selectedColor = ref('#8c8474');
const activeColorTab = ref('ALL');
const activeSizeTab = ref<'men' | 'women'>('men');
const btnState = ref<'idle' | 'loading' | 'done'>('idle');
const activeAccordion = ref<string | null>(null);

const colorTabs = ['ALL', 'LIMITED', 'CLASSIC', 'SALE'];

const menSizes = ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '15'];
const womenSizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5'];

const currentSizes = computed(() => activeSizeTab.value === 'men' ? menSizes : womenSizes);

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
  <div class="product-info bg-white dark:bg-[#2A2A2A] rounded-md shadow-sm p-6 md:p-8 flex flex-col space-y-6 sticky top-24 font-sans text-black dark:text-gray-100 transition-colors duration-200">
    <!-- Title / Brand / Rating (Hidden on mobile, defined in ProductDetail) -->
    <div class="hidden md:block space-y-1 pb-2">
      <h1 class="text-[28px] font-medium tracking-tight text-gray-900 dark:text-white leading-tight" style="font-family: Georgia, serif;">
        {{ product.title }}
      </h1>
      <div class="text-[10px] tracking-widest font-bold uppercase text-gray-500 dark:text-gray-400 mt-2 mb-2">
        Also Available In: <span class="underline cursor-pointer hover:text-black dark:hover:text-white">Women's Sizes</span>
      </div>
      <div class="text-xl font-medium mt-1">
        <span>{{ formatPrice(product.price) }}</span>
      </div>
      <div class="flex items-center gap-1 text-xs mt-1">
        <span class="text-black dark:text-white text-[10px]">★★★★★</span>
        <span class="text-black dark:text-white font-bold">(50)</span>
      </div>
      <div v-if="product.tags?.[0]" class="inline-block mt-3 mb-1 bg-white dark:bg-[#2A2A2A] border-[1.5px] border-gray-900 dark:border-white px-3 py-1.5 rounded-full text-[10.5px] font-bold tracking-widest uppercase text-black dark:text-white">
        {{ product.tags[0] }}
      </div>
    </div>

    <!-- Color Selector -->
    <div class="space-y-3 pb-2 pt-2 border-t border-gray-100 dark:border-gray-700">
      <div class="text-xs font-bold tracking-widest uppercase flex gap-4 text-gray-400 dark:text-gray-500">
        <button 
          v-for="tab in colorTabs" 
          :key="tab" 
          @click="activeColorTab = tab"
          :class="activeColorTab === tab ? 'text-black dark:text-white border-b border-black dark:border-white pb-0.5' : 'hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer'"
          class="transition-colors"
        >{{ tab }}</button>
      </div>
      <div class="text-sm mt-3">
        {{ selectedColor === '#8c8474' ? 'Burnt Olive' : selectedColor === '#9e3b33' ? 'Auburn' : selectedColor === '#e3dccf' ? 'Natural White' : selectedColor === '#1c4d3b' ? 'Deep Forest' : selectedColor === '#60645c' ? 'Slate' : selectedColor === '#d2b988' ? 'Sand' : selectedColor === '#b5b6b8' ? 'Light Grey' : selectedColor === '#111827' ? 'Black' : selectedColor === '#172747' ? 'Navy' : selectedColor === '#1b1b1b' ? 'Jet Black' : selectedColor === '#e6eade' ? 'Sage' : selectedColor === '#d9d9d9' ? 'Cloud' : selectedColor === '#636544' ? 'Olive' : selectedColor === '#bfa175' ? 'Camel' : 'Heather Grey' }}
      </div>
      <div class="flex flex-wrap gap-2.5 mt-2">
        <button 
          v-for="color in ['#8c8474', '#9e3b33', '#e3dccf', '#1c4d3b', '#60645c', '#d2b988', '#b5b6b8', '#111827', '#172747', '#1b1b1b', '#e6eade', '#d9d9d9', '#636544', '#bfa175', '#a19c96']" 
          :key="color" 
          @click="selectedColor = color"
          class="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white transition-all relative flex items-center justify-center cursor-pointer"
          :style="{ backgroundColor: color }"
        >
            <span v-if="selectedColor === color" class="absolute -inset-[3px] border border-black dark:border-white rounded-full pointer-events-none"></span>
        </button>
      </div>
    </div>

    <!-- Size Selector -->
    <div class="space-y-4 pt-4">
      <div class="flex text-xs font-bold tracking-widest uppercase gap-4 text-gray-400 dark:text-gray-500">
        <button 
          @click="activeSizeTab = 'men'; selectedSize = null" 
          :class="activeSizeTab === 'men' ? 'text-black dark:text-white border-b border-black dark:border-white pb-0.5' : 'hover:text-black dark:hover:text-white transition-colors cursor-pointer'"
        >Men's Sizes</button>
        <button 
          @click="activeSizeTab = 'women'; selectedSize = null" 
          :class="activeSizeTab === 'women' ? 'text-black dark:text-white border-b border-black dark:border-white pb-0.5' : 'hover:text-black dark:hover:text-white transition-colors cursor-pointer'"
        >Women's Sizes</button>
      </div>
      <div class="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-3">
        <button 
          v-for="size in currentSizes" 
          :key="activeSizeTab + '-' + size"
          @click="size !== '15' && size !== '11.5' ? selectedSize = size : null"
          class="h-10 border flex items-center justify-center text-sm transition-colors rounded-sm bg-white dark:bg-[#2A2A2A] relative overflow-hidden"
          :class="[
            (size === '15' || size === '11.5') ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-gray-800' : 
            selectedSize === size 
              ? 'border-black dark:border-white border-[1.5px] font-bold text-black dark:text-white' 
              : 'border-gray-300 dark:border-gray-600 text-black dark:text-white hover:border-black dark:hover:border-white'
          ]"
        >
          <span v-if="size === '15' || size === '11.5'" class="absolute w-[150%] h-[1px] bg-gray-200 dark:bg-gray-600 transform rotate-[25deg] top-1/2 left-[-25%]"></span>
          {{ size }}
        </button>
      </div>
      <div class="text-[11px] text-gray-600 dark:text-gray-400 mt-3">
        <p>The Tree Runner NZ fits true-to-size for most customers.</p>
        <p class="underline cursor-pointer hover:text-black dark:hover:text-white mt-0.5">Fit Guide</p>
      </div>
    </div>

    <!-- Add to Cart -->
    <div class="pt-4 pb-6 border-b border-gray-200 dark:border-gray-700">
      <button 
        @click="addToCart"
        class="w-full font-bold uppercase tracking-widest text-sm py-4 transition-colors flex items-center justify-center gap-2 rounded-sm"
        :class="selectedSize ? 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200' : 'bg-[#e5e7eb] dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'"
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
      
      <p class="text-[11px] text-center text-black dark:text-white font-medium mt-4">
        Free Shipping on Orders over Rs 5,000 <br>
        <span class="text-gray-500 dark:text-gray-400 font-normal">Easy Returns</span>
      </p>
    </div>

    <!-- Accordion Details -->
    <div class="pt-0">
      <div class="border-b border-gray-200 dark:border-gray-700">
        <button @click="toggleAccordion('details')" class="w-full py-4 flex justify-between items-center group">
          <span class="text-xs font-bold tracking-widest uppercase text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white">Details</span>
          <span class="text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-transform duration-200 text-lg leading-none" :class="activeAccordion === 'details' ? 'rotate-180' : ''">↓</span>
        </button>
        <div v-show="activeAccordion === 'details'" class="pb-4 text-[13px] text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed">
          <p>{{ product.description }}</p>
          <ul class="list-none space-y-1 mt-2">
            <li>+ Handmade in Italy</li>
            <li>+ Premium leather upper</li>
            <li>+ Rubber sole</li>
            <li>+ Vintage finish</li>
          </ul>
        </div>
      </div>

      <div class="border-b border-gray-200 dark:border-gray-700">
        <button @click="toggleAccordion('shipping')" class="w-full py-4 flex justify-between items-center group">
          <span class="text-xs font-bold tracking-widest uppercase text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white">Shipping & Returns</span>
          <span class="text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-transform duration-200 text-lg leading-none" :class="activeAccordion === 'shipping' ? 'rotate-180' : ''">↓</span>
        </button>
        <div v-show="activeAccordion === 'shipping'" class="pb-4 text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
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

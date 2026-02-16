<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Product } from '../types/product';

import { useCurrency } from '../composables/useCurrency';

const { formatPrice } = useCurrency();

const props = defineProps<{
  product: Product;
}>();

const selectedSize = ref<string | null>(null);
const activeTab = ref<'description' | 'shipping'>('description');
const quantity = ref(1);
const btnState = ref<'idle' | 'loading' | 'done'>('idle');

// Mock sizes
const sizes = ['39', '40', '41', '42', '43', '44', '45'];

const discountPrice = computed(() => {
  return props.product.price * 0.8;
});

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
    emit('add-to-cart', { product: props.product, size: selectedSize.value!, quantity: quantity.value });
    btnState.value = 'done';
    
    setTimeout(() => {
      btnState.value = 'idle';
    }, 1000);
  }, 600);
};
</script>

<template>
  <div class="product-info flex flex-col space-y-8 pt-6 md:pt-0 md:pl-10 lg:pl-20 sticky top-32 font-mono text-black dark:text-white px-4 sm:px-0">
    <!-- Header -->
    <div class="space-y-4 text-center md:text-left border-b border-gray-200 dark:border-gray-800 pb-6">
      <h1 class="text-2xl md:text-xl lg:text-2xl font-bold tracking-tight uppercase leading-tight">
        {{ product.title }}
      </h1>
      <div class="text-lg md:text-xl">
        <span class="font-bold">{{ formatPrice(discountPrice) }}</span>
        <span class="text-gray-400 line-through text-sm ml-2">{{ formatPrice(product.price) }}</span>
      </div>
    </div>

    <!-- Size Selector -->
    <div class="space-y-4">
      <div class="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">
        <span>Select Size</span>
        <button class="underline hover:no-underline">Size Guide</button>
      </div>
      <div class="grid grid-cols-7 sm:grid-cols-4 gap-2">
        <button 
          v-for="size in sizes" 
          :key="size"
          @click="selectedSize = size"
          class="h-10 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-sm hover:border-black dark:hover:border-white transition-colors"
          :class="[
            selectedSize === size 
              ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
              : 'text-black dark:text-white'
          ]"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Add to Cart -->
    <div class="pt-4">
      <button 
        @click="addToCart"
        class="w-full bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-sm py-5 md:py-4 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
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
            <span>Add to Cart</span>
            <span v-if="selectedSize" class="opacity-75">— {{ selectedSize }}</span>
          </span>
        </Transition>
      </button>
      
      <p class="text-[10px] text-center text-gray-500 mt-3 uppercase tracking-wider">
        Free Shipping & Returns
      </p>
    </div>

    <!-- Info Tabs -->
    <div class="w-full pt-4">
      <div class="flex gap-6 mb-4 text-[10px] font-bold uppercase tracking-widest">
        <button 
          @click="activeTab = 'description'"
          class="border-b transition-colors pb-1"
          :class="activeTab === 'description' ? 'border-black text-black dark:border-white dark:text-white' : 'border-transparent text-gray-400'"
        >
          Description
        </button>
        <button 
          @click="activeTab = 'shipping'"
          class="border-b transition-colors pb-1"
          :class="activeTab === 'shipping' ? 'border-black text-black dark:border-white dark:text-white' : 'border-transparent text-gray-400'"
        >
          Shipping
        </button>
      </div>
      
      <div class="text-xs text-gray-600 leading-relaxed">
        <div v-if="activeTab === 'description'">
          <p class="mb-4">{{ product.description }}</p>
          <ul class="space-y-1 list-none text-gray-500">
            <li>+ Handmade in Italy</li>
            <li>+ Premium leather upper</li>
            <li>+ Rubber sole</li>
            <li>+ Vintage finish</li>
          </ul>
        </div>
        <div v-else-if="activeTab === 'shipping'">
          <p>
            Standard shipping is free on all orders. Returns are accepted within 30 days.
          </p>
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

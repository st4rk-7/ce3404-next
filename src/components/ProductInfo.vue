<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Product } from '@/types/product';

const props = defineProps<{
  product: Product;
}>();

const selectedSize = ref<string | null>(null);
const activeTab = ref<'description' | 'shipping'>('description');
const quantity = ref(1);

// Mock sizes
const sizes = ['39', '40', '41', '42', '43', '44', '45'];

const discountPrice = computed(() => {
  return (props.product.price * 0.8).toFixed(2); // 20% off mock
});

const emit = defineEmits<{
  (e: 'add-to-cart', payload: { product: Product; size: string; quantity: number }): void;
}>();

const addToCart = () => {
  if (!selectedSize.value) {
    alert('Please select a size');
    return;
  }
  emit('add-to-cart', { product: props.product, size: selectedSize.value, quantity: quantity.value });
};
</script>

<template>
  <div class="product-info flex flex-col space-y-6 pt-6 md:pt-0 md:pl-8 lg:pl-16 sticky top-24">
    <!-- Header -->
    <div class="space-y-2 text-center md:text-left">
      <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 font-sans uppercase">
        {{ product.title }}
      </h1>
      <div class="flex items-center justify-center md:justify-start space-x-3 text-lg">
        <span class="text-red-600 font-bold">€{{ discountPrice }}</span>
        <span class="text-gray-400 line-through text-base">€{{ product.price }}</span>
        <span class="bg-red-100 text-red-700 text-xs px-2 py-0.5 font-bold uppercase tracking-wide">Sale</span>
      </div>
    </div>

    <!-- Size Selector -->
    <div class="space-y-3">
      <div class="flex justify-between items-center text-xs uppercase font-bold tracking-wider text-gray-900">
        <span>Size</span>
        <button class="text-gray-500 underline hover:text-gray-900">Size Guide</button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="size in sizes" 
          :key="size"
          @click="selectedSize = size"
          class="w-12 h-10 border flex items-center justify-center text-sm font-medium transition-all duration-200"
          :class="[
            selectedSize === size 
              ? 'border-gray-900 bg-gray-900 text-white' 
              : 'border-gray-300 text-gray-700 hover:border-gray-900'
          ]"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Add to Cart -->
    <div class="space-y-4 pt-4 border-t border-gray-100">
      <button 
        @click="addToCart"
        class="w-full bg-gray-900 text-white font-bold uppercase tracking-widest text-sm py-4 hover:bg-black transition-colors flex items-center justify-center space-x-2"
      >
        <span>Add to Cart</span>
        <span v-if="selectedSize" class="text-xs opacity-75">• Size {{ selectedSize }}</span>
      </button>
      
      <p class="text-xs text-center text-gray-500">
        Free shipping and returns worldwide.
      </p>
    </div>

    <!-- Trust Badges -->
    <div class="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
        <div class="flex flex-col items-center justify-center text-center space-y-2 p-2">
             <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
             <span class="text-[10px] uppercase font-bold tracking-wider text-gray-600">Free Returns</span>
        </div>
        <div class="flex flex-col items-center justify-center text-center space-y-2 p-2">
             <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
             <span class="text-[10px] uppercase font-bold tracking-wider text-gray-600">Secure Payment</span>
        </div>
    </div>

    <!-- Tabs/Accordion -->
    <div class="w-full">
      <div class="flex border-b border-gray-200">
        <button 
          @click="activeTab = 'description'"
          class="flex-1 pb-2 text-xs font-bold uppercase tracking-widest text-center border-b-2 transition-colors"
          :class="activeTab === 'description' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'"
        >
          Description
        </button>
        <button 
          @click="activeTab = 'shipping'"
          class="flex-1 pb-2 text-xs font-bold uppercase tracking-widest text-center border-b-2 transition-colors"
          :class="activeTab === 'shipping' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'"
        >
          Shipping
        </button>
      </div>
      
      <div class="py-4 text-sm text-gray-600 leading-relaxed font-light">
        <div v-if="activeTab === 'description'">
          <p class="mb-4">
            {{ product.description }}
          </p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Handmade in Italy</li>
            <li>Premium leather upper</li>
            <li>Rubber sole</li>
            <li>Vintage finish</li>
          </ul>
        </div>
        <div v-else-if="activeTab === 'shipping'">
          <p>
            Free standard shipping on all orders over €200. 
            Returns are accepted within 14 days of delivery.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

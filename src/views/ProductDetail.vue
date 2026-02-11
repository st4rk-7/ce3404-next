<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types/product';

const route = useRoute();
const cartStore = useCartStore();
const product = ref<Product | null>(null);
const isLoading = ref(true);
const error = ref('');
const showAddedFeedback = ref(false);

const handleAddToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value);
    showAddedFeedback.value = true;
    setTimeout(() => {
      showAddedFeedback.value = false;
    }, 2000);
  }
};

onMounted(async () => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${route.params.id}`);
    if (!res.ok) throw new Error('Product not found');
    product.value = await res.json();
  } catch (err: any) {
    error.value = err.message || 'Failed to load product';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <router-link 
      to="/"
      class="inline-flex items-center mb-6 text-indigo-600 hover:text-indigo-800 transition-colors"
    >
      <svg class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to Home
    </router-link>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-20 text-red-500">
      {{ error }}
    </div>

    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <!-- Image Gallery simulation (just showing thumbnail/first image large for now) -->
      <div class="p-8 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <img 
          :src="product.images[0] || product.thumbnail" 
          :alt="product.title" 
          class="max-h-[500px] object-contain w-full hover:scale-105 transition-transform duration-500"
        />
      </div>

      <!-- Product Details -->
      <div class="p-8 flex flex-col">
        <div class="flex justify-between items-start mb-4">
           <div>
             <span class="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-100 uppercase bg-indigo-600 rounded-full mb-2">
               {{ product.category }}
             </span>
             <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{{ product.title }}</h1>
             <p class="text-sm text-gray-500 dark:text-gray-400">Brand: {{ product.brand }}</p>
           </div>
           
           <div class="flex flex-col items-end">
              <span class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${{ product.price }}</span>
              <span v-if="product.discountPercentage" class="text-sm text-green-600 font-medium">
                -{{ product.discountPercentage }}% OFF
              </span>
           </div>
        </div>

        <div class="flex items-center mb-6">
           <div class="flex items-center text-yellow-400 mr-2">
             <template v-for="i in 5" :key="i">
               <svg v-if="i <= Math.round(product.rating)" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
               </svg>
               <svg v-else class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
               </svg>
             </template>
           </div>
           <span class="text-gray-500 dark:text-gray-400">({{ product.rating }} / 5)</span>
        </div>

        <p class="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          {{ product.description }}
        </p>

        <div class="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
           <div class="flex items-center justify-between mb-4">
             <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Availability</span>
             <span :class="{'text-green-600': product.stock > 0, 'text-red-600': product.stock === 0}" class="font-semibold">
               {{ product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock' }}
             </span>
           </div>
           
           <button 
             @click="handleAddToCart"
             class="w-full text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:ring-4 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
             :class="showAddedFeedback ? 'bg-green-600 hover:bg-green-700 ring-green-300' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300'"
             :disabled="product.stock === 0"
           >
             {{ showAddedFeedback ? 'Added to Cart!' : (product.stock > 0 ? 'Add to Cart' : 'Sold Out') }}
           </button>
        </div>
      </div>
    </div>
  </div>
</template>

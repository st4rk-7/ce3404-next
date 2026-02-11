<script setup lang="ts">
import type { Product } from '../types/product';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <router-link 
    :to="{ name: 'product-detail', params: { id: product.id } }"
    class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full cursor-pointer block"
  >
    <div class="h-48 overflow-hidden relative group">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div class="p-4 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1" :title="product.title">
          {{ product.title }}
        </h3>
        <span class="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
          ${{ product.price }}
        </span>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
        {{ product.description }}
      </p>
      <div class="flex justify-between items-center mt-auto">
        <span class="text-xs text-gray-400 dark:text-gray-500 capitalize">
          {{ product.category }}
        </span>
        <div class="flex items-center">
          <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-sm text-gray-700 dark:text-gray-300">{{ product.rating }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue';
import type { Product } from '../types/product';

defineProps<{
  products: Product[];
  isLoading?: boolean;
}>();
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-20">
       <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="text-center py-20 text-gray-500 font-mono text-xs">
       No products found.
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :discount-percentage="product.discountPercentage"
      />
    </div>
    
    <!-- Load More Button (Mock) -->
    <div class="mt-16 text-center">
        <p class="text-[10px] text-gray-400 mb-4 font-mono">You've viewed {{ products.length }} of {{ products.length + 12 }} products</p>
        <button class="border border-black rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest py-3 px-12 hover:bg-black hover:text-white transition-colors">
            Load More
        </button>
    </div>
  </div>
</template>

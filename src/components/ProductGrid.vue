<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import ProductCard from './ProductCard.vue';
import type { Product } from '../types/product';

const props = withDefaults(defineProps<{
  products: Product[];
  isLoading?: boolean;
  error?: string | null;
  showPromo?: boolean;
  showLoadMore?: boolean;
}>(), {
  isLoading: false,
  error: null,
  showPromo: true,
  showLoadMore: true,
});

defineEmits<{
  retry: [];
}>();

const pageSize = 12;
const visibleCount = ref(pageSize);
const visibleProducts = computed(() => props.products.slice(0, visibleCount.value));
const hasMore = computed(() => visibleCount.value < props.products.length);

watch(() => props.products, () => {
  visibleCount.value = pageSize;
});
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center py-20">
       <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-5 text-pretty">{{ error }}</p>
      <button
        type="button"
        class="min-h-10 border border-black dark:border-white rounded-full px-8 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-[background-color,color]"
        @click="$emit('retry')"
      >
        Try Again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="text-center py-20 text-gray-500 dark:text-gray-400 font-mono text-xs">
       No products match these filters.
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-x-4 md:gap-y-12 lg:gap-x-6 lg:gap-y-16">
      <template v-for="(product, index) in visibleProducts" :key="product.id">
          <!-- Insert Promo Tile at index 3 -->
          <div v-if="showPromo && index === 3" class="relative overflow-hidden rounded-[2px] bg-[#9a927a]">
             <img src="/banners/promo-lifestyle.jpg" alt="A person wearing Starz shoes outdoors" loading="lazy" class="w-full h-full object-cover min-h-[400px]" />
          </div>
          
          <ProductCard
            :product="product"
            :discount-percentage="product.discountPercentage"
          />
      </template>
    </div>
    
    <div v-if="showLoadMore && products.length" class="mt-16 text-center">
        <p class="text-[10px] text-gray-500 dark:text-gray-400 mb-4 font-mono">You've viewed {{ visibleProducts.length }} of {{ products.length }} products</p>
        <button
          v-if="hasMore"
          type="button"
          class="min-h-10 border border-black dark:border-white rounded-full bg-white dark:bg-transparent text-black dark:text-white text-xs font-bold uppercase tracking-widest px-12 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-[background-color,color]"
          @click="visibleCount += pageSize"
        >
            Load More
        </button>
    </div>
  </div>
</template>

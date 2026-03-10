<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types/product';
import { useProducts } from '../composables/useProducts';
import { useCurrency } from '../composables/useCurrency';
import ProductGallery from '../components/ProductGallery.vue';
import ProductInfo from '../components/ProductInfo.vue';
import ProductGrid from '../components/ProductGrid.vue';

const route = useRoute();
const cartStore = useCartStore();
const { getProductById, fetchProducts, products } = useProducts();
const { formatPrice } = useCurrency();
const product = ref<Product | null>(null);
const isLoading = ref(true);
const error = ref('');

const handleAddToCart = (payload: { product: Product; size: string; quantity: number }) => {
  cartStore.addToCart(payload.product, payload.size, payload.quantity);
  // Open the cart drawer to show the newly added item
  cartStore.openDrawer();
};

// Mock related products (just filter out current product and take 4)
const relatedProducts = computed(() => {
    if (!product.value) return [];
    return products.value.filter(p => p.id !== product.value?.id).slice(0, 4);
});

onMounted(async () => {
  try {
    const productId = Number(route.params.id); // Changed parseInt to Number
    await fetchProducts(); // Ensure products are loaded for grid/recommendations
    product.value = getProductById(productId) || null;

    if (!product.value) {
        throw new Error('Product not found');
    }
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Failed to load product';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="bg-[#f5f4f0] dark:bg-charcoal min-h-screen transition-colors duration-200">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-[50vh]">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center h-[50vh] text-red-500">
      {{ error }}
    </div>

    <!-- Product Content -->
    <div v-if="product" class="w-full">
      <!-- Breadcrumb - Allbirds style -->
      <div class="container mx-auto px-4 md:px-8 py-4 top-0 z-10 text-xs text-gray-500 dark:text-gray-400 font-medium">
        Home > {{ product.title }}
      </div>
      <!-- Mobile Info Header -->
      <div class="w-full px-4 md:hidden mb-4 mt-2 font-sans">
        <h1 class="text-[28px] font-medium tracking-tight text-gray-900 dark:text-white leading-tight" style="font-family: Georgia, serif;">
          {{ product.title }}
        </h1>
        <div class="text-xl font-medium mt-1 text-black dark:text-white pb-1">
          <span>{{ formatPrice(product.price) }}</span>
        </div>
        <div class="flex items-center gap-1 text-xs mt-1 mb-2">
          <span class="text-black dark:text-white text-[10px]">★★★★★</span>
          <span class="text-black dark:text-white font-bold">(50)</span>
        </div>
        <div v-if="product.tags?.[0]" class="inline-block mt-2 mb-2 bg-white dark:bg-[#1a1a1a] border-[1.5px] border-gray-900 dark:border-white px-3 py-1.5 rounded-full text-[10.5px] font-bold tracking-widest uppercase text-black dark:text-white">
          {{ product.tags[0] }}
        </div>
      </div>
      
      <div class="flex flex-col md:flex-row w-full max-w-[1440px] mx-auto px-0 sm:px-4 md:px-8 pb-12">
        <!-- Gallery (Left Column - approx 65%) -->
        <div class="w-full md:w-[65%] lg:w-[68%]">
          <ProductGallery :product="product" />
        </div>

        <!-- Info (Right Column - sticky - approx 35%) -->
        <div class="w-full md:w-[35%] lg:w-[32%] relative px-4 md:px-0 mt-8 md:mt-0 md:pl-8 lg:pl-16">
          <ProductInfo 
            :product="product" 
            @add-to-cart="handleAddToCart"
          />
        </div>
      </div>

      <!-- Recommendations Section -->
      <div class="container mx-auto mt-20 pt-10 border-t border-gray-200 dark:border-white/10 px-4 md:px-8">
        <h3 class="text-xl font-bold uppercase tracking-widest text-center mb-10 text-black dark:text-white">You Might Also Like</h3>
        <ProductGrid :products="relatedProducts" :columns="4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types/product';
import { useProducts } from '../composables/useProducts';
import ProductGallery from '../components/ProductGallery.vue';
import ProductInfo from '../components/ProductInfo.vue';
import ProductGrid from '../components/ProductGrid.vue';

const route = useRoute();
const cartStore = useCartStore();
const { getProductById, fetchProducts, products } = useProducts();
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
  } catch (err: any) {
    error.value = err.message || 'Failed to load product';
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

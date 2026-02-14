<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types/product';
import { useProducts } from '../composables/useProducts';
import ProductGallery from '../components/ProductGallery.vue';
import ProductInfo from '../components/ProductInfo.vue';

const route = useRoute();
const cartStore = useCartStore();
const { getProductById, fetchProducts } = useProducts();
const product = ref<Product | null>(null);
const isLoading = ref(true);
const error = ref('');
const showAddedFeedback = ref(false);

const handleAddToCart = (payload: { product: Product; size: string; quantity: number }) => {
  cartStore.addToCart(payload.product); // You might want to update store to accept size/quantity
  showAddedFeedback.value = true;
  setTimeout(() => {
    showAddedFeedback.value = false;
  }, 2000);
};

onMounted(async () => {
  try {
    const productId = parseInt(route.params.id as string);
    product.value = getProductById(productId) || null;

    // If product not found (page reload), fetch data first
    if (!product.value) {
        await fetchProducts();
        product.value = getProductById(productId) || null;
    }

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
  <div class="bg-white min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-[50vh]">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center h-[50vh] text-red-500">
      {{ error }}
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="container mx-auto px-4 md:px-8 py-6 md:py-12">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8">
        <!-- Gallery (Left Column) -->
        <div class="md:col-span-7 lg:col-span-8">
          <ProductGallery :product="product" />
        </div>

        <!-- Info (Right Column - Sticky) -->
        <div class="md:col-span-5 lg:col-span-4 relative">
          <ProductInfo 
            :product="product" 
            @add-to-cart="handleAddToCart"
          />
          
          <!-- Feedback Toast -->
          <div 
            v-if="showAddedFeedback"
            class="fixed bottom-4 right-4 bg-green-900 text-white px-6 py-3 rounded shadow-lg z-50 transition-opacity duration-300"
          >
            Added to cart!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

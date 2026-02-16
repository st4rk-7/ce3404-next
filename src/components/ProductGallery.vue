<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from '../types/product';

defineProps<{
  product: Product;
}>();

const currentImageIndex = ref(0);
</script>

<template>
  <div class="product-gallery h-full">
    <!-- Desktop: Vertical/Grid Scroll -->
    <div class="hidden md:grid grid-cols-2 gap-2">
      <div 
        v-for="(image, index) in product.images" 
        :key="index"
        class="aspect-[4/5] bg-gray-100 relative group overflow-hidden cursor-zoom-in"
        :class="{ 'col-span-2': index % 3 === 0 }" 
        @click="currentImageIndex = index"
      >
        <img 
          :src="image" 
          :alt="`${product.title} - Image ${index + 1}`"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Mobile: Horizontal Slider -->
    <div class="md:hidden relative overflow-x-auto snap-x snap-mandatory flex w-full no-scrollbar h-[65vh]">
      <div 
        v-for="(image, index) in product.images" 
        :key="index"
        class="snap-center shrink-0 w-full h-full bg-gray-100 dark:bg-gray-800"
      >
        <img 
          :src="image" 
          :alt="`${product.title} - Image ${index + 1}`"
          class="w-full h-full object-cover"
        />
      </div>
      
      <!-- Mobile Pagination Dots -->
      <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        <span 
          v-for="(_, index) in product.images" 
          :key="index"
          class="block w-2.5 h-2.5 rounded-full bg-white shadow transition-all duration-300"
          :class="index === currentImageIndex ? 'opacity-100 scale-125' : 'opacity-50'"
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>

<script setup lang="ts">
import type { Product } from '../types/product';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="product-gallery w-full">
    <!-- Desktop: Mosaic Grid (First full width, rest half width) -->
    <div class="hidden md:grid grid-cols-2 gap-4">
      <div 
        v-for="(image, index) in product.images" 
        :key="index"
        class="bg-transparent relative"
        :class="{ 'col-span-2': index === 0 }" 
      >
        <img 
          :src="image" 
          :alt="`${product.title} - View ${index + 1}`"
          class="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Mobile: Horizontal Slider -->
    <div class="md:hidden relative overflow-x-auto snap-x snap-mandatory flex w-full no-scrollbar pb-6">
      <div 
        v-for="(image, index) in product.images" 
        :key="index"
        class="snap-center shrink-0 w-[90%] mx-2 bg-transparent"
      >
        <img 
          :src="image" 
          :alt="`${product.title} - View ${index + 1}`"
          class="w-full h-auto object-cover rounded-xl"
          loading="lazy"
        />
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

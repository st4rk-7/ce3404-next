<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Product } from '../types/product';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();
const addedSize = ref<string | null>(null);

const handleQuickAdd = (size: string) => {
    addedSize.value = size;
    cartStore.addToCart(props.product);
    cartStore.openDrawer();
    
    // Reset checkmark after 1.5s
    setTimeout(() => {
        addedSize.value = null;
    }, 1500);
};

const props = defineProps<{
  product: Product;
  discountPercentage?: number; // allow overriding or defaulting if missing
}>();

// Calculate original price assuming product.price is the SELLING price
// OR if product.price is original, calculate selling.
// Standard DummyJSON: price IS the selling price. discountPercentage is metadata.
// But usually in e-commerce UI "Save 50%" implies Original was higher.
// Let's assume product.price is the *selling* price.
// Original = Selling / (1 - discount / 100)
const originalPrice = computed(() => {
    const discount = props.discountPercentage || props.product.discountPercentage || 0;
    if (discount <= 0) return 0;
    return props.product.price / (1 - discount / 100);
});

const hasDiscount = computed(() => {
    return (props.discountPercentage || props.product.discountPercentage || 0) > 0;
});

const handleImageError = (e: Event) => {
    const target = e.target as HTMLImageElement;
    // Fallback to a reliable placeholder if the main image fails
    target.src = 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80';
};

</script>

<template>
  <div class="group relative block w-full bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
    
    <!-- Image Section -->
    <RouterLink :to="`/product/${product.id}`" class="block relative aspect-square bg-[#f5f5f5] overflow-hidden">
      <!-- "Best Seller" or "Sale" Badge -->
      <div v-if="hasDiscount" class="absolute top-3 left-3 z-10 bg-white text-black text-[10px] font-bold uppercase py-1 px-3 rounded-full shadow-sm tracking-widest">
        Sale
      </div>
      
      <img
        :src="product.thumbnail"
        :alt="product.title"
        @error="handleImageError"
        class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      
      <!-- Hover Size Selector Overlay (Desktop) -->
      <div class="absolute bottom-0 left-0 w-full bg-white bg-opacity-95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-gray-100 px-4 py-4 z-20">
          <p class="text-xs font-bold uppercase tracking-widest text-center mb-3">Quick Add</p>
          <div class="grid grid-cols-5 gap-2 relative z-30">
              <button 
                  v-for="size in ['8', '9', '10', '11', '12', '13', '14']" 
                  :key="size" 
                  @click.prevent="handleQuickAdd(size)"
                  class="border border-gray-300 rounded hover:border-black hover:bg-black hover:text-white transition-colors text-xs py-1.5 font-bold flex justify-center items-center h-8"
              >
                  <template v-if="addedSize === size">
                      <svg class="w-4 h-4 text-brand-blue dark:text-white animate-fade-in" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  </template>
                  <template v-else>
                      {{ size }}
                  </template>
              </button>
          </div>
      </div>
    </RouterLink>

    <!-- Details Section -->
    <div class="p-5 flex flex-col items-start bg-white">
      <RouterLink :to="`/product/${product.id}`" class="w-full">
         <h3 class="text-base font-bold text-black leading-snug mb-1">
           {{ product.title }}
         </h3>
         
         <!-- Subtitle/Category (e.g. Everyday Sneaker) -->
         <p class="text-sm text-gray-500 mb-2 border-b border-gray-100 pb-4">
             {{ product.category.replace('-', ' ') || 'Everyday Sneaker' }}
         </p>
         
         <!-- Price -->
         <div class="flex items-center space-x-2 text-sm mt-3 font-medium">
           <span v-if="hasDiscount" class="text-gray-400 line-through">
               ${{ Math.round(originalPrice) }}
           </span>
           <span :class="{'text-red-700': hasDiscount, 'text-black': !hasDiscount}">
               ${{ Math.round(product.price) }}
           </span>
         </div>
      </RouterLink>
      
      <!-- Color Swatches (Mocking available colors based on design) -->
      <div class="flex items-center gap-2 mt-4">
          <button class="w-5 h-5 rounded-full border border-gray-300 bg-black hover:ring-1 hover:ring-black hover:ring-offset-1 transition-all" title="Black"></button>
          <button class="w-5 h-5 rounded-full border border-gray-300 bg-white hover:ring-1 hover:ring-black hover:ring-offset-1 transition-all" title="White"></button>
          <button class="w-5 h-5 rounded-full border border-gray-300 bg-gray-400 hover:ring-1 hover:ring-black hover:ring-offset-1 transition-all" title="Grey"></button>
          <button class="w-5 h-5 rounded-full border border-gray-300 bg-[#8B4513] hover:ring-1 hover:ring-black hover:ring-offset-1 transition-all" title="Brown"></button>
          <span class="text-xs text-gray-500 ml-1">+8</span>
      </div>
    </div>
    
  </div>
</template>

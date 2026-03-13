<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Product } from '../types/product';
import { useCartStore } from '../stores/cart';
import { useCurrency } from '../composables/useCurrency';

const cartStore = useCartStore();
const { formatPrice } = useCurrency();
const addedSize = ref<string | null>(null);

const handleQuickAdd = (size: string) => {
    addedSize.value = size;
    cartStore.addToCart(props.product, size);
    
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
    target.src = '/shoes/shoe-01a.webp';
};

</script>

<template>
  <div class="group relative block w-full bg-white dark:bg-[#2c2c2c] rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
    
    <!-- Image Section -->
    <RouterLink :to="`/product/${product.id}`" class="block relative aspect-square bg-[#f5f5f5] dark:bg-[#1a1a1a] overflow-hidden">
      <!-- "Best Seller" or "Sale" Badge -->
      <div v-if="hasDiscount" class="absolute top-3 left-3 z-10 bg-white dark:bg-black text-black dark:text-white text-[10px] font-bold uppercase py-1 px-3 rounded-full shadow-sm tracking-widest">
        Sale
      </div>
      
      <img
        :src="product.thumbnail"
        :alt="product.title"
        loading="lazy"
        @error="handleImageError"
        class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      
      <!-- Hover Size Selector Overlay (Desktop) -->
      <div class="hidden md:block absolute bottom-0 left-0 w-full bg-white dark:bg-charcoal bg-opacity-95 dark:bg-opacity-95 transform translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 border-t border-gray-100 dark:border-gray-800 px-4 py-4 z-20">
          <p class="text-xs font-bold uppercase tracking-widest text-center mb-3 dark:text-white">Quick Add</p>
          <div class="grid grid-cols-5 gap-2 relative z-30">
              <button 
                  v-for="size in product.sizes.slice(0, 5)"
                  :key="size" 
                  @click.prevent="handleQuickAdd(size)"
                  class="border border-gray-300 dark:border-gray-600 rounded hover:border-black dark:hover:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors text-xs font-bold flex justify-center items-center min-h-10 dark:text-white"
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
    <div class="p-5 flex flex-col items-start bg-white dark:bg-[#2c2c2c]">
      <RouterLink :to="`/product/${product.id}`" class="w-full">
         <h3 class="text-base font-bold text-black dark:text-white leading-snug mb-1">
           {{ product.title }}
         </h3>
         
         <!-- Subtitle/Category (e.g. Everyday Sneaker) -->
         <p class="text-sm text-gray-500 dark:text-gray-400 mb-2 border-b border-gray-100 dark:border-gray-700 pb-4">
             {{ product.category.replace('-', ' ') || 'Everyday Sneaker' }}
         </p>
         
         <!-- Price -->
         <div class="flex items-center space-x-2 text-sm mt-3 font-medium">
             <span :class="{'text-brand-red dark:text-red-400': hasDiscount, 'text-black dark:text-white': !hasDiscount}">
                 {{ formatPrice(product.price) }}
             </span>
             <span v-if="hasDiscount" class="text-gray-500 dark:text-gray-400 line-through text-xs font-normal">
                 {{ formatPrice(originalPrice) }}
             </span>
         </div>
      </RouterLink>
      
      <div class="flex items-center gap-1.5 mt-4" :aria-label="`${product.colors.length} available colors`">
          <span v-for="color in product.colors.slice(0, 4)" :key="color" class="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" :style="{ backgroundColor: color }" />
          <span class="text-[10px] text-gray-500 dark:text-gray-400 ml-1 font-medium tracking-wide">{{ product.colors.length }} {{ product.colors.length === 1 ? 'Color' : 'Colors' }}</span>
      </div>
    </div>
    
  </div>
</template>

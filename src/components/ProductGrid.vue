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
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-x-4 md:gap-y-12 lg:gap-x-6 lg:gap-y-16">
      <template v-for="(product, index) in products" :key="product.id">
          <!-- Insert Promo Tile at index 3 -->
          <div v-if="index === 3" class="relative group cursor-pointer overflow-hidden rounded-[2px] bg-[#9a927a]">
             <img src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&w=800&q=80" alt="Lifestyle Shoes" class="w-full h-full object-cover min-h-[400px]" />
             <!-- Dark Gradient Overlay for text readability -->
             <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
             
             <div class="absolute inset-x-0 bottom-8 flex justify-center z-10">
                 <button class="bg-white/10 backdrop-blur-md border border-white text-white text-[10px] font-bold tracking-widest uppercase px-10 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300">SHOP NOW</button>
             </div>
             
             <div class="absolute inset-x-0 top-12 text-center text-white px-6 z-10">
                 <p class="text-[10px] md:text-xs font-bold tracking-widest mb-3 uppercase opacity-90">TERRALUX™</p>
                 <h3 class="font-serif text-3xl md:text-4xl leading-snug tracking-wide text-white drop-shadow-md">Like Leather.<br/>Only Better.</h3>
             </div>
          </div>
          
          <ProductCard
            :product="product"
            :discount-percentage="product.discountPercentage"
          />
      </template>
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

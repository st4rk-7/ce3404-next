<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useProducts } from '../composables/useProducts';
import { useCurrency } from '../composables/useCurrency';

const { products, fetchProducts } = useProducts();
const { formatPrice } = useCurrency();

onMounted(async () => {
  await fetchProducts();
});

const mensProducts = computed(() => 
  products.value.filter(p => p.category === 'mens-shoes').slice(0, 4)
);
const womensProducts = computed(() => 
  products.value.filter(p => p.category === 'womens-shoes').slice(0, 4)
);
</script>

<template>
  <!-- Allbirds: shopping_grid section -->
  
  <!-- Men's New Arrivals -->
  <section class="mt-16 px-2.5">
    <!-- Allbirds: Banner with font-serif text-2xl leading-7 lg:text-4xl lg:leading-12 -->
    <div class="relative rounded overflow-hidden mb-6 aspect-[3/1] md:aspect-[4/1]">
      <img
        src="https://www.allbirds.com/cdn/shop/files/26Q1_Terralux_Site_ProductGrid_Desktop-Mobile_9x16_M_v2_57cea5bb-913d-4995-bfb3-f2b866972fb6.jpg?v=1771541746&width=1280"
        alt="Men's New Arrivals"
        class="w-full h-full object-cover brightness-[0.6]"
      />
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h2 class="font-serif text-2xl leading-7 lg:text-4xl lg:leading-[3rem] mb-2">Men's New Arrivals</h2>
        <p class="font-sans text-sm font-medium leading-5 opacity-90 max-w-md">Warm, refined, and wildly comfortable.</p>
      </div>
    </div>

    <!-- Product Cards — Allbirds: rounded-lg cards with aspect-square images -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      <RouterLink
        v-for="product in mensProducts"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="group bg-natural-white rounded-lg overflow-hidden relative"
      >
        <div class="aspect-square overflow-hidden relative">
          <span class="absolute top-3 left-3 z-10 bg-white text-[9px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full">NEW</span>
          <img :src="product.images[0]" :alt="product.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="p-3.5">
          <h3 class="text-xs font-medium tracking-wider uppercase text-black mb-1 line-clamp-1">{{ product.title }}</h3>
          <p class="text-xs text-light-charcoal mb-2">{{ product.brand }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-black">{{ formatPrice(product.price) }}</span>
            <!-- Allbirds: pill ADD button with border border-black -->
            <span class="border border-black text-black text-[9px] font-medium tracking-wider uppercase pl-3 pr-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <svg class="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              ADD
            </span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>

  <!-- Women's New Arrivals -->
  <section class="mt-12 px-2.5">
    <div class="relative rounded overflow-hidden mb-6 aspect-[3/1] md:aspect-[4/1]">
      <img
        src="https://www.allbirds.com/cdn/shop/files/26Q1_Terralux_Homepage_HowToStyle-01_Desktop-Mobile-2x3.jpg?v=1771356114&width=1280"
        alt="Women's New Arrivals"
        class="w-full h-full object-cover brightness-[0.6]"
      />
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h2 class="font-serif text-2xl leading-7 lg:text-4xl lg:leading-[3rem] mb-2">Women's New Arrivals</h2>
        <p class="font-sans text-sm font-medium leading-5 opacity-90 max-w-md">Fresh styles to step into the season.</p>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      <RouterLink
        v-for="product in womensProducts"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="group bg-natural-white rounded-lg overflow-hidden relative"
      >
        <div class="aspect-square overflow-hidden relative">
          <span class="absolute top-3 left-3 z-10 bg-white text-[9px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full">NEW</span>
          <img :src="product.images[0]" :alt="product.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="p-3.5">
          <h3 class="text-xs font-medium tracking-wider uppercase text-black mb-1 line-clamp-1">{{ product.title }}</h3>
          <p class="text-xs text-light-charcoal mb-2">{{ product.brand }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-black">{{ formatPrice(product.price) }}</span>
            <span class="border border-black text-black text-[9px] font-medium tracking-wider uppercase pl-3 pr-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <svg class="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              ADD
            </span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

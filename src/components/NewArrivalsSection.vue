<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useProducts } from '../composables/useProducts';
import { useCurrency } from '../composables/useCurrency';
import { useCartStore } from '../stores/cart';

const { products, fetchProducts } = useProducts();
const { formatPrice } = useCurrency();
const cartStore = useCartStore();

const handleQuickAdd = (product: typeof products.value[0]) => {
  const firstAvailableSize = product.sizes?.[0];
  if (firstAvailableSize) cartStore.addToCart(product, firstAvailableSize);
};

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

  
  <!-- Men's New Arrivals -->
  <section class="mt-16 px-2.5">

    <div class="relative rounded overflow-hidden mb-6 aspect-[3/1] md:aspect-[4/1]">
      <img
        src="/banners/arrivals-men.jpg"
        alt="Men's New Arrivals"
        loading="lazy"
        class="w-full h-full object-cover brightness-[0.6]"
      />
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h2 class="font-serif text-2xl leading-7 lg:text-4xl lg:leading-[3rem] mb-2">Men's New Arrivals</h2>
        <p class="font-sans text-sm font-medium leading-5 opacity-90 max-w-md">Warm, refined, and wildly comfortable.</p>
      </div>
    </div>


    <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      <RouterLink
        v-for="product in mensProducts"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="group bg-natural-white dark:bg-[#2A2A2A] rounded-lg overflow-hidden relative"
      >
        <div class="aspect-square overflow-hidden relative">
          <span class="absolute top-3 left-3 z-10 bg-white dark:bg-black text-black dark:text-white text-[9px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full">NEW</span>
          <img :src="product.images[0]" :alt="product.title" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="p-3.5">
          <h3 class="text-xs font-medium tracking-wider uppercase text-black dark:text-white mb-1 line-clamp-1">{{ product.title }}</h3>
          <p class="text-xs text-light-charcoal dark:text-gray-400 mb-2">{{ product.brand }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-black dark:text-white">{{ formatPrice(product.price) }}</span>

            <button 
              @click.prevent="handleQuickAdd(product)" 
              class="min-h-10 border border-black dark:border-white text-black dark:text-white text-[9px] font-medium tracking-wider uppercase pl-3 pr-4 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-[opacity,background-color,color] flex items-center gap-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <svg class="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              ADD
            </button>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>

  <!-- Women's New Arrivals -->
  <section class="mt-12 px-2.5">
    <div class="relative rounded overflow-hidden mb-6 aspect-[3/1] md:aspect-[4/1]">
      <img
        src="/banners/arrivals-women.jpg"
        alt="Women's New Arrivals"
        loading="lazy"
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
        class="group bg-natural-white dark:bg-[#2A2A2A] rounded-lg overflow-hidden relative"
      >
        <div class="aspect-square overflow-hidden relative">
          <span class="absolute top-3 left-3 z-10 bg-white dark:bg-black text-black dark:text-white text-[9px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full">NEW</span>
          <img :src="product.images[0]" :alt="product.title" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="p-3.5">
          <h3 class="text-xs font-medium tracking-wider uppercase text-black dark:text-white mb-1 line-clamp-1">{{ product.title }}</h3>
          <p class="text-xs text-light-charcoal dark:text-gray-400 mb-2">{{ product.brand }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-black dark:text-white">{{ formatPrice(product.price) }}</span>
            <button
              type="button"
              @click.prevent="handleQuickAdd(product)"
              class="min-h-10 border border-black dark:border-white text-black dark:text-white text-[9px] font-medium tracking-wider uppercase pl-3 pr-4 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-[opacity,background-color,color] flex items-center gap-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <svg class="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              ADD
            </button>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

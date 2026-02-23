<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const currentIndex = ref(0);

const featuredProducts = [
  {
    name: 'Cruiser Terralux™',
    color: 'Anthracite',
    price: 135,
    image: 'https://www.allbirds.com/cdn/shop/files/A12416_26Q1_Dasher-NZ-Anthracite-Dark-Anthr_PDP_LEFT.png?v=1768948005&width=1024'
  },
  {
    name: 'Varsity Parchment',
    color: 'Parchment',
    price: 120,
    image: 'https://www.allbirds.com/cdn/shop/files/A12270_26Q1_Mens-Varsity-Parchment-Blizzard-Sole_PDP_LEFT.png?v=1765307399&width=1024'
  },
  {
    name: 'Varsity Terralux™',
    color: 'Toasted Coconut',
    price: 145,
    image: 'https://www.allbirds.com/cdn/shop/files/A12317_26Q2_Varsity-Terralux-Toasted-Coconut-Toasted-Coconut-Sole_PDP_LEFT.png?v=1769456542&width=1024'
  }
];

const prev = () => {
  currentIndex.value = currentIndex.value === 0 ? featuredProducts.length - 1 : currentIndex.value - 1;
};
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % featuredProducts.length;
};
</script>

<template>
  <section class="relative mt-24 mb-2.5 overflow-x-clip px-2.5">
    <div class="text-center mb-10">
      <h3 class="font-serif text-[30px] leading-[1.875rem] md:text-[40px] md:leading-10 text-black dark:text-white">
        {{ featuredProducts[currentIndex].name }}
      </h3>
    </div>

    <div class="relative">
      <div class="relative w-full max-w-4xl mx-auto aspect-[4/3] rounded overflow-hidden bg-natural-white dark:bg-[#2A2A2A]">
        <Transition name="fade" mode="out-in">
          <img
            :key="currentIndex"
            :src="featuredProducts[currentIndex].image"
            :alt="featuredProducts[currentIndex].name"
            class="w-full h-full object-contain"
          />
        </Transition>
        <div class="absolute bottom-6 left-6 z-10">
          <p class="text-charcoal dark:text-gray-300 text-sm font-medium mb-1">{{ featuredProducts[currentIndex].color }}</p>
          <p class="text-charcoal dark:text-white text-xl font-medium">${{ featuredProducts[currentIndex].price }}</p>
        </div>
      </div>

      <button
        @click="prev"
        class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 size-10 bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 rounded-full flex items-center justify-center shadow-md transition-colors"
      >
        <svg class="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      </button>
      <button
        @click="next"
        class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 size-10 bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 rounded-full flex items-center justify-center shadow-md transition-colors"
      >
        <svg class="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>

    <div class="flex justify-center gap-3 mt-8">
      <RouterLink
        to="/shop?gender=men"
        class="bg-charcoal dark:bg-white text-white dark:text-black text-xs font-medium tracking-wider uppercase px-6 py-3 rounded-full hover:bg-black dark:hover:bg-gray-200 transition-colors"
      >SHOP MEN</RouterLink>
      <RouterLink
        to="/shop?gender=women"
        class="border border-charcoal dark:border-white text-charcoal dark:text-white text-xs font-medium tracking-wider uppercase px-6 py-3 rounded-full hover:bg-charcoal hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
      >SHOP WOMEN</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

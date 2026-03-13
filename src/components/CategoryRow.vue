<script setup lang="ts">
import { RouterLink } from 'vue-router';

const categories = [
  {
    label: 'New Arrivals',
    to: '/shop',
    image: '/banners/category-01.jpg'
  },
  {
    label: 'Mens',
    to: '/shop?gender=men',
    image: '/banners/category-02.jpg'
  },
  {
    label: 'Womens',
    to: '/shop?gender=women',
    image: '/banners/category-03.jpg'
  },
  {
    label: 'Bestsellers',
    to: '/shop?sort=BEST%20SELLING',
    image: '/banners/category-04.jpg'
  }
];
</script>

<template>
  <section class="px-2.5 mt-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      <RouterLink
        v-for="cat in categories"
        :key="cat.label"
        :to="cat.to"
        class="group relative bg-[#F5F4F0] overflow-hidden aspect-[4/5] md:aspect-[3/4] transition-[border-radius,box-shadow] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-lg hover:rounded-3xl shadow-sm hover:shadow-lg"
      >
        <img
          :src="cat.image"
          :alt="cat.label"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-center translate-y-6 md:translate-y-8 pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-0">
          <span class="text-white text-sm md:text-base font-extrabold tracking-[0.2em] uppercase mb-4 opacity-100 transition-opacity duration-300 drop-shadow-md">
            {{ cat.label }}
          </span>
          <span class="border-2 border-white text-white text-[10px] md:text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 scale-95 group-hover:scale-100">
            SHOP {{ cat.label }}
          </span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

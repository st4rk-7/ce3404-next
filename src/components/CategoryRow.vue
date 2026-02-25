<script setup lang="ts">
import { RouterLink } from 'vue-router';

const categories = [
  {
    label: 'New Arrivals',
    to: '/shop',
    image: 'https://www.allbirds.com/cdn/shop/files/26Q1_VaristyAiry_Site_Homepage_CategoryRow-01_Desktop-Mobile_2x3_01_PDP.jpg?v=1771882088&width=1024'
  },
  {
    label: 'Mens',
    to: '/shop?gender=men',
    image: 'https://www.allbirds.com/cdn/shop/files/26Q1_VaristyAiry_Site_Homepage_CategoryRow-01_Desktop-Mobile_2x3_02_PDP.jpg?v=1771882088&width=1024'
  },
  {
    label: 'Womens',
    to: '/shop?gender=women',
    image: 'https://www.allbirds.com/cdn/shop/files/26Q1_VaristyAiry_Site_Homepage_CategoryRow-01_Desktop-Mobile_2x3_03_PDP_v2.jpg?v=1771882088&width=1024'
  },
  {
    label: 'Bestsellers',
    to: '/shop',
    image: 'https://www.allbirds.com/cdn/shop/files/26Q1_VaristyAiry_Site_Homepage_CategoryRow-01_Desktop-Mobile_2x3_04_PDP.jpg?v=1771882088&width=1024'
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
        class="group relative bg-[#F5F4F0] overflow-hidden aspect-[4/5] md:aspect-[3/4] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-lg hover:rounded-[150px] shadow-sm hover:shadow-lg"
      >
        <img
          :src="cat.image"
          :alt="cat.label"
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

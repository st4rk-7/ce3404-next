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
        class="group relative rounded overflow-hidden aspect-[4/5] md:aspect-[3/4]"
      >
        <img
          :src="cat.image"
          :alt="cat.label"
          class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div class="absolute bottom-6 left-0 right-0 flex justify-center z-10">
          <span class="border border-white text-white text-xs font-medium tracking-wider uppercase px-4 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {{ cat.label }}
          </span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const collections = [
  {
    title: 'Dasher NZ Collection',
    image: 'https://www.allbirds.com/cdn/shop/files/26Q1_Terralux_Site_3xPromo-03_Desktop-Mobile_9x16_929505e4-05ff-4b08-8673-10e93d409023.jpg?v=1771356243&width=1024'
  },
  {
    title: 'Varsity Collection',
    image: 'https://www.allbirds.com/cdn/shop/files/SS26_CH2_Varsity__Site_3xPromo-01_Desktop-Mobile_9x16_UK2.jpg?v=1770626316&width=1024'
  },
  {
    title: 'Terralux™ Collection',
    image: 'https://www.allbirds.com/cdn/shop/files/26Q1_Terralux_Site_3xPromo-01_Desktop-Mobile_9x16_45236641-a417-4da5-b075-1f24d5986a09.jpg?v=1771356244&width=1024'
  }
];
</script>

<template>
  <section class="px-2.5 mt-16 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5">
      <RouterLink
        v-for="col in collections"
        :key="col.title"
        to="/shop"
        class="group relative rounded overflow-hidden aspect-[4/5] md:aspect-[3/4]"
      >
        <img
          :src="col.image"
          :alt="col.title"
          class="absolute inset-0 w-full h-full object-cover brightness-[0.6] group-hover:scale-105 group-hover:brightness-[0.5] transition-all duration-700 ease-out"
        />
        <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-10">
          <h2 class="font-serif text-[1.875rem] select-none md:text-[2.5rem] leading-tight mb-6">
            {{ col.title }}
          </h2>
          <div class="flex gap-3">
            <span class="bg-white/80 backdrop-blur-sm text-black text-xs font-medium tracking-wider uppercase px-4 py-3 rounded-full group-hover:bg-white transition-colors">
              SHOP MEN
            </span>
            <span class="border border-white text-white text-xs font-medium tracking-wider uppercase px-4 py-3 rounded-full group-hover:bg-white/10 transition-colors">
              SHOP WOMEN
            </span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

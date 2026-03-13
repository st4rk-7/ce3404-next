<script setup lang="ts">
import { RouterLink } from 'vue-router';

const collections = [
  {
    title: 'Active Performance',
    image: '/banners/collection-01.jpg',
    type: 'Running Shoes'
  },
  {
    title: 'Everyday Classics',
    image: '/banners/collection-02.jpg',
    type: 'Everyday Sneakers'
  },
  {
    title: 'Premium Leather Edit',
    image: '/banners/collection-03.jpg',
    type: 'High Tops'
  }
];
</script>

<template>
  <section class="px-2.5 mt-16 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5">
      <article
        v-for="col in collections"
        :key="col.title"
        class="group relative rounded overflow-hidden aspect-[4/5] md:aspect-[3/4]"
      >
        <img
          :src="col.image"
          :alt="col.title"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover brightness-[0.6] group-hover:scale-105 group-hover:brightness-[0.5] transition-[transform,filter] duration-700 ease-out"
        />
        <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-10">
          <h2 class="font-serif text-[1.875rem] select-none md:text-[2.5rem] leading-tight mb-6">
            {{ col.title }}
          </h2>
          <div class="flex gap-3">
            <RouterLink :to="{ path: '/shop', query: { gender: 'men', type: col.type } }" class="min-h-10 inline-flex items-center bg-white/80 backdrop-blur-sm text-black text-xs font-medium tracking-wider uppercase px-4 rounded-full group-hover:bg-white transition-colors">
              SHOP MEN
            </RouterLink>
            <RouterLink :to="{ path: '/shop', query: { gender: 'women', type: col.type } }" class="min-h-10 inline-flex items-center border border-white text-white text-xs font-medium tracking-wider uppercase px-4 rounded-full group-hover:bg-white/10 transition-colors">
              SHOP WOMEN
            </RouterLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

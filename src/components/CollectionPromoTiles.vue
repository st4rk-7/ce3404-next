<script setup lang="ts">
import { RouterLink } from 'vue-router';

const collections = [
  {
    title: 'Dasher NZ Collection',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Varsity Collection',
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Terralux™ Collection',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
  }
];
</script>

<template>
  <!-- Allbirds: 3x-promo-tiles section -->
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
          <!-- Allbirds: font-serif text-[1.875rem] select-none md:text-[2.5rem] -->
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

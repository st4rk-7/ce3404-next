<script setup lang="ts">
import { RouterLink } from 'vue-router';

const categories = [
  {
    label: 'New Arrivals',
    to: '/shop',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    label: 'Mens',
    to: '/shop?gender=men',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=600&q=80'
  },
  {
    label: 'Womens',
    to: '/shop?gender=women',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80'
  },
  {
    label: 'Bestsellers',
    to: '/shop',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80'
  }
];
</script>

<template>
  <!-- Allbirds: category row section, gap-2.5, px-2.5 -->
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
        <!-- Allbirds: category-row-item-title btn btn-outline-white pointer-events-none -->
        <div class="absolute bottom-6 left-0 right-0 flex justify-center z-10">
          <span class="border border-white text-white text-xs font-medium tracking-wider uppercase px-4 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {{ cat.label }}
          </span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

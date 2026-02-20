<template>
  <!-- Allbirds: Follow The Flock section, font-mono text-xs tracking-wider uppercase -->
  <section class="px-5 md:px-10 pt-16 pb-10 bg-white">
    <h3 class="font-mono text-xs tracking-wider uppercase text-center mb-8 text-black max-md:text-center">
      Follow The Flock
    </h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <a
        v-for="(img, i) in images"
        :key="i"
        href="#"
        class="group relative aspect-square overflow-hidden rounded-sm"
      >
        <img
          :src="img"
          alt="Social post"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <svg class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
const images = [
  'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=400&q=80'
];
</script>

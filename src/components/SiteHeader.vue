<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// Placeholder states for interactivity
const isSearchOpen = ref(false);
const cartCount = ref(0);
</script>

<template>
  <header class="w-full bg-white text-gray-900 font-sans border-b border-gray-200">
    <!-- Top Bar -->
    <div class="bg-[#efb012] text-xs font-bold text-center py-2 tracking-widest uppercase">
      Free Shipping Worldwide
    </div>

    <!-- Main Navigation -->
    <div class="container mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
      
      <!-- Left Nav: Desktop -->
      <nav class="hidden md:flex space-x-8 text-xs font-bold tracking-widest">
        <RouterLink to="/" class="hover:text-gray-600 transition-colors">MEN'S</RouterLink>
        <RouterLink to="/" class="hover:text-gray-600 transition-colors">WOMEN'S</RouterLink>
        <RouterLink to="/" class="hover:text-gray-600 transition-colors">ABOUT</RouterLink>
      </nav>

      <!-- Mobile Menu Button (Hamburger) -->
      <button class="md:hidden p-2 -ml-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <!-- Center Logo -->
      <div class="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold tracking-tighter">
        <RouterLink to="/" class="flex flex-col items-center leading-none">
          <span>LEATHER C|R|OWN</span>
        </RouterLink>
      </div>

      <!-- Right Nav: Icons -->
      <div class="flex items-center space-x-4 md:space-x-6">
        <!-- Country/Currency Selector (Mock) -->
        <div class="hidden md:flex items-center space-x-1 text-xs cursor-pointer">
            <span class="text-base">🇮🇹</span>
            <span class="font-bold">EUR €</span>
        </div>

        <!-- User Icon -->
        <button class="p-1 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
        </button>

        <!-- Search Icon -->
        <button class="p-1 hover:text-gray-600 transition-colors hidden sm:block">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </button>

        <!-- Cart Icon -->
        <button class="p-1 hover:text-gray-600 transition-colors relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {{ cartCount }}
            </span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Optional: Add custom font logic here or in global css */
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  // { name: 'Login', path: '/login' }, // Will be added in Phase 5
];

const isMobileMenuOpen = ref(false);
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-50 top-0 start-0">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

      <!-- Brand Logo -->
      <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse hover:opacity-80 transition">
        <span class="self-center text-2xl font-bold whitespace-nowrap text-indigo-600 dark:text-white">ShopVue</span>
      </router-link>

      <!-- Mobile Menu Button (Hamburger) -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>

      <!-- Nav Links -->
      <div :class="[isMobileMenuOpen ? 'block' : 'hidden', 'w-full md:block md:w-auto']">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700 items-center">
          <li v-for="item in navItems" :key="item.name">
            <router-link 
              :to="item.path" 
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-indigo-700 md:p-0 dark:text-white md:dark:hover:text-indigo-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              active-class="text-indigo-700 dark:text-indigo-500"
            >
              {{ item.name }}
            </router-link>
          </li>
          <!-- Cart Count -->
          <li class="mt-2 md:mt-0">
             <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition flex items-center gap-2">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
               Cart ({{ cartStore.cartCount }})
             </button>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

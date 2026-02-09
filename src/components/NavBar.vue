<script setup lang="ts">
import { ref } from 'vue';

// We will connect this to a Store later, strict typing starts now
interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Login', path: '/login' }, // Bonus feature
];

// State for mobile menu toggle
const isMobileMenuOpen = ref(false);
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-50 top-0 start-0">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

      <!-- Brand Logo -->
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse hover:opacity-80 transition">
        <span class="self-center text-2xl font-bold whitespace-nowrap text-blue-600 dark:text-white">ShopVue</span>
      </a>

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
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
          <li v-for="item in navItems" :key="item.name">
            <a :href="item.path" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              {{ item.name }}
            </a>
          </li>
          <!-- Cart placeholder -->
          <li class="mt-2 md:mt-0">
             <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm transition">
               Cart (0)
             </button>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

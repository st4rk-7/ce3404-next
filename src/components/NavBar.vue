<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useSearchStore } from '../stores/search';

const cartStore = useCartStore();
const searchStore = useSearchStore();
const isMobileMenuOpen = ref(false);

import { useCurrency } from '../composables/useCurrency';
const { currency, setCurrency } = useCurrency();

const toggleCurrency = () => {
    setCurrency(currency.value === 'LKR' ? 'EUR' : 'LKR');
};

import { useTheme } from '../composables/useTheme';
const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <div class="font-sans antialiased text-brand-blue dark:text-gray-100">
    <!-- Announcement Bar -->
    <div class="bg-brand-red text-white text-[10px] md:text-xs font-bold text-center py-1.5 md:py-2 tracking-widest uppercase relative z-50">
      FREE SHIPPING WORLDWIDE
    </div>

    <!-- Main Header -->
    <header class="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 h-[52px] md:h-[57px] flex items-center transition-all duration-300">
      <div class="container mx-auto px-4 md:px-8 h-full flex justify-between items-center bg-white dark:bg-gray-900 relative">
        
        <!-- Left: Navigation (Desktop) -->
        <nav v-if="!searchStore.isSearchOpen" class="hidden md:flex space-x-6 text-[11px] font-bold tracking-[0.2em] text-brand-blue">
          <RouterLink to="/?gender=men" class="hover:text-brand-red transition-colors">MEN'S</RouterLink>
          <RouterLink to="/?gender=women" class="hover:text-brand-red transition-colors">WOMEN'S</RouterLink>
          <RouterLink to="/" class="hover:text-brand-red transition-colors">ABOUT</RouterLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button v-if="!searchStore.isSearchOpen" @click="isMobileMenuOpen = true" class="md:hidden p-2 -ml-2 text-brand-blue dark:text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <!-- Center: Logo -->
        <div v-if="!searchStore.isSearchOpen" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <RouterLink to="/" class="block text-center group">
             <h1 class="text-xl md:text-2xl font-bold tracking-[0.15em] leading-none whitespace-nowrap text-brand-blue dark:text-white">
               NEXT
             </h1>
          </RouterLink>
        </div>

        <!-- Right: Actions -->
        <div v-if="!searchStore.isSearchOpen" class="flex items-center space-x-3 md:space-x-6 text-brand-blue dark:text-white">
          <!-- Country/Currency Selector -->
          <div 
            @click="toggleCurrency"
            class="hidden md:flex items-center space-x-1 text-[11px] font-bold cursor-pointer tracking-widest hover:text-brand-red"
          >
             <span v-if="currency === 'LKR'">🇱🇰 LKR Rs</span>
             <span v-else>🇪🇺 EUR €</span>
             <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>

          <!-- Theme Toggle -->
          <button @click="toggleTheme" class="p-1 hover:text-gray-600 transition-colors">
            <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>

          <!-- Account -->
          <RouterLink to="/login" class="hidden md:block p-1 hover:text-gray-600 transition-colors text-[11px] font-bold tracking-widest uppercase">
            ACCOUNT
          </RouterLink>
          <RouterLink to="/login" class="md:hidden p-1 hover:text-gray-600">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </RouterLink>

          <!-- Search -->
          <button @click="searchStore.toggleSearch()" class="p-1 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>

          <!-- Cart -->
          <button class="p-1 hover:text-gray-600 transition-colors relative flex items-center">
             <span class="hidden md:block text-[11px] font-bold tracking-widest mr-2">CART</span>
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
             </svg>
             <span v-if="cartStore.cartCount > 0" class="absolute -top-1 -right-1 md:top-[-4px] md:right-[-8px] bg-brand-red text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                 {{ cartStore.cartCount }}
             </span>
          </button>
        </div>

        <!-- Search Overlay -->
        <div v-if="searchStore.isSearchOpen" class="absolute inset-0 bg-white dark:bg-gray-900 z-50 flex items-center px-4 md:px-8 border-b border-gray-100 dark:border-gray-800">
            <svg class="w-5 h-5 text-gray-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input 
              v-model="searchStore.query"
              type="text" 
              placeholder="SEARCH..." 
              class="flex-grow text-sm font-bold placeholder-gray-400 outline-none text-brand-blue dark:text-white uppercase tracking-widest bg-transparent font-sans"
              autofocus
            >
            <button @click="searchStore.toggleSearch()" class="p-2 text-gray-400 hover:text-brand-red ml-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

      </div>
    </header>

    <!-- Mobile Slide-Out Navigation Drawer -->
    <Teleport to="body">
      <Transition name="mobile-menu">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true">
          <!-- Overlay -->
          <div class="fixed inset-0 bg-black/50 transition-opacity" @click="isMobileMenuOpen = false"></div>
          
          <!-- Drawer Panel (slides from left) -->
          <div class="fixed inset-y-0 left-0 w-[280px] max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl flex flex-col overflow-y-auto transform transition-transform duration-300">
            <!-- Drawer Header -->
            <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <span class="text-lg font-bold tracking-[0.15em] text-brand-blue dark:text-white">NEXT</span>
              <button @click="isMobileMenuOpen = false" class="p-1 text-gray-400 hover:text-black dark:hover:text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <!-- Navigation Links -->
            <nav class="flex-grow px-5 py-6 space-y-1">
              <RouterLink 
                to="/?gender=men" 
                @click="isMobileMenuOpen = false"
                class="block py-3 text-sm font-bold tracking-[0.2em] uppercase text-brand-blue dark:text-white hover:text-brand-red transition-colors border-b border-gray-100 dark:border-gray-800"
              >MEN'S</RouterLink>
              <RouterLink 
                to="/?gender=women" 
                @click="isMobileMenuOpen = false"
                class="block py-3 text-sm font-bold tracking-[0.2em] uppercase text-brand-blue dark:text-white hover:text-brand-red transition-colors border-b border-gray-100 dark:border-gray-800"
              >WOMEN'S</RouterLink>
              <RouterLink 
                to="/" 
                @click="isMobileMenuOpen = false"
                class="block py-3 text-sm font-bold tracking-[0.2em] uppercase text-brand-blue dark:text-white hover:text-brand-red transition-colors border-b border-gray-100 dark:border-gray-800"
              >ABOUT</RouterLink>
              <RouterLink 
                to="/login" 
                @click="isMobileMenuOpen = false"
                class="block py-3 text-sm font-bold tracking-[0.2em] uppercase text-brand-blue dark:text-white hover:text-brand-red transition-colors border-b border-gray-100 dark:border-gray-800"
              >ACCOUNT</RouterLink>
            </nav>

            <!-- Bottom: Currency Selector -->
            <div class="mt-auto px-5 py-5 border-t border-gray-100 dark:border-gray-800">
              <div 
                @click="toggleCurrency"
                class="flex items-center justify-between text-xs font-bold cursor-pointer tracking-widest text-brand-blue dark:text-white hover:text-brand-red py-2"
              >
                <span v-if="currency === 'LKR'">🇱🇰 LKR Rs</span>
                <span v-else>🇪🇺 EUR €</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* Ensure font is correct */
:deep(.font-sans) {
  font-family: "Anonymous Pro", monospace;
}

/* Mobile menu transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
</style>

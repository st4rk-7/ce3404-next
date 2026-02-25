<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useSearchStore } from '../stores/search';
import { useAuthStore } from '../stores/auth';
import CartDrawer from './CartDrawer.vue';

const cartStore = useCartStore();
const searchStore = useSearchStore();
const authStore = useAuthStore();
const router = useRouter();
const isMobileMenuOpen = ref(false);


import { useTheme } from '../composables/useTheme';
const { isDark, toggleTheme } = useTheme();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<template>
  <div class="font-sans antialiased text-brand-blue dark:text-gray-100">
    <!-- Announcement Bar -->
    <div class="bg-charcoal text-white text-[10px] md:text-sm font-bold text-center py-2 tracking-wide relative z-50">
      Free Shipping on Orders over $75. Easy Returns.
    </div>

    <!-- Main Header -->
    <div class="sticky top-0 z-40 w-full px-3 md:px-5 pt-4 pb-2 pointer-events-none transition-all duration-300">
      <header class="w-full mx-auto bg-white dark:bg-[#1a1a1a] dark:border dark:border-gray-800 rounded-[24px] md:rounded-[32px] h-[60px] md:h-[64px] flex items-center shadow-md relative pointer-events-auto">
        <div class="w-full px-6 md:px-10 h-full flex justify-between items-center group/header">
        
        <!-- Left: Logo -->
        <div class="flex-shrink-0 flex items-center">
          <!-- Mobile Menu Button -->
          <button v-if="!searchStore.isSearchOpen" @click="isMobileMenuOpen = true" class="md:hidden p-2 -ml-2 text-black dark:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          
          <RouterLink to="/" class="block text-black dark:text-white hover:opacity-70 transition-opacity ml-2 md:ml-0">
             <span class="text-3xl font-extrabold tracking-widest uppercase">NEXT</span>
          </RouterLink>
        </div>

        <!-- Center: Navigation (Desktop) -->
        <nav v-if="!searchStore.isSearchOpen" class="hidden md:flex space-x-6 lg:space-x-8 text-[13px] font-extrabold tracking-widest text-black dark:text-white items-center h-full absolute left-1/2 transform -translate-x-1/2">
          <div class="h-full flex items-center group/men">
            <RouterLink to="/shop?gender=men" class="hover:border-b-2 hover:border-black dark:hover:border-white h-full flex items-center px-1 border-b-2 border-transparent transition-all">MEN</RouterLink>
            
            <!-- Mega Menu Dropdown -->
            <div class="absolute top-[70px] left-0 w-full bg-white dark:bg-charcoal dark:border-t dark:border-white/10 shadow-xl flex z-50 opacity-0 invisible group-hover/men:opacity-100 group-hover/men:visible transition-all duration-300 ease-in-out">
              <div class="w-full max-w-[1240px] mx-auto flex p-10 min-h-[400px]">
                 <!-- Left Column links -->
                 <div class="w-1/4 space-y-6">
                    <div>
                      <h4 class="text-xs font-bold mb-4 uppercase tracking-wider dark:text-white">Shoes</h4>
                      <ul class="space-y-3 text-sm font-normal text-gray-700 dark:text-gray-300">
                        <li><a href="#" class="hover:underline">Shop All</a></li>
                        <li><a href="#" class="hover:underline">Sneakers</a></li>
                        <li><a href="#" class="hover:underline">Slip-Ons</a></li>
                        <li><a href="#" class="hover:underline">Active Shoes</a></li>
                      </ul>
                    </div>
                 </div>
                 <!-- Right Content Images (Placeholder) -->
                 <div class="w-3/4 flex gap-4">
                    <div class="flex-1 bg-gray-100 rounded-xl p-6 relative overflow-hidden group/card cursor-pointer">
                       <span class="relative z-10 font-bold text-white text-lg">NEW ARRIVALS</span>
                       <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="absolute inset-0 w-full h-full object-cover brightness-75 group-hover/card:scale-105 transition-transform duration-500" alt="New Arrivals">
                    </div>
                    <div class="flex-1 bg-gray-100 rounded-xl p-6 relative overflow-hidden group/card cursor-pointer">
                       <span class="relative z-10 font-bold text-white text-lg">BESTSELLERS</span>
                       <img src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" class="absolute inset-0 w-full h-full object-cover brightness-75 group-hover/card:scale-105 transition-transform duration-500" alt="Bestsellers">
                    </div>
                 </div>
              </div>
            </div>
          </div>
          <div class="h-full flex items-center">
            <RouterLink to="/shop?gender=women" class="hover:border-b-2 hover:border-black dark:hover:border-white h-full flex items-center px-1 border-b-2 border-transparent transition-all">WOMEN</RouterLink>
          </div>
          <div class="h-full flex items-center">
            <RouterLink to="/shop?sale=true" class="hover:border-b-2 hover:border-black dark:hover:border-white h-full flex items-center px-1 border-b-2 border-transparent transition-all text-brand-red">SALE</RouterLink>
          </div>
        </nav>

        <!-- Right: Actions -->
        <div v-if="!searchStore.isSearchOpen" class="flex items-center space-x-4 md:space-x-5 lg:space-x-6 text-black dark:text-white">
          <div class="hidden md:flex items-center space-x-6 mr-4 lg:mr-8">
            <RouterLink to="/" class="text-xs font-bold hover:text-gray-600 transition-colors">About</RouterLink>
            <RouterLink to="/" class="text-xs font-bold hover:text-gray-600 transition-colors">ReRun</RouterLink>
          </div>

          <!-- Search Icon -->
          <button @click="searchStore.toggleSearch" class="hidden md:flex p-1 hover:text-gray-600 transition-colors focus:outline-none" aria-label="Search">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          <!-- Theme Toggle -->
          <button @click="toggleTheme" class="p-1 hover:text-gray-600 transition-colors focus:outline-none" aria-label="Toggle Dark Mode">
            <svg v-if="isDark" class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
               <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>

          <!-- Account (Auth-aware) -->
          <template v-if="authStore.isAuthenticated && authStore.user">
            <div class="relative group/account">
              <button class="p-1 hover:text-gray-600 transition-colors flex items-center focus:outline-none cursor-pointer">
                <svg class="w-[26px] h-[26px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </button>
              <div class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-charcoal border border-gray-100 dark:border-gray-700 shadow-lg rounded-md p-2 hidden group-hover/account:block">
                 <div class="px-4 py-2 text-sm font-bold border-b border-gray-100 dark:border-gray-700">{{ authStore.user.firstName }}</div>
                 <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 text-red-600">Logout</button>
              </div>
            </div>
          </template>
          <template v-else>
            <RouterLink to="/login" class="p-1 hover:text-gray-600 transition-colors tooltip flex items-center focus:outline-none" aria-label="Account">
               <svg class="w-[26px] h-[26px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
               </svg>
            </RouterLink>
          </template>

          <RouterLink to="/help" class="hidden md:block p-1 hover:text-gray-600 transition-colors focus:outline-none" aria-label="Help">
            <svg class="w-[26px] h-[26px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </RouterLink>

          <!-- Cart Toggle -->
          <button @click="cartStore.openDrawer()" class="relative p-1 hover:text-gray-600 transition-colors focus:outline-none flex items-center" aria-label="Cart">
            <div class="relative">
              <svg class="w-[28px] h-[28px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <span v-if="cartStore.totalItems > 0" class="absolute -bottom-1 -right-2 bg-[#212121] dark:bg-white text-white dark:text-black text-[10px] font-bold flex items-center justify-center w-[20px] h-[20px] rounded-full border-2 border-white dark:border-[#1a1a1a]">
                {{ cartStore.totalItems }}
              </span>
            </div>
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
    </div>

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
                to="/shop?gender=men" 
                @click="isMobileMenuOpen = false"
                class="block py-3 text-sm font-bold tracking-[0.2em] uppercase text-brand-blue dark:text-white hover:text-brand-red transition-colors border-b border-gray-100 dark:border-gray-800"
              >MEN'S</RouterLink>
              <RouterLink 
                to="/shop?gender=women" 
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
                class="flex items-center justify-between text-xs font-bold cursor-default tracking-widest text-brand-blue dark:text-white py-2"
              >
                <span>🇱🇰 LKR Rs</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Cart Drawer -->
    <CartDrawer />
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

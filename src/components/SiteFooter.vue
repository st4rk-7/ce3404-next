<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const email = ref('');
const subscribed = ref(false);

const subscribe = () => {
    email.value = '';
    subscribed.value = true;
};
</script>

<template>
  <footer class="bg-charcoal text-white pt-16 pb-12 w-full mt-20">
    <div class="max-w-[1240px] mx-auto px-6 md:px-10">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        <!-- Left Section: Newsletter -->
        <div class="lg:col-span-4 space-y-6">
            <h3 class="text-xs font-bold uppercase tracking-widest font-sans">Subscribe to our emails</h3>
            
            <form @submit.prevent="subscribe" class="w-full relative">
                <input 
                    v-model="email"
                    type="email" 
                    placeholder="Email Address" 
                    required
                    class="w-full bg-white text-black dark:bg-[#1a1a1a] dark:text-white dark:border dark:border-gray-700 rounded-full py-3 md:py-4 pl-6 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                />
                <button 
                    type="submit" 
                    class="absolute text-[10px] md:text-xs right-2 top-2 bottom-2 font-bold uppercase tracking-wider text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300 px-4 transition-colors"
                >
                    Sign Up
                </button>
            </form>
            <p v-if="subscribed" role="status" class="text-xs text-gray-300 text-pretty">Thanks! This portfolio demo does not send or store your email.</p>
        </div>

        <div class="hidden lg:block lg:col-span-2"></div>

        <!-- Right Section: Links (3 Columns) -->
        <div class="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            
            <!-- HELP -->
            <div class="space-y-4">
                <h3 class="text-xs font-bold uppercase tracking-widest font-sans">Help</h3>
                <ul class="space-y-3 font-normal text-gray-300">
                    <li><a href="tel:94712121201" class="hover:text-white transition-colors">94712121201</a></li>
                    <li><a href="mailto:help@starz.com" class="hover:text-white transition-colors">help@starz.com</a></li>
                    <li><span class="text-gray-400">30-day returns</span></li>
                    <li><span class="text-gray-400">Customer support</span></li>
                </ul>
            </div>

            <!-- SHOP -->
            <div class="space-y-4">
                <h3 class="text-xs font-bold uppercase tracking-widest font-sans">Shop</h3>
                <ul class="space-y-3 font-normal text-gray-300">
                    <li><RouterLink to="/shop?gender=men" class="hover:text-white transition-colors">Men's Shoes</RouterLink></li>
                    <li><RouterLink to="/shop?gender=women" class="hover:text-white transition-colors">Women's Shoes</RouterLink></li>
                </ul>
            </div>

            <!-- COMPANY -->
            <div class="space-y-4">
                <h3 class="text-xs font-bold uppercase tracking-widest font-sans">Company</h3>
                <ul class="space-y-3 font-normal text-gray-300">
                    <li><span class="text-gray-300">hapugala</span></li>
                </ul>
            </div>

        </div>
      </div>
      
      <!-- Bottom Footer: Socials and Small Print -->
      <div class="mt-16 pt-8 text-[10px] md:text-xs">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              
              <p class="text-gray-400 text-pretty">A portfolio storefront built to demonstrate a complete shopping flow.</p>

              <!-- Badges / Extras (Placeholder for B Corp, etc) -->
              <div class="flex gap-4">
                  <p class="text-gray-400">&copy; 2026 Starz by shewon ss 5893. All Rights Reserved.</p>
              </div>
          </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>
/* Scoped styles if needed for specific footer tweaks */
</style>

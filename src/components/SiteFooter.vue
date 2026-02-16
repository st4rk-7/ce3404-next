<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');

const subscribe = () => {
    // Implement subscription logic
    console.log('Subscribe:', email.value);
    email.value = '';
};
</script>

<template>
  <footer class="bg-white dark:bg-gray-900 text-black dark:text-white pt-10 md:pt-16 pb-8 border-t border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4 md:px-8">
      
      <!-- Logo in Footer -->
      <div class="mb-12">
        <h2 class="text-2xl md:text-3xl font-bold tracking-widest">NEXT</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        <!-- Newsletter Section -->
        <div class="md:col-span-5 space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Newsletter</h3>
            <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Subscribe to receive special offers and up-to-date NEXT news.
            </p>
            
            <form @submit.prevent="subscribe" class="space-y-4 max-w-sm">
                <div class="flex flex-col space-y-4">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        class="w-full border-b border-black dark:border-white py-2 px-0 text-sm focus:outline-none focus:border-gray-500 placeholder-gray-400 bg-transparent rounded-none text-black dark:text-white"
                    />
                     <input 
                        v-model="email"
                        type="email" 
                        placeholder="Email" 
                        required
                        class="w-full border-b border-black dark:border-white py-2 px-0 text-sm focus:outline-none focus:border-gray-500 placeholder-gray-400 bg-transparent rounded-none text-black dark:text-white"
                    />
                </div>
                <button 
                    type="submit" 
                    class="bg-black text-white dark:bg-white dark:text-black text-xs font-bold tracking-widest uppercase py-3 px-8 w-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                    Join
                </button>
            </form>
            <p class="text-[10px] text-gray-400 mt-2">
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>
        </div>

        <!-- Spacer Column -->
        <div class="hidden md:block md:col-span-1"></div>

        <!-- Links Column 1: Customer Care -->
        <div class="md:col-span-3 space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Customer Care</h3>
            <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400 font-mono">
                <li><a href="#" class="hover:underline">Terms of Service</a></li>
                <li><a href="#" class="hover:underline">Refund Policy</a></li>
                <li><a href="#" class="hover:underline">Shipping Policy</a></li>
                <li><a href="#" class="hover:underline">Privacy Policy</a></li>
                <li><a href="mailto:info@next-mimic.com" class="hover:underline">info@next-mimic.com</a></li>
            </ul>
        </div>

        <!-- Links Column 2: Contact Us -->
        <div class="md:col-span-3 space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Contact Us</h3>
             <div class="text-sm text-gray-600 dark:text-gray-400 font-mono space-y-1">
                 <p>Fashion District</p>
                 <p>123 High Street</p>
                 <p>Milan</p>
                 <p>Italy</p>
                 <p>Email: <a href="mailto:info@next-mimic.com" class="hover:underline">info@next-mimic.com</a></p>
            </div>
            
            <!-- Social Icons -->
             <div class="flex space-x-4 pt-4">
                <!-- Instagram (Example) -->
                <a href="#" class="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
                    <span class="sr-only">Instagram</span>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
             </div>
        </div>
      </div>
      
      <!-- Bottom Footer -->
       <div class="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
           <div>
               <div class="flex items-center space-x-2 border border-gray-300 px-2 py-1 inline-flex">
                   <span>🇱🇰</span>
                   <span>LKR Rs</span>
               </div>
           </div>
           
               &copy; NEXT 2026 shewon ss
       </div>

    </div>
  </footer>
</template>

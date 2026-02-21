<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div class="min-h-screen bg-natural-white dark:bg-charcoal text-black dark:text-natural-white font-sans flex flex-col transition-colors duration-200">
    <NavBar />

    <main class="flex-grow pt-0">
       <router-view />
    </main>

    <SiteFooter />
  </div>
</template>

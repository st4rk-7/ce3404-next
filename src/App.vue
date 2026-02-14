<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
    <NavBar />

    <main class="flex-grow pt-0">
       <router-view />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
    <NavBar />

    <main class="pt-24 px-4 max-w-7xl mx-auto pb-12">
       <router-view />
    </main>
  </div>
</template>

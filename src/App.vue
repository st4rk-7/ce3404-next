<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
    <NavBar />

    <!-- Padding top added so content is not hidden behind fixed navbar -->
    <main class="pt-20 px-4 max-w-7xl mx-auto">
       <div class="text-center py-10">
          <h1 class="text-3xl font-bold mb-4">CS3404 Shop</h1>
          <p class="text-gray-600 dark:text-gray-400">Loading components...</p>
       </div>

       <!-- We will add the Grid here next -->

    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import SiteFooter from './components/SiteFooter.vue';

const route = useRoute();
const showSiteChrome = computed(() => !route.meta.standalone);
</script>

<template>
  <div class="min-h-screen bg-natural-white dark:bg-charcoal text-black dark:text-natural-white font-sans flex flex-col transition-colors duration-200">
    <NavBar v-if="showSiteChrome" />

    <main class="flex-grow pt-0">
       <router-view />
    </main>

    <SiteFooter v-if="showSiteChrome" />
  </div>
</template>

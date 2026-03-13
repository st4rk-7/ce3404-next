<script setup lang="ts">
import { onMounted } from 'vue';
import HeroCarousel from '../components/HeroCarousel.vue';
import CategoryRow from '../components/CategoryRow.vue';
import FeaturedCarousel from '../components/FeaturedCarousel.vue';
import NewArrivalsSection from '../components/NewArrivalsSection.vue';
import CollectionPromoTiles from '../components/CollectionPromoTiles.vue';
import { useProducts } from '../composables/useProducts';

const { fetchProducts } = useProducts();

onMounted(async () => {
  await fetchProducts();
});
</script>

<template>
  <div class="min-h-screen bg-natural-white dark:bg-charcoal font-sans text-black dark:text-white transition-colors duration-200">
    <!-- 1. Hero Carousel -->
    <HeroCarousel />

    <!-- 2. Category Row -->
    <CategoryRow />

    <!-- 3. Featured Product Carousel -->
    <FeaturedCarousel />

    <!-- 4. New Arrivals (Men's + Women's) -->
    <NewArrivalsSection />

    <!-- 5. Collection Promo Tiles -->
    <CollectionPromoTiles />
  </div>
</template>

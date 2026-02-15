<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute
import SidebarFilter from '../components/SidebarFilter.vue';
import ProductGrid from '../components/ProductGrid.vue';
import { useProducts } from '../composables/useProducts';
import { useSearchStore } from '../stores/search';

const { products, isLoading, fetchProducts } = useProducts();
const searchStore = useSearchStore();
const route = useRoute(); // Initialize route

// Filter Logic: Search + Category
const filteredProducts = computed(() => {
    let result = products.value;

    // Filter by Gender (Category)
    const gender = route.query.gender;
    if (gender === 'men') {
        result = result.filter(p => p.category === 'mens-shoes');
    } else if (gender === 'women') {
        result = result.filter(p => p.category === 'womens-shoes');
    }

    // Filter by Tag (Edit Section)
    const tags = route.query.tag;
    if (tags) {
        const tagArray = Array.isArray(tags) ? (tags as string[]) : [tags as string];
        // Filter: Product must have at least one of the selected tags (OR logic)
        result = result.filter(p => p.tags && tagArray.some(t => p.tags!.includes(t)));
    }

    // Filter by Price
    const minPrice = Number(route.query.minPrice);
    const maxPrice = Number(route.query.maxPrice);
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);
    }

    if (searchStore.query) {
        const query = searchStore.query.toLowerCase();
        result = result.filter(p => p.title.toLowerCase().includes(query));
    }

    return result;
});

onMounted(async () => {
    await fetchProducts();
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 flex flex-col font-mono text-gray-800 dark:text-gray-100">
    
    <main class="flex-grow pt-24 md:pt-32">
        <div class="container mx-auto px-4 md:px-8 mb-20 max-w-[1600px]">
            
            <!-- Layout: Sidebar + Grid -->
            <div class="flex flex-col md:flex-row gap-8">
                
                <!-- Left Sidebar (Filters) - 18% width roughly -->
                <aside class="w-full md:w-1/5 lg:w-[18%] flex-shrink-0">
                    <SidebarFilter />
                </aside>

                <!-- Right Content (Grid) -->
                <div class="flex-grow">
                    <ProductGrid :products="filteredProducts" :is-loading="isLoading" />
                </div>

            </div>
        </div>
    </main>
  </div>
</template>

<style scoped>
/* Font override if not globally set yet */
:deep(.font-mono) {
    font-family: "Anonymous Pro", monospace;
}
</style>

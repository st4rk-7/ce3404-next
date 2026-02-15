<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute
import SidebarFilter from '../components/SidebarFilter.vue';
import ProductGrid from '../components/ProductGrid.vue';
import { useProducts } from '../composables/useProducts';
import { useSearchStore } from '../stores/search';

const { products, isLoading, fetchProducts } = useProducts();
const searchStore = useSearchStore();
const route = useRoute(); // Initialize route
const isMobileMenuOpen = ref(false);

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
            
            <!-- Mobile Filter Button & Sort (Sticky or just top) -->
            <div class="md:hidden flex justify-between items-center mb-6 pt-4 sticky top-[57px] bg-white dark:bg-gray-900 z-30 py-2">
                 <button 
                    @click="isMobileMenuOpen = true"
                    class="flex items-center gap-2 uppercase font-bold tracking-widest text-xs border border-gray-300 dark:border-gray-700 px-6 py-3 w-1/2 justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    Filter
                </button>
                 <!-- Mock Sort Button for visual balance -->
                 <button class="flex items-center gap-2 uppercase font-bold tracking-widest text-xs border border-gray-300 dark:border-gray-700 px-6 py-3 w-1/2 justify-center border-l-0 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                    Sort
                </button>
            </div>

            <!-- Mobile Filter Drawer (Slide-over) -->
            <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 flex md:hidden" role="dialog" aria-modal="true">
                <!-- Overlay -->
                <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="isMobileMenuOpen = false"></div>
                
                <!-- Drawer Panel -->
                <div class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-gray-900 py-4 pb-12 shadow-xl">
                    <div class="flex items-center justify-between px-4 mb-4">
                        <h2 class="text-lg font-bold uppercase tracking-widest">Filters</h2>
                        <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400" @click="isMobileMenuOpen = false">
                            <span class="sr-only">Close menu</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Filter Content form Sidebar component -->
                    <div class="px-4">
                        <SidebarFilter />
                    </div>
                    
                     <div class="mt-auto px-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <button @click="isMobileMenuOpen = false" class="w-full bg-black text-white dark:bg-white dark:text-black py-4 uppercase font-bold tracking-widest text-xs">
                            Show Results
                        </button>
                    </div>
                </div>
            </div>

            <!-- Layout: Sidebar + Grid -->
            <div class="flex flex-col md:flex-row gap-8">
                
                <!-- Left Sidebar (Filters) - Desktop Only -->
                <aside class="hidden md:block w-full md:w-1/5 lg:w-[18%] flex-shrink-0">
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

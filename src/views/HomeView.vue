<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import ProductGrid from '../components/ProductGrid.vue';
import SidebarFilter from '../components/SidebarFilter.vue'; // Will refactor this inside the new filter drawer soon
import { useProducts } from '../composables/useProducts';
import { useSearchStore } from '../stores/search';

const { products, isLoading, fetchProducts } = useProducts();
const searchStore = useSearchStore();
const route = useRoute();
const isFilterOpen = ref(false);

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
  <div class="min-h-screen bg-natural-white dark:bg-charcoal flex flex-col font-sans text-black dark:text-natural-white transition-colors duration-200">
    
    <main class="flex-grow pt-10 md:pt-16">
        <div class="w-full mx-auto px-4 md:px-8 lg:px-12 mb-20">
            
            <!-- Page Header: Title & Subtitle -->
            <div class="text-center mb-10 max-w-2xl mx-auto">
                <h1 class="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-black dark:text-white">Men's Sale</h1>
                <p class="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Stock up and shop these last-chance styles and colors before they're gone for good.
                </p>
            </div>

            <!-- New Filter/Sort Bar (Allbirds style) -->
            <div class="bg-[#ebebe4] dark:bg-gray-800 rounded-full px-4 py-2 flex justify-between items-center mb-10 relative">
                
                <!-- Left: Filter Toggle -->
                <button 
                    @click="isFilterOpen = !isFilterOpen"
                    class="flex items-center gap-2 text-xs font-bold tracking-widest px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    <span>FILTER</span>
                    <span class="font-normal text-gray-500 lowercase ml-1">({{ filteredProducts.length }} products)</span>
                </button>

                <!-- Right: Sort Dropdown (Mock for now) -->
                <button class="bg-charcoal text-white flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-widest px-6 py-3 rounded-full hover:bg-black transition-colors">
                    FEATURED
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            </div>

            <!-- Filter Drawer (Appears below filter bar) -->
            <div v-show="isFilterOpen" class="bg-white dark:bg-[#2A2A2A] rounded-3xl shadow-xl w-full p-6 md:p-10 mb-10 relative z-30 animate-fade-in-down">
                <div class="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <button @click="isFilterOpen = false" class="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        COLLAPSE FILTERS <span class="font-normal lowercase ml-1">({{ filteredProducts.length }} products)</span>
                    </button>
                    <button class="text-xs font-bold underline hover:text-gray-600 dark:hover:text-gray-400 transition-colors uppercase tracking-widest text-black dark:text-white">
                        Clear All
                    </button>
                </div>
                
                <!-- Temporary SidebarFilter placement before rewriting it into columns -->
                <div class="opacity-50 pointer-events-none">
                    <p class="text-xs text-red-500 mb-4 font-bold uppercase">Placeholder: Working on the columnar filter layout next</p>
                    <SidebarFilter />
                </div>
            </div>

            <!-- Product Grid -->
            <div class="w-full relative z-20">
                <ProductGrid :products="filteredProducts" :is-loading="isLoading" />
            </div>

        </div>
    </main>
  </div>
</template>



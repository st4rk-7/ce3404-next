<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import ProductGrid from '../components/ProductGrid.vue';
import SidebarFilter from '../components/SidebarFilter.vue'; // Will refactor this inside the new filter drawer soon
import { useProducts } from '../composables/useProducts';
import { useSearchStore } from '../stores/search';
import { useFilterStore } from '../stores/filter';

const { products, isLoading, fetchProducts } = useProducts();
const searchStore = useSearchStore();
const filterStore = useFilterStore();
const route = useRoute();
const isFilterOpen = ref(false);

// Filter Logic: Search + Category + Sidebar Filters
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

    if (searchStore.query) {
        const query = searchStore.query.toLowerCase();
        result = result.filter(p => p.title.toLowerCase().includes(query));
    }

    // Note: The legacy price filter based on route.query.minPrice is overridden by the new UI sidebar, 
    // but leaving it intact below wouldn't hurt. We'll skip it in favor of the Sidebar logic.

    // ----------------------------------------
    // Pinia FilterStore (New UI Mega Filter)
    // ----------------------------------------
    const { size, color, price, productType, material } = filterStore.activeFilters;

    if (size && size.length > 0) {
        result = result.filter(p => p.sizes && p.sizes.some(s => size.includes(s)));
    }
    if (color && color.length > 0) {
        result = result.filter(p => p.colors && p.colors.some(c => color.includes(c)));
    }
    if (productType && productType.length > 0) {
        result = result.filter(p => p.productType && productType.includes(p.productType));
    }
    if (material && material.length > 0) {
        result = result.filter(p => p.material && material.includes(p.material));
    }
    if (price && price.length > 0) {
        result = result.filter(p => {
             return price.some(rangeLabel => {
                 const range = filterStore.priceRanges.find(r => r.label === rangeLabel);
                 if (!range) return false;
                 return p.price >= range.min && p.price <= range.max;
             });
        });
    }

    // ----------------------------------------
    // Sorting Logic
    // ----------------------------------------
    switch (filterStore.activeSort) {
        case 'PRICE, LOW TO HIGH':
            result = [...result].sort((a, b) => a.price - b.price);
            break;
        case 'PRICE, HIGH TO LOW':
            result = [...result].sort((a, b) => b.price - a.price);
            break;
        case 'ALPHABETICALLY, A-Z':
            result = [...result].sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'ALPHABETICALLY, Z-A':
            result = [...result].sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'DATE, OLD TO NEW':
            result = [...result].sort((a, b) => new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime());
            break;
        case 'DATE, NEW TO OLD':
            result = [...result].sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
            break;
        case 'BEST SELLING':
            result = [...result].sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0)); // mock best selling mostly by discount popularity
            break;
        // 'FEATURED' falls through to default API array order
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
            <div class="bg-[#EAE8E2] dark:bg-[#2A2A2A] rounded-full px-3 py-2 flex justify-between items-center mb-10 relative shadow-sm">
                
                <!-- Left: Filter Toggle -->
                <button 
                    @click="isFilterOpen = !isFilterOpen"
                    class="flex items-center gap-3 text-[13px] font-bold tracking-tight px-2 py-1 rounded-full hover:bg-white/50 dark:hover:bg-gray-700 transition-colors text-[#111111] dark:text-white"
                >
                    <div class="w-8 h-8 rounded-full border border-[#111111] dark:border-white flex items-center justify-center">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div>
                        <span class="uppercase tracking-widest text-[#111111] dark:text-white text-xs font-extrabold mr-1">FILTER</span>
                        <span class="font-normal text-[#555555] dark:text-gray-300 text-xs">({{ filteredProducts.length }} products)</span>
                    </div>
                </button>

                <!-- Right: MEN/WOMEN Toggle & Sort Dropdown -->
                <div class="flex items-center gap-4">
                    
                    <!-- FEATURED Dropdown -->
                    <div class="relative group">
                        <button class="bg-transparent text-[#111111] dark:text-white flex items-center gap-2 text-[10px] md:text-[11px] font-bold tracking-widest px-4 py-2 rounded-full hover:bg-white/50 dark:hover:bg-gray-700 transition-colors border border-[#111111] dark:border-white uppercase shadow-sm">
                            {{ filterStore.activeSort }}
                            <div class="w-5 h-5 rounded-full border border-[#111111] dark:border-white flex items-center justify-center ml-2">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </button>

                        <!-- Dropdown Menu -->
                        <div class="absolute right-0 top-full mt-2 w-64 bg-charcoal text-white rounded-md shadow-2xl hidden group-hover:block z-50 overflow-hidden border border-gray-700">
                            <ul class="text-xs font-bold tracking-widest uppercase py-2">
                                <li @click="filterStore.setSort(option)" 
                                    v-for="option in ['FEATURED', 'BEST SELLING', 'ALPHABETICALLY, A-Z', 'ALPHABETICALLY, Z-A', 'PRICE, LOW TO HIGH', 'PRICE, HIGH TO LOW', 'DATE, OLD TO NEW', 'DATE, NEW TO OLD']" 
                                    :key="option" 
                                    :class="option === filterStore.activeSort ? 'bg-[#1F51FF] hover:bg-blue-600' : 'hover:bg-gray-800'"
                                    class="px-6 py-3 cursor-pointer transition-colors"
                                >
                                    {{ option }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- MEN / WOMEN Toggle -->
                    <div class="hidden md:flex items-center border border-[#111111] dark:border-white rounded-full p-1 bg-transparent shadow-sm">
                        <button class="bg-[#111111] dark:bg-white text-white dark:text-black text-[10px] md:text-[11px] font-bold tracking-widest px-4 py-1.5 uppercase rounded-full hover:opacity-90 transition-opacity">
                            MEN
                        </button>
                        <button class="text-[#111111] dark:text-white text-[10px] md:text-[11px] font-bold tracking-widest px-4 py-1.5 uppercase rounded-full hover:bg-black/5 dark:hover:bg-white/20 transition-colors">
                            WOMEN
                        </button>
                    </div>

                </div>
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
                    <button @click="filterStore.clearAllFilters()" class="text-xs font-bold underline hover:text-gray-600 dark:hover:text-gray-400 transition-colors uppercase tracking-widest text-black dark:text-white">
                        Clear All
                    </button>
                </div>
                
                <!-- Filter Body: The 5-column Layout -->
                <SidebarFilter />
            </div>

            <!-- Product Grid -->
            <div class="w-full relative z-20">
                <ProductGrid :products="filteredProducts" :is-loading="isLoading" />
            </div>

        </div>
    </main>
  </div>
</template>



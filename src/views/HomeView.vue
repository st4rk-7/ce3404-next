<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import FilterBar from '../components/FilterBar.vue';
import ProductGrid from '../components/ProductGrid.vue';
import { useProducts } from '../composables/useProducts';

const { products, isLoading, fetchProducts } = useProducts();

const searchQuery = ref('');
const selectedCategory = ref('');

// Extract unique categories from products
const categories = computed(() => {
    const cats = new Set(products.value.map(p => p.category));
    return Array.from(cats);
});

// Augment products with mock discounts for visual fidelity if missing
const augmentedProducts = computed(() => {
    return products.value.map(p => ({
        ...p,
        discountPercentage: p.discountPercentage || (Math.random() > 0.5 ? Math.floor(Math.random() * 30 + 10) : 0),
        price: p.price * 10 
    }));
});

// Filter Logic: Search + Category
const filteredProducts = computed(() => {
    let result = augmentedProducts.value;

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(p => p.title.toLowerCase().includes(query));
    }

    if (selectedCategory.value) {
        result = result.filter(p => p.category === selectedCategory.value);
    }

    return result;
});

onMounted(async () => {
    await fetchProducts();
});
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col font-sans">
    
    <main class="flex-grow">
        <!-- Collection Intro -->
        <div class="container mx-auto px-4 md:px-8 py-12 text-center max-w-4xl">
            <h1 class="text-xl font-medium tracking-widest uppercase mb-6 text-gray-500">Men's Low-Top</h1>
            <p class="text-xs leading-loose text-gray-500 font-mono">
                This is where timeless design meets premium Italian craftsmanship. These low-top sneakers are expertly crafted in Italy, using high-quality full-grain leathers, mixed materials, clean silhouettes and refined details. The collection spans key models such as PURE, LC06, MODEL T and STUDLIGHT for men.
            </p>
        </div>

        <div class="container mx-auto px-4 md:px-8 mb-20">
            <!-- Filter Bar -->
            <FilterBar 
                :categories="categories"
                @update:search="(val) => searchQuery = val"
                @update:category="(val) => selectedCategory = val"
            />

            <div class="flex items-start mt-8">
                <!-- Sidebar (Desktop Only) - Keep as visual or remove? Script implies FilterBar replaced it? -->
                <!-- The script says "Refactor HomeView... Import FilterBar... Display filteredProducts". -->
                <!-- I will keep the sidebar as it adds to the "mimic" feel, but maybe hide it or make it functional later. -->
                <!-- Actually, FilterBar is top-level usually. The sidebar in previous design was filters. -->
                <!-- I'll replace the sidebar with the functional FilterBar or put FilterBar above? -->
                <!-- The user script says "Create Filter Component... Refactor Home View... to support filtering." -->
                <!-- I'll put FilterBar at the top and remove the static sidebar to avoid confusion/duplication, or keep sidebar as "Categories" list? -->
                <!-- Detailed interpretation: FilterBar has search + category dropdown. The Sidebar had checkboxes. -->
                <!-- I will use FilterBar as the primary interaction as requested by the script. -->
                
                <!-- Product Grid -->
                <div class="flex-1">
                    <!-- Sort Bar (Mobile/Desktop) -->
                    <div class="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                        <span class="text-xs font-mono text-gray-400">{{ filteredProducts.length }} products</span>
                        <div class="flex items-center text-xs font-mono text-gray-500 border border-gray-200 px-3 py-2 cursor-pointer">
                            <span>Relevance</span>
                            <svg class="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    <ProductGrid :products="filteredProducts" :is-loading="isLoading" />
                </div>
            </div>
        </div>
    </main>
  </div>
</template>

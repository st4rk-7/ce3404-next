<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import FilterBar from '../components/FilterBar.vue';
import ProductCard from '../components/ProductCard.vue';
import type { Product } from '../types/product';
import { useProducts } from '../composables/useProducts';

const { products, isLoading, fetchProducts } = useProducts();
const categories = ref<string[]>([]);
const searchQuery = ref('');
const selectedCategory = ref('');

onMounted(async () => {
    await fetchProducts();
    
    // Extract unique categories from augmented products
    // We cast to string because typically category is a string, 
    // but strict mode might complain if it's potentially something else.
    const uniqueCategories = new Set(products.value.map((p: Product) => p.category as string));
    categories.value = Array.from(uniqueCategories).sort();
});

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchTitle = product.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCategory = selectedCategory.value ? product.category === selectedCategory.value : true;
    return matchTitle && matchCategory;
  });
});

const updateSearch = (query: string) => {
  searchQuery.value = query;
};

const updateCategory = (category: string) => {
  selectedCategory.value = category;
};
</script>

<template>
  <div class="space-y-6">
     <div class="text-center mb-10">
        <h1 class="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">CS3404 Shop</h1>
        <p class="text-gray-600 dark:text-gray-400 text-lg">Browse our premium collection</p>
     </div>

     <FilterBar 
       :categories="categories"
       @update:search="updateSearch"
       @update:category="updateCategory"
     />

     <div v-if="isLoading" class="flex justify-center py-20">
       <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
     </div>

     <div v-else-if="filteredProducts.length === 0" class="text-center py-20 text-gray-500">
       No products found matching your criteria.
     </div>

     <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
       <ProductCard 
         v-for="product in filteredProducts" 
         :key="product.id" 
         :product="product" 
       />
     </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import FilterBar from './components/FilterBar.vue';
import ProductCard from './components/ProductCard.vue';
import type { Product } from './types/product';

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const isLoading = ref(true);

onMounted(async () => {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch('https://dummyjson.com/products?limit=100'),
      fetch('https://dummyjson.com/products/categories')
    ]);
    
    const productsData = await productsRes.json();
    products.value = productsData.products;
    
    // The categories endpoint returns explicit objects or strings depending on api version, 
    // but dummyjson usually returns an array of Objects with { slug, name, url } or just strings.
    // Let's verify or robustly handle it. Recently it changed to objects { slug: 'beauty', name: 'Beauty', url: '...' }
    // But sometimes it's just strings. Let's check type or just map safely.
    // Actually, distinct derived from products is safer if API changes, but let's try reading the response.
    // To be safe and fast, I'll extract unique categories from products, which guarantees they have products.
    // Or I'll use the API result if simple.
    // Let's rely on extracting from products for now to ensure consistency with the data we have.
    const uniqueCategories = new Set(productsData.products.map((p: Product) => p.category));
    categories.value = Array.from(uniqueCategories).sort();
    
    // If we wanted to use the categories API:
    // const categoriesData = await categoriesRes.json();
    // categories.value = categoriesData.map((c: any) => c.slug || c); 
  } catch (error) {
    console.error('Failed to fetch data:', error);
  } finally {
    isLoading.value = false;
  }
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
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
    <NavBar />

    <main class="pt-24 px-4 max-w-7xl mx-auto pb-12">
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
    </main>
  </div>
</template>

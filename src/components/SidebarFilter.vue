<script setup lang="ts">
import { ref } from 'vue';
import { useFilterStore } from '../stores/filter';

const filterStore = useFilterStore();

// UI choices definition
const filters = ref([
  { id: 'size', label: 'Size', options: [] },
  { 
    id: 'color', 
    label: 'Color', 
    options: [
      { id: '#000000', label: 'Black', color: '#000000' },
      { id: '#ffffff', label: 'White', color: '#ffffff' },
      { id: '#8B4513', label: 'Brown', color: '#8B4513' },
      { id: '#FFC0CB', label: 'Pink', color: '#FFC0CB' },
      { id: '#FFD700', label: 'Yellow', color: '#FFD700' },
      { id: '#0000FF', label: 'Blue', color: '#0000FF' },
      { id: '#808080', label: 'Grey', color: '#808080' },
      { id: '#F5F5DC', label: 'Beige', color: '#F5F5DC' },
      { id: '#FF0000', label: 'Red', color: '#FF0000' },
      { id: '#FFA500', label: 'Orange', color: '#FFA500' },
      { id: '#008000', label: 'Green', color: '#008000' },
    ] 
  }
]);

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13'];
const productTypes = ['Everyday Sneakers', 'Fluffs', 'Golf', 'High Tops', 'Hiking Shoes', 'Running Shoes', 'Slip Ons', 'Water-Repellent Shoes'];
const materials = ['Alternative-Leather', 'Canvas', 'Tree-Fiber-Blend', 'Wool'];

</script>

<template>
  <div class="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 font-sans text-gray-800 dark:text-gray-100">
    
    <div>
      <h3 class="text-sm font-bold uppercase tracking-widest mb-4">Size</h3>
      <p class="text-xs text-gray-500 mb-4 leading-relaxed max-w-[200px]">
        Most of our shoes only come in full sizes. If you're a half size, select your nearest whole size too.
      </p>
      
      <!-- Size Grid -->
      <div class="grid grid-cols-5 gap-2">
         <template v-for="size in sizes" :key="size">
            <button 
               @click="filterStore.toggleFilter('size', size)"
               :class="filterStore.isFilterActive('size', size) ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' : 'border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white text-gray-800 dark:text-gray-100'"
               class="border py-3 flex justify-center items-center font-mono text-xs transition-colors"
            >
               {{ size }}
            </button>
         </template>
      </div>
    </div>

    <!-- Column 2: COLOR -->
    <div>
      <h3 class="text-sm font-bold uppercase tracking-widest mb-4">Color</h3>
      <div v-for="section in filters.filter(f => f.id === 'color')" :key="section.id" class="grid grid-cols-2 gap-y-4 gap-x-2">
         <label 
           v-for="option in section.options" 
           :key="option.id" 
           class="flex items-center gap-2 cursor-pointer group"
         >
           <!-- Color Swatch Circle -->
           <input 
             type="checkbox" 
             class="peer sr-only"
             @change="filterStore.toggleFilter('color', option.color)"
             :checked="filterStore.isFilterActive('color', option.color)"
           />
           <div 
             class="w-5 h-5 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center peer-checked:ring-1 peer-checked:ring-black dark:peer-checked:ring-white peer-checked:ring-offset-1 dark:peer-checked:ring-offset-charcoal transition-all"
           >
             <div class="w-full h-full rounded-full" :style="{ backgroundColor: option.color }"></div>
           </div>
           <span class="text-xs text-gray-600 group-hover:text-black">{{ option.label }}</span>
         </label>
      </div>
    </div>

    <!-- Column 3: PRICE -->
    <div>
      <h3 class="text-sm font-bold uppercase tracking-widest mb-4">Price</h3>
      <div class="space-y-4">
          <label v-for="range in filterStore.priceRanges" :key="range.label" class="flex items-center gap-3 cursor-pointer group">
              <input 
                 type="checkbox" 
                 @change="filterStore.toggleFilter('price', range.label)"
                 :checked="filterStore.isFilterActive('price', range.label)"
                 class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer appearance-none checked:bg-black checked:border-black relative before:content-[''] checked:before:absolute checked:before:w-1.5 checked:before:h-2.5 checked:before:border-r-2 checked:before:border-b-2 checked:before:border-white checked:before:rotate-45 checked:before:left-1 checked:before:top-0.5" 
              />
              <span class="text-xs text-gray-600 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white">{{ range.label }}</span>
          </label>
      </div>
    </div>

    <!-- Column 4: PRODUCT TYPE -->
    <div>
      <h3 class="text-sm font-bold uppercase tracking-widest mb-4">Product Type</h3>
      <div class="space-y-4">
          <label v-for="type in productTypes" :key="type" class="flex items-center gap-3 cursor-pointer group">
              <input 
                 type="checkbox" 
                 @change="filterStore.toggleFilter('productType', type)"
                 :checked="filterStore.isFilterActive('productType', type)"
                 class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer appearance-none checked:bg-black checked:border-black relative before:content-[''] checked:before:absolute checked:before:w-1.5 checked:before:h-2.5 checked:before:border-r-2 checked:before:border-b-2 checked:before:border-white checked:before:rotate-45 checked:before:left-1 checked:before:top-0.5" 
              />
              <span class="text-xs text-gray-600 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white">{{ type }}</span>
          </label>
      </div>
    </div>

    <!-- Column 5: MATERIAL -->
    <div>
      <h3 class="text-sm font-bold uppercase tracking-widest mb-4">Material</h3>
      <div class="space-y-4">
          <label v-for="mat in materials" :key="mat" class="flex items-center gap-3 cursor-pointer group">
              <input 
                 type="checkbox" 
                 @change="filterStore.toggleFilter('material', mat)"
                 :checked="filterStore.isFilterActive('material', mat)"
                 class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer appearance-none checked:bg-black checked:border-black relative before:content-[''] checked:before:absolute checked:before:w-1.5 checked:before:h-2.5 checked:before:border-r-2 checked:before:border-b-2 checked:before:border-white checked:before:rotate-45 checked:before:left-1 checked:before:top-0.5" 
               />
              <span class="text-xs text-gray-600 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white">{{ mat }}</span>
          </label>
      </div>
    </div>

  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 2px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
}
</style>

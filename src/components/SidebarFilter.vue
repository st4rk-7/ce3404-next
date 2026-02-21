<script setup lang="ts">
import { ref } from 'vue';


// We keep a simplified version of the filter state just to allow the UI to compile
const filters = ref([
  { id: 'size', label: 'Size', options: [] },
  { 
    id: 'color', 
    label: 'Color', 
    options: [
      { id: 'black', label: 'Black', color: '#000000' },
      { id: 'white', label: 'White', color: '#ffffff' },
      { id: 'brown', label: 'Brown', color: '#8B4513' },
      { id: 'pink', label: 'Pink', color: '#FFC0CB' },
      { id: 'yellow', label: 'Yellow', color: '#FFD700' },
      { id: 'blue', label: 'Blue', color: '#0000FF' },
      { id: 'grey', label: 'Grey', color: '#808080' },
      { id: 'beige', label: 'Beige', color: '#F5F5DC' },
      { id: 'red', label: 'Red', color: '#FF0000' },
      { id: 'orange', label: 'Orange', color: '#FFA500' },
      { id: 'green', label: 'Green', color: '#008000' },
    ] 
  }
]);

const activeFilters = ref<Record<string, string[]>>({});

const toggleFilter = (sectionId: string, optionId: string) => {
    if (!activeFilters.value[sectionId]) activeFilters.value[sectionId] = [];
    const idx = activeFilters.value[sectionId].indexOf(optionId);
    if (idx > -1) activeFilters.value[sectionId].splice(idx, 1);
    else activeFilters.value[sectionId].push(optionId);
};

const isFilterSelected = (sectionId: string, optionId: string) => {
    return activeFilters.value[sectionId]?.includes(optionId) || false;
};
</script>

<template>
  <div class="w-full flex flex-col font-mono text-gray-800 dark:text-gray-100">
    
    <div class="flex-1">
      <h3 class="text-sm font-bold uppercase tracking-widest mb-4">Size</h3>
      <p class="text-xs text-gray-500 mb-4 leading-relaxed max-w-[200px]">
        Most of our shoes only come in full sizes. If you're a half size, select your nearest whole size too.
      </p>
      
      <!-- Size Grid -->
      <div class="grid grid-cols-5 gap-2">
        <template v-for="section in filters.filter(f => f.id === 'size' || f.id === 'additional_sizes')" :key="section.id">
            <!-- For demonstration, using hardcoded typical sizes matching the image instead of dynamic just for layout accuracy -->
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">XS</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">S</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">M</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">L</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">XL</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">XXL</button>
            
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">8</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">8.5</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">9</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">9.5</button>
            
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">10</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">10.5</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">11</button>
            <button class="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 py-3 flex justify-center items-center relative overflow-hidden text-xs">
                11.5
                <!-- diagonal line crossing out disabled size -->
                <div class="absolute inset-0 w-full h-[1px] bg-gray-200 dark:bg-gray-600 rotate-45 top-1/2 -translate-y-1/2 origin-center"></div>
            </button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">12</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">12.5</button>
            <button class="border border-gray-200 dark:border-gray-700 py-3 flex justify-center items-center hover:border-black dark:hover:border-white transition-colors text-xs">13</button>
        </template>
      </div>
    </div>

    <!-- Column 2: COLOR -->
    <div class="flex-1 md:max-w-[180px]">
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
             @change="toggleFilter(section.id, option.id)"
             :checked="isFilterSelected(section.id, option.id)"
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
    <div class="flex-1 md:max-w-[180px]">
      <h3 class="text-sm font-bold uppercase tracking-widest mb-4">Price</h3>
      <div class="space-y-4">
          <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer appearance-none checked:bg-black checked:border-black relative before:content-[''] checked:before:absolute checked:before:w-1.5 checked:before:h-2.5 checked:before:border-r-2 checked:before:border-b-2 checked:before:border-white checked:before:rotate-45 checked:before:left-1 checked:before:top-0.5" />
              <span class="text-xs text-gray-600 group-hover:text-black">Under $75</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer appearance-none checked:bg-black checked:border-black relative before:content-[''] checked:before:absolute checked:before:w-1.5 checked:before:h-2.5 checked:before:border-r-2 checked:before:border-b-2 checked:before:border-white checked:before:rotate-45 checked:before:left-1 checked:before:top-0.5" />
              <span class="text-xs text-gray-600 group-hover:text-black">$76 - $100</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer appearance-none checked:bg-black checked:border-black relative before:content-[''] checked:before:absolute checked:before:w-1.5 checked:before:h-2.5 checked:before:border-r-2 checked:before:border-b-2 checked:before:border-white checked:before:rotate-45 checked:before:left-1 checked:before:top-0.5" />
              <span class="text-xs text-gray-600 group-hover:text-black">$101 - $125</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer appearance-none checked:bg-black checked:border-black relative before:content-[''] checked:before:absolute checked:before:w-1.5 checked:before:h-2.5 checked:before:border-r-2 checked:before:border-b-2 checked:before:border-white checked:before:rotate-45 checked:before:left-1 checked:before:top-0.5" />
              <span class="text-xs text-gray-600 group-hover:text-black">$126 - $150</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer appearance-none checked:bg-black checked:border-black relative before:content-[''] checked:before:absolute checked:before:w-1.5 checked:before:h-2.5 checked:before:border-r-2 checked:before:border-b-2 checked:before:border-white checked:before:rotate-45 checked:before:left-1 checked:before:top-0.5" />
              <span class="text-xs text-gray-600 group-hover:text-black">Over $150</span>
          </label>
      </div>
    </div>

    <!-- Column 4: PRODUCT TYPE -->
    <div class="flex-1 md:max-w-[200px]">
      <h3 class="text-sm font-bold uppercase tracking-widest mb-4">Product Type</h3>
      <div class="space-y-4">
          <label v-for="type in ['Everyday Sneakers', 'Fluffs', 'Golf', 'High Tops', 'Hiking Shoes', 'Running Shoes', 'Slip Ons', 'Water-Repellent Shoes']" :key="type" class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer appearance-none checked:bg-black checked:border-black relative before:content-[''] checked:before:absolute checked:before:w-1.5 checked:before:h-2.5 checked:before:border-r-2 checked:before:border-b-2 checked:before:border-white checked:before:rotate-45 checked:before:left-1 checked:before:top-0.5" />
              <span class="text-xs text-gray-600 group-hover:text-black">{{ type }}</span>
          </label>
      </div>
    </div>

    <!-- Column 5: MATERIAL -->
    <div class="flex-1 md:max-w-[200px]">
      <h3 class="text-sm font-bold uppercase tracking-widest mb-4">Material</h3>
      <div class="space-y-4">
          <label v-for="mat in ['Alternative-Leather', 'Canvas', 'Tree-Fiber-Blend', 'Wool']" :key="mat" class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer appearance-none checked:bg-black checked:border-black relative before:content-[''] checked:before:absolute checked:before:w-1.5 checked:before:h-2.5 checked:before:border-r-2 checked:before:border-b-2 checked:before:border-white checked:before:rotate-45 checked:before:left-1 checked:before:top-0.5" />
              <span class="text-xs text-gray-600 group-hover:text-black">{{ mat }}</span>
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

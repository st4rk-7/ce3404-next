<script setup lang="ts">
import { ref } from 'vue';

interface FilterOption {
  id: string;
  label: string;
  count: number;
  color?: string;
}

interface FilterSection {
  id: string;
  label: string;
  isOpen: boolean;
  options: FilterOption[];
}

const filters = ref<FilterSection[]>([
  {
    id: 'gender',
    label: 'Gender',
    isOpen: true,
    options: [
      { id: 'mens', label: "MEN'S", count: 81 },
    ]
  },
  {
    id: 'style',
    label: 'Style',
    isOpen: true,
    options: [
      { id: 'low-top', label: "MEN'S: LOW-TOP", count: 49 },
      { id: 'high-tops', label: "MEN'S: HIGH-TOPS", count: 32 },
    ]
  },
  {
    id: 'edit',
    label: 'Edit',
    isOpen: false,
    options: [
      { id: 'studs', label: "MEN'S STUDS", count: 31 },
      { id: 'vintage', label: "MEN'S VINTAGE", count: 27 },
      { id: 'fluo', label: "MEN'S FLUO", count: 1 },
      { id: 'black-white', label: "MEN'S BLACK & WHITE", count: 22 },
      { id: 'colour-flash', label: "MEN'S COLOUR FLASH", count: 15 },
    ]
  },
  {
    id: 'model',
    label: 'Model',
    isOpen: false,
    options: [
      { id: 'originals', label: "MEN'S ORIGINALS", count: 9 },
      { id: 'model-t', label: "MEN'S MODEL T", count: 8 },
      { id: 'lc06', label: "MEN'S LC06", count: 11 },
      { id: 'pure', label: "MEN'S: PURE", count: 8 },
    ]
  },
  {
    id: 'size',
    label: 'Size',
    isOpen: false,
    options: [
      { id: '39', label: '39', count: 62 },
      { id: '40', label: '40', count: 67 },
      { id: '41', label: '41', count: 69 },
      { id: '42', label: '42', count: 67 },
      { id: '43', label: '43', count: 70 },
      { id: '44', label: '44', count: 74 },
      { id: '45', label: '45', count: 71 },
    ]
  },
  {
    id: 'color',
    label: 'Color',
    isOpen: false,
    options: [
      { id: 'black', label: 'Black', color: '#030303', count: 11 },
      { id: 'white', label: 'White', color: '#f7f5f5', count: 41 },
      { id: 'red', label: 'Red', color: '#e30909', count: 4 },
      { id: 'green', label: 'Green', color: '#11a64c', count: 12 },
      { id: 'blue', label: 'Blue', color: '#138bd6', count: 12 },
      { id: 'brown', label: 'Brown', color: '#876307', count: 10 },
      { id: 'grey', label: 'Grey', color: '#b8abab', count: 9 },
    ]
  }
]);

const toggleSection = (filterId: string) => {
  const filter = filters.value.find(f => f.id === filterId);
  if (filter) {
    filter.isOpen = !filter.isOpen;
  }
};
</script>

<template>
  <div class="sidebar-filter font-mono text-sm">
    <div v-for="filter in filters" :key="filter.id" class="mb-4">
      <!-- Header -->
      <button 
        @click="toggleSection(filter.id)"
        class="w-full flex items-center justify-between py-2 border-b border-gray-200"
      >
        <span class="font-bold uppercase tracking-wider">{{ filter.label }}</span>
        <span>{{ filter.isOpen ? '−' : '+' }}</span>
      </button>

      <!-- Content -->
      <div v-if="filter.isOpen" class="mt-2 space-y-1">
        <template v-if="filter.id === 'size'">
             <div class="grid grid-cols-4 gap-2">
                <button v-for="opt in filter.options" :key="opt.id" class="border border-gray-300 py-1 hover:border-black text-center text-xs">
                    {{ opt.label }}
                </button>
             </div>
        </template>
        
        <template v-else-if="filter.id === 'color'">
             <div class="flex flex-wrap gap-2">
                <button 
                    v-for="opt in filter.options" 
                    :key="opt.id" 
                    class="w-6 h-6 border border-gray-200" 
                    :style="{ backgroundColor: opt.color }"
                    :title="opt.label"
                ></button>
             </div>
        </template>

        <template v-else>
            <div v-for="opt in filter.options" :key="opt.id" class="flex items-center gap-2 group cursor-pointer py-1">
            <div class="w-3 h-3 border border-gray-300 group-hover:border-black flex items-center justify-center">
                <!-- Checkmark placeholder -->
            </div>
            <span class="flex-grow group-hover:underline">{{ opt.label }}</span>
            <span class="text-gray-400 text-xs">{{ opt.count }}</span>
            </div>
        </template>
      </div>
    </div>
  </div>
</template>

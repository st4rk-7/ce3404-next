<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PriceRangeSlider from './PriceRangeSlider.vue';

const router = useRouter();
const route = useRoute();

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
  isPrice?: boolean; // New flag for price section
}

const priceRange = ref([0, 200]); // Standard range, will verify against logical limits

const filters = ref<FilterSection[]>([
  {
    id: 'gender',
    label: 'Gender',
    isOpen: true,
    options: [
      { id: 'men', label: "MEN'S", count: 81 },
      { id: 'women', label: "WOMEN'S", count: 81 },
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
    isOpen: true, // Keep open for visibility as per request
    options: [
      { id: 'studs', label: "MEN'S STUDS", count: 17 },
      { id: 'vintage', label: "MEN'S VINTAGE", count: 15 },
      { id: 'fluo', label: "MEN'S FLUO", count: 1 },
      { id: 'black-white', label: "MEN'S BLACK & WHITE", count: 14 },
      { id: 'colour-flash', label: "MEN'S COLOUR FLASH", count: 13 },
    ]
  },
  {
    id: 'price',
    label: 'Price',
    isOpen: true,
    isPrice: true,
    options: []
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

// Computed Active Filters
const activeFilters = computed(() => {
    const active: { label: string, type: string, value: string }[] = [];
    const q = route.query;

    // Tags (Edit)
    if (q.tag) {
        const tags = Array.isArray(q.tag) ? q.tag : [q.tag];
        const editSection = filters.value.find(f => f.id === 'edit');
        
        tags.forEach(tagVal => {
            const t = tagVal as string; // safe cast
            const option = editSection?.options.find(o => o.id === t);
            if (option) {
                active.push({ label: option.label, type: 'tag', value: t });
            }
        });
    }

    return active;
});

const toggleSection = (filterId: string) => {
  const filter = filters.value.find(f => f.id === filterId);
  if (filter) {
    filter.isOpen = !filter.isOpen;
  }
};

// Handle Price Update
const updatePrice = (newRange: number[]) => {
    priceRange.value = newRange;
    router.push({
        query: {
            ...route.query,
            minPrice: newRange[0],
            maxPrice: newRange[1]
        }
    });
};

// Handle Filter Click
const handleFilterClick = (sectionId: string, optionId: string) => {
    const query = { ...route.query };
    
    if (sectionId === 'gender') {
        const currentGender = query.gender;
        // Toggle if same clicked? Or just stay? Usually switch.
        // User asked for multiple filters "selected edit filter". 
        // Gender is usually single. Let's keep gender single.
        if (currentGender === optionId) {
             // Optional: allow deselecting gender to show all?
             delete query.gender;
        } else {
             query.gender = optionId;
        }
    } else if (sectionId === 'edit') {
        // Multi-select logic for tags
        let tags: string[] = [];
        if (query.tag) {
            tags = Array.isArray(query.tag) ? (query.tag as string[]).slice() : [query.tag as string];
        }

        if (tags.includes(optionId)) {
            // Remove
            tags = tags.filter(t => t !== optionId);
        } else {
            // Add
            tags.push(optionId);
        }

        if (tags.length > 0) {
            query.tag = tags;
        } else {
            delete query.tag;
        }
    }

    router.push({ query });
};

// Remove specific filter chip
const removeFilter = (filter: { type: string, value: string }) => {
    const query = { ...route.query };
    if (filter.type === 'tag') {
        let tags: string[] = [];
        if (query.tag) {
            tags = Array.isArray(query.tag) ? (query.tag as string[]).slice() : [query.tag as string];
        }
        tags = tags.filter(t => t !== filter.value);
        
        if (tags.length > 0) {
            query.tag = tags;
        } else {
            delete query.tag;
        }
    }
    router.push({ query });
};

const clearAllFilters = () => {
    const query = { ...route.query };
    delete query.tag; 
    delete query.minPrice;
    delete query.maxPrice; 
    router.push({ query });
};

// Sync state from URL
watch(() => route.query, (newQuery) => {
    if (newQuery.minPrice && newQuery.maxPrice) {
        priceRange.value = [Number(newQuery.minPrice), Number(newQuery.maxPrice)];
    }
}, { immediate: true });

</script>

<template>
  <div class="sidebar-filter font-mono text-sm max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar pr-2">
    
    <!-- Active Filters Section (Mimicking Screenshot) -->
    <div v-if="activeFilters.length > 0" class="mb-8">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                <span class="text-xl font-normal tracking-wide">Filters</span>
            </div>
            <button 
                @click="clearAllFilters" 
                class="text-[10px] text-gray-500 hover:text-black dark:hover:text-white underline decoration-1 underline-offset-4 uppercase tracking-widest"
            >
                Clear all
            </button>
        </div>

        <!-- Chips -->
        <div class="flex flex-wrap gap-2 mb-6">
            <div 
                v-for="(filter, idx) in activeFilters" 
                :key="idx"
                class="flex items-center bg-[#1a1a1a] dark:bg-gray-800 text-white pl-3 pr-2 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase group cursor-pointer transition-colors hover:bg-black dark:hover:bg-gray-700"
                @click="removeFilter(filter)"
            >
                <span>{{ filter.label }}</span>
                <svg class="w-3 h-3 ml-1.5 text-gray-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>
        </div>
        
        <div class="h-px bg-gray-200 dark:bg-gray-800 w-full mb-6"></div>
    </div>

    <div v-for="filter in filters" :key="filter.id" class="mb-4">
      <!-- Header -->
      <button 
        @click="toggleSection(filter.id)"
        class="w-full flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800"
      >
        <span class="font-bold uppercase tracking-wider">{{ filter.label }}</span>
        <span>{{ filter.isOpen ? '−' : '+' }}</span>
      </button>

      <!-- Content -->
      <div v-if="filter.isOpen" class="mt-4 space-y-1">
        
        <!-- SPECIAL: Price Range -->
        <template v-if="filter.isPrice">
            <PriceRangeSlider 
                :min="0" 
                :max="300" 
                v-model="priceRange" 
                @update:modelValue="updatePrice"
            />
        </template>

        <!-- SPECIAL: Size Grid -->
        <template v-else-if="filter.id === 'size'">
             <div class="grid grid-cols-4 gap-2">
                <button v-for="opt in filter.options" :key="opt.id" class="border border-gray-300 dark:border-gray-600 py-1 hover:border-black dark:hover:border-white text-center text-xs">
                    {{ opt.label }}
                </button>
             </div>
        </template>
        
        <!-- SPECIAL: Color Swatches -->
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

        <!-- STANDARD: List -->
        <template v-else>
            <div 
                v-for="opt in filter.options" 
                :key="opt.id" 
                @click="handleFilterClick(filter.id, opt.id)"
                class="flex items-center gap-2 group cursor-pointer py-1"
            >
            <div class="w-3 h-3 border border-gray-300 dark:border-gray-600 group-hover:border-black dark:group-hover:border-white flex items-center justify-center shrink-0">
                <!-- Selected State Check -->
                <div v-if="(filter.id === 'gender' && route.query.gender === opt.id) || (filter.id === 'edit' && $route.query.tag && ($route.query.tag === opt.id || (Array.isArray($route.query.tag) && $route.query.tag.includes(opt.id))))" class="w-1.5 h-1.5 bg-black dark:bg-white"></div>
            </div>
            <span class="flex-grow group-hover:underline leading-none pt-0.5">{{ opt.label }}</span>
            <span class="text-gray-400 text-xs">{{ opt.count }}</span>
            </div>
        </template>
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

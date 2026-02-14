<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  categories: string[];
}>();

const emit = defineEmits<{
  (e: 'update:search', value: string): void;
  (e: 'update:category', value: string): void;
}>();

const searchQuery = ref('');
const selectedCategory = ref('');

watch(searchQuery, (newValue) => {
  emit('update:search', newValue);
});

watch(selectedCategory, (newValue) => {
  emit('update:category', newValue);
});
</script>

<template>
  <div class="filter-bar w-full md:w-auto">
    <div class="w-full md:w-48">
      <select
        v-model="selectedCategory"
        class="block w-full pl-3 pr-8 py-2 text-xs font-bold text-brand-blue border border-gray-200 focus:outline-none focus:border-brand-blue rounded-none bg-white h-[42px] uppercase cursor-pointer"
      >
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
  </div>
</template>

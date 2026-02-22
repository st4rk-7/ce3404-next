import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterStore = defineStore('filter', () => {
    // Current active filters structured by category
    const activeFilters = ref<Record<string, string[]>>({
        size: [],
        color: [],
        price: [],
        productType: [],
        material: []
    });

    // Valid price ranges for comparison
    const priceRanges = [
        { label: 'Under $75', min: 0, max: 74.99 },
        { label: '$76 - $100', min: 76, max: 100 },
        { label: '$101 - $125', min: 101, max: 125 },
        { label: '$126 - $150', min: 126, max: 150 },
        { label: 'Over $150', min: 150.01, max: Infinity }
    ];

    // Current active sort option
    const activeSort = ref<string>('FEATURED');

    const toggleFilter = (category: string, value: string) => {
        if (!activeFilters.value[category]) {
            activeFilters.value[category] = [];
        }

        const index = activeFilters.value[category].indexOf(value);
        if (index === -1) {
            activeFilters.value[category].push(value);
        } else {
            activeFilters.value[category].splice(index, 1);
        }
    };

    const clearAllFilters = () => {
        Object.keys(activeFilters.value).forEach(key => {
            activeFilters.value[key] = [];
        });
    };

    const setSort = (sortOption: string) => {
        activeSort.value = sortOption;
    };

    const isFilterActive = (category: string, value: string): boolean => {
        return activeFilters.value[category]?.includes(value) || false;
    };

    return {
        activeFilters,
        priceRanges,
        activeSort,
        toggleFilter,
        clearAllFilters,
        setSort,
        isFilterActive
    };
});

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
    const query = ref('');
    const isSearchOpen = ref(false);

    const openSearch = () => {
        isSearchOpen.value = true;
    };

    const closeSearch = () => {
        isSearchOpen.value = false;
    };

    const clearSearch = () => {
        query.value = '';
    };

    const toggleSearch = () => {
        isSearchOpen.value = !isSearchOpen.value;
    };

    return {
        query,
        isSearchOpen,
        openSearch,
        closeSearch,
        clearSearch,
        toggleSearch
    };
});

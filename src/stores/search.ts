import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
    const query = ref('');
    const isSearchOpen = ref(false);

    const toggleSearch = () => {
        isSearchOpen.value = !isSearchOpen.value;
        if (!isSearchOpen.value) {
            query.value = ''; // Optional: clear on close? User might want to keep it.
        }
    };

    return {
        query,
        isSearchOpen,
        toggleSearch
    };
});

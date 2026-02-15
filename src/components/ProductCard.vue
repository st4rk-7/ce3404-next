<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '../types/product';
import { useCurrency } from '../composables/useCurrency';

const { formatPrice } = useCurrency();

const props = defineProps<{
  product: Product;
  discountPercentage?: number; // allow overriding or defaulting if missing
}>();

// Calculate original price assuming product.price is the SELLING price
// OR if product.price is original, calculate selling.
// Standard DummyJSON: price IS the selling price. discountPercentage is metadata.
// But usually in e-commerce UI "Save 50%" implies Original was higher.
// Let's assume product.price is the *selling* price.
// Original = Selling / (1 - discount / 100)
const originalPrice = computed(() => {
    const discount = props.discountPercentage || props.product.discountPercentage || 0;
    if (discount <= 0) return 0;
    return props.product.price / (1 - discount / 100);
});

const hasDiscount = computed(() => {
    return (props.discountPercentage || props.product.discountPercentage || 0) > 0;
});

const discountLabel = computed(() => {
    const discount = props.discountPercentage || props.product.discountPercentage || 0;
    return `Save ${Math.round(discount)}%`;
});

</script>

<template>
  <RouterLink :to="`/product/${product.id}`" class="group cursor-pointer block">
    <!-- Image Container -->
    <div class="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3] mb-4">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      <!-- Optional: Add 'Quick View' or 'Add to Cart' overlay here if needed -->
    </div>

    <!-- Product Details -->
    <div class="space-y-1">
      <h3 class="text-sm font-normal text-brand-blue dark:text-gray-200 leading-snug font-sans group-hover:underline decoration-1 underline-offset-2">
        {{ product.title }}
      </h3>
      
      <div class="flex items-baseline space-x-2 text-xs font-mono">
        <span v-if="hasDiscount" class="text-gray-400 line-through decoration-gray-400">
            {{ formatPrice(originalPrice) }}
        </span>
        <span :class="{'text-brand-red': hasDiscount, 'text-brand-blue': !hasDiscount}" class="font-bold">
            {{ formatPrice(product.price) }}
        </span>
        <span v-if="hasDiscount" class="text-brand-red">
            {{ discountLabel }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>

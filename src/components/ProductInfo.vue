<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Product } from '../types/product';
import { useCurrency } from '../composables/useCurrency';

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (e: 'add-to-cart', payload: { product: Product; size: string; color: string; quantity: number }): void;
}>();

const { formatPrice } = useCurrency();
const selectedSize = ref<string | null>(null);
const selectedColor = ref('');
const btnState = ref<'idle' | 'loading' | 'done'>('idle');
const activeAccordion = ref<string | null>(null);
const validationMessage = ref('');

const colorNames: Record<string, string> = {
  '#000000': 'Black',
  '#ffffff': 'White',
  '#8b4513': 'Brown',
  '#ffc0cb': 'Pink',
  '#ffd700': 'Gold',
  '#0000ff': 'Blue',
  '#808080': 'Grey',
  '#f5f5dc': 'Natural',
  '#ff0000': 'Red',
  '#ffa500': 'Orange',
  '#008000': 'Green',
};

const selectedColorName = computed(() => colorNames[selectedColor.value.toLowerCase()] || selectedColor.value);

watch(() => props.product.id, () => {
  selectedSize.value = null;
  selectedColor.value = props.product.colors?.[0] || 'Default';
  btnState.value = 'idle';
  validationMessage.value = '';
}, { immediate: true });

const addToCart = () => {
  if (!selectedSize.value || btnState.value !== 'idle') return;

  validationMessage.value = '';
  btnState.value = 'loading';
  window.setTimeout(() => {
    emit('add-to-cart', {
      product: props.product,
      size: selectedSize.value!,
      color: selectedColor.value,
      quantity: 1,
    });
    btnState.value = 'done';
    window.setTimeout(() => {
      btnState.value = 'idle';
    }, 900);
  }, 350);
};

const toggleAccordion = (tab: string) => {
  activeAccordion.value = activeAccordion.value === tab ? null : tab;
};
</script>

<template>
  <div class="product-info bg-white dark:bg-[#2A2A2A] rounded-md shadow-sm p-6 md:p-8 flex flex-col space-y-6 sticky top-24 font-sans text-black dark:text-gray-100 transition-colors duration-200">
    <div class="hidden md:block space-y-1 pb-2">
      <h1 class="text-[28px] font-medium tracking-tight text-gray-900 dark:text-white leading-tight text-balance font-serif">
        {{ product.title }}
      </h1>
      <div class="text-xl font-medium mt-2">{{ formatPrice(product.price) }}</div>
      <div class="flex items-center gap-2 text-xs mt-1" :aria-label="`Rated ${product.rating} out of 5`">
        <span aria-hidden="true" class="text-black dark:text-white text-[10px]">★★★★★</span>
        <span class="font-bold">{{ product.rating.toFixed(1) }}</span>
      </div>
      <div v-if="product.tags?.[0]" class="inline-block mt-3 mb-1 border-[1.5px] border-gray-900 dark:border-white px-3 py-1.5 rounded-full text-[10.5px] font-bold tracking-widest uppercase">
        {{ product.tags[0] }}
      </div>
    </div>

    <fieldset v-if="product.colors.length" class="space-y-3 pb-2 pt-2 border-t border-gray-100 dark:border-gray-700">
      <legend class="text-xs font-bold tracking-widest uppercase">Color</legend>
      <p class="text-sm">{{ selectedColorName }}</p>
      <div class="flex flex-wrap gap-2 mt-2">
        <button
          v-for="color in product.colors"
          :key="color"
          type="button"
          class="relative size-10 rounded-full border border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white transition-[border-color,transform] flex items-center justify-center"
          :class="selectedColor === color ? 'scale-90 ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-[#2A2A2A]' : ''"
          :style="{ backgroundColor: color }"
          :aria-label="`Choose ${colorNames[color.toLowerCase()] || color}`"
          :aria-pressed="selectedColor === color"
          @click="selectedColor = color"
        />
      </div>
    </fieldset>

    <fieldset class="space-y-4 pt-2">
      <legend class="text-xs font-bold tracking-widest uppercase">Available Sizes</legend>
      <div class="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-3">
        <button
          v-for="size in product.sizes"
          :key="size"
          type="button"
          class="min-h-10 border flex items-center justify-center text-sm transition-[border-color,background-color,color] rounded-sm bg-white dark:bg-[#2A2A2A]"
          :class="selectedSize === size
            ? 'border-black dark:border-white border-[1.5px] font-bold text-black dark:text-white'
            : 'border-gray-300 dark:border-gray-600 text-black dark:text-white hover:border-black dark:hover:border-white'"
          :aria-pressed="selectedSize === size"
          @click="selectedSize = size; validationMessage = ''"
        >
          {{ size }}
        </button>
      </div>
      <p class="text-[11px] text-gray-600 dark:text-gray-400">Choose your usual size. Available options reflect current stock.</p>
    </fieldset>

    <div class="pt-4 pb-6 border-b border-gray-200 dark:border-gray-700">
      <button
        type="button"
        :disabled="!selectedSize || btnState !== 'idle'"
        class="w-full min-h-12 font-bold uppercase tracking-widest text-sm px-4 transition-[background-color,color,opacity] flex items-center justify-center gap-2 rounded-sm disabled:cursor-not-allowed"
        :class="selectedSize ? 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200' : 'bg-[#e5e7eb] dark:bg-gray-800 text-gray-500 dark:text-gray-400'"
        @click="addToCart"
      >
        <Transition name="btn-content" mode="out-in">
          <span v-if="btnState === 'loading'" key="loading" class="flex items-center justify-center" aria-label="Adding to cart">
            <svg class="size-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2.5" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </span>
          <span v-else-if="btnState === 'done'" key="done">Added to cart</span>
          <span v-else key="idle">{{ selectedSize ? 'Add to cart' : 'Select a size' }}</span>
        </Transition>
      </button>
      <p aria-live="polite" class="sr-only">{{ validationMessage }}</p>
      <p class="text-[11px] text-center font-medium mt-4">
        Free shipping on orders over Rs 5,000<br>
        <span class="text-gray-500 dark:text-gray-400 font-normal">Easy returns</span>
      </p>
    </div>

    <div>
      <div class="border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          class="w-full min-h-12 py-3 flex justify-between items-center group"
          :aria-expanded="activeAccordion === 'details'"
          aria-controls="product-details"
          @click="toggleAccordion('details')"
        >
          <span class="text-xs font-bold tracking-widest uppercase">Details</span>
          <span aria-hidden="true" class="text-gray-400 transition-transform duration-200 text-lg" :class="activeAccordion === 'details' ? 'rotate-180' : ''">↓</span>
        </button>
        <div id="product-details" v-show="activeAccordion === 'details'" class="pb-4 text-[13px] text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed text-pretty">
          <p>{{ product.description }}</p>
          <ul class="space-y-1 mt-2">
            <li>Material: {{ product.material }}</li>
            <li>Type: {{ product.productType }}</li>
            <li>{{ product.stock }} pairs listed in stock</li>
          </ul>
        </div>
      </div>

      <div class="border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          class="w-full min-h-12 py-3 flex justify-between items-center group"
          :aria-expanded="activeAccordion === 'shipping'"
          aria-controls="shipping-details"
          @click="toggleAccordion('shipping')"
        >
          <span class="text-xs font-bold tracking-widest uppercase">Shipping & Returns</span>
          <span aria-hidden="true" class="text-gray-400 transition-transform duration-200 text-lg" :class="activeAccordion === 'shipping' ? 'rotate-180' : ''">↓</span>
        </button>
        <div id="shipping-details" v-show="activeAccordion === 'shipping'" class="pb-4 text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed text-pretty">
          Standard shipping is free on orders over Rs 5,000. Returns are accepted within 30 days.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-content-enter-active,
.btn-content-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.btn-content-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.btn-content-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

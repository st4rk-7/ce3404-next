<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useCurrency } from '../composables/useCurrency';

// Define Props
const props = defineProps({
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Array as () => number[],
    default: () => [0, 100]
  }
});

// Emits
const emit = defineEmits(['update:modelValue']);

// Currency formatter
const { formatPrice } = useCurrency();

// State
// Use props directly or local state? Local state better for drag.
const minValue = ref(props.modelValue?.[0] ?? props.min);
const maxValue = ref(props.modelValue?.[1] ?? props.max);

// Track holding state for drag
const isDraggingMin = ref(false);
const isDraggingMax = ref(false);

// Watch for external updates
watch(() => props.modelValue, (newVal) => {
  if (!isDraggingMin.value && !isDraggingMax.value && newVal && newVal.length >= 2) {
    minValue.value = Math.max(props.min, Math.min(newVal[0], maxValue.value));
    maxValue.value = Math.min(props.max, Math.max(newVal[1], minValue.value));
  }
});

// Calculate percentage for positioning
const minPercent = computed(() => {
  return ((minValue.value - props.min) / (props.max - props.min)) * 100;
});

const maxPercent = computed(() => {
  return ((maxValue.value - props.min) / (props.max - props.min)) * 100;
});

// Methods to handle interaction
const updateValue = () => {
  emit('update:modelValue', [minValue.value, maxValue.value]);
};

// Drag handlers (simplified)
const sliderRef = ref<HTMLElement | null>(null);

const handleMouseDown = (thumb: 'min' | 'max') => {
  if (thumb === 'min') isDraggingMin.value = true;
  else isDraggingMax.value = true;
  
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (e: MouseEvent) => {
  if (!sliderRef.value) return;
  
  const rect = sliderRef.value.getBoundingClientRect();
  const percentage = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
  const rawValue = props.min + (percentage / 100) * (props.max - props.min);
  
  // Snap to integer usually better for price
  const value = Math.round(rawValue);

  if (isDraggingMin.value) {
    const newMin = Math.min(value, maxValue.value - 1); // keep 1 unit gap
    minValue.value = Math.max(props.min, newMin);
  } else if (isDraggingMax.value) {
    const newMax = Math.max(value, minValue.value + 1);
    maxValue.value = Math.min(props.max, newMax);
  }
  
  updateValue();
};

const onMouseUp = () => {
  isDraggingMin.value = false;
  isDraggingMax.value = false;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

</script>

<template>
  <div class="w-full px-2 py-4 select-none">
    <!-- Slider Track Container -->
    <div ref="sliderRef" class="relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer">
      
      <!-- Highlight Track -->
      <div 
        class="absolute h-full bg-black dark:bg-white"
        :style="{ left: minPercent + '%', right: (100 - maxPercent) + '%' }"
      ></div>

      <!-- Min Thumb -->
      <div 
        class="absolute top-1/2 -mt-1.5 -ml-1.5 w-3 h-3 bg-white border border-gray-400 dark:bg-black dark:border-gray-500 rounded-full shadow cursor-grab hover:scale-110 transition-transform z-10"
        :style="{ left: minPercent + '%' }"
        @mousedown.stop.prevent="handleMouseDown('min')"
      ></div>

      <!-- Max Thumb -->
      <div 
        class="absolute top-1/2 -mt-1.5 -ml-1.5 w-3 h-3 bg-white border border-gray-400 dark:bg-black dark:border-gray-500 rounded-full shadow cursor-grab hover:scale-110 transition-transform z-10"
        :style="{ left: maxPercent + '%' }"
        @mousedown.stop.prevent="handleMouseDown('max')"
      ></div>

    </div>

    <!-- Labels -->
    <div class="flex justify-between items-center mt-4 text-[10px] uppercase font-bold tracking-widest text-gray-500 dark:text-gray-400">
      <span>{{ formatPrice(minValue) }}</span>
      <span>-</span>
      <span>{{ formatPrice(maxValue) }}</span>
    </div>

    <!-- Range Visuals (Optional - Circles at bottom like screenshot) -->
    <div class="flex justify-between mt-2 px-1">
        <div class="w-2 h-2 rounded-full border border-gray-300 dark:border-gray-600"></div>
        <div class="w-2 h-2 rounded-full border border-gray-300 dark:border-gray-600"></div>
        <div class="w-2 h-2 rounded-full border border-gray-300 dark:border-gray-600"></div>
        <div class="w-2 h-2 rounded-full border border-gray-300 dark:border-gray-600"></div>
        <div class="w-2 h-2 rounded-full border border-gray-300 dark:border-gray-600"></div>
    </div>
  </div>
</template>

<style scoped>
/* Optional specific overrides */
</style>

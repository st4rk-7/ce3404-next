<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { RouterLink } from 'vue-router';

interface Slide {
  subtitle: string;
  headline: string;
  image: string;
}

const slides: Slide[] = [
  {
    subtitle: 'INTRODUCING: VARSITY AIRY',
    headline: 'Fresh Air For Your Feet',
    image: 'https://www.allbirds.com/cdn/shop/files/26Q1_VarsityAiry_Site_Homepage_Hero_Desktop_16x9_v4_022426345.jpg?v=1771960393&width=2560'
  },
  {
    subtitle: 'NO MORE BUSINESS AS USUAL',
    headline: 'Step Into Something New',
    image: 'https://www.allbirds.com/cdn/shop/files/26Q1_Terralux_Site_Homepage_Hero_Desktop_16x9_Mens.jpg?v=1771355695&width=2560'
  }
];

const currentSlide = ref(0);
const isPaused = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1;
};

const startAutoplay = () => {
  timer = setInterval(() => {
    if (!isPaused.value) nextSlide();
  }, 4000);
};

const togglePause = () => {
  isPaused.value = !isPaused.value;
};

onMounted(() => startAutoplay());
onBeforeUnmount(() => { if (timer) clearInterval(timer); });

const currentSlideData = computed(() => slides[currentSlide.value]!);
</script>

<template>
  <div class="relative m-2.5 overflow-hidden rounded text-white" style="height: calc(100vh - 140px);">
    <!-- Slides -->
    <div
      v-for="(slide, index) in slides"
      :key="index"
      :class="[
        'absolute inset-0 transition-opacity duration-1000 ease-in-out',
        currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
      ]"
    >
      <img
        :src="slide.image"
        :alt="slide.headline"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
    </div>

    <!-- Content Overlay -->
    <div class="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 md:pb-28 text-white text-center px-6">
      <p class="text-[10px] md:text-xs font-medium tracking-wider uppercase mb-4 opacity-90">
        {{ currentSlideData.subtitle }}
      </p>
      <h1 class="font-serif text-2xl md:text-[40px] lg:text-5xl leading-8 md:leading-10 tracking-wide mb-8 max-w-2xl">
        {{ currentSlideData.headline }}
      </h1>
      <div class="flex gap-3">
        <RouterLink
          to="/shop?gender=men"
          class="bg-white/80 backdrop-blur-sm text-black text-xs font-medium tracking-wider uppercase px-6 py-3 rounded-full hover:bg-white transition-colors"
        >
          SHOP MEN
        </RouterLink>
        <RouterLink
          to="/shop?gender=women"
          class="border border-white text-white text-xs font-medium tracking-wider uppercase px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
        >
          SHOP WOMEN
        </RouterLink>
      </div>
    </div>

    <!-- Slide Indicators -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
      <button
        v-for="(_, i) in slides"
        :key="i"
        @click="currentSlide = i"
        :class="[
          'w-2 h-2 rounded-full transition-all duration-300',
          currentSlide === i ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
        ]"
      ></button>
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 size-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
      aria-label="Previous slide"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute right-16 md:right-20 top-1/2 -translate-y-1/2 z-20 size-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
      aria-label="Next slide"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </button>

    <!-- Pause Button -->
    <button
      @click="togglePause"
      class="absolute bottom-6 right-6 z-20 size-6 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
    >
      <svg v-if="!isPaused" class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
      </svg>
      <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  </div>
</template>

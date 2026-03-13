<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { usePreferredReducedMotion } from '@vueuse/core';

interface Slide {
  subtitle: string;
  headline: string;
  video: string;
  poster: string;
}

const slides: Slide[] = [
  {
    subtitle: 'THE NEW SEASON COLLECTION',
    headline: 'Fresh Air For Your Feet',
    video: '/banners/hero-wide-1.mp4',
    poster: '/banners/hero-01.jpg'
  },
  {
    subtitle: 'REDEFINE YOUR STRIDE',
    headline: 'Step Into Something New',
    video: '/banners/hero-wide-3.mp4',
    poster: '/banners/hero-02.jpg'
  }
];

const currentSlide = ref(0);
const reducedMotion = usePreferredReducedMotion();
const isPaused = ref(reducedMotion.value === 'reduce');
const activeVideo = ref<HTMLVideoElement | null>(null);

const setSlide = (index: number) => {
  currentSlide.value = (index + slides.length) % slides.length;
};

const selectSlide = (index: number) => {
  setSlide(index);
};

const nextSlide = () => {
  selectSlide(currentSlide.value + 1);
};

const prevSlide = () => {
  selectSlide(currentSlide.value - 1);
};

const togglePause = () => {
  isPaused.value = !isPaused.value;
  if (isPaused.value) {
    activeVideo.value?.pause();
  } else {
    void activeVideo.value?.play();
  }
};

const handleVideoEnd = () => {
  if (!isPaused.value) nextSlide();
};

watch(currentSlide, async () => {
  await nextTick();
  if (!isPaused.value) void activeVideo.value?.play();
});

const currentSlideData = computed(() => slides[currentSlide.value]!);
</script>

<template>
  <div class="relative m-2.5 overflow-hidden rounded text-white" style="height: calc(100vh - 140px);">
    <!-- Slides -->
    <Transition name="hero-fade">
      <div :key="currentSlide" class="absolute inset-0 z-10">
        <video
          ref="activeVideo"
          :src="currentSlideData.video"
          :poster="currentSlideData.poster"
          :autoplay="!isPaused"
          muted
          playsinline
          preload="metadata"
          class="absolute inset-0 w-full h-full object-cover"
          @ended="handleVideoEnd"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
      </div>
    </Transition>

    <!-- Content Overlay -->
    <div class="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 md:pb-28 text-white text-center px-6">
      <p class="text-[10px] md:text-xs font-medium tracking-wider uppercase mb-4 opacity-90">
        {{ currentSlideData.subtitle }}
      </p>
      <h1 class="font-serif text-2xl md:text-[40px] lg:text-5xl leading-8 md:leading-10 tracking-wide mb-8 max-w-2xl text-balance">
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
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-0" aria-label="Choose hero slide">
      <button
        v-for="(_, i) in slides"
        :key="i"
        @click="selectSlide(i)"
        :aria-label="`Show slide ${i + 1}`"
        :aria-current="currentSlide === i ? 'true' : undefined"
        class="size-10 flex items-center justify-center"
      ><span :class="['h-2 rounded-full transition-[width,background-color] duration-300', currentSlide === i ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80 w-2']" /></button>
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
      class="absolute bottom-6 right-6 z-20 size-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
      :aria-label="isPaused ? 'Play hero video' : 'Pause hero video'"
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

<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 700ms cubic-bezier(0.2, 0, 0, 1);
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .hero-fade-enter-active,
  .hero-fade-leave-active { transition-duration: 0.01ms; }
}
</style>

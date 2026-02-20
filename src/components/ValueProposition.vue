<template>
  <section class="px-2.5 mt-16">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5">
      <div
        v-for="val in values"
        :key="val.title"
        class="bg-white rounded p-8 md:p-10 text-center flex flex-col items-center"
      >
        <span class="text-4xl mb-4">{{ val.icon }}</span>
        <!-- Allbirds: font-serif style headings -->
        <h3 class="font-serif text-xl md:text-2xl text-black mb-3">{{ val.title }}</h3>
        <p class="font-sans text-sm text-light-charcoal leading-relaxed max-w-xs">{{ val.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const values = [
  {
    title: 'Wear All Day Comfort',
    description: 'Crafted with premium natural materials for a feel-good fit from morning to night.',
    icon: '☁️'
  },
  {
    title: 'Sustainability In Every Step',
    description: 'We offset 100% of our carbon emissions, because the planet matters.',
    icon: '🌿'
  },
  {
    title: 'Materials From The Earth',
    description: 'Merino wool, eucalyptus tree fiber, and sugarcane — nature knows best.',
    icon: '🌎'
  }
];
</script>

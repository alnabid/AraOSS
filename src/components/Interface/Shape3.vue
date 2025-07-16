<template>
  <div class="shape shape-3">
    <div class="slideshow">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        :class="{ visible: index === activeIndex }"
      >
        <div class="icon">
          <i :class="card.icon"></i>
        </div>
        <p class="notes">{{ card.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const cards = ref([
  {
    icon: 'bi bi-headphones',
    text: 'Turn audio on and use headphones for intended experience.',
  },
  {
    icon: 'bi bi-stickies',
    text: 'Click on Gallery for developer notes.',
  },
  {
    icon: 'bi bi-magic',
    text: 'Check Settings for customization.',
  },
]);

const activeIndex = ref(0);
let interval;

onMounted(() => {
  interval = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % cards.value.length;
  }, 5000); // 5 seconds
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
@import url(@/css/interface.css);

.slideshow {
  position: relative;
  width: 100%;
  height: 100%;
  
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: 'Space Mono';
  font-size: 0.7rem;
  opacity: 50%;
}

.card {
  position: absolute;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  pointer-events: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 200px;
}

.card.visible {
  opacity: 1;
  pointer-events: auto;
}

.icon {
    font-size: 3rem;
}
</style>

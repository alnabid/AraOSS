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
    currently playing {{ currentlyPlaying.name }}
  </div>
</template>

<script>
import audioMixin from '../../mixins/audioMixin';

export default {
  mixins: [audioMixin],
  data() {
    return {
      currentSong: '',
      cards: [
        {
          icon: 'bi bi-headphones',
          text: 'Turn audio on and use headphones for intended experience.',
        },
        {
          icon: 'bi bi-info',
          text: 'Bugs expected, development was rushed.',
        },
        {
          icon: 'bi bi-stickies',
          text: 'Click on Gallery for developer notes.',
        },
        {
          icon: 'bi bi-magic',
          text: 'Check Settings for customization.',
        },
      ],
      activeIndex: 0,
      interval: null,
    };
  },
  method: {

  },
  mounted() {
    this.interval = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.cards.length;
    }, 5000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
@import url(@/css/interface.css);

.slideshow {
  position: relative;
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
  justify-content: center;
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

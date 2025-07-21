<template>
  <div class="shape radio-info">
    <div class="song-title">
        <i class="bi bi-music-note"></i>
        <span>{{ currentlyPlaying.name }}</span>
    </div>

    <div class="controls">
        <div @click="prevSong" class="nav-button">
            <i class="bi bi-skip-backward-fill"></i>
        </div>
        <div @click="togglePause" class="nav-button">
            <i :class="isPaused ? 'bi bi-play-fill' : 'bi bi-pause-fill'"></i>
        </div>
        <div @click="nextSong" class="nav-button">
            <i class="bi bi-skip-forward-fill"></i>
        </div>
    </div>
  </div>
</template>
<script>
import audioMixin from '../mixins/audioMixin';

export default {
  mixins: [audioMixin],
  data() {
    return {
      isPaused: false
    };
  },
  methods: {
    togglePause() {
      const entry = this.audioMap[this.currentAudioKey];
      if (!entry || !entry.audio) return;

      const audio = entry.audio;

      if (audio.paused) {
        audio.play();
        this.isPaused = false;
      } else {
        audio.pause();
        this.isPaused = true;
      }
    },
    nextSong() {
      this.isPaused = false;
      this.$options.mixins[0].methods.nextSong.call(this);
    },
    prevSong() {
      this.isPaused = false;
      this.$options.mixins[0].methods.prevSong.call(this);
    }
  }
};
</script>

<style scoped>
span {
  padding: 0 0.5rem;
}
.Deeppink span {
  color: var(--deeppink-2);
}
.Grass span {
  color: var(--grass-2);
}
.Night span {
  color: var(--night-2);
}

.radio-info {
    flex-direction: column;
    gap: 0.5rem;
}
.controls {
    display: flex;
    gap: 0.5rem;
    font-size: 0.9rem;
}
</style>

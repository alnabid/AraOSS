<template>
    <div v-if="show" class="overlay-container">
      <!-- Back button -->
      <div class="back-button" @click="$emit('close')">← Back</div>

      <!-- Start button overlay -->
      <div v-if="!gameStarted" class="start-overlay">
        <button class="start-btn" @click="startButtonClicked">Start</button>
      </div>

      <!-- Game UI only shows after start -->
      <div v-else>
        <!-- Static note pads -->
        <div class="note-row">
          <div
            v-for="key in keys"
            :key="key"
            :class="[
              'note',
              { active: activeKey === key },
              { missed: missedKey === key }
            ]"
          >
            {{ key.toUpperCase() }}
          </div>
        </div>

        <!-- Feedback -->
        <div class="feedback" v-if="feedback">{{ feedback }}</div>

        <!-- Game Over with stats -->
        <div class="game-over" v-if="gameOver">
          Game Over<br />
          Hits: {{ hitCount }}<br />
          Misses: {{ missCount }}
          <br />
          <button class="restart-btn" @click="restartGame">Restart</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      gameStarted: false,
      keys: ['w', 'a', 's', 'd'],
      chart: [
        { key: 'a', time: 1000, window: 300 },
        { key: 's', time: 2000, window: 200 },
        { key: 'd', time: 3000, window: 400 },
        { key: 'w', time: 4000, window: 250 },
      ],
      activeKey: null,
      missedKey: null,
      missedNotes: new Set(),
      currentNoteIndex: 0,
      startTime: null,
      feedback: '',
      audio: null,
      gameOver: false,
      hitCount: 0,
      missCount: 0,
    };
  },
  watch: {
    show(newVal) {
      if (!newVal) {
        this.stopGame();
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKey);
    this.stopGame();
  },
  methods: {
    startButtonClicked() {
      this.gameStarted = true;
      this.startGame();
    },
    startGame() {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
      this.audio = new Audio('/track.mp3');
      this.audio.play().catch(() => {});

      this.startTime = performance.now();
      this.gameOver = false;
      this.hitCount = 0;
      this.missCount = 0;
      this.currentNoteIndex = 0;
      this.missedNotes.clear();
      this.activeKey = null;
      this.missedKey = null;
      this.feedback = '';

      requestAnimationFrame(this.tick);
    },
    restartGame() {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
      this.startGame();
    },
    stopGame() {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
      this.gameStarted = false;
      this.gameOver = false;
      this.feedback = '';
      this.activeKey = null;
      this.missedKey = null;
      this.currentNoteIndex = 0;
      this.missedNotes.clear();
      this.hitCount = 0;
      this.missCount = 0;
    },
    tick(timestamp) {
      if (this.gameOver || !this.gameStarted) return;

      const elapsed = timestamp - this.startTime;
      const note = this.chart[this.currentNoteIndex];

      if (!note) {
        this.activeKey = null;
        this.gameOver = true;
        return;
      }

      if (this.missedNotes.has(this.currentNoteIndex)) {
        this.activeKey = null;
        requestAnimationFrame(this.tick);
        return;
      }

      if (elapsed >= note.time - note.window && elapsed <= note.time + note.window) {
        this.activeKey = note.key;
      } else if (elapsed > note.time + note.window) {
        this.missCurrentNote();
      }

      requestAnimationFrame(this.tick);
    },
    missCurrentNote() {
      const note = this.chart[this.currentNoteIndex];
      if (!note) return;

      this.missedNotes.add(this.currentNoteIndex);
      this.activeKey = null;
      this.missedKey = note.key;
      this.feedback = 'Miss';
      this.missCount++;

      setTimeout(() => {
        this.missedKey = null;
        this.feedback = '';
        this.currentNoteIndex++;
      }, 200);
    },
    handleKey(e) {
      if (this.gameOver || !this.gameStarted) return;

      const key = e.key.toLowerCase();
      const note = this.chart[this.currentNoteIndex];
      const now = performance.now() - this.startTime;

      if (!note) return;

      if (this.missedNotes.has(this.currentNoteIndex)) {
        return;
      }

      if (key === note.key && Math.abs(note.time - now) < note.window) {
        this.feedback = 'Hit!';
        this.activeKey = null;
        this.currentNoteIndex++;
        this.hitCount++;
      } else {
        this.missCurrentNote();
      }

      setTimeout(() => (this.feedback = ''), 300);
    },
  },
};
</script>

<style scoped>
.overlay-container {
  position: fixed;
  inset: 0;
  background: black;
  color: white;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  top: 0;
  left: 0;
}

.back-button {
  position: absolute;
  z-index: 100;
  top: 20px;
  left: 20px;
  background: #333;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}

.note-row {
  display: flex;
  gap: 20px;
}

.note {
  width: 80px;
  height: 80px;
  background: #444;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: background 0.1s;
}

.note.active {
  background: red;
  color: white;
}

.note.missed {
  background: purple;
  color: white;
}

.feedback {
  margin-top: 30px;
  font-size: 28px;
  color: yellow;
}

.game-over {
  margin-top: 20px;
  font-size: 24px;
  color: lightgreen;
  white-space: pre-line;
  text-align: center;
}

.restart-btn {
  margin-top: 12px;
  padding: 8px 16px;
  font-size: 18px;
  cursor: pointer;
  background-color: #444;
  color: white;
  border: 2px solid white;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.restart-btn:hover {
  background-color: #666;
}

/* Start button styles */
.start-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.start-btn {
  font-size: 28px;
  padding: 20px 50px;
  cursor: pointer;
  border: 3px solid white;
  border-radius: 10px;
  background-color: #222;
  color: white;
  transition: background-color 0.3s;
}

.start-btn:hover {
  background-color: #555;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

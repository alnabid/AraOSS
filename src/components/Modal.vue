<template>
  <div v-if="visible" class="modal-container">
    <div class="modal-content">
      <h1>{{ currentContent.header }}</h1>
      <p>{{ currentContent.note }}</p>
      <i v-if="!isLast" class="bi bi-caret-down"></i>
    </div>
    <div class="keybinds">
      <h2>Keybinds</h2>
      <div class="instructions">
        <div v-if="currentIndex > 0" class="block">
          <div class="keys">
            <div class="key"><i class="bi bi-mouse2"></i> Right Click</div>
            <div class="key">Q</div>
          </div>
          <div class="action">
            Back
          </div>
        </div>
        <div class="block">
          <div class="keys">
            <div class="key"><i class="bi bi-mouse2"></i> Middle Click</div>
            <div class="key">Space</div>
          </div>
          <div class="action">
            Close
          </div>
        </div>
        <div v-if="!isLast" class="block">
          <div class="keys">
            <div class="key"><i class="bi bi-mouse2"></i> Left Click</div>
            <div class="key">E</div>
          </div>
          <div class="action">
            Next
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="visible" class="modal-overlay"></div>
</template>

<script>
import audioMixin from '../mixins/audioMixin';
export default {
  mixins: [audioMixin],
  data() {
    return {
      visible: false,
      contents: [],
      currentIndex: 0,
    };
  },
  computed: {
    hasMultiple() {
      return this.contents.length > 1;
    },
    currentContent() {
      return this.contents[this.currentIndex] || { header: '', note: '' };
    },
    isLast() {
      return this.currentIndex === this.contents.length - 1;
    }
  },
  methods: {
    open(contents) {
      this.contents = contents;
      this.currentIndex = 0;
      this.visible = true;
      window.addEventListener('keydown', this.handleKey);
      window.addEventListener('mousedown', this.handleMouse);
    },
    close() {
      this.visible = false;
      this.contents = [];
      this.currentIndex = 0;
      window.removeEventListener('keydown', this.handleKey);
      window.removeEventListener('mousedown', this.handleMouse);
      this.playAudio('click')
    },
    nextOrClose() {
      if (this.isLast) {
        // this.close();
      } else {
        this.currentIndex++;
        this.playAudio('click')
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.playAudio('click')
      } else {
        // this.close();
      }
    },
    handleKey(e) {
      if (!this.visible) return;

      switch (e.key.toLowerCase()) {
        case 'e':
          this.nextOrClose();
          break;
        case 'q':
          this.prev();
          break;
        case ' ':
          e.preventDefault();  // prevent browser navigating back
          this.close();
          break;
      }
    },
    handleMouse(e) {
    if (!this.visible) return;

    // e.button: 0 = left, 2 = right
    switch (e.button) {
      case 0: // Left click
        this.nextOrClose();
        break;
      case 2: // Right click
        e.preventDefault(); // optional, to prevent context menu
        this.prev();
        break;
      case 1:
        e.preventDefault();
        this.close();
        break;
    }
  }
  }
};
</script>


<style scoped>
.modal-container, .modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  /* background-color: rgba(0,0,0,0.5); */
  display: flex; align-items: center; justify-content: center;
  flex-direction: column;
}
.modal-overlay {
  background: rgba(73, 0, 35, 0.263);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}
.modal-container {
  z-index: 1;
}
.modal-content {
  background: #efffae;
  width: 400px;
  text-align: center;
  border: 3px solid #ff5384d2;
  margin-bottom: 7rem;
  position: relative;
}
.modal-content i {
  position: absolute;
  bottom: -2rem;
  width: 100%;
  left: 0;
  color: white;
}
.buttons {
  margin-top: 20px;
}
.buttons button {
  margin: 0 10px;
  padding: 6px 14px;
  font-size: 1rem;
}
.modal-content h1 {
  font-family: 'Space Mono';
  text-transform: uppercase;
  font-size: 1rem;
  background: #ff5384d2;
  padding: 0.5rem;
  color: white;
}
.modal-content p {
  font-family: 'Space Mono';
  min-height: 100px;
  display: inline-flex;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.8rem;
}
</style>

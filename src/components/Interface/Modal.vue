<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h1>{{ currentContent.header }}</h1>
      <p>{{ currentContent.note }}</p>

      <div class="buttons">
        <button @click="close">Close</button>
        <button v-if="hasMultiple && currentIndex > 0" @click="prev">Back</button>
        <button v-if="hasMultiple" @click="nextOrClose">
          {{ isLast ? 'Close' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    },
    close() {
      this.visible = false;
      this.contents = [];
      this.currentIndex = 0;
      window.removeEventListener('keydown', this.handleKey);
    },
    nextOrClose() {
      if (this.isLast) {
        this.close();
      } else {
        this.currentIndex++;
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
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
        case 'backspace':
          e.preventDefault();  // prevent browser navigating back
          this.close();
          break;
      }
    }
  }
};
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
}
.modal-content {
  background: white; padding: 20px; border-radius: 12px;
  max-width: 400px; width: 90%;
  text-align: center;
}
.buttons {
  margin-top: 20px;
}
.buttons button {
  margin: 0 10px;
  padding: 6px 14px;
  font-size: 1rem;
}
</style>

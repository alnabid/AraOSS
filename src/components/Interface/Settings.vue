<template>
  <div class="settings-container">
    <button class="close-btn" @click="$emit('closeSettings')">← Back</button>
    <section class="settings-section">
      <div
        class="setting"
        v-for="(setting, i) in settings"
        :key="i"
        @click="cycleOption(i)"
      >
        <div class="name">{{ setting.name }}</div>
        <div class="active-option">{{ setting.options[setting.currentIndex] }}</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    settings: {
      type: Array,
      required: true,
    },
  },
  methods: {
    cycleOption(index) {
      const setting = this.settings[index];
      setting.currentIndex = (setting.currentIndex + 1) % setting.options.length;
      this.$emit('playClick');

      const selectedValue = setting.options[setting.currentIndex];

      if (setting.name === 'Audio') {
        if (selectedValue === 'On') {
          this.$emit('unmuteAudio');
        } else if (selectedValue === 'Off') {
          this.$emit('muteAudio');
          console.log('pong');
        }
      }
    },
  },
};
</script>

<style scoped>
/* same styles as before */
.settings-container {
  padding: 2rem;
  background: #1a1a1a;
  color: #ff5577;
  font-family: 'Space Mono', monospace;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  color: #ff5577;
  font-size: 1.2rem;
  cursor: pointer;
  margin-bottom: 1rem;
  align-self: flex-start;
}

.settings-section .setting {
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  border: 1px solid rgba(255, 83, 132, 0.6);
  border-radius: 0.3rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}
.settings-section .setting:hover {
  background-color: rgba(255, 83, 132, 0.3);
}

.name {
  font-weight: bold;
}

.active-option {
  font-style: italic;
  color: #ffaad3;
}
</style>

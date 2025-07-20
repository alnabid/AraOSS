<template>
  <div class="settings-container" tabindex="0">
    <section class="settings-section">
      <div
        v-for="(setting, i) in settings"
        :key="i"
        class="setting"
        :class="{ selected: selectedIndex === i }"
        @click="cycleOption(i)"
        @mouseenter="() => {
          if (selectedIndex !== i) {
            this.$emit('playSelect');
            selectedIndex = i;
          }
        }"
      >
        <div class="name">{{ setting.name }}</div>
        <div class="active-option">{{ setting.options[setting.currentIndex] }}</div>
      </div>
    </section>
    <button class="close-btn" @click="()=>{$emit('playClose'); $emit('closeSettings')}">Done</button>
      <div class="keybinds">
      <h2>Keybinds</h2>
      <div class="instructions">
        <div class="block">
          <div class="keys">
            <div class="key"><i class="bi bi-mouse2"></i> Move Mouse</div>
            <div class="key">W</div>
            <div class="key">S</div>
          </div>
          <div class="action">
            Select Settings
          </div>
        </div>
        <div class="block">
          <div class="keys">
            <div class="key"><i class="bi bi-mouse2"></i> Left Click</div>
            <div class="key">A</div>
            <div class="key">D</div>
          </div>
          <div class="action">
            Toggle Settings Options
          </div>
        </div>
        <div class="block">
          <div class="keys">
            <div class="key"><i class="bi bi-mouse2"></i> Middle Click</div>
            <div class="key">Space</div>
          </div>
          <div class="action">
            Done
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus';

export default {
  props: {
    settings: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedIndex: 0,
    };
  },
  methods: {
    cycleOption(index, direction = 1) {
      const setting = this.settings[index];
      setting.currentIndex =
        (setting.currentIndex + direction + setting.options.length) %
        setting.options.length;
      this.$emit('playClick');

      const selectedValue = setting.options[setting.currentIndex];

      if (setting.name === 'Theme') {
        if (selectedValue === 'Deeppink') {
          eventBus.emit('theme-change', selectedValue)
        } else if (selectedValue === 'Grass') {
          eventBus.emit('theme-change', selectedValue)
        } else if (selectedValue === 'Night') {
          eventBus.emit('theme-change', selectedValue)
        }
      }

      if (setting.name === 'Window') {
        if (selectedValue === 'Maximized') {
          window.electronAPI.maximizeApp();
        } else if (selectedValue === 'Windowed') {
          window.electronAPI.restoreApp();
        } else if (selectedValue === 'Full Screen') {
          window.electronAPI.fullscreenApp();
        }
      }

      if (setting.name === 'Audio') {
        if (selectedValue === 'On') {
          this.$emit('unmuteAudio');
          localStorage.setItem('openSettingsAfterReload', 'true');
          window.location.reload();
          localStorage.setItem('audioMuted', 'false');
        } else if (selectedValue === 'Off') {
          this.$emit('muteAudio');
          localStorage.setItem('audioMuted', 'true');
        }
      }
    },
    handleKey(e) {
      const key = e.key.toLowerCase();

      switch (key) {
        case 'w':
          this.selectedIndex =
            (this.selectedIndex - 1 + this.settings.length) % this.settings.length;
          this.$emit('playSelect')
          break;
        case ' ':
          e.preventDefault();
          this.$emit('closeSettings');
          break;
        case 's':
          this.selectedIndex = (this.selectedIndex + 1) % this.settings.length;
          this.$emit('playSelect')
          break;
        case 'a':
        case 'd':
          const dir = key === 'a' ? -1 : 1;
          if (this.selectedIndex >= 0 && this.selectedIndex < this.settings.length) {
            this.cycleOption(this.selectedIndex, dir);
          }
          break;
      }
    },
    handleMouse(e) {
      switch (e.button) {
        case 1:
          e.preventDefault();
          this.$emit('closeSettings');
          break;
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKey);
    window.addEventListener('mousedown', this.handleMouse);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKey);
    window.removeEventListener('mousedown', this.handleMouse);
  },
};
</script>

<style scoped>
.settings-container {
  padding: 2rem;
  color: #ffffff;
  font-family: 'Space Mono', monospace;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  outline: none;
  position: relative;
}

.close-btn {
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-family: 'Space Mono';
  padding: 0.5rem 1rem;
  align-self: flex-end;
}

.Deeppink .close-btn {
  background: var(--deeppink-1);
}
.Grass .close-btn {
  background: var(--grass-1);
}
.Night .close-btn {
  background: var(--night-1);
}


.settings-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.settings-section .setting {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

.Deeppink .settings-section .setting {
  color: var(--deeppink-1);
}
.Grass .settings-section .setting {
  color: var(--grass-1);
}
.Night .settings-section .setting {
  color: var(--night-1);
}
.name {
  font-weight: bold;
}

.active-option {
  color: #ffffff;
}

.setting.selected {
  outline: 0;
}
.Deeppink .setting.selected {
  background-color: var(--deeppink-2);
}
.Grass .setting.selected {
  background-color: var(--grass-2);
}
.Night .setting.selected {
  background-color: var(--night-2);
}


.setting.selected .active-option {
  color: var(--black);
}

.keybinds {
  position: absolute;
  bottom: -8rem;
}
.keybinds .instructions {
  flex-wrap: wrap;
  gap: 1rem 2rem;
}
</style>

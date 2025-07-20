<template>
  <div class="shape shape-2" tabindex="0" @keydown="handleKey">
    <!-- Main links menu -->
    <div v-if="!showSettings" class="links">
      <div
        @mouseenter="playAudio('hover')"
        @click="() => { playAudio('click'); openGame() }"
        class="link"
      >
        <span>S</span>ta<span>rt</span>
        <div class="bg"></div>
      </div>
      <div
        @mouseenter="playAudio('hover')"
        @click="()=>{playAudio('click'); openLibrary()}"
        class="link"
      >
        Li<span>bra</span>ry
        <div class="bg"></div>
      </div>

      <!-- Settings toggle -->
      <div @mouseenter="playAudio('hover')" @click="openSettings" class="link">
        S<span>et</span>t<span>in</span>gs
        <div class="bg"></div>
      </div>

      <div class="notes">
        25 <div class="horline"></div> DEM0 22/07
      </div>
      <div
        @mouseenter="playAudio('hover')"
        @click="()=>{playAudio('click'); exitApp()}"
        class="link"
      >
        e<span>x</span>it
        <div class="bg"></div>
      </div>
    </div>

    <!-- Settings overlay UI inside same component -->
    <Settings
      v-if="showSettings"
      :settings="settings"
      :selectedIndex="selectedIndex"
      @update:selectedIndex="val => selectedIndex = val"
      @closeSettings="closeSettings"
      @playClick="playAudio('click')"
      @muteAudio="muteAudio('all')"
      @unmuteAudio="unmuteAudio('all')"
    />
  </div>
</template>

<script>
import audioMixin from '@/mixins/audioMixin';
import routeMixin from '@/mixins/routeMixin';
import Settings from '@/components/Settings.vue';
import Modal from './Modal.vue';
import { eventBus } from '@/eventBus';

export default {
  mixins: [audioMixin, routeMixin],
  components: {
    Settings,
    Modal,
  },
  data() {
    return {
      showSettings: false,
      settings: [
        {
          name: 'Window',
          options: ['Maximized', 'Windowed', 'Full Screen'],
          currentIndex: 0,
        },
        {
          name: 'Audio',
          options: ['On', 'Off'],
          currentIndex: 0,
        },
      ],
      selectedIndex: 0,
    };
  },
  methods: {
    exitApp() {
      window.electronAPI.exitApp();
    },
    openSettings() {
      this.playAudio('click');
      this.showSettings = true;
      this.selectedIndex = 0; // reset selection on open
    },
    closeSettings() {
      this.playAudio('click');
      this.showSettings = false;
    },
    openGame() {
      eventBus.emit('open-modal', [
        { header: 'Start', note: "There's nothing here..." },
        { header: 'Start', note: 'I was on low budget' },
        { header: 'And..', note: 'and low time' },
        { header: 'And..', note: 'and i suck at coding' },
        { header: 'sorry', note: '...' },
        { header: 'or perhaps', note: 'maybe...' },
        { header: 'or perhaps', note: 'maybe next time' },
        { header: 'or perhaps', note: '(no promises)' },
      ]);
    },
    openLibrary() {
      eventBus.emit('open-library');
    },
    applyWindowSetting() {
      const windowSetting = this.settings.find((s) => s.name === 'Window');
      if (!windowSetting) return;
      const value = windowSetting.options[windowSetting.currentIndex];
      if (value === 'Maximized') window.electronAPI.maximizeApp();
      else if (value === 'Windowed') window.electronAPI.restoreApp();
      else if (value === 'Full Screen') window.electronAPI.fullscreenApp();
    },
    async loadSettings() {
      const savedSettings = await window.electronAPI.loadSettings();
      if (savedSettings) {
        this.settings.forEach((setting, i) => {
          if (
            savedSettings[i] &&
            typeof savedSettings[i].currentIndex === 'number'
          ) {
            this.settings[i].currentIndex = savedSettings[i].currentIndex;
          }
        });
      }
      this.applyWindowSetting();
    },
    saveSettingsBeforeClose() {
      window.electronAPI.saveSettings(JSON.parse(JSON.stringify(this.settings)));
    },
  },
  watch: {
    settings: {
      deep: true,
      handler() {
        window.electronAPI.saveSettings(JSON.parse(JSON.stringify(this.settings)));
        this.applyWindowSetting();
      },
    },
  },
  created() {
    this.loadSettings();
    window.addEventListener('beforeunload', this.saveSettingsBeforeClose);

    if (localStorage.getItem('openSettingsAfterReload') === 'true') {
      this.showSettings = true;
      localStorage.removeItem('openSettingsAfterReload');
    }
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.saveSettingsBeforeClose);
  },
};
</script>

<style scoped>
@import url(@/css/interface.css);

/* Keep your existing styles here */
.links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 2rem;
}
.links .link {
  outline: 1px solid var(--primary-pink);
  color: var(--primary-pink);;
  width: fit-content;
  font-size: 1.5rem;
  padding: 0.5rem 8rem 0.2rem 1rem;
  border-radius: 0.2rem;
  font-family: 'Space Mono';
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
}
.links .link span {
  font-family: 'Space Mono';
}
.notes {
  font-family: 'Space Mono';
  display: flex;
  margin: 2rem 0;
  font-size: 0.6rem;
  gap: 0.5rem;
  color: var(--primary-pink);
  align-items: center;
}
.notes .horline {
  width: 100px;
  height: 1rem;
  background: var(--secondary-pink);
  border-radius: 2rem;
}
.links .link:hover {
  color: white;
}
.links .link .bg {
  width: 0%;
  height: 100%;
  background: rgba(255, 83, 132, 0.863);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  transition: 0.3s;
}
.links .link:hover .bg {
  width: 100%;
}
</style>

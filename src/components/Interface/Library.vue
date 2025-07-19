<template>
  <section v-if="visible">
    <div class="container">
      <!-- Top: Tabs + Keybind Info -->
      <div class="top">
        <div class="tabs">
          <div class="tab" :class="{ active: currentTab === 'Videos' }" @click="switchTab('Videos')">Videos</div>
          <div class="tab" :class="{ active: currentTab === 'Music' }" @click="switchTab('Music')">Music</div>
          <div class="tab" :class="{ active: currentTab === 'Notes' }" @click="switchTab('Notes')">Notes</div>
        </div>
        <div class="keybinds">Keybinds: Q = Back | E = Next | Backspace = Close</div>
      </div>

      <!-- Main: Left (Items) & Right (Content) -->
      <div class="main">
        <div class="table">
          <div
            class="item"
            v-for="(_, index) in 2"
            :key="index"
            :class="{ selected: selectedIndex === index }"
            @click="selectItem(index)"
          >
            <div class="number">{{ index + 1 }}</div>
            Item {{ index + 1 }}
          </div>
          <div class="close-btn" @click="close()">
            Close
          </div>
        </div>

        <div class="content">
          <!-- === Videos === -->
          <div v-if="currentTab === 'Videos' && selectedIndex === 0">
            <video src="" controls></video>
            <p>This is the first video description.</p>
          </div>
          <div v-if="currentTab === 'Videos' && selectedIndex === 1">
            <img src="" alt="Thumbnail" />
            <video src="" controls></video>
            <p>This is the second video with a preview thumbnail above.</p>
          </div>

          <!-- === Music === -->
          <div v-if="currentTab === 'Music' && selectedIndex === 0">
            <img src="" alt="Album Art" />
            <audio controls src="song1.mp3"></audio>
            <p>Track 1 — Chill vibes with ambient tones.</p>
          </div>
          <div v-if="currentTab === 'Music' && selectedIndex === 1">
            <div class="music-block">
              <p class="track-name">Track 2: Synthwave Dreams</p>
              <audio controls src=""></audio>
              <img src="" alt="Album Art 2" />
              <p>Experience 80s-inspired retro sounds.</p>
            </div>
          </div>

          <!-- === Notes === -->
          <div v-if="currentTab === 'Notes' && selectedIndex === 0">
            <p class="note-title">Reminder: Meeting Notes</p>
            <div class="note-content">
              <ul>
                <li>Project deadline: Aug 5</li>
                <li>Client feedback to be incorporated</li>
              </ul>
            </div>
          </div>
          <div v-if="currentTab === 'Notes' && selectedIndex === 1">
            <p class="note-title">Checklist</p>
            <div class="note-content">
              <input type="checkbox" checked /> Write code<br />
              <input type="checkbox" /> Test functionality<br />
              <input type="checkbox" /> Deploy to production
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import audioMixin from '../../mixins/audioMixin';

export default {
  mixins: [audioMixin],
  data() {
    return {
      visible: false,
      currentTab: 'Videos',
      selectedIndex: 0,
      tabs: ['Videos', 'Music', 'Notes']
    };
  },
  methods: {
    open() {
      this.visible = true;
      document.addEventListener('keydown', this.handleKey);
      document.addEventListener('mousedown', this.handleMouse);
    },
    close() {
      this.visible = false;
      this.playAudio('click')
      document.removeEventListener('keydown', this.handleKey);
      document.removeEventListener('mousedown', this.handleMouse);
    },
    switchTab(tab) {
      this.currentTab = tab;
      this.selectedIndex = 0;
      this.playAudio('click')
    },
    selectItem(index) {
      this.selectedIndex = index;
      this.playAudio('click')
    },
    handleKey(e) {
      if (!this.visible) return;

      const currentTabIndex = this.tabs.indexOf(this.currentTab);

      switch (e.key) {
        case 'e':
        case 'E':
            if (this.selectedIndex < 1) {
                this.selectedIndex++;
                this.playAudio('click');
            }
            break;
        case 'q':
        case 'Q':
            if (this.selectedIndex > 0) {
                this.selectedIndex--;
                this.playAudio('click');
            }
            break;
        case 'Tab':
            e.preventDefault(); // prevent focus hijacking
            const nextTabIndex = (currentTabIndex + 1) % this.tabs.length;
            this.switchTab(this.tabs[nextTabIndex]);
            break;

        case ' ':
        case 'Backspace':
            this.close();
            break;
      }
    },
    handleMouse(e) {
        if (!this.visible) return;

        switch (e.button) {
            case 1:
                this.close()
                break;
        }

    }
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }
};
</script>

<style scoped>
section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  padding: 1rem;
}

.tabs {
  display: flex;
  gap: 1rem;
}

.tab {
  padding: 0.5rem 1rem;
  background: #333;
  border-radius: 4px;
  cursor: pointer;
}

.tab.active {
  background: #555;
  font-weight: bold;
}

.keybinds {
  font-size: 0.9rem;
  color: #bbb;
}

.main {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.table {
  width: 30%;
  background: #1a1a1a;
  overflow-y: auto;
}

.item {
  padding: 0.8rem;
  border-bottom: 1px solid #333;
  cursor: pointer;
}

.item.selected {
  background: #333;
}

.number {
  font-weight: bold;
}

.content {
  width: 70%;
  padding: 1rem;
  background: #1e1e1e;
  overflow-y: auto;
}

.content img,
.content video,
.content audio {
  max-width: 100%;
  margin-bottom: 1rem;
  border-radius: 8px;
}

.note-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.note-content {
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 6px;
}

.music-block {
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 6px;
}

.track-name {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>

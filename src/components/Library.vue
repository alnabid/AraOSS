<template>
  <section v-if="visible">
    <div class="keybinds">
      <h2>Keybinds</h2>
      <div class="instructions">
        <div class="block">
          <div class="keys">
            <div class="key">Space</div>
          </div>
          <div class="action">
            Close
          </div>
        </div>
        <div class="block">
          <div class="keys">
            <div class="key">W</div>
            <div class="key">S</div>
          </div>
          <div class="action">
            Select Item
          </div>
        </div>
        <div class="block">
          <div class="keys">
            <div class="key">TAB</div>
          </div>
          <div class="action">
            Switch tabs
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <!-- Top: Tabs + Keybind Info -->
      <div class="top">
        <div class="tabs">
          <div class="tab" :class="{ active: currentTab === 'Videos' }" @click="switchTab('Videos')">Videos</div>
          <div class="tab" :class="{ active: currentTab === 'Music' }" @click="switchTab('Music')">Music</div>
          <div class="tab" :class="{ active: currentTab === 'Notes' }" @click="switchTab('Notes')">Notes</div>
        </div>
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
        </div>

        <div class="right">
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
          <div class="close-btn" @click="close()">
            Close
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import audioMixin from '../mixins/audioMixin';

export default {
  mixins: [audioMixin],
  data() {
    return {
      visible: false,
      currentTab: 'Music',
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
        case 's':
        case 'S':
            if (this.selectedIndex < 1) {
                this.selectedIndex++;
                this.playAudio('click');
            }
            break;
        case 'w':
        case 'W':
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
  color: white;  
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Space Mono';
  backdrop-filter: blur(5px);
}
.Deeppink section {
  background: rgba(73, 0, 35, 0.263);
}
.Grass section {
  background: rgba(0, 73, 7, 0.263);
}
.Night section {
  background: rgba(49, 0, 73, 0.263);
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.top {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.tabs {
  display: flex;
  gap: 3rem;
}

.tab {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  text-transform: uppercase;
}

.tab.active {
  font-weight: bold;
}
.Deeppink .tab.active {
  background: var(--deeppink-1);
}
.Grass .tab.active {
  background: var(--grass-1);
}
.Night .tab.active {
  background: var(--night-1);
}

.main {
  width: 80%;
  margin: auto;
  display: flex;
  align-items: start;
  height: fit-content;
  overflow: hidden;
  margin-top: 3rem;
  gap: 1rem;
}

.table {
  width: 30%;
  overflow-y: auto;
  height: 250px;
}

.item {
  display: flex;
  gap: 1rem;
  padding: 0.8rem;
  cursor: pointer;
  color: white;
}

.Deeppink .item.selected {
  background: var(--deeppink-1);
}
.Grass .item.selected {
  background: var(--grass-1);
}
.Night .item.selected {
  background: var(--night-1);
}

.number {
  font-weight: bold;
}

.right {
  display: flex;
  flex-direction: column;
  width: 70%;
}

.content {
  width: 100%;
  padding: 1rem;
  color: var(--black);
  overflow-y: auto;
  height: 350px;
}
.Deeppink .content {
  background: var(--deeppink-2);
  border: 3px solid var(--deeppink-1);
}
.Grass .content {
  background: var(--grass-2);
  border: 3px solid var(--grass-1);
}
.Night .content {
  background: var(--night-2);
  border: 3px solid var(--night-1);
}

.close-btn {
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  width: fit-content;
  margin: 1rem 0;
  align-self: flex-end;
  cursor: pointer;
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

</style>

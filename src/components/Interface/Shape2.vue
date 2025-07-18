<template>
  <div class="shape shape-2">
    <!-- Main links menu -->
    <div v-if="!showSettings && !showGame" class="links">
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
            @click="playAudio('click')"
            class="link"
        >
            Ga<span>lle</span>ry
            <div class="bg"></div>
        </div>

        <!-- Settings toggle -->
        <div
            @mouseenter="playAudio('hover')"
            @click="openSettings"
            class="link"
        >
            S<span>et</span>t<span>in</span>gs
            <div class="bg"></div>
        </div>

        <div class="notes">
            25 <div class="horline"></div> DEM0 22/07
        </div>
        <div
            @mouseenter="playAudio('hover')"
            @click="playAudio('click')"
            class="link"
        >
            Cr<span>ed</span>its
            <div class="bg"></div>
        </div>
        </div>
    </div>

    <!-- Settings overlay UI inside same component -->
    <Settings
    v-if="showSettings"
    :settings="settings"
    @closeSettings="closeSettings"
    @playClick="playAudio('click')"
    @muteAudio="muteAudio('all')"
    @unmuteAudio="unmuteAudio('all')"
    />

  <GameComponent :show="showGame" @close="showGame = false" />
</template>

<script>
import audioMixin from '@/mixins/audioMixin';
import routeMixin from '@/mixins/routeMixin';
import Settings from '@/components/Interface/Settings.vue'; // Adjust path as needed
import GameComponent from './Game.vue';

export default {
  mixins: [audioMixin, routeMixin],
  components: {
    Settings, GameComponent 
  },
  data() {
    return {
      showSettings: false,
      showGame: false,
      settings: [
        {
          name: 'Dummy Setting 1',
          options: ['Option A', 'Option B', 'Option C'],
          currentIndex: 0,
        },
        {
          name: 'Audio',
          options: ['On', 'Off'],
          currentIndex: 0,
        },
      ],
    };
  },
  methods: {
    openSettings() {
      this.playAudio('click');
      this.showSettings = true;
    },
    closeSettings() {
      this.playAudio('click');
      this.showSettings = false;
    },
    openGame() {
      this.playAudio('click');
      this.showGame = true;
    },
    closeGame() {
      this.showGame = false;
    },
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
  outline: 1px solid rgba(255, 10, 108, 0.418);
  color: rgba(255, 83, 132, 0.822);
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
  font-family: 'Michroma';
}
.notes {
  font-family: 'zen dots';
  display: flex;
  margin: 2rem 0;
  font-size: 0.8rem;
  gap: 0.5rem;
  color: rgba(255, 62, 126, 0.256);
  align-items: center;
}
.notes .horline {
  width: 100px;
  height: 1rem;
  background: rgb(222, 91, 102);
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

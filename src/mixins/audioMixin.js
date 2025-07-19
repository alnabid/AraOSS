// @/mixins/audioMixin.js
import { ref } from 'vue';
import { audioMap } from '@/utils/globalAudio';

const currentAudioKey = ref(null);
const currentlyPlaying = ref('none');

export default {
  data() {
    return {
      audioMap,
      audioMuted: localStorage.getItem('audioMuted') === 'true'
    };
  },

  computed: {
    currentAudioKey() {
      return currentAudioKey.value;
    },
    currentlyPlaying() {
      const key = currentlyPlaying.value;
      return this.audioMap[key] || { name: 'None' };
    }
  },


  methods: {
    playAudio(key, loop = false) {
      if (this.audioMuted) return;

      const entry = this.audioMap[key];
      if (!entry || !entry.audio) return;

      const audio = entry.audio;

      if (audio.muted) {
        console.log(`audio skipped: ${key} is muted`);
        return;
      }

      const newType = entry.type;
      const prevKey = currentAudioKey.value;
      const prevEntry = this.audioMap[prevKey];

      // Only stop previous audio if it's the same type (e.g., music replacing music)
      if (
        prevKey &&
        prevKey !== key &&
        prevEntry &&
        prevEntry.type === newType &&
        !prevEntry.persistent
      ) {
        const prevAudio = prevEntry.audio;
        prevAudio.pause();
        prevAudio.currentTime = 0;
      }

      audio.volume = entry.volume ?? 1;
      audio.currentTime = 0;
      audio.loop = loop;

      audio.play();

      // Only update currentlyPlaying if it's music
      if (newType === 'music') {
        currentAudioKey.value = key;
        currentlyPlaying.value = key;
      }

      console.log(`audio played: ${key} at volume ${audio.volume}, loop=${loop}`);
    },

    playPlaylist(keys) {
      if (this.audioMuted) return;

      if (!Array.isArray(keys) || keys.length === 0) return;

      let currentIndex = 0;

      const playNext = () => {
        const key = keys[currentIndex];
        const entry = this.audioMap[key];
        if (!entry || !entry.audio) return;

        const audio = entry.audio;

        const newType = entry.type;
        const prevKey = currentAudioKey.value;
        const prevEntry = this.audioMap[prevKey];

        // Only stop previous music
        if (
          prevKey &&
          prevKey !== key &&
          prevEntry &&
          prevEntry.type === 'music' &&
          !prevEntry.persistent
        ) {
          const prevAudio = prevEntry.audio;
          prevAudio.pause();
          prevAudio.currentTime = 0;
        }

        audio.volume = entry.volume ?? 1;
        audio.currentTime = 0;
        audio.loop = false;

        audio.onended = () => {
          currentIndex = (currentIndex + 1) % keys.length;
          playNext();
        };

        audio.play();
        currentAudioKey.value = key;
        currentlyPlaying.value = key;
      };

      playNext();
    },

    stopAudio(key) {
      const entry = this.audioMap[key];
      if (entry && entry.audio) {
        entry.audio.pause();
        entry.audio.currentTime = 0;
        entry.audio.loop = false;
      }
    },

    muteAudio(type) {
      Object.entries(this.audioMap).forEach(([key, entry]) => {
        if (type === 'all' || entry.type === type) {
          if (entry.audio) entry.audio.muted = true;
        }
      });
    },

    unmuteAudio(type) {
      Object.entries(this.audioMap).forEach(([key, entry]) => {
        if (type === 'all' || entry.type === type) {
          if (entry.audio) entry.audio.muted = false;
        }
      });
    }
  },

  beforeUnmount() {
    Object.entries(audioMap).forEach(([key, entry]) => {
      if (!entry.persistent && entry.audio) {
        entry.audio.pause();
        entry.audio.currentTime = 0;
        entry.audio.loop = false;
      }
    });
  }
};

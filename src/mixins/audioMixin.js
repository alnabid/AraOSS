// @/mixins/audioMixin.js
import { ref } from 'vue';
import { audioMap } from '@/utils/globalAudio';

const currentAudioKey = ref(null);
const currentlyPlaying = ref('none');
const playlistKeys = ref([]);
const playlistIndex = ref(0);

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
      return this.audioMap[key] || { name: 'Audio turned off' };
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

      if (newType === 'music') {
        currentAudioKey.value = key;
        currentlyPlaying.value = key;
      }

      console.log(`audio played: ${key} at volume ${audio.volume}, loop=${loop}`);
    },

    playPlaylist(keys) {
      if (this.audioMuted) return;
      if (!Array.isArray(keys) || keys.length === 0) return;

      playlistKeys.value = keys;
      playlistIndex.value = 0;

      const playNext = () => {
        const key = playlistKeys.value[playlistIndex.value];
        const entry = this.audioMap[key];
        if (!entry || !entry.audio) return;

        const audio = entry.audio;

        const newType = entry.type;
        const prevKey = currentAudioKey.value;
        const prevEntry = this.audioMap[prevKey];

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
          playlistIndex.value = (playlistIndex.value + 1) % playlistKeys.value.length;
          playNext();
        };

        audio.play();
        currentAudioKey.value = key;
        currentlyPlaying.value = key;
      };

      playNext();
    },

    nextSong() {
      if (playlistKeys.value.length === 0) return;

      playlistIndex.value = (playlistIndex.value + 1) % playlistKeys.value.length;
      this.playAudio(playlistKeys.value[playlistIndex.value]);
    },

    prevSong() {
      if (playlistKeys.value.length === 0) return;

      playlistIndex.value =
        (playlistIndex.value - 1 + playlistKeys.value.length) % playlistKeys.value.length;
      this.playAudio(playlistKeys.value[playlistIndex.value]);
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

<script setup>
import Background from '@/components/Background.vue';
import Interface from '@/components/Interface.vue';
import audioMixin from '@/mixins/audioMixin';
import Modal from '@/components/Modal.vue';
import { eventBus } from '@/eventBus';
import Library from '@/components/Library.vue';
</script>
<template>
    <div class="interface Deeppink">
        <Background />
        <Interface />
        <Modal ref="modal" />
        <Library ref="library" />
    </div>
</template>
<script>
export default {
    components: { Modal, Library },
    mixins: [audioMixin],
  data() {
    return {
      modalHeader: '',
      modalNote: '',
    };
  },
  methods: {
    themeSwitcher(value) {
      console.log('okay theme is okay ' + value);

      const el = document.querySelector('.interface');
      if (!el) return;

      // Remove all classes except 'interface'
      el.className = 'interface';

      // Add the new theme class
      if (value && typeof value === 'string') {
        el.classList.add(value);
        localStorage.setItem('selectedTheme', value);
      }
    }
  },
  mounted() {
        if (!this.audioMuted) {
          this.playPlaylist(['two_am_lucid', 'sound_test', 'games_bookstore', 'press_play', 'pink_garden', 'oyasame']);
        }

        eventBus.on('open-modal', (contents) => {
        // contents is expected to be an array of {header, note}
        this.$refs.modal.open(contents);
        });

        eventBus.on('close-modal', () => {
        this.$refs.modal.close();
        });

        eventBus.on('open-library', ()=>{
          this.$refs.library.open()
        })
        eventBus.on('close-library', ()=>{
          this.$refs.library.close()
        })

        eventBus.on('theme-change', (selectedValue) => {
          this.themeSwitcher(selectedValue)
        })

        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
          this.themeSwitcher(savedTheme);
        }
    }
}
</script>
<style scoped>
.interface {
    display: flex;
    align-items: center;
    height: 100vh;
    max-width: 950px;
    margin: auto;
    justify-content: center;
}
</style>
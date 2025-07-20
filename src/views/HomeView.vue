<script setup>
import Background from '@/components/Background.vue';
import Interface from '@/components/Interface.vue';
import audioMixin from '@/mixins/audioMixin';
import Modal from '@/components/Modal.vue';
import { eventBus } from '@/eventBus';
import Library from '@/components/Library.vue';
</script>
<template>
    <div class="interface">
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
  mounted() {
        if (!this.audioMuted) {
          this.playPlaylist(['twozero', 'its_too_cold']);
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
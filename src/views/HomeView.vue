<script setup>
import Background from '@/components/Interface/Background.vue';
import Interface from '@/components/Interface/Interface.vue';
import audioMixin from '@/mixins/audioMixin';
import Modal from '@/components/Interface/Modal.vue';
import { eventBus } from '@/eventBus';
</script>
<template>
    <div class="interface">
        <Background />
        <Interface />
        <Modal ref="modal" />
    </div>
</template>
<script>
export default {
    components: { Modal },
    mixins: [audioMixin],
  data() {
    return {
      modalHeader: '',
      modalNote: '',
    };
  },
  mounted() {
        this.playPlaylist(['twozero', 'its_too_cold'])

        eventBus.on('open-modal', (contents) => {
        // contents is expected to be an array of {header, note}
        this.$refs.modal.open(contents);
        });

        eventBus.on('close-modal', () => {
        this.$refs.modal.close();
        });
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
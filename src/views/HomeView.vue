<script setup>
import Background from '@/components/Interface/Background.vue';
import Interface from '@/components/Interface/Interface.vue';
import audioMixin from '@/mixins/audioMixin';
</script>
<template>
    <div class="interface">
        <Background />
        <Interface />
    </div>
</template>
<script>
export default {
    mixins: [audioMixin],
    mounted() {
        this.playPlaylist(['twozero', 'its_too_cold'])
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
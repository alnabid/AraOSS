<template>
    <div class="shape radio-info">
        <i class="bi bi-music-note"></i>
        <span>{{ currentlyPlaying.name }}</span> 
    </div>
</template>
<script>
import audioMixin from '../mixins/audioMixin';

export default {
    mixins: [audioMixin],
    data() {
        return {
            currentSong: '',
        }
    }
}
</script>
<style scoped>
span {
    color: var(--secondary-pink);
    padding: 0 0.5rem;
}
</style>
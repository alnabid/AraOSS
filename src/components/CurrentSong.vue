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
    padding: 0 0.5rem;
}
.Deeppink span {
    color: var(--deeppink-2);
}
.Grass span {
    color: var(--grass-2);
}
.Night span {
    color: var(--night-2);
}
</style>
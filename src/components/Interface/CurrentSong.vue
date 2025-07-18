<template>
    <div class="shape radio-info">
      Currently playing: {{ currentlyPlaying.name }}
    </div>
</template>
<script>
import audioMixin from '../../mixins/audioMixin';

export default {
    mixins: [audioMixin],
    data() {
        return {
            currentSong: '',
        }
    }
}
</script>
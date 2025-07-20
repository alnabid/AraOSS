<template>
    <div class="shape shape-4">
        <img src="@/assets/lpflower1.gif" alt="">
        <div @mouseenter="playAudio('hover')" @click="showInfo(), playAudio('click')" class="info"><i class="bi bi-info-circle-fill"></i>See info</div>
    </div>
</template>
<script>
import audioMixin from '@/mixins/audioMixin';
import Modal from './Modal.vue';
import { eventBus } from '@/eventBus';

export default {
    components: { Modal },
    mixins: [audioMixin],
    data() {
        return {
            show: false
        }
    },
    methods: {
        showInfo() {
            eventBus.emit('open-modal', [
                { header: 'About flower', note: 'I made this flower in blender..' },
                { header: 'About flower', note: 'What flower is it- you ask?' },
                { header: 'About flower', note: 'uh' },
                { header: 'About flower', note: 'uhhh' },
                { header: 'About flower', note: 'uhhhhhhhhh' },
                { header: 'About flower', note: 'i' },
                { header: 'About flower', note: 'have' },
                { header: 'About flower', note: 'no' },
                { header: 'About flower', note: 'idea' },
                { header: 'About flower', note: 'that\'s right! I have no idea' },
                { header: 'About flower', note: 'I cant even name more than 5 flowers if you asked me' },
                { header: 'About flower', note: 'Well, I can name one' },
                { header: 'About flower', note: 'It\'s you' },
                { header: 'About flower', note: 'yep, im not a flower nerd' },
            ]);
        }
    }
    // methods: {
    //     showModal() {
    //         this.show = !this.show;
    //     }
    // }
}
</script>
<style scoped>
@import url(@/css/interface.css);

img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: 0.2s;
    position: relative;
}

.info {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    font-family: 'Space Mono';
    text-transform: uppercase;
    color: white;
    padding: 0.1rem 0.3rem;
    cursor: pointer;
    align-items: center;
    display: none;
    transition: 0.2s;
    font-size: 0.8rem;
}
.info i {
    font-size: 0.7rem;
    transition: 0.2s;
    padding-right: 0.5rem;
}
.Deeppink .info i {
    color: var(--deeppink-2);
}
.Grass .info i {
    color: var(--grass-2);
}
.Dark .info i {
    color: var(--dark-2);
}
.info .text {
    display: none;
}
</style>
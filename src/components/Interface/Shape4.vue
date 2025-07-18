<template>
    <div class="shape shape-4">
        <img src="@/assets/lpflower1.gif" alt="">
        <div @mouseenter="playAudio('hover')" @click="showInfo()" class="info"><i class="bi bi-info-circle-fill"></i></div>
    </div>
    <!-- <div v-if="show" class="info-modal modal">
        <h1>Info about this flower..</h1>
        Hello there!
    </div> -->
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
                { header: 'Page 1', note: 'This is the first note.' },
                { header: 'Page 2', note: 'Here comes the second note.' },
                { header: 'Page 3', note: 'Last one before closing.' }
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
    background: deeppink;
    padding: 0.1rem 0.3rem;
    cursor: pointer;
    align-items: center;
    display: none;
    transition: 0.2s;
}
.info span {
    font-family: 'michroma';
}
.info i {
    font-size: 0.7rem;
    transition: 0.2s;
}
.info .text {
    display: none;
}
.info-modal {
    display: flex;
    position:absolute;
    z-index: 999;
    background: red;
    width: 500px;
    height: 500px;
}
</style>
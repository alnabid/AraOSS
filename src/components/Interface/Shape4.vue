<template>
    <div class="shape shape-4">
        <img src="@/assets/lpflower1.gif" alt="">
        <div @mouseenter="playAudio('hover')" @click="playAudio('click')" class="info"><i class="bi bi-info-circle-fill"></i>I<span>nf</span>o</div>
    </div>
</template>
<script>
import audioMixin from '@/mixins/audioMixin';

export default {
    mixins: [audioMixin]
}
</script>
<style scoped>
@import url(@/css/interface.css);

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.2s;
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
    padding-right: 0.5rem;
    font-size: 0.7rem;
}
.info:hover {
    padding-right: 3rem;
}
</style>
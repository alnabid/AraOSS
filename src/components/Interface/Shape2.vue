<template>
    <div class="shape shape-2">
        <div class="links">
            <div @mouseover="playAudio('click')" class="link">G<span>a</span>me<span>s</span> <div class="bg"></div></div>
            <div class="link">Ga<span>lle</span>ry <div class="bg"></div></div>
            <div class="link">S<span>et</span>t<span>in</span>gs <div class="bg"></div></div>
            <div class="notes">
                25 <div class="horline"></div> DEM0 22/07
            </div>
            <div class="link">Cr<span>ed</span>its <div class="bg"></div></div>
        </div>
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

.links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 2rem;
}
.links .link {
    outline: 1px solid rgba(255, 10, 108, 0.418);
    color: rgba(255, 83, 132, 0.822);
    width: fit-content;
    font-size: 1.5rem;
    padding: 0.5rem 8rem 0.2rem 1rem;
    border-radius: 0.2rem;
    font-family: 'Space Mono';
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.2s;
    position: relative;
}
.links .link span {
    font-family: 'Michroma';
}
.notes {
    font-family: 'zen dots';
    display: flex;
    margin: 2rem 0;
    font-size: 0.8rem;
    gap: 0.5rem;
    color: rgba(255, 62, 126, 0.256);
    align-items: center;
}
.notes .horline {
    width: 100px;
    height: 1rem;
    background: rgb(222, 91, 102);
    border-radius: 2rem;
}
.links .link:hover {
    color: white;
}
.links .link .bg {
    width: 0%;
    height: 100%;
    background: rgba(255, 83, 132, 0.863);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    transition: 0.3s;
}
.links .link:hover .bg {
    width: 100%;
}
</style>
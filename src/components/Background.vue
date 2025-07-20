<template>
    <div class="overlay"></div>
    <section>
        <div class="bg"></div>
    </section>
</template>
<style scoped>
.overlay {
    width: 100%;
    height: 100%;
    background: var(--black);
    opacity: 60%;
    z-index: -99;
    position: fixed;
}
section {
    z-index: -100;
    position: fixed;
    width: 100%;
    height: 100%;
}
section .bg  {
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--primary-pink), var(--black));
    background-size: 400% 400%;
    animation: bg-gradient 20s ease infinite;
    opacity: 50%;
}
@keyframes bg-gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100%, 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
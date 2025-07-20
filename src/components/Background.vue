<template>
    <div class="overlay"></div>
    <section>
        <img src="@/assets/boomerang.gif" alt="">
    </section>
</template>
<style scoped>
.overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.514);
    z-index: -99;
    position: fixed;
}
section {
    z-index: -100;
    position: fixed;
    width: 100%;
    height: 100%;
}
section img  {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(20px);
}
</style>
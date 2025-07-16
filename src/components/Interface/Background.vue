<template>
    <section>
        <img src="@/assets/boomerang.gif" alt="">
    </section>
</template>
<style scoped>
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
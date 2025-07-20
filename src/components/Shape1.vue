<template>
    <div class="shape shape-1">
        <div class="header">
            <h1>Ara OS</h1>
            <p>SIMULATION</p>
        </div>
    </div>
</template>
<style scoped>
@import url(@/css/interface.css);

.header {
    padding: 1rem 2rem;
    display: flex;
    gap: 0.2rem;
    gap: 0.5rem;
    flex-direction: column;
}
.Deeppink .header {
    color: var(--deeppink-1);
}
.Grass .header {
    color: var(--grass-1);
}
.Night .header {
    color: var(--night-1);
}
.header h1 {
    font-size: 3rem;
    font-family: 'space mono';
    /* text-decoration: underline;
    text-decoration-color: rgb(255, 104, 195);
    text-decoration-thickness: 0.2rem;
    text-underline-offset: 5px; */
}
.header p {
    font-family: 'Press Start 2P';
    padding: 0.5rem;
    padding-right: 2rem;
    width: fit-content;
    height: fit-content;
    font-size: 1.1rem;
    color: rgb(255, 255, 255);
    animation: flicker 2s forwards infinite;
}
.Deeppink .header p {
    background: var(--deeppink-1);
}
.Grass .header p {
    background: var(--grass-1);
}
.Night .header p {
    background: var(--night-1);
}
@keyframes flicker {
    0% {
        color: rgba(0, 0, 0, 0);
    }
    50% {
        color: white;
    }
    100% {
        color: rgba(0, 0, 0, 0);
    }
}
</style>
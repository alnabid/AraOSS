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
    padding: 1.5rem 2.5rem;
    display: flex;
    gap: 0.2rem;
    color: rgba(255, 28, 123, 0.84);
    gap: 0.5rem;
}
.header h1 {
    font-size: 3rem;
    text-decoration: underline;
    text-decoration-color: rgb(255, 104, 195);
    text-decoration-thickness: 0.2rem;
    text-underline-offset: 5px;
}
.header p {
    font-family: 'Press Start 2P';
    background: rgba(255, 28, 123, 0.84);
    padding: 0.5rem;
    padding-right: 3rem;
    height: fit-content;
    font-size: 1.1rem;
    color: rgb(255, 255, 255);
    animation: flicker 2s forwards infinite;
}
@keyframes flicker {
    0% {
        color: rgba(255, 28, 123, 0.84);
    }
    50% {
        color: white;
    }
    100% {
        color: rgba(255, 28, 123, 0.84);
    }
}
</style>
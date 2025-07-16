<script setup>
import Background from '@/components/Interface/Background.vue';
import Interface from '@/components/Interface/Interface.vue';
</script>
<template>
    <div class="interface">
        <Background />
        <Interface />
    </div>
</template>
<style scoped>
.interface {
    display: flex;
    align-items: center;
    height: 100vh;
    max-width: 950px;
    margin: auto;
    justify-content: center;
}
</style>
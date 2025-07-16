<script setup>
import Shape1 from './Shape1.vue';
import Shape2 from './Shape2.vue';
import Shape3 from './Shape3.vue';
import Shape4 from './Shape4.vue';
</script>
<template>
    <section>
        <div class="row">
            <div class="column column-1">
                <Shape1 />
                <Shape2 />
            </div>
            <div class="column column-2">
                <Shape3 />
                <Shape4 />
            </div>
        </div>
    </section>
</template>
<style scoped>
@import url(@/css/interface.css);
</style>
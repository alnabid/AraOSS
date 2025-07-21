<template>
  <div id="drag-bar">Ara OSS</div>
  <RouterView />
</template>
<script>
window.addEventListener('keydown', (e) => {
  if (
    (e.ctrlKey || e.metaKey) &&
    (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '_')
  ) {
    e.preventDefault();
  }
});
</script>
<style scoped>
#drag-bar {
  -webkit-app-region: drag;
  background-color: #141414; /* pink */
  height: 30px;
  line-height: 30px;
  color: white;
  font-weight: bold;
  padding-left: 12px;
  user-select: none;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  text-align: center;
  font-family: 'Space Mono';
  font-size: 0.8rem;
}

/* Make sure app content doesn't go under the bar */
#app {
  padding-top: 30px;
}
</style>
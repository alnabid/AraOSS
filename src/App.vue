<template>
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
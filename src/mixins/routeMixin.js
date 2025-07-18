export default {
  methods: {
    goToRoute(routeNameOrPath, params = {}) {
      if (typeof routeNameOrPath !== 'string') return

      if (routeNameOrPath.startsWith('/')) {
        this.$router.push({ path: routeNameOrPath, ...params })
      } else {
        this.$router.push({ name: routeNameOrPath, params })
      }
    }
  }
}

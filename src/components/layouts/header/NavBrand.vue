<template>
  <div class="navbar-header">
    <router-link to="/" class="navbar-brand">Vue-WebApp</router-link>
    <button
      class="navbar-toggler"
      type="button"
      @click="toggleNavBarCollapse"
      data-toggle="collapse"
      data-target="#navbar-main"
      aria-controls="navbar-main"
      aria-expanded="true"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
</template>
<script>
export default {
  name: 'header-nav-brand',
  data () {
    return {}
  },
  methods: {
    toggleNavBarCollapse () {
      this.$emit('navBarCollapseAction')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

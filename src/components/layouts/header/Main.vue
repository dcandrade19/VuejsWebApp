<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <nav-brand @navBarCollapseAction="changeNavBarCollapseIn"/>
        <div class="navbar-collapse collapse"
        id="navbar-main"
        style=""
        :class="{show: navBarCollapseIn}">
          <nav-left v-if="this.$store.state.usuario.logado"/>
          <nav-right/>
        </div>
      </div>
  </nav>
</template>
<script>
import NavBrand from './NavBrand'
import NavLeft from './NavLeft'
import NavRight from './NavRight'

export default {
  name: 'header-main',
  components: {
    NavBrand,
    NavLeft,
    NavRight
  },
  data () {
    return {
      navBarCollapseIn: true
    }
  },
  methods: {
    changeNavBarCollapseIn () {
      this.navBarCollapseIn = !this.navBarCollapseIn
    }
  }
}
</script>

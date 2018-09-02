<template>
  <div id="app">
    <main-header />
    <div class="container-fluid">
    <router-view/>
    </div>
    <main-footer />
  </div>
</template>

<script>
import MainHeader from './components/layouts/header/Main'
import MainFooter from './components/layouts/footer/Main'

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style src="./assets/sass/app.scss" lang="scss"></style>

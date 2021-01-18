<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
      <!-- <LastArticles></LastArticles> -->
      <router-view></router-view>
    <FooterComponente></FooterComponente>
  </div>
</template>

<script>

import HeaderComponent from './components/HeaderComponent.vue'
// import LastArticles from './components/LastArticles.vue'
import FooterComponente from './components/FooterComponente.vue'

export default {
  name: 'App',
  components: {

    HeaderComponent,
    // LastArticles,
    FooterComponente
  }
}
</script>

<style>

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

@import './assets/css/styles.css';
</style>

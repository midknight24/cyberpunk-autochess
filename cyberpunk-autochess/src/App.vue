<template>
  <div id="app" style="height: 100%">
    <div style="width: 50%; height: 100%">
      <battle-grid style="height: 40%"></battle-grid>
    </div>
  </div>
</template>

<script>
import BattleGrid from './components/BattleGrid.vue'
export default {
  name: 'App',
  components: {
    BattleGrid
  },
  data() {
    return {
      greeting: 'Hello World'
    }
  }
}
</script>

<style>
body, html {
    height: 100vh;
    overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>

<template>
  <div id="app" style="height: 100%;">
    <div style="width: 50%; height: 100%; float: left">
      <battle-grid style="height: 40%"></battle-grid>
    </div>
    <div style="width: 50%; float: left">
      <Minion draggable="true" class="minion" id="card1" @dragstart.native="startDrag"></Minion>
    </div>
  </div>
</template>

<script>
import BattleGrid from './components/BattleGrid.vue'
import Minion from './components/Minion.vue'
export default {
  name: 'App',
  components: {
    BattleGrid, Minion
  },
  data() {
    return {
      greeting: 'Hello World'
    }
  },
  methods: {
    startDrag: function(event) {
      console.log(event)
      event.dataTransfer.setData("text", event.target.id)
      event.dataTransfer.dropEffect = "move"
      event.dataTransfer.effectAllowed = "move"
    },
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
#minion {
  position: absolute;
  top: 100px;
  right: 100px
}

</style>

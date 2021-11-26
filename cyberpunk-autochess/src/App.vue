<template>
  <div id="app" style="height: 100%;">
    <div style="width: 50%; height: 100%; float: left">
      <battle-grid style="height: 40%"
        :game="game"></battle-grid>
    </div>
    <div style="width: 50%; float: left">
      <Card draggable="true" class="minion"
        @dragstart.native="startDrag($event,minion)"
        @dragend.native="game.minionSelected = null"
        :id="minion.id"
        :card="minion"
        :key="minion.id"
        v-for="minion in game.minions"></Card>
      <el-button class="NextRoundBtn" type="primary" @click="game.runTurn()">Next Round</el-button>
    </div>
  </div>
</template>

<script>
import BattleGrid from './components/BattleGrid.vue'
import Card from './components/Card.vue'
import {Game} from './CoreGame.js'
export default {
  name: 'App',
  components: {
    BattleGrid, Card
  },
  data() {
    return {
      greeting: 'Hello World',
      game: new Game()
    }
  },
  methods: {
    startDrag: function(event,minion) {
      this.game.minionSelected = minion
      event.dataTransfer.setData("text", event.target.id)
      event.dataTransfer.dropEffect = "move"
      event.dataTransfer.effectAllowed = "move"
    },
  },
  mounted(){
    console.log(this.game)
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

.NextRoundBtn {
  width: 10vw;
  height: 5vh;
  position: absolute;
  top: 1%;
  right: 1%;
}
</style>

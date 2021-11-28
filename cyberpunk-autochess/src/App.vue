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
      <el-button class="SpawnBtn" type="success" plain @click="formVisible = !formVisible">Spawn Minion</el-button>
      <el-dialog :visible.sync="formVisible" :model="minionForm">
        <el-form>
          <el-form-item label="Armor">
            <el-input v-model="minionForm.armor"></el-input>
          </el-form-item>
          <el-form-item label="Power">
            <el-input v-model="minionForm.power"></el-input>
          </el-form-item>
          <el-form-item label="Power Type">
            <el-select v-model="minionForm.powerType">
              <el-option :label="'⚔️'" :value="'MELEE'"></el-option>
              <el-option :label="'🎯'" :value="'RANGED'"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Belongs To">
            <el-select v-model="minionForm.playerBelong">
              <el-option :label="'Player A'" :value="'A'"></el-option>
              <el-option :label="'Player B'" :value="'B'"></el-option>
            </el-select>
          </el-form-item>
          <el-button @click="spawnMinion">Spawn</el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BattleGrid from './components/BattleGrid.vue'
import Card from './components/Card.vue'
import {Game, Minion} from './CoreGame.js'
import 'animate.css'
export default {
  name: 'App',
  components: {
    BattleGrid, Card
  },
  data() {
    return {
      greeting: 'Hello World',
      game: new Game(),
      formVisible: false,
      minionForm: {
        armor: 0,
        power: 1,
        powerType: 'MELEE',
        playerBelong: 'A'
      }
    }
  },
  methods: {
    startDrag: function(event,minion) {
      this.game.minionSelected = minion
      event.dataTransfer.setData("text", event.target.id)
      event.dataTransfer.dropEffect = "move"
      event.dataTransfer.effectAllowed = "move"
    },
    spawnMinion(){
      var minion = new Minion(
        this.minionForm.playerBelong,
        'customMinion',
        'images/CyberThug.jpg',
        {
          powerType: this.minionForm.powerType,
          power: this.minionForm.power,
          armor: this.minionForm.armor
        },
        this.game
      )
      this.game.minions.push(minion)
      this.formVisible = false
    }
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

.SpawnBtn {
  width: 10vw;
  height: 5vh;
  position: absolute;
  top: 10%;
  right: 1%;
}
</style>

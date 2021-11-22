<template>
    <div>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot" id="player-a-1"><div class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped" @dragenter="dragenter"></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-a-2"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-a-3"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot" id="player-a-4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-a-5"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-a-6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot" id="player-a-7"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-a-8"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-a-9"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-divider><i class="el-icon-close"></i></el-divider>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot" id="player-b-1"><div class="grid-content bg-purple"><div draggable="True" @dragstart="dragged" @drag="drag"><Minion></Minion></div></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-b-2"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-b-3"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot" id="player-b-4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-b-5"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-b-6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot" id="player-b-7"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-b-8"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot" id="player-b-9"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
</template>

<script>
import Minion from './Minion.vue'
export default {
    name: 'BattleGrid',
    prop: {
        chessLists: Array
    },
    components: {
      Minion
    },
    methods: {
      allowdrop: function(event) {
        event.preventDefault()
      },
      dropped: function(event) {
        event.preventDefault()
        var data = event.dataTransfer.getData("text")
        console.log(data)
        event.target.appendChild(document.getElementById(data))
      },
      dragged: function(event) {
        event.preventDefault()
        console.log(event)
        event.dataTransfer.setData("text", event.target.id)
      },
      dragenter: function(event) {
        event.preventDefault()
        console.log(event)
      },
      drag: function(event) {
        event.preventDefault()
        console.log(event)
        event.dataTransfer.setData("text", event.target.id)
      },
    }

    
}
</script>

<style>
.battle-row {
    height: 35%;
}
.battle-slot {
    height: 100%;
}
.el-row {
  margin-bottom: 0px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 90%;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
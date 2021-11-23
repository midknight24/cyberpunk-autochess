<template>
    <div>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div ref="player-a-7" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-a-8" class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-a-9" class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div ref="player-a-4" class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-a-5" class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-a-6" class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div ref="player-a-1" class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-a-2" class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-a-3" class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-divider><i class="el-icon-close"></i></el-divider>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div ref="player-b-1" class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-b-2" class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-b-3" class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div ref="player-b-4" class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-b-5" class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-b-6" class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div ref="player-b-7" class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-b-8" class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot"><div ref="player-b-9" class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
</template>

<script>
export default {
    name: 'BattleGrid',
    prop: {
        chessLists: Array
    },
    methods: {
      allowdrop: function(event) {
        event.preventDefault()
      },
      dropped: function(event) {
        event.preventDefault()
        console.log(event)
        var data = event.dataTransfer.getData("text")
        console.log(data)
        event.target.appendChild(document.getElementById(data))
      }
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
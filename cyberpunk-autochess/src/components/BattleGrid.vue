<template>
    <div>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div id="a-7" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="a-8" class="grid-content bg-purple-light" @dragover="allowdrop" @drop="dropped($event)" ></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="a-9" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div id="a-4" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="a-5" class="grid-content bg-purple-light" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="a-6" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div id="a-1" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="a-2" class="grid-content bg-purple-light" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="a-3" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
      </el-row>
      <el-divider><i class="el-icon-close"></i></el-divider>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div id="b-1" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="b-2" class="grid-content bg-purple-light" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="b-3" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div id="b-4" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="b-5" class="grid-content bg-purple-light" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="b-6" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div id="b-7" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="b-8" class="grid-content bg-purple-light" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="b-9" class="grid-content bg-purple" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
      </el-row>
    </div>
</template>

<script>
export default {
    name: 'BattleGrid',
    props: {
        game: Object
    },
    methods: {
      allowdrop: function(event) {
        const slot = this.game.parseSlotId(event.target.id)
        const minion = event.dataTransfer.getData("minion")
        console.log(this.game)
        if(this.game.canDrop(slot, minion)){
          event.preventDefault()
        }
      },
      dropped: function(event) {
        console.log(event.target)
        console.log(event.target.id)
        event.preventDefault()
        var data = event.dataTransfer.getData("text")
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
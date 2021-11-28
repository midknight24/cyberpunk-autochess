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
        <el-col :span="8" class="battle-slot"><div id="a-1" class="grid-content bg-purple grid-highligh" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="a-2" class="grid-content bg-purple-light grid-highligh" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="a-3" class="grid-content bg-purple grid-highligh" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
      </el-row>
      <el-divider><i class="el-icon-close"></i></el-divider>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div id="b-1" class="grid-content bg-purple grid-highligh" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="b-2" class="grid-content bg-purple-light grid-highligh" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
        <el-col :span="8" class="battle-slot"><div id="b-3" class="grid-content bg-purple grid-highligh" @dragover="allowdrop" @drop="dropped($event)"></div></el-col>
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
    data() {
      return {
        currentRow : this.game.currentRow
      }
    },
    watch: {
      game: {
        deep: true,
        handler(game){
          this.currentRow = game.currentRow
        }
      },
      currentRow: {
        handler(newRow, oldRow){
            this.unfocusRow('a', oldRow)
            this.unfocusRow('b', oldRow)
            this.focusRow('a', newRow)
            this.focusRow('b', newRow)
        }
      }

    }, 
    methods: {
      allowdrop: function(event) {
        const slot = this.game.parseSlotId(event.target.id)
        const minion = this.game.minionSelected
        if(this.game.canDrop(slot, minion)){
          // default will show not drop
          event.preventDefault()
        }
      },
      dropped: function(event) {
        event.preventDefault()
        const slot = this.game.parseSlotId(event.target.id)
        this.game.minionSelected.move(slot.slot)
        var data = event.dataTransfer.getData("text")
        event.target.appendChild(document.getElementById(data))
      },
      focusRow: function(player, rownum) {
        const rowIds = Array.from([1,2,3], x => x + 3*(rownum-1))
        rowIds.forEach((id)=>{
          const cid = `${player.toLowerCase()}-${id}`
          const grid = document.getElementById(cid)
          grid.classList.add('grid-highligh')
        })
      },
      unfocusRow: function(player, rownum) {
        const rowIds = Array.from([1,2,3], x => x + 3*(rownum-1))
        rowIds.forEach((id)=>{
          const cid = `${player.toLowerCase()}-${id}`
          const grid = document.getElementById(cid)
          if(grid)
            grid.classList.remove('grid-highligh')
        })
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

.grid-highligh {
  box-shadow: 0 4px 8px 0 rgba(114, 45, 132, 0.2), 0 6px 20px 0 rgba(98, 169, 243, 1);
}
</style>
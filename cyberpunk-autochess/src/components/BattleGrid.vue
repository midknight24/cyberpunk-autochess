<template>
    <div>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="10" class="battle-row">
        <el-col :span="8" class="battle-slot"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8" class="battle-slot"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8" class="battle-slot"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
</template>

<script>
export default {
    name: 'BattleGrid',
    prop: {
        chessLists: Array
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
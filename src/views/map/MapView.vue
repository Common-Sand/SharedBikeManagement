<template>
  <div class="common-layout">
    <el-container class="app-wrapper">
      <el-aside width="200px" class="sidebar-container">
        <Menu/>
      </el-aside>
      <el-container class="container">
        <el-header class="header">Header</el-header>
        <el-main class="main">       
          查看地图
        </el-main>
      </el-container>
    </el-container>
  </div>    
</template>

<script setup>
import { ref } from "vue";
import Menu from "@/layout/Menu/Aside.vue";
</script>

<style lang="scss" >
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}
::v-deep .el-header {
  padding: 0;
}
</style>
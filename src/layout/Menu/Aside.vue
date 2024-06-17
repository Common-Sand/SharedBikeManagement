<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <!-- <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>主页</span>
      </template>
    </el-sub-menu> -->
    <el-menu-item index="1">
      <el-icon><House /></el-icon>
      <span>主页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><User /></el-icon>
      <span>个人中心</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><UserFilled /></el-icon>
      <span>查看骑行者</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><Bicycle /></el-icon>
      <span>查看单车</span>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon><Odometer /></el-icon>
      <span>查看骑行记录</span>
    </el-menu-item>
    <el-menu-item index="6">
      <el-icon><CircleClose /></el-icon>
      <span>查看禁停区</span>
    </el-menu-item>
    <el-menu-item index="7">
      <el-icon><MapLocation /></el-icon>
      <span>查看地图</span>
    </el-menu-item>
    <el-menu-item index="8">
      <el-icon><DataLine /></el-icon>
      <span>图表分析</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup></script>

<style lang="scss" scoped></style>

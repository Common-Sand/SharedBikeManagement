<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
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
    <el-menu-item index="1" @click="router.push({ name: 'home' })">
      <el-icon><House /></el-icon>
      <span>主页</span>
    </el-menu-item>
    <el-menu-item index="2" @click="router.push({ name: 'user' })">
      <el-icon><User /></el-icon>
      <span>个人中心</span>
    </el-menu-item>
    <el-menu-item index="3" @click="router.push({ name: 'riders' })">
      <el-icon><UserFilled /></el-icon>
      <span>查看骑行者</span>
    </el-menu-item>
    <el-menu-item index="4" @click="router.push({ name: 'bikes' })">
      <el-icon><Bicycle /></el-icon>
      <span>查看单车</span>
    </el-menu-item>
    <el-menu-item index="5" @click="router.push({ name: 'record' })">
      <el-icon><Odometer /></el-icon>
      <span>查看骑行记录</span>
    </el-menu-item>
    <el-menu-item index="6" @click="router.push({ name: 'zone' })">
      <el-icon><CircleClose /></el-icon>
      <span>查看禁停区</span>
    </el-menu-item>
    <el-menu-item index="7" @click="router.push({ name: 'map' })">
      <el-icon><MapLocation /></el-icon>
      <span>查看地图</span>
    </el-menu-item>
    <el-menu-item index="8" @click="router.push({ name: 'chart' })">
      <el-icon><DataLine /></el-icon>
      <span>图表分析</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped></style>

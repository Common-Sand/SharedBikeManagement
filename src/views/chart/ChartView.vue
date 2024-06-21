<template>
  <div class="common-layout">
    <el-container class="app-wrapper">
      <el-aside width="210px" class="sidebar-container">
        <Menu />
      </el-aside>
      <el-container class="container">
        <el-header class="header"><Header></Header></el-header>
        <el-main class="main">
          <div class="chart-container">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-card>
                  <div id="line-chart"></div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card>
                  <div id="bar-chart"></div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Menu from "@/layout/Menu/Aside.vue";
import Header from "@/layout/Header/header.vue";
import {use} from 'echarts/core';
const options = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
};



// onMounted(() => {
//   init();
// });

// onUnmounted(()=>{
//   echarts.dispose();
// })

function init() {
  var chardom = document.getElementById("#line-chart");
  var mychart = echarts.init(chardom);
  
  mychart.setOption(options);
}
</script>

<style lang="scss">
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
#line-chart,
#bar-chart {
  width: 100%;
  height: 400px;
}
</style>

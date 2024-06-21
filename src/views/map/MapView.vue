<template>
  <div class="common-layout">
    <el-container class="app-wrapper">
      <el-aside width="210px" class="sidebar-container">
        <Menu />
      </el-aside>
      <el-container class="container">
        <el-header class="header"><Header></Header></el-header>
        <el-main class="main">
          <div id="map-container"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from "@/layout/Menu/Aside.vue";
import Header from "@/layout/Header/header.vue";

import AMapLoader from "@amap/amap-jsapi-loader";
import { onMounted, onUnmounted } from "vue";

const bike_positions=[
  {
    x:116.40,
    y:39.90
  },
  {
    x:115.98,
    y:39.45
  },{
    x:116.98,
    y:38.45
  },
  {
    x:117.05,
    y:39.545
  },
  {
    x:116.75,
    y:39.75
  }
]
const zones = ref(null);
let map = null;

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "3e4e4572115b7b082c3fedf20fb5d2e5",
  };
  AMapLoader.load({
    key: "d97aaf46aa38268ab9f98298c2d09ea3", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map("map-container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
      });
      //点

      
      const marker1 = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9),
        title: "1",
      });
      const marker2 = new AMap.Marker({
        position: new AMap.LngLat(116.38, 39.89970),
        title: "2",
      });
      const marker3 = new AMap.Marker({
        position: new AMap.LngLat(116.387, 39.88705),
        title: "3",
      });
      const marker4 = new AMap.Marker({
        position: new AMap.LngLat(116.38755, 39.89275),
        title: "4",
      });
      const marker5 = new AMap.Marker({
        position: new AMap.LngLat(116.38765, 39.89775),
        title: "5",
      });
      const markerlist = [
        marker1,marker2,marker3,marker4,marker5
      ];
      map.add(markerlist);
      // 禁停区边界
      var southWest = new AMap.LngLat(116.356449, 39.859008); //西南角的经纬度坐标
      var northEast = new AMap.LngLat(116.417901, 39.893797); //东北角的经纬度坐标
      var bounds = new AMap.Bounds(southWest, northEast); //创建一个地物对象的经纬度矩形范围

      var rectangle = new AMap.Rectangle({
        bounds: bounds, //矩形的范围
        strokeColor: "red", //轮廓线颜色
        strokeWeight: 6, //轮廓线宽度
        strokeOpacity: 0.5, //轮廓线透明度
        strokeStyle: "dashed", //轮廓线样式，dashed 虚线，还支持 solid 实线
        strokeDasharray: [30, 10], //勾勒形状轮廓的虚线和间隙的样式，30代表线段长度 10代表间隙长度
        fillColor: "blue", //矩形填充颜色
        fillOpacity: 0.5, //矩形填充透明度
        cursor: "pointer", //指定鼠标悬停时的鼠标样式
        zIndex: 50, //矩形在地图上的层级
      });

      map.add(rectangle);
      map.setFitView([rectangle]);

      rectangle.on("mouseover", () => {
        rectangle.setOptions({
          //修改矩形属性的方法
          fillOpacity: 0.7,
          fillColor: "#7bccc4",
        });
      });

      rectangle.on("mouseout", () => {
        rectangle.setOptions({
          fillOpacity: 0.5,
          fillColor: "blue",
        });
      });
      //引入矩形编辑器插件
      map.plugin(["AMap.RectangleEditor"], function () {
        //实例化矩形编辑器，传入地图实例和要进行编辑的矩形实例
        var rectangleEditor = new AMap.RectangleEditor(map, rectangle);
        //开启编辑模式
        rectangleEditor.open();
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});
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

#map-container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>

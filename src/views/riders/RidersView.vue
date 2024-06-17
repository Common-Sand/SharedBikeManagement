<template>
  <div class="common-layout">
    <el-container class="app-wrapper">
      <el-aside width="210px" class="sidebar-container">
        <Menu />
      </el-aside>
      <el-container class="container">
        <el-header class="header"><Header></Header></el-header>
        <el-main class="main">
          <el-card>
            <el-row :gutter="20" class="input">
              <el-col :span="10">
                <el-input
                  placeholder="输入要查找的骑手"
                  clearable
                  v-model="queryForm.query"
                ></el-input>
              </el-col>
              <el-button type="primary" :icon="Search">搜索</el-button>
              <el-button type="primary" v-if="showButton">添加骑手</el-button>
            </el-row>

            <el-table
              :data="tableData"
              :default-sort="{ prop: 'username', order: 'accending' }"
              border
              style="width: 100%"
              class="riderTable"
            >
              <el-table-column prop="avatar" label="头像">
                <template v-slot="scope">
                  <img :src="scope.row.avatar" alt="" width="90" height="90" />
                </template>
              </el-table-column>
              <el-table-column
                :prop="item.prop"
                :label="item.label"
                v-for="(item, index) in options"
                :sortable="item.label"
                :key="index"
              />

              <el-table-column fixed="right" label="操作" width="180">
                <template #default="scope">
                  <el-button
                    link
                    type="primary"
                    size="small"
                    @click.prevent="hello(scope.$index)"
                  >
                    查看详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="pagination"
              v-model:current-page="queryForm.pagenum"
              v-model:page-size="pageSize4"
              :page-sizes="[10, 20, 35, 50]"
              background="background"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Menu from "@/layout/Menu/Aside.vue";
import Header from "@/layout/Header/header.vue";
import { Search } from "@element-plus/icons-vue";
import { options } from "@/views/riders/options.js";
// import {riders} from "@/api/riders.ts"
const queryForm = ref({
  query: "",
  pagenum: 10,
});
const total = ref(15);
const showButton = ref(false);
// const initGetRidersList = async()=>{
//   const res = await getRider(queryForm.value)
//   console.log(res)
// }
const tableData = [
  {
    avatar: "/src/assets/bike.svg",
    rider_id:"1",
    username: "Tom",
    phone: "13916421774",
    age: "30",
  },
  {
    avatar: "/src/assets/bike.svg",
    rider_id:"2",
    username: "Jerry",
    phone: "18055092345",
    age: "26",
  },
  {
    avatar: "/src/assets/bike.svg",
    rider_id:"3",
    username: "casg",
    phone: "12345678901",
    age: "50",
  },
  {
    avatar: "/src/assets/bike.svg",
    rider_id:"4",
    username: "Test",
    phone: "11112222334",
    age: "10",
  },
];
</script>

<style lang="scss">
.input {
  padding-bottom: 15px;
  box-sizing: border-box;
}
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

.pagination {
  margin-top: 20px;
  margin-left: 10%;
}
</style>

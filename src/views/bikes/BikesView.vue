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
                  placeholder="输入要查找的单车"
                  clearable
                  v-model="queryForm.query"
                ></el-input>
              </el-col>
              <el-button type="primary" :icon="Search" @click="initBikeList">搜索</el-button>
              <el-button type="primary" v-if="showButton" @click="AddBike">添加单车</el-button>
            </el-row>
            <el-table
              :data="tableData"
              :default-sort="{ prop: 'username', order: 'accending' }"
              border
              style="width: 100%"
              class="riderTable"
            >
              <el-table-column
                :prop="item.prop"
                :label="item.label"
                v-for="(item, index) in options"
                :sortable="item.sortable"
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
                  <el-button
                    link
                    type="primary"
                    size="small"
                    @click.prevent="hello(scope.$index)"
                  >
                    关锁
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
import { options } from "@/views/bikes/options.js";
const total = ref(0);
const showButton = ref(false);
const queryForm = ref({
  query: "",
  pagenum: 10,
});
const tableData = [
  {

  }
]
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

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
                  placeholder="输入要查找的禁停区"
                  clearable
                  v-model="queryForm.query"
                ></el-input>
              </el-col>
              <el-button type="primary" :icon="Search" @click="initGetZoneList">搜索</el-button>
              <el-button type="primary" @click="$router.push({ name: 'map' })">添加禁停区</el-button>
            </el-row>
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              class="ZoneTable"
            >
              <el-table-column
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
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
                    @click.prevent="$router.push({name:'map'})"
                  >
                    查看详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="pagination"
              v-model:current-page="queryForm.pageNum"
              v-model:page-size="pageSize"
              :page-sizes="[5, 10, 15, 20]"
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
import { options } from "@/views/nonparking/options.js";
import { useRoute } from "vue-router";
import { getZones } from "@/api/zone";

const pageNum = ref(1);
const total = ref(1);
const pageSize = ref(5);

const tableData = ref();

const initGetZoneList = async () => {
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    id: queryForm.value.query?queryForm.value.query:null
  };
  let res = await getZones(params);
  total.value = res.data.total;
  tableData.value = res.data.items;
  console.log(res);
};
const handleSizeChange = (size) => {
  pageSize.value = size;
  initGetZoneList()
};
const handleCurrentChange = (num) => {
  pageNum.value = num;
  initGetZoneList()
};
const queryForm = ref({
  query:'',
  pageNum:''
});
initGetZoneList()
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

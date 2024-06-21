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
            <el-form inline>
              <el-form-item class="selecter" label="状态">
                <el-select placeholder="请选择" v-model="status">
                  <el-option
                    v-for="item in status_list"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="input">
                <el-input
                  placeholder="输入要查找的单车"
                  clearable
                  v-model="queryForm.query"
                ></el-input>
              </el-form-item>

              <el-form-item class="searchbutton">
                <el-button
                  type="primary"
                  :icon="Search"
                  @click="initGetBikeList"
                  >搜索</el-button
                >
              </el-form-item>

              <el-form-item class="resetbutton">
                <el-button @click="status='';queryForm.query='';">重置</el-button>
              </el-form-item>

              <el-form-item class="addbutton">
                <el-button type="primary" v-if="showButton" @click="AddBike"
                  >添加单车</el-button
                >
              </el-form-item>
            </el-form>

            <el-table
              :data="tableData"
              :default-sort="{ prop: 'id', order: 'accending' }"
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
                    @click.prevent="$router.push({name:'map'})"
                  >
                    查看详情
                  </el-button>
                  <el-button
                    link
                    type="primary"
                    size="small"
                    @click.prevent="changeStatus(scope.$index)"
                  >
                    关锁
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
import { options } from "@/views/bikes/options.js";
import { getBikes } from "@/api/bikes";
const showButton = ref(false);
const status = ref("");
//分页
const pageNum = ref(1);
const total = ref(1);
const pageSize = ref(5);
const initGetBikeList = async () => {
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    status: status.value ? status.value : null,
    deployTime: null,
    id: queryForm.value.query?queryForm.value.query:null
  };
  let res = await getBikes(params);
  total.value = res.data.total;
  tableData.value = res.data.items;
  console.log(res);
};
const queryForm = ref({
  query:'',
  pageNum:''
});
const tableData = ref();
const status_list = [
  {
    label: "已上锁",
    value: "LOCKED",
  },
  {
    label: "未上锁",
    value: "UNLOCKED",
  },
  {
    label: "已损坏",
    value: "DAMAGED",
  },
  {
    label: "维修中",
    value: "REPAIRING",
  },
  {
    label: "无服务",
    value: "UNDEPLOYED",
  },
];
const handleSizeChange = (size) => {
  pageSize.value = size;
  initGetBikeList()
};
const handleCurrentChange = (num) => {
  pageNum.value = num;
  initGetBikeList()
};

initGetBikeList();
</script>

<style lang="scss">
.input {
  box-sizing: border-box;
  margin-bottom: 2px;
}
.selecter {
  width: 180px;
  box-sizing: border-box;
  text-align: center;
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

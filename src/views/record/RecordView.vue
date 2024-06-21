<template>
  <div class="common-layout">
    <el-container class="app-wrapper">
      <el-aside width="210px" class="sidebar-container">
        <Menu/>
      </el-aside>
      <el-container class="container">
        <el-header class="header"><Header></Header></el-header>
        <el-main class="main">       
          <el-card>
            <el-form inline>
              

              <el-form-item class="input">
                <el-input
                  placeholder="输入要查找的骑行记录"
                  clearable
                  v-model="queryForm.query"
                ></el-input>
              </el-form-item>
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
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="pagination"
              v-model:current-page="queryForm.pagenum"
              v-model:page-size="pageSize4"
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
import { options } from "@/views/record/options.js";
import { useRoute } from "vue-router";
const route=useRoute();
const total = ref(10);
const showButton = ref(false);
const queryForm = ref({
  query: "",
  pagenum: 10,
});
const tableData=[  
{"id":1, "rid":101, "bid":201, "start_location":'34.052235,-118.243683', "end_location": '36.778259,-119.417931', 
"status": "RUNNING", "start_time":'2024-06-21 08:00:00', "end_time":'2024-06-21 10:00:00' },
{"id":2, "rid":102, "bid":202, "start_location":'40.712776,-74.005974', "end_location": '34.052235,-118.243683', 
"status": "RUNNING", "start_time":'2024-06-21 09:00:00', "end_time":'2024-06-21 11:00:00' },
{"id":3, "rid":103, "bid":203, "start_location":'37.774929,-122.419418', "end_location": '40.712776,-74.005974', 
"status": "RUNNING", "start_time":'2024-06-21 07:30:00', "end_time":'2024-06-21 09:30:00'},
{"id":4, "rid":104, "bid":204, "start_location":'51.507351,-0.127758', "end_location": '48.856613,2.352222', 
"status": "RUNNING", "start_time":'2024-06-21 10:00:00', "end_time":'2024-06-21 12:00:00'},
{"id":5, "rid":105, "bid":205, "start_location":'48.856613,2.352222', "end_location": '52.520008,13.404954', 
"status": "RUNNING", "start_time":'2024-06-21 11:00:00', "end_time":'2024-06-21 13:00:00'},
{"id":6, "rid":106, "bid":206, "start_location":'34.052235,-118.243683', "end_location": '40.712776,-74.005974', 
"status": "COMPLETED", "start_time":'2024-06-21 12:00:00', "end_time":'2024-06-21 14:00:00'},
{"id":7, "rid":107, "bid":207, "start_location":'37.774929,-122.419418', "end_location": '51.507351,-0.127758', 
"status": "COMPLETED", "start_time":'2024-06-21 13:00:00', "end_time":'2024-06-21 15:00:00'},
{"id":8, "rid":108, "bid":208, "start_location":'48.856613,2.352222', "end_location": '34.052235,-118.243683', 
"status": "RUNNING", "start_time":'2024-06-21 14:00:00', "end_time":'2024-06-21 16:00:00'},
{"id":9, "rid":109, "bid":209, "start_location":'52.520008,13.404954', "end_location": '37.774929,-122.419418', 
"status": "COMPLETED", "start_time":'2024-06-21 15:00:00', "end_time":'2024-06-21 17:00:00'},
{"id":10,"rid":110, "bid":210, "start_location":'40.712776,-74.005974', "end_location": '48.856613,2.352222', 
"status": "COMPLETED", "start_time":'2024-06-21 16:00:00', "end_time":'2024-06-21 18:00:00'}
]
const status_list =[
{
    label: "进行中",
    value: "RUNNNING",
  },
  {
    label: "已完成",
    value: "COMPLETED",
  },
]
</script>

<style lang="scss" >
.input {
  padding-bottom: 15px;
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
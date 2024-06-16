<template>
  <div class="login-container">
    <el-form class="login-form" ref="formRef" :model="form" :rules="rules">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item class="username" prop="username">
        <el-input
          :prefix-icon="User"
          v-model="form.username"
          placeholder="请输入用户名"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item class="password" prop="password">
        <el-input
          :prefix-icon="Lock"
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <div class="buttons">
        <el-button class="login-button" type="primary" @click="handleLogin"
          >登录</el-button
        >
        <el-button
          class="register-button"
          @click="$router.push({ name: 'register' })"
          >注册</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { login } from "@/api/login";

const formRef = ref(null);
const form = ref({
  username: "",
  password: "",
});

const rules = ref({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});

const handleLogin = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      // alert("submit!");
      console.log(form.value);
      await login(form.value);
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
</script>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 350px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 62px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 62px;
        caret-color: $cursor;
      }
    }

    .buttons {
      margin: 0 auto;
      .login-button {
        margin-left: 0;
        width: 45%;
        box-sizing: border-box;
      }
      .register-button {
        margin-right: 0;
        width: 45%;
        box-sizing: border-box;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>

<template>
  <div class="register-container">
    <el-form
      class="register-form"
      ref="registerFormRef"
      :model="form"
      :rules="rules"
    >
      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>
      <el-form-item class="username" prop="username">
        <el-input
          :prefix-icon="User"
          v-model="form.username"
          type="text"
        ></el-input>
      </el-form-item>
      <el-form-item class="password" prop="password">
        <el-input
          :prefix-icon="Lock"
          v-model="form.password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="pwdCheck" prop="pwdCheck">
        <el-input
          :prefix-icon="Unlock"
          v-model="form.pwdCheck"
          type="password"
          show-password
        ></el-input>
      </el-form-item>

      <el-button class="back-button" @click="$router.push({ name: 'login' })">
        <el-icon><Back /></el-icon>
        已有账号？返回登录
      </el-button>

      <el-button class="register-button" type="primary" @click="handleRegister"
        >注册</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { User, Lock, Unlock, Back } from "@element-plus/icons-vue";
import { register } from "@/api/register.ts"

// console.log(register);
const registerFormRef = ref(null);
const form = ref({
  username: "",
  password: "",
  pwdCheck: "",
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
    {
      min: 6,
      max: 20,
      message: "长度在6到20字符之间",
      trgger: "blur",
    },
  ],
  pwdCheck: [
    {
      required: true,
      message: "请确认密码",
      trigger: "blur",
    },
    {
      min: 6,
      max: 20,
      message: "长度在6到20字符之间",
      trgger: "blur",
    },
  ],
});

const handleRegister = async () => {
  registerFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(form.value);
      await register(form.username,form.password);
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
$black: #fff;

.register-container {
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
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
      height: 35px;
      width: 100%;

      input {
        background: transparent;
        border: 0px;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        -webkit-appearance: none;
        color: $black;
        height: 35px;
        caret-color: $cursor;
      }
    }

    .register-button {
      position: relative;
      right: 0;
      width: 45%;
      box-sizing: border-box;
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

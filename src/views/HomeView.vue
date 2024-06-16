<template>
    <div class="main-page">
        <p>Hello</p>
        <el-button class="login-button" type="primary" @click="$router.push({ name: 'login' })"
          >登录</el-button
        >
    </div>
    
</template>

<script setup>
import { ref } from "vue";
</script>
<style lang="scss">

</style>
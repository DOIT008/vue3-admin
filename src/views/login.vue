<template>
  <div class="login">
    <div class="login-wrapper">
      <h2 class="login-title">扫码点餐客户端</h2>
      <el-form :model="form" label-width="40px" class="form-wrapper">
        <el-form-item label="账号">
          <el-input v-model="form.name" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" :class="{ 'password-wrapper': isLogin }">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码" v-if="!isLogin" label-width="69px" class="password-wrapper">
          <el-input v-model="form.confirmPwd" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-button size="small" v-if="isLogin" link class="register-btn" @click="switchStatus">注册</el-button>
        <el-button size="small" v-else link class="register-btn" @click="switchStatus">登录</el-button>
        <div style="clear:both"></div>
        <div class="login-btn-wrapper">
          <el-button class="login-btn" v-if="isLogin" type="primary" @click="getBeauties">登录</el-button>
          <el-button class="login-btn" v-else type="primary" @click="register" plain>注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" >
import { ref, reactive, toRefs, getCurrentInstance, ComponentInternalInstance } from "vue";
import { handleMD5 } from "@/utils/public";
import { useRouter, useRoute } from 'vue-router';
import { mainStore } from '@/store/index';
import { getHotNews } from '@/api/user';
import {storeToRefs} from 'pinia'

interface FormData {
  name: string
  password: string,
  confirmPwd: string
}
interface ReacData {
  isLogin: boolean
}
export default {
  name: 'login',
  setup() {
    const store = mainStore();
    // 断言，因为getCurrentInstance（）可能是null
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    // proxy?.$http
    const form = reactive<FormData>({
      name: '',
      password: '',
      confirmPwd: ''
    })
    // 所有其他数据
    const reacData = reactive<ReacData>({
      isLogin: true
    })
    // 路由对象
    const router = useRouter()

    // 登录方法
    function login(): void {
      store.login(form).then(res => { 
       router.push('/home')
      })
    }

    // 获取热点信息
    function getBeauties(): void{ 
      getHotNews({ key: 'bd946b1c08d936d82998fe92b8691893', page: 2, pageSize: 12 }).then(res => {
        // response.error_code
        // response.result.pageSize
        // let response = res.data; 
        console.log('res---',res);
      })
    }
    // 切换当前的状态
    function switchStatus(): void {
      reacData.isLogin = !reacData.isLogin
    }

    function register(): void {

    }

    return {
      form,
      login,
      router,
      register,
      switchStatus,
      getBeauties,
      ...toRefs(reacData)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('@/assets/login_bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-wrapper {
    width: 300px;
    padding: 20px;
    border-radius: 5px;
    background: rgb(252, 220, 123);

    .form-wrapper {
      .password-wrapper {
        margin-bottom: 5px;
      }

      .register-btn {
        float: right;
      }

      .login-btn-wrapper {
        text-align: center;

        .login-btn {
          width: 160px;
        }
      }
    }
  }

  .login-title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
}
</style>
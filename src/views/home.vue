<template>
  <div class="home">
    <el-container>
      <el-header class="header-wrapper">
        <div>
          Vue3+TS+ElememtPlus后台模板
          <el-button plain type="primary" class="collapse-btn" @click="collapseClick">
            <el-icon>
              <Fold v-if="isCollapse" />
              <Expand v-else />
            </el-icon>
          </el-button>
        </div>
        <div>{{ userName }}</div>
        <img :src="avatar" alt="">
        <el-button link type="primary" @click="logout" >退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="asideWidth" style="height:calc(100vh - 60px );">
          <el-menu :default-active="defaultActive" :collapse="isCollapse" router class="el-menu-vertical">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="navigator1">navigator1</el-menu-item>
                <el-menu-item index="navigator2">navigator2</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- tab标签页 -->
          <menuTab/>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" >
import { ArrowLeft } from '@element-plus/icons-vue'
import { defineComponent, reactive, toRefs,watch} from 'vue';
import { useRouter, useRoute,onBeforeRouteUpdate } from "vue-router";
import menuTab from '@/components/tabs.vue'
import { mainStore } from '@/store/index';
import {storeToRefs} from 'pinia'
interface State {
  isCollapse: boolean
  asideWidth: string
  defaultActive: string
}
export default defineComponent({
  setup() {
    const store = mainStore();
    const router = useRouter()
    const {userName,avatar} = storeToRefs(store)
    const route = useRoute();
    const state = reactive<State>({
      isCollapse: false,
      asideWidth: '200px',
      defaultActive: 'navigator1'
    });
    // 刷新时动态更新当前激活菜单
    state.defaultActive = (useRoute().name) as string
    // 折叠控制
    function collapseClick(): void {
      state.isCollapse = !state.isCollapse;
      if (state.isCollapse) {
        state.asideWidth = '64px'
      } else {
        state.asideWidth = '200px'
      }
    }
 
    // 监控路由变化,当删除某一个tab的时候，更新左侧菜单栏哪一个菜单激活
    watch(route,(newVal,oldVal)=>{
      console.log('newVal',newVal);
      state.defaultActive = newVal.path.slice(1)
    })

    // 退出登录
    function logout() { 
      store.logout().then(res => { 
        router.push('/login')
      })
    }

    return {
      ...toRefs(state),
      collapseClick,
      logout,
      userName,
      avatar
    };
  },
  components: { ArrowLeft,menuTab }
})
</script>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #333;
  color:#fff
}

.el-menu-vertical {
  height: 100%;
}

.collapse-btn {
  margin-left: 10px;
}
</style>
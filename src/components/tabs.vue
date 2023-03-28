<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="card"
      editable
      class="demo-tabs"
      @tab-click="handleClick"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        :label="item.title"
        v-for="item in tabList"
        :key="item.path"
        :name="item.path"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { TabPaneName, TabsPaneContext, ElMessage } from 'element-plus';
import { reactive, toRefs, defineComponent, onMounted } from 'vue';
// 引入mainStore实例
import { mainStore } from '@/store/index';
// 响应式解构
import { storeToRefs } from 'pinia';
import { onBeforeRouteUpdate, RouteLocationRaw, useRoute, useRouter } from 'vue-router';

interface State {
  activeName: string;
}
export default defineComponent({
  name: 'menuTab',
  setup() {
    const router = useRouter();
    const store = mainStore();
    const { tabList } = storeToRefs(store);
    const state = reactive<State>({
      activeName: '',
    });
    // tab编辑事件，点击tab切换路由
    function handleClick(pane: TabsPaneContext, ev: Event) {
      router.push(pane.props.name as RouteLocationRaw); // 断言
    }
    // 初始化更新tab
    onMounted(() => {
      updateTabList(useRoute());
    });
    // 路由守卫
    onBeforeRouteUpdate((to, from) => {
      updateTabList(to);
    });
    // 公共方法
    function updateTabList(route: any) {
      store.$patch((store) => {
        // 看下数组中有没有该数据，如果有则激活，没有就添加
        const currentRoute = store.tabList.find((item) => item.path === route.path);
        if (currentRoute) {
          state.activeName = currentRoute.path;
        } else {
          store.tabList.push({ path: route.path, title: route.meta.title as string });
          state.activeName = route.path;
        }
      });
    }
    // 删除tab
    function tabRemove(tabName: TabPaneName) {
      console.log(tabName);
      // 在tabList中找到要删除的那一项的下标
      const index = store.tabList.findIndex((item) => item.path === tabName);
      // 如果tablist大于1
      if (store.tabList.length > 1) {
        store.tabList.splice(index, 1); // 删除对应项
        state.activeName = store.tabList[store.tabList.length - 1].path; // 激活剩下tabs中的最后一个
        router.push(state.activeName); // 更新路由
      } else {
        return ElMessage.error('已经是最后一个了哦~');
      }
    }
    return {
      ...toRefs(state),
      handleClick,
      tabList,
      tabRemove,
    };
  },
});
</script>

<style lang="scss" scoped></style>

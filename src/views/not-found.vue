<template>
  <div class="not-found-page">
    <img src="@/assets/404.gif" alt="404页面" class="no-page" />
    <div class="go-back-wrapper">
      <el-button plain type="primary" @click="router.back()">返回</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>

<style lang="scss" scoped>
.not-found-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .no-page {
    width: 500px;
  }
  .go-back-wrapper {
    width: 100%;
    text-align: center;
  }
}
</style>

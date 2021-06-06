<template>
  <div id="app">
    <!-- 正常情况下，点击其他页面后，home 就会销毁，这里设置使其不再销毁 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'

  export default {
    name: "app",
    components: {
      MainTabBar
    }
  }
</script>

<style>
/* 使用 路径别名 */
  @import "assets/css/base.css"
</style>

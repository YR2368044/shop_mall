<template>
  <div id="tab-bar">
    <!-- 预留插槽 -->
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;

    /* 置于屏幕底端 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /* 设置阴影：水平不偏移，垂直向上偏移 1px，阴影长度为1px */
    box-shadow: 0 -1px 2px rgba(100, 100, 100, .2);
    z-index: 9;
  }
</style>
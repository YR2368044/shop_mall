<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style>
  .check-button{
    display: flex;
    align-items: center;
    height: 14px;
    width: 14px;
    border: 2px solid #aaa;
  }

  .check-button img{
    /* 图标原始大小为 16*16 */
    width: 10px;
    height: 10px;
  }

  /* 选中状态下边框颜色和背景颜色一样 */
  .check{
    background-color: rgb(255,129,152);
    border-color: rgb(255,129,152);
  }
</style>
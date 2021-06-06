<template>
  <!-- better-scroll 要想滚动，scroll 的父元素必须设置确定的高度!!! -->
  <div class="shopcart-list">
    <!-- 而 scroll 的高度是可滚动区域的高度 -->
    <scroll class="cartcontent"
            ref="scroll">
      <shopcart-list-item v-for="(item, index) in cartList" 
                          :key="index"
                          :product="item"></shopcart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import ShopcartListItem from './ShopcartListItem'

  import {mapGetters} from 'vuex'

  export default {
    name: "ShopcartList",
    components: {
      Scroll,
      ShopcartListItem
    },
    computed: {
      ...mapGetters([
        "cartList"
      ])
    },
    // 重新计算可滚动的高度
    activated() {
      this.$refs.scroll.refresh()
    },
  }
</script>

<style>
  .shopcart-list{
    height: calc(100% - 44px - 49px - 35px);
  }

  .cartcontent{
    height: 100%;
    overflow: hidden;
  }
</style>
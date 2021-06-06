<template>
  <div class="shop-cart">
    <!-- 1.导航 -->
    <nav-bar class="shop-cart-nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
      <!-- <div slot="center">购物车({{length}})</div> -->
    </nav-bar>

    <!-- 2.商品列表 -->
    <shopcart-list></shopcart-list>

    <!-- 3.底部汇总 -->
    <shopcart-bottom-bar></shopcart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import ShopcartList from './childComps/ShopcartList'
  import ShopcartBottomBar from './childComps/ShopcartBottomBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Shopcart",
    components: {
      NavBar,
      ShopcartList,
      ShopcartBottomBar
    },
    // 这样仍然很麻烦，相当于把 getters 中的代码又写了一遍，
      // 可以使用 mapGetters 把 getters 直接转成 computed 
    // computed: {
    //   cartLength(){
    //     // 使用getters里的方法，不用加括号
    //     return this.$store.getters.cartLength
    //   }
    // }
    computed: {
      // 两种写法
      // 第一种(数组)
      ...mapGetters([
        "cartLength"
      ])

      // 第二种(对象，相当于可以重命名)
      // ...mapGetters({
      //   length: "cartLength"
      // })
    }
  }
</script>

<style>
  .shop-cart{
    height: 100vh;
  }

  .shop-cart-nav-bar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    font-size: 18px;
  }

</style>

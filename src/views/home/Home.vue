<template>
  <div id="home">
    <nav-bar class="nav-home"><div slot="center">yr商城</div></nav-bar>
    <tab-control class="tab-control" 
                    :titles='["流行", "新款", "精选"]'
                    @tabClick="tabClick"
                    ref="tabControlone"
                    v-show="isTabFixed"></tab-control>
    <scroll class="scrollcontent" 
                  ref="scroll" 
                  :probe-type="3" 
                  @scroll="contentScroll"
                  :pull-up-load="true"
                  @pullingUp="loadMore">
      <!-- 父组件 传值给 子组件，:动态绑定给变量 -->
      <home-swiper :banners="banners" 
                    @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" 
                    :titles='["流行", "新款", "精选"]'
                    @tabClick="tabClick"
                    ref="tabControltwo"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 组件不能直接监听点击事件，需要添加 native -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {itemListenerMixin} from 'common/mixin'

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          "pop": {page: 0, list: []},
          "new": {page: 0, list: []},
          "sell": {page: 0, list: []}
        },
        currentType: "pop",
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        // 属性也可以使用 mixin
        // itemImgListener: null
      }
    },
    mixins: [itemListenerMixin],
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidataInMethods()

      // 2.请求商品数据
      this.getHomeGoodsInMethods("pop")
      this.getHomeGoodsInMethods("new")
      this.getHomeGoodsInMethods("sell")
    },

    // 使用 mixin 简化以下代码
    // mounted() {
    //   // 3.使用事件总线监听 item 中图片加载完成
    //   // 使用 防抖函数 对 refresh 函数做防抖操作
    //   let newRefresh = debounce(this.$refs.scroll.refresh, 200)
    //   // 保存监听的事件
    //   this.itemImgListener = () => {
    //     // console.log("------");
    //     // refresh 重新计算可滚动的高度
    //     newRefresh()
    //   }
    //   this.$bus.$on("itemImageLoad", this.itemImgListener)
    // },

    // 离开 home 页面，home 会销毁
    // destroyed() {
      // console.log("home destroyed")
    // },
    
    // 以下两个函数用于记录离开 home 时的位置，但是设置了 keep-alive 属性才可以使用者两个生命周期函数
    activated() {
      // console.log("activated")
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // console.log("deactivated")
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 2.组件销毁前取消全局事件的监听(需要指定取消哪一个函数)
      this.$bus.$off("itemImageLoad", this.itemImgListener)
    },
    methods: {
      // 事件监听相关的方法
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = "pop"
            break
          case 1:
            this.currentType = "new"
            break
          case 2:
            this.currentType = "sell"
            break
        }
        // 让两个 tabControl 的 currentIndex 保持一致
        this.$refs.tabControlone.currentIndex = index 
        this.$refs.tabControltwo.currentIndex = index 
      },
      backClick(){
        // 获取 scroll 对象，第三个参数为返回顶部所用时间
        this.$refs.scroll.scrollTo(0, 0, 200)
      },
      contentScroll(position){
        // position.y 是个负值，先转为正值
        // 1.判断 BackTop 图标是否显示
        this.isShowBackTop = -position.y > 1000

        // 2.决定 tabControl 是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoodsInMethods(this.currentType)
      },
      swiperImageLoad(){
        // 获取 tabControl 的 offsetTop
        // 所有组件都有一个属性 $el，用于获取组件的元素
        this.tabOffsetTop = this.$refs.tabControltwo.$el.offsetTop
      },
      // 网络请求相关方法
      getHomeMultidataInMethods(){
        getHomeMultidata().then(res => {
          // console.log(res)
          // 把数据存起来
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoodsInMethods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res)
          // 把数据存起来
          // 扩展运算符 ... 将数组转换为逗号分隔的参数序列，然后将多个参数 push 进去
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多 
          this.$refs.scroll.finishPullUp()
      })
      }
    },
  }
</script>

<style>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
    /* padding-bottom: 49px; */
  }

  .nav-home{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    font-size: 18px;

    /* 使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9; */
  }

  /* 实现 tab-control 滑动到一定位置停住的效果 */
  /* .tab-control{ */
    /* position: sticky; */
    /* top: 44px; */
    /* z-index: 9; */
  /* } */

  .scrollcontent{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }

  /* .scrollcontent{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>

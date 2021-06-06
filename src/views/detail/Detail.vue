<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" 
                    @titleClick="titleClick"
                    ref="nav"></detail-nav-bar>
    <scroll class="detailcontent" 
            ref="scroll"
            :probe-type="3"
            @scroll="detailContentScroll">
      <!-- 属性：topImages，传入值：top-images -->
      <detail-swiper :top-images="topImages" 
                      @detailSwiperImgLoad="detailSwiperImgLoad"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"
                        @DetailShopInfoLoad="DetailShopInfoLoad"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" 
                          @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" 
                          ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" 
                            ref="comment"></detail-comment-info>
      <goods-list :goods="detailrecommends" 
                  ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" 
              v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :isShow="isShow"></toast> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  // import Toast from 'components/common/toast/Toast'

  import {getDetail, 
          Goods, 
          Shop, 
          GoodsParam, 
          getRecommend} from 'network/detail'
  import {itemListenerMixin, 
          backTopMixin} from 'common/mixin'
  import {debounce} from 'common/utils'

  // mapActions 可以将 actions 中的方法映射到组件中，
    // 这样在使用 actions 中的方法时,就可以省略 $store.dispatch
  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}, 
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        detailrecommends: [],
        // 使用 mixin 简化代码
        // itemImgListener: null
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // message: "",
        // isShow: false
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
      // Toast
    },
    methods: {
      ...mapActions(["addCart"]),
      imageLoad(){
        this.$refs.scroll.refresh()
        // 图片全部加载完再计算 offsetTop
        this.getThemeTopY()
      },
      detailSwiperImgLoad(){
        this.$refs.scroll.refresh()
      },
      DetailShopInfoLoad(){
        this.$refs.scroll.refresh()
      },
      // 详情页点击顶部文字跳转到相应部分功能的实现
      titleClick(index){
        // console.log(index)
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      backClick(){
        // 获取 scroll 对象，第三个参数为返回顶部所用时间
        this.$refs.scroll.scrollTo(0, 0, 200)
      },
      // 滚动详情页内容和对应标题联动的实现
      detailContentScroll(position){
        // console.log(position);
        // 1.获取y值
        const positionY = -position.y

        // 2.positionY 和主题中的值进行对比
        // 输出的 offsetTop 数组：[0, 9383, 10125, 10125]

        // position 在 0 到 9383 间，index = 0
        // position 在 9383 到 10125 间，index = 1
        // position 在 10125 到 10125 间，index = 2

        // position 大于等于 10125 ，index = 3

        // 1.for in 循环的注意事项
        // for(let i in this.themeTopYs){  // 注意：i 是 String 类型，3 + 1 会转换为 31，themeTopYs[i + 1] 取不到，if 条件永远不满足
          // console.log(i+1);
          // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          //   console.log(i); //无法输出
          // }
        // }

        // 2.原始循环 i+1 会越界，报错，所以最后一种情况要和前面三种分开讨论
        // let length = this.themeTopYs.length
        // for(let i = 0; i < length; i++){
        //   if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
        //     console.log(i);
        //   }
        // }

        // 3.两种情况分开讨论：在 0 和某个数字之间(i < length - 1)，判断大于等于(i === length - 1)
        // let length = this.themeTopYs.length
        // for(let i = 0; i < length; i++){
        //   // this.currentIndex !== i 防止赋值过程过于频繁打印过多
        //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || 
        //       (i === length - 1 && positionY >= this.themeTopYs[i]))){
        //     this.currentIndex = i
        //     // console.log(this.currentIndex)
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }

        // 4.在 themeTopYs 数组末尾添加一个很大的数，将两种情况变成一种，都是判断是否在一个区间
          // 但是为了防止越界，应该使 length - 1
        let length = this.themeTopYs.length
        for(let i = 0; i < length - 1; i++){
          if(this.currentIndex !== i && 
              (positionY >= this.themeTopYs[i] && 
                positionY < this.themeTopYs[i + 1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // 是否显示回到顶部
        this.isShowBackTop = -position.y > 1000
      },
      addToCart(){
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 2.将商品添加到购物车
        // this.$store.commit("addCart", product) // mutations提交

        // (1).不使用 mapActions 映射
        // this.$store.dispatch("addCart", product).then(res => { // actions
        //   console.log(res)
        // }) 

        // (2).使用 mapActions 映射
        this.addCart(product).then(res => { // actions
          // console.log(res)

          // 1.普通的组件封装方式使用 toast
          // this.isShow = true // 显示 toast
          // this.message = res
          // setTimeout(() => {
          //   this.isShow = false // 过一段时间 toast 消失
          // }, 1500)

          // 2.插件封装方式使用 toast
          this.$toast.showToast(res)
        }) 
      }
    },
    // updated() {
    //   // 因为只要有值的变化，updated 函数被调用，所以每次调用给数组先赋空值
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // },

    // 使用 mixin 简化下列代码
    // mounted() {
      // let newRefresh = debounce(this.$refs.scroll.refresh, 200)
      // this.itemImgListener = () => newRefresh()
      // this.$bus.$on("itemImageLoad", this.itemImgListener)
    // },

    // 由于之前 exclude 了 Detail 组件，没有缓存，所以 activated 和 deactivated 不会被调用
    destroyed() {
      this.$bus.$off("itemImageLoad", this.itemImgListener)
    },
    created() {
      // 1.保存传入的 iid
      this.iid = this.$route.params.iid

      // 2.根据 iid 请求详情数据
      getDetail(this.iid).then(res => {
        // 取出数据保存为 data
        const data = res.result
        // 1.获取顶部轮播图的数据
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 5.保存商品的参数数据
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.保存商品的评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // 除了在 updated 中实现点击文字到达相应区域的效果，这里也可以
        // 但是必须等到 DOM 刷新完且图片加载完再获取 offsetTop 才是准确的，可以使用 $nextTick
        // 但是这里只是 DOM 被渲染出来了，图片没有加载完，offsetTop的值也不对
        // this.$nextTick(() => {
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // })
      })
    
      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res)
        // 7.保存商品的推荐数据
        this.detailrecommends = res.data.list
      })

      // 4.给 getThemeTopY 赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
      }, 200)
    },
  }
</script>

<style>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .detailcontent{
    height: calc(100% - 44px - 49px);
    position: relative;
  }
</style>
<template>
  <div class="goods-item" @click="itemClick">
    <!-- 监听图片是否加载完成 -->
    <!-- <img :src="showImage" alt="" @load="imageLoad"> -->

    <!-- 使用懒加载 -->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsitem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      showImage(){
        // 商品推荐页复用该组件时使用的是 this.product.image，没有 show
        return this.goodsitem.image || this.goodsitem.show.img
      }
    },
    methods: {
      imageLoad(){
        // console.log("image loaded");
        // 1.使用事件总线发射事件，因为 home 组件和这个组件是非父子关系
        // 2.详情页的推荐数据会复用该组件，但是那个时候不应该让 home 组件refresh
          // 可以使用 路由 发出不同的事件 或 取消监听 来解决该问题

        // 法一：路由 
        // if (this.$route.path.indexOf("/home")) {
        //   this.$bus.$emit('homeitemImageLoad')
        // }else if(this.$route.path.indexOf("/detail")){
        //   this.$bus.$emit('detailitemImageLoad')
        // }

        // 法二：依然发出相同的事件，但是在 home 组件中取消监听
        this.$bus.$emit('itemImageLoad')
      },
      itemClick(){
        this.$router.push("/detail/" + this.goodsitem.iid)
      }
    },
  }
</script>

<style>
  .goods-item {
    /* 放文字的位置 */
    padding-bottom: 40px;
    /* 父元素开启相对定位 */
    position: relative;

  /* 写成比例，不要写死 */
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;

    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;

    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
<template>
  <div id="span-list" @click="spanListClick">
    <div>
      <img src="~assets/img/profile/message.svg" alt="">
      <span>我的消息</span>
    </div>
    <div>
      <img src="~assets/img/profile/shopping.svg" alt="">
      <span>积分商城</span>
    </div>
    <div>
      <img src="~assets/img/profile/vip.svg" alt="">
      <span>会员卡</span>
    </div>
    <div>
      <img src="~assets/img/profile/cart.svg" alt="">
      <span>我的购物车</span>
    </div>
    <div>
      <img src="~assets/img/profile/pointer.svg" alt="">
      <span>下载购物APP</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListView",
    methods: {
      spanListClick(){
        this.$toast.showToast("别点了，这一页都没写...")
      }
    },
  }
</script>

<style>
  #span-list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  #span-list img{
    width: 25px;
    height: 25px;
  }

  #span-list div{
    position: relative;
    padding: 10px;
    border-top: 1px solid #eee;
  }

  #span-list span{
    position: absolute;
    left: 45px;
    top: 15px;
  }
</style>
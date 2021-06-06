<template>
  <div id="profile">
    <nav-bar class="profile-nav-bar">
      <div slot="center">yr商城</div>
    </nav-bar>
    <!--1.单独封装一个组件-->
    <user-info></user-info>

    <!--2.没有单独封装: 不同的地方太多, 需要传过多的参数-->
    <section class="account">
      <div class="account-item" @click="moneyClick">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item" @click="discountClick">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item" @click="scoreClick">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <!--3.封装成一个整体-->
    <list-view class="span-list"></list-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'

  export default {
    name: "Profile",
    components: {
      NavBar,
      UserInfo,
      ListView
    },
    methods: {
      moneyClick(){
        this.$toast.showToast("穷的响叮当...")
      },
      discountClick(){
        this.$toast.showToast("运气不行...")
      },
      scoreClick(){
        this.$toast.showToast("不买东西哪来的积分...")
      },
    },
  }
</script>

<style>
  #profile {
    background-color: #f2f2f2;
  }

  .profile-nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    font-size: 18px;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item .balance {
    font-size: 20px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .span-list {
    margin-top: 10px;
  }
</style>

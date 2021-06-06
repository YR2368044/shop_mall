<template>
  <div id="user-info" @click="userInfoClick">
    <div class="user-avatar">
      <img src="~assets/img/profile/avatar.svg" alt="">
    </div>
    <div class="user-login-signup">
      <div><span class="text1">登录/注册</span></div>
      <div class="user-phone">
        <div class="phone-icon">
          <img src="~assets/img/profile/phone.svg" alt="">
        </div>
        <span class="text2">暂无绑定手机号</span>
      </div>
    </div>
    <div class="user-arrow">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    methods: {
      userInfoClick(){
        this.$toast.showToast("别点了，此处没有开发...", 1500)
      }
    },
  }
</script>

<style>
  #user-info {
    background-color: var(--color-tint);
    padding: 10px 10px 2px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user-avatar{
    margin-left: -75px;
  }

  .user-avatar img{
    width: 80px;
    height: 80px;
  }

  .user-login-signup{
    color: #fff;
    font-size: 15px;
  }

  .user-login-signup .text1{
    padding-left: 5px;
  }

  .user-phone{
    display: flex;
  }

  .user-phone img{
    width: 20px;
    height: 20px;
  }

  .phone-icon{
    width: 22px;
  }

  .user-arrow{
    position: relative;
    right: -80px;
  }

  .user-arrow img{
    width: 20px;
    height: 20px;
  }
</style>

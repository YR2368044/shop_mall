<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      // message: {
      //   type: String,
      //   dafault: ""
      // },
      // isShow: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        message: "",
        isShow: false
      }
    },
    methods: {
      showToast(message, duration = 1500){
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ""
        }, duration)
      }
    },
  }
</script>

<style>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    border-radius: 15px;
    color: #fff;
    background-color: rgba(0, 0, 0, .7);
    z-index: 999;

    width: 200px;
    text-align: center;
  }
</style>
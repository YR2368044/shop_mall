<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 插槽都用一个 div 包起来，防止被替换掉导致写的属性不生效 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: "rgb(253,119,144)"
      }
    },
    data() {
      return {
        // 不能写死，应该使用计算属性
        // isActive: true
      }
    },
    computed: {
      isActive(){
        // indexOf 寻找子串(等于 -1 代表没有找到)，判断当期活跃的路由是否含有传入的path
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick(){
        this.$router.push(this.path)
      }
    },
  }
</script>

<style>
  .tab-bar-item{
    /* 均等分 */
    flex: 1;
    text-align: center;
    /* tab-bar 的高度一般为 49 */
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
<template>
  <div ref="scrollwrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import ObserveDOM from '@better-scroll/observe-dom'
  BScroll.use(ObserveDOM)

  export default {
    name: "Scroll", 
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      data: {
		    type: Array,
        default(){
          return []
        }
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // 1.创建 BScroll 对象

      // 不要使用 document.querySelector(".wrapper")，因为可能拿到同名的元素，不一定是想要的
        // 推荐在元素上设置 ref 属性，然后使用 this.$refs.scrollwrapper 
      this.scroll = new BScroll(this.$refs.scrollwrapper, {
        click: true,
        // 直接设置 3，会导致只要使用该组件就会实时监听，但是有时不需要实时监听
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        ObserveDOM: true,
        observeImage: {
          debounceTime: 200 // ms
        }
      })

      // 2.监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on("scroll", position => {
          this.$emit("scroll", position)
        })
      }

      // 3.监听 scroll 滚动到底部 
      if(this.pullUpLoad){
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp")
        })
      }
    },
    methods: {
      // 设置参数默认值
      scrollTo(x, y, time = 200){
        // 如果 scroll 对象没有加载完成，它的值就是 null
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    },
    watch: {
		  data() {
        setTimeout(this.refresh, 20)
      }
    }
  }
</script>

<style>

</style>
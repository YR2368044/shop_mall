<template>
  <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <!-- 监听轮播图的图片是否加载完成，这样才能正确计算 offsetTop -->
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad(){
        // 只需发射一次即可，就可以获取 offsetTop
        if(!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    },
  }
</script>

<style>

</style>
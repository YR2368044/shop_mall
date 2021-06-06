<template>
  <!-- 注意类名不要重复 -->
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index" @load="detailSwiperLoad">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default(){
          return []
        }
      }
    },
    methods: {
      detailSwiperLoad(){
        this.$emit('detailSwiperImgLoad')
      }
    },
  }
</script>

<style>
  .detail-swiper{
    height: 350px;
    overflow: hidden;
  }
</style>
<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="detailgoods-info">
    <div class="detailinfo-desc clear-fix">
      <div class="detailstart">
      </div>
      <div class="detaildesc">{{detailInfo.desc}}</div>
      <div class="detailend"></div>
    </div>
    <div class="detailinfo-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="detailinfo-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" 
            :src="item" alt=""
            @load="imgLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      imgLoad(){
        // 判断所有的图片是否加载完，加载完进行一次回调即可
        if (++this.counter === this.imagesLength) {
          this.$emit('imageLoad')
        }
      }
    },
    watch: {
      detailInfo(){
        // 获取图片个数
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style>
  .detailgoods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .detailinfo-desc {
    padding: 0 15px;
  }

  .detailinfo-desc .detailstart, .detailinfo-desc .detailend {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .detailinfo-desc .detailstart {
    float: left;
  }

  .detailinfo-desc .detailend {
    float: right;
  }

  .detailinfo-desc .detailstart::before, .detailinfo-desc .detailend::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .detailinfo-desc .detailend::after {
    right: 0;
  }

  .detailinfo-desc .detaildesc {
    padding: 15px 0;
    font-size: 14px;
  }

  .detailinfo-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .detailinfo-list img {
    width: 100%;
  }
</style>
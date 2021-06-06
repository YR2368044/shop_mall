<template>
  <div id="shop-item" @click="checkClick">
    <div class="item-selector">
      <check-button :is-checked="product.checked"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">
          <span class="left">￥{{product.price}}</span>
        </div>
        <div class="item-count">
          <span class="right">x{{product.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "ShopcartListItem",
    props: {
      product: {
        type: Object,
        dafault(){
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    methods: {
      checkClick(){
        this.product.checked = !this.product.checked
      }
    },
  }
</script>

<style>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    display: flex;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 70px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

  .info-bottom .item-count .right {
    text-align: right;
  }
</style>
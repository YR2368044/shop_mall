<template>
  <div class="shopcart-bottom-bar">
    <div class="statistics">
      <check-button :is-checked="isSelectAll"
                    @click.native="selectAllClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算：({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name: "ShopcartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(["cartList"]),
      totalPrice(){
        return "￥" + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkedLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        // 默认情况下购物车没有数据，按钮为 不选中
        if (this.cartList.length === 0) return false

        // 1.使用 filter
        // 全选中，filter 返回的数组为空数组，空数组 length 为 0 ，取反则为 true
          // 只要有一个没选中，filter 返回的数组就至少有一个元素，取反则为 false
        // 但是该代码效率不高，因为会全部遍历
        // return !(this.cartList.filter(item => !item.checked).length)

        // 2.使用 find
        // find 只寻找满足条件的第一个 item(性能较高)
        // return !(this.cartList.find(item => !item.checked))

        // 3.普通遍历
        for(let item of this.cartList){
          if(!item.checked){
            return false // return 相当于 break
          }
        }
        return true
      }
    },
    methods: {
      selectAllClick(){
        // 1.自己写的
        // if (this.cartList.filter(item => !item.checked).length) {
        //   for (let item of this.cartList) {
        //     item.checked = true
        //   }
        // }else{
        //   for (let item of this.cartList) {
        //     item.checked = false
        //   }
        // }

        // 2.高级的方法
        if (this.isSelectAll) { // 全选中
          this.cartList.forEach(element => element.checked = false)
        }else{ // 部分没被选中
          this.cartList.forEach(element => element.checked = true)
        }
      },
      calcClick(){
        if (!this.isSelectAll) {
          this.$toast.showToast("请先选择要结算的商品")
        }
      }
    }
  }
</script>

<style>
  .shopcart-bottom-bar{
    font-size: 15px;
    height: 35px;
    background-color: #eee;
    display: flex;
    align-items: center;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
  }

  .statistics{
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .statistics span{
    margin-left: 10px;
  }

  .total-price{
    margin-left: 30px;
  }

  .calculate{
    position: absolute;
    right: 0;
    padding: 0 10px;
    line-height: 35px;
    color: #fff;
    background-color: rgb(255,129,152);
  }
</style>
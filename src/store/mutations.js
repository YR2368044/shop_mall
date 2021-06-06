export default {
  // mutations 唯一的目的就是修改 state，其中每个方法的任务尽可能要单一 
    // 异步操作 和 复杂判断逻辑 都放在 actions 中
  addCounter(state, payload){ //可以在开发工具中跟踪
    payload.count++
  },
  addToCart(state, payload){
    // 记录 购物车的商品是否被选中 应该在商品的对象中添加属性来记录，
      // checked 属性表示是否被选中，默认为选中
    payload.checked = true 
    state.cartList.push(payload)
  }
}
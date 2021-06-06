export default {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      // payload 为新添加的商品。购物车中不能添加重复的商品，
      // 如果重复的话只是将数量 +1 即可，所以要进行判断
    
      // 法一：for...of 循环 
      // let oldProduct = null
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      // if (oldProduct) {
      //   oldProduct.count += 1
      // }else{
      //   payload.count = 1
      //   state.cartList.push(payload)
      // }

      // 法二：find方法
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断
      if (oldProduct) {
        // 不要在 actions 中直接修改 state，通过 mutations 修改
        // oldProduct.count += 1 //任务一：添加数量
        context.commit("addCounter", oldProduct)
        resolve("当前的商品数量+1")
      }else{
        payload.count = 1
        // 不要在 actions 中直接修改 state，通过 mutations 修改
        // context.state.cartList.push(payload) //任务二：添加商品
        context.commit("addToCart", payload)
        resolve("添加购物车成功")
      }
    })
  }
}
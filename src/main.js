import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装 toast 插件，使用 Vue.use 调用某插件，会自动调用 toast 文件夹下
  // js 文件内 obj 的 install 函数
Vue.use(toast)

// 使用懒加载，可以设置占位图，在图片没有加载出来的时候显示占位图
Vue.use(VueLazyLoad, {
  loading: require("./assets/img/common/yrplaceholder.png")
})

// 解决移动端 300ms 延迟问题
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

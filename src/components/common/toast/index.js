import Toast from './Toast.vue'

const obj = {}

obj.install = function(Vue){
  // console.log("-------", Vue);

  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.通过 new 的方式，使用组件构造器创建一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement("div"))

  // 4.此时 toast.$el 对应的就是 div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
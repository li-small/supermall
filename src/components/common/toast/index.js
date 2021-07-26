import Toast from './Toast'

const obj = {}

// 自定义插件
obj.install = function (Vue) {
  // 1. 创建组件构造器
  const instance = Vue.extend(Toast)

  // 2. new的方法 根据组件构造器 可以创建出来一个组件对象
  const toast = new instance()

  // 3. 将组件元素 手动挂载到某个元素上
  // 这里是手动将toast挂载到新建的div上
  toast.$mount(document.createElement('div'))

  // 4. 添加到body里 toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  // 5. 添加原型方法
  Vue.prototype.$toast = toast
}

export default obj;
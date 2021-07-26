import Vue from 'vue'
import App from './App.vue'
import router from './router' // ./router会自动找到里面的index文件
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 自定义安装toast插件
Vue.use(toast)

// 使用fastclick插件 解决移动端点击事件300ms延迟
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad, {
  // 图片加载的时候 出现的占位图片
  // loading: require('./assets/img/common/duanwang.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1. 安装插件 底层会执行install方法
Vue.use(Vuex)

// 2. 创建对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 3. 导出store对象 挂载到main.js上
export default store
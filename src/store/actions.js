import { ADD_COUNT, ADD_TO_CART } from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1. 查找新添加的商品是否存在数组中
      // find方法是如果条件为true,返回item 条件为false,返回undefined 
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct)
        resolve('当前商品数量+1')
      }
      // 2. 商品存在则数量加1 不存在则添加进数组
      else {
        // 商品不存在新增一个count和checked属性 初始值为1和选中状态
        payload.count = 1
        payload.checked = true
        context.commit(ADD_TO_CART, payload)
        resolve('添加商品成功')
      }
    })
  }
}
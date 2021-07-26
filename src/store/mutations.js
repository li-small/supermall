import { ADD_COUNT, ADD_TO_CART, ONLY_CHECK } from './mutation-types'

export default {
  // mutation中尽可能完成的事件单一一点
  [ADD_COUNT](state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },
  [ONLY_CHECK](state, iid) {
    state.cartList.forEach((item) => {
      if (item.iid.indexOf(iid) !== -1) {
        item.checked = !item.checked
      }
    })
  }
}